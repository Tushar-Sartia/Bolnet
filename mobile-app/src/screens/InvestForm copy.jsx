import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { COLORS } from '../utils/theme';
import BottomTab from '../navigation/BottomTab';
import { ROUTES } from '../utils/routes';
import { moneyFormat } from '../utils/formatter';
import Button from '../components/Button';
import { Download, Minus, Plus, Upload } from 'lucide-react-native';
import Toast from 'react-native-toast-message';
import RNFetchBlob from 'rn-fetch-blob';
const InvestForm = ({ navigation }) => {
  const [minAmount, setAmount] = useState(100000);
  const [quantity, setQuantity] = useState(1);

  // const getAgreementUrl = async () => {
  //   const res = await exportInCsv();
  //   if (res.status) {
  //     setCsvFile(res.csvFileUrl);
  //     setMessage(res.message);
  //   } else {
  //     setCsvFile('');
  //   }
  // };

  const downloadPdf = async (dataUrl) => {
    const apiUrl = `http://192.168.1.37:8080/Dummy-Name.pdf`; // Adjust the URL accordingly
    const response = await RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: RNFetchBlob.fs.dirs.DownloadDir + '/Dummy-Name.pdf',
        description: 'Downloading PDF file',
      },
    }).fetch('GET', apiUrl);
    if (response) {
      Toast.show({
        type: 'success',
        text1: message,
        position: 'top',
        visibilityTime: 3000,
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <View style={styles.detailContainer}>
          <Text style={styles.titleText}>Investment Amount</Text>
          <Text style={[styles.titleText, styles.valueText]}>
            {moneyFormat(quantity * minAmount)}
          </Text>
        </View>
        <View style={styles.detailContainer}>
          <Text style={styles.titleText}>Lock in period</Text>
          <Text style={[styles.titleText, styles.valueText]}>72 months</Text>
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
              rightIcon={<Upload color={COLORS.COLOR_WHITE} />}
              btnContainerStyle={{ flex: 1 }}
              textStyle={{ fontSize: 14 }}
              color="secondary"
            />
          </View>
        </View>
      </ScrollView>
      <View style={{ padding: 10 }}>
        <Button title={'Invest Now'} color="secondary" />
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
});
export default InvestForm;
