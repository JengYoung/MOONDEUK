import React from 'react'
import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import UserImage from '../common/UserImage';

/**
**/

const StyledAlertList = styled.div`
    position: fixed;
    top: 8vh;
    width: 100vw;
    height: 12rem;
    background: white;
    border: 1px solid lightgray;
    border-top: 5px solid ${({theme}) => css`
        ${theme.alertTopBgColor}
    `};
    border-radius: 5px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 3px;
        background-color: gray;
    }
    &::-webkit-scrollbar-button {
        width: 0;
        height: 0;
    }
    @media screen and (max-width: 480px) {
        left: 0;
    } 
    @media screen and (min-width: 481px) {
        width: 300px;
        top: 10vh;
        height: 14rem;
    }
    @media screen and (min-width: 769px) {
        top: 12vh;
    }
    /* ${props => 
        props.openAlertList && css`
            display: block;
        `
    } */
`;


const StyledAlertListItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    height: 4rem;
    padding: 0.5rem;
    border-bottom: 1px solid lightgray;
    ${props =>
        (!props.isCheckRead) && css`
            background: #deb6e6;
        `
    }
`;

const StyledAlertContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin-left: 0.5rem;
    h3 {
        font-size: 0.7rem;
    }
    h4 {
        font-size: 0.7rem;
        font-weight: 500;
    }
`;

const AlertList = ({ user_id, alerts, onConform }) => {
    useEffect(() => {
        return () => {
            onConform(user_id)
        }
    },[user_id, onConform]);

    return (
        <StyledAlertList>
            {alerts.map(alertItem => {
                const { _id, checkRead, message, userImage, type_detail } = alertItem;
                return (
                    <StyledAlertListItem key={ _id } isCheckRead={ checkRead }>
                        <UserImage userImage={userImage}/>
                        <StyledAlertContent>
                            <h3>{message}</h3>
                            <h4>{ type_detail.content ? `"${ type_detail.content }"` : null}</h4>
                        </StyledAlertContent>
                    </StyledAlertListItem>
                )
            })}
        </StyledAlertList>
    );
};

export default React.memo(AlertList);