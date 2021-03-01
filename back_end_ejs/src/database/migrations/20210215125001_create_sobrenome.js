
exports.up = function(knex) {
    return knex.schema.createTable('sobrenomes', function(table){
    table.increments('id').primary();
    table.string('sobrenome', 100).notNullable();
    table.bigInteger('cod').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('sobrenomes');
};
