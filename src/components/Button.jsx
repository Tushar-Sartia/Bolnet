import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLORS } from '../utils/theme';

const Button = ({
  title,
  children,
  onPress,
  color = 'primary',
  leftIcon,
  rightIcon,
  isLoading = false,
  ...props
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={isLoading}
      style={props.btnContainerStyle}>
      {({ pressed }) => (
        <View
          style={[
            styles.btn,
            {
              transform: [
                {
                  scale: pressed ? 0.9 : 1,
                },
              ],
              backgroundColor:
                isLoading && color === 'primary'
                  ? COLORS.PRIMARY_LIGHT_COLOR
                  : isLoading && color === 'secondary'
                    ? COLORS.SECONDARY_LIGHT_COLOR
                    : color === 'primary'
                      ? COLORS.PRIMARY_COLOR
                      : COLORS.SECONDARY_COLOR,
            },
            props.btnStyle,
          ]}>
          {leftIcon ? leftIcon : null}

          {children ? (
            children
          ) : (
            <Text style={[styles.btn_text, props.textStyle]}>
              {isLoading ? (
                <ActivityIndicator
                  color={
                    color === 'primary'
                      ? COLORS.PRIMARY_COLOR
                      : COLORS.SECONDARY_COLOR
                  }
                />
              ) : (
                title
              )}
            </Text>
          )}
          {rightIcon ? rightIcon : null}
        </View>
      )}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 6,
    paddingVertical:8,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn_text: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 18,
    marginHorizontal: 10,
    color: COLORS.COLOR_WHITE,
  },
  btn_icon: {
    marginHorizontal: 10,
  },
});
export default Button;
