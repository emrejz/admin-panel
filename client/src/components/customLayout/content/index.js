import { useState } from "react";
import { Layout, List, Avatar, Skeleton, Typography, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import "./index.scss";

const { Content } = Layout;
const { Title, Text } = Typography;

function CustomContent() {
  const [initLoading, setInitLoading] = useState(false);
  const list = [
    {
      name: "Hayat su 10 litre",
      category: "water",
      price: "14",
      moneyEnum: "TL",
      description: "10 litre hayat su.",
      pic: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    },
    {
      name: "Ülker damak çikolata",
      category: "chocolate",
      price: "5",
      moneyEnum: "TL",
      description: "Ülker kare 160 gr çikolata.",
      pic: "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
    },
  ];
  return (
    <Content className="cutomContentCont">
      <Button className="addButton" type="primary" icon={<PlusOutlined />}>
        Ekle
      </Button>
      <List
        className="demo-loadmore-list"
        loading={initLoading}
        itemLayout="horizontal"
        // loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
          <List.Item className="productListItem">
            <Avatar src={item.pic} className="avatar" />
            <div className="infoBox">
              <Title level={5}>{item.name}</Title>
              <div>
                <Text strong>Fiyat: </Text>
                <Text>
                  {item.price} {item.moneyEnum}
                </Text>
              </div>
              <div>
                <Text strong>Açıklama: </Text>
                <Text>{item.description}</Text>
              </div>
              <div className="buttons">
                <Text type="warning">düzelt</Text>
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

export default CustomContent;
