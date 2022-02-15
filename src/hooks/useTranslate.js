import {useCallback} from 'react';
import I18n from 'react-native-i18n';

function useTranslate() {
  return useCallback((...args) => {
    return I18n.t(...args);
  }, []);
}

export default useTranslate;
