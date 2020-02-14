import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

import { Title } from './styles';

export default function Profile() {
    return (
        <Background>
            <Title>Agendamentos</Title>
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
