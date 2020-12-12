import { useState } from "react";
import { Layout, List, Avatar, Skeleton, Typography } from "antd";
import useSWR from "swr";

import ProductModal from "./modal";

import "./index.scss";

const { Content } = Layout;
const { Title, Text } = Typography;

function ProductContent() {
  const [initLoading, setInitLoading] = useState(false);
  const { data, error } = useSWR(process.env.REACT_APP_CUSTOMER_PRODUCT_API);
  console.log("🚀 ~ file: index.js ~ line 15 ~ ProductContent ~ error", error);
  console.log("🚀 ~ file: index.js ~ line 16 ~ ProductContent ~ data", data);

  return (
    <Content className="ProductContentCont">
      <ProductModal title={"Ekle"} />
      <Skeleton loading={!data} active>
        <List
          className="demo-loadmore-list"
          loading={initLoading}
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
      </Skeleton>
    </Content>
  );
}

export default ProductContent;
