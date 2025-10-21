// Importamos Express para crear el router y manejar rutas HTTP
const express = require('express');
// Importamos el modelo LearningTopic que contiene toda la lógica de base de datos
const LearningTopic = require('../models/LearningTopic');

// Creamos un router de Express para organizar todas las rutas relacionadas con temas
const router = express.Router();

// RUTA PRINCIPAL: Mostrar todos los temas en la página de inicio, Obtenemos los temas desde la base de datos
// GET funciona con una petición simple sin parámetros 
router.get('/', (req, res) => {
    const topics = LearningTopic.findAllTopics();
    res.render('index', { topics: topics });
});

// DETALLE DE TEMA: Ver un tema específico con todos sus enlaces
// GET funciona con parámetros de ruta (:id) extrayendo el ID desde req.params.id
router.get('/topic/:id', (req, res) =>{
    const topic = LearningTopic.findTopicById(req.params.id);
    if (!topic) return res.status(404).send('Tema no encontrado');
    res.render('topicDetail', { topic: topic });
});


// FORMULARIO NUEVO TEMA: Mostrar el formulario para crear un tema
// GET funciona sin parámetros, simplemente renderiza la vista del formulario
router.get('/new-topic', (req, res) => {
    res.render('newTopic');
});

// CREAR NUEVO TEMA: Procesar el formulario y crear el tema en la BD
// POST funciona con datos del formulario extrayendo el título desde req.body
router.post('/new-topic', (req, res) => {
    const { title } = req.body;
    
    if (title && title.trim() !== '') {
        LearningTopic.createTopic(title.trim());
    }
    res.redirect('/');
});

// FORMULARIO EDITAR TEMA: Mostrar formulario pre-llenado para editar un tema
// GET funciona con parámetro de ruta (:id) extrayendo el ID desde req.params.id
router.get('/edit-topic/:id', (req,res) => {
    const topic = LearningTopic.findTopicById(req.params.id);
    if (!topic) return res.status(404).send('Tema no encontrado');
    res.render('editTopic', { topic: topic});
});

// ACTUALIZAR TEMA: Procesar la edición y actualizar en la base de datos
// POST funciona con parámetro de ruta (:id) y datos del formulario, combinando ID desde req.params.id y título desde req.body
router.post('/edit-topic/:id', (req, res) => {
    const { title } = req.body;
    if (title && title.trim() !== ''){
        LearningTopic.updateTopic(req.params.id, title.trim() )
    }
    res.redirect(`/`);
});



// ELIMINAR TEMA: Borrar un tema y todos sus enlaces asociados
// POST funciona con parámetro de ruta (:id) extrayendo el ID desde req.params.id
router.post('/delete-topic/:id', (req, res) => {
    LearningTopic.deleteTopic(req.params.id);
    res.redirect('/');
});

// VOTAR TEMA: Incrementar los votos de un tema específico
// POST funciona con parámetro de ruta (:id) extrayendo el ID desde req.params.id
router.post('/vote-topic/:id', (req, res) => {
    LearningTopic.voteForTopic(req.params.id);
    res.redirect('/');
});

// FORMULARIO NUEVO ENLACE: Mostrar formulario para agregar enlace a un tema específico
// GET funciona con parámetro de ruta (:topicId) extrayendo el ID del tema desde req.params.topicId
router.get('/new-link/:topicId', (req, res) => {
    const topic = LearningTopic.findTopicById(req.params.topicId);
    if (!topic) return res.status(404).send('Tema no encontrado');
    res.render('newLink', { topic: topic});
});

// CREAR ENLACE: Procesar formulario y agregar nuevo enlace al tema
// POST funciona con parámetro de ruta (:topicId) y datos del formulario, combinando ID desde req.params.topicId con título y URL desde req.body
router.post('/new-link/:topicId', (req, res) => {
    const { title, url } = req.body;
    if (title && title.trim()!=='' && url.trim()!==''){
        LearningTopic.createLink(title.trim(), url.trim(), req.params.topicId);
    }
    res.redirect(`/topic/${req.params.topicId}`);
});

// FORMULARIO EDITAR ENLACE: Mostrar formulario pre-llenado para editar un enlace
// GET funciona con parámetro de ruta (:linkId) extrayendo el ID del enlace desde req.params.linkId
router.get('/edit-link/:linkId', (req, res) => {
    const link = LearningTopic.findLinkById(req.params.linkId);
    if (!link) return res.status(404).send('Link no encontrado');
    res.render('editLink', { link: link});
});

// ACTUALIZAR ENLACE: Procesar edición y actualizar enlace en la base de datos
// POST funciona con parámetro de ruta (:linkId) y datos del formulario, combinando ID desde req.params.linkId con título y URL desde req.body
router.post('/edit-link/:linkId', (req, res) => {
    const { title, url } = req.body;
    const link = LearningTopic.findLinkById(req.params.linkId);
    
    if (!link) return res.status(404).send('Link no encontrado');
    
    if (title && title.trim() !== '' && url && url.trim() !== '') {
        LearningTopic.updateLink(req.params.linkId, title.trim(), url.trim());
    }
    
    res.redirect(`/topic/${link.topic_id}`);
});

// ELIMINAR ENLACE: Borrar un enlace específico
// POST funciona con parámetro de ruta (:id) extrayendo el ID del enlace desde req.params.id
router.post('/delete-link/:id', (req, res) => {
    const link = LearningTopic.findLinkById(req.params.id);
    if (link){
        LearningTopic.deleteLink(req.params.id);
        res.redirect(`/topic/${link.topic_id}`);
    }
});

// VOTAR ENLACE: Incrementar los votos de un enlace específico
// POST funciona con parámetro de ruta (:id) extrayendo el ID del enlace desde req.params.id
router.post('/vote-link/:id', (req, res) => {
    const link = LearningTopic.findLinkById(req.params.id);
    if (link){
        LearningTopic.voteForLink(req.params.id);
        res.redirect(`/topic/${link.topic_id}`);
    }
});

// Exportamos el router para que pueda ser usado por la aplicación principal
module.exports = router;
