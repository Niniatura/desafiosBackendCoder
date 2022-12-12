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
                    // reject(err);
                    return console.log('El producto ha sido borrado');
                }
                this.products = JSON.parse(data);
                const product = this.products.find((product) => product.id === id);
                resolve(product);
                console.log('el producto buscado por id es' + JSON.stringify(product))
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
        let filtered_list = this.products.filter((product) => product.id !== id);
        fs.writeFileSync(this.file, JSON.stringify(filtered_list), 'utf8');
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
            let product_modif=this.products
            product_modif.forEach((product) => {
                if (product.id === id) {
                    product.description = 'ahora son verdes';
                    fs.writeFileSync(this.file, JSON.stringify(data, null, 4), 'utf8');
                    console.log('el producto modificado es' + JSON.stringify(product));
                }
              });
          });
        });
      }
}
module.exports=ProductManager;
const productManager = new ProductManager();
productManager.addProduct('tomates', 'rojos', 180, 'imageUrl', 1234, 45);
productManager.addProduct('peras', 'amarillas', 2939, 'imageUrl', 08234, 48);
console.log(productManager.getProducts());
console.log(productManager.getProductById());
console.log(productManager.updateProduct());
productManager.deleteProductById();
console.log(productManager.getProductById());