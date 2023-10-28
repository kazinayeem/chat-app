const express = require("express")
const { getAlluser, resgisterUser, loginUsera } = require("../controller/userController.js")
const checkLogin = require("../middleware/checklogin.js")

const router = express.Router()

router.get("/", checkLogin, getAlluser)
router.post("/", resgisterUser)
router.post("/login", loginUsera)

module.exports = router