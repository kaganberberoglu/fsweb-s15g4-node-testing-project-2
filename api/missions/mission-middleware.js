const missionModel = require("./mission-model");

async function checkMissionID(req, res, next) {
    try {
        const isExist = await missionModel.getById(req.params.id);
        if (!isExist) {
            res.status(404).json({ message: "not found" });
        } else {
            req.Mission = isExist;
            next();
        }
    } catch (error) {
        next(error);
    }
}

module.exports = { checkMissionID };
