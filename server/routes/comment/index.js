import express from 'express';
import checkCommentController from './checkCommentController.js';
import commentController from './commentController.js';
import deleteCommentController from './deleteCommentController.js';
import updateCommentController from './updateCommentController.js';

const comment = express.Router();

/* [ CREATE ] User's comment */ 
comment.post('/:user_id/:diary_id', commentController);
/* [ READ ] Diary's comment */ 
comment.get('/:diary_id', checkCommentController);
/* [ UPDATE ] User's comment */
comment.patch('/:comment_id', updateCommentController); 
/* [ DELETE ] User's comment */ 
comment.delete('/:comment_id', deleteCommentController);

export default comment;