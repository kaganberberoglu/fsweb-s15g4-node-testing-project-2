/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    const all = knex.schema
        .createTable("Missions", t => {
            t.increments("MissionID")
            t.string("Name").notNullable()
            t.string("Description")
        })
        .createTable("Tasks", t => {
            t.increments("TaskID")
            t.string("Name").notNullable()
            t.string("Description")
            t.dateTime("Date").defaultTo(knex.fn.now())
            t.integer("MissionID").references("MissionID").inTable("Missions")
        });
    return all;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("Tasks")
        .dropTableIfExists("Missions")
};
