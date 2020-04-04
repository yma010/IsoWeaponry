const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const passport = require('passport');

const Weapons = require('../../models/Weapon');

router.get("/test", (req, res) => res.json({
    msg: "This is the weapons route"
}));

module.exports = router;