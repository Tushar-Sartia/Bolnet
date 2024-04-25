import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Alert,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../../utils/theme';
import { Formik } from 'formik';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useDispatch, useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import { selectUser, setUser } from '../../features/auth/authSlice';
import { getNominee, getNomineeDetails, updateNomineDetails } from '../../services/userApi';
import Toast from 'react-native-toast-message';
import { CameraIcon } from 'lucide-react-native';
import { nomineeSchema } from '../../utils/validationSchema';
import { API_URL, MEDIA_URL } from '../../utils/constants';
import {
  PERMISSIONS,
  checkMultiple,
  openSettings,
  requestMultiple,
} from 'react-native-permissions';
import { DUMMY_PROFILE_IMAGE } from '../../utils/images';
import { useIsFocused } from '@react-navigation/native';

const Nominee = () => {
  const { user } = useSelector(selectUser);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [width, setWidth] = useState(70);
  const [height, setHeight] = useState(70);
  const [nomineeDetail, setNomineeDetails] = useState([])
  const [loader, setLoader] = useState(false)
  const isFocused = useIsFocused()
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

  const handleUpdateNominee = async values => {
    const bodyFormData = new FormData();
    bodyFormData.append('created_by', user?.id);
    bodyFormData.append('nominee', values.nominee);
    if (selectedImage) {
      bodyFormData.append('attachments', {
        name: new Date().getTime() + '.jpg',
        uri: selectedImage,
        type: 'image/jpeg',
      });
    }
    else {
      return Toast.show({
        type: 'error',
        text2: 'Please Upload New Image',
        position: 'bottom',
        visibilityTime: 3000,
      });
    }
    const res = await updateNomineDetails(bodyFormData);
    if (res.status) {
      Toast.show({
        type: 'success',
        text2: res.message,
        position: 'bottom',
        visibilityTime: 3000,
      });
      setSelectedImage(null);
    } else {
      Toast.show({
        type: 'error',
        text2: res.message,
        position: 'bottom',
        visibilityTime: 3000,
      });
    }
    getAllNominee()
  };
  const handleImagePicker = async () => {
    askMediPermission();
    const statuses = await checkMultiple([PERMISSIONS.ANDROID.CAMERA]);
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
          }
        })
        .catch(error => {
          console.log(error);
        });
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
          { text: 'OK', onPress: openSettings },
        ],
      );
    }
  };
  const getAllNominee = async () => {
    setLoader(true)
    const res = await getNomineeDetails(user?.id)
    if (res.status) {
      setNomineeDetails(res?.data)
    }
    setLoader(false)
  }
  useEffect(() => {
    getAllNominee()
  }, [isFocused])
  return (
    <>
      {loader ?
        <ActivityIndicator
          style={{ paddingLeft: 15, paddingRight: 15 }}
          size="large"
          color="red"
        />
        : <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
          style={styles.container}>
          <SafeAreaView style={styles.container}>
            <Formik
              initialValues={{
                nominee: nomineeDetail?.nominee || '',
                nominee_image: nomineeDetail?.attachments || null,
              }}
              validationSchema={nomineeSchema}
              onSubmit={handleUpdateNominee}>
              {props => (
                <>
                  <View style={styles.formContainer}>
                    <Input label="Nominee Name" name={'nominee'} formikProps={props} />
                    <View style={{ marginBottom: 20, alignItems: 'center' }}>
                      <TouchableOpacity onPress={handleImagePicker}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                            marginVertical: 20,
                            alignItems: 'center',
                            left: 30
                          }}>
                          <Image
                            source={
                              selectedImage
                                ? { uri: selectedImage }
                                : nomineeDetail?.attachments
                                  ? { uri: `${MEDIA_URL}/${nomineeDetail?.attachments}` }
                                  : DUMMY_PROFILE_IMAGE
                            }
                            style={styles.image}
                          />
                          <View style={styles.iconStyle}>
                            <CameraIcon size={28} color={COLORS.COLOR_WHITE} />
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.margins}>
                    <Button
                      title={'update nominee'}
                      isLoading={isSubmitting}
                      onPress={props.handleSubmit}
                    />
                  </View>
                </>
              )}
            </Formik>
          </SafeAreaView>
        </ScrollView>
      }
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
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    borderRadius: 100,
    borderWidth: 5,
    borderColor: COLORS.COLOR_RED
  },
  button: {
    textAlign: 'center',
    backgroundColor: '#D3D3D3',
    padding: 50,
    fontSize: 16,
    borderRadius: 5,
    marginTop: 20,
  },
  iconStyle: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.COLOR_RED,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    top: 60, right: 50
  },
  margins: {
    marginHorizontal: 20,
    marginBottom: 50
  }
});
export default Nominee;
