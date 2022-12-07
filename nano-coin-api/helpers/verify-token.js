require('dotenv').config()
const jwt = require('jsonwebtoken')
const verifyToken = (req)=>{
    
    if(req.headers.authorization){
        const authHeader = req.headers.authorization
        const token = authHeader.split(" ")[1]
        try{
            const _token = jwt.verify(token, process.env.JWTSECRET)
            return(_token)
            
            
        } catch(e){
            
            return(false)
            
        }
    }

}

module.exports = verifyToken