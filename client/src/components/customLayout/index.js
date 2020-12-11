import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Layout, Spin } from "antd";

import CustomHeader from "./header";
import CustomMenu from "./menu";

import "./index.scss";

const ProductContent = lazy(() => import("./content/product"));
const { Sider } = Layout;

function CustomLayout() {
  const { name } = useSelector((state) => state.selectedMenuItem);

  return (
    <Layout className="layoutCont">
      <CustomHeader />
      <Layout>
        <Sider className="menuSider">
          <CustomMenu />
        </Sider>
        <Layout>
          <Suspense fallback={<Spin size="large" className="spin" />}>
            {name === "productList" && <ProductContent />}
          </Suspense>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default CustomLayout;
