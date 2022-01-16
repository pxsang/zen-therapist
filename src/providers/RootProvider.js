import React, {createContext} from 'react';
import {View} from 'react-native';

export const RootContext = createContext({});

const RootProvider = ({children}) => {
  return (
    <RootContext.Provider value={{}}>
      <View style={{flex: 1}}>{children}</View>
    </RootContext.Provider>
  );
};

export default RootProvider;
