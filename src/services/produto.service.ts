const Produto = require('../models/produto.model');

async function listar() {
  return Produto.findAll({ order: [['id', 'ASC']] });
}

async function buscarPorId(id) {
  return Produto.findByPk(id);
}

async function criar(dados) {
  if (!dados.nome || dados.preco == null) {
    throw new Error('nome e preco são obrigatórios');
  }
  return Produto.create({ nome: dados.nome, preco: dados.preco });
}

async function atualizar(id, dados) {
  const produto = await Produto.findByPk(id);
  if (!produto) return null;
  if (!dados.nome || dados.preco == null) {
    throw new Error('nome e preco são obrigatórios');
  }
  await produto.update({ nome: dados.nome, preco: dados.preco });
  return produto;
}

async function excluir(id) {
  const produto = await Produto.findByPk(id);
  if (!produto) return false;
  await produto.destroy();
  return true;
}

module.exports = { listar, buscarPorId, criar, atualizar, excluir };
