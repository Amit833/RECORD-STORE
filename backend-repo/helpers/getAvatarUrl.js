const config = require("../config/config");

exports.getAvatarUrl = (req, theUser) => {
  return config.env == "development"
    ? `${req.protocol}://${req.get("host")}${theUser.avatar}`
    : `https://${req.get("host")}${theUser.avatar}`;
};
