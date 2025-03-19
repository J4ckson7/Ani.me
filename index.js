// Área de importação de dependências
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const userRouter = require('./routes/userRouter')
const adminRouter = require('./routes/adminRouter')

// Conexão com o banco de dados
mongoose.connect(process.env.MONGOOSE_CONNECT);

// Definição de rotas para entrada
app.use('/user', userRouter);
app.use('/admin', adminRouter);

// Definição do template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));

// Definição do porta do servidor
app.listen(process.env.PORT, () => console.log('Server online'))