import React, { useState, useRef } from 'react';
import { StyleSheet, View, Image, Text, ScrollView, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import { COLORS } from '../../utils/theme';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';


const UpdateProfile = ({ navigation }) => {
  const { user } = useSelector(selectUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [states, setStates] = useState([]);
  const [profilePicture, setProfilePicture] = useState(null);


  const handleUpdateProfile = async values => {
    setIsSubmitting(true);
    console.log('values', values);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const actionSheetRef = useRef();
  const showActionSheet = () => {
    actionSheetRef.current.show();
  };

  const handleActionSheetPress = index => {
    if (index === 0) {
      ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
      }).then(image => {
        setProfilePicture(image.path);
      });
    } else if (index === 1) {
      ImagePicker.openCamera({
        width: 300,
        height: 300,
        cropping: true,
        cropperCircleOverlay: true,
      }).then(image => {
        setProfilePicture(image.path);
      });
    }
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: user?.investor_name || '',
            email: user?.investor_email || '',
            phone: user?.investor_phone || '',
            address: user?.investor_address || '',
            state: user?.investor_state || '',
            city: user?.investor_city || '',
            pincode: user?.investor_zip_code || '',
          }}
          //   validationSchema={loginSchema}
          onSubmit={handleUpdateProfile}>
          {props => (
            <View style={styles.formContainer}>
              <View style={styles.imageContainer}>
                {profilePicture ? (
                  <Image
                    source={{ uri: profilePicture }}
                    style={{ width: 150, height: 150, borderRadius: 75 }}
                  />
                ) : null}
                <Button title="Choose or Capture Photo" onPress={showActionSheet} />
                <ActionSheet
                  ref={actionSheetRef}
                  title={<Text>Select an option</Text>}
                  options={['Choose from Gallery', 'Capture Photo', 'Cancel']}
                  cancelButtonIndex={2}
                  destructiveButtonIndex={2}
                  onPress={handleActionSheetPress}
                />
              </View>

              <Input label="Name" name={'name'} formikProps={props} />
              <Input
                label="Email"
                name={'email'}
                formikProps={props}
                inputProps={{
                  keyboardType: 'email-address',
                }}
              />
              <Input
                label="Phone number"
                name={'phone'}
                formikProps={props}
                inputProps={{
                  maxLength: 10,
                  keyboardType: 'phone-pad',
                }}
              />
              <Input label="Address" name={'address'} formikProps={props} />
              <View style={{ flexDirection: 'row', gap: 20 }}>
                <View style={{ flex: 1 }}>
                  <Input
                    label="State"
                    name={'state'}
                    formikProps={props}
                    select={{
                      isSelect: true,
                    }}
                    data={states}
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
                    data={[
                      { label: 'New Delhi', value: 1 },
                      { label: 'Noida', value: 2 },
                      { label: 'Kanpur', value: 3 },
                    ]}
                  />
                </View>
              </View>
              <Input
                label="Pin Code"
                name={'pincode'}
                formikProps={props}
                inputProps={{
                  maxLength: 6,
                  keyboardType: 'phone-pad',
                }}
              />
              <Button
                title={'update profile'}
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
  imageContainer: { flexDirection: 'row', gap: 20, alignItems: 'center' },
  formContainer: {
    backgroundColor: COLORS.BACKGROUND_COLOR_LIGHT,
    flex: 1,
    padding: 15,
  },
});
export default UpdateProfile;
