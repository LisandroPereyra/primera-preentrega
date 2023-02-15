import fs from 'fs';


class ProductManager{

    constructor(path){
        this.productos = []
        this.id = 0
        this.path= path
    }

    getData(){
        if(fs.existsSync(this.path)){
          this.products = JSON.parse(fs.readFileSync(this.path))
        }
        else{
            console.log("No se encontro el archivo")
        }
      }


    listar(id){
        this.getData()
        let prod = this.productos.find(prod => prod.id == id)
        return prod || {error: 'Producto no encontrado'}
    }

    listarAll(){
        this.getData()
        return this.productos.length? this.productos : {error: 'No hay productos cargados'}
    }

    guardar(prod) {
        this.getData()
        prod.id = ++this.id
        this.productos.push(prod)
        fs.writeFileSync(this.path, JSON.stringify(this.products))
    }

    actualizar(prod, id){
        this.getData()
        prod.id = Number(id)
        let index = this.productos.findIndex(prod => prod.id == id)
        this.productos.splice(index, 1, prod)
        fs.writeFileSync(this.path, JSON.stringify(this.products))
    }

    eliminar(id){
        this.getData()
        let index = this.productos.findeIndex(prod => prod.id == id)
        this.productos.splice(index,1)
        fs.writeFileSync(this.path, JSON.stringify(this.products))
    }
}

export default ProductManager
