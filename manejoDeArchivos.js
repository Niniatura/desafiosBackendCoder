const fs = require('fs');
const path = require('path');

class ProductManager{
    constructor(){
    this.products =[];
    this.path = path.join('./products.json');
    }
    fileExists(){
        return fs.existsSync(this.file);
    }
    addProduct(id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock){
        const product = {
            id: this.products.length + 1,
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
                fs.readFile('./products.json', (err, data) => {
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
                fs.writeFileSync('./products.json', JSON.stringify(this.products), 'utf8');
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
            });
        });
    }
    getProducts() {
        return new Promise((resolve, reject) => {
          fs.readFile('./products.json', "utf8", (err, data) => {
            if (err) {
              reject(err);
            }
            this.products = JSON.parse(data);
            resolve(this.products);
            console.log(data)
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
            this.products = this.products.filter((product) => product.id !== id);
            fs.writeFile;
          });
        });
      }
}
module.exports=ProductManager;
const productManager = new ProductManager();
productManager.addProduct(this.id, 'producto 1', 'description', 180, 'imageUrl', 1234, 45);
console.log(productManager.getProducts())
// console.log(productManager.getProductById(3))
// productManager.updateProduct(this.id, 'producto 1', 'description modificada', 180, 'imageUrl', 1234, 45);
// productManager.deleteProductById(1)
// console.log(getProductById(1))