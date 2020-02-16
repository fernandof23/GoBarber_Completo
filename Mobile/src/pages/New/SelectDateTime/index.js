import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import DateInput from '~/components/DateInput';

import { Container } from './styles';

import Background from '~/components/Background';

export default function SelectDateTime() {
    const [date, setDate] = useState(new Date());
    return (
        <Background>
            <Container>
                <DateInput date={date} onChange={setDate} />
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
