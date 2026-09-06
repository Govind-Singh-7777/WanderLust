const User = require("../models/user.js");

module.exports.renderSignup = (req,res)=>{
    res.render("users/signup.ejs");
}

module.exports.signUp = async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("sucess","Welcome to WanderLust");
            res.redirect("/listings")
        })
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
}

module.exports.renderLogin = (req,res)=>{
    res.render("users/login.ejs")
}

module.exports.logIn = async(req,res)=>{
    let redirectUrl = res.locals.redirectUrl || "/listings"; 
    req.flash("success","Welcome to WanderLust, You are Logged In");
    res.redirect(redirectUrl);
}

module.exports.logOut = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("sucess","You are logged out");
        res.redirect("/listings")
    })
}