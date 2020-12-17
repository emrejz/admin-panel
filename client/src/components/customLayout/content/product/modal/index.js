import React, { useState } from "react";
import { Modal, Button, Typography, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";

//comps
import ProductModalForm from "./form";

const { Text } = Typography;

const ProductModal = ({ item }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

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
          item={item}
          handleCancel={handleCancel}
          isModalVisible={isModalVisible}
          setIsModalVisible={handleCancel}
        />
      </Modal>
    </>
  );
};
export default ProductModal;
