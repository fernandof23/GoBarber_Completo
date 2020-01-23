import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { signUpRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
    name: Yup.string().required('Nome Obrigatorio'),
    email: Yup.string()
        .email('Insira um e-mail no formato correto')
        .required('E-mail obrigatorio'),
    password: Yup.string()
        .min(6, 'A senha deve ter no minimo 6 caracteres')
        .required('Senha Obrigatoria'),
});

export default function SignUp() {
    const dispatch = useDispatch();

    function handleSubmit(data) {
        const { name, email, password } = data;
        dispatch(signUpRequest(name, email, password));
    }

    return (
        <>
            <img src={logo} alt="Gobarber" />

            <Form schema={schema} onSubmit={handleSubmit}>
                <Input name="name" type="text" placeholder="Nome Completo" />
                <Input name="email" type="email" placeholder="you@email.com" />
                <Input
                    name="password"
                    type="password"
                    placeholder="Sua Senha"
                />

                <button type="submit">Criar Conta</button>
                <Link to="/">Já tenho Login</Link>
            </Form>
        </>
    );
}
