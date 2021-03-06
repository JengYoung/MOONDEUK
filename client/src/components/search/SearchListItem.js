import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledSearchListItem = styled(Link)`
    ${props => {
        switch(props.$keywordType) {
            case 'user':
                return css`
                    display: flex;
                    padding: 0 1rem;
                    align-items: center;
                    width: 100%;
                    height: 5rem;
                    margin-top: 0.5rem;
                    border: 1px solid lightgray;
                    border-radius: 10px;
                    background: white;
                    transition: all 0.3s ease-in;
                    font-size: 0.9rem;
                    
                    &:hover {
                        cursor: pointer;
                        background: #e9d4e9;
                        box-shadow: 0 4px 3px rgba(0,0,0,0.2);
                    }

                    @media screen and (min-width: 481px) {
                        padding: 0 2rem;
                        font-size: 1rem;
                        width: 400px;
                    }
                `
            case 'title':
                return css`
                    margin: 1rem 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    width: 100%;
                    height: 10rem;
                    border: 1px solid lightgray;
                    background: white;
                    transition: all 0.3s ease-in;
                    font-size: 0.9rem;
                    overflow: hidden;
                    padding: 0 20px;
                    &:hover {
                        cursor: pointer;
                        background: #e9d4e9;
                        box-shadow: 0 4px 3px rgba(0,0,0,0.2);
                    }

                    @media screen and (min-width: 481px) {
                        padding: 0 2rem;
                        font-size: 1rem;
                    }
                `
            default: return;
        }
    }}
`;
const SearchListItem = ({ children, keywordType, ...rest }) => {
    return (
        <StyledSearchListItem $keywordType={keywordType} {...rest}>
            { children }
        </StyledSearchListItem>
    )
}

export default SearchListItem
