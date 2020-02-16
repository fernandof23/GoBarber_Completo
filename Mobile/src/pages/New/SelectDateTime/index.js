import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DateInput from '~/components/DateInput';

import api from '~/services/api';

import { Container, HourList, Title, Hour } from './styles';

import Background from '~/components/Background';

export default function SelectDateTime({ navigation }) {
    const [date, setDate] = useState(new Date());
    const [hours, setHours] = useState([]);

    const provider = navigation.getParam('item');

    useEffect(() => {
        async function loadAvailable() {
            const response = await api.get(
                `provider/${provider.id}/available`,
                {
                    params: {
                        date: date.getTime(),
                    },
                }
            );
            setHours(response.data);
        }

        loadAvailable();
    }, [date, provider.id]);

    function handleSelectHour(time) {
        navigation.navigate('Confirm', { provider, time });
    }

    return (
        <Background>
            <Container>
                <DateInput date={date} onChange={setDate} />

                <HourList
                    data={hours}
                    keyExtractor={item => item.time}
                    renderItem={({ item }) => (
                        <Hour
                            enabled={item.available}
                            onPress={() => handleSelectHour(item.value)}
                        >
                            <Title>{item.time}</Title>
                        </Hour>
                    )}
                />
            </Container>
        </Background>
    );
}

SelectDateTime.navigationOptions = ({ navigation }) => ({
    title: 'Selecione o horario',
    headerLeft: () => (
        <TouchableOpacity
            onPress={() => {
                navigation.goBack();
            }}
        >
            <Icon name="chevron-left" size={20} color="#fff" />
        </TouchableOpacity>
    ),
});

SelectDateTime.propTypes = {
    navigation: PropTypes.shape({
        navigate: PropTypes.func.isRequired,
        getParam: PropTypes.func.isRequired,
    }).isRequired,
};
