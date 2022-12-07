const db = require('../db/models/index')
const Op = db.Sequelize.Op
const bcrypt = require('bcrypt')
const Administrador = db.Administrador;
const Funcionario = db.Funcionario;
const Movimentacao = db.Movimentacao;
const verifyToken = require('../helpers/verify-token')

module.exports = class AdministradorController{
    static async save(req, res){
        try {
            if(verifyToken(req)){
    
                const{nome_completo, login, senha} = req.body
        
                if(nome_completo && login && senha){
                    const exist = await Administrador.findOne({
                        where:{
                            login,
                            
                        },
                        raw: true
                    })
                    
                    if(exist){
                        res.status(422).json({message: 'Login já existe'})
                        return    
                    }
        
                    const salt = await bcrypt.genSalt(12)
                    const hashSenha = await bcrypt.hash(senha, salt)
        
                    try{
                        const administrador = await Administrador.create({nome_completo, login, senha: hashSenha})
                        res.status(200).json(administrador)
                        return
                    }catch(e){
                        res.status(500).json({message: 'Erro inesperado.'})
                        return
                    }
        
                    
                }
        
                res.status(422).json({message: 'Preencha os campos obrigatórios.'})
                return
            }
    
            res.status(401).json({message: 'Invalid token'})
            
        } catch (error) {
            res.status(500).json({message: 'DB ERROR'})
            return
        }


    }

    static async getById(req, res){
        const token = await verifyToken(req);
        if(token){

            try {
                const id = req.params.id
                
                const administrador = await Administrador.findOne({
                    where: {id},
                    raw: true,
                    nest: true
                })
                if(administrador){
                    res.status(200).json(administrador)
                    return
                }
    
                res.status(404).json({message: 'Administrador não encontrado'})
                return
                
            } catch (error) {
                res.status(500).json({message: 'DB ERROR'})
                return
            }


            
        }

        res.status(401).json({message: 'Token invalido'})
        return
    }

    static async update(req, res){
        const token = await verifyToken(req);
        if(token){
            
            try {
                
                const _id = req.params.id
                
                const result = await Administrador.findOne({
                    where: {id:_id},
                    raw: true,
                    nest: true
                })
                if(result){
                    
                    const{id, nome_completo, login, senha,createdAt} = req.body
            
                    const administrador = new Administrador({id, nome_completo, login, senha,createdAt})

                    const checkLogin = await Administrador.findOne({
                        where: {
                            id: {
                              [Op.ne]: administrador.id
                            },
                            login: administrador.login

                          }
                    })

                    if(!checkLogin){
                        const _administrador = await Administrador.update({
                            nome_completo: administrador.nome_completo,
                            login: administrador.login,
                            senha: administrador.senha,
                            createdAt: administrador.createdAt
                        },{
                            where:{
                                id: administrador.id
                            }
                        })
                        
                        if(_administrador){
                            res.status(200).json(_administrador)
                            return
                        }

                    }else{
                        res.status(400).json({message: 'Login já existe.'})
                        return
                    }
    
                }
    
    
                res.status(404).json({message: 'administrador não encontrado'})
                return
            } catch (error) {
                res.status(500).json({message: 'DB ERROR'})
                return
            }


            
        }

        res.status(401).json({message: 'Token invalido'})
        return
    }

    static async destroy(req, res){
        const token = await verifyToken(req);
        if(token){
            try {
                
                const result = await Administrador.findOne({
                    where: {id: req.params.id},
                    raw: true,
                    nest: true,
                    include: [{
                        model: Funcionario,
                        
                    },
                    {
                        model: Movimentacao,
                        as: 'Movimentacoes',
                    }
                ],
                    nest: true,
                })
                if(result){
                    if(result.Funcionarios.id || result.Movimentacoes.id){
                        res.status(400).json({message: 'Existem outros objetos relacionados (Funcionários e/ou Movimentações).'})
                        return

                    }else{

                        const _administrador = await Administrador.destroy({
                            where:{
                                id: req.params.id
                            }
                        })
                        
                        
                        if(_administrador){
                            res.status(200).json({message: 'Administrador deletado com suceso!'})
                            return
                        }
                    }
                    
                }
    
    
                res.status(404).json({message: 'Administrador não encontrado'})
                return
            } catch (error) {
                res.status(500).json({message: 'DB ERROR'})
                return
            }

            
        }

        res.status(401).json({message: 'Token invalido'})
        return
    }

    static async list(req, res){
        const token = await verifyToken(req);
        if(token){

            try {
                const items = req.query.items ? parseInt(req.query.items) : 10
                const page = req.query.page ? parseInt(req.query.page) -1 : 0
                const offset = items * page
                
                let where
    
                if (req.query.data_inicial && req.query.data_final) {
                    where = {
                        nome_completo: {
                            [Op.like]: [`%${req.query.nome_completo ?? ''}%`],
    
                        },
                        createdAt: {
                            [Op.between]: [req.query.data_inicial + ' 00:00:00', req.query.data_final + ' 23:59:59']
                        },
                    }
                } else {
                    where = {
                        nome_completo: {
                            [Op.like]: [`%${req.query.nome_completo ?? ''}%`],
    
                        },
                    }
    
                }
                
                const administrador = await Administrador.findAll({
                    limit: items,
                    offset: offset,
                    raw: true,
                    where: where
                   
                })
    
                res.status(200).json(administrador)
                return        
                
            } catch (error) {
                res.status(500).json({message: 'DB ERROR'})
                return
            }

            
        }
        res.status(401).json({message: 'Token invalido'})
        return
    }

    static async count(req, res){
        const token = await verifyToken(req);
        if(token){

            try {
                const _count = await Administrador.count()
                res.status(200).json(_count)
                return
                
            } catch (error) {
                res.status(500).json({message: 'DB ERROR'})
                return
            }

        }
        res.status(401).json({message: 'Token invalido'})
        return
    }
}