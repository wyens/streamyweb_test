import React from 'react';
import { Animated, Image, Pressable, StyleSheet, View } from 'react-native';
import { BASE_ICONS } from '../../Constants/icons.ts';
import { Text } from '../Components/TextItem.tsx';

type Props = {
  opacity: Animated.AnimatedInterpolation<number>;
  onBack?: () => void;
  title?: string;
  autoFocus?: boolean;
};

export const VideoChannels: React.FC<Props> = ({ opacity, onBack, title }) => {
  const [focused, setFocused] = React.useState(false);

  return (
    <Animated.View style={[styles.container, focused && styles.backButtonFocused, { opacity }]}>
      <Pressable
        onPress={onBack}
        focusable={true}
        isTVSelectable={true}
        hasTVPreferredFocus={focused}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[styles.wrap]}
      >
        <View style={[]}>
          <Image source={BASE_ICONS.burger} style={styles.burgerIcon} />
        </View>

        {!!title && (
          <Text numberOfLines={1} stylesText={styles.title}>
            {title}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 155,
    paddingLeft: 15,
    paddingRight: 5,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: 'rgba(0,0,0,0.6)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 0,
    paddingRight: 15,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  backButtonFocused: {
    borderColor: '#fff',
    backgroundColor: 'rgba(0,0,0, 0.9)',
  },
  burgerIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: '#fff',
  },
  title: {
    marginLeft: 15,
    color: '#fff',
    fontSize: 14,
  },
});
