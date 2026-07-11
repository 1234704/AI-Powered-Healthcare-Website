const express = require('express');
const router = express.Router();
const { checkSymptoms } = require('./ai.controller');

router.post('/symptom-checker', checkSymptoms);

module.exports = router;