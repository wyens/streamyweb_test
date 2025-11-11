import React, { useState } from 'react';
import { View, StyleSheet, Pressable, TVFocusGuideView, Text } from 'react-native';

type LogoutMenuTVProps = {
  onConfirm: () => void;
  onCancel: () => void;
  hasTVPreferredFocus?: boolean;
};

export const LogoutMenuTV: React.FC<LogoutMenuTVProps> = ({ onConfirm, onCancel, hasTVPreferredFocus = true }) => {
  const [yesFocused, setYesFocused] = useState(false);
  const [noFocused, setNoFocused] = useState(false);

  return (
    <View style={m.container}>
      <View style={m.panel}>
        <Text style={m.title}>Kijelentkezik a fiókból?</Text>

        <View style={m.row}>
          <Pressable
            focusable
            isTVSelectable
            hasTVPreferredFocus={hasTVPreferredFocus}
            onPress={onConfirm}
            onFocus={() => setYesFocused(true)}
            onBlur={() => setYesFocused(false)}
            style={[m.btn, yesFocused && m.btnFocused]}
          >
            <Text style={[m.btnText, yesFocused && m.btnTextFocused]}>Igen</Text>
          </Pressable>

          <Pressable
            focusable
            isTVSelectable
            hasTVPreferredFocus={!hasTVPreferredFocus}
            onPress={onCancel}
            onFocus={() => setNoFocused(true)}
            onBlur={() => setNoFocused(false)}
            style={[m.btn, noFocused && m.btnFocused]}
          >
            <Text style={[m.btnText, noFocused && m.btnTextFocused]}>Nem</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const m = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel: {
    minWidth: 460,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: '#1C1E2A',
    borderWidth: 1,
    borderColor: '#2C2F42',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 14,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
    justifyContent: 'space-around',
  },
  btn: {
    minWidth: 120,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#3A3E55',
    backgroundColor: '#222532',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnFocused: {
    borderColor: '#00C2FF',
    backgroundColor: '#2A2E41',
    transform: [{ scale: 1.06 }],
  },
  btnText: {
    color: '#D6DAE8',
    fontSize: 16,
    fontWeight: '600',
  },
  btnTextFocused: {
    color: '#FFFFFF',
  },
});
