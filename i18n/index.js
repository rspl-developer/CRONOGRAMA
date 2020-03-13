import { AsyncStorage } from 'react-native';
import locale from 'react-native-locale-detector';
import i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';

import en from './en.json';
import fr from './fr.json';
import es from './es.json';

const STORAGE_KEY = '@APP:languageCode';

const languageDetector = {
    init: Function.prototype,
    type: 'languageDetector',
    async: true,
    detect: async(callback) => {
        const savedDataJSON = await AsyncStorage.getItem(STORAGE_KEY);
        const lng = (savedDataJSON) ? savedDataJSON:null;
        const selectLanguage = lng || locale;
        console.log("Detected Language = "+selectLanguage);
        callback(selectLanguage);
    },
    cacheUserLanguage: ()=>{}
};

i18n
    .use(languageDetector)
    .use(reactI18nextModule)
    .init({
        fallbackLng: "en",
        resources: {en,fr,es},
        ns: ["common"],
        defaultNS: 'common',
        debug: true,
        interpolation: {
            escapeValue: false,
        }
    })