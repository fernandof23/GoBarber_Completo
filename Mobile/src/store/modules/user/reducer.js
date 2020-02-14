import produce from 'immer';

const INICIAL_STATE = {
    profile: null,
};

export default function user(state = INICIAL_STATE, action) {
    return produce(state, draft => {
        switch (action.type) {
            case '@auth/SIGN_IN_SUCESS': {
                draft.profile = action.payload.user;
                break;
            }
            case '@user/UPDATE_PROFILE_SUCESS': {
                draft.profile = action.payload.profile;
                break;
            }
            case '@auth/SIGNOUT': {
                draft.profile = null;
                break;
            }
            default:
        }
    });
}
