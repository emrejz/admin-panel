import React, { useState, useEffect } from "react";
import { Modal, Button, Typography, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";

//comps
import ProductModalForm from "./form";

const { Text } = Typography;

const ProductModal = ({ item }) => {
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
    if (window.confirm("Çıkmak istediğinize emin misiniz?")) {
      setIsModalVisible(false);
    }
  };

  return (
    <>
      {item ? (
        <Text onClick={showModal} type="warning">
          düzelt
        </Text>
      ) : (
        <Button
          className="addButton"
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
        >
          Ekle
        </Button>
      )}

      <Modal
        title={item ? "Ürünü düzenle" : "Yeni ürün ekle"}
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
