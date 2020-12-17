import { Layout, List, Avatar, Typography } from "antd";
import useSWR from "swr";

import ProductModal from "./modal";
import CustomResult from "../../../customResult";
import CustomSkeleton from "../../../customSkeleton";
import customNotification from "../../../customNotification";

import "./index.scss";

const { Content } = Layout;
const { Title, Text } = Typography;

function ProductContent() {
  const { data, error } = useSWR("/api/costomer/product");
  const removeProduct = (title, _id) => {
    if (
      window.confirm(title + " adlı ürünü silmek istediğinize emin misiniz?")
    ) {
      fetch(
        process.env.REACT_APP_CUSTOMER_PRODUCT_API +
          "/api/costomer/product/delete",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ _id }),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          customNotification({
            title: "Ürün silindi.",
            description: "Ürün başarıyla silindi.",
          });
        })
        .catch((err) =>
          customNotification({
            title: "Ürün silinemedi!",
            description: "Ürün silme başarısız oldu! Error: " + err.message,
          })
        );
    }
  };
  return (
    <Content className="productContentCont">
      {error ? (
        <CustomResult message={error.message} />
      ) : data ? (
        <>
          <ProductModal />
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
                    <Text
                      type="danger"
                      onClick={() => removeProduct(item.title, item._id)}
                    >
                      sil
                    </Text>
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
}

export default ProductContent;
