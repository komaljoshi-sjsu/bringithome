"use strict";
var JwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
var { secret } = require("./config");
const conn = require("../config/mysql_connection");
const Customer = require('../models/Customer');
const Freelancer = require('../models/Freelancer');

// Setup work and export for the JWT passport strategy
function auth() {
    //console.log("auth");

    var opts = {    
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret
    };
    // console.log("Check token",JSON.stringify(opts));
    passport.use(
        new JwtStrategy(opts, async (jwt_payload, callback) => {
            const accountType = jwt_payload.accountType
            // console.log("jwt_payload", jwt_payload);
            if("Customer" === accountType) {
                Customer.find({_id:jwt_payload.id}, (err, results) => {
                    if (err) {
                        callback(null, false);
                        // return  false;
                    }
                    if (results) {
                        callback(null, results[0]);
                    }
                    else {
                        callback(null, false);
                    }
                });
            } else if("Freelancer" === accountType) {
               Freelancer.find({_id:jwt_payload.id}, (err, results)=> {
                    if (err) {
                        callback(null, false);
                        // return false;
                    }
                    if (results) {
                        // console.log("in here",results[0]);
                        callback(null, results[0]);
                        // return results[0];
                    }
                    else {
                        callback(null, false);
                        // return false;
                    }
                })
            } else {
                callback(null, false);
            }
            
        })
    )
}

exports.auth = auth;
exports.checkAuth = passport.authenticate("jwt", { session: false });