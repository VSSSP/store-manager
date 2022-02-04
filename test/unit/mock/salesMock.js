const getAllSales = [
	{
		"saleId": 1,
		"date": "2022-02-01T22:04:19.000Z",
		"product_id": 1,
		"quantity": 4
	},
	{
		"saleId": 1,
		"date": "2022-02-01T22:04:19.000Z",
		"product_id": 1,
		"quantity": 55
	},
	{
		"saleId": 1,
		"date": "2022-02-01T22:04:19.000Z",
		"product_id": 1,
		"quantity": 32
	},
	{
		"saleId": 2,
		"date": "2022-02-01T22:04:24.000Z",
		"product_id": 1,
		"quantity": 4
	},
	{
		"saleId": 2,
		"date": "2022-02-01T22:04:24.000Z",
		"product_id": 1,
		"quantity": 55
	},
	{
		"saleId": 2,
		"date": "2022-02-01T22:04:24.000Z",
		"product_id": 1,
		"quantity": 32
	},
	{
		"saleId": 3,
		"date": "2022-02-01T22:04:26.000Z",
		"product_id": 1,
		"quantity": 4
	},
	{
		"saleId": 3,
		"date": "2022-02-01T22:04:26.000Z",
		"product_id": 1,
		"quantity": 55
	},
	{
		"saleId": 3,
		"date": "2022-02-01T22:04:26.000Z",
		"product_id": 1,
		"quantity": 32
	},
	{
		"saleId": 4,
		"date": "2022-02-01T22:04:47.000Z",
		"product_id": 2,
		"quantity": 4
	},
	{
		"saleId": 4,
		"date": "2022-02-01T22:04:47.000Z",
		"product_id": 3,
		"quantity": 55
	},
	{
		"saleId": 4,
		"date": "2022-02-01T22:04:47.000Z",
		"product_id": 1,
		"quantity": 32
	}
];

const salesPayload = [
	{
		"date": "2022-02-03T18:05:06.000Z",
		"product_id": 1,
		"quantity": 30
	},
	{
		"date": "2022-02-03T18:05:06.000Z",
		"product_id": 3,
		"quantity": 2
	},
	{
		"date": "2022-02-03T18:05:06.000Z",
		"product_id": 2,
		"quantity": 2
	}
];

const editedSale =   [
	{
		"product_id": 1,
		"quantity": 6
	}
];

const salesById = [
	{
		"saleId": 1,
		"date": "2022-02-01T22:04:19.000Z",
		"product_id": 1,
		"quantity": 4
	},
	{
		"saleId": 1,
		"date": "2022-02-01T22:04:19.000Z",
		"product_id": 1,
		"quantity": 55
	},
	{
		"saleId": 1,
		"date": "2022-02-01T22:04:19.000Z",
		"product_id": 1,
		"quantity": 32
	},
]

module.exports = {
  getAllSales,
	salesPayload,
	editedSale,
	salesById,
}
