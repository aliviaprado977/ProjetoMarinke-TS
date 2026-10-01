const service = require('../services/produto.service');

exports.listar = async (req, res) => {
  const produtos = await service.listar();
  res.status(200).json(produtos);
};

exports.buscarPorId = async (req, res) => {
  const produto = await service.buscarPorId(req.params.id);
  if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado' });
  res.status(200).json(produto);
};

exports.criar = async (req, res) => {
  try {
    const produto = await service.criar(req.body);
    res.status(201).json(produto);
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const produto = await service.atualizar(req.params.id, req.body);
    if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado' });
    res.status(200).json(produto);
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

exports.excluir = async (req, res) => {
  const excluido = await service.excluir(req.params.id);
  if (!excluido) return res.status(404).json({ mensagem: 'Produto não encontrado' });
  res.status(204).send();
};
