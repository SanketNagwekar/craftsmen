const { createProxyMiddleware } = require('http-proxy-middleware');

const API_URL = 'https://crafsmen-backend-server.onrender.com';

module.exports = function (app) {

  app.use(
    '/customerLogin',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/customer`;
      }
    })
  );

  app.use(
    '/validateCustomerOtp',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `api/v1/entrance/validate-customer`;
      }
    })
  );

  app.use(
    '/getServicesList',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/services`;
      }
    })
  );

  app.use(
    '/getService',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/services/${req.query.i}`;
      }
    })
  );

  app.use(
    '/getServicePrice',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `api/v1/entrance/service-details/${req.query.i}`;
      }
    })
  );

  app.use(
    '/uploadFile',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/upload-image`;
      }
    })
  );

  app.use(
    '/updateCustomer',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/customer-details`;
      }
    })
  );


  app.use(
    '/getCustomerDetails',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/customer-details`;
      }
    })
  );

  app.use(
    '/createNewBooking',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/bookings`;
      }
    })
  );

  app.use(
    '/getCustomerBookings',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/customer-bookings`;
      }
    })
  );

  app.use(
    '/sendContactUs',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/contact-us`;
      }
    })
  );

  app.use(
    '/cancelBooking',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/cancel-bookings/${req.query.i}`;
      }
    })
  );

};