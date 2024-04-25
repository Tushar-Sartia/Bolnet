import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { COLORS } from '../../utils/theme';
import { Formik } from 'formik';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { bankSchema } from '../../utils/validationSchema';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, setUser } from '../../features/auth/authSlice';
import { addUserBankDetails, getUserBankDetails, updateUserDetails } from '../../services/userApi';
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native';


const Bank = () => {
  const [loader, setLoader] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useSelector(selectUser)
  const [userBankDetail, setUserBankDetail] = useState([])
  const dispatch = useDispatch()
  const isFocused = useIsFocused()
  const handleUpdateBankAccount = async (values) => {
    setIsSubmitting(true);
    const body = {
      userId: user?.id,
      accountNumber: values.accountNumber,
      bankName: values.bankName,
      accountHolderName: values.accountHolderName,
      ifscCode: values.ifscCode,
    }
    const res = await addUserBankDetails(body);
    if (res.status) {
      Toast.show({
        type: 'success',
        text2: res.message,
        position: 'bottom',
      });
    } else {
      Toast.show({
        type: 'error',
        text2: res.message,
        position: 'bottom',
      });
    }
    setIsSubmitting(false);
  };
  const getDetail = async () => {
    setLoader(false)
    const body = {
      userId: user?.id
    }
    const res = await getUserBankDetails(body)
    if (res.status) {
      setUserBankDetail(res.data[0])
    }
    setLoader(false)
  }
  useEffect(() => {
    if (isFocused)
      getDetail()
  }, [isFocused])

  return (
    <>{loader ?
      <ActivityIndicator size={'large'} color={'red'} />
      :
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        style={styles.container}>
        <SafeAreaView style={styles.container}>
          <Formik
            initialValues={{
              bankName: userBankDetail?.bank_name || '',
              accountNumber: userBankDetail?.account_number?.toString() || '',
              ifscCode: userBankDetail?.ifsc || '',
              accountHolderName: userBankDetail?.account_holder_name || '',
            }}
            validationSchema={bankSchema}
            enableReinitialize
            onSubmit={handleUpdateBankAccount}>
            {props => (
              <View style={styles.formContainer}>
                <Input label="Bank Name" name={'bankName'} formikProps={props} />
                <Input
                  label="Account Number"
                  name={'accountNumber'}
                  formikProps={props}
                  inputProps={{
                    maxLength:12,
                    keyboardType: 'phone-pad',
                  }}
                />
                <Input label="IFSC code" name={'ifscCode'} formikProps={props} />
                <Input
                  label="Account Holder Name"
                  name={'accountHolderName'}
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
      </ScrollView>}
    </>
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
