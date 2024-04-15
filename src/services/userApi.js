import Axios from 'axios';
import { API_URL } from '../utils/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const customApi = Axios.create({
  baseURL: API_URL,
});
customApi.interceptors.request.use(async config => {
  let token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  return config;
});
export const loginInvestor = async body => {
  try {
    const { data } = await customApi.post(`/user/userLogin`, body);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const verifyPhoneInvestor = async body => {
  try {
    const { data } = await customApi.post(`/investor_forgot_password`, body);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const verifyOtpInvestor = async body => {
  try {
    const { data } = await customApi.post(`/otp_verify`, body);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const resetPasswordApi = async body => {
  try {
    const { data } = await customApi.post(`/investor_otp_password_change`, body);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const registerInvestor = async body => {
  try {
    const { data } = await customApi.post(`/user/createUser`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const getAllProducts = async () => {
  try {
    const { data } = await customApi.get(`/products_details`);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const updateInvesterPassword = async values => {
  try {
    const { data } = await customApi.post(`/user/changePassword`, values);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const getAllStates = async () => {
  try {
    const { data } = await customApi.get(`/get_state/101`);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const getAllCities = async id => {
  try {
    const { data } = await customApi.get(`/get_city/${id}`);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const getUserBankDetails = async values => {
  try {
    const { data } = await customApi.get(`/get-bank-detalis`, values);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const updateUserDetails = async values => {
  try {
    const { data } = await customApi.post(`/user/updateProfile`, values, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const contactFormApi = async values => {
  try {
    const { data } = await customApi.post(`/send_query`, values);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const updateProfile = async values => {
  try {
    const { data } = await customApi.post('/investor_profile_update', values, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message || error?.message,
    };
  }
};
export const investFormApi = async values => {
  try {
    const { data } = await customApi.post('/investor_invest', values, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message || error?.message,
    };
  }
};
export const updateNomineDetails = async values => {
  try {
    const { data } = await customApi.post('/user/nomineeUpdate', values, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  } catch (error) {
    console.log('error', error.message);
    return {
      status: false,
      message: error?.response?.data?.message || error?.message,
    };
  }
};
export const getNominee = async (body) => {
  try {
    const { data } = await customApi.get(`/user/getNominee/${body}`);
    return data;
  } catch (error) {
    console.log('error', error.message);
    return {
      status: false,
      message: error?.response?.data?.message || error?.message,
    };
  }
};
export const getInvestmentHistory = async id => {
  try {
    const { data } = await customApi.get(`/get-investment-history/${id}`);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message || error?.message,
    };
  }
};
export const getAdminDetails = async () => {
  try {
    const { data } = await customApi.get(`/admin_details`,);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message || error?.message,
    };
  }
};
export const getWalletDataApi = async id => {
  try {
    const { data } = await customApi.get(`/investment_history/${id}`);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message || error?.message,
    };
  }
};
export const withdrawAmountApi = async values => {
  try {
    const { data } = await customApi.post(`/investor_withdrawal`, values);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message || error?.message,
    };
  }
};
export const deleteAccountApi = async id => {
  try {
    const { data } = await customApi.get(`/investment_delete_account/${id}`);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message || error?.message,
    };
  }
};
export const dashboardApi = async id => {
  try {
    const { data } = await customApi.get(`/investment_dashboard/${id}`);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message || error?.message,
    };
  }
};
