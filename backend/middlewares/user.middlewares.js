module.exports.passwordValidation = (req, res, next) => {
    let { password } = req.body;

    if (!isValidPassword(password)) {
        return res.status(400).json({
            error: "Your password too bad",
            message: "At least 8 char, one upper case and one special char!"
        });
    }

    next();
};

function isValidPassword(password) {
    if (!password || password.length < 8) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[0-9]/.test(password)) return false;
    return true;
}