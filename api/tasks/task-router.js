const router = require("express").Router();
const taskModel = require("./task-model");
const mw = require("./task-middleware");

router.get("/", async (req, res, next) => {
    try {
        const all = await taskModel.getAll();
        res.json(all);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", mw.checkTaskID, async (req, res, next) => {
    try {
        res.json(req.Mission);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        let { Name, MissionID } = req.body;
        if (!Name || !MissionID) {
            res.status(400).json({ message: "Alanları kontrol ediniz" });
        } else {
            const inserted = await taskModel.create({
                Name: req.body.Name,
                Description: req.body.Description,
                MissionID: req.body.MissionID,
                Date: new Date()
            });
            res.status(201).json(inserted);
        }
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", mw.checkTaskID, async (req, res, next) => {
    try {
        await taskModel.remove(req.params.id);
        res.json({ message: "Silme işlemi başarılı" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
