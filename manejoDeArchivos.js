const fs = require('fs');
const path = require('path');

class ProductManager{
    constructor(){
    this.products =[];
    this.file = path.join(__dirname, "products.json");
    }
    fileExists(){
        return fs.existsSync(this.file);
    }
    addProduct(
        title,
        description,
        price,
        thumbnail,
        code,
        stock){
        const product = {
            id: Math.floor(Math.random() * 100),
            title: title || '',
            description: description || '',
            price: price || '',
            thumbnail: thumbnail || '',
            code: code || '',
            stock: stock || ''
            };
        
        return new Promise((resolve, reject) => {
            if (this.fileExists()){
                console.log('El archivo existe')
                fs.readFile(this.file, (err, data) => {
                    if(err){
                        return console.log('Error al leer el archivo')
                    }
                    this.products=JSON.parse(data);
                    this.products.push(product);
                    fs.writeFile('./products.json', JSON.stringify(this.products), (err) =>{
                        if(err){
                            return console.log('Error al escribir el archivo');
                        }
                        resolve();
                    });
                });
            } else {
                this.products.push(product);
                fs.writeFileSync(this.file, JSON.stringify(this.products), 'utf8');
                resolve();
            }
        });
    }
    getProductById(id){
        return new Promise((resolve, reject) => {
            fs.readFile(this.file, 'utf8', (err,data) =>{
                if(err){
                    reject(err);
                }
                this.products = JSON.parse(data);
                const product = this.products.find((product) => product.id === id);
                resolve(product);
                console.log('el producto con id 55 es' + JSON.stringify(product))
            });
        });
    }
    getProducts() {
        return new Promise((resolve, reject) => {
          fs.readFile(this.file, "utf8", (err, data) => {
            if (err) {
              reject(err);
            }
            this.products = JSON.parse(data);
            resolve(this.products);
            console.log("el json contiene" + data)
        });
        });
      }
      deleteProductById(id) {
        return new Promise((resolve, reject) => {
          fs.readFile(this.file, "utf8", (err, data) => {
            if (err) {
              reject(err);
            }
            this.products = JSON.parse(data);
            this.products = this.products.filter((product) => product.id !== id);
            fs.writeFile;
          });
        });
      }
      updateProduct(id) {
        return new Promise((resolve, reject) => {
          fs.readFile(this.file, "utf8", (err, data) => {
            if (err) {
              reject(err);
            }
            this.products = JSON.parse(data);
            let pepe=this.products
            // // let productToModify = product;
            // pepe.description=JSON.parse('descripcion modificada');
            pepe.forEach((product) => {
                // product = this.products.filter((product) => product.id !== id);
                // If the bookID is the one we are looking for, set it as null
                if (product.id === id) {
                    product.description = 'ahora son verdes';
                    fs.writeFileSync(this.file, JSON.stringify(data, null, 4), 'utf8');
                    console.log('el producto modificado es' + JSON.stringify(product))
                console.log('hola')
                }
              });
              
            //   console.log(data);
          });
        });
      }
}
module.exports=ProductManager;
const productManager = new ProductManager();
productManager.addProduct('tomates', 'rojos', 180, 'imageUrl', 1234, 45);
productManager.addProduct('peras', 'amarillas', 2939, 'imageUrl', 08234, 48);
console.log(productManager.getProducts());
console.log(productManager.getProductById((67)));
console.log(productManager.updateProduct(67))
// console.log(productManager.updateProduct(39));
// productManager.deleteProductById(1)
// console.log(getProductById(1))