import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { Form, Input } from '@rocketseat/unform';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Insira um e-mail no formato correto')
        .required('E-mail obrigatorio'),
    password: Yup.string()
        .min(6, 'A senha deve ter no minimo 6 caracteres')
        .required('Senha Obrigatoria'),
});

export default function SignIn() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.auth.loading);

    function handleSubmit(data) {
        const { email, password } = data;
        dispatch(signInRequest(email, password));
    }

    return (
        <>
            <img src={logo} alt="Gobarber" />

            <Form schema={schema} onSubmit={handleSubmit}>
                <Input name="email" type="email" placeholder="you@email.com" />
                <Input
                    name="password"
                    type="password"
                    placeholder="Sua Senha"
                />

                <button type="submit">
                    {loading ? 'Carregando...' : 'Acessar'}
                </button>
                <Link to="/register">Criar Conta Gratuita</Link>
            </Form>
        </>
    );
}
