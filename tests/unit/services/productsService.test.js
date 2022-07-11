const sinon = require('sinon');
const { expect } = require('chai');

const ProductsModel = require('../../../models/productsModel');
const ProductsService = require('../../../services/productsService');

describe('Faz uma requisição para listar produtos do DB', () => {
  describe('quando a requisição é para listar todos os produtos', () => {
    before(() => {
      const productsArray = [
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
      ];

      sinon.stub(ProductsModel, 'getAll').resolves(productsArray);
    });
    after(() => {
      ProductsModel.getAll.restore();
    });

    it('retorna um array', async () => {
      const response = await ProductsService.getAll();

      expect(response).to.be.a('array');
    });
  });

  describe('quando a requisição é para listar o produto pelo id correto', () => {
    before(() => {
      const product = {
        "id": 1,
        "name": "Martelo de Thor"
      };

      sinon.stub(ProductsModel, 'findById').resolves(product);
    });
    after(() => {
      ProductsModel.findById.restore();
    });

    it('retorna um objeto', async () => {
      const response = await ProductsService.findById(1);

      expect(response).to.be.a('object');
    });

    it('tal objeto possui o "id" do produto', async () => {
      const response = await ProductsService.findById(1);

      expect(response).to.have.a.property('id');
    });
  });

  describe('quando a requisição é para listar o produto pelo id errado', () => {
    before(() => {
      const product = null;

      sinon.stub(ProductsModel, 'findById').resolves(product);
    });
    after(() => {
      ProductsModel.findById.restore();
    });

    it('retorna null', async () => {
      const response = await ProductsService.findById(4);

      expect(response).to.be.null;
    });
  });
});