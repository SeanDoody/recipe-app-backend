const express = require('express');
const recipes = express.Router();
const pool = require('../db/connection.js');

recipes.get('/', (req, res) => {
    const sql = 'SELECT * FROM favorite_recipes ORDER BY record_id ASC';
    pool.query(sql).then((result) => {
        res.json(result.rows);
    });
});

recipes.get('/:apiUri', (req, res) => {
    const sql = 'SELECT * FROM favorite_recipes WHERE api_uri = $1';
    pool.query(sql, [req.params.apiUri]).then(result => {
        res.json(result.rows);
    });
});

recipes.post('/', (req, res) => {
    const sql = `INSERT INTO favorite_recipes (name, api_uri, api_url, source_name, source_url, \
        image_url, cuisine_type, health_labels, ingredients, dish_type, total_time, yield) VALUES \
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`;
    pool.query(sql, [
        req.body.name,
        req.body.apiUri,
        req.body.apiUrl,
        req.body.sourceName,
        req.body.sourceUrl,
        req.body.imageUrl,
        req.body.cuisineType,
        req.body.healthLabels,
        req.body.ingredients,
        req.body.dishType,
        req.body.totalTime,
        req.body.yield,
    ]).then((result) => {
        res.status(201).send(result.rows[0]);
    });
});

recipes.delete('/:apiUri', (req, res) => {
    const sql = 'DELETE FROM favorite_recipes WHERE api_uri = $1';
    pool.query(sql, [req.params.apiUri]).then(result => {
        res.sendStatus(204);
    })
});

module.exports = recipes;
