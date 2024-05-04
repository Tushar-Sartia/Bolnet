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
    const { data } = await customApi.post(`/users/login`, body);
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
    const { data } = await customApi.post(`/users/app-create-users`, body, {
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
export const getPopularProducts = async () => {
  try {
    const { data } = await customApi.get(`/product/popular-product`);
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
    const { data } = await customApi.get(`/product/getProduct`);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const getProductDetails = async (id) => {
  try {
    const { data } = await customApi.get(`/product/getProductDetail/${id}`);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const getProductSpecification = async (id) => {
  try {
    const { data } = await customApi.get(`/product/getProductSpecification/${id}`);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const getProductReviews = async (id) => {
  try {
    const { data } = await customApi.get(`/product/getProductReviews/${id}`);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const addToCart = async (body) => {
  try {
    const { data } = await customApi.post('/cart/add-to-cart', body)
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    }
  }
}
export const getCartItems = async (id) => {
  try {
    const { data } = await customApi.get(`/cart/${id}`)
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    }
  }
}
export const removeItemFromCart = async (body) => {
  try {
    const { data } = await customApi.post(`/cart/deleteItemFromCart`, body)
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    }
  }
}
export const updateCartQty = async (body) => {
  try {
    const { data } = await customApi.put(`/cart/updateItemFromCart`, body)
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    }
  }
}
export const placeOrder = async (body) => {
  try {
    const { data } = await customApi.post(`/order/placeOrder`, body)
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    }
  }
}
export const getAllOrders = async (userId) => {
  try {
    const { data } = await customApi.get(`/order/getAllOrder/${userId}`)
    return data;
  } catch (error) {

    return {
      status: false,
      message: error.response?.data?.message || error.message,
    }
  }
}

export const getInvestorBankDetails = async values => {
  try {
    const { data } = await customApi.get(`/investment/getInvestorBank`, values);
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
    const { data } = await customApi.post(`/users/password-change`, values);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const getAllCountry = async () => {
  try {
    const { data } = await customApi.get(`/country`);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const getAllStates = async (id) => {
  try {
    const { data } = await customApi.get(`/state/${id}`);
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
    const { data } = await customApi.get(`/city/${id}`);
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
    const { data } = await customApi.post(`/users/app-update-users`, values,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
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
    const { data } = await customApi.post(`/users/get-bank-details`, values
    );
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const addUserBankDetails = async values => {
  try {
    const { data } = await customApi.post(`/users/add-bank-details`, values);
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
    const { data } = await customApi.post(`/help/help-requests`, values);
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
    const { data } = await customApi.post('/investment/invest', values, {
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
    const { data } = await customApi.post(`/users/update-nominee`, values,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
export const getNomineeDetails = async userId => {
  try {
    const { data } = await customApi.get(`/users/get-nominee/${userId}`);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error.response?.data?.message || error.message,
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

export const getWalletDataApi = async id => {
  try {
    const { data } = await customApi.get(`/wallet/wallet-details/${id}`);
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
    const { data } = await customApi.get(`/delete-account/${id}`);
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
    const { data } = await customApi.get(`/investment/investment_dashboard/${id}`);
    return data;
  } catch (error) {
    return {
      status: false,
      message: error?.response?.data?.message || error?.message,
    };
  }
};
