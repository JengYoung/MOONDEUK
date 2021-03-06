import express from 'express';
import checkAuthUser from '../../middleware/checkAuthUser.js';
import checkSubscribeController from './checkSubscribeController.js';
import subscribeController from './subscribeController.js';
import subscribedInfoController from './subscribedInfoController.js';
import subscribeInfoController from './subscribeInfoController.js';
import unSubscribeController from './unSubscribeController.js';

const subscribe = express.Router();
subscribe.post('/', checkAuthUser, subscribeController);
subscribe.post('/check', checkSubscribeController);
subscribe.get('/subscribeInfo/:authorId', subscribeInfoController);
subscribe.get('/subscribedInfo/:authorId', subscribedInfoController);
subscribe.post('/unSubscribe', checkAuthUser, unSubscribeController);

export default subscribe;