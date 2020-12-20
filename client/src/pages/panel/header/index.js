import { Layout, Typography, Button } from "antd";

//constants
import { adminRole } from "../../../constants/general";

import "./index.scss";

const { Title } = Typography;
const { Header } = Layout;

function CustomHeader({ role }) {
  const _onClick = () => {
    if (window.confirm("Çıkmak istediğinize emin misiniz?")) {
      localStorage.removeItem("token");
      window.location.reload();
    }
  };
  return (
    <Header className="customHeaderCont">
      <Title level={2}>{role === adminRole ? "Admin " : "Müşteri "}panel</Title>
      <Button onClick={_onClick}>Sign Out</Button>
    </Header>
  );
}

export default CustomHeader;
