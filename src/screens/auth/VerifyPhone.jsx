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
import { phoneSchema } from '../../utils/validationSchema';
import { ROUTES } from '../../utils/routes';

import Toast from 'react-native-toast-message';
import { verifyPhoneInvestor } from '../../services/userApi';

const VerifyPhone = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerifyPhone = async values => {
    setIsSubmitting(true);
    const body = {
      phone: values.phone,
    };
    const res = await verifyPhoneInvestor(body)
    if (res.status) {
      Toast.show({
        type: 'success',
        text2: res.message,
        position: 'bottom',
      });
      navigation.navigate(ROUTES.verifyOtp, values)
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
            phone: '',
          }}
          validationSchema={phoneSchema}
          onSubmit={handleVerifyPhone}>
          {props => (
            <View style={styles.formContainer}>
              <Text style={styles.heading}>Enter Your Mobile Number</Text>
              <Text style={{ fontSize: 15 }}>We Will send you a Confirmation Code</Text>
              <Input
                label="Phone number"
                name={'phone'}
                formikProps={props}
                inputProps={{
                  maxLength: 10,
                  keyboardType: 'phone-pad',
                }}
              />
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
});
export default VerifyPhone;
