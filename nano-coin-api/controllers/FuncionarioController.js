const db = require('../db/models/index')
const Op = db.Sequelize.Op
const bcrypt = require('bcrypt')
const Funcionario = db.Funcionario;
const Administrador = db.Administrador;
const Movimentacao = db.Movimentacao;
const verifyToken = require('../helpers/verify-token');
const { sequelize } = require('../db/models/index');
const funcionario = require('../db/models/funcionario');
const { json } = require('express');


module.exports = class FuncionarioController {
    static async save(req, res) {
        const token = await verifyToken(req);
        if (token) {

            try {
                
                const { nome_completo, login, senha, saldo_atual, administrador_id } = req.body
    
                if (nome_completo && login && senha && saldo_atual === 0 && administrador_id) {
                    const exist = await Funcionario.findOne({
                        where: {
                            login
                        },
                        raw: true
                    })
    
                    if (exist) {
                        res.status(422).json({ message: 'Login já existe.' })
                        return
                    }
    
                    const salt = await bcrypt.genSalt(12)
                    const hashSenha = await bcrypt.hash(senha, salt)
    
                    try {
                        const funcionario = await Funcionario.create({ nome_completo, login, senha: hashSenha, saldo_atual, administrador_id: token.id })
                        res.status(200).json( funcionario )
                        return
                    } catch (e) {
                        res.status(500).json({ message: e })
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

        res.status(401).json({ message: 'Token invalido' })


    }

    static async getById(req, res) {
        const token = await verifyToken(req);
        if (token) {

            try {
                
                const id = req.params.id
    
                const funcionario = await Funcionario.findOne({
                    where: { id },
                    raw: true,
                    include: [{
                        model: Administrador
                    }],
                    nest: true
                })
                if (funcionario) {
                    res.status(200).json(funcionario)
                    return
                }
    
                res.status(404).json({ message: 'Funcionario não encontrado' })
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
    
                const result = await Funcionario.findOne({
                    where: { id: _id },
                    raw: true,
                    nest: true
                })
                if (result) {
    
                    const { id, nome_completo, login, senha, saldo_atual, administrador_id, createdAt, updatedAt } = req.body
    
                    const funcionario = new Funcionario({ id, nome_completo, login, senha, saldo_atual, administrador_id, createdAt, updatedAt })

                    const checkLogin = await Funcionario.findOne({
                        where: {
                            id: {
                              [Op.ne]: funcionario.id
                            },
                            login: funcionario.login

                          }
                    })
                    
                    if(!checkLogin){
                        const _funcionario = await Funcionario.update({
                            nome_completo: funcionario.nome_completo,
                            login: funcionario.login,
                            senha: funcionario.senha,
                            saldo_atual: funcionario.saldo_atual,
                            administrador_id: funcionario.administrador_id,
                            createdAt: funcionario.createdAt
                        }, {
                            where: {
                                id: funcionario.id
                            }
                        })
        
                        if (_funcionario) {
                            res.status(200).json(_funcionario)
                            return
                        }
                        
                    }else{
                        res.status(400).json({ message: 'Login já existe.' })
                        return
                    }

                }
    
    
                res.status(404).json({ message: 'Funcionario não encontrado' })
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
                const result = await Funcionario.findOne({
                    where: { id: req.params.id },
                    raw: true,
                    nest: true,
                    include: [{
                        model: Movimentacao,
                        as: 'Movimentacoes',
                    }]
    
                })
                if (result) {
                    if (!result.Movimentacoes.id) {
    
                        const _funcionario = await Funcionario.destroy({
                            where: {
                                id: req.params.id
                            }
                        })
    
    
                        if (_funcionario) {
                            res.status(200).json({ message: 'Funcionário deletado com suceso!' })
                            return
                        }
                    }
                    
                    res.status(400).json({ message: 'Existem movimentações vinculadas a essa pessoa.' })
                    return
                }
    
    
                res.status(404).json({ message: 'Funcionario não encontrado' })
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
    
    
    
                const funcionario = await Funcionario.findAll({
                    limit: items,
                    offset: offset,
                    raw: true,
                    where: where
    
                })
    
                res.status(200).json(funcionario)
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
                const _count = await Funcionario.count({
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