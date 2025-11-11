import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { inputHeight } from '../../assets/styles/paddings';
import { idType } from '../../DataTypes/BaseTypes';
import { Icon } from './Icon';
import { Text } from './TextItem';

export type selectorItemProps = {
  label: string;
  value: idType;
  icon?: any;
  selected?: boolean;
  onPress?: (item: selectorItemProps) => void;
};

class SelectorItem extends React.Component {
  props: selectorItemProps;
  constructor(props: selectorItemProps) {
    super(props);
    this.props = props;
  }
  onPressItem = () => {
    if (this.props.onPress) {
      this.props.onPress(this.props);
    }
  };
  render() {
    const { label, selected, icon } = this.props;
    const selectedStyle = selected ? styles.selected : {};
    return (
      <Pressable style={[styles.container, selectedStyle]} onPress={this.onPressItem}>
        {icon && <Icon style="selectorItem" source={icon} />}
        <Text>{label}</Text>
      </Pressable>
    );
  }
}

export { SelectorItem };

const styles = StyleSheet.create({
  container: {
    height: inputHeight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: 'rgba(255,255,255,.1)',
  },
});
