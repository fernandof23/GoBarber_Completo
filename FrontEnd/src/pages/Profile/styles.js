import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;

    @media (max-width: 500px) {
        max-width: 380px;
    }

    @media (max-width: 380px) {
        max-width: 310px;
        margin: 10px auto;
    }
    form {
        display: flex;
        flex-direction: column;
        margin-top: 30px;
        @media (max-width: 380px) {
            margin-top: 20px;
        }

        input {
            background: rgba(0, 0, 0, 0.1);
            border: 0;
            border-radius: 4px;
            height: 44px;
            padding: 0 15px;
            color: #fff;
            margin: 0 0 10px;

            &::placeholder {
                color: rgba(255, 255, 255, 0.7);
            }

            @media (max-width: 380px) {
                height: 40px;
            }
        }
        span {
            color: #fb6f91;
            align-self: flex-start;
            margin: 0 0 10px;
            font-weight: bold;
        }

        hr {
            border: 0;
            height: 1px;
            background: rgba(255, 255, 255, 0.2);
            margin: 10px 0 20px;
        }

        button {
            margin: 5px 0 0;
            height: 44px;
            background: #3b9eff;
            border: 0;
            border-radius: 4px;
            color: #fff;
            font-weight: bold;
            font-size: 16px;
            transition: background 0.2s;

            &:hover {
                background: ${darken(0.03, '#3b9eff')};
            }
        }

        a {
            color: #fff;
            margin-top: 15px;
            font-size: 16px;
            opacity: 0.8;

            &:hover {
                opacity: 1;
            }
        }
    }
    > button {
        margin: 10px 0 0;
        height: 44px;
        width: 100%;
        background: #f64c75;
        border: 0;
        border-radius: 4px;
        color: #fff;
        font-weight: bold;
        font-size: 16px;
        transition: background 0.2s;

        &:hover {
            background: ${darken(0.08, '#f64c75')};
        }
    }
`;
