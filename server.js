import express from "express"
import ProductManager from "./api/ProductManager.js";
import CartManager from "./api/CartManager"

let productos = new ProductManager ()
let carrito = new CartManager()

const app = express ()
app.use(express.static('public'))

const routerProductos = express.Router()
const routerCarrito =express.Router()

app.use("/productos",routerProductos)
app.use("/carrito", routerCarrito)

routerProductos.use(express.json())
routerProductos.use(express.urlencoded({extended:true}))

routerCarrito.use(express.json())
routerCarrito.use(express.urlencoded({extended:true}))




//

routerProductos.get("/listar", (req, res) => {res.json(productos.listarAll())})
routerProductos.get("/listar/:id", (req, res) => {
    let {id} = req.params
    res.json(productos.listar(id))
})

routerProductos.post("/guardar", (req, res) =>{
    let producto = req.body
    productos.guardar(producto)
    res.json(producto)
})

routerProductos.put("/actualizar/:id", (req, res) => {
    let {id} = req.params
    let producto = req.body
    productos.actualizar(producto, id)
    req.json(producto)
})

routerProductos.delete("/borrar/:id",(req,res) => {
    let { id } = req.params
    let producto = productos.borrar(id)
    res.json(producto)
})



//

routerCarrito.get("/listar", (req, res) => {
    res.json(carrito.list())
})

routerCarrito.post("/guardar/:id", (req, res) =>{
    let { id } = req.params
    let agregar =carrito.addToCart(id)
    res.json(agregar)
})

routerCarrito.delete("/borrar/:id",(req,res) => {
    let { id } = req.params
    let producto = carrito.deleteFromCart(id)
    res.json(producto)
})


//
const PORT= 8080

const server = app.listen(PORT, ()=>{
    console.log(`server listening PORT ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))
const manager = new ProductManager("./data.json");