const User = require("../models/User");
const { getAvatarUrl } = require("../helpers/getAvatarUrl");

exports.getUsers = async (req, res, next) => {
  const users = await User.find().sort({ firstName: 1 });
  res.send(users);
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    user.avatar = getAvatarUrl(req, user);

    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userUpdated = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log("updatedUserrrrr", userUpdated);
    userUpdated.avatar = getAvatarUrl(req, userUpdated);

    res.json(userUpdated);
  } catch (err) {
    next(err);
  }
};

exports.addUser = async (req, res, next) => {
  const info = req.body;
  try {
    const user = await User.create(info);
    user.avatar = getAvatarUrl(req, user);

    // Generate a token
    const token = user.generateAuthToken();

    res
      .cookie("token", token, {
        expires: new Date(Date.now() + 604800000),
        sameSite: process.env.NODE_ENV == "production" ? "None" : "lax",
        secure: process.env.NODE_ENV == "production" ? true : false, //http on localhost, https on production
        httpOnly: true,
      })
      .send(user);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    let userDeleted = await User.findByIdAndDelete(id);
    if (!userDeleted) throw new Error();
    res.json(userDeleted);
  } catch (err) {
    let error = new Error(`User with ID ${id} does not exist`);
    error.status = 400;
    next(error);
  }
};

// this is for me router
exports.authUser = (req, res) => {
  res.json(req.user); // inside the req.user we have token
};
