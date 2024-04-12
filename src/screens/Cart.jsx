import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../utils/theme'
import { moneyFormat } from '../utils/formatter'
import { API_URL } from '../utils/constants'
import Button from '../components/Button'
import BottomTab from '../navigation/BottomTab'
import { ROUTES } from '../utils/routes'

const Cart = ({ navigation }) => {
    const productData = [
        {
            id: 1,
            title: 'Chimney',
            price: 12000,
            oldPrice: 18000,
            image: 'public/uploads/products/images/PRODUCTS PHOTO 54_page-0017(1).jpg',
            color: COLORS.COLOR_GREEN,
        },
        {
            id: 2,
            title: 'Table Fan White',
            price: 2000,
            oldPrice: 1000,
            image: 'public/uploads/products/images/PRODUCTS PHOTO 54_page-0047(1).jpg',
            color: COLORS.COLOR_GREEN,
        },
    ];
    const Product = ({ item, index, }) => (
        <View style={styles.container}>
            <View
                style={styles.item} >
                <View style={{ flexDirection: 'row', flex: 0.5 }}>
                    <Image
                        source={{
                            uri: API_URL + '/' + item?.image,
                        }}
                        style={{
                            width: 100,
                            height: 80,
                        }}
                    />
                    <View>
                        <Text numberOfLines={2}
                            style={[styles.titleStyle, { color: COLORS.COLOR_BLACK }]}>
                            {item?.title}
                        </Text>
                        <Text style={[styles.titleStyle, { color: item?.color }]}>{moneyFormat(item?.price)}</Text>
                    </View>
                </View>
                <View style={{ marginHorizontal: 10, alignSelf: 'flex-start' }}>
                    <Text style={styles.titleStyle}>Add to Cart</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                        <Button title={'−'} />
                        <Text style={styles.qtyStyle}>1</Text>
                        <Button title={'+'} />
                    </View>
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
    return (
        <View style={styles.mainContainer}>
            <FlatList
                data={productData}
                keyExtractor={itm => itm.id}
                renderItem={({ item, index }) => <Product item={item} idx={index} />}
                refreshControl={<></>
                    // <RefreshControl refreshing={isLoading} onRefresh={fetchAllProducts} />
                }
            />
            <View style={styles.btnStyles}>
                <Amount title={'Sub Total'} price={moneyFormat(1700)} />
                <Amount title={'Discount'} price={moneyFormat(-300)} color={COLORS.COLOR_GREEN} />
                <View style={{ marginVertical: 15 }} >
                    <Amount title={'Total'} price={moneyFormat(1700)} size={18} />
                </View>
                <Button title={'PROCEED'} />
            </View>
        <BottomTab active={ROUTES.cart} />

        </View>
    )
}

export default Cart
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    container: {
        flex: 1,
        height: 100,
        margin: 15,
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
        color: COLORS.COLOR_WHITE,
        fontWeight: 'bold',
        fontSize: 15,
    },
    item: {
        backgroundColor: COLORS.BACKGROUND_COLOR_LIGHT,
        width: '100%',
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
    }
});