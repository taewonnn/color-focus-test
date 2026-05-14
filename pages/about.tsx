import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@granite-js/react-native';

// Redirect to home since this page is not used in this app
export default function AboutScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.navigate('/');
  }, [navigation]);

  return <View />;
}
