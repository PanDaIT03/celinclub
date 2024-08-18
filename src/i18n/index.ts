import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import FORM_EN from '../locales/en/form.json';
import FORM_VI from '../locales/vi/form.json';

import HOME_EN from '../locales/en/home.json';
import HOME_VI from '../locales/vi/home.json';

import ADMIN_EN from '../locales/en/admin.json';
import ADMIN_VI from '../locales/vi/admin.json';

import HEADER_EN from '../locales/en/header.json';
import HEADER_VI from '../locales/vi/header.json';

import TITLE_EN from '../locales/en/title.json';
import TITLE_VI from '../locales/vi/title.json';

const resources = {
  en: {
    home: HOME_EN,
    form: FORM_EN,
    admin: ADMIN_EN,
    header: HEADER_EN,
    title: TITLE_EN,
  },
  vi: {
    home: HOME_VI,
    form: FORM_VI,
    admin: ADMIN_VI,
    header: HEADER_VI,
    title: TITLE_VI,
  },
};

const defaultNS = 'form';

i18n.use(initReactI18next).init({
  resources,
  defaultNS,
  lng: 'vi',
  ns: ['home', 'form', 'admin', 'header', 'title'],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
