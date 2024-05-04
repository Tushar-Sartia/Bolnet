import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { COLORS } from '../../utils/theme';
import HeaderBg from '../../components/HeaderBg';
import DashWidgets from '../../components/DashWidgets';
import Button from '../../components/Button';
import { moneyFormat } from '../../utils/formatter';
import { format } from 'date-fns';
import { Seperator } from '../../components/Seprator';
import { Formik } from 'formik';
import Input from '../../components/Input';
import { amountSchema } from '../../utils/validationSchema';
import { getWalletDataApi, withdrawAmountApi } from '../../services/userApi';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/auth/authSlice';
import Toast from 'react-native-toast-message';
import moment from 'moment';

const Wallet = () => {
  const { user } = useSelector(selectUser);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [walletData, setWalletData] = useState([]);
  const [modalVisible, setModalVisible] = useState('');
  const [walletBalance, setWalletBalance] = useState(user?.balance || 0);
  const [totalEarning, setTotalEarning] = useState([])
  const handleAmountSubmit = async value => {
    setLoading(true);
    const wData = {
      investor_id: user.id,
      amount: value.amount,
    };
    const res = await withdrawAmountApi(wData);
    if (res.status) {
      Toast.show({
        type: 'success',
        text2: res.message,
        position: 'bottom',
        visibilityTime: 3000,
      });
      setModalVisible(!modalVisible);
    } else {
      Toast.show({
        type: 'error',
        text2: res.message,
        position: 'bottom',
        visibilityTime: 3000,
      });
    }
    setLoading(false);
    setRefresh(!refresh);
  };

  const fetchWalletData = async () => {
    const res = await getWalletDataApi(user?.id);
    if (res.status) {
      setWalletBalance(res?.data?.balance || 0);
      setTotalEarning(res?.data?.total_earning || 0);
      setWalletData(res?.data?.results);
    }
  };
  useEffect(() => {
    fetchWalletData();
  }, [refresh]);

  const RenderItem = ({ item }) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 10,
        }}>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color:
                item.status === 'deposit_request'
                  ? COLORS.COLOR_BLACK
                  : item.status === 'withdraw_request'
                    ? COLORS.COLOR_RED
                    : COLORS.COLOR_GREEN,
            }}>
            {moneyFormat(item.amount)}
          </Text>
          <Text style={{ fontSize: 14 }}>
            {item.status === 'deposit_request'
              ? 'Deposit'
              : item.status === 'withdraw_request'
                ? 'Withdraw'
                : 'Investment Return'}
          </Text>
        </View>
        <Text style={{ fontSize: 14 }}>{moment(item.created_at).format('DD/MM/YYYY')}</Text>
      </View>
    );
  };

  return (
    <>
      {loading &&
        <View style={styles.loader}>
          <ActivityIndicator color={COLORS.COLOR_RED} size={35} />
        </View>
      }
      <SafeAreaView style={styles.container}>
        <View style={{ flex: 0.8 }}>
          <HeaderBg />
          <DashWidgets
            title={'balance'}
            value={walletBalance}
            color={COLORS.COLOR_GREEN}
          />

          <Button
            title={'Withdraw'}
            onPress={() => setModalVisible(true)}
            btnContainerStyle={{ padding: 20 }}
          />
        </View>
        <View style={{ paddingHorizontal: 20, flex: 1 }}>
          <Text style={styles.titleText}>Investment History</Text>
          <FlatList
            data={walletData}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => <RenderItem item={item} />}
            ItemSeparatorComponent={<Seperator />}
            showsVerticalScrollIndicator={false}

          />
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Formik
                initialValues={{
                  amount: '',
                }}
                validationSchema={amountSchema}
                onSubmit={handleAmountSubmit}>
                {props => (
                  <View>
                    <Input
                      label="Withdraw Amount"
                      name={'amount'}
                      formikProps={props}
                      inputProps={{
                        keyboardType: 'numeric',
                      }}
                    />
                    <View style={{ marginTop: 10, flexDirection: 'row', gap: 10 }}>
                      <Pressable onPress={() => setModalVisible(!modalVisible)}>
                        {({ pressed }) => (
                          <View
                            style={{
                              transform: [
                                {
                                  scale: pressed ? 0.98 : 1,
                                },
                              ],
                            }}>
                            <Text style={styles.buttonText}>Cancel</Text>
                          </View>
                        )}
                      </Pressable>

                      <Pressable onPress={props.handleSubmit} disabled={loading}>
                        {({ pressed }) => (
                          <View
                            style={{
                              transform: [
                                {
                                  scale: pressed ? 0.98 : 1,
                                },
                              ],
                            }}>
                            <Text style={styles.buttonText}>
                              {loading ? (
                                <ActivityIndicator
                                  style={{ paddingLeft: 15, paddingRight: 15 }}
                                  size="small"
                                  color="white"
                                  animating={loading}
                                />
                              ) : (
                                'Submit'
                              )}
                            </Text>
                          </View>
                        )}
                      </Pressable>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND_COLOR_LIGHT,
  },
  titleText: {
    color: COLORS.COLOR_BLACK,
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'transparent',
  },
  modalView: {
    width: 250,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    // alignItems: 'center',
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
  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    borderRadius: 5,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 25,
    paddingRight: 25,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'red',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.COLOR_RED,
  }
});
export default Wallet;
