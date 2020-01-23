import styled from 'styled-components';

export const Container = styled.div`
    max-width: 600px;
    margin: 50px auto;

    max-height: 60%;

    display: flex;
    flex-direction: column;

    @media (max-width: 500px) {
        max-width: 400px;
        max-height: 50%;
    }

    @media (max-width: 380px) {
        max-width: 350px;
        max-height: 30%;
    }

    header {
        display: flex;
        align-items: center;
        align-self: center;

        button {
            border: 0;
            background: none;
        }

        strong {
            color: #fff;
            font-size: 24px;
            margin: 0 15px;
        }
    }

    ul {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 15px;
        margin-top: 30px;
    }
`;

export const Time = styled.li`
    padding: 20px;
    border-radius: 4px;
    background: #fff;

    @media (max-width: 500px) {
        padding: 15px;
    }

    @media (max-width: 380px) {
        padding: 10px;
    }
    opacity: ${props => (props.past ? 0.6 : 1)};

    strong {
        display: block;
        color: ${props => (props.available ? '#999' : '#7159c1')};
        font-size: 20px;
        font-weight: normal;
    }

    span {
        display: block;
        margin-top: 3px;
        color: ${props => (props.available ? '#999' : '#666')};
    }
`;
