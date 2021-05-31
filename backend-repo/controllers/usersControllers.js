const User = require("../models/User");

exports.getUsers = async (req, res, next) => {
  const users = await User.find().sort({ firstName: 1 });
  res.send(users);
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    user.avatar = `${req.protocol}://${req.get("host")}${user.avatar}`;
    //                localhost    ://8080             /images/avatar1.jpg
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
    userUpdated.avatar = `${req.protocol}://${req.get("host")}${
      userUpdated.avatar
    }`;
    res.json(userUpdated);
  } catch (err) {
    next(err);
  }
};

exports.addUser = async (req, res, next) => {
  const info = req.body;
  try {
    const user = await User.create(info);

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

// why this function
// exports.getme = async (req, res, next) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findById(id);
//     user.avatar = `${req.protocol}://${req.get("host")}${user.avatar}`;
//     //                localhost    ://8080             /images/avatar1.jpg
//     res.json(user);
//   } catch (err) {
//     next(err);
//   }
// };
