import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as StoreProvider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import RootNavigation from './src/navigation/RootNavigation';
import {persistor, store} from './src/features/store';
import {COLORS} from './src/utils/theme';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          backgroundColor={COLORS.PRIMARY_COLOR}
          barStyle={'light-content'}
        />
        <NavigationContainer>
          <RootNavigation />
        </NavigationContainer>
        <Toast />
      </PersistGate>
    </StoreProvider>
  );
};
export default App;
