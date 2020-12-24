import { Layout, List, Typography } from "antd";
import { useTranslation } from "react-i18next";
import useSWR from "swr";

//comps
import CustomResult from "../../../../../components/customResult";
import CustomSkeleton from "../../../../../components/customSkeleton";
import UserModal from "./modal";

//helpers
import useFetch from "../../../../../helpers/useFetch";

//scss
import "./index.scss";

const { Content } = Layout;
const { Text } = Typography;

export default () => {
  const { t } = useTranslation();
  const { data, error, mutate } = useSWR("/api/admin/user/list");
  const { fetchOperation } = useFetch();

  const deleteUser = async (_id, email) => {
    try {
      const body = { _id, deleteProducts: false };
      if (window.confirm(t("panel.content.admin.confirm.delete") + email)) {
        if (window.confirm(t("panel.content.admin.confirm.deleteAll"))) {
          body.deleteProducts = true;
        }

        await fetchOperation("delete", "/api/admin/user/delete", body);
        await mutate(data.filter((item) => item._id !== _id));
      }
    } catch (error) {}
  };
  return (
    <Content className="adminUserContentCont">
      {error ? (
        <CustomResult message={error.message} />
      ) : data ? (
        <>
          <List
            className="demo-loadmore-list"
            itemLayout="horizontal"
            dataSource={data.users}
            renderItem={(item) => (
              <List.Item key={item._id} className={"userListItem"}>
                <div className="infoBox">
                  <Text strong>{t("panel.content.admin.text.email")} </Text>
                  <Text>{item.email}</Text>
                  <div>
                    <Text strong>{t("panel.content.admin.text.role")} </Text>
                    <Text>{item.role}</Text>
                  </div>
                  <div>
                    <Text strong>
                      {t("panel.content.admin.text.createdAt")}{" "}
                    </Text>
                    <Text>{item.createdAt}</Text>
                  </div>
                  <div>
                    <Text strong>ID: </Text>
                    <Text>{item._id}</Text>
                  </div>
                  <div className="buttons">
                    <>
                      <UserModal item={item} />
                      {" | "}
                      <Text
                        onClick={() => deleteUser(item._id, item.email)}
                        type="danger"
                      >
                        {t("panel.content.admin.text.delete")}
                      </Text>
                    </>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </>
      ) : (
        <CustomSkeleton n={3} />
      )}
    </Content>
  );
};
