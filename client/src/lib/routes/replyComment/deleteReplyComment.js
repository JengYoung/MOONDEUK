import client from '../client'

const deleteReplyCommentAPI = ({ comment_id, replyComment_id }) => {
    console.log("deleteReplyCommentAPI params: ")
    return client.delete(`/routes/replycomment/${comment_id}/${replyComment_id}`)
}

export default deleteReplyCommentAPI;