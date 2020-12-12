import { Layout, List, Avatar, Typography } from "antd";
import useSWR from "swr";

import ProductModal from "./modal";
import CustomResult from "../../../customResult";
import CustomSkeleton from "../../../customSkeleton";

import "./index.scss";

const { Content } = Layout;
const { Title, Text } = Typography;

function ProductContent() {
  const { data, error } = useSWR(process.env.REACT_APP_CUSTOMER_PRODUCT_API);

  return (
    <Content className="ProductContentCont">
      <ProductModal />
      {error ? (
        <CustomResult message={error.message} />
      ) : data ? (
        <List
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item className="productListItem">
              <Avatar src={item.picture} className="avatar" />
              <div className="infoBox">
                <Title level={5}>{item.title}</Title>
                <div>
                  <Text strong>Fiyat: </Text>
                  <Text>{item.price} TL</Text>
                </div>
                <div>
                  <Text strong>Açıklama: </Text>
                  <Text>{item.description}</Text>
                </div>
                <div className="buttons">
                  <ProductModal item={item} />
                  {" | "}
                  <Text type="danger">sil</Text>
                </div>
              </div>
            </List.Item>
          )}
        />
      ) : (
        <CustomSkeleton n={3} />
      )}
    </Content>
  );
}

export default ProductContent;
