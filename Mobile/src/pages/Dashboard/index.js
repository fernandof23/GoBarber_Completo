import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// import { Container } from './styles';
import Background from '~/components/Background';

export default function Dashboard() {
    return (
        <Background>
            <Text>Teste</Text>
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
