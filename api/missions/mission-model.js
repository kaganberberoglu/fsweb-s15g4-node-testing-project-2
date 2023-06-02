const db = require("../../data/db-config")

async function getAll() {
    return await db("Missions");
};

async function getById(id) {
    return await db("Missions").where("MissionID", id).first();
};

async function create(obj) {
    const [MissionID] = await db("Missions").insert(obj);
    return await getById(MissionID);
};

async function remove(id) {
    await db("Missions").where("MissionID", id).del();
};

module.exports = {
    getAll,
    getById,
    create,
    remove
}
