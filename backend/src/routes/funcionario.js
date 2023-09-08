const express = require("express")
const router = express.Router()

router.get("/pedidosdeinsumos", (req,res) => {
    res.render("funcionario/pedidosdeinsumos")
})

module.exports = router