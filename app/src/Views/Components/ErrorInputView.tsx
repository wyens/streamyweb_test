import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TEXTCOLORS } from '../../assets/styles/colors';
import { XXB } from '../../assets/styles/paddings';
import { errorType } from '../../DataTypes/BaseTypes';
import { Text } from './TextItem';

type errorInputProps = {
  error: errorType;
};

class ErrorInputView extends React.Component {
  props: errorInputProps;
  constructor(props: errorInputProps) {
    super(props);
    this.props = props;
  }
  render() {
    const { error } = this.props;
    return (
      <>
        {error && error.isError && (
          <View style={styles.errorBox}>
            <Text style="inputTitle" color={styles.error.color} center>
              {error.errorMessage}
            </Text>
          </View>
        )}
      </>
    );
  }
}

export { ErrorInputView };

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "red",
    // minHeight: 50,
    // width: '100%'
  },
  errorBox: {
    width: '100%',
    // paddingVertical: WS,
    // backgroundColor: "red",
    justifyContent: 'center',
    alignItems: 'center',
    height: XXB,
  },
  error: {
    color: TEXTCOLORS.cancel,
  },
});
