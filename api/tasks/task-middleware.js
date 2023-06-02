const taskModel = require("./task-model");

async function checkTaskID(req, res, next) {
    try {
        const isExist = await taskModel.getById(req.params.id);
        if (!isExist) {
            res.status(404).json({ message: "not found" });
        } else {
            req.Task = isExist;
            next();
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { checkTaskID };
