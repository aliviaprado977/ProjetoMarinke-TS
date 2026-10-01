const app = require('./app');
const sequelize = require('./config/database');

async function iniciar() {
  await sequelize.sync();
  app.listen(3000, () => console.log('Servidor rodando em http://localhost:3000'));
}

if (require.main === module) iniciar();

module.exports = iniciar;
