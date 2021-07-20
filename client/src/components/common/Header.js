import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import AlertBtnContainer from '../../containers/alert/AlertBtnContainer';
import LogoWrap from './LogoWrap';
import { GrMenu } from 'react-icons/gr';
import UserImageBox from './UserImageBox';
import AlertList from '../alert/AlertList';
import { useCallback } from 'react';
import { AiOutlineEllipsis } from 'react-icons/ai'
import { GoSearch } from "react-icons/go";

import CircleBtn from './CircleBtn';
import UserImage from './UserImage';
import myMediaQuery from 'lib/styles/_mediaQuery';
import LinkBtn from './LinkBtn';

const MenuWrap = styled.div`
    display: flex;
    position: relative;
    left: 1rem;
    align-items: center;
`;

const SideWrapBtn = styled.button`
    display: flex;
    position: relative;
    z-index: 99;
    flex-direction: column;
    align-items: center;
    background: transparent;
    outline: none;
    border: none;
    width: 2rem;
    margin-right: 2vw;
    font-size: 1rem;
    ${({ theme }) => css`
        svg > path {
            fill: ${theme.fontColor};
            stroke: ${theme.fontColor};
        }
    `}
    &:hover {
        cursor: pointer;
    }
    @media screen and (min-width: 481px) {
        font-size: 1.5rem;
    }
    @media screen and (min-width: 769px) {
        font-size: 2rem;
    }
`;

const StyledHeader = styled.header`
    position: fixed;
    z-index: 99;
    width: 100%;
    ${({ theme }) => css`
        background: ${theme.bgColor};
        border-bottom: 1px solid ${theme.HeaderBg};
    `}
    box-shadow: 0px 1px 10px rgba(0,0,0,0.1);
`;

const Wrapper = styled.div`
    width: 100%;
    height: 8vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    //* 481px - small device (smartphone ~ Tablet)
    @media screen and (min-width: 481px) {
        height: 10vh;
    }
    @media screen and (min-width: 769px) {
        height: 12vh;
    }
`;

const Spacer = styled.div`
    height: 8vh;
    @media screen and (min-width: 481px) {
        height: 10vh;
    }
    @media screen and (min-width: 769px) {
        height: 12vh;
    }
`;

const StyledAlertWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    @media screen and (min-width: 481px) {
        height: 10vh;
    }
    @media screen and (min-width: 769px) {
        height: 12vh;
    }
`;

const UserInfoBox = styled.div`
    display: flex;
    position: relative;
    align-items: center;
    right: 1rem;
    button + label {
        margin-left: 0.5vw;
    }
    ${myMediaQuery.mobile} {
        right: 0.75rem;
    }
`;
const UserInfo = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    @media screen and (min-width: 481px) {
        display: flex;
        font-size: 1rem;
    }
    @media screen and (min-width: 769px) {
        height: 12vh;
    }
`;

const HeaderOptionBtn = styled.button`
    padding: 0;
    display: block;
    position: relative;
    transition: all 0.3s ease;
    font-size: 1.5rem;
    color: #afafaf;
    &:hover { 
        cursor: pointer;
    }
    ${props => {
        return props.openLogout && css`
            position: relative;
            color: #b67fc4;
            transform: rotate(90deg);
        `
    }}
    @media screen and (min-width: 481px) {
        right: 0;
        font-size: 2rem;
    }
`;
const LoginLink = styled(LinkBtn)`
    margin-top: 0;
    margin-right: 1rem;
    padding-right: 1rem;
    padding-left: 1rem;
    line-height: 2;
    max-height: 2rem;
    min-width: 4rem;
    white-space: nowrap;

    ${myMediaQuery.mobile} {
        margin-right: 0.75rem;
    }

    ${props =>
        props.login ==='true' && css`
            position: relative;
            right: 6vw;
        `
    }
`;
const HeaderUserName = styled.h2`
    margin-right: 0.5vw;
    font-size: 1rem;
    margin-right: 1rem;
    padding-bottom: 0.25rem;
    white-space: nowrap;
    ${({ theme }) => css`
        color: ${theme.fontColor};
    `}
    ${myMediaQuery.mobile} {
        margin-right: 0.75rem;
    }
`;

const AlertBox = styled.div`
    display: block;
    position: relative;
    @media screen and (min-width: 481px) {
        display: flex;
        justify-content: center;
    }
`;

const SearchBtn = styled(CircleBtn)`
`;

const Header = ({ user, onLogout, checkUser, onSideBar, alerts, onConform, onOpenSearchBar }) => {
    const user_id = user ? user._id : null;
    const userId = user ? user._id : null;
    const userImage = user ? user.userImage : null;
    const [ openAlertList, setOpenAlertList ] = useState(false);
    const [ openLogout, setopenLogout ] = useState(false);
    const onOpenAlertList = useCallback(() => setOpenAlertList(!openAlertList), [openAlertList]);
    const onOpenLogout = useCallback(() => {
            setopenLogout(!openLogout); 
    }, [openLogout]);

    return (
        <>
            <StyledHeader>
                <Wrapper>
                    <MenuWrap>
                        <SideWrapBtn onClick={onSideBar}><GrMenu/></SideWrapBtn>
                        <LogoWrap isHeader></LogoWrap>
                    </MenuWrap>
                    <StyledAlertWrapper>
                        {user ? (
                            <UserInfoBox>
                                {!openLogout && <AlertBtnContainer onOpenAlertList={onOpenAlertList}></AlertBtnContainer>}
                                {!openLogout && <AlertBox>
                                    {openAlertList && <AlertList alerts={alerts} onConform={onConform}/>}
                                </AlertBox>}
                                {!openLogout && <UserImage
                                    isLink
                                    userId={userId} 
                                    userImage={userImage} 
                                    isHeader 
                                    checkUser={checkUser}
                                />}
                                {!openLogout && 
                                    <SearchBtn onClick={onOpenSearchBar}>
                                        <GoSearch/>
                                    </SearchBtn>
                                }
                                <UserInfo>
                                    {openLogout && <HeaderUserName>{user.nickname ? `${user.nickname}` : ''}</HeaderUserName>}
                                    {openLogout && <LoginLink to="/" onClick={onLogout}>로그아웃</LoginLink>}
                                    <HeaderOptionBtn openLogout={openLogout} onClick={onOpenLogout}>
                                        <AiOutlineEllipsis/>
                                    </HeaderOptionBtn>
                                </UserInfo>
                            </UserInfoBox>
                        ) : (
                            <>
                                <LoginLink to="/login" login='true'>로그인</LoginLink>
                            </>
                        )}
                    </StyledAlertWrapper>
                </Wrapper> 
            </StyledHeader>
            <Spacer/>
        </>
    )
};

export default Header;