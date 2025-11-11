
import { UpdateComponent } from '../../Base/UpdateComponent';
import { Dictionary } from '../../Controllers/Dictionaries/Dictionary';
import type {errorType, idType} from '../../DataTypes/BaseTypes';
import { makeid, replaceES5 } from '../../Helpers/actions';
import { UPDATE } from '../../Helpers/constants';

import type {selectorItemProps} from './SelectorItem';


type inputTypes = 'mask' | 'text' | 'password' | 'selector' | 'clicked';
type inputItemProps = {
  type?: inputTypes;
  id?: idType;
  title?: string;
  placeholder?: string;
  onChangeValue?: (input: Input | idType) => void;
  style?: 'smallSelector' | 'leftIcon' | 'selectorLeftIcon' | 'search' | 'topSearching';
  focus?: boolean;
  options?: Array<selectorItemProps>;
  defaultSelected?: string;
  zIndex?: number;
  dictionary?: Dictionary;
  editable?: boolean;
  pressable?: boolean;
  // keyboardType?: KeyboardTypeOptions;
  // returnKeyboardType?: ReturnKeyType;
  mask?: string;
  clearingInput?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  onPressInput?: () => void;
  icon?: {
    source: any;
    order: number;
  };
  inputTitleStyle?: any;
  containerStyles?: any;
  isTextArea?: boolean;
  isPhoneNumber?: boolean;
  require?: boolean;
  onSubmitEditing?: any;
  customInputStyle?:any;
  autoCapitalize?: any;
};

type inputItemState = {
  value: string;
  maskValue: string;
  error?: errorType;
  passwordShowed: boolean;
  dropdownShowed: boolean;
  clearButtonShowed: boolean;
};

class Input extends UpdateComponent {
  props: inputItemProps;
  state: inputItemState;
  ref: any;
  maskRef: any;
  maskLength: number;
  mask: string;
  id: idType;
  constructor(props: inputItemProps) {
    super(props);
    this.props = props;
    this.id = this.props.id || makeid(16);
    this.maskLength = props.mask ? props.mask.replace(/\D/g, '').length : 0;
    this.mask = props.mask ? replaceES5(props.mask, '9', 'X') : '';
    this.type = UPDATE.LANG;
    this.state = {
      value: '',
      passwordShowed: false,
      dropdownShowed: false,
      clearButtonShowed: false,
      maskValue: '',
    };
  }

  updateMe = () => {
    this.forceUpdate();
  };

  get dictionaryOptions() {
    return this.props.dictionary?.items;
  }

  setRef = (ref: any) => {
    this.ref = ref;
    if (this.props.focus) {
      this.focus();
    }
  };

  setMaskRef = (ref: any) => {
    this.maskRef = ref;
    if (this.props.focus && ref !== null) {
      this.maskFocus();
    }
  };

  maskFocus = () => {
    if (this.maskRef === null || this.props.editable === false) {
      return;
    }
    try {
      this.maskRef.focus();
    } catch (e) {
      // console.error('REF')
    }
  };

  focus = () => {
    if (this.ref === null) {
      return;
    }
    try {
      this.ref.focus();
    } catch (e) {
      // console.error('REF')
    }
  };
  onFocus = () => {
    // console.error("")
    if (this.props.clearingInput) {
      this.setClearingButtonVisible(true);
    }
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  };

  onBlur = () => {
    if (this.props.clearingInput) {
      this.setClearingButtonVisible(false);
    }
    if (this.props.onBlur) {
      this.props.onBlur();
    }
  };

  get value() {
    return this.state.value;
  }
  setValue = (value: string) => {
    this.setState({ value });
    if (this.props.onChangeValue) {
      this.props.onChangeValue(value);
    }
  };
  public clear = (value: string) => {
    this.setValue(value);
  };
  togglePasswordVisible = () => {
    this.setState({ passwordShowed: !this.state.passwordShowed });
  };

  setDropdownVisible = (dropdownShowed: boolean) => {
    this.setState({ dropdownShowed });
  };

  setClearingButtonVisible = (clearButtonShowed: boolean) => {
    this.setState({ clearButtonShowed });
  };

  onClearingButtonPress = () => {
    this.setValue('');
  };

  showDropdown = () => {
    this.setDropdownVisible(true);
  };
  hideDropdown = () => {
    this.setDropdownVisible(false);
  };
  toggleDropdown = () => {
    if (this.props.isPhoneNumber && this.props.pressable === false) {
      return;
    }
    this.setDropdownVisible(!this.state.dropdownShowed);
  };

  public chooseFromDropdonw = (item: selectorItemProps) => {
    this.hideDropdown();
    this.setValue(item.label);
    if (this.props.onChangeValue) {
      this.props.onChangeValue(item.value);
    }
  };
  onPressInputBox = () => {
    if (this.props.type === 'selector' && this.props.isPhoneNumber) {
      if (this.props.isPhoneNumber && this.props.pressable === false) {
        return;
      }
      this.showDropdown();
    } else if (this.props.type === 'selector') {
      if (this.props.pressable === false) {
        return;
      }
      this.showDropdown();
    } else if (this.props.type === 'mask') {
      this.maskFocus();
    } else if (this.props.type === 'clicked' && this.props.onPressInput) {
      this.props.onPressInput();
    }
  };
  maskChange = (value: string) => {
    if (value.length > this.maskLength) {
      return;
    }
    let mask = this.mask;
    for (let i = 0; i < value.length; i++) {
      const char = value[i];
      mask = mask.replace('X', char);
    }
    this.setState({
      maskValue: value,
      value: mask,
    });
    if (this.props.onChangeValue) {
      this.props.onChangeValue(value);
    }
  };
  setError(error: errorType) {
    this.setState({ error });
  }

  render() {
    // const { title, placeholder, style, options, zIndex, dictionary, keyboardType, defaultSelected, type, mask, editable, returnKeyboardType, onSubmitEditing, autoCapitalize } =
    //   this.props;
    // const { value, passwordShowed, dropdownShowed, clearButtonShowed, maskValue, error } = this.state;
    // const myOptions = dictionary ? dictionary.selectOptions : options;
    // const valuenow = value ? value : type === 'selector' ? myOptions?.find((o) => o.value === defaultSelected)?.label || '' : defaultSelected;
    // const iconnow = type === 'selector' ? myOptions?.find((o) => o.label === value)?.icon : undefined;
    // const findStyle = style ? styles[style] : {};
    // const findStyleBox = style ? styles[`${style}Box`] : {};
    // const inputTitleStyle = this.props.inputTitleStyle || {};
    // const containerStyles = this.props.containerStyles || {};
    // const isTextArea = this.props.isTextArea || false;
    // const textAreaStylesWrap = isTextArea ? styles.textAreaStylesWrap : {};
    // const textAreaStylesInput = isTextArea ? styles.textAreaStylesInput : {};
    // const isPhoneNumber = this.props.isPhoneNumber || false;
    // const phoneNumberTextInput = this.props.isPhoneNumber ? styles.m0 : {};
    // const customInputStyle = this.props.customInputStyle||{}
    // const autoCapital = autoCapitalize||"none"
    return (
        null
      // <View style={[styles.container, containerStyles, { zIndex: zIndex }]}>
      //   {title && (
      //     <Text stylesText={inputTitleStyle} style="inputTitle">
      //       {title}
      //     </Text>
      //   )}
      //   <Pressable style={[styles.inputBox, findStyleBox, textAreaStylesWrap, isPhoneNumber ? styles.row : {}]} onPress={this.onPressInputBox}>
      //     {isPhoneNumber && iconnow && (
      //       <FastImageComponent
      //         style={'leftInput'}
      //         source={{
      //           uri: `${AppSettings.endpoint}${iconnow}`,
      //           priority: FastImage.priority.normal,
      //         }}
      //         customStyle={styles.flagWrap}
      //         customImgStyle={styles.flagImage}
      //       />
      //     )}
      //     {type === 'selector' && isPhoneNumber && (
      //       <Icon
      //         customStyle={styles.wrapIconPhone}
      //         customImgStyle={styles.iconPhoneDrop}
      //         source={dropdownShowed ? INPUT_ICONS.dropup : INPUT_ICONS.dropdown}
      //         onPress={this.toggleDropdown}
      //       />
      //     )}
      //     {clearButtonShowed && (
      //       <Icon style={'input'} source={INPUT_ICONS.clearInput} customStyle={styles.additionalIcon} onPress={this.onClearingButtonPress} />
      //     )}
      //     {mask && (
      //       <TextInput ref={this.setMaskRef} keyboardType={keyboardType} style={styles.hiddenmask} value={maskValue} onChangeText={this.maskChange} />
      //     )}
      //     <TextInput
      //       pointerEvents={editable === false || type === 'selector' ? 'none' : undefined}
      //       keyboardType={keyboardType}
      //       ref={this.setRef}
      //       secureTextEntry={type === 'password' && !passwordShowed}
      //       editable={editable !== undefined ? editable : type !== 'selector' && this.props.type !== 'mask'}
      //       value={valuenow}
      //       onChangeText={this.setValue}
      //       style={[styles.input, findStyle, textAreaStylesInput, phoneNumberTextInput, customInputStyle]}
      //       placeholder={RW(placeholder || '') || placeholder}
      //       onFocus={this.onFocus}
      //       onBlur={this.onBlur}
      //       returnKeyType={returnKeyboardType}
      //       onSubmitEditing={onSubmitEditing}
      //       placeholderTextColor={inputPlaceholderColor}
      //       multiline={isTextArea}
      //       autoCapitalize={autoCapital}
      //     />
      //     {type === 'password' && (
      //       <Icon style="input" onPress={this.togglePasswordVisible} source={passwordShowed ? INPUT_ICONS.eye : INPUT_ICONS.eyeClose} />
      //     )}
      //     {type === 'selector' && !isPhoneNumber && (
      //       <Icon style="input" source={dropdownShowed ? INPUT_ICONS.dropup : INPUT_ICONS.dropdown} onPress={this.toggleDropdown} />
      //     )}
      //   </Pressable>
      //   {type === 'selector' && (
      //     <SelectorOptions defaultSelected={defaultSelected} options={myOptions} onChoose={this.chooseFromDropdonw} visible={dropdownShowed} />
      //   )}
      //   {error && <ErrorInputView error={error} />}
      // </View>
    );
  }
}

export { Input };

// const styles = StyleSheet.create({
//   container: {
//     // paddingHorizontal: 10
//     // zIndex: 999
//   },
//   inputBox: {
//     backgroundColor: inputBG,
//     height: inputHeight,
//     borderRadius: 10,
//     paddingLeft: 20,
//     justifyContent: 'center',
//     // border: "1px solid #EEEEEE"
//     // borderWidth: 1,
//     // borderColor: COLORS.BORDERCOLOR,
//   },
//   smallSelector: {},
//   smallSelectorBox: {
//     paddingLeft: 10,
//   },
//   input: {
//     width: '80%',
//     fontFamily: FONTS.regular,
//     fontSize: 12,
//     color: COLORS.FONTCOLOR,
//     height: inputHeight,
//     textAlignVertical: 'center',
//   },
//   touchable: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   mask: {},
//   maskBox: {},
//   hiddenmask: {
//     display: 'none',
//   },
//
//   leftIcon: {
//     marginLeft: WM,
//   },
//   leftIconBox: {},
//   additionalIcon: {},
//   selectorLeftIcon: {},
//   selectorLeftIconBox: {
//     paddingLeft: 30,
//   },
//
//   search: {},
//   searchBox: {},
//   textAreaStylesWrap: {
//     height: 100,
//   },
//   textAreaStylesInput: {
//     textAlignVertical: 'top',
//     width: '100%',
//   },
//   m0: {
//     marginLeft: 0,
//     paddingLeft: 0,
//   },
//   row: {
//     flexDirection: 'row',
//   },
//   wrapIconPhone: {
//     position: 'relative',
//     marginLeft: 30,
//   },
//   iconPhoneDrop: {
//     width: 25,
//     height: 25,
//     resizeMode: 'contain',
//   },
//   flagWrap: {
//     height: '100%',
//     width: '100%',
//   },
//   flagImage: {
//     height: 18,
//     width: 18,
//     resizeMode: 'contain',
//   },
//
//   topSearching: {
//     // backgroundColor: "red",
//     fontSize: 16,
//     width: Dimensions.get('screen').width*0.5,
//     textAlign: "center"
//   },
//   topSearchingBox: {
//     backgroundColor: "none",
//     height: 35,
//     paddingLeft: 0,
//     // width: '100%',
//     width: Dimensions.get('screen').width*0.5,
//   },
// });
