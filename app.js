/** BizTime express application. */
const express = require("express");
const app = express();
const ExpressError = require("./expressError");
const morgan = require("morgan");

app.use(express.json()); // middleware for parsing JSON bodies
app.use(morgan('dev'));

/* Routes */

// /companies
const company_routes = require("./routes/companies");
app.use('/companies', company_routes);

// /invoices
const invoice_routes = require("./routes/invoices");
app.use('/invoices', invoice_routes);

// /industries
const industry_routes = require('./routes/industries');
app.use('/industries', industry_routes);

/** 404 handler */

app.use((req, res, next) => {
  const err = new ExpressError("Not Found", 404);

  // pass err to the next middleware
  return next(err);
});

/** general error handler */

app.use((err, req, res, next) => {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;

  return res.status(status).json({
      error: {
          message: err.message,
          status:status
      }
  });
});

module.exports = app;
