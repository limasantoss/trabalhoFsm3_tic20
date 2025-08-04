const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const ARQUIVO = path.join(__dirname, 'estatisticas.json');

function lerDados() {
  try {
    if (!fs.existsSync(ARQUIVO)) {
      fs.writeFileSync(ARQUIVO, '{}');
    }
    const dados = fs.readFileSync(ARQUIVO, 'utf-8');
    return JSON.parse(dados);
  } catch (err) {
    console.error('Erro ao ler o arquivo JSON:', err);
    return {};
  }
}

function salvarDados(dados) {
  try {
    fs.writeFileSync(ARQUIVO, JSON.stringify(dados, null, 2));
  } catch (err) {
    console.error('Erro ao salvar arquivo JSON:', err);
  }
}

router.get('/estatisticas', (req, res) => {
  const dados = lerDados();
  res.json(dados);
});

router.post('/estatisticas', (req, res) => {
  const novosDados = req.body;
  if (!novosDados || Object.keys(novosDados).length === 0) {
    return res.status(400).json({ erro: 'Nenhum dado fornecido para atualização' });
  }

  const dadosAtuais = lerDados();
  const dadosAtualizados = { ...dadosAtuais, ...novosDados };

  salvarDados(dadosAtualizados);

  res.json({ message: 'Dados atualizados com sucesso!', dados: dadosAtualizados });
});

module.exports = router;
