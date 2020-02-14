import React, { useRef } from 'react';
import { Image } from 'react-native';

import Background from '~/components/Background';

import logo from '~/assets/logo.png';

import {
    Container,
    Form,
    FormInput,
    SubmitButton,
    SignLink,
    SignLinkText,
} from './styles';

export default function SignUp({ navigation }) {
    const passwordRef = useRef();
    const emailRef = useRef();

    function handleSubmit() { }
    return (
        <Background>
            <Container>
                <Image source={logo} />

                <Form>
                    <FormInput
                        icon="person-outline"
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="Nome Completo"
                        returnKeyType="next"
                        onSubmitEditing={() => emailRef.current.focus()}
                    />

                    <FormInput
                        icon="mail-outline"
                        keyboardType="email-address"
                        autoCorrect={false}
                        autoCapitalize="none"
                        ref={emailRef}
                        placeholder="Digite seu e-mail"
                        returnKeyType="next"
                        onSubmitEditing={() => passwordRef.current.focus()}
                    />

                    <FormInput
                        icon="lock-outline"
                        secureTextEntry
                        placeholder="Digite sua senha"
                        ref={passwordRef}
                        returnKeyType="send"
                        onSubmitEditing={handleSubmit}
                    />

                    <SubmitButton onPress={handleSubmit}>Acessar</SubmitButton>
                </Form>

                <SignLink onPress={() => navigation.navigate('SignIn')}>
                    <SignLinkText>Já Tenho conta!</SignLinkText>
                </SignLink>
            </Container>
        </Background>
    );
}
