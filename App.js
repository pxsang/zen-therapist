import React from 'react';
import {StatusBar, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {Host} from 'react-native-portalize';
import getStore from './src/redux';
import {PersistGate} from 'redux-persist/integration/react';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import TrackPlayer from 'react-native-track-player';
import Navigation from './src/navigation';
import {myTheme} from './custom-theme';
import AppProvider from './src/providers/AppProvider';

const strictTheme = {['text-font-family']: 'Poppins'};
const customMapping = {strict: strictTheme};

const {store, persistor} = getStore();

TrackPlayer.updateOptions({
  stopWithApp: true,
  capabilities: [
    TrackPlayer.CAPABILITY_PLAY,
    TrackPlayer.CAPABILITY_PAUSE,
    TrackPlayer.CAPABILITY_STOP,
    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
  ],
});

export default () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ApplicationProvider
          {...eva}
          theme={{...eva.light, ...myTheme}}
          customMapping={customMapping}>
          <SafeAreaProvider>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="dark-content"
            />
            <AppProvider>
              <Host>
                <Navigation />
              </Host>
            </AppProvider>
          </SafeAreaProvider>
        </ApplicationProvider>
      </PersistGate>
    </Provider>
  </>
);
