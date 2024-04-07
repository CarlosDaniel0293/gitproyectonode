const express = require('express');
const app = express();

app.use(express.json());

const productos = [
    { id: 1, nombre: 'Producto 1', precio: 10 },
    { id: 2, nombre: 'Producto 2', precio: 20 },
    { id: 3, nombre: 'Producto 3', precio: 30 }
  ];

app.get('/productos', (req, res) => {
  res.json(productos);
});

app.post('/productos', (req, res) => {
    const nuevoProducto = req.body;
    productos.push(nuevoProducto);
    res.json(nuevoProducto);
});

app.put('/productos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const productoActualizado = req.body;
  
    const producto = productos.find(p => p.id === id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
  
    producto.nombre = productoActualizado.nombre;
    producto.precio = productoActualizado.precio;
  
    res.json(producto);
});

app.delete('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = productos.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  productos.splice(index, 1);

  res.json({ mensaje: 'Producto eliminado' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor Express corriendo en el puerto ${port}`);
});
