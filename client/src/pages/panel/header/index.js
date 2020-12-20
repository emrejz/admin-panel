import { Layout, Typography, Button } from "antd";

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
      <Title level={2}>
        {role === "admin" ? "Admin panel" : "Müşteri panel"}s
      </Title>
      <Button onClick={_onClick}>Sign Out</Button>
    </Header>
  );
}

export default CustomHeader;
