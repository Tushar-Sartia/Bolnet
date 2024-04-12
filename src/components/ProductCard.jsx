import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { COLORS } from '../utils/theme';
import { MEDIA_URL } from '../utils/constants';
import Button from './Button';

const ProductCard = ({ item, idx, navigation }) => {
  const updatedImagePath = item?.image?.replace('public/', '');

  return (
    <View style={[styles.container, { marginTop: idx % 2 !== 0 ? 30 : 0 }]}>
      <Pressable onPress={() => { }}>
        {({ pressed }) => (
          <View
            style={{
              transform: [{ scale: pressed ? 0.98 : 1 }],
            }}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: MEDIA_URL + '/' + updatedImagePath }}
                style={styles.image}
              />
              <View style={styles.detailsContainer}>
                <Text style={styles.name}>{item.name}</Text>
                <Text numberOfLines={1}>{item.details}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <Button title={'Add to Cart'} textStyle={styles.buttonText} />
              </View>
            </View>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  imageContainer: {
    backgroundColor: COLORS.BACKGROUND_COLOR_LIGHT,
    width: '100%',
    borderRadius: 8,
    paddingHorizontal:5,
    borderWidth: 1,
    elevation:10,
    overflow: 'hidden',
    alignItems: 'center', 
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  detailsContainer: {
    paddingHorizontal: 10,
    alignSelf:'flex-start'
  },
  name: {
    color: COLORS.COLOR_GREEN,
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonContainer: {
    alignSelf: 'center',
    marginVertical: 10,
    marginBottom:20,
  },
  buttonText: {
    fontSize: 12,
    paddingVertical: 3,
  },
});

export default ProductCard;
