import { all, takeLatest, call, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';
import { updateProfileSucess, updateProfileFailured } from './actions';

export function* updateProfile({ payload }) {
    try {
        const { name, email, ...rest } = payload.data;

        const profile = Object.assign(
            { name, email },
            rest.oldPassword ? rest : {}
        );

        const response = yield call(api.put, '/users', profile);

        Alert.alert('Sucesso', 'Perfil atualizado com Sucesso');

        yield put(updateProfileSucess(response.data));
    } catch (err) {
        Alert.alert('Falha na atualização', 'Verifique seus dados');
        yield put(updateProfileFailured());
    }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
