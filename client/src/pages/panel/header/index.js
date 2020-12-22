import { useTranslation } from "react-i18next";
import { Layout, Typography, Button } from "antd";

//constants
import { adminRole } from "../../../constants/general";

import "./index.scss";

const { Title } = Typography;
const { Header } = Layout;

function CustomHeader({ role }) {
  const { t } = useTranslation();

  const _onClick = () => {
    if (window.confirm(t("panel.header.confirm.exit"))) {
      localStorage.removeItem("token");
      window.location.reload();
    }
  };
  return (
    <Header className="customHeaderCont">
      <Title level={2}>
        {role === adminRole
          ? t("panel.header.text.admin")
          : t("panel.header.text.customer")}
      </Title>
      <Button onClick={_onClick}>{t("panel.header.text.signOut")}</Button>
    </Header>
  );
}

export default CustomHeader;
