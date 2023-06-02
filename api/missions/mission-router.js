const router = require("express").Router();
const missionModel = require("./mission-model");
const mw = require("./mission-middleware");

router.get("/", async (req, res, next) => {
    try {
        const all = await missionModel.getAll();
        res.json(all);
    } catch (error) {
        next(error);
    }
});

router.get("/:id", mw.checkMissionID, async (req, res, next) => {
    try {
        res.json(req.Mission);
    } catch (error) {
        next(error);
    }
});

router.post("/", async (req, res, next) => {
    try {
        let { Name } = req.body;
        if (!Name) {
            res.status(400).json({ message: "Görev adı boş olamaz" });
        } else {
            const inserted = await missionModel.create({
                Name: req.body.Name,
                Description: req.body.Description
            });
            res.status(201).json(inserted);
        }
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", mw.checkMissionID, async (req, res, next) => {
    try {
        await missionModel.remove(req.params.id);
        res.json({message: "Silme işlemi başarılı"});
    } catch (error) {
        next(error);
    }
});

module.exports = router;
