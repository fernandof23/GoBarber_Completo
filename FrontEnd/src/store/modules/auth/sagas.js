import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';
import { signInSucess, signFailure } from './actions';

export function* signIn({ payload }) {
    try {
        const { email, password } = payload;

        const response = yield call(api.post, 'sessions', { email, password });

        const { token, user } = response.data;

        if (!user.provider) {
            toast.error('Usuario Não é prestador');
            return;
        }

        api.defaults.headers.Authorization = `Bearer ${token}`;

        yield put(signInSucess(token, user));
        history.push('/dashboard');
    } catch (err) {
        toast.error('Falha na autenticação, verifique seus dados');
        yield put(signFailure());
    }
}

export function* signUp({ payload }) {
    try {
        const { name, email, password } = payload;
        yield call(api.post, '/users', {
            name,
            email,
            password,
            provider: true,
        });
        toast.success('Conta criada com Sucesso, Faça Login');
        history.push('/');
    } catch (err) {
        toast.error('Falha na criação, verifique seus dados');
        yield put(signFailure());
    }
}

export function setToken({ payload }) {
    if (!payload) return;

    const { token } = payload.auth;

    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export function signOut() {
    history.push('/');
}

export default all([
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGNOUT', signOut),
]);
