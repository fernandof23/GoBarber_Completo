import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
    flex: 1;
`;

export const Title = styled.Text`
    flex: 1;
    align-self: center;
    font-size: 20px;
    color: #fff;
    font-weight: bold;
    margin-top: 30px;
`;

export const List = styled.FlatList.attrs({
    showVerticalScrollIndicator: false,
    contentContainerStyle: { padding: 30 },
})``;
