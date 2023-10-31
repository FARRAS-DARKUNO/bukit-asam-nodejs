const { Router } = require("express");
const { GetbBarangBySearch, UpdateBarang, CreateBarang } = require("../utils/database");

const router = Router();

router.get("/", async (req, res, next) => {

    let raw = await GetbBarangBySearch(req.query.search)

    res.send(raw)
})

router.put("/", async (req, res, next) => {

    let raw = await UpdateBarang(req.body.id, req.body.name, req.body.stock)

    res.send(raw)
})

router.post("/", async (req, res, next) => {

    let raw = await CreateBarang(req.body.name, req.body.stock)

    res.send(raw)
})



module.exports = router;