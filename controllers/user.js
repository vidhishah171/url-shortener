const User = require('../models/user')
const {v4: uuidv4} = require('uuid') // alias of v4
const {setUser} = require('../service/auth')

async function userSignUp(req, res) {
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.redirect("/");
}


async function userLogin(req, res) {
    console.log('login')
    const { email, password} = req.body;
    const user = await User.findOne({email, password});
    if(!user) return res. render('login', {
        error: "Invalid Username or Password!"
    });
    // const sessionId = uuidv4(); //need to store with user, so that we'll create a service.
    console.log("userlogin",user)
    const token = setUser(user);
    res.cookie('token', token
    //     ,{
    //     domain: 'www.google.com' //only accessed by google.com
    // }
);
    return res.redirect("/");
    // return res.json({token})
}

module.exports = {userSignUp, userLogin}