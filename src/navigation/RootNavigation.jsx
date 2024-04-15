import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/auth/Login';
import { ROUTES } from '../utils/routes';
import Register from '../screens/auth/Register';
import { COLORS } from '../utils/theme';
import Home from '../screens/Home';
import InvestForm from '../screens/InvestForm';
import Profile from '../screens/Profile';
import Products from '../screens/Products';
import Settings from '../screens/Settings';
import UpdateProfile from '../screens/Settings/UpdateProfile';
import UpdatePassword from '../screens/Settings/UpdatePassword';
import Nominee from '../screens/Settings/Nominee';
import Bank from '../screens/Settings/Bank';
import Wallet from '../screens/Wallet';
import Help from '../screens/Help';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';
import ForgotPassword from '../screens/auth/VerifyPhone';
import CustomView from '../screens/CustomView';
import VerifyPhone from '../screens/auth/VerifyPhone';
import VerifyOtp from '../screens/auth/VerifyOtp';
import ResetPassword from '../screens/auth/ResetPassword';
import ViewProduct from '../screens/ViewProduct';
import Cart from '../screens/Cart';
import Order from '../screens/Order';
import OrderDetails from '../screens/OrderDetails';
import Feedback from '../screens/Feedback';


const Stack = createNativeStackNavigator();

const RootNavigation = () => {
  const { isAuthenticated } = useSelector(selectUser);
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.home}
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.PRIMARY_COLOR },
        animation: 'slide_from_right',
        headerTitleStyle: {
          color: COLORS.COLOR_WHITE,
        },
        orientation: 'portrait',
        headerTintColor: COLORS.COLOR_WHITE,
        headerBackTitleVisible: false,
      }}>
      {isAuthenticated ? (
        <Stack.Group>
          <Stack.Screen
            name={ROUTES.home}
            component={Home}
            options={{
              title: 'Bolnet',
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.products}
            component={Products}
            options={{
              title: 'Bolnet Products',
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.invest}
            component={InvestForm}
            options={{
              title: 'Invest Now',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name={ROUTES.profile}
            component={Profile}
            options={{
              title: 'Profile',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name={ROUTES.order}
            component={Order}
            options={{
              title: 'My Orders',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name={ROUTES.orderDetails}
            component={OrderDetails}
            options={{
              title: 'Order Details',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name={ROUTES.feedback}
            component={Feedback}
            options={{
              title: 'Feedback',
              animation: 'slide_from_bottom',
            }}
          />
          {/* <Stack.Screen
            name={ROUTES.home}
            component={Home}
            options={{
              title: 'Bolnet',
              headerShadowVisible: false,
            }}
          /> */}
          <Stack.Screen
            name={ROUTES.viewProduct}
            component={ViewProduct}
            options={{
              title: 'Product',
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.cart}
            component={Cart}
            options={{
              title: 'Cart',
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.settings}
            component={Settings}
            options={{
              title: 'Account Settings',
            }}
          />
          <Stack.Screen
            name={ROUTES.profileSettings}
            component={UpdateProfile}
            options={{
              title: 'Update Profile',
            }}
          />
          <Stack.Screen
            name={ROUTES.password}
            component={UpdatePassword}
            options={{
              title: 'Update Password',
            }}
          />
          <Stack.Screen name={ROUTES.nominee} component={Nominee} />
          <Stack.Screen name={ROUTES.bank} component={Bank} />
          <Stack.Screen
            name={ROUTES.wallet}
            component={Wallet}
            options={{
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen name={ROUTES.help} component={Help} />
          <Stack.Screen name={ROUTES.about} component={CustomView} />
          <Stack.Screen name={ROUTES.terms} component={CustomView} />
          <Stack.Screen name={ROUTES.privacy} component={CustomView} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            name={ROUTES.login}
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.verifyPhone}
            component={VerifyPhone}
            options={{
              title: 'Verify Mobile',
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.verifyOtp}
            component={VerifyOtp}
            options={{
              title: 'Verify Otp',
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.resetPassword}
            component={ResetPassword}
            options={{
              title: 'Reset Password',
              headerShadowVisible: false,
            }}
          />
          <Stack.Screen
            name={ROUTES.register}
            component={Register}
            options={{
              title: 'Sign Up',
              headerShadowVisible: false,
            }}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};
export default RootNavigation;
