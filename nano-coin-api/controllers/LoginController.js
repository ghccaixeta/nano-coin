const db = require('../db/models/index')
const bcrypt = require('bcrypt')
const Administrador = db.Administrador;
const createToken = require('../helpers/create-token')




module.exports = class LoginController{
    static async login(req, res){
        const {login, senha} = req.body
        try {
            if(login && senha){
                const admin = await Administrador.findOne({
                    where:{
                        login
                    },
                    raw: true
                })
    
                if(admin){
                    const checkPassword = await bcrypt.compare(senha, admin.senha)
                    if(checkPassword){
                        await createToken(login, admin.id, req, res)
                        return
                    }
                }
                res.status(400).json({message: 'Usuário ou senha incorretos'})
                return
            }
    
            res.status(422).json({message: 'Usuario e senha obrigatórios'})
            return
            
        } catch (error) {
            res.status(500).json({message: 'DB ERROR'})
            return

        }
        



    }
}
