const db = require("../config/database");
const bcrypt = require("bcryptjs");

module.exports.getInformation = async (req, res) => {
  let user = await db("users")
    .select("username", "email", "avatar_url", "bio", "role")
    .where("users.id", "=", req.user.id);
  return user;
};

module.exports.changeInformation = async (req, res) => {
  const { email, avatar_url, bio } = req.body;
  await db("users")
    .update({
      email: email,
      avatar_url: avatar_url,
      bio: bio,
    })
    .where("id", "=", req.user.id);
  return;
};

module.exports.changePassword = async (req, res) => {
  let { password } = req.body;
  let password_hash = await bcrypt.hash(password, 10);
  await db("users")
    .update({
      password_hash,
    })
    .where({
      id: req.user.id,
    });
};

module.exports.deleteUser = async (req, res) => {
  await db("users")
    .where({
      id: req.user.id,
    })
    .del();
  return;
};

module.exports.changeAvatar = async (req, res) => {
  let { avatar_url } = req.body;
  await db("users").update({ avatar_url }).where({
    id: req.user.id,
  });
  return;
};

module.exports.changeBio = async (req, res) => {
  let { bio } = req.body;
  await db("users").update({ bio }).where({ id: req.user.id });
  return;
};
