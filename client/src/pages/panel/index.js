import { lazy, Suspense } from "react";
import { Layout, Spin } from "antd";

//comps
import CustomHeader from "./header";
import CustomMenu from "./menu";

//scss
import "./index.scss";

//pages-contents
const CustomerContent = lazy(() => import("./content/customer"));
const AdminContent = lazy(() => import("./content/admin"));

const { Sider } = Layout;

export default ({ session }) => {
  const { role } = session;

  return (
    <Layout className="layoutCont">
      <CustomHeader role={role} />
      <Layout>
        <Sider className="menuSider">
          <CustomMenu role={role} />
        </Sider>
        <Layout>
          <Suspense fallback={<Spin size="large" className="spin" />}>
            {role === "admin" ? <AdminContent /> : <CustomerContent />}
          </Suspense>
        </Layout>
      </Layout>
    </Layout>
  );
};
