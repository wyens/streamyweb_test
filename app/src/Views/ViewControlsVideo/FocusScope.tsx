import { TVFocusGuideView } from 'react-native';
import React from 'react';

export const FocusScope: React.FC<{ disabled?: boolean; children: React.ReactNode, style?: any }> = ({ disabled, children, style = {} }) => (
  <TVFocusGuideView key={new Date().getTime()} focusable={disabled ? false : undefined} pointerEvents="box-none" style={[style]}>
    {children}
  </TVFocusGuideView>
);
