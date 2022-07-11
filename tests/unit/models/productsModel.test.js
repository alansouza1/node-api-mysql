const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../../models/connection');
const ProductsModel = require('../../../models/productsModel');

describe('Faz uma requisição para listar produtos do DB', () => {
  describe('quando a requisição é para listar todos os produtos', () => {

    before(async () => {
      const execute = [[
        {
          "id": 1,
          "name": "Martelo de Thor"
        },
        {
          "id": 2,
          "name": "Traje de encolhimento"
        },
        {
          "id": 3,
          "name": "Escudo do Capitão América"
        }
      ], 'Other info'];

      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('retorna um array', async () => {
      const response = await ProductsModel.getAll();

      expect(response).to.be.a('array');
    });
  });

  describe('quando a requisição é para listar o produto pelo id correto', () => {

    before(async () => {
      const execute = [[{
        "id": 1,
        "name": "Martelo de Thor"
      }], 'Other info'];

      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductsModel.findById(1);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do produto', async () => {
      const response = await ProductsModel.findById(1);

      expect(response).to.have.a.property('id');
    });
  });

  describe('quando a requisição é para listar o produto pelo id errado', () => {

    before(async () => {
      const execute = [[], 'Other info'];

      sinon.stub(connection, 'execute').resolves(execute);
    });
    after(async () => {
      connection.execute.restore();
    });

    it('retorna null', async () => {
      const response = await ProductsModel.findById(4);

      expect(response).to.be.null;
    });
  });
});