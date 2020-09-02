const express = require('express');
const router = express.Router();

const {
    crearPlatillo, 
    sleccionarMenu,
    platilloUpdate,
    platilloDelete
} = require('../controllers/platillos.controller');

/**
 * Función que muestra una lista de 7 platillos.
 */
router.get('/menu-semana', sleccionarMenu);

/**
 * Función que agrega un platillo nuevo a la lista.
 */
router.post('/create', crearPlatillo);

/**
 * Función que actializa un platillo.
 */
router.post('/update', platilloUpdate);

/**
 * Función que elimina un platillo.
 */
router.post('/delete', platilloDelete);

module.exports = router;