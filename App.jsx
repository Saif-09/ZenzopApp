
import { SafeAreaView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { useEffect } from 'react';
import { initializeCart } from './src/redux/slices/cartSlice';


function App() {
  useEffect(() => {
    store.dispatch(initializeCart());
  }, []);
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <AppNavigator />
      </View>
    </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'white'
  },
});

export default App;
