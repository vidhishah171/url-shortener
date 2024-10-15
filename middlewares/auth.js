const { userLogin } = require("../controllers/user");
const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
    // const authorizationHeaderValue = req.headers["authorization"];
    const tokenCookie = req.cookies?.token;
    req.user = null;
    // if(!authorizationHeaderValue || !authorizationHeaderValue.startsWith('Bearer')) {
    //     console.log("next")
    //     return next();
    // }
    // // validation logic: authentication sevice
    // const token = authorizationHeaderValue.split('Bearer ')[1];
    if(!tokenCookie) return next();
    const token = tokenCookie;
    const user = getUser(token);
    req.user = user;
    console.log("user",user)
    next();
}


function restrictTo(roles = []) {
    return function(req,res,next) {
        if(!req.user) return res.redirect('/login');
        console.log(req.user)
        if(!roles.includes(req.user.role)) return res.end('Unauthorized');
        return next();
    };
}

async function restrictToLoggedInUserOnly(req, res, next) {
    const userUid = req.cookies?.token;
    // const userUid =  req.headers["authorization"]
    console.log(userUid)
    if(!userUid) {return res.redirect("/login") };
    const token = userUid.split('Bearer ')[1];
    // const user = getUser(userUid);
    const user = getUser(token);
    console.log(user)
    if(!user) return res.redirect("/login");
    req.user = user;
    return next();
}


async function checkAuth(req, res, next) {
    // const userUid = req.cookies?.uid;
    console.log(req.headers)
    const userUid = req.headers["authorization"]
    console.log('userid' ,userUid)
    const token = userUid.split('Bearer ')[1];
    // const user = getUser(userUid);
    const user = getUser(token);

    req.user = user;
    next();
}

module.exports = {restrictToLoggedInUserOnly, checkAuth, restrictTo, checkForAuthentication}