const mongoose = require("mongoose");
const env = require("../config/config");
// const strConn = process.env.DB_CONNECTION_DEV;

// Connect to DBongodb
mongoose
  .connect(env.db, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connection to cloud database established!"))
  .catch((err) => console.log("[ERROR] DB connection failed", err));

module.exports = mongoose.connection;
