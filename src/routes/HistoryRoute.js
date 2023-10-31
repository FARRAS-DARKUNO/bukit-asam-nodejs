const { Router } = require("express");
const {GetHistory, CreateHistory, DeleteHistory } = require("../utils/database");

const router = Router();


router.get("/", async (req, res, next) => {

    let raw = await GetHistory(req.query.filter, req.query.search)

    res.send(raw)
})

router.post("/", async (req, res, next) => {

    let raw = await CreateHistory(req.body.date, req.body.jumlah, req.body.idBarang, req.body.idJenis)

    res.send(raw)
})

router.delete("/", async (req, res, next) => {

    let raw = await DeleteHistory(req.query.id)

    res.send(raw)
})

module.exports = router;