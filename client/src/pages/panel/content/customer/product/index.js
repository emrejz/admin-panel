import { useState } from "react";
import { Layout, List, Avatar, Typography, Spin } from "antd";
import useSWR from "swr";
import { useTranslation } from "react-i18next";

//comps
import ProductModal from "./modal";
import CustomResult from "../../../../../components/customResult";
import CustomSkeleton from "../../../../../components/customSkeleton";

//helpers
import useFetch from "../../../../../helpers/useFetch";

//scss
import "./index.scss";

const { Content } = Layout;
const { Title, Text } = Typography;

export default () => {
  const { t } = useTranslation();
  const { data, error, mutate } = useSWR("/api/costomer/product");
  const [deletingID, setDeletingID] = useState(null);

  const { fetchOperation } = useFetch();
  const removeProduct = async (title, _id) => {
    setDeletingID(_id);
    try {
      if (
        window.confirm(
          t("panel.content.customer.confirm.delete") +
            " " +
            t("panel.content.customer.text.title") +
            ": " +
            title
        )
      ) {
        await fetchOperation("delete", "/api/costomer/product/delete", {
          _id,
        });
        await mutate(data.filter((item) => item._id !== _id));
      }
      setDeletingID(null);
    } catch (error) {
      setDeletingID(null);
    }
  };
  return (
    <Content className="customerProductContentCont">
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
                    ? "customerProductListItem deletingItem"
                    : "customerProductListItem"
                }
              >
                <Avatar src={item.picture} className="avatar" />
                <div className="infoBox">
                  <Title level={5}>{item.title}</Title>
                  <div>
                    <Text strong>
                      {t("panel.content.customer.text.price")}
                      {": "}
                    </Text>
                    <Text>{item.price} TL</Text>
                  </div>
                  <div>
                    <Text strong>
                      {t("panel.content.customer.text.desc")}
                      {": "}
                    </Text>
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
                          {t("panel.content.customer.text.delete")}
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
};
