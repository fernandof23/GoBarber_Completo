import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfileRequest } from '~/store/modules/user/actions';
import { signOut } from '~/store/modules/auth/actions';
import AvatarProfile from './AvatarInput';

import { Container } from './styles';

export default function Profile() {
    const profile = useSelector(state => state.user.profile);
    const dispatch = useDispatch();
    function handleSubmit(data) {
        dispatch(updateProfileRequest(data));
    }

    function handleLogout() {
        dispatch(signOut());
    }
    return (
        <Container>
            <Form initialData={profile} onSubmit={handleSubmit}>
                <AvatarProfile name="avatar_id" />
                <Input name="name" placeholder="Nome comleto" />
                <Input
                    name="email"
                    type="email"
                    placeholder="Seu endereço de e-mail"
                />
                <hr />
                <Input
                    name="oldPassword"
                    type="password"
                    placeholder="Sua Senha Atual"
                />
                <Input
                    name="password"
                    type="password"
                    placeholder="Nova Senha"
                />

                <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirmação de senha"
                />

                <button type="submit"> Atualizar Perfil</button>
            </Form>

            <button type="button" onClick={handleLogout}>
                Sair do GoBarber
            </button>
        </Container>
    );
}
