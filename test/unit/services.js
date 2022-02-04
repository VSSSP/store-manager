const sinon = require('sinon');
const { expect } = require('chai');
const { listOfProducts, editedProduct, insertNewProduct } = require('./mock/produtsMock');
const { editedSale, getAllSales, salesPayload, salesById } = require('./mock/salesMock');

const productsService = require('../../services/productsService');
const productsModel = require('../../models/productsModel');
const productsSchema = require('../../schemas/productsSchema');

const salesModel = require('../../models/salesModel');
const salesService = require('../../services/salesService');

describe('Testa a camada de Services', () => {
  describe('Quando editado um produto pelo id', () => {
    before(async () => {
      sinon.stub(productsModel, 'editProduct').resolves(editedProduct);
    });
    after(async () => {
      productsModel.editProduct.restore();
    });
    it('deveria retornar um objeto', async () => {
      const response = await productsService.edit(1, 'Xablau', 5);
      expect(response).to.be.a('object');
    });
    it('deveria retornar um objeto com uma propriedade "id" com valor "1"', async () => {
      const response = await productsService.edit(1, 'Xablau', 5);
      expect(response.product).to.have.a.property('id').equals(1);
    });
    it('deveria retornar um objeto com uma propriedade "name" com valor "Xablau"', async () => {
      const response = await productsService.edit(1, 'Xablau', 5);
      expect(response.product).to.have.a.property('name').equals('Xablau');
    });
  });

  describe('Quando removido um produto pelo id', () => {
    before(async () => {
      sinon.stub(productsSchema, 'findProduct').resolves(listOfProducts[0]);
      sinon.stub(productsModel, 'removeProduct').resolves(undefined);
    });
    after(async () => {
      productsSchema.findProduct.restore();
      productsModel.removeProduct.restore();
    });
    it('deveria retornar um objeto', async () => {
      const response = await productsService.remove(1);
      expect(response).to.be.a('object');
    });
    it('deveria retornar um objeto com uma propriedade "id" com valor "1"', async () => {
      const response = await productsService.remove(1);
      expect(response.product).to.have.a.property('id').equals(1);
    });
  });

  describe('Quando registrado um novo produto', () => {
    before(async () => {
      sinon.stub(productsModel, 'register').resolves(insertNewProduct);
    });
    after(async () => {
      productsModel.register.restore();
    });
    it('deveria retornar um objeto', async () => {
      const response = await productsService.register(insertNewProduct);
      expect(response).to.be.a('object');
    });
    it('deveria retornar um objeto com uma propriedade "name" com valor "Xablau"', async () => {
      const response = await productsService.register(insertNewProduct);
      expect(response.product).to.have.a.property('name').equals('Xablau');
    });
  });

  describe('Quando buscado todos os produtos', () => {
    before(async () => {
      sinon.stub(productsModel, 'getAll').resolves(listOfProducts);
    });
    after(async () => {
      productsModel.getAll.restore();
    });
    it('deveria retornar um array na chave products', async () => {
      const response = await productsService.getAll();
      expect(response.products).to.be.a('array');
    });
    it('tal chave products, deveria retornar um array com 3 objetos', async () => {
      const response = await productsService.getAll();
      expect(response.products).to.have.lengthOf(3);
    });
  });

  describe('Quando buscado um produto pelo id', () => {
    before(async () => {
      sinon.stub(productsSchema, 'findProduct').resolves(listOfProducts[0]);
    });
    after(async () => {
      productsSchema.findProduct.restore();
    });
    it('deveria retornar um objeto', async () => {
      const response = await productsService.getProductById(1);
      expect(response).to.be.a('object');
    });
    it('deveria retornar um objeto com uma propriedade "id" com valor "1"', async () => {
      const response = await productsService.getProductById(1);
      expect(response.product).to.have.a.property('id').equals(1);
    });
    it('deveria retornar um objeto com uma propriedade "name" com valor "Ruffles"', async () => {
      const response = await productsService.getProductById(1);
      expect(response.product).to.have.a.property('name').equals('Ruffles');
    });
  });
  describe('Quando solicitada a listagem das vendas', () => {
    before(async () => {
      sinon.stub(salesModel, 'getAll').resolves([getAllSales]);
    })
    after(async () => {
      salesModel.getAll.restore();
    });
    it('deveria retornar um objeto', async () => {
      const response = await salesService.getAll();
      expect(response).to.be.a('object');
    })
    it('tal objeto deveria ter um atributo code com valor 200', async () => {
      const response = await salesService.getAll();
      expect(response.code).to.be.equals(200);
    });
  });
  describe('Quando solicitada as vendas pelo id', () => {
    before(async () => {
      sinon.stub(salesModel, 'getSaleById').resolves(salesById);
    })
    after(async () => {
      salesModel.getSaleById.restore();
    });
    it('deveria retornar um objeto', async () => {
      const response = await salesService.getSaleById(1);
      expect(response).to.be.a('object');
    });
    it('tal objeto deveria ter um atributo code com valor 200', async () => {
      const response = await salesService.getSaleById(1);
      expect(response.code).to.be.equals(200);
    });
  });
  describe('Quando solicitada a edição de uma venda', () => {
    before(async () => {
      sinon.stub(salesModel, 'editSale').resolves(1, editedSale);
    })
    after(async () => {
      salesModel.editSale.restore();
    });
    it('deveria retornar um objeto', async () => {
      const response = await salesService.editSale(1, editedSale);
      expect(response).to.be.a('object');
    });
    it('tal objeto deveria ter um atributo code com valor 200', async () => {
      const response = await salesService.editSale(1, editedSale);
      expect(response.code).to.be.equals(200);
    });
  });
})