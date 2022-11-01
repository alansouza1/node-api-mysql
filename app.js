const express = require('express');
const bodyParser = require('body-parser');

const ProductController = require('./controllers/productsController');
const SalesController = require('./controllers/salesController');

const app = express();

app.use(bodyParser.json());

console.log('iniciando o projeto x');

app.get('/products', ProductController.getAll);
app.get('/products/:id', ProductController.findById);

app.get('/sales', SalesController.getAll);
app.get('/sales/:id', SalesController.findById);

app.post('/products', ProductController.create);
app.post('/sales', SalesController.create);

app.put('/products/:id', ProductController.update);

app.delete('/products/:id', ProductController.deleteProduct);

app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;