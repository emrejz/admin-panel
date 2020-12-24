import React, { useState, useEffect } from "react";
import { Modal, Button, Typography, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

//comps
import ProductModalForm from "./form";

const { Text } = Typography;

const ProductModal = ({ item }) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  useEffect(() => {
    form.resetFields();
    if (item) {
      form.setFieldsValue({
        ...item,
      });
    }
  }, [isModalVisible, item]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    if (window.confirm(t("panel.content.customer.confirm.exit"))) {
      setIsModalVisible(false);
    }
  };

  return (
    <>
      {item ? (
        <Text onClick={showModal} type="warning">
          {t("panel.content.customer.text.edit")}
        </Text>
      ) : (
        <Button
          className="addButton"
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
        >
          {t("panel.content.customer.text.add")}
        </Button>
      )}

      <Modal
        title={
          item
            ? t("panel.content.customer.text.modalTitleEdit")
            : t("panel.content.customer.text.modalTitleNew")
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <ProductModalForm
          form={form}
          item={item}
          handleCancel={handleCancel}
          setIsModalVisible={setIsModalVisible}
        />
      </Modal>
    </>
  );
};
export default ProductModal;
