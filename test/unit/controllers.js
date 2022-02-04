const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productsService');
const productsController = require('../../controllers/productsController');

const { listOfProducts } = require('./mock/produtsMock');

describe('Testa a camada de Controllers', () => {
  describe('Quando buscado todos os produtos', () => {
    const request = {};
    const response = {};

    before(() => {
      request.body = {};
      
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      
      sinon.stub(productsService, 'getAll').resolves(listOfProducts);
    });

    after(() => {
      productsService.getAll.restore();
    });

    it('Deveria retornar um status 200', async () => {
      await productsController.getAll(request, response);
      expect(productsService.getAll.calledOnce).to.be.true;
      expect(response.status.calledWith(200)).to.be.true;
    });
  });
});