import React from 'react'
import { useState } from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Header from '../components/common/Header'
import { conformAlertUser } from '../modules/alert';
import { openSearchBar } from '../modules/search';
import { check, logout } from '../modules/user';
import SideBarContainer from './SideBarContainer';

const HeaderContainer = (props) => {
    const [ isSideBar, setIsSideBar ] = useState(false);
    const { user, alerts, isOpenSearchBar } = useSelector(({ userReducer, alertReducer, searchReducer }) => ({ 
        user: userReducer.user,
        alerts: alertReducer.alerts, 
        isOpenSearchBar: searchReducer.isOpenSearchBar,
    }));
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout());
    };
    const onSideBar = () => {
        setIsSideBar(!isSideBar)
    };
    const checkUser = useCallback(() => {
        dispatch(check())
    }, [dispatch])

    const onConform = useCallback(user_id => {
        dispatch(conformAlertUser(user_id))
    }, [dispatch]);

    const onOpenSearchBar = useCallback(() => {
        dispatch(openSearchBar(!isOpenSearchBar))
    }, [dispatch, isOpenSearchBar]);
    return (
        <>
            <Header
                isDiary={props.isDiary}
                user={user} 
                onLogout={onLogout} 
                write={props.write} 
                checkUser={checkUser}
                onSideBar={onSideBar}
                alerts={alerts}
                onConform={onConform}
                onOpenSearchBar={onOpenSearchBar}
            />
            <SideBarContainer isSideBar={isSideBar} onSideBar={onSideBar} />
        </>
    )
}

export default HeaderContainer;
