import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, SafeAreaView } from 'react-native';
import { COLORS } from '../../utils/theme';
import { Formik } from 'formik';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Eye, EyeOff } from 'lucide-react-native';
import { updateInvesterPassword } from '../../services/userApi';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import { updatePasswordSchema } from '../../utils/validationSchema';
import Toast from 'react-native-toast-message';


const UpdatePassword = ({ navigation }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPasswordShowing, setIsPasswordShowing] = useState(false);
  const { user } = useSelector(selectUser)
  const handleUpdatePassword = async (values, { resetForm }) => {
    setIsSubmitting(true);
    const updatePassword = {
      id: user?.id,
      old_password: values.old_password,
      password: values.password
    }
    // return console.log(updatePassword);
    const res = await updateInvesterPassword(updatePassword)
    if (res.status) {
      Toast.show({
        type: 'success',
        text2: res.message,
        position: 'bottom',
      });
      resetForm();
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

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={{
            old_password: '',
            password: '',
            confirm_password: '',
          }}
          validationSchema={updatePasswordSchema}
          onSubmit={handleUpdatePassword}>
          {props => (
            <View style={styles.formContainer}>
              <Input
                label="Old Password"
                name={'old_password'}
                formikProps={props}
                inputProps={{
                  secureTextEntry: true,
                }}
              />
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
                title={'update password'}
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
export default UpdatePassword;
