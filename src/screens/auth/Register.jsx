import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  useWindowDimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { COLORS } from '../../utils/theme';
import Input from '../../components/Input';
import { Formik } from 'formik';
import Button from '../../components/Button';
import { registerSchema } from '../../utils/validationSchema';
import { Eye, EyeOff } from 'lucide-react-native';
import { getAllCities, getAllStates, registerInvestor } from '../../services/userApi';
import Toast from 'react-native-toast-message';

const Register = ({ navigation }) => {
  const { width } = useWindowDimensions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);
  const [statesData, setStatesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);

  const handleLogin = async (values) => {
    setIsSubmitting(true);
    const fData = new FormData();
    fData.append('name', values.name);
    fData.append('phone', values.phone);
    fData.append('email', values.email);
    fData.append('password', values.password);
    fData.append('country', values.country);
    fData.append('state', values.state);
    fData.append('city', values.city);
    const res = await registerInvestor(fData);
    // console.log(res);
    if (res.status) {
      Toast.show({
        type: 'success',
        text2: res.message + ', ' + 'login now',
        position: 'bottom',
      });
      // resetForm();
      navigation.goBack();
    } else {
      Toast.show({
        type: 'error',
        text2: res.message,
        position: 'bottom',
      });
    }
    setIsSubmitting(false);
  };

  const getStates = async () => {
    const res = await getAllStates();
    if (res.status) {
      const rData = res?.data?.map(itm => {
        return {
          value: itm.id,
          label: itm.name,
        };
      });
      setStatesData(rData);

    } else {
      setStatesData([]);
    }
  };

  const handleStateChange = async (value) => {
    // if (value) {
    //   setValue("value", value.value)
    // }
    // console.log(value);

    if (!value) return setCitiesData([]);
    const res = await getAllCities(value);
    if (res.status) {
      const rData = res?.data?.map(itm => {
        return {
          value: itm.id,
          label: itm.name,
        };
      });
      setCitiesData(rData);
    } else {
      setCitiesData([]);
    }
  };

  useEffect(() => {
    getStates();
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            style={{
              width: width / 3,
              height: width / 3,
            }}
            source={require('../../assets/img/logo.png')}
            resizeMode="contain"
          />
        </View>
        <Formik
          initialValues={{
            phone: '',
            password: '',
            conf_password: '',
            name: '',
            email: '',
            country: '',
            state: "",
            city: ""
          }}
          validationSchema={registerSchema}
          onSubmit={handleLogin}>
          {props => (
            <View style={styles.formContainer}>
              <Text style={styles.heading}>Sign up</Text>
              <Input label="Name" name={'name'} formikProps={props} />
              <Input
                label="Phone number"
                name={'phone'}
                formikProps={props}
                inputProps={{
                  maxLength: 10,
                  keyboardType: 'phone-pad',
                }}
              />
              <Input
                label="Email"
                name={'email'}
                formikProps={props}
                inputProps={{
                  keyboardType: 'email-address',
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
              <Input
                label="Confirm Password"
                name={'conf_password'}
                formikProps={props}
                inputProps={{
                  secureTextEntry: true,
                }}
              />
              <Input
                label="Country"
                name={'country'}
                formikProps={props}
                select={{
                  isSelect: true,
                }}
                data={[
                  { label: 'India', value: 101 },
                ]}
              />
              <View style={{ flexDirection: 'row', gap: 20 }}>
                <View style={{ flex: 1 }}>
                  <Input
                    label="State"
                    name={'state'}
                    formikProps={props}
                    select={{
                      isSelect: true,
                    }}
                    onChange={(val) => {
                      handleStateChange(val.value);
                      props.setFieldValue("state", val.value)
                    }
                    }
                    data={statesData}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Input
                    label="City"
                    name={'city'}
                    formikProps={props}
                    select={{
                      isSelect: true,
                    }}
                    data={citiesData}
                  />
                </View>
              </View>
              <Button
                title={'sign up'}
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
    textTransform: 'capitalize',
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
    fontWeight: 'bold',
    fontSize: 24,
    color: COLORS.COLOR_BLUE,
    marginTop: 24,
  },
});
export default Register;
