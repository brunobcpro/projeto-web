const express = require("express")
const router = express.Router()

router.get("/obrasemandamento", (req,res) => {
    res.send([
        "Residencia A",
        "Prédio B",
        "Praça C"
    ])
})

module.exports = router