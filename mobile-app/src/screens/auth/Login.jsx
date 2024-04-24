import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
  ScrollView,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { Formik } from 'formik';
import { Eye, EyeOff } from 'lucide-react-native';
import { COLORS } from '../../utils/theme';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { loginSchema } from '../../utils/validationSchema';
import { ROUTES } from '../../utils/routes';
import { useDispatch } from 'react-redux';
import { signIn } from '../../features/auth/authSlice';
import { loginInvestor } from '../../services/userApi';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const { width } = useWindowDimensions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);

  const handleLogin = async values => {
    setIsSubmitting(true);
    const body = {
      email: values.email,
      password: values.password,
    };
    const res = await loginInvestor(body);
    if (res.status) {
      await AsyncStorage.setItem('token', res.token);
      dispatch(signIn(res.data));
    } else {
      Toast.show({
        type: 'error',
        text2: res.message,
        position: 'bottom',
      });
    }
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={{
              width: width / 2,
              height: width / 2,
            }}
            source={require('../../assets/img/logo.png')}
            resizeMode="contain"
          />
        </View>
        <Formik
          initialValues={{
            email: 'rohit.ksingh73@gmail.com',
            password: '12345678',
          }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}>
          {props => (
            <View style={styles.formContainer}>
              <Text style={styles.heading}>Login</Text>
              <Input
                label="Email"
                name={'email'}
                inputStyle={{ color: "black" }}
                formikProps={props}
                inputProps={{
                  keyboardType: 'email',
                }}
              />
              <Input
                label="Password"
                name={'password'}
                formikProps={props}
                inputProps={{
                  secureTextEntry: !isPasswordShowing,
                }}
                rightIcon={
                  <Button
                    btnStyle={{
                      backgroundColor: COLORS.COLOR_GRAY,
                      width: 40,
                      marginRight: 5,
                    }}
                    onPress={() => {
                      setIsPasswordShowing(!isPasswordShowing);
                    }}>
                    {!isPasswordShowing ? (
                      <EyeOff color={COLORS.COLOR_BLACK} size={18} />
                    ) : (
                      <Eye color={COLORS.COLOR_BLACK} size={18} />
                    )}
                  </Button>
                }
              />
              <Pressable>
                <Text style={styles.forgetPass} onPress={() => navigation.navigate(ROUTES.verifyPhone)}>Forgot Password</Text>
              </Pressable>
              <Button
                title={'login'}
                isLoading={isSubmitting}
                onPress={props.handleSubmit}
              />
              <Pressable
                onPress={() => {
                  navigation.navigate(ROUTES.register);
                }}>
                <Text style={styles.signupLink}>
                  Don't have an account?
                  <Text style={styles.signupText}>
                    {' '}Signup Here
                  </Text>
                </Text>
              </Pressable>
            </View>
          )}
        </Formik>
      </SafeAreaView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_COLOR_LIGHT,
  },
  logoContainer: {
    backgroundColor: COLORS.PRIMARY_COLOR,
    alignItems: 'center',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  formContainer: {
    backgroundColor: COLORS.BACKGROUND_COLOR_LIGHT,
    flex: 1,
    padding: 15,
  },
  heading: {
    fontWeight: 'bold',
    fontSize: 32,
    color: COLORS.COLOR_BLACK,
  },
  forgetPass: {
    textAlign: 'right',
    marginBottom: 16,
    textDecorationLine: 'underline',
    color: COLORS.COLOR_BLUE,
  },
  signupLink: {
    color: COLORS.COLOR_BLACK,
    marginTop: 24,
    textAlign: 'center',
  },
  signupText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.COLOR_BLUE,
  },
});
export default Login;
