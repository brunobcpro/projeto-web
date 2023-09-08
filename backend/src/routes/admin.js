const express = require("express")
const router = express.Router()

router.get("/indicesobras", (req,res) =>{
    res.render("admin/indicesobras")
})

router.get("/novousuario", (req,res) => {
    res.render("admin/novousuario")
})

router.get("/novaobra", (req,res) => {
    res.render("admin/novaobra")
})

router.get("/registrodeinsumos", (req,res) => {
    res.render("admin/registrodeinsumos")
})

module.exports = router