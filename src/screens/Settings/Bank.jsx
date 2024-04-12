import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { COLORS } from '../../utils/theme';
import { Formik } from 'formik';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { bankSchema } from '../../utils/validationSchema';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../../features/auth/authSlice';
import { updateUserDetails } from '../../services/userApi';
import Toast from 'react-native-toast-message';


const Bank = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useSelector(selectUser)
  const dispatch = useDispatch()

  const handleUpdateBankAccount = async (values) => {
    setIsSubmitting(true);
    const fData = new FormData();
    fData.append('id', user?.id);
    fData.append('account_holder_name', values.account_holder_name);
    fData.append('bank_name', values.bank_name);
    fData.append('ifsc_code', values.ifsc);
    fData.append('account_number', values.account_number);
    const res = await updateUserDetails(fData);
    if (res.status) {
      Toast.show({
        type: 'success',
        text2: res.message,
        position: 'bottom',
      });
      dispatch(setUser(res.data));
    } else {
      Toast.show({
        type: 'error',
        text2: res.message,
        position: 'bottom',
      });
    }
    setIsSubmitting(false);
  };

  // useEffect(() => {
  //   user
  // }, [isFocused])

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={{
            bank_name: user?.bank_name || '',
            account_number: user?.account_number || '',
            ifsc: user?.ifsc_code || '',
            account_holder_name: user?.account_holder_name || '',
          }}
          validationSchema={bankSchema}
          onSubmit={handleUpdateBankAccount}>
          {props => (
            <View style={styles.formContainer}>
              <Input label="Bank Name" name={'bank_name'} formikProps={props} />
              <Input
                label="Account Number"
                name={'account_number'}
                formikProps={props}
                inputProps={{
                  keyboardType: 'phone-pad',
                }}
              />
              <Input label="IFSC code" name={'ifsc'} formikProps={props} />
              <Input
                label="Account Holder Name"
                name={'account_holder_name'}
                formikProps={props}
              />
              <Button
                title={'update bank details'}
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
export default Bank;
