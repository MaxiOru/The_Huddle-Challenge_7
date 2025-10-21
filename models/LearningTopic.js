// Importamos la instancia de base de datos configurada en database.js
const { db } = require('../config/database');

// Objeto LearningTopic: Modelo que contiene todos los métodos para interactuar con las tablas learning_topics y topic_links
const LearningTopic = {
    // CREAR TEMA: Inserta un nuevo tema en la base de datos recibiendo el título como parámetro
    createTopic(title) {
        const stmt = db.prepare(`INSERT INTO learning_topics (title) VALUES (?)`);
        stmt.run(title);
    },

    // OBTENER TODOS LOS TEMAS: Consulta todos los temas con el conteo de enlaces asociados, usa LEFT JOIN para combinar tablas y ordena por votos
    findAllTopics() {
        const stmt = db.prepare(`SELECT lt.*, COUNT(tl.id) as link_count FROM learning_topics lt
        LEFT JOIN topic_links tl ON lt.id = tl.topic_id
        GROUP BY lt.id
        ORDER BY lt.votes DESC`);
        return stmt.all();
    },

    // OBTENER TEMA POR ID: Busca un tema específico y agrega sus enlaces asociados ordenados por votos, recibe el ID como parámetro
    findTopicById(id, title){
        const topic = db.prepare(`SELECT * FROM learning_topics WHERE id = ?`).get(id);
        if (topic){
            topic.links = db.prepare(`SELECT * FROM topic_links WHERE topic_id = ?
            ORDER BY votes DESC`).all(id);
        }
        return topic
    },

    // ACTUALIZAR TEMA: Modifica el título de un tema existente, recibe el ID y el nuevo título como parámetros
    updateTopic(id, title){
        const stmt = db.prepare(`UPDATE learning_topics SET title = ? WHERE id = ?`);
        stmt.run(title, id);
    },

    // ELIMINAR TEMA: Borra un tema de la base de datos, recibe el ID como parámetro (CASCADE eliminará también sus enlaces)
    deleteTopic(id) {
        const stmt = db.prepare(`DELETE FROM learning_topics WHERE id = ?`);
        stmt.run(id);
    },

    // VOTAR POR TEMA: Incrementa el contador de votos de un tema en 1, recibe el ID como parámetro
    voteForTopic(id){
        const stmt = db.prepare(`UPDATE learning_topics SET votes = votes + 1 WHERE id = ?`);
        stmt.run(id);
    },


    // CREAR ENLACE: Inserta un nuevo enlace asociado a un tema, recibe título, URL y topicId como parámetros
    createLink(title, url, topicId){
        const stmt = db.prepare(`INSERT INTO topic_links (title, url, topic_id) VALUES (?, ?, ?)`);
        return stmt.run(title, url, topicId)
    },

    // OBTENER ENLACE POR ID: Busca y retorna un enlace específico de la base de datos, recibe el ID como parámetro
    findLinkById(id){
        return db.prepare(`SELECT * FROM topic_links WHERE id = ?`).get(id);
    },

    // ACTUALIZAR ENLACE: Modifica el título y URL de un enlace existente, recibe el ID, título y URL como parámetros
    updateLink(id, title, url){
        const stmt = db.prepare(`UPDATE topic_links SET title = ?, url = ? WHERE id = ?`);
        stmt.run(title, url, id);
    },

    // ELIMINAR ENLACE: Borra un enlace de la base de datos, recibe el ID como parámetro
    deleteLink(id){
        const stmt = db.prepare(`DELETE FROM topic_links WHERE id = ?`);
        stmt.run(id);
    },

    // VOTAR POR ENLACE: Incrementa el contador de votos de un enlace en 1, recibe el ID como parámetro
    voteForLink(id){
        const stmt = db.prepare (`UPDATE topic_links SET votes=votes+1 WHERE id = ?`);
        stmt.run(id);
    }
};

// Exportamos el objeto LearningTopic para que pueda ser usado en los controladores
module.exports = LearningTopic;



