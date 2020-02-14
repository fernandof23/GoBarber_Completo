import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Appointments from '~/components/Appointments';

import { Container, Title, List } from './styles';

export default function Dashboard() {
    const data = [1, 2, 3, 4, 5, 6];
    return (
        <Background>
            <Container>
                <Title>Agendamentos</Title>

                <List
                    data={data}
                    keyExtractor={item => String(item)}
                    renderItem={({ item }) => <Appointments data={item} />}
                />
            </Container>
        </Background>
    );
}

const tabBarIcon = ({ tintColor }) => (
    <Icon name="event" size={20} color={tintColor} />
);

Dashboard.navigationOptions = {
    tabBarLabel: 'Agendamentos',
    tabBarIcon,
};

tabBarIcon.propTypes = {
    tintColor: PropTypes.string.isRequired,
};
