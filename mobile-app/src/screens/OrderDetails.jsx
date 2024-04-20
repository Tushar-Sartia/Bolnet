import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ROUTES } from '../utils/routes'
import { COLORS } from '../utils/theme'
import { getColor, moneyFormat } from '../utils/formatter'
import moment from 'moment'

const OrderDetails = ({ route, navigation }) => {
    const { order } = route?.params
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <View style={styles.viewStyle}>
                    <View>
                        <Text style={styles.textStyle}>Order ID: #{order.orderId}</Text>
                        <Text style={styles.contentStyle}>{order?.updated_at ? moment(order?.updated_at).format('DD MMM YYYY') :
                            moment(order?.orderDate).format('DD MMM YYYY')}</Text>
                    </View>
                    <View>
                        <Text style={[styles.textStyle, { color: getColor(order?.status) }]}>{order?.orderStatus}</Text>

                    </View>
                </View>

                <View style={styles.marginStyle}>
                    <Text style={styles.textStyle}>Delivered to</Text>
                    <Text style={styles.contentStyle}>{order?.shippingAddress}</Text>
                </View>
                <View style={[styles.marginStyle, styles.viewStyle]}>
                    <Text style={styles.textStyle}>Payment Method</Text>
                    <Text style={styles.contentStyle}>{order.paymentMethod}</Text>
                </View>
                <View style={styles.viewStyle}>
                    <Text style={styles.contentStyle}>Tracking Id : #{order.orderId}</Text>
                </View>
                <View style={styles.line} />
                {order?.items.map((item) => <View style={styles.viewStyle}>
                    <View>
                        <Text style={styles.textStyle}>{item?.productName} x {item?.orderedQuantity}</Text>
                        <Text style={styles.contentStyle}>({moneyFormat(item.price)})</Text>
                    </View>
                    <Text style={[styles.textStyle]}>{moneyFormat(item?.subtotal)}</Text>
                </View>)}
            </View>
            <View style={styles.line} />
            <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>Total Amount</Text>
                <Text style={styles.textStyle}>{moneyFormat(order?.totalPrice)}</Text>
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
        textTransform: 'capitalize',
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