import { Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS } from '../utils/theme'
import Toast from 'react-native-toast-message';
import Button from '../components/Button';
import { THANK, THANKS } from '../utils/images';

const Feedback = ({ route, navigation }) => {
    const { order } = route?.params;
    const [rate, setRate] = useState(1)
    const [review, onChangeReview] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const rating = [1, 2, 3, 4, 5];
    const handleRate = (i) => {
        setRate(i)
        Toast.show({
            type: "success",
            text1: `Your Rating : ${i}`,
            position: "bottom",
        })
    }
    const handleSubmit = () => {
        const payload = {
            rate: rate,
            review: review
        }
        setModalVisible(!modalVisible)
        // navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <Text style={styles.textStyle}>How did we do?</Text>
                <View style={styles.viewStyle}>
                    {rating.map((i) => (
                        <Pressable style={styles.ratingBtn} onPress={() => handleRate(i)}>
                            <Text style={styles.textStyle}>{i}</Text>
                        </Pressable>
                    ))}
                </View>
                <View style={styles.viewStyle}>
                    <Text style={styles.contentStyle}>Your Rating is : {rate}/5</Text>
                </View>
                <View style={{ marginTop: 30 }}>
                    <Text style={styles.textStyle}>Care to share more about it?</Text>
                    <TextInput
                        placeholder='// Write your Review'
                        multiline
                        value={review}
                        onChangeText={onChangeReview}
                        style={styles.inputStyle}
                    />
                </View>
                <Button title="Submit" onPress={handleSubmit} />
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Image
                            source={THANK}
                            style={{
                                width: '100%',
                                height: '70%',
                                resizeMode: 'contain',
                                alignSelf: 'center'
                            }}
                        />
                        <Text style={[styles.textStyle, { textAlign: 'center' }]}>Thank you for your feedback! We truly appreciate your input.

                        </Text>

                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default Feedback

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        padding: 20,
        borderRadius: 10,
        backgroundColor: COLORS.COLOR_WHITE
    },
    viewStyle: {
        marginVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    textStyle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.COLOR_BLACK
    },
    contentStyle: {
        flexWrap: 'wrap',
        color: COLORS.COLOR_BLACK
    },
    ratingBtn: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputStyle: {
        borderWidth: 1,
        height: 250,
        marginVertical: 20,
        borderRadius: 10,
        padding: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3a3a3a',
        opacity: 0.9,
    },
    modalView: {
        width: '90%',
        height: '50%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

})