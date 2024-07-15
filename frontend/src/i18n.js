import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translations: {
        'Sign Up': 'Sign Up',
        'Password mismatch': 'Password mismatch',
        Username: 'Username',
        'Display Name': 'Display Name',
        Password: 'Password',
        'Password Repeat': 'Password Repeat',
        Login: 'Login', 
        Logout: 'Logout',
        Users: 'Users',
        Next: 'Next',
        Previous: 'Previous',
        'Load Failure': 'Load Failure',
        'User not found': 'User not found',
        'Change Display Name': 'Change Display Name',
        Save: 'Save',
        Cancel: 'Cancel',
        Reset:'Reset',
        'Reset your password': 'Reset your password',
        'Set your password': 'Set your password'

      }
    },
    tr: {
      translations: {
        'Sign Up': 'Kayıt Ol',
        'Password mismatch': 'Aynı şifreyi giriniz',
        Username: 'Kullanıcı Adı',
        'Display Name': 'Tercih Edilen İsim',
        Password: 'Şifre',
        'Password Repeat': 'Şifreyi Tekrarla',
        Login: 'Giriş Yap',
        Logout: 'Çıkış Yap',
        Users: 'Kullanıcılar',
        Next: 'Sonraki',
        Previous: 'Önceki',
        'Load Failure': 'Liste Alınamadı',
        'User not found': 'Kullanıcı bulunamadı',
        Edit: 'Düzenle',
        'Change Display Name': 'Görünür İsminizi Değiştirin',
        Save: 'Kaydet',
        Cancel: 'İptal Et',
        Reset:'Sıfırla',
        'Reset your password': 'Şifreyi Sıfırla',
        'Set your password': 'Şifreni oluştur'

      }
    }
  },
  fallbackLng: localStorage.getItem("language") || 'en',
  ns: ['translations'],
  defaultNS: 'translations',
  keySeparator: false,
  interpolation: {
    escapeValue: false,
    formatSeparator: ','
  },
  react: {
    wait: true
  }
});

export default i18n;