import { Switch } from "antd";
import i18n from "../../i18n";

import "./index.scss";

export default () => {
  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "tr" ? "en" : "tr");
  };

  return (
    <Switch
      className="languageSwitchCont"
      checkedChildren="tr"
      unCheckedChildren="en"
      defaultChecked={"tr" === i18n.language}
      onChange={changeLanguage}
    />
  );
};
