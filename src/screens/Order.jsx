import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../utils/theme';
import { Package } from 'lucide-react-native';
import { getColor, moneyFormat } from '../utils/formatter';
import { API_URL } from '../utils/constants';
import Button from '../components/Button';
import BottomTab from '../navigation/BottomTab';
import { ROUTES } from '../utils/routes';

const Order = ({ navigation }) => {
    const productData = [
        {
            id: 1,
            orderId: '2233BOL21',
            status: 'In-Transit',
            updatedOn: '12-04-2024',
            title: 'Chimney',
            qty: 1,
            price: 12000,
            totalPrice: 12000,
            paymentMode: 'Paid by PhonePe',
            image: 'public/uploads/products/images/PRODUCTS PHOTO 54_page-0017(1).jpg',
            address: '1663,Mayur vihar Colony, Sector-15, Noida'
        },
        {
            id: 2,
            orderId: '2233BOL22',
            status: 'Delivered',
            updatedOn: '12-04-2024',
            title: 'Tabel Fan',
            qty: 2,
            price: 5000,
            totalPrice: 10000,
            paymentMode: 'Cash on Delivery',
            image: 'public/uploads/products/images/PRODUCTS PHOTO 54_page-0047(1).jpg',
            address: '1663,Mayur vihar Colony, Sector-15, Noida'
        }
    ];

    const MyOrders = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.textStyle}>Order ID: <Text style={{ color: COLORS.COLOR_RED }}>{item.orderId}</Text></Text>
            <View style={styles.line} />
            <View style={styles.viewStyle}>
                <View style={[styles.statusContainer, { borderColor: getColor(item?.status) }]}>
                    <Package size={20} color={getColor(item?.status)} />
                    <Text style={[styles.textStyle, { color: getColor(item.status) }]}>{' '}{item?.status}</Text>

                </View>
                <View style={{ flex: 0.6, alignItems: 'flex-end' }}>
                    <Text style={[styles.dateStyle, { color: COLORS.COLOR_GRAY }]}>Status Updated On:
                    </Text>
                    <Text style={styles.dateStyle}>{item?.updatedOn}</Text>

                </View>
            </View>
            <View style={styles.line} />
            <View style={styles.viewStyle}>
                <View style={[styles.viewStyle, { flex: 0.5 }]}>
                    <Image
                        source={{
                            uri: API_URL + '/' + item?.image,
                        }}
                        style={{
                            width: 80,
                            height: 60,
                            resizeMode: 'contain',
                        }}
                    />
                    <View style={{}}>
                        <Text style={styles.textStyle} numberOfLines={2}>{' '}
                            {item?.title}</Text>
                        <Text >{' '}{moneyFormat(item?.price)}/p</Text>
                    </View>
                </View>
                <View style={{ flex: 0.4, alignItems: 'flex-end' }}>
                    <Text style={styles.dateStyle}>Qty:{item.qty}</Text>
                    <Text style={[styles.textStyle, { color: COLORS.COLOR_GREEN }]}>
                        {moneyFormat(item?.totalPrice)}
                    </Text>
                </View>
            </View>
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
            <FlatList
                data={productData}
                keyExtractor={itm => itm.id}
                renderItem={({ item, index }) => <MyOrders item={item} idx={index} />}
                refreshControl={<></>
                    // <RefreshControl refreshing={isLoading} onRefresh={fetchAllProducts} />
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
})