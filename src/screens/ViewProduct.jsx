import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../utils/theme';
import { API_URL, MEDIA_URL } from '../utils/constants';
import Button from '../components/Button';
import { moneyFormat } from '../utils/formatter';
import { Camera, Dot, History, ShieldCheck, Star, Truck } from 'lucide-react-native';
import { ROUTES } from '../utils/routes';

const ViewProduct = ({ route, navigation }) => {
    const { item } = route.params
    const [selectedItem, setSelectedItem] = useState(1)
    const Feature = ({ data }) => (
        <View>
            {data.map((item, index) => (
                <View style={styles.viewStyle} key={index}>
                    <Dot color={COLORS.COLOR_BLACK} size={30} />
                    <Text style={[styles.titleStyle, {
                        fontSize: 14,
                        marginVertical: 5
                    }]}>{item.title}</Text>
                </View>
            ))}
        </View>
    )
    const Specification = ({ data }) => (
        <View>

            <View style={styles.viewStyle}>
                <Text style={[styles.textStyle]}>Product Dimensions:</Text>
                <Text style={[styles.textStyle]}>{data?.productDimensions}</Text>
            </View>
            <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>Color:</Text>
                <Text style={styles.textStyle}>{data?.color}</Text>
            </View>
            <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>Finish Type:</Text>
                <Text style={styles.textStyle}>{data?.finishType}</Text>
            </View>
        </View>
    )
    const Review = ({ data }) => (
        <View>
            {data.map((item) => (
                <View style={styles.reviewContainer}>
                    <View style={styles.viewStyle}>

                        <Image
                            source={{
                                uri: `${API_URL}/${item?.icon}`,
                            }}
                            style={styles.imageIcon}
                        />
                        <View>
                            <Text style={styles.textStyle}>{item.name}</Text>
                            <View style={styles.viewStyle} >
                                <Star size={12} color={'gold'} />
                                <Star size={12} color={'gold'} />
                                <Star size={12} color={'gold'} />
                                <Star size={12} color={'gold'} />
                                <Star size={12} color={'gold'} />
                            </View>
                        </View>

                    </View>
                    <Text >{item?.review}</Text>
                    <Text style={{ alignSelf: 'flex-end', marginTop: 5 }}>Reviewed on{' '}
                        <Text style={styles.textStyle}>{item?.date}</Text>
                    </Text>
                </View>
            ))}
        </View>
    )
    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: `${API_URL}/${item?.image}`,
                }}
                style={styles.imageStyle}
            />
            <ScrollView style={styles.detailsContainer}>
                <View style={styles.viewStyle}>
                    <View style={[styles.gap, { flex: 1 }]}>
                        <Text style={styles.titleStyle}>{item?.data?.name}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Button title={'−'} />
                        <Text style={[styles.titleStyle,
                        { paddingHorizontal: 10, minWidth: 50, textAlign: 'center' }]}>{item?.data?.qty}</Text>
                        <Button title={'+'} />
                    </View>

                </View>
                <Text>{item?.data?.details}</Text>
                <View style={[styles.viewStyle, styles.gap]}>
                    <Text style={[styles.titleStyle, { color: item.color }]}>{moneyFormat(item?.price)}</Text>
                    <Text style={{
                        color: COLORS.COLOR_RED,
                        textDecorationLine: 'line-through',
                        margin: 5
                    }}>{moneyFormat(item?.oldPrice)}</Text>
                </View>
                <View style={styles.line} />
                <View style={[styles.viewStyle, { justifyContent: 'space-around' }]}>
                    <View style={styles.align}>
                        <ShieldCheck color="red" size={30} />
                        <Text style={styles.subTitle}>{item?.data?.warranty} Year Warranty</Text>
                    </View>
                    <View style={styles.align}>
                        <Truck color="red" size={30} />
                        <Text style={styles.subTitle}> Free Delivery </Text>
                    </View>
                    <View style={styles.align}>
                        <History color="red" size={30} />
                        <Text style={styles.subTitle}>{item?.data?.replacementDuration} Days Replacement</Text>
                    </View>
                </View>
                <View style={styles.line} />
                <View style={[styles.viewStyle]}>
                    <TouchableOpacity onPress={() => setSelectedItem(1)}>
                        <Text style={[selectedItem == 1 && { color: COLORS.COLOR_RED }]}>Features</Text>
                        {selectedItem == 1 && <View style={styles.borderLine} />}
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedItem(2)}>
                        <Text style={[styles.detailBox, selectedItem == 2 && { color: COLORS.COLOR_RED }]}>Specifications</Text>
                        {selectedItem == 2 && <View style={styles.borderLine} />}

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setSelectedItem(3)}>
                        <Text style={[styles.detailBox, selectedItem == 3 && { color: COLORS.COLOR_RED }]}>Reviews</Text>
                        {selectedItem == 3 && <View style={styles.borderLine} />}
                    </TouchableOpacity>

                </View>
                {selectedItem == 1 && <Feature data={item?.data?.features} />}
                {selectedItem == 2 && <Specification data={item?.data?.specification} />}
                {selectedItem == 3 && <Review data={item?.data?.reviews} />}


            </ScrollView>
            <View style={{ margin: 10 }}>
                <Button title={'ADD TO CART'} onPress={() => navigation.navigate(ROUTES.cart)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleStyle: {
        color: COLORS.COLOR_BLACK,
        fontWeight: 'bold',
        fontSize: 20,
    },
    imageStyle: {
        width: '100%',
        height: 250,
        resizeMode: 'cover',
    },
    detailsContainer: {
        flex: 1,
        marginTop: 10,
        borderRadius: 30,
        padding: 20,
        backgroundColor: COLORS.COLOR_WHITE,
    },
    viewStyle: {
        flexDirection: 'row',
        alignContent: 'center',
    },
    qtyContainer: {
        paddingHorizontal: 10
    },
    gap: {
        marginVertical: 3
    },
    line: {
        marginVertical: 15,
        borderWidth: 0.2,
        borderColor: COLORS.COLOR_GRAY
    },
    align: {
        flex: 0.26,
        alignItems: 'center',
    },
    subTitle: {
        color: COLORS.COLOR_BLACK,
        fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'center'
    },
    detailBox: {
        paddingHorizontal: 10,
    },
    textStyle: {
        flex: 0.5,
        paddingVertical: 2,
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.COLOR_BLACK
    },
    borderLine: {
        marginVertical: 10,
        borderWidth: 2,
        borderColor: COLORS.COLOR_RED
    },
    reviewContainer: {
        borderWidth: 1,
        borderRadius: 10,
        minHeight: 100,
        padding: 10,
        borderColor: COLORS.COLOR_GRAY_LIGHT
    },
    imageIcon: {
        width: 40,
        height: 40,
        borderRadius: 30,
        marginRight: 10
    }
});
export default ViewProduct