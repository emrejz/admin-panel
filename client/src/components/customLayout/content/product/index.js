import { useState, useEffect } from "react";
import { Layout, List, Avatar, Typography, Spin } from "antd";
import useSWR from "swr";

//comps
import ProductModal from "./modal";
import CustomResult from "../../../customResult";
import CustomSkeleton from "../../../customSkeleton";

//helpers
import useFetch from "../../../../helpers/useFetch";

//scss
import "./index.scss";

const { Content } = Layout;
const { Title, Text } = Typography;

function ProductContent() {
  const { data, error, mutate } = useSWR("/api/costomer/product");
  const [deletingID, setDeletingID] = useState(null);

  const { fetchOperation } = useFetch();
  const removeProduct = async (title, _id) => {
    setDeletingID(_id);
    try {
      if (
        window.confirm(title + " adlı ürünü silmek istediğinize emin misiniz?")
      ) {
        await fetchOperation("delete", "/api/costomer/product/delete", {
          _id,
        });
        await mutate((data) => data.map((item) => item._id === _id));
        setDeletingID(null);
      }
    } catch (error) {
      setDeletingID(null);
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
              <List.Item
                className={
                  deletingID === item._id
                    ? "productListItem deletingItem"
                    : "productListItem"
                }
              >
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
                    {deletingID === item._id ? (
                      <Spin size="small" />
                    ) : (
                      <>
                        <ProductModal item={item} />
                        {" | "}
                        <Text
                          type="danger"
                          onClick={() => removeProduct(item.title, item._id)}
                        >
                          sil
                        </Text>
                      </>
                    )}
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
