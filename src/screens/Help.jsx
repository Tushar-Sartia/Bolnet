import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, ScrollView } from 'react-native';
import { COLORS } from '../utils/theme';
import { Formik } from 'formik';
import Input from '../components/Input';
import Button from '../components/Button';
import { contactFormApi } from '../services/userApi';
import Toast from 'react-native-toast-message';
import { contactFormSchema } from '../utils/validationSchema';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';
const Help = ({ navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useSelector(selectUser)

  const handleSubmitQuery = async values => {
    const contactData = {
      investor_id: user?.id,
      name: values.name,
      email_address: values.email,
      contact_no: values.phone,
      message: values.message
    }
    const res = await contactFormApi(contactData)
    if (res.status) {
      Toast.show({
        type: "success",
        text2: res.message,
        position: "bottom",
      })
      navigation.goBack()
    }
    else {
      Toast.show({
        type: "error",
        text2: res.message,
        position: "bottom",
      })
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Formik
          validationSchema={contactFormSchema}
          initialValues={{
            name: '',
            phone: '',
            email: '',
            message: '',
          }}
          onSubmit={handleSubmitQuery}>
          {props => (
            <View style={styles.formContainer}>
              <Input label="Your Name" name={'name'} formikProps={props} />
              <Input
                label="Phone Number"
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
                label="Message"
                name={'message'}
                formikProps={props}
                inputProps={{
                  multiline: true,
                }}
                inputStyle={{
                  height: 200,
                }}
              />
              <Button
                title={'submit query'}
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
  formContainer: {
    backgroundColor: COLORS.BACKGROUND_COLOR_LIGHT,
    flex: 1,
    padding: 15,
  },
});
export default Help;
