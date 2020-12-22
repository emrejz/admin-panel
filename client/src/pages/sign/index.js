import { useTranslation } from "react-i18next";

//comps
import SignForm from "./form";

//scss
import "./index.scss";

const Sign = () => {
  const { t } = useTranslation();
  return (
    <div className="signContainer">
      <div>{t("sign.note.1")} </div>
      <div>{t("sign.note.2")} </div>
      <div>{t("sign.note.3")} </div>
      <SignForm />
    </div>
  );
};
export default Sign;
