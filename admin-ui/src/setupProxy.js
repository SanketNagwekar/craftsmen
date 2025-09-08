const { createProxyMiddleware } = require('http-proxy-middleware');

const API_URL = 'https://crafsmen-backend-server.onrender.com';

module.exports = function (app) {

  app.use(
    '/dologin',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/login`;
      }
    })
  );

  app.use(
    '/refreshToken',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/refreshToken`;
      }
    })
  );

  /* ---- Service Type ---- */
  app.use(
    '/getServicesTypeList',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/service-type`;
      }
    })
  );

  app.use(
    '/addNewServiceType',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/service-type`;
      }
    })
  );

  app.use(
    '/deleteServiceType',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/service-type/${req.query.i}`;
      }
    })
  );

  app.use(
    '/updateServiceType',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/service-type/${req.query.i}`;
      }
    })
  );
  /* ---- ./Service Type ---- */

  /* ---- Service List ---- */
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
    '/addNewService',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/services`;
      }
    })
  );

  app.use(
    '/deleteService',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/services/${req.query.i}`;
      }
    })
  );

  app.use(
    '/updateService',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/services/${req.query.i}`;
      }
    })
  );
  /* ---- ./Service List ---- */

  /* ---- Contractor List ---- */
  app.use(
    '/getContractorsList',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/contractors`;
      }
    })
  );
  

  app.use(
    '/deleteContractor',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/contractors/${req.query.i}`;
      }
    })
  );
  
  app.use(
    '/updateContractor',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/contractors/${req.query.i}`;
      }
    })
  );

  app.use(
    '/addNewContractor',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/contractors`;
      }
    })
  );
  /* ---- ./Contractor List ---- */


  /* Customers List */
  app.use(
    '/getCustomersList',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/customer`;
      }
    })
  );

  app.use(
    '/delCustomer',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/customer/${req.query.i}`;
      }
    })
  );

  /* ./Customers List */

  /* Bookings List */
  app.use(
    '/getBookingsList',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/bookings`;
      }
    })
  );
  app.use(
    '/updateBooking',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/bookings/${req.query.i}`;
      }
    })
  );
  /* ./Bookings List */

  /* Service Price List */
  app.use(
    '/getServicePriceList',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/service-price`;
      }
    })
  );
  app.use(
    '/addNewServicePrice',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/service-price`;
      }
    })
  );
  app.use(
    '/deleteServicePrice',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/service-price/${req.query.i}`;
      }
    })
  );
  app.use(
    '/updateServicePrice',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/service-price/${req.query.i}`;
      }
    })
  );
  /* ./Service Price List */

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
    '/getDashboardCount',
    createProxyMiddleware({
      target: API_URL,
      changeOrigin: true,
      pathRewrite: function (path, req) {
        return `/api/v1/entrance/dashboard-count`;
      }
    })
  );


};