const express = require('express');
const router = express.Router();
const { addSubscriber, deleteSubscriber, getSubscribers } = require('../controllers/subscriberController');

router.get('/', getSubscribers);

router.post('/', addSubscriber);

router.delete('/unsubscribe', deleteSubscriber);

module.exports = router;
