import { SIGN_IN, SCHEDULE_NOTIFICATIONS } from 'actions/account';

function account(state = {}, action) {
  const payload = action.payload;

  switch (action.type) {
    case SIGN_IN:
      return {
        username: payload.username,
        notifications: payload.notifications,
      };
    case SCHEDULE_NOTIFICATIONS:
      return { ...state, notifications: payload.notifications };
    default:
      return state;
  }
}

export default account;
