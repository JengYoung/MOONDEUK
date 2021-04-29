import React from 'react'
import { useDispatch } from 'react-redux';
import CommentList from '../../components/comment/CommentList'
import CommentListItem from '../../components/comment/CommentListItem';
import { settingUpdate, updateComment } from '../../modules/comment';

const CommentListContainer = ({ username, comments }) => {
    const dispatch = useDispatch();
    return (
        <CommentList>
            { comments.map(comment => {
                const { _id, userInfo, content } = comment;
                const { userId, nickname } = userInfo;
                const onUpdate = () => dispatch(updateComment(_id));
                const onSettingUpdate = (content) => dispatch(settingUpdate(content));
                return (
                    <CommentListItem 
                        key={_id} 
                        userId={userId} 
                        nickname={nickname} 
                        content={content} 
                        username={username}
                        onUpdate={onUpdate}
                        onSettingUpdate={onSettingUpdate}
                    />
                )
            })}
        </CommentList>
    )
}

export default CommentListContainer
