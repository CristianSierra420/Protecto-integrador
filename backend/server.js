
const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = 3001; // Usamos un puerto diferente al del frontend de React

// Middlewares
app.use(cors()); // Permite que el frontend se comunique con este backend
app.use(express.json()); // Permite al servidor entender el formato JSON en las peticiones

// Ruta de prueba para verificar que el servidor funciona
app.get('/', (req, res) => {
  res.send('¡El servidor del backend está funcionando!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
