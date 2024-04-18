import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, Pressable, Image, FlatList } from 'react-native';
import { COLORS } from '../utils/theme';
import { AtSign, ChevronRight, Phone } from 'lucide-react-native';
import { Seperator } from './Seprator';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';
import { API_URL, MEDIA_URL } from '../utils/constants';
import { DUMMY_PROFILE_IMAGE } from '../utils/images';
const SettingsLinks = ({ links }) => {
  const navigation = useNavigation();
  const { user } = useSelector(selectUser);
  const CustomLinks = ({ item }) => {
    const Icon = item.icon;
    return (
      <Pressable onPress={() => navigation.navigate(item.id)}>
        <View style={styles.linkContainer}>
          <Icon color={COLORS.COLOR_BLUE} />
          <Text style={styles.linkText}>{item.title}</Text>
          <ChevronRight color={COLORS.COLOR_GRAY} />
        </View>
      </Pressable>
    );
  };

  return (
    <>
      <View style={styles.profileContainer}>
        <View style={{ gap: 6 }}>
          <Text style={styles.name}>{user?.name}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Phone color={COLORS.COLOR_BLUE} size={15} />
            <Text style={styles.detail}>{user?.mobile}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <AtSign color={COLORS.COLOR_BLUE} size={15} />
            <Text style={styles.detail}>{user?.email}</Text>
          </View>
        </View>
        <Image
          source={
            user?.image
              ? {
                uri: API_URL
                  + '/' + user?.image,
              }
              : DUMMY_PROFILE_IMAGE
          }
          style={styles.imageContainer}
        />
      </View>
      <FlatList
        data={links}
        keyExtractor={itm => itm.id}
        renderItem={({ item }) => <CustomLinks item={item} />}
        ItemSeparatorComponent={<Seperator />}
      />
    </>
  );
};
const styles = StyleSheet.create({
  profileContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 30,
    backgroundColor: COLORS.COLOR_WHITE,
  },
  name: {
    fontWeight: 'bold',
    color: COLORS.COLOR_BLUE,
    fontSize: 21,
  },
  detail: {
    color: COLORS.COLOR_BLUE,
    marginLeft: 2
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: COLORS.PRIMARY_COLOR,
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    padding: 20,
  },
  linkText: {
    flex: 1,
    color: COLORS.COLOR_BLACK,
    fontSize: 18,
    textTransform: 'capitalize',
  },
});
export default SettingsLinks;
