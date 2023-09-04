const express = require("express")
const router = express.Router()

router.get("/indicesobras", (req,res) =>{
    res.send("Lista dos indices das obras")
})

module.exports = router