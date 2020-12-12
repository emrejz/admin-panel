import React, { useState, useEffect } from "react";
import { Modal, Button, Typography, Form, Input, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import "./index.scss";

const { Text } = Typography;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: "${label} boş olamaz!",

  number: {
    range: "${label}  ${min} - ${max} arasında olmalı",
  },
};

const ProductModal = ({ title, item }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();
  useEffect(() => {
    console.log(item);
    if (item) {
      form.setFieldsValue({
        ...item,
      });
    }
  });
  const onFinish = (values) => {
    if (
      values.title == item.title &&
      values.picture === item.picture &&
      values.price === item.price &&
      values.description === item.description
    ) {
      if (window.confirm("Hiçbir değişiklik yapmadınız!")) {
        setIsModalVisible(false);
      }
    } else if (
      window.confirm(
        title === "Ekle"
          ? "Yeni ürün eklenecek emin misiniz?"
          : "Ürün değiştirilecek emin misiniz?"
      )
    ) {
      console.log(values);
      setIsModalVisible(false);
    }
  };
  const onFinishFailed = (values) => {
    console.log("fail", values);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    if (window.confirm("Çıkmak istediğinize emin misiniz?")) {
      form.resetFields();
      setIsModalVisible(false);
    }
  };

  return (
    <>
      {title === "Ekle" ? (
        <Button
          className="addButton"
          type="primary"
          icon={<PlusOutlined />}
          onClick={showModal}
        >
          Ekle
        </Button>
      ) : (
        <Text onClick={showModal} type="warning">
          düzelt
        </Text>
      )}
      <Modal
        className="productModalCont"
        title={title === "Ekle" ? "Yeni ürün ekle" : "Ürünü düzenle"}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={"title"}
            label="Başlık"
            rules={[{ required: true, whitespace: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"picture"}
            label="Fotoğraf"
            rules={[{ required: true, whitespace: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"price"}
            label="Fiyat"
            rules={[
              { type: "number", min: 0.1, max: 1000 },
              { required: true },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name={"description"}
            label="Açıklama"
            rules={[{ required: true, whitespace: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="buttons">
            <Button type="primary" htmlType="submit">
              Onay
            </Button>
            <Button htmlType="button" onClick={handleCancel}>
              İptal
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ProductModal;
