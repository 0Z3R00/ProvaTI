
exports.up = function(knex) {
    return knex.schema.createTable('emails', function(table){
    table.increments('id').primary();
    table.string('email', 100).notNullable();
    table.bigInteger('cod').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('emails');
};
