import enLang from "./entries/en-US";
import dictionary from "./entries/getDictionary";
import thLang from "./entries/th_TH";
import { addLocaleData } from "react-intl";
import { loadMessages } from "devextreme/localization";
const AppLocale = {
  en: enLang,
  th: thLang
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.th.data);
loadMessages(dictionary);
export default AppLocale;
