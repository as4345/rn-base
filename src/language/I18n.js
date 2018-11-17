import I18n from 'react-native-i18n'
import * as u from '../utils'
import DeviceInfo from 'react-native-device-info'
import en from './en'
import zh from './zh'
import zh_Hant from './zh-Hant'



I18n.defaultLocale = 'zh';

I18n.fallbacks = true;

I18n.translations = {
    'en': en,
    'zh': zh, // 国产机型-中国大陆
    'zh-CN': zh, // 国产机型-中国大陆
    'zh-HK': zh_Hant, // 国产机型-中国香港
    'zh-TW': zh_Hant, // 国产机型-中国台湾
    'zh-Hans': zh, // 国外机型-汉语简体
    'zh-Hant': zh_Hant  // 国外机型-汉语繁体
}

I18n.localeLanguage = async () => {
    const localLanguage = await u.storage.getItem('localLanguage')
    if (localLanguage) {
        I18n.locale = localLanguage
    } else {
        I18n.locale = DeviceInfo.getDeviceLocale()
    }
    return I18n.locale
}
I18n.localeLanguage()
I18n.currentLocale()
export { I18n }
export const getLanguage = I18n.getLanguages