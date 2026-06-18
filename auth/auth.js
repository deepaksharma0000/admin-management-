const jwt   = require('jsonwebtoken');
module.exports = function(req,res,next){
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token,process.env.JWT_KEY);
        req.userData = decoded;
        next();

        if (req.userData.role === 'master') {
            req.userData.TenantDB = decoded.TenantDB;
        }
    }
    catch(error){
        return res.status(401).json({
            message:"Auth failed"
        });
    }
};