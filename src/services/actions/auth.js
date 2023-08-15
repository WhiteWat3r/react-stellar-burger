export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const LOGOUT_SUCCESS = 'LOGOUT';
export const GET_USER_DATA = 'GET_USER_DATA';
export const LOGOUT_START = 'LOGOUT_START';
export const LOGIN_START = 'LOGIN_START';
export const REGISTER_START = 'REGISTER_START';
export const REGISTER_FAILED = 'REGISTER_FAILED';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const FORGOT_PASSWORD_START = 'FORGOT_PASSWORD_START';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';
export const RESET_PASSWORD_START = 'RESET_PASSWORD_START'
export const RESET_PASSWORD_SUCCESS = 'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILED = 'RESET_PASSWORD_FAILED'
export const CLEAR_EROR_FIELDS = 'CLEAR_EROR_FIELDS'


export const loginStart = () => {
  return {
    type: LOGIN_START,
  };
};

export const loginSuccess = (userData) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userData,
  };
};

export const loginFailed = (error) => {
  return {
    type: LOGIN_FAILED,
    payload: error,
  };
};

export const registerStart = () => {
  return {
    type: REGISTER_START,
  };
};

export const registerFailed = (error) => {
  return {
    type: REGISTER_FAILED,
    payload: error,
  };
};

export const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS,
  };
};

export const logoutStart = () => {
  return {
    type: LOGOUT_START,
  };
};

export const logoutSuccess = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};

export const getUserDataSuccess = (userData) => {
  return {
    type: GET_USER_DATA,
    payload: userData,
  };
};

export const forgotPasswordStart = () => {
  return {
    type: FORGOT_PASSWORD_START,
  };
};

export const forgotPasswordSuccess = () => {
  return {
    type: FORGOT_PASSWORD_SUCCESS,
  };
};

export const forgotPasswordFailed = () => {
  return {
    type: FORGOT_PASSWORD_FAILED,
  };
};

export const clearErrorFields = () => {
    return {
      type: CLEAR_EROR_FIELDS,
    };
};





export const resetPasswordStart = () => {
    return {
      type: RESET_PASSWORD_START,
    };
  };
  
  export const resetPasswordSuccess = () => {
    return {
      type: RESET_PASSWORD_SUCCESS,
    };
  };
  
  export const resetPasswordFailed = (error) => {
    return {
      type: RESET_PASSWORD_FAILED,
      payload: error
    };
  };
  

