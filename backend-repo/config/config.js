const { env } = process;

const config = {
  env: env.NODE_ENV || "development",
};

const devConfig = {
  db: env.DB_CONNECTION_DEV,
  jwt_key: env.SECRET_KEY_DEV,
  frontendOrigin: env.FRONTEND_ORIGIN_DEV,
  stripe_key: env.STRIPE_KEY,
  stripe_secret: env.STRIPE_SECRET,
  send_grid_key: env.SEND_GRID_KEY_DEV,
};

const prodConfig = {
  db: env.DB_CONNECTION_PROD,
  jwt_key: env.SECRET_KEY_PROD,
  frontendOrigin: env.FRONTEND_ORIGIN_PROD,
  stripe_key: env.STRIPE_KEY_PROD,
  stripe_secret: env.STRIPE_SECRET_PROD,
  send_grid_key: env.SEND_GRID_KEY_PROD,
};

const currentConfig = config.env === "production" ? prodConfig : devConfig;
console.log("OUR ENVIROMENT SETUP IS:", config.env);
console.log(currentConfig);

module.exports = Object.assign({}, config, currentConfig);
