import { Layout } from "antd";

import CustomHeader from "./header";
import CustomMenu from "./menu";
import CustomContent from "./content";

import "./index.scss";

const { Sider } = Layout;

function CustomLayout() {
  return (
    <Layout className="layoutCont">
      <CustomHeader />
      <Layout>
        <Sider className="menuSider">
          <CustomMenu />
        </Sider>
        <Layout>
          <CustomContent />
        </Layout>
      </Layout>
    </Layout>
  );
}

export default CustomLayout;
