import LinkedDiaryCard from 'components/read/LinkedDiaryCard';
import LinkedDiaryWrapper from 'components/read/LinkedDiaryWrapper';
import CommentInputWrapperContainer from 'containers/comment/CommentInputWrapperContainer';
import CommentWrapperContainer from 'containers/comment/CommentWrapperContainer';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import Diary from '../../../components/read/Diary'
import deleteAPI from '../../../lib/routes/post/delete';
import { initializeDiary, readDiary } from '../../../modules/diary';
import { settingUpdate } from '../../../modules/write';

const DiaryContainer = ({ match, history, width, setWidth, setProgressBarWidth }) => {
    const dispatch = useDispatch();
    const { diary, diaryError, user } = useSelector(({ diaryReducer, userReducer }) => ({
        diary: diaryReducer.diary,
        diaryError: diaryReducer.diaryError,
        user: userReducer.user
    }));
    const userId = user ? user.userId : null; 
    const { diaryId } = match.params;
    const beforeDiary = diary?.beforeDiary;
    const afterDiary = diary?.afterDiary;
    // const [ diaryData, setDiaryData ] = useState({
    //     title: null,
    //     subtitle: null,
    //     author: {
    //         _id: null,
    //         authorId: null,
    //     },
    //     body: null,
    //     tags: [],
    //     postedDate: null,
    //     titleStyle: {
    //         isCenter: true,
    //         isFullSize: false,
    //         thumbnail: '',
    //         color: '',
    //         fontColor: 'black',
    //         font: ''
    //     }
    // })
    // useEffect(() => {

    // })
    useEffect(() => {
        dispatch(readDiary(diaryId));
        return () => {
            dispatch(initializeDiary());
        }
    }, [dispatch, diaryId]);

    const onPatch = () => {
        dispatch(settingUpdate(diary));
        console.log(diary);
        history.push(`/write/@${userId}/${diaryId}`);
    };

    const onDelete = async () => {
        try {
            await deleteAPI(diaryId);
            alert("삭제되었습니다.");
            history.push('/');
        } catch(e) {
            alert("에러가 발생했습니다.");
            console.error(e);
        }
    }

    return (
        <>
            <Diary 
                diary={diary} 
                dairyError={diaryError} 
                userId={userId} 
                onPatch={onPatch} 
                onDelete={onDelete}
                width={width}
                setWidth={setWidth}
                setProgressBarWidth={setProgressBarWidth}
            />
            <CommentWrapperContainer />
            <LinkedDiaryWrapper userId={userId}>
                { beforeDiary && <LinkedDiaryCard linkedDiary={beforeDiary} isPostedBefore/> }
                { afterDiary && <LinkedDiaryCard linkedDiary={afterDiary} isPostedBefore={false}/> }
            </LinkedDiaryWrapper>
        </>
    )
}

export default withRouter(DiaryContainer);
