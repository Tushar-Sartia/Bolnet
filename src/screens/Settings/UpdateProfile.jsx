import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import {COLORS} from '../../utils/theme';
import Input from '../../components/Input';
import Button from '../../components/Button';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser, setUser} from '../../features/auth/authSlice';
import ImagePicker from 'react-native-image-crop-picker';
import {profileInformationSchema} from '../../utils/validationSchema';
import {
  getAllCities,
  getAllStates,
  updateProfile,
  updateUserDetails,
} from '../../services/userApi';
import Toast from 'react-native-toast-message';
import {API_URL, MEDIA_URL} from '../../utils/constants';
import {
  PERMISSIONS,
  checkMultiple,
  openSettings,
  requestMultiple,
} from 'react-native-permissions';
import {DUMMY_PROFILE_IMAGE} from '../../utils/images';

const UpdateProfile = () => {
  const {user} = useSelector(selectUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [width, setWidth] = useState(70);
  const [height, setHeight] = useState(70);
  const [statesData, setStatesData] = useState([]);
  const [citiesData, setCitiesData] = useState([]);
  const dispatch = useDispatch();
  const [showImage, setShowImage] = useState(false);

  const askMediPermission = async () => {
    if (Platform.OS === 'android') {
      const result = await requestMultiple([
        PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
        PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
        PERMISSIONS.ANDROID.CAMERA,
      ]);
    }
  };

  const handleUpdateProfile = async () => {
    const bodyFormData = new FormData();
    bodyFormData.append('profile_pic', {
      name: new Date().getTime() + '.jpg',
      uri: selectedImage,
      type: 'image/jpeg',
    });
    bodyFormData.append('id', user?.id);
    // return console.log({ ...bodyFormData });
    const res = await updateProfile(bodyFormData);
    // console.log(JSON.stringify(res, null, 2));
    if (res.status) {
      Toast.show({
        type: 'success',
        text2: res.message,
        position: 'bottom',
        visibilityTime: 3000,
      });
      dispatch(setUser(res.data));
      setShowImage(false);
    } else {
      Toast.show({
        type: 'error',
        text2: res.message,
        position: 'bottom',
        visibilityTime: 3000,
      });
    }
  };

  const handleUpdateProfileData = async values => {
    setIsSubmitting(true);
    const fData = new FormData();
    fData.append('id', user?.id);
    fData.append('name', values.name);
    fData.append('phone', values.phone);
    fData.append('email', values.email);
    fData.append('address', values.address);
    fData.append('country_id', values.country);
    fData.append('state', values.state);
    fData.append('city', values.city);
    fData.append('pin_code', values.pincode);
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
  const handleImagePicker = async () => {
    askMediPermission();
    const statuses = await checkMultiple([
      PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
      PERMISSIONS.ANDROID.ACCESS_MEDIA_LOCATION,
      PERMISSIONS.ANDROID.CAMERA,
    ]);
    if (statuses[PERMISSIONS.ANDROID.CAMERA] === 'granted') {
      ImagePicker?.openPicker({
        width,
        height,
        cropping: true,
        mediaType: 'photo',
      })
        .then(image => {
          if (image) {
            setSelectedImage(image.path);
            setHeight(height);
            setWidth(width);
            setShowImage(true);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else if (selectedImage) {
      setShowImage(true);
    } else {
      Alert.alert(
        'Please provide permissions',
        'Bolnet needs permission to access the gallery',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: openSettings},
        ],
      );
    }
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

  const handleStateChange = async value => {
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
    if (user?.id) {
      handleStateChange(user?.state);
    }
    getStates();
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1}}
      style={styles.container}>
      <SafeAreaView style={styles.container}>
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: user?.name || '',
            email: user?.email || '',
            phone: user?.phone || '',
            address: user?.address || '',
            country: 101 || '',
            state: user?.state || '',
            city: user?.city || '',
            pincode: user?.pin_code || '',
          }}
          validationSchema={profileInformationSchema}
          onSubmit={handleUpdateProfileData}>
          {props => (
            <View style={styles.formContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={
                    selectedImage
                      ? {uri: selectedImage}
                      : user?.profile_pic
                      ? {uri: `${MEDIA_URL}/${user?.profile_pic}`}
                      : DUMMY_PROFILE_IMAGE
                    //   {
                    //   uri: selectedImage
                    //     ? selectedImage
                    //     : user?.profile_pic
                    //     ? `${API_URL}/${user?.profile_pic}`
                    //     : 'https://thewingshield.com/office/files/profile_images//_file601903341d32e-avatar.png',
                    // }
                  }
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: 'cover',
                  }}
                />
                {!showImage ? (
                  <Button
                    title={'choose Profile Image'}
                    color="primary"
                    onPress={() => handleImagePicker()}
                  />
                ) : (
                  <Button
                    title={'Save Image Profile'}
                    color="success"
                    onPress={() => handleUpdateProfile()}
                  />
                )}
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
              <Input
                label="Country"
                name={'country'}
                formikProps={props}
                onChange={val => props.setFieldValue('country', val.value)}
                select={{
                  isSelect: true,
                }}
                data={[{label: 'India', value: 101}]}
              />
              <View style={{flexDirection: 'row', gap: 20}}>
                <View style={{flex: 1}}>
                  <Input
                    label="State"
                    name={'state'}
                    formikProps={props}
                    select={{
                      isSelect: true,
                    }}
                    onChange={val => {
                      handleStateChange(val.value);
                      props.setFieldValue('state', val.value);
                    }}
                    data={statesData}
                  />
                </View>
                <View style={{flex: 1}}>
                  <Input
                    label="City"
                    name={'city'}
                    formikProps={props}
                    onChange={val => props.setFieldValue('city', val.value)}
                    select={{
                      isSelect: true,
                    }}
                    data={citiesData}
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
  imageContainer: {flexDirection: 'row', gap: 20, alignItems: 'center'},
  formContainer: {
    backgroundColor: COLORS.BACKGROUND_COLOR_LIGHT,
    flex: 1,
    padding: 15,
  },
});
export default UpdateProfile;
