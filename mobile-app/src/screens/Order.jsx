import { ActivityIndicator, FlatList, Image, Pressable, RefreshControl, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../utils/theme';
import { Package } from 'lucide-react-native';
import { getColor, moneyFormat } from '../utils/formatter';
import { API_URL, MEDIA_URL } from '../utils/constants';
import Button from '../components/Button';
import BottomTab from '../navigation/BottomTab';
import { ROUTES } from '../utils/routes';
import { getAllOrders } from '../services/userApi';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';
import Toast from 'react-native-toast-message';
import moment from 'moment';

const Order = ({ navigation }) => {
    const { user } = useSelector(selectUser)
    const [order, setOrders] = useState([])
    const [loader, setLoader] = useState(false)
    const isFocused = useIsFocused()

    const getmyOrders = async () => {
        setLoader(true)
        const res = await getAllOrders(user?.id)
        if (res?.status) {
            setOrders(res?.data)
        }
        else {
            setOrders([])
            Toast.show({
                type: "error",
                text2: res?.message,
                position: "bottom",
            })
        }
        setLoader(false)
    }
    useEffect(() => {
        getmyOrders()
    }, [isFocused])
    const MyOrders = ({ item, index }) => (
        <View style={styles.itemContainer} key={index}>
            <Text style={styles.textStyle}>Order ID: <Text style={{ color: COLORS.COLOR_RED }}>#{item?.orderId}</Text></Text>
            <View style={styles.line} />
            <View style={styles.viewStyle}>
                <View style={[styles.statusContainer, { borderColor: getColor(item?.orderStatus) }]}>
                    <Package size={20} color={getColor(item?.orderStatus)} />
                    <Text style={[styles.textStyle,
                    { color: getColor(item.orderStatus) }]}>{' '}{item?.orderStatus}</Text>

                </View>
                <View style={{ flex: 0.6, alignItems: 'flex-end' }}>
                    <Text style={[styles.dateStyle, { color: COLORS.COLOR_GRAY }]}>{item?.orderStatus == 'In-Transit' ? "Ordered On" : "Updated On"}
                    </Text>
                    <Text style={styles.dateStyle}>{item?.orderStatus == 'In-Transit' ?
                        moment(item?.orderDate).format('DD/MM/YYYY')
                        : moment(item?.updatedOn).format('DD/MM/YYYY')}</Text>

                </View>
            </View>
            <View style={styles.line} />
            {item?.items?.map((data) => (
                <View style={styles.viewStyle}>
                    <View style={[styles.viewStyle, { flex: 0.5 }]}>
                        <Image
                            source={{
                                uri: MEDIA_URL + data?.attachments,
                            }}
                            style={{
                                width: 80,
                                height: 60,
                                marginVertical: 5,
                                resizeMode: 'cover',
                            }}
                        />
                        <View>
                            <Text style={styles.textStyle} numberOfLines={2}>{' '}
                                {data?.product_name}</Text>
                            <Text >{' '}{moneyFormat(data?.price)}/p</Text>
                        </View>
                    </View>
                    <View style={{ flex: 0.4, alignItems: 'flex-end' }}>
                        <Text style={styles.dateStyle}>Qty:{data?.orderedQuantity}</Text>
                        <Text style={[styles.textStyle, { color: COLORS.COLOR_GREEN }]}>
                            {moneyFormat(data?.subtotal)}
                        </Text>
                    </View>
                </View>
            ))}
            <View style={[styles.margins, styles.viewStyle, { justifyContent: 'space-around' }]}>
                <Pressable style={[styles.cartBtn, { backgroundColor: COLORS.COLOR_WHITE }]}
                    onPress={() => navigation.navigate(ROUTES.orderDetails, {
                        order: item
                    })}>
                    <Text style={[styles.dateStyle, { color: COLORS.COLOR_RED }]}>View Order</Text>
                </Pressable>
                {item.status == 'Delivered' && <Pressable style={styles.cartBtn} onPress={() => {
                    navigation.navigate(ROUTES.feedback, { order: item })
                }}>
                    <Text style={[styles.dateStyle, { color: COLORS.COLOR_WHITE }]}>Give Feedback</Text>
                </Pressable>}
            </View>
        </View>
    )
    return (
        <>
            {loader &&
                <View style={styles.loader}>
                    <ActivityIndicator color={COLORS.COLOR_RED} size={35} />
                </View>
            }
            <FlatList
                data={order}
                keyExtractor={itm => itm.id}
                renderItem={({ item, index }) => <MyOrders item={item} index={index} />}
                refreshControl={
                    <RefreshControl onRefresh={getmyOrders} />
                }
            />
            <BottomTab active={ROUTES.profile} />
        </>
    )
}

export default Order

const styles = StyleSheet.create({
    itemContainer: {
        borderWidth: 0.5,
        borderRadius: 12,
        padding: 15,
        paddingBottom: 0,
        margin: 10,
        marginBottom: 0,
        borderColor: COLORS.COLOR_GRAY,
    },
    line: {
        borderWidth: 0.2,
        marginVertical: 15,
        borderColor: COLORS.COLOR_GRAY
    },
    textStyle: {
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.COLOR_BLACK
    },
    viewStyle: {
        flexDirection: 'row',
        justifyContent: "space-between"
    },
    statusContainer: {
        borderWidth: 1,
        padding: 5,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center'
    },
    dateStyle: {
        fontWeight: '500',
        color: COLORS.COLOR_BLACK
    },
    margins: {
        marginVertical: 20
    },
    cartBtn: {
        flex: 1,
        marginHorizontal: 5,
        height: 40,
        borderRadius: 10,
        borderColor: COLORS.COLOR_RED,
        borderWidth: 2,
        backgroundColor: COLORS.PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }
})