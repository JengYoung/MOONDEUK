import client from '../client'

const deleteReplyCommentAPI = ({ replyComment_id }) => {
    return client.delete(`/routes/replycomment/${replyComment_id}`)
}

export default deleteReplyCommentAPI;