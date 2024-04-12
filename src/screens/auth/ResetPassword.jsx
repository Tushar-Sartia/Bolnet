import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Formik } from 'formik';
import { COLORS } from '../../utils/theme';
import Button from '../../components/Button';

import Toast from 'react-native-toast-message';
import OtpInputs from 'react-native-otp-inputs';
import { ROUTES } from '../../utils/routes';
import Input from '../../components/Input';
import { Eye, EyeOff } from 'lucide-react-native';
import { resetPassword } from '../../utils/validationSchema';
import { resetPasswordApi } from '../../services/userApi';

const ResetPassword = ({ navigation, route }) => {

  const [code, setCode] = useState("")
  const { width } = useWindowDimensions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);

  const handleResetPassword = async values => {
    setIsSubmitting(true);
    const body = {
      password: values.password,
      phone: route.params
    };
    // return console.log(body);
    const res = await resetPasswordApi(body)
    if (res.status) {
      Toast.show({
        type: 'success',
        text2: res.message,
        position: 'bottom',
      });
      return navigation.navigate(ROUTES.login)
    } else {
      Toast.show({
        type: 'error',
        text2: res.message,
        position: 'bottom',
      });
    }
    setIsSubmitting(false);
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
            password: '',
            confirm_password: '',
          }}
          validationSchema={resetPassword}
          onSubmit={handleResetPassword}>
          {props => (
            <View style={styles.formContainer}>
              <Text style={styles.heading}>Reset Password</Text>
              <Text style={{ fontSize: 15 }}>Create your new password so that you can login to your account </Text>
              <Input
                label="New Password"
                name={'password'}
                formikProps={props}
                inputProps={{
                  secureTextEntry: true,
                }}
              />
              <Input
                label="Confirm Password"
                name={'confirm_password'}
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
              <Button
                title={'Reset'}
                isLoading={isSubmitting}
                onPress={props.handleSubmit}
              />
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
    fontSize: 28,
    color: COLORS.COLOR_BLACK,
  },
});
export default ResetPassword;
