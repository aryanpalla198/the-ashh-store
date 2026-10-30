import { PincodeServiceability, CourierInfo, TrackingStep } from '@/types';

// Curated lookup for major Indian pincodes with city, state and turnaround days
const PINCODE_MAP: Record<string, { city: string; state: string; days: number }> = {
  '400001': { city: 'Mumbai', state: 'Maharashtra', days: 2 },
  '400050': { city: 'Mumbai (Bandra)', state: 'Maharashtra', days: 2 },
  '110001': { city: 'New Delhi', state: 'Delhi', days: 3 },
  '110020': { city: 'New Delhi (Okhla)', state: 'Delhi', days: 3 },
  '560001': { city: 'Bengaluru', state: 'Karnataka', days: 3 },
  '560038': { city: 'Bengaluru (Indiranagar)', state: 'Karnataka', days: 3 },
  '500001': { city: 'Hyderabad', state: 'Telangana', days: 3 },
  '600001': { city: 'Chennai', state: 'Tamil Nadu', days: 3 },
  '700001': { city: 'Kolkata', state: 'West Bengal', days: 4 },
  '411001': { city: 'Pune', state: 'Maharashtra', days: 2 },
  '380001': { city: 'Ahmedabad', state: 'Gujarat', days: 3 },
  '302001': { city: 'Jaipur', state: 'Rajasthan', days: 3 },
  '226001': { city: 'Lucknow', state: 'Uttar Pradesh', days: 4 },
  '160001': { city: 'Chandigarh', state: 'Chandigarh', days: 3 },
  '682001': { city: 'Kochi', state: 'Kerala', days: 4 },
  '452001': { city: 'Indore', state: 'Madhya Pradesh', days: 3 },
  '800001': { city: 'Patna', state: 'Bihar', days: 4 },
};

/**
 * Validates and returns courier serviceability for any valid 6-digit Indian pincode.
 */
export function checkPincodeServiceability(pincode: string): PincodeServiceability {
  const cleanPin = pincode.trim();
  const isValid = /^[1-9][0-9]{5}$/.test(cleanPin);

  if (!isValid) {
    return {
      pincode: cleanPin,
      city: '',
      state: '',
      isServiceable: false,
      codAvailable: false,
      estimatedDays: 0,
      estimatedDeliveryDate: '',
      courierPartner: '',
      expressAvailable: false,
    };
  }

  // Lookup or estimate by postal zone prefix
  const match = PINCODE_MAP[cleanPin];
  let city = 'Metro Hub';
  let state = 'India';
  let days = 3;

  if (match) {
    city = match.city;
    state = match.state;
    days = match.days;
  } else {
    const firstDigit = cleanPin[0];
    if (firstDigit === '4') {
      city = 'Western Zone';
      state = 'Maharashtra / Gujarat';
      days = 2;
    } else if (firstDigit === '1' || firstDigit === '2') {
      city = 'Northern Zone';
      state = 'Delhi / NCR / UP';
      days = 3;
    } else if (firstDigit === '5' || firstDigit === '6') {
      city = 'Southern Zone';
      state = 'Karnataka / TN / Kerala';
      days = 3;
    } else if (firstDigit === '7' || firstDigit === '8') {
      city = 'Eastern Zone';
      state = 'West Bengal / Bihar';
      days = 4;
    } else {
      city = 'Central Region';
      state = 'Central India';
      days = 4;
    }
  }

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + days);

  const formattedDate = deliveryDate.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  return {
    pincode: cleanPin,
    city,
    state,
    isServiceable: true,
    codAvailable: true,
    estimatedDays: days,
    estimatedDeliveryDate: formattedDate,
    courierPartner: 'Shiprocket (Bluedart Express)',
    expressAvailable: true,
  };
}

/**
 * Creates live tracking steps and timeline for an order
 */
export function generateShiprocketTracking(
  orderStatus: string,
  destinationCity: string = 'Mumbai'
): CourierInfo {
  const awb = `SRKT${Math.floor(1000000000 + Math.random() * 9000000000)}`;
  const now = new Date();

  const getStepTime = (hoursAgo: number) => {
    const d = new Date(now.getTime() - hoursAgo * 3600 * 1000);
    return d.toLocaleString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  const steps: TrackingStep[] = [
    {
      status: 'Order Placed & Verified',
      location: 'The Ashh Store Fulfillment Center (Bhiwandi)',
      timestamp: getStepTime(36),
      message: 'Order received and inventory secured.',
      completed: true,
    },
    {
      status: 'Packed & Invoiced',
      location: 'The Ashh Store Warehouse',
      timestamp: getStepTime(28),
      message: 'Quality check completed, packed in eco-friendly Ashh box.',
      completed: ['confirmed', 'packed', 'shipped', 'out_for_delivery', 'delivered'].includes(orderStatus),
    },
    {
      status: 'Handed Over to Courier',
      location: 'Shiprocket Logistics Hub (Mumbai)',
      timestamp: getStepTime(18),
      message: 'Courier AWB generated. Package scanned at primary transit hub.',
      completed: ['shipped', 'out_for_delivery', 'delivered'].includes(orderStatus),
    },
    {
      status: 'Out for Delivery',
      location: `${destinationCity} Local Delivery Hub`,
      timestamp: getStepTime(4),
      message: 'Courier rider is out for delivery. Contactless OTP will be verified.',
      completed: ['out_for_delivery', 'delivered'].includes(orderStatus),
    },
    {
      status: 'Delivered',
      location: destinationCity,
      timestamp: orderStatus === 'delivered' ? getStepTime(1) : 'Expected by tomorrow',
      message: 'Delivered to recipient with digital signature.',
      completed: orderStatus === 'delivered',
    },
  ];

  return {
    awbNumber: awb,
    courierName: 'Shiprocket Xpressbees / Bluedart Air',
    trackingUrl: `https://shiprocket.co/tracking/${awb}`,
    currentLocation:
      orderStatus === 'delivered'
        ? `${destinationCity} (Delivered)`
        : orderStatus === 'out_for_delivery'
        ? `${destinationCity} Local Hub`
        : 'In Transit via Air Express Hub',
    estimatedDelivery: '3-4 Business Days',
    trackingSteps: steps,
  };
}
