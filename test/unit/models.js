const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const productsModel = require('../../models/productsModel');
const salesModel = require('../../models/salesModel');
const { listOfProducts, insertNewProduct } = require('./mock/produtsMock');
const { getAllSales, salesPayload, editedSale } = require('./mock/salesMock');

describe('Testa a camada de models', () => {
  describe('Quando inserido um novo produto', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves(listOfProducts);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('deveria retornar um objeto', async () => {
      const response = await productsModel.register(insertNewProduct);
      expect(response).to.be.a('object');
      });
  
    it('tal objeto deveria possuir o "id" do novo produto inserido', async () => {
      const response = await productsModel.register(insertNewProduct);
      expect(response).to.have.a.property('id');
    });
  })

  describe('Quando procura um produto por id', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves(listOfProducts);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('deveria retornar um objeto', async () => {
      const response = await productsModel.findProductById(1);
      expect(response).to.be.a('object');
    });
    it('tal objeto deveria possuir o "id" do produto procurado', async () => {
      const response = await productsModel.findProductById(1);
      expect(response).to.have.a.property('id');
    });
  })

  describe('Quando edita um produto', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves(listOfProducts);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('deveria retornar um objeto', async () => {
      const response = await productsModel.editProduct(1, 'teste', 10);
      expect(response).to.be.a('object');
    });
    it('tal objeto deveria possuir o MESMO "id" do produto editado', async () => {
      const response = await productsModel.editProduct(1, 'teste', 10);
      expect(response).to.have.a.property('id');
    });
  });

  describe('Quando encontra um produto pelo nome', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves(listOfProducts);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('deveria retornar um objeto', async () => {
      const response = await productsModel.findProductByName('Ruffles');
      expect(response).to.be.a('object');
    });
    it('tal objeto deveria possuir o "id" do produto encontrado', async () => {
      const response = await productsModel.findProductByName('Ruffles');
      expect(response).to.have.a.property('id');
    });
  })

  describe('Quando deleta um produto', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([listOfProducts]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('essa função deveria apagar o produto e não retornar nada', async () => {
      const response = await productsModel.removeProduct(1);
      expect(response).to.be.a('undefined');
    });
  })
  
  describe('Quando lista todos os produtos', () => { 
    before(async () => {
      sinon.stub(connection, 'execute').resolves([listOfProducts]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('deveria retornar um array', async () => {
      const response = await productsModel.getAll();
      expect(response).to.be.an('array');
    });
    it('deveria retornar um array com 3 objetos', async () => { 
      const response = await productsModel.getAll();
      expect(response).to.have.lengthOf(3);
    });
  });

  describe('Quando lista todas as vendas', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([getAllSales]);
    });
    after(async () => {
      connection.execute.restore();
    });
    it('deveria retornar um array', async () => {
      const response = await salesModel.getAll();
      expect(response).to.be.an('array');
    });
    it('deveria retornar um array com 12 objetos', async () => {
      const response = await salesModel.getAll();
      expect(response).to.have.lengthOf(12);
    });
  });
  describe('Quando é requisitado a listagem de vendas pelo id', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([getAllSales.filter((sale) => sale.saleId === 2)]);
    })
    after(async () => {
      connection.execute.restore();
    });
    it('deveria retornar um array com as vendas daquele id', async () => {
      const response = await salesModel.getSaleById(2);
      expect(response).to.be.an('array');
    });
    it('deveria retornar um array com as 3 vendas daquele id', async () => {
      const response = await salesModel.getSaleById(2);
      expect(response).to.have.lengthOf(3);
    });
  });
  describe('Quando é requisitado para editar uma venda', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves([editedSale]);
    })
    after(async () => {
      connection.execute.restore();
    });
    it('deveria retornar um array com a venda editada', async () => {
      const response = await salesModel.editSale(1, editedSale);
      expect(response.sales).to.be.an('array');
    })
    it('deveria retornar um objeto da venda editada com a nova quantidade' , async () => {
      const response = await salesModel.editSale(1, editedSale);
      expect(response.sales[0]).to.have.a.property('quantity').equals(6);
    })
  });
  describe('Quando é requisitado para deletar uma venda', () => {
    before(async () => {
      sinon.stub(connection, 'execute').resolves(1);
    })
    after(async () => {
      connection.execute.restore();
    });
    it('deveria retornar o id da venda deletada', async () => {
      const response = await salesModel.deleteSale(1);
      expect(response).to.equals(1);
    })
  });
  describe('Quando é requisitado para criar uma venda', () => {
    before(async () => {
      sinon.stub(connection, 'query').resolves([{ insertId: 1 }]);
      sinon.stub(connection, 'execute').resolves([editedSale]);
    })
    after(async () => {
      connection.execute.restore();
    });
    it('deveria retornar o id da venda criada', async () => {
      const response = await salesModel.registerSale(editedSale);
      console.log(response);
      expect(response).to.equals(1);
    });
  });
});


