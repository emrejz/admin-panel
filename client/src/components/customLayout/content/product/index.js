import { useState } from "react";
import { Layout, List, Avatar, Skeleton, Typography } from "antd";
import ProductModal from "./modal";

import "./index.scss";

const { Content } = Layout;
const { Title, Text } = Typography;

function ProductContent() {
  const [initLoading, setInitLoading] = useState(false);
  const list = [
    {
      title: "Hayat su 10 litre",
      category: "water",
      price: 14,
      description: "10 litre hayat su.",
      picture:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    },
    {
      title: "Ülker damak çikolata",
      category: "chocolate",
      price: 5.2,
      description: "Ülker kare 160 gr çikolata.",
      picture:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    },
  ];
  return (
    <Content className="ProductContentCont">
      <ProductModal title={"Ekle"} />
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={list}
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
    </Content>
  );
}

export default ProductContent;
