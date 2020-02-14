import produce from 'immer';

const INICIAL_STATE = {
    signed: false,
    loading: false,
    token: null,
};

export default function auth(state = INICIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@auth/SIGN_IN_REQUEST': {
                draft.loading = true;
                break;
            }

            case '@auth/SIGN_IN_SUCESS': {
                draft.token = action.payload.token;
                draft.signed = true;
                draft.loading = false;
                break;
            }

            case '@auth/SIGN_FAILURED': {
                draft.loading = false;
                draft.signed = false;
                draft.token = null;
                break;
            }

            case '@auth/SIGNOUT': {
                draft.token = null;
                draft.signed = false;
                break;
            }
            default:
        }
    });
}
