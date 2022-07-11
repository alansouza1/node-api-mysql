const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe('Ao fazer uma requisição para o controller', () => {
  describe('quando a requisição é para listar todos os produtos', () => {
    const response = {};
    const request = {};
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

    before(() => {
      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();      

      sinon.stub(productsService, 'getAll')
        .resolves(productsArray);
    });
    after(() => {
      productsService.getAll.restore();
    });

    it('é chamada o status com o código 200', async () => {
      await productsController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com o array de produtos', async () => {
      await productsController.getAll(request, response);

      expect(response.json.calledWith(productsArray)).to.be.equal(true);
    });

  });

  describe('quando a requisição é para listar produtos pelo id correto', () => {
    const response = {};
    const request = {};
    const product = {
      "id": 1,
      "name": "Martelo de Thor"
    };

    before(() => {
      request.params = {
        id: 1
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();

      sinon.stub(productsService, 'findById')
        .resolves(product);
    });
    after(() => {
      productsService.findById.restore();
    });

    it('é chamada o status com o código 200', async () => {
      await productsController.findById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });

    it('é chamado o json com o produto', async () => {
      await productsController.findById(request, response);

      expect(response.json.calledWith(product)).to.be.equal(true);
    });
  });

  describe('quando a requisição é para listar produtos pelo id errado', () => {
    const response = {};
    const request = {};
    const errorMessage = { message: 'Product not found' };

    before(() => {
      request.params = {
        id: 4
      };

      response.status = sinon.stub()
        .returns(response);
      response.json = sinon.stub()
        .returns();


      sinon.stub(productsService, 'findById')
        .resolves(null);
    });
    after(() => {
      productsService.findById.restore();
    });

    it('é chamada o status com o código 404', async () => {
      await productsController.findById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });

    it('é chamado o json com o produto', async () => {
      await productsController.findById(request, response);

      expect(response.json.calledWith(errorMessage)).to.be.equal(true);
    });
  });
});