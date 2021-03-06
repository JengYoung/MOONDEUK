import React, { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import myMediaQuery from 'lib/styles/_mediaQuery';
import myVars, { myFont } from 'lib/styles/_variable';
import { StyledResponsive } from 'components/common/ResponsiveWrapper';


const StyledDiaryCards = styled(StyledResponsive)`
    display: flex;
    /* justify-content: flex-start; */
    margin-top: 3rem;
    flex-flow: wrap;
    ${({ theme }) => css`
        background: ${theme.bgColor};
    `}
`;

const StyledDiaryCardWrapper = styled.article`
    display: flex;
    justify-content: center;
    width: 33%;
    min-width: 300px;
    ${myMediaQuery.tablet} {
        width: 50%;
    }
    ${myMediaQuery.mobile} {
        width: 100%;
    }
`;
const StyledDiaryCard = styled(Link)`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 300px;
    height: 400px;
    margin: 2rem auto;
    border-radius: 0.25rem;
    border: none;
    box-shadow: ${myVars.defaultShadow};
    overflow: hidden;
    ${myMediaQuery.mobile} {
        width: 100%;
        max-width: 300px;
    }
    &:hover {
        transition: all 0.3s;
        transform: translateY(-5px);
        box-shadow: ${myVars.event.hoverShadow};
    }
    ${myMediaQuery.tablet} {
        margin: 1.75rem auto;
    }
    ${myMediaQuery.mobileAndTablet} {
        margin: 1.5rem auto;
    }
`;

const StyledDiaryThumbnail = styled.img`
    display: block;
    border-radius: inherit;
    width: 100%;
    height: 100%;
    // 일기니까, background-image로 하는 게 나을 듯하다. 괜히 일기가 검색에서 나와서 불편한 것보다는...
    ${({$thumbnailUrl, $defaultThumbnailUrl}) => ($thumbnailUrl || $defaultThumbnailUrl) && css`
        background-image: url(${$thumbnailUrl ? $thumbnailUrl : $defaultThumbnailUrl});
    `}
    ${({ $bgColor }) => $bgColor && css`
        background: ${$bgColor};
    `}
    background-size: cover;
    background-position: center center;
`;

const StyledDiaryData = styled.div`
    border-radius: 0 0 2px 2px;
    width: 100%;
    position: absolute;
    z-index: 50;
    bottom: 0;
    word-break:break-all;
    height: 160px;
    overflow: hidden;
    top: 240px;
    border: none;
    &:hover {
        transition: all 0.25s;
        height: 100%;
        top: 0;
    }
    ${({ theme }) => css`
        color: ${theme.fontColor};
    `}
`;

const StyledDiaryDataBackground = styled.div`
    position: absolute;
    opacity: 0.9;
    width: 100%;
    height: 100%;
    ${({ theme }) => css`
        background: ${ theme.bgColor };
        border: 1px solid ${ theme.diaryCardBorderColor };
    `}
`;

const StyledDiaryTitle = styled.h2`
    position: relative;
    padding: 1rem 1rem 0 1rem;
    margin: 0;
    font-size: ${myFont.size.l};
    font-weight: 900;
    font-family: ${myFont.style.nanumMyeongjo};
`;

const StyledDiarySubTitle = styled.h3`
    position: relative;
    padding-top: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    font-weight: 400;
    font-size: ${myFont.size.s};
`;

const StyledAdditionalInfoBox = styled.div`
    display: flex;
    position: absolute;
    z-index: 51;
    bottom: 0.5rem;
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    * + * {
        padding-left: 5px;
    }
    font-family: ${myFont.style.nanumMyeongjo};
    ${({ theme }) => css`
        color: ${theme.fontColor};
    `}
`;

const StyledAdditionalInfo = styled.section`
    display: flex;
    justify-content: flex-end;
`;
const StyledAuthorName = styled.h3`
    margin: 0;
    font-size: 0.8rem;
    font-weight: 200;
`;
const StyledAuthorImage = styled.div`
    position: relative;
    width: 1rem;
    height: 1rem;
    border-radius: 1rem;
    ${({theme}) => css`
        border: 1px solid ${ theme.diaryCardBorderColor };
    `}
    background-position: center;
    background-size: cover;
    ${props => 
        props.userImage && css`
            background-image: ${({userImage}) => `url(${userImage})`};
        `
    }
`;

const StyledDiaryBody = styled.div`
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
    padding: 0 1rem;
    padding-top: 0.5rem;
    display: none;
    &.active {
        display: block;
    }
`;
const StyledDiaryCardTags = styled.ul`
    display: inline-flex;
    position: sticky;
    bottom: 1.75rem;
    max-height: 4rem;
    overflow: hidden;
    padding-top: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    flex-wrap: wrap;
    position: absolute;
    z-index: 50;
    width: 100%;
    ${({ theme }) => css`
        color: ${theme.fontColor};
    `}
    &.active {
        max-height: 6rem;
        transition: height 0.5s;
        height: auto;
    }
`;

const StyledDiaryCardTag = styled.li`
    position: relative;
    padding: 0 0.75rem;
    line-height: 1.75;
    border-radius: 1.75rem;
    margin: 0.25rem 0.25rem;
    font-size: ${myFont.size.mms};
    ${({ theme }) => css`
        background: ${theme.tagBg};
        color: ${theme.tagColor};
    `};
    &::before {
        content: "# "
    }
`;

const StyledDiaryPostedDate = styled.time`
    font-family: ${myFont.style.dancingScript};
    font-size: ${myFont.size.ms};
`;
const ObserverTarget = styled.div`
`;

const DiaryCard = ({ diary }) => {
    const { title, tags, author, _id, subtitle, body, postedDate } = diary;
    const thumbnailUrl = diary.titleStyle?.thumbnail;
    const bgColor = diary.titleStyle?.color;
    const defaultThumbnailUrl = !bgColor ? myVars.defaultThumbnail : null;
    const { authorId, userImage } = author;
    const diaryData = useRef(null);
    const diaryBody = useRef(null);
    const diaryTags = useRef(null);

    const onHoverDiaryData = () => {
        diaryBody.current.classList.toggle('active');
        diaryTags.current.classList.toggle('active');
    } 
    return (
        <StyledDiaryCard to={`/@${authorId}/${_id}`}>
            <StyledDiaryThumbnail $thumbnailUrl={thumbnailUrl} $defaultThumbnailUrl={defaultThumbnailUrl} $bgColor={bgColor}/>
            <StyledDiaryData ref={diaryData} onMouseOver={onHoverDiaryData} onMouseOut={onHoverDiaryData}>
                <StyledDiaryDataBackground/>
                <StyledDiaryTitle>{title}</StyledDiaryTitle>
                <StyledDiarySubTitle>{subtitle}</StyledDiarySubTitle>
                <StyledDiaryCardTags ref={diaryTags}>{tags.map(tag => <StyledDiaryCardTag key={tag}>{tag}</StyledDiaryCardTag>)}</StyledDiaryCardTags>
                <StyledDiaryBody ref={diaryBody} dangerouslySetInnerHTML={{__html: body.length > 100 ? `${body.slice(0,100)}...` : body}}></StyledDiaryBody>
            </StyledDiaryData>
            <StyledAdditionalInfoBox>
                <StyledDiaryPostedDate>{postedDate}</StyledDiaryPostedDate>
                <StyledAdditionalInfo>
                    <StyledAuthorImage userImage={userImage}></StyledAuthorImage>
                    <StyledAuthorName>{authorId}</StyledAuthorName>
                </StyledAdditionalInfo>
            </StyledAdditionalInfoBox>
        </StyledDiaryCard>
    )
}

const DiaryCards = ({ diaries, diariesError, lastId, fetchDiaryList }) => {
    const diaryCards = useRef(null);
    const observerTarget = useRef(null);

    useEffect(() => {
        let observerRef = null;
        if (observerTarget.current) observerRef = observerTarget.current;
        const callback = (entries, observer) => {
            entries.forEach((entry) => {
                const _id = diaries[diaries.length-1]?._id;
                if (entry.isIntersecting && _id !== lastId.current) {
                    lastId.current = _id
                    fetchDiaryList(lastId);
                }
            })
        };
        const options = {
            root: null,
            rootMargin: '0px 0px 400px 0px',
            threshold: 1.0,
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(observerTarget.current);
        return () => observer.unobserve(observerRef);
    }, [observerTarget, diaries, fetchDiaryList, lastId])

    if (diariesError) return <StyledDiaryCards ref={lastId}> 일기를 불러오는 데 에러가 발생했어요! 😓</StyledDiaryCards>
    return (
        <>
            <StyledDiaryCards ref={diaryCards}>
                {diaries && diaries.map((diary, idx) => {
                    const { _id, postedDate } = diary;
                    const createdIndex = _id + postedDate;
                    return (
                        <StyledDiaryCardWrapper key={idx}>
                            <DiaryCard diary={diary} key={createdIndex}/>
                        </StyledDiaryCardWrapper>
                    )
                })}
            </StyledDiaryCards>
            <ObserverTarget ref={observerTarget}></ObserverTarget>
        </>
    );
};

export default React.memo(DiaryCards);