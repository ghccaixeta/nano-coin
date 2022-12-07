const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()

app.use(express.json())

app.use(cors({credentials: true, origin: '*'}))


const LoginRoutes = require('./routes/LoginRoutes')
const AdministradorRoutes = require('./routes/AdministradorRoutes')
const FuncionarioRoutes = require('./routes/FuncionarioRoutes')
const MovimentacaoRoutes = require('./routes/MovimentacaoRoute')

app.use('/api/auth', LoginRoutes)
app.use('/api/administrador', AdministradorRoutes)
app.use('/api/funcionario', FuncionarioRoutes)
app.use('/api/movimentacao', MovimentacaoRoutes)

app.listen(8080)
