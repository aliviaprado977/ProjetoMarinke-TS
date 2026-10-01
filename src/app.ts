const express = require('express');
const path = require('path');
const produtoRoutes = require('./routes/produto.routes');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/produtos', produtoRoutes);

module.exports = app;
