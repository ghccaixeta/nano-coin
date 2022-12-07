const db = require('../db/models/index');
const movimentacao = require('../db/models/movimentacao');
const Op = db.Sequelize.Op
const Movimentacao = db.Movimentacao;
const Administrador = db.Administrador;
const Funcionario = db.Funcionario;
const verifyToken = require('../helpers/verify-token')

module.exports = class MovimentacaoController {
    static async save(req, res) {
        if (verifyToken(req)) {

            try {
                const { tipo_movimentacao, valor, observacao, funcionario_id, administrador_id } = req.body
                
                if (tipo_movimentacao && valor && observacao && funcionario_id && administrador_id) {
    
    
    
                    if(valor > 0){
                        const movimentacao = await Movimentacao.create({ tipo_movimentacao, valor, observacao, funcionario_id, administrador_id })
                        res.status(200).json(movimentacao)
    
                        if(movimentacao && tipo_movimentacao === 'entrada'){
                            Funcionario.increment(
                                {
                                    saldo_atual: +valor 
                                },
                                { 
                                    where: { id: funcionario_id } 
                                }
                              )
                        }else if(movimentacao){
                            Funcionario.increment(
                                {
                                    saldo_atual: -valor 
                                },
                                { 
                                    where: { id: funcionario_id } 
                                }
                              )
                        }
                        try {
                            
        
                            return
                        } catch (e) {
                            res.status(500).json({ message: e })
                            return
                        }
    
                    }else{
                        res.status(400).json({ message: 'Digite um valor válido' })
                        return
                    }
    
    
    
                }
    
                res.status(422).json({ message: 'Preencha os campos obrigatório.' })
                return
                
            } catch (error) {
                res.status(500).json({message: 'DB ERROR'})
                return
            }

        }

        res.status(401).json({ message: 'Invalid token' })
        return


    }

    static async getById(req, res) {
        const token = await verifyToken(req);
        if (token) {

            try {
                const id = req.params.id
    
                const movimentacao = await Movimentacao.findOne({
                    where: { id },
                    raw: true,
                    include: [
                        {
                            model: Administrador,
                        },
                        {
                            model: Funcionario,
                        },
                    ],
                    nest: true,
                })
                if (movimentacao) {
                    res.status(200).json(movimentacao)
                    return
                }
    
                res.status(404).json({ message: 'Movimentacao não encontrado' })
                return
                
            } catch (error) {
                res.status(500).json({message: 'DB ERROR'})
                return
            }



        }

        res.status(401).json({ message: 'Token invalido' })
        return
    }

    static async getByFuncionarioId(req, res) {
        const token = await verifyToken(req);
        if (token) {

            try {
                const id = req.params.id
                
                const movimentacao = await Movimentacao.findAll({
                    where: { funcionario_id: id },
                    raw: true,
                    nest: true,
                    include: [
                        {
                            model: Funcionario,
                        },
                    ],
                    order: [['createdAt', 'DESC']]
                    
                })
                if (Object.keys(movimentacao).length) {
                    
                    res.status(200).json(movimentacao)
                    return
                }
    
                res.status(404).json({ message: 'Movimentacao não encontrado' })
                return
                
            } catch (error) {
                res.status(500).json({message: 'DB ERROR'})
                return
            }



        }

        res.status(401).json({ message: 'Token invalido' })
        return
    }

    static async update(req, res) {
        const token = await verifyToken(req);
        if (token) {

            try {
                const _id = req.params.id
    
                const result = await Administrador.findOne({
                    where: { id: _id },
                    raw: true,
                    nest: true
                })
                if (result) {
    
                    const { id, nome_completo, login, senha, createdAt } = req.body
    
                    const administrador = new Administrador({ id, nome_completo, login, senha, createdAt })
    
                    const _administrador = await Administrador.update({
                        nome_completo: administrador.nome_completo,
                        login: administrador.login,
                        senha: administrador.senha,
                        createdAt: administrador.createdAt
                    }, {
                        where: {
                            id: administrador.id
                        }
                    })
    
                    if (_administrador) {
                        res.status(200).json(_administrador)
                        return
                    }
                }
    
    
                res.status(404).json({ message: 'administrador não encontrado' })
                return
                
            } catch (error) {
                res.status(500).json({message: 'DB ERROR'})
                return
            }



        }

        res.status(401).json({ message: 'Token invalido' })
        return
    }

    static async destroy(req, res) {
        const token = await verifyToken(req);
        if (token) {

            try {
                const result = await Administrador.findOne({
                    where: { id: req.params.id },
                    raw: true,
                    nest: true
                })
                if (result) {
                    
                    const _administrador = await Administrador.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
    
    
                    if (_administrador) {
                        res.status(200).json({ message: 'Administrador deletado com suceso!' })
                        return
                    }
                }
    
    
                res.status(404).json({ message: 'Administrador não encontrado' })
                return
                
            } catch (error) {
                res.status(500).json({message: 'DB ERROR'})
                return
            }



        }

        res.status(401).json({ message: 'Token invalido' })
        return
    }

    static async list(req, res) {
        const token = await verifyToken(req);
        if (token) {

            try {
                const items = req.query.items ? parseInt(req.query.items) : 10
                const page = req.query.page ? parseInt(req.query.page) - 1 : 0
                const offset = items * page
    
                let where
    
                if (req.query.data_inicial && req.query.data_final) {
                    where = {
                        tipo_movimentacao: {
                            [Op.like]: [`%${req.query.tipo_movimentacao ?? ''}%`],
                        },
                        createdAt: {
                            [Op.between]: [req.query.data_inicial + ' 00:00:00', req.query.data_final + ' 23:59:59']
                        },
                    }
                }else{
                    where = {
                        tipo_movimentacao: {
                            [Op.like]: [`%${req.query.tipo_movimentacao ?? ''}%`],
                        },
                    }
    
                }
    
                const movimentacao = await Movimentacao.findAll({
                    
                    limit: items,
                    offset: offset,
                    raw: true,
                    nest: true,
                    include: [{
                        model: Funcionario,
                        where: [{
                            nome_completo: {
                                [Op.like]: [`%${req.query.nome_completo ?? ''}%`],
                            }
                        }]
    
                    }],
                    where: where,
                    order: [['createdAt', 'DESC']]
    
    
                })
    
                res.status(200).json(movimentacao)
                return
                
            } catch (error) {
                res.status(500).json({message: 'DB ERROR'})
                return
            }


        }
        res.status(401).json({ message: 'Token invalido' })
        return
    }

    

    static async count(req, res) {
        const token = await verifyToken(req);
        if (token) {
            
            try {
                let where
    
                if (req.query.data_inicial && req.query.data_final) {
                    where = {
                            createdAt: {
                            [Op.between]: [req.query.data_inicial + ' 00:00:00', req.query.data_final + ' 23:59:59']
                        },
                    }
                } else {
                    where = {
                        tipo_movimentacao:{
                            [Op.like]: [`%${req.query.tipo_movimentacao ?? ''}%`],
                        }
                    }
    
                }
                const _count = await Movimentacao.count({
                    include: [{
                        model: Funcionario,
                        where: [{
                            nome_completo: {
                                [Op.like]: [`%${req.query.nome_completo ?? ''}%`],
                            }
                        }]
    
                    }],
                    where: where
                })
                res.status(200).json(_count)
                return
                
            } catch (error) {
                res.status(500).json({message: 'DB ERROR'})
                return
            }

        }
        res.status(401).json({ message: 'Token invalido' })
        return
    }

    
}