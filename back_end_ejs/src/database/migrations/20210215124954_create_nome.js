
exports.up = function(knex) {
    return knex.schema.createTable('nomes', function(table){
    table.increments('id').primary();
    table.string('nome', 100).notNullable();
    table.bigInteger('cod').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('nomes');
};
