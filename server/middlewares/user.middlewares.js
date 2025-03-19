module.exports.passwordValidation = (req, res, next) => {
    let { password } = req.body;

    if (!isValidPassword(password)) {
        return res.status(400).json({
            error: "Your password is invalid",
            message: "At least 8 characters, one uppercase, one lowercase, and one special character!"
        });
    }

    next();
};

function isValidPassword(password) {
    if (!password || password.length < 8) return false;
    if (!/[a-z]/.test(password)) return false;
    if (!/[A-Z]/.test(password)) return false;
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/.test(password)) return false;
    return true;
}