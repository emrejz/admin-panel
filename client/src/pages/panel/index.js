import { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { Layout, Spin } from "antd";

//comps
import CustomHeader from "./header";
import CustomMenu from "./menu";

//scss
import "./index.scss";

//pages-contents
const CustomerContent = lazy(() => import("./content/customer"));

const { Sider } = Layout;

export default ({ session }) => {
  const { role } = session;
  const { name } = useSelector((state) => state.selectedMenuItem);

  return (
    <Layout className="layoutCont">
      <CustomHeader role={role} />
      <Layout>
        <Sider className="menuSider">
          <CustomMenu role={role} />
        </Sider>
        <Layout>
          <Suspense fallback={<Spin size="large" className="spin" />}>
            {name === "productList" && <CustomerContent />}
          </Suspense>
        </Layout>
      </Layout>
    </Layout>
  );
};
