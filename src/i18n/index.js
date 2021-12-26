import I18n from 'react-native-i18n';
import en from './en.json';
import vi from './vi.json';

I18n.fallbacks = true; // If an english translation is not available in en.js, it will look inside hi.js
I18n.missingBehaviour = 'guess'; // It will convert HOME_noteTitle to "HOME note title" if the value of HOME_noteTitle doesn't exist in any of the translation files.
I18n.defaultLocale = 'vi'; // If the current locale in device is not en or hi
I18n.locale = 'vi'; // If we do not want the framework to use the phone's locale by default

I18n.translations = {
  vi,
  en,
};

export const setLocale = locale => {
  I18n.locale = locale;
};

export const getCurrentLocale = () => I18n.locale;

export default I18n.translate.bind(I18n);
