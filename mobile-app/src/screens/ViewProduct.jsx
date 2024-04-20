import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../utils/theme';
import { API_URL, MEDIA_URL } from '../utils/constants';
import Button from '../components/Button';
import { moneyFormat } from '../utils/formatter';
import { Camera, Dot, History, ShieldCheck, Star, Truck } from 'lucide-react-native';
import { ROUTES } from '../utils/routes';
import { addToCart, getProductDetails, getProductReviews, getProductSpecification } from '../services/userApi';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import { selectUser } from '../features/auth/authSlice';
import { useSelector } from 'react-redux';
const ViewProduct = ({ route, navigation }) => {
    const { item } = route.params
    const { user } = useSelector(selectUser)
    const [selectedItem, setSelectedItem] = useState(1)
    const [productDetail, setProductDetail] = useState([])
    const [specifications, setSpecifications] = useState([])
    const [reviews, setReviews] = useState([])
    const [quantity, setQuantity] = useState(1)
    const [loading, setLoading] = useState(false)
    const Feature = ({ data }) => (
        <View style={styles.viewStyle}>
            <Dot color={COLORS.COLOR_BLACK} size={30} />
            <Text style={[styles.titleStyle, {
                fontSize: 14,
                marginVertical: 5
            }]}>{data}</Text>
        </View>
    )
    const Specification = ({ data }) => (
        <View>
            <View style={styles.viewStyle}>
                <Text style={styles.textStyle}>Product Dimensions:</Text>
                <Text style={styles.textStyle}>{data?.productDimensions}</Text>
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
    const RatingStars = ({ rating }) => {
        return (
            <View style={styles.viewStyle}>
                {Array.from({ length: rating }, (_, index) => (
                    <Star key={index} size={12} color={COLORS.COLOR_GOLD} />
                ))}
            </View>
        );
    };
    const Review = ({ data }) => (
        <View style={{ marginBottom: 50 }}>
            {data?.map((item, index) => (
                <View style={styles.reviewContainer} key={index}>
                    <View style={styles.viewStyle}>
                        <Image
                            source={{
                                uri: `${API_URL}/${item?.attachments}`,
                            }}
                            style={styles.imageIcon}
                        />
                        <View>
                            <Text style={styles.textStyle}>{item?.name}</Text>
                            <View style={styles.viewStyle} >
                                <RatingStars rating={item?.rating} />
                            </View>
                        </View>
                    </View>
                    <Text >{item?.reviews}</Text>
                    <Text style={{ alignSelf: 'flex-end', marginTop: 5 }}>Reviewed on{' '}
                        <Text style={styles.textStyle}>{moment(item?.created_at).format('DD MMMM YYYY')}</Text>
                    </Text>
                </View>
            ))}
        </View>
    )
    const getProduct = async () => {
        setLoading(true)
        const productId = item.id
        const res = await getProductDetails(productId)
        if (res?.status) {
            setProductDetail(res?.data[0])
        }
        else {
            Toast.show({
                type: "error",
                text2: res?.message,
                position: "bottom",
            })
        }
        setLoading(false)
    }
    const getSpecification = async () => {
        const productId = item?.id
        const res = await getProductSpecification(productId)
        if (res?.status) {
            setSpecifications(res?.data[0])
        }
        else {
            Toast.show({
                type: "error",
                text2: res.message,
                position: "bottom",
            })
        }
    }
    const getReviews = async () => {
        const productId = item.id
        const res = await getProductReviews(productId)
        if (res?.status) {
            setReviews(res?.data)
        }
        else {
            Toast.show({
                type: "error",
                text2: res?.message,
                position: "bottom",
            })
        }
    }
    useEffect(() => {
        getProduct()
        getSpecification()
        getReviews()
    }, [])
    const handleAddItems = (qty) => {
        if (qty < (productDetail?.quantity || 1)) {
            setQuantity(quantity + 1)
        }
    }
    const handleMinus = (qty) => {
        if (quantity > 1)
            setQuantity(quantity - 1)
    }
    const handleCartButton = async() => {
        const cartItem = {
            productId: item.id,
            quantity: quantity,
            userId: user?.id
        }
        const res= await addToCart(cartItem)
        if(res.status){
            Toast.show({
                type: "success",
                text1: res.message,
                position: "bottom",
            })
        }
        else{
            Toast.show({
                type: "error",
                text2: res.message,
                position: "bottom",
            })
        }
        //  navigation.navigate(ROUTES.cart)
    }
    return (
        <>
            {loading ?
                <View style={styles.loader}>
                    <ActivityIndicator size={'large'} color={COLORS.COLOR_RED} />
                </View> :
                <View style={styles.container}>{console.log(productDetail)}
                    <Image
                        source={{
                            uri: `${API_URL}/${productDetail?.attachments}`,
                        }}
                        style={styles.imageStyle}
                    />
                    <ScrollView style={styles.detailsContainer}>
                        <View style={styles.viewStyle}>
                            <View style={[styles.gap, { flex: 1 }]}>
                                <Text style={[styles.titleStyle, { textTransform: 'capitalize' }]}>{productDetail?.productName}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Button title={'−'} onPress={() => handleMinus()} />
                                <Text style={[styles.titleStyle,
                                { paddingHorizontal: 10, minWidth: 50, textAlign: 'center' }]}>{quantity}</Text>
                                <Button title={'+'} onPress={() => handleAddItems(quantity)} />
                            </View>

                        </View>

                        <View style={[styles.viewStyle, styles.gap]}>
                            <Text style={[styles.titleStyle]}>{moneyFormat(productDetail?.price)}</Text>
                            <Text style={{
                                color: COLORS.COLOR_RED,
                                textDecorationLine: 'line-through',
                                margin: 5
                            }}>{moneyFormat(productDetail?.oldPrice)}</Text>
                        </View>
                        <Text>Items Left : {productDetail?.quantity}</Text>
                        <Text style={{ textTransform: 'capitalize' }}>{productDetail?.details}</Text>
                        <View style={styles.line} />
                        <View style={[styles.viewStyle, { justifyContent: 'space-around' }]}>
                            <View style={styles.align}>
                                <ShieldCheck color={COLORS.COLOR_RED} size={30} />
                                <Text style={styles.subTitle}>{productDetail?.warrantyUpto} Year Warranty</Text>
                            </View>
                            {productDetail?.freeDelivery == 1 && <View style={styles.align}>
                                <Truck color={COLORS.COLOR_RED} size={30} />
                                <Text style={styles.subTitle}>{' Free Delivery'} </Text>
                            </View>}
                            <View style={styles.align}>
                                <History color={COLORS.COLOR_RED} size={30} />
                                <Text style={styles.subTitle}>{productDetail?.replacementUpto} Days Replacement</Text>
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
                        {selectedItem == 1 && <Feature data={productDetail?.features} />}
                        {selectedItem == 2 && <Specification data={specifications} />}
                        {selectedItem == 3 && <Review data={reviews} />}
                    </ScrollView>
                    <View style={{ margin: 10 }}>
                        <Button title={'ADD TO CART'} onPress={handleCartButton} />
                    </View>
                </View>
            }
        </>
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
        borderColor: COLORS.COLOR_GRAY_LIGHT,
        backgroundColor: COLORS.COLOR_WHITE,
        marginVertical: 5
    },
    imageIcon: {
        width: 40,
        height: 40,
        borderRadius: 30,
        marginRight: 10,
        borderWidth: 1,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default ViewProduct