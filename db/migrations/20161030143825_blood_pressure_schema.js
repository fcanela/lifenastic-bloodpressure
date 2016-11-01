'use strict';

const tableName = 'blood_pressure';

exports.up = function(knex) {
    return knex.schema.createTable(tableName, function createTable (table) {
        table.bigIncrements('id').primary();
        table.bigInteger('userId');
        table.timestamp('date', false).notNullable();
        table.integer('systolic').notNullable();
        table.integer('diastolic').notNullable();
        table.jsonb('metadata');
        // Timestamps with timezone
        table.timestamp('createdAt', false).notNullable();
        table.timestamp('updatedAt', false).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists(tableName);
};
