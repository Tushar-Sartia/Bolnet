import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../utils/theme'
import { moneyFormat } from '../utils/formatter'
import { API_URL, MEDIA_URL } from '../utils/constants'
import Button from '../components/Button'
import BottomTab from '../navigation/BottomTab'
import { ROUTES } from '../utils/routes'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/auth/authSlice'
import Toast from 'react-native-toast-message'
import { getCartItems, placeOrder, removeItemFromCart, updateCartQty } from '../services/userApi'
import { Trash2 } from 'lucide-react-native'
import { useIsFocused } from '@react-navigation/native'

const Cart = ({ navigation }) => {
    const { user } = useSelector(selectUser)
    const [cartItem, setCartItem] = useState([])
    const [quantity, setQuantity] = useState(1)
    const isFocused = useIsFocused()
    const [shippingAddress, setShippingAddress] = useState('Sartia Global ,noida sector-6,266234');
    const [paymentMethod, setPaymentMethod] = useState('cash');
    const getCart = async () => {
        const res = await getCartItems(user?.id)
        if (res?.status) {
            setCartItem(res)
        }
        else {
            setCartItem([])
        }
    }
    const handleRemoveItem = async (item) => {
        const body = {
            orderId: item?.id,
            userId: user?.id,
            productId: item?.productId
        }
        const data = await removeItemFromCart(body)
        if (data?.status) {
            Toast.show({
                type: "success",
                text2: data?.message,
                position: "bottom",
            })
        }
        getCart()
    }
    const updateQty = async (qty, productId) => {
        const body = {
            userId: user?.id,
            productId: productId,
            quantity: qty
        }
        const res = await updateCartQty(body)
        if (res?.status) {
            getCart()
        }
        else {
            Toast.show({
                type: "error",
                text2: res.message,
                position: "bottom",
            })
        }
    }
    const handleAddItems = (qty, id, totalQty) => {
        if (qty < totalQty) {
            updateQty(qty + 1, id)
            setQuantity(quantity + 1)
        }
    }
    const handleMinus = (qty, id) => {
        if (qty > 1) {
            updateQty(qty - 1, id)
            setQuantity(qty - 1)
        }
    }
    const Product = ({ item, index, }) => (
        <View style={styles.container}>
            <View style={styles.item} >
                <View style={{ flexDirection: 'row', flex: 0.7, height: '100%', paddingHorizontal: 5 }}>
                    <Image
                        source={{
                            uri: MEDIA_URL + item?.attachments,
                        }}
                        style={{
                            width: 100,
                            height: 80,
                            flex: 0.4,
                            alignSelf: 'center'
                        }}
                    />
                    <View style={[styles.details, { flex: 0.6, marginTop: 5 }]}>
                        <Text numberOfLines={2}
                            style={[styles.titleStyle]}>
                            {item?.product_name}
                        </Text>
                        <Text style={[styles.detailTextStyle]}>{moneyFormat(item?.selling_price)}</Text>
                        <Text style={[styles.detailTextStyle]}>Total Qty: {item?.totalQuantity}</Text>
                    </View>
                </View>
                <View style={{ flex: 0.3, height: '100%', marginTop: 20, marginRight: 5 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end' }}>
                        <Button title={'−'} onPress={() => handleMinus(item?.quantity, item?.productId)} />
                        <Text style={styles.qtyStyle}>{item?.quantity}</Text>
                        <Button title={'+'} onPress={() => handleAddItems(item?.quantity, item.productId, item?.totalQuantity)} />
                    </View>
                    <TouchableOpacity onPress={() => handleRemoveItem(item)}
                        style={styles.removeBtn}>
                        <Text style={styles.removeBtnText}>Remove </Text>
                        <Trash2 size={20} color={COLORS.COLOR_RED} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
    const Amount = ({ title, price, color, size }) => {
        return (
            <View style={styles.priceContainer}>
                <Text style={[styles.qtyStyle, { fontSize: size ? size : 15 }]}>{title}</Text>
                <Text style={[styles.qtyStyle,
                { color: color ? color : COLORS.COLOR_BLACK, fontSize: size ? size : 15 }]}>{price}</Text>
            </View>
        )
    }
    const handleProceed = async () => {
        const productsToAdd = cartItem?.data?.map((item) => ({
            price: item?.selling_price,
            quantity: item?.quantity,
            productId: item?.productId,
            productName: item?.product_name
        }));

        const payload = {
            userId: user?.id,
            items: productsToAdd,
            totalPrice: cartItem?.totalPrice,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod
        }
        const placeOrderRes = await placeOrder(payload)
        if (placeOrderRes?.status) {
            Toast.show({
                type: "success",
                text1: placeOrderRes?.message,
                position: "bottom",
            })
            getCart()
        }
        else {
            Toast.show({
                type: "error",
                text1: placeOrderRes?.message,
                position: "bottom",
            })
        }
    }
    useEffect(() => {
        getCart()
    }, [isFocused])
    return (
        <View style={styles.screenContainer}>
            <ScrollView style={styles.mainContainer}>
                <View>
                    {cartItem?.data?.length > 0 ?
                        cartItem?.data?.map((item, index) => (
                            <Product item={item} idx={index} />
                        )) :
                        <Text style={[styles.qtyStyle, { marginVertical: 50 }]}>No item in cart</Text>
                    }
                    <View style={styles.btnStyles}>
                        <Amount title={'Sub Total'} price={moneyFormat(cartItem?.totalPrice || 0)}
                            color={COLORS.COLOR_GREEN} />
                        <Amount title={'Total Items In Cart'} price={cartItem?.totalItems || 0} />
                        <View style={{ marginVertical: 15 }} >
                            <Amount title={'Total'} price={moneyFormat(cartItem?.totalPrice || 0)} size={18} />
                        </View>
                        <Button title={'PROCEED'} onPress={handleProceed} />
                    </View>
                </View>
            </ScrollView>
            <BottomTab active={ROUTES.cart} />
        </View>
    )
}

export default Cart
const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
    },
    mainContainer: {
        flex: 1,
    },
    container: {
        height: 100,
        margin: 10,
        paddingHorizontal: 0,
        flexDirection: 'row',
    },
    cartBtn: {
        height: 40,
        borderRadius: 10,
        width: 100,
        backgroundColor: COLORS.PRIMARY_COLOR,
        alignItems: 'center', justifyContent: 'center'
    },
    titleStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.COLOR_BLACK,
        textTransform: 'capitalize'
    },
    detailTextStyle: {
        fontSize: 14,
    },
    item: {
        backgroundColor: COLORS.BACKGROUND_COLOR_LIGHT,
        flex: 1,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    qtyStyle: {
        paddingHorizontal: 10,
        minWidth: 30,
        textAlign: 'center',
        color: COLORS.COLOR_BLACK,
        fontWeight: 'bold',
        fontSize: 15,
    },
    btnStyles: {
        margin: 20
    },
    priceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    details: {
        marginLeft: 10,

    },
    removeBtn: {
        margin: 20,
        alignItems: 'flex-end',
        flexDirection: 'row'
    },
    removeBtnText: {
        color: COLORS.COLOR_RED
    }
});