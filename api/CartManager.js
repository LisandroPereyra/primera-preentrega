import fs from 'fs';



class CartManager {
    constructor(){
        this.cart = []
        this.stock = []
    }


// refrescar carrito 
    getCart(){
        if(fs.existsSync("./Cart.json"))
        {
            this.cart = JSON.parse(fs.readFileSync("./Cart.json", "utf-8"))
            console.log (this.cart)
        }
        else{
            console.log("cant reach carrito")
        } 
    }

// refrescar stock
    getStock(){
        if(fs.existsSync("./Productos.json"))
        {
            this.cart = JSON.parse(fs.readFileSync("./Cart.json", "utf-8"))
            console.log (this.cart)
        }
        else{
            console.log("cant reach Productos")
        } 
    }

    list(){
        this.getCart()
        console.log(this.cart)
    }

// agregar producto al carrito
    addToCart(id){
        this.getCart()
        this.getStock()
        const existent = this.stock.some(product => product.id === id)

        if(existent){
            if (this.cart.some(product=> product.id === id))
            {
                this.cart.map(product =>{
               
                    product.cantidad ++
                    product.stock --
                })
                
            }
            else
            {
                const producto = this.stock.filter(product=> product.id === id)
                
                this.cart.push(producto)
                console.log ("Producto agregado al carrito:")
                console.log (producto)
            }
                

        }
        else{
            console.log("producto no encontrado")
        }

        fs.writeFileSync("./Cart.json", JSON.stringify(this.cart))
    }


    deleteFromCart(id){
        this.getCart()
        let index = this.cart.findeIndex(prod => prod.id == id)
        this.cart.splice(index,1)
        fs.writeFileSync("./Cart.json", JSON.stringify(this.cart))
    }




}

export default CartManager