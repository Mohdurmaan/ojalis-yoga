const fs = require('fs');
const path = require('path');

const controllerPath = 'e:\\\\ujalishyoga\\\\backend\\\\controllers\\\\eventBookingController.js';
const routePath = 'e:\\\\ujalishyoga\\\\backend\\\\routes\\\\eventBookingRoutes.js';

let controllerContent = fs.readFileSync(controllerPath, 'utf8');
if (!controllerContent.includes('getPayoutSummary')) {
  controllerContent += `\nexports.getPayoutSummary = async (req, res) => {
  try {
    const bookings = await EventBooking.find({ paymentStatus: 'Paid' });
    const totalCollected = bookings.reduce((sum, b) => sum + (b.amount || 0), 0);
    const successfulBookings = bookings.length;
    // Assuming no specific fees or refunds are tracked in DB, Net Payout = Total Collected
    res.json({
      success: true,
      data: {
        totalCollected,
        successfulBookings,
        netPayout: totalCollected
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
`;
  fs.writeFileSync(controllerPath, controllerContent);
}

let routeContent = fs.readFileSync(routePath, 'utf8');
if (!routeContent.includes('getPayoutSummary')) {
  routeContent = routeContent.replace(
    'const { createOrder, verifyPayment, getAllBookings, getBooking, updateBookingStatus, deleteBooking }',
    'const { createOrder, verifyPayment, getAllBookings, getBooking, updateBookingStatus, deleteBooking, getPayoutSummary }'
  );
  routeContent = routeContent.replace(
    'router.get(\'/\', protect, getAllBookings);',
    'router.get(\'/payout-summary\', protect, getPayoutSummary);\nrouter.get(\'/\', protect, getAllBookings);'
  );
  fs.writeFileSync(routePath, routeContent);
}

console.log('API updated successfully.');
