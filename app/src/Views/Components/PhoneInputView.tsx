import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WM } from '../../assets/styles/paddings';
import { ViewItem, viewItemProps } from '../../Base/ViewItem';
import { controllers } from '../../Controllers/Controllers';
import { dictionary } from '../../Controllers/Dictionaries';
import { PhoneInput } from '../../Controllers/Pages/WelcomePage/PhoneInput';
import { ErrorInputView } from './ErrorInputView';
import { Input } from './InputItem';
import { Text } from './TextItem';

type phoneInputViewProps = viewItemProps & {
  placeholder?: string;
  title?: string;
  inputTitleStyle?: any;
};
class PhoneInputView extends ViewItem {
  props: phoneInputViewProps;
  constructor(props: phoneInputViewProps) {
    super(props);
    this.props = props;
  }
  get controller(): PhoneInput {
    return this.props.controller;
  }
  componentDidMount(): void {
    dictionary().countryNumbers.addListener('phoneInput', this.controller.onDictionaryLoaded)
  }
  render() {
    const { onChangeCountry, onChangePhone, error, editable, phoneRef, countryRef, countryVal, phoneVal} = this.controller;
    const { styles, placeholder = 'XX-XXX-XX-XX', title, inputTitleStyle } = this.props;
    return (
      <View style={[st.container, styles]}>
        {title && (
          <Text stylesText={inputTitleStyle} style="inputTitle">
            {title}
          </Text>
        )}
        <View style={st.wrap}>
          <View style={st.country}>
            <Input
              ref={(ref) => countryRef(ref)}
              type="selector"
              style="smallSelector"
              dictionary={dictionary().statephones}
              onChangeValue={onChangeCountry}
              defaultSelected={countryVal || controllers().location.country_code?.toLowerCase()}
              isPhoneNumber={true}
              pressable={editable}
            />
          </View>
          <View style={st.number}>
            <Input
              ref={(ref) => phoneRef(ref)}
              editable={editable}
              type="mask"
              keyboardType="number-pad"
              placeholder={placeholder}
              mask="99-999-99-99"
              onChangeValue={onChangePhone}
              defaultSelected={phoneVal}
            />
          </View>
        </View>
        <ErrorInputView error={error} />
      </View>
    );
  }
}

export { PhoneInputView };

const st = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: WM,
    zIndex: 10,
    flexWrap: 'wrap',
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
    flexWrap: 'wrap',
  },
  country: {
    width: '23%',
  },
  number: {
    width: '76%',
  },
});
