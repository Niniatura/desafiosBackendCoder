class ProductManager{
    constructor(){
        this.products=[];
    }
    addProduct(
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    ) {
        const product = {
        id: this.products.length + 1,
        title: title || '',
        description: description || '',
        price: price || '',
        thumbnail: thumbnail || '',
        code: code || '',
        stock: stock || ''
        };
        
        let found = this.products.some(product => product.code === code);
        if(!found){
            this.products.push(product)
        }else if(found){
            console.log('product already exists')
        }
    }

    getProducts() {
        return this.products;
    }

    getProductById(id){
        const product = this.products.find((product) => product.id === id);
        product ? console.log( product ) : console.log('Not found')
    }
}

const productManager = new ProductManager();
productManager.addProduct(this.id, 'producto 1', 'description', 180, 'imageUrl', 1234, 45);
productManager.addProduct(this.id, 'producto 2', 'description 2', 190, 'imageUrl', 19834, 485);
productManager.addProduct(this.id, 'producto 3', 'description 3', 145, 'imageUrl', 19834, 35);
productManager.addProduct(this.id, 'producto 4', null ,  39274, 'imageUrl', 453, 35);

console.log(productManager.getProducts())
console.log(productManager.getProductById(3))