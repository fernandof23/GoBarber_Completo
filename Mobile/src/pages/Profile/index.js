import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/Background';

import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';

import {
    Container,
    Title,
    Form,
    FormInput,
    SubmitButton,
    Separator,
    LogoutButton,
} from './styles';

export default function Profile() {
    const profile = useSelector(state => state.user.profile);

    const [name, setName] = useState(profile.name);
    const [oldPassword, SetOldPassword] = useState('');
    const [email, setEmail] = useState(profile.email);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const emailRef = useRef();
    const oldPasswordRef = useRef();
    const newPasswordRef = useRef();
    const confirmNewPasswordRef = useRef();

    const dispatch = useDispatch();
    async function handleSubmit() {
        const data = { name, email, oldPassword, password, confirmPassword };
        dispatch(updateProfileRequest(data));
    }

    function handleLogout() {
        dispatch(signOut());
    }

    useEffect(() => {
        setPassword('');
        SetOldPassword('');
        setConfirmPassword('');
    }, [profile]);

    return (
        <Background>
            <Container>
                <Title> Meu Perfil </Title>
                <Form>
                    <FormInput
                        icon="person-outline"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Nome Completo"
                        returnKeyType="next"
                        onSubmitEditing={() => emailRef.current.focus()}
                        value={name}
                        onChangeText={setName}
                    />

                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        ref={emailRef}
                        placeholder="Digite seu e-mail"
                        returnKeyType="next"
                        onSubmitEditing={() => oldPasswordRef.current.focus()}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Separator />
                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua senha Atual"
                        ref={oldPasswordRef}
                        returnKeyType="next"
                        onSubmitEditing={() => newPasswordRef.current.focus()}
                        value={oldPassword}
                        onChangeText={SetOldPassword}
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Sua Nova Senha"
                        ref={newPasswordRef}
                        returnKeyType="next"
                        onSubmitEditing={() =>
                            confirmNewPasswordRef.current.focus()
                        }
                        value={password}
                        onChangeText={setPassword}
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Confirme sua senha"
                        ref={confirmNewPasswordRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    <SubmitButton onPress={handleSubmit}>
                        Atualizar
                    </SubmitButton>

                    <LogoutButton onPress={handleLogout}>Sair</LogoutButton>
                </Form>
            </Container>
        </Background>
    );
}

const tabBarIcon = ({ tintColor }) => (
    <Icon name="person" size={20} color={tintColor} />
);

Profile.navigationOptions = {
    tabBarLabel: 'Meu Perfil',
    tabBarIcon,
};

tabBarIcon.propTypes = {
    tintColor: PropTypes.string.isRequired,
};
