const authService = require("../services/auth.service");

module.exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const token = await authService.register(username, email, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports.hello = async (req, res) => {
  try {
    res.json({
      message:
        "HELLO! This is method GET http://localhost:3000/api/v1/auth to test API. If u see that, Backend is running",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
