const express = require('express');
const router = express.Router();

const WebController = require('../../controller/webController');
const webController = new WebController();

router.get('/', function (req, res) {
    webController.showLoginPage(req, res);
});

router.get('/chat', function (req, res) {
    webController.showChatPage(req, res);
});

router.post('/login', function (req, res) {
    webController.login(req, res);
});

module.exports = router;