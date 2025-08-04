const express = require('express');
const cors = require('cors');
const estatisticasRouter = require('./rotasDeEstatisticas');

const app = express();

app.use(cors());          
app.use(express.json());
app.use('/', estatisticasRouter);

app.listen(3000, () => { 
  console.log('Servidor rodando na porta 3000');
});
