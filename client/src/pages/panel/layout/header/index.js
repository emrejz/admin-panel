import { Layout, Typography } from "antd";

import "./index.scss";

const { Title } = Typography;
const { Header } = Layout;

function CustomHeader() {
  return (
    <Header className="customHeaderCont">
      <Title level={2}>Admin panel</Title>
    </Header>
  );
}

export default CustomHeader;
