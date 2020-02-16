import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';
import Background from '~/components/Background';

export default function Confirm({ navigation }) {
    const provider = navigation.getParam('provider');
    const time = navigation.getParam('time');

    console.tron.log(provider);

    console.tron.log(time);
    const dateFormatted = useMemo(
        () => formatRelative(parseISO(time), new Date(), { locale: pt }),
        [time]
    );

    async function handleAddAppointments() {
        await api.post('appointment', { provider_id: provider.id, date: time });

        navigation.navigate('Dashboard');
    }
    return (
        <Background>
            <Container>
                <Avatar
                    source={{
                        uri: provider.avatar
                            ? provider.avatar.url
                            : `https://api.adorable.io/avatar/50/${provider.name}.png`,
                    }}
                />

                <Name>{provider.name}</Name>
                <Time>{dateFormatted}</Time>

                <SubmitButton onPress={handleAddAppointments}>
                    Confirmar
                </SubmitButton>
            </Container>
        </Background>
    );
}

Confirm.navigationOptions = ({ navigation }) => ({
    title: 'Confirmar Agendamento',
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

Confirm.propTypes = {
    navigation: PropTypes.shape({
        getParam: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired,
    }).isRequired,
};
