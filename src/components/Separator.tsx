import * as React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface SeparatorProps {
  marginVertical: number;
}

const Separator: React.FC<SeparatorProps> = ({ marginVertical }) => {
  const separatorStyle: ViewStyle = {
    marginVertical,
  };

  return <View style={separatorStyle} />;
};

export default Separator;
