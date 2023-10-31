const { Router } = require("express");
const { GetJenisBySearch, CreateJenis, UpdateJenis } = require('../utils/database');

const router = Router();

router.get("/", async (req, res, next) => {

    let raw = await GetJenisBySearch(req.query.search)

    res.send(raw)
})

router.post("/", async (req, res, next) => {

    let raw = await CreateJenis(req.body.name)

    res.send(raw)
})

router.put("/", async (req, res, next) => {

    let raw = await UpdateJenis(req.body.id, req.body.name)

    res.send(raw)
})


module.exports = router;