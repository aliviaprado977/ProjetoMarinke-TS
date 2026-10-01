process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../src/app');
const sequelize = require('../src/config/database');

beforeEach(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('CRUD de produtos', () => {
  test('GET /produtos lista produtos', async () => {
    await request(app).post('/produtos').send({ nome: 'Notebook', preco: 3500 });
    const res = await request(app).get('/produtos');
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
    expect(res.body[0].nome).toBe('Notebook');
  });

  test('POST /produtos cria produto', async () => {
    const res = await request(app).post('/produtos').send({ nome: 'Mouse', preco: 120 });
    expect(res.status).toBe(201);
    expect(res.body.nome).toBe('Mouse');
  });

  test('POST /produtos rejeita dados incompletos', async () => {
    const res = await request(app).post('/produtos').send({ nome: 'Mouse' });
    expect(res.status).toBe(400);
    expect(res.body.mensagem).toMatch(/obrigatórios/);
  });

  test('GET /produtos/:id encontra produto', async () => {
    const criado = await request(app).post('/produtos').send({ nome: 'Teclado', preco: 200 });
    const res = await request(app).get(`/produtos/${criado.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.nome).toBe('Teclado');
  });

  test('GET /produtos/:id retorna 404', async () => {
    const res = await request(app).get('/produtos/999');
    expect(res.status).toBe(404);
  });

  test('PUT /produtos/:id atualiza produto', async () => {
    const criado = await request(app).post('/produtos').send({ nome: 'Mouse', preco: 100 });
    const res = await request(app).put(`/produtos/${criado.body.id}`).send({ nome: 'Mouse Gamer', preco: 180 });
    expect(res.status).toBe(200);
    expect(res.body.nome).toBe('Mouse Gamer');
    expect(res.body.preco).toBe(180);
  });

  test('PUT rejeita produto inexistente', async () => {
    const res = await request(app).put('/produtos/999').send({ nome: 'X', preco: 1 });
    expect(res.status).toBe(404);
  });

  test('PUT rejeita dados incompletos', async () => {
    const criado = await request(app).post('/produtos').send({ nome: 'Mouse', preco: 100 });
    const res = await request(app).put(`/produtos/${criado.body.id}`).send({ nome: 'Mouse' });
    expect(res.status).toBe(400);
  });

  test('DELETE /produtos/:id exclui produto', async () => {
    const criado = await request(app).post('/produtos').send({ nome: 'Mouse', preco: 100 });
    const res = await request(app).delete(`/produtos/${criado.body.id}`);
    expect(res.status).toBe(204);
    const busca = await request(app).get(`/produtos/${criado.body.id}`);
    expect(busca.status).toBe(404);
  });

  test('DELETE retorna 404 para produto inexistente', async () => {
    const res = await request(app).delete('/produtos/999');
    expect(res.status).toBe(404);
  });
});
