import { Layout, List, Typography } from "antd";
import { useTranslation } from "react-i18next";
import useSWR from "swr";

//comps
import CustomResult from "../../../../../components/customResult";
import CustomSkeleton from "../../../../../components/customSkeleton";

//scss
import "./index.scss";

const { Content } = Layout;
const { Text } = Typography;

export default () => {
  const { t } = useTranslation();
  const { data, error, mutate } = useSWR("/api/admin/user/list");
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
              <List.Item className={"userListItem"}>
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
                      <Text type="warning">
                        {t("panel.content.admin.text.edit")}
                      </Text>
                      {" | "}
                      <Text type="danger">
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
