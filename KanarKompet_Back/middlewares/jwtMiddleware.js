function jwtMiddleware(req, res, next) {
    // req.headers("Authorization");
    console.log("Headers", req);
    //req.userid = 1;
    
    next();
}

module.exports = { jwtMiddleware, }