import express from 'express';

import { meetings } from '../modules/meetings.js';
import { message }  from '../modules/message.js';

var router = express.Router();

// https://localhost/meetings
router.get('/', meetings.index); 

// - Get all available rooms
router.get('/rooms', meetings.findAll); 
// - Get an existing room
router.get('/rooms/:room_id', meetings.findOne); 
// - Create a room
router.post('/rooms', meetings.create); 
// - Update an existing room
router.post('/rooms/:room_id', meetings.update); 
// - Delete a room
router.delete('/rooms/:room_id', meetings.delete); 

// - Get numbers that can be used to dial into a meeting
router.get('/dial-in-numbers', meetings.getDialInNumbers);
// -- List callbacks received
router.get('/callbacks', meetings.findAllCallbacks);
// -- Webhook handlers, 
router.post('/onMeetings', meetings.onCallback); 
router.post('/onCallback', meetings.onCallback); 

router.post('/sendSms', message.sendSms); 

router.get('/messageEvents', message.findAllMessageEvents); 
router.post('/onMessageEvent', message.onMessageEvent); 

router.get('/ni/:number', message.ni);

export { router };
