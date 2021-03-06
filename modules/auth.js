const authenticator = (req, res, next) => {
    if(!req.headers.authorization || req.headers.authorization.indexOf("Basic ") === -1){
        return res.append("WWW-Authenticate", 'Basic realm="User Visible Realm", charset="UTF-8"').status(401).end();
        };
    
        const raw = req.headers.authorization.split(" ")[1];
        const [userName,password] = Buffer.from(raw, "base64").toString("UTF-8").split(":");
        
        const user = authenticate(userName,password)
        if(user){
            return res.status(403).end();
            }
            next();
}

function authenticate(userName,password){
    return userName === "Per" && password === "KittyPus"
}

module.exports = authenticator