import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import Background from '~/components/Background';
import Appointments from '~/components/Appointments';

import { Container, Title, List } from './styles';

export default function Dashboard() {
    const [appointment, setAppointment] = useState([]);

    useEffect(() => {
        async function loadAppointments() {
            const response = await api.get('appointment');
            setAppointment(response.data);
        }

        loadAppointments();
    }, []);

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
