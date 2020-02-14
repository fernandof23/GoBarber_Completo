import React from 'react';
import PropTypes from 'prop-types';

import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

// import { Container } from './styles';

export default function Profile() {
    return (
        <Background>
            <Text>Profile</Text>
        </Background>
    );
}

const tabBarIcon = ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
);

Profile.navigationOptions = {
    tabBarLabel: 'Agendamentos',
    tabBarIcon,
};

tabBarIcon.propTypes = {
    tintColor: PropTypes.string.isRequired,
};
