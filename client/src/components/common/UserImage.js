import myMediaQuery from 'lib/styles/_mediaQuery';
import React from 'react'
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export const StyledUserImage = styled.div`
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    border-radius: 3rem;
    border: 1px solid lightgray;
    background: white;
    ${props => 
        props.$userImage && css`
            background-image: url(${props.$userImage});
            background-size: cover;
        `
    }
    ${ props => 
        props.isSubscribePage && css`
            margin-top: 3rem;
            width: 200px;
            height: 200px;
            border-radius: 200px;
        `
    }
`;

export const StyledUserImageLink = styled(Link)`
    position: relative;
    display: inline-block;
    border-radius: 150px;
    background-color: white;
    background-size: cover;
    background-position: center;
    width: 3rem;
    height: 3rem;
    min-width: 30px;
    min-height: 30px;
    margin-right: 1rem;
    ${myMediaQuery.mobile} {
        width: 34px;
        height: 34px;
        margin-right: 0.75rem;
    }    
    background-image: url(${({$userImage}) => $userImage});
`;

const UserImage = ({ isLink, isSubscribePage, userImage, userId, ...rest }) => {
    const { REACT_APP_ALBUMBUCKETNAME } = process.env;
    const imgUrl = userImage ? userImage : `
        https://${REACT_APP_ALBUMBUCKETNAME}.s3.ap-northeast-2.amazonaws.com/profile/moondeuk-default-profile.png
    `; 
    return (
        <>
            { isLink && 
                <StyledUserImageLink 
                    $userImage={imgUrl} 
                    to={`@${userId}`}
                />
            }
            { !isLink && <StyledUserImage isSubscribePage={isSubscribePage} $userImage={userImage} {...rest}/> }
        </>
    );
};

export default React.memo(UserImage);