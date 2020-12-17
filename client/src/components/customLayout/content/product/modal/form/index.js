import React, { useState, useEffect } from "react";
import { mutate } from "swr";
import { Button, Form, Input, InputNumber } from "antd";

//helpers
import useFetch from "../../../../../../helpers/useFetch";

//scss
import "./index.scss";

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

const ProductModalForm = ({
  item,
  handleCancel,
  setIsModalVisible,
  isModalVisible,
}) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { fetchOperation } = useFetch();

  useEffect(() => {
    if (!isModalVisible) {
      form.resetFields();
    }
    if (item && isModalVisible) {
      form.setFieldsValue({
        ...item,
      });
    }
  }, [isModalVisible]);

  const onFinish = async () => {
    setLoading(true);
    try {
      if (item) {
        if (window.confirm("Ürün güncellenecek emin misiniz?")) {
          await fetchOperation("put", "/api/costomer/product/edit", {
            _id: item._id,
            ...form.getFieldsValue(),
          });
        }
      } else {
        if (window.confirm("Yeni ürün eklenecek emin misiniz?")) {
          await fetchOperation("post", "/api/costomer/product/add", {
            ...form.getFieldsValue(),
          });
        }
      }
      await mutate("/api/costomer/product");
      setLoading(false);
      setIsModalVisible(false);
    } catch (error) {
      setLoading(false);
      setIsModalVisible(true);
    }
  };

  return (
    <Form
      form={form}
      {...layout}
      name="nest-messages"
      className="productModalFormContainer"
      onFinish={onFinish}
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
        rules={[{ type: "number", min: 0.1, max: 1000 }, { required: true }]}
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
        <Button type="primary" htmlType="submit" loading={loading}>
          Onay
        </Button>
        <Button
          type="danger"
          htmlType="button"
          onClick={handleCancel}
          loading={loading}
        >
          İptal
        </Button>
      </Form.Item>
    </Form>
  );
};
export default ProductModalForm;
