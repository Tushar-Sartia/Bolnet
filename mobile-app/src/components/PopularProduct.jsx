import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import { COLORS } from '../utils/theme';
import { API_URL, MEDIA_URL } from '../utils/constants';
import { ROUTES } from '../utils/routes';
import { moneyFormat } from '../utils/formatter';
const PopularProduct = ({ item, idx, navigation }) => {
   
    return (
        <View style={styles.container}>{console.log(item)}
            <TouchableOpacity
                style={{
                    backgroundColor: COLORS.BACKGROUND_COLOR_LIGHT,
                    width: '100%',
                    borderRadius: 8,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }} onPress={() => navigation.navigate('ViewProduct', { item: item })}>
                <View style={{ flex: 0.7, alignItems: 'center' }}>
                    <Image
                        source={{
                            uri: MEDIA_URL + item?.attachments,
                        }}
                        style={{
                            width: 80,
                            height: '80%',
                            resizeMode: 'cover',
                        }}
                    />
                </View>
                <View style={{ flex: 1, alignSelf: 'flex-start', marginTop: 5 }}>
                    <Text
                        style={styles.titleStyle}>
                        {item.product_name}
                    </Text>
                    <Text>{moneyFormat(item?.selling_price)}</Text>
                    <Text>Sold: {item?.unit_sold}</Text>
                </View>
                <View style={styles.cartBtn}>
                    <Text style={[styles.titleStyle, { color: COLORS.COLOR_WHITE }]}>Add to Cart</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        height: 100,
        margin: 10,
        flexDirection: 'row',
    },
    cartBtn: {
        flex:0.7,
        marginRight:10,
        height: 40,
        borderRadius: 10,
        backgroundColor: COLORS.PRIMARY_COLOR,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleStyle: {
        color:COLORS.COLOR_BLACK,
        fontWeight: 'bold',
        fontSize: 15,
        textTransform: 'capitalize'
    }
});
export default PopularProduct;
