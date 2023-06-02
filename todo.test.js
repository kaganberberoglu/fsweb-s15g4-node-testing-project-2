const db = require("./data/db-config");
const server = require("./api/server");
const superTest = require("supertest");

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
    await db.seed.run();
});

afterAll(async () => {
    await db.destroy();
});

describe("Todo App Server Test", () => {
    it("[1] Görevler listeleniyor mu?", async () => {
        const res = await superTest(server).get("/api/mission");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
    });

    it("[2] Görevler Id'ye görev listeleniyor mu?", async () => {
        const res = await superTest(server).get("/api/mission/1");
        expect(res.status).toBe(200);
        expect(res.body.MissionID).toBe(1);
        expect(res.body).toEqual({
            "MissionID": 1,
            "Name": "Sağlıklı beslen!",
            "Description": "Sağlıklı ol!"
        })
    });

    it("[3] Gorev eklenebiliyor mu?", async () => {
        const sample = {
            Name: "CSS öğren!",
            Description: "Frontend konularına hakim ol!"
        }
        const res = await superTest(server).post("/api/mission").send(sample);
        expect(res.status).toBe(201);
        expect(res.body.Name).toBe("CSS öğren!")
    });

    it("[4] Gorev silinebiliyor mu?", async () => {
        await superTest(server).delete("/api/mission/2");
        const res = await superTest(server).get("/api/mission/2");
        expect(res.status).toBe(404);
    });

    it("[5] Tasklar listeleniyor mu?", async () => {
        const res = await superTest(server).get("/api/task");
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(2);
    });

    it("[6] Task eklenebiliyor mu?", async () => {
        const task = {
            "Name": "Basketbol oyna!",
            "Description": "Şut çalış!",
            "MissionID": 1
        }
        const res = await superTest(server).post("/api/task").send(task);
        expect(res.status).toBe(201);
        expect(res.body.Name).toBe("Basketbol oyna!");
    });

    it("[7] Task silinebiliyor mu?", async () => {
        await superTest(server).delete("/api/task/2");
        const res = await superTest(server).get("/api/task/2");
        expect(res.status).toBe(404);
    });
})
