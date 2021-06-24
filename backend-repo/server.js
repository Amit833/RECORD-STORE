require("dotenv").config();
const morgan = require("morgan");
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");
// const path = require("path");

const recordsRouter = require("./routes/recordsRouter");
const usersRouter = require("./routes/usersRouter");
const authRouter = require("./routes/authRouter");
const logoutRouter = require("./routes/logout");
const meRouter = require("./routes/meRouter");
const paymentRouter = require("./routes/payment");
const mailRouter = require("./routes/mailRouter");
const env = require("./config/config");

// connect to MongoDB
require("./helpers/db-connection");

const cookieParser = require("cookie-parser");
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

/**EXPRESS MIDDLEWARE */
app.use(express.json());
app.use(
  cors({
    origin: env.frontendOrigin || "http://localhost:3000",
    credentials: true, // allow cookies from your origins
  })
);
app.use(cookieParser());
app.use("/images", express.static("./images"));
app.use(morgan("dev"));

/**ROUTES */
app.use("/users", usersRouter);
app.use("/records", recordsRouter);
app.use("/login", authRouter);
app.use("/logout", logoutRouter);
app.use("/me", meRouter);
app.use("/payment", paymentRouter);
app.use("/sendmail", mailRouter);

// Error Handling
app.use(function errorHandler(err, req, res, next) {
  console.log("centralerr", err);
  res.status(err.status || 500).send({
    error: {
      message: err.message,
    },
  });
});
