import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { MultiInputBox } from './MultiInputBox';

type multiInputProps = {
  length: number;
  onChangeValue: (value: string) => void;
  focus?: boolean;
};

type multiInputState = {
  value: string;
};

class MultiInput extends React.Component {
  props: multiInputProps;
  state: multiInputState;
  _ref: any;
  constructor(props: multiInputProps) {
    super(props);
    this.props = props;
    this.state = {
      value: '',
    };
  }

  get ref() {
    return this._ref;
  }
  setRef = (ref: any) => {
    this._ref = ref;
    if (this.props.focus) {
      this.focus();
    }
  };
  focus = () => {
    if (this._ref === null) {
      return;
    }
    try {
      this.ref.focus();
    } catch (e) {
      // console.error('REF')
    }
  };
  onPressInputBox = () => {
    try {
      this._ref.focus();
    } catch (e) {
      console.error('ERROR onPressInputBox');
    }
  };
  onChangeText = (value: string) => {
    this.setState({ value });
    this.props.onChangeValue(value);
  };

  render() {
    const { length } = this.props;
    const { value } = this.state;
    const inputs = [];
    for (let i = 0; i < length; i++) {
      inputs.push({
        char: value.charAt(i),
        onPress: this.onPressInputBox,
      });
    }
    return (
      <View style={styles.container}>
        <Pressable>
          <View style={styles.hiddenContainer}>
            <TextInput ref={this.setRef} keyboardType={'number-pad'} onChangeText={this.onChangeText} maxLength={length} />
          </View>
          <View style={styles.myInputs}>
            {inputs.map((e, index) => {
              return <MultiInputBox key={index} {...e} />;
            })}
          </View>
        </Pressable>
      </View>
    );
  }
}

export { MultiInput };

const styles = StyleSheet.create({
  container: {},
  hiddenContainer: {
    height: 0,
    width: 0,
    overflow: 'hidden',
  },
  myInputs: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
