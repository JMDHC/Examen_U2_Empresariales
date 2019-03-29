const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/examenU2');

var esquema = mongoose.Schema({
	code: {
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		default: 0
	},
	minimum: {
		type: Number,
		default: 0
	}
});

var Product = mongoose.model('Products', esquema, 'products');

function crearProducto(product){
	Product.create(product)
	.then(data=>{
		console.log("Producto creado");
		process.exit(0);
	})
	.catch(err=>{
		console.log(err);
		process.exit(1);
	});
}

function buscarReorden(){
	Product.find({$where: "this.quantity < this.minimum"})
	.then(datos=>{
		console.log(datos);
		process.exit(0);
	})
	.catch(err=>{
		console.log(err);
		process.exit(1);
	})
}

//crearProducto({code:"abc", price: 29.99, description: "producto nuevo", quantity: 10, minimum: 11});
//crearProducto({code:"bca", price: 9.99, description: "producto", quantity: 15, minimum: 11});
buscarReorden();