import { Layout, List, Typography } from "antd";
import useSWR from "swr";

//comps
import CustomResult from "../../../../../components/customResult";
import CustomSkeleton from "../../../../../components/customSkeleton";

//scss
import "./index.scss";

const { Content } = Layout;
const { Text } = Typography;

export default () => {
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
                  <Text strong>Email: </Text>
                  <Text>{item.email}</Text>
                  <div>
                    <Text strong>Rol: </Text>
                    <Text>{item.role}</Text>
                  </div>
                  <div>
                    <Text strong>Oluşturma tarihi: </Text>
                    <Text>{item.createdAt}</Text>
                  </div>
                  <div>
                    <Text strong>ID: </Text>
                    <Text>{item._id}</Text>
                  </div>
                  <div className="buttons">
                    <>
                      <Text type="warning">düzelt</Text>
                      {" | "}
                      <Text type="danger">sil</Text>
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
