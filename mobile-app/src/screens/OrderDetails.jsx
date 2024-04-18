import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ROUTES } from '../utils/routes'
import { COLORS } from '../utils/theme'
import { getColor, moneyFormat } from '../utils/formatter'

const OrderDetails = ({ route, navigation }) => {
    const { order } = route?.params
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <View style={styles.viewStyle}>
                    <View>
                        <Text style={styles.textStyle}>#{order.orderId}</Text>
                        <Text style={styles.contentStyle}>{order.updatedOn}</Text>
                    </View>
                    <View>
                        <Text style={[styles.textStyle, { color: getColor(order?.status) }]}>{order?.status}</Text>

                    </View>
                </View>

                <View style={styles.marginStyle}>
                    <Text style={styles.textStyle}>Delivered to</Text>
                    <Text style={styles.contentStyle}>{order.address}</Text>
                </View>
                <View style={styles.marginStyle}>
                    <Text style={styles.textStyle}>Payment Method</Text>
                    <Text style={styles.contentStyle}>{order.paymentMode}</Text>
                </View>
                <Text style={styles.contentStyle}>Tracking Id : #0987PQ12</Text>
                 <Text style={styles.contentStyle}>Expected Delivery By: 12-04-2024</Text>

                <View style={styles.line} />
                <View style={styles.viewStyle}>
                    <View>
                        <Text style={styles.textStyle}>{order.title} x {order.qty}</Text>
                        <Text style={styles.contentStyle}>({moneyFormat(order.price)})</Text>
                    </View>
                    <Text style={[styles.textStyle]}>{moneyFormat(order?.price * (order?.qty || 1))}</Text>
                </View>
            </View>
            <View style={styles.line} />
            <View style={styles.viewStyle}>
                <View>
                    <Text style={styles.contentStyle}>Item Total</Text>
                    <Text style={styles.textStyle}>Total Amount</Text>
                </View>
                <View>
                    <Text style={[styles.contentStyle]}>{moneyFormat(order?.price * (order?.qty || 1))}</Text>
                    <Text style={[styles.textStyle]}>{moneyFormat(order?.totalPrice)}</Text>

                </View>
            </View>

        </View>
    )
}

export default OrderDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        padding: 20,
        borderRadius: 10,
        backgroundColor: COLORS.COLOR_WHITE
    },
    viewStyle: {
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    textStyle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.COLOR_BLACK
    },
    contentStyle: {
        flexWrap: 'wrap',
        color: COLORS.COLOR_BLACK
    },
    marginStyle: {
        marginTop: 10
    },
    line: {
        marginVertical: 20,
        borderWidth: 0.5,
        borderColor: COLORS.COLOR_GRAY_LIGHT
    }
})