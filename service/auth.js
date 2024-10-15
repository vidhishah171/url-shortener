// maybe we can create class AuthService or a simple function

// const sessionIdToUserMap = new Map();
const jwt = require('jsonwebtoken')
const secret = "Vidhi@12345"

function setUser(user) {
    // sessionIdToUserMap.set(id, user);
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role
    }
    console.log(payload)
    return jwt.sign(payload, secret);
    // return jwt.sign(user,secret);
}

function getUser(token) {
    if(!token) return null;
    try{
        return jwt.verify(token,secret);
    } catch(error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser
}