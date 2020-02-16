import React, { useEffect, useState } from 'react';
import { withNavigationFocus } from 'react-navigation';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Appointments from '~/components/Appointments';

import { Container, Title, List } from './styles';

function Dashboard({ isFocused }) {
    const [appointment, setAppointment] = useState([]);

    async function loadAppointments() {
        const response = await api.get('appointment');
        setAppointment(response.data);
    }

    async function handleCancel(id) {
        const response = await api.delete(`appointment/${id}`);

        setAppointment(
            appointment.map(item =>
                item.id === id
                    ? { ...item, canceled_at: response.data.canceled_at }
                    : item
            )
        );
    }

    useEffect(() => {
        if (isFocused) {
            loadAppointments();
        }
    }, [isFocused]);

    return (
        <Background>
            <Container>
                <Title>Agendamentos</Title>

                <List
                    data={appointment}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item }) => (
                        <Appointments
                            data={item}
                            onCancel={() => handleCancel(item.id)}
                        />
                    )}
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

Dashboard.propTypes = {
    isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Dashboard);
