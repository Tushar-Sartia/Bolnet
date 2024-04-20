import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Alert,
  Pressable,
  FlatList,
} from 'react-native';
import { COLORS } from '../utils/theme';
import BottomTab from '../navigation/BottomTab';
import { ROUTES } from '../utils/routes';
import { moneyFormat } from '../utils/formatter';
import Button from '../components/Button';
import { Download, Minus, Plus, Upload } from 'lucide-react-native';
import Toast from 'react-native-toast-message';
import RNFetchBlob from 'rn-fetch-blob';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Seperator } from '../components/Seprator';
import ImagePicker from 'react-native-image-crop-picker';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';
import DocumentPicker from 'react-native-document-picker';
import { getInvestorBankDetails, investFormApi } from '../services/userApi';
import {
  PERMISSIONS,
  checkMultiple,
  openSettings,
  requestMultiple,
} from 'react-native-permissions';
import { API_URL } from '../utils/constants';

const InvestForm = () => {
  const { user } = useSelector(selectUser);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [width, setWidth] = useState(70);
  const [height, setHeight] = useState(70);
  const [singleFile, setSingleFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const sheetRef = useRef('');
  const [bankData, setBankData] = useState([])

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
  const handleInvestForm = async () => {
    setIsUploading(true)
    const bodyFormData = new FormData();
    bodyFormData.append('investor_id', user?.id);
    bodyFormData.append('screenshot', {
      name: new Date().getTime() + '.jpg',
      uri: selectedImage,
      type: 'image/jpeg',
    });
    bodyFormData.append('agreement', {
      name: new Date().getTime() + '.jpg',
      uri: singleFile,
      type: 'image/jpeg',
    });
    bodyFormData.append('points', quantity);
    bodyFormData.append('amount', quantity * bankData?.investment_amount || 0);
    console.log(bodyFormData)
    const res = await investFormApi(bodyFormData);
    console.log(res)
    if (res.status) {
      Toast.show({
        type: 'success',
        text2: res.message,
        position: 'bottom',
        visibilityTime: 3000,
      });
      sheetRef.current.close();
    } else {
      Toast.show({
        type: 'error',
        text2: res.message,
        position: 'bottom',
        visibilityTime: 3000,
      });
    }
    setIsUploading(false)
  };
  const data = [
    {
      text: 'Bank Name',
      value: bankData.bank_name
    },
    {
      text: 'Account Holder Name',
      value: bankData.account_holder_name
    },
    {
      text: 'Account Number',
      value: bankData.account_number,
    },
    {
      text: 'IFSC',
      value: bankData.ifsc,
    },
  ];
  const fetchInvestorBankDetails = async () => {

    const data = await getInvestorBankDetails()
    if (data.status) {
      setBankData(data.data[0])
    }
    else {
      console.log('Error:')
    }
  }
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
  const downloadPdf = async () => {
    // const apiUrl = `https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf`;
    const apiUrl = API_URL + '/agreement.pdf';
    const response = await RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: RNFetchBlob.fs.dirs.DownloadDir + '/agreement.pdf',
        description: 'Downloading PDF file',
      },
    }).fetch('GET', apiUrl);
    if (response) {
      Toast.show({
        type: 'success',
        text2: 'Pdf Downloaded Successfully',
        position: 'bottom',
        visibilityTime: 3000,
      });
    }
  };
  const RenderItem = ({ item }) => {
    return (
      <View>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}>
          <View>
            <Text
              style={{
                fontSize: 18,
                fontWeight: 'bold',
                color: COLORS.COLOR_GRAY,
              }}>
              {item.text}
            </Text>
          </View>
          <Text style={{ fontSize: 14, color: COLORS.COLOR_BLACK, }}>{item.value}</Text>
        </View>
      </View>
    );
  };
  const selectFile = async () => {
    askMediPermission();
    const statuses = await checkMultiple([PERMISSIONS.ANDROID.CAMERA]);
    if (statuses[PERMISSIONS.ANDROID.CAMERA] === 'granted') {
      try {
        const res = await DocumentPicker.pick({
          type: [DocumentPicker.types.allFiles],
        });
        setSingleFile(res[0]?.uri);
      } catch (err) {
        setSingleFile(null);
        if (DocumentPicker.isCancel(err)) {
          console.log('cancelled');
        }
      }
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
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Please upload Signed Agreement',
    });
  };
  useEffect(() => {
    fetchInvestorBankDetails()
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <View style={styles.detailContainer}>
          <Text style={styles.titleText}>Investment Amount</Text>
          <Text style={[styles.titleText, styles.valueText]}>
            {moneyFormat(quantity * bankData?.investment_amount || 0)}
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.titleText}>Lock in period</Text>
          <Text style={[styles.titleText, styles.valueText]}>
            {bankData?.lock_in_period} months
          </Text>
        </View>
        <View style={{ marginVertical: 20, paddingHorizontal: 10 }}>
          <Text style={styles.titleText}>Quantity</Text>
          <View style={styles.detailContainer}>
            <Button
              onPress={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}>
              <Minus color={COLORS.COLOR_WHITE} />
            </Button>
            <Text style={[styles.titleText, styles.valueText]}>{quantity}</Text>
            <Button onPress={() => setQuantity(prev => prev + 1)}>
              <Plus color={COLORS.COLOR_WHITE} />
            </Button>
          </View>
        </View>
        <View style={{ padding: 10, gap: 10 }}>
          <Text>
            Note:- you will get 2% return of the daily sale till the lockin
            period
          </Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Button
              title={'Download Agreement'}
              onPress={() => downloadPdf()}
              rightIcon={<Download color={COLORS.COLOR_WHITE} />}
              btnContainerStyle={{ flex: 1 }}
              textStyle={{ fontSize: 14 }}
            />
            <Button
              title={'Upload Signed Agreement'}
              onPress={selectFile}
              rightIcon={<Upload color={COLORS.COLOR_WHITE} />}
              btnContainerStyle={{ flex: 1 }}
              textStyle={{ fontSize: 14 }}
              color="secondary"
            />
          </View>
          {singleFile && (
            <Text
              style={{
                textAlign: 'right',
                marginTop: -10,
                color: 'green',
                fontWeight: 900,
              }}>
              (Uploaded Successfully)
            </Text>
          )}
        </View>
      </ScrollView>

      <ScrollView>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <RBSheet
            ref={sheetRef}
            height={400}
            openDuration={250}
            customStyles={{
              container: {
                justifyContent: 'center',
                alignItems: 'center',
              },
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: COLORS.BACKGROUND_COLOR_LIGHT,
              }}>
              <FlatList
                data={data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <RenderItem item={item} />}
                ItemSeparatorComponent={<Seperator />}
              />
              <Pressable onPress={() => handleImagePicker()}>
                {({ pressed }) => (
                  <View
                    style={{
                      transform: [
                        {
                          scale: pressed ? 0.98 : 1,
                        },
                      ],
                    }}>
                    <View>
                      <Text
                        style={{
                          textAlign: 'center',
                          color: 'red',
                          fontWeight: 500,
                          marginBottom: 3,
                          marginRight: 5,
                        }}>
                        (Pay on above bank details and upload screenshot)
                      </Text>
                      <Text style={styles.btn}>Upload Screenshot 📑</Text>
                      <Text
                        style={{
                          marginLeft: 20,
                          marginRight: 20,
                          color: 'green',
                          marginTop: -10,
                          textAlign: 'right',
                          fontWeight: 900,
                        }}>
                        {selectedImage && '(Uploaded successfully)'}
                      </Text>
                    </View>
                  </View>
                )}
              </Pressable>
              <View style={{ margin: 20 }}>
                <Button
                  isLoading={isUploading}
                  title={'Invest Now'}
                  onPress={() => handleInvestForm()}
                  color={selectedImage ? 'secondary' : 'primary'}
                />
              </View>
            </View>
          </RBSheet>
        </View>
      </ScrollView>

      <View style={{ padding: 10 }}>
        <Button
          title={'Upload'}
          onPress={() => (singleFile ? sheetRef.current.open() : showToast())}
          color={singleFile ? 'secondary' : 'primary'}
        />
      </View>
      <BottomTab active={ROUTES.invest} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_COLOR_LIGHT,
  },
  detailContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  titleText: {
    color: COLORS.COLOR_BLACK,
    fontSize: 18,
  },
  valueText: { fontWeight: 'bold' },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
  btn: {
    height: 100,
    marginLeft: 20,
    textAlign: 'center',
    fontSize: 16,
    width: 350,
    marginBottom: 10,
    borderRadius: 5,
    paddingTop: 40,
    fontWeight: 'bold',
    color: 'gray',
    backgroundColor: '#D3D3D3',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default InvestForm;
