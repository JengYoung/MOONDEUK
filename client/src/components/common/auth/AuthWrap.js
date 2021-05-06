import React from 'react'
import styled from 'styled-components';

/**
 * * AuthWrap : wrap that contains auth(login / register)'s logo and form
**/

const StyledAuthWrap = styled.div`
    width: 300px;
    display: flex;
    justify-content: center;
    @media (max-width: 500px) {
    };
    @media (min-width: 501px) {
    };
`;

const AuthSection = (props) => {
    return (
        <StyledAuthWrap {...props}>
            
        </StyledAuthWrap>
    );
};

export default AuthSection;