import React from 'react';
import { StyleSheet, View, Text, Image, Pressable } from 'react-native';
import { COLORS } from '../utils/theme';
import { API_URL, MEDIA_URL } from '../utils/constants';
import Button from './Button';
import { ROUTES } from '../utils/routes';
import { moneyFormat } from '../utils/formatter';

const ProductCard = ({ item, idx, navigation }) => {

  return (
    <View style={[styles.container, { marginTop: idx % 2 !== 0 ? 30 : 0 }]}>
      <Pressable onPress={() => { navigation.navigate(ROUTES.viewProduct, { item }) }}>
        {({ pressed }) => (
          <View
            style={{
              transform: [{ scale: pressed ? 0.98 : 1 }],
            }}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: API_URL + '/' + item?.productImage }}
                style={styles.image}
              />
              <View style={styles.detailsContainer}>
                <Text style={styles.name} numberOfLines={1}>{item.productName}</Text>
                <View style={styles.nameContainer}>
                  <Text style={[styles.name]} numberOfLines={1}>{moneyFormat(item.price).split('.00')}</Text>
                  <Text style={[styles.oldPrice, { textDecorationLine: 'line-through' }]}>{moneyFormat(item?.oldPrice).split('.00')}</Text>
                  {item?.discount &&
                    <Text style={[styles.oldPrice]} numberOfLines={2}>({item?.discount}% off)</Text>
                  }</View>
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
    padding: 5,
    elevation: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 5
  },
  detailsContainer: {
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
  },
  name: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: 16,
    color: COLORS.COLOR_BLACK
  },
  buttonContainer: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 12,
    paddingVertical: 3,
  },
  oldPrice: {
    fontSize: 13,
    marginTop: 3,
    color: COLORS.COLOR_RED
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 3,
    flexWrap: 'wrap'
  }
});

export default ProductCard;
