import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router';
import PostDiaryBtnsWrapper from '../../../components/write/PostDiaryBtnsWrapper';
import { writeDiary } from '../../../modules/write';

function PostDiaryBtnsWrapperContainer({ history }) {
    const dispatch = useDispatch();
    const { title, body, tags, diary, writeError } = useSelector(({ writeReducer }) => ({
        title: writeReducer.title,
        body: writeReducer.body,
        tags: writeReducer.tags,
        diary: writeReducer.diary,
        writeError: writeReducer.writeError
    }))

    const onPostDiary = () => {
        dispatch(writeDiary({title, body, tags}))
    };

    const onCancel = () => {
        history.goBack();
    };

    useEffect(() => {
        if (writeError) console.error(writeError)
        if (diary) {
            const { _id, author } = diary;
            history.push(`/@${author.userId}/${_id}`);
        };
    }, [writeError, diary, history])
    return (
        <PostDiaryBtnsWrapper onPostDiary={onPostDiary} onCancel={onCancel}/>
    )
}

export default withRouter(PostDiaryBtnsWrapperContainer)
