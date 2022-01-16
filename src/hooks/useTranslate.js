import {useCallback} from 'react';
import I18n from 'react-native-i18n';

function useTranslate() {
  return useCallback(key => {
    return I18n.t(key);
  }, []);
}

export default useTranslate;
