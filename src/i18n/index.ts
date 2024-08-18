import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import FORM_EN from '../locales/en/form.json';
import FORM_VI from '../locales/vi/form.json';

import HOME_EN from '../locales/en/home.json';
import HOME_VI from '../locales/vi/home.json';

import ADMIN_EN from '../locales/en/admin.json';
import ADMIN_VI from '../locales/vi/admin.json';

const resources = {
  en: {
    home: HOME_EN,
    form: FORM_EN,
    admin: ADMIN_EN,
  },
  vi: {
    home: HOME_VI,
    form: FORM_VI,
    admin: ADMIN_VI,
  },
};

const defaultNS = 'form';

i18n.use(initReactI18next).init({
  resources,
  defaultNS,
  lng: 'vi',
  ns: ['home', 'form', 'admin'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
