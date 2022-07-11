const express = require('express');
const bodyParser = require('body-parser');

const ProductController = require('./controllers/productsController');

const app = express();

app.use(bodyParser.json());

console.log('iniciando o projeto x');

app.get('/products', ProductController.getAll);
app.get('/products/:id', ProductController.findById);
app.post('/products', ProductController.create);

// não remova esse endpoint, é para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;