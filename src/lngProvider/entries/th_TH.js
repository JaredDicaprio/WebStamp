import antdTh from "antd/lib/locale-provider/th_TH";
import appLocaleData from "react-intl/locale-data/th";
import enMessages from "../locales/th_TH.json";

const ThLang = {
  messages: {
    ...enMessages
  },
  antd: antdTh,
  locale: "th-TH",
  data: appLocaleData
};
export default ThLang;
