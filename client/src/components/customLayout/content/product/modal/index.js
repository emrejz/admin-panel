import React, { useState, useEffect } from "react";
import { Modal, Button, Typography, Form, Input, InputNumber } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import customNotification from "../../../../customNotification";

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
    if (item) {
      form.setFieldsValue({
        ...item,
      });
    }
  });
  useEffect(() => {
    if (!isModalVisible) {
      form.resetFields();
    }
  }, [isModalVisible]);
  const onFinish = (values) => {
    if (
      item &&
      values.title == item.title &&
      values.picture === item.picture &&
      values.price === item.price &&
      values.description === item.description
    ) {
      if (window.confirm("Hiçbir değişiklik yapmadınız!")) {
        setIsModalVisible(false);
      }
    } else if (
      window.confirm(title === "Ekle" && "Yeni ürün eklenecek emin misiniz?")
    ) {
      fetch(process.env.REACT_APP_CUSTOMER_PRODUCT_API + "/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form.getFieldsValue()),
      })
        .then((res) => res.json())
        .then((res) => {
          setIsModalVisible(false);
          customNotification({
            title: "Ürün eklendi.",
            description: "Ürün başarıyla eklendi",
          });
        })
        .catch((err) =>
          customNotification({
            title: "Ürün eklenemedi!",
            description: "Ürün ekleme başarısız oldu. Error: " + err.message,
          })
        );
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
            <Button type="danger" htmlType="button" onClick={handleCancel}>
              İptal
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ProductModal;
