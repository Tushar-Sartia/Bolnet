import {FormikProps, useField} from 'formik';
import React, {ReactElement} from 'react';
import {
  ViewStyle,
  StyleSheet,
  Text,
  TextInput,
  View,
  StyleProp,
  TextStyle,
  TextInputProps,
} from 'react-native';
import {COLORS} from '../utils/theme';
import {Dropdown} from 'react-native-element-dropdown';

type Data = {
  value: string;
  label: string;
};

type inputType = {
  label?: string;
  info?: {
    required?: boolean;
    showLabel?: boolean;
  };
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  inputStyle?: StyleProp<TextStyle>;
  iCStyle?: StyleProp<TextStyle>;
  formikProps: FormikProps<any>;
  name: string;
  inputProps?: TextInputProps;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
  select?: {
    isSelect?: boolean;
    labelField?: string;
    valueField?: string;
  };
  search?: boolean;
  data?: Data[];
  onChange?: (e: any) => void;
};

const Input = ({
  label,
  formikProps,
  info,
  select = {
    isSelect: false,
    labelField: 'label',
    valueField: 'value',
  },
  search = true,
  data = [],
  ...props
}: inputType) => {
  const [field, meta] = useField(props.name);
  const isError = meta.touched && meta.error;

  return (
    <>
      <View style={[styles.container, props?.containerStyle]}>
        {label ? (
          <Text style={[styles.label, props?.labelStyle]}>
            {label}
            {info?.required ? '*' : ''}
          </Text>
        ) : null}
        {select.isSelect ? (
          <Dropdown
            style={[
              {
                height: 40,
                borderColor: isError ? COLORS.COLOR_RED : COLORS.COLOR_GRAY,
                padding: 8,
                paddingLeft: 20,
                borderWidth: 1,
                borderRadius: 8,
              },
              props.iCStyle,
            ]}
            data={data}
            search={search}
            maxHeight={300}
            labelField={select.labelField || 'label'}
            valueField={select.valueField || 'value'}
            placeholder={`Select ${label}`}
            searchPlaceholder="Search..."
            value={meta.value}
            // color: COLORS.COLOR_BLACK,
            placeholderStyle={{
              color: COLORS.COLOR_GRAY,
              fontSize: 14,
            }}
            itemTextStyle={{
              color: COLORS.COLOR_BLACK,
            }}
            selectedTextStyle={{
              color: COLORS.COLOR_BLACK,
            }}
            // placeholderStyle={{
            //   color: COLORS.black,
            // }}
            onChange={item => {
              formikProps.setFieldValue(
                props.name,
                select.valueField ? item[select.valueField] : item.value,
              );
              if (props.onChange) {
                props.onChange(item);
              }
            }}
          />
        ) : (
          <View
            style={[
              styles.inputContainer,
              {
                borderColor: isError ? COLORS.COLOR_RED : COLORS.COLOR_GRAY,
              },
              props.iCStyle,
            ]}>
            {props.leftIcon ? props.leftIcon : null}
            <TextInput
              placeholder={`Enter ${label}`}
              onChangeText={formikProps.handleChange(field.name)}
              onBlur={formikProps.handleBlur(field.name)}
              value={meta.value}
              style={[styles.input, props.inputStyle]}
              placeholderTextColor={COLORS.COLOR_GRAY}
              autoCapitalize={'none'}
              autoCorrect={false}
              {...props.inputProps}
            />
            {props.rightIcon ? props.rightIcon : null}
          </View>
        )}
        {isError ? <Text style={styles.error}>{meta.error}</Text> : null}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginVertical: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.COLOR_BLACK,
  },
  input: {
    flex: 1,
    marginHorizontal: 15,
    height: 40,
    color: COLORS.COLOR_BLACK,
  },
  label: {
    color: COLORS.COLOR_BLACK,
    opacity: 0.7,
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 16,
  },
  error: {
    color: COLORS.COLOR_RED,
    marginVertical: 4,
  },
});
export default Input;
