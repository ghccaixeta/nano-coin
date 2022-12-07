require('dotenv').config()
const jwt = require('jsonwebtoken')



const createuserToken = async (login, id, req,res) =>{

    const token = jwt.sign({
        login,
        id
        
    },process.env.JWTSECRET, {
        expiresIn: "8h"})

    res.status(200).json({
        token: token,

    })

}

module.exports = createuserToken