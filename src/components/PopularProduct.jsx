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
    const updatedImagePath = item?.image?.replace('public/', '');
    const handleProductImageClick = item => {
        navigation.navigate(ROUTES.viewProduct);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{
                    backgroundColor: COLORS.BACKGROUND_COLOR_LIGHT,
                    width: '100%',
                    borderRadius: 8,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }} onPress={() => navigation.navigate('ViewProduct', { item: item })}>
                <Image
                    source={{
                        uri: MEDIA_URL + '/' + updatedImagePath,
                    }}
                    style={{
                        width: 80,
                        height: 60,
                        resizeMode: 'contain',
                    }}
                />
                <View>
                    <Text
                        style={{
                            color: COLORS.BACKGROUND_COLOR_DARK,
                            fontWeight: 'bold',
                            fontSize: 18,
                        }}>
                        {item.title}
                    </Text>
                    <Text style={[styles.titleStyle, { color: item?.color }]}>{moneyFormat(item?.price)}</Text>
                </View>
                <View style={styles.cartBtn}>
                    <Text style={[styles.titleStyle,]}>Add to Cart</Text>
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
    }
});
export default PopularProduct;
