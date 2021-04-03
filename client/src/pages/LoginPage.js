import React from 'react'
import LoginBackground from '../components/login/LoginBackground'
import LoginContainer from '../containers/auth/register/LoginContainer'
function LoginPage() {
    return (
        <LoginBackground>
            <LoginContainer />
        </LoginBackground>  
    )
}

export default LoginPage
