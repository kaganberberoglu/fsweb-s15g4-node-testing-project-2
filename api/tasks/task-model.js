const db = require("../../data/db-config")

async function getAll() {
    return await db("Tasks");
};

async function getById(id) {
    return await db("Tasks").where("TaskID", id).first();
};

async function create(obj) {
    const [TaskID] = await db("Tasks").insert(obj);
    return await getById(TaskID);
};

async function remove(id) {
    await db("Tasks").where("TaskID", id).del();
};

module.exports = {
    getAll,
    getById,
    create,
    remove
}
