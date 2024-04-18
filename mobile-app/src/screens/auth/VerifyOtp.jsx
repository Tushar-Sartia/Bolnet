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
import { verifyOtpInvestor } from '../../services/userApi';

const VerifyOtp = ({ navigation, route }) => {
  const { phone } = route.params
  const [code, setCode] = useState("")
  const { width } = useWindowDimensions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerifyOtp = async values => {
    setIsSubmitting(true);
    const body = {
      otp: code,
      phone: phone
    };
    // console.log(body);
    const res = await verifyOtpInvestor(body)
    console.log(res);
    if (res.status) {
      Toast.show({
        type: 'success',
        text2: res.message,
        position: 'bottom',
      });
      navigation.navigate(ROUTES.resetPassword, phone)
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
            otp: '',
          }}
          onSubmit={handleVerifyOtp}>
          {props => (
            <View style={styles.formContainer}>
              <Text style={styles.heading}>Enter Verification Code</Text>
              <Text style={{ fontSize: 15 }}>We are automatically detecting a SMS send to your mobile number - {phone} </Text>
              <View>
                <OtpInputs
                  inputContainerStyles={styles.underlineStyleBase}
                  inputStyles={styles.fontStyles}
                  tintColor="#FB6C6A"
                  offTintColor="#BBBCBE"
                  handleChange={(e) => setCode(e)}
                  numberOfInputs={4}
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Button
                  title={'Continue'}
                  isLoading={isSubmitting}
                  onPress={props.handleSubmit}
                />
              </View>

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
  underlineStyleBase: {
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 2,
    borderRadius: 5,
    margin: 15,
    paddingLeft: 14,
    minWidth: 51,
    fontSize: 20
    // borderBottomWidth: 1,
  },
  fontStyles: {
    fontSize: 20,
    color: "black"
  }
});
export default VerifyOtp;
