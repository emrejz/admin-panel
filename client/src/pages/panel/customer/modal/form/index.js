import React, { useState } from "react";
import { mutate } from "swr";
import { Button, Form, Input, InputNumber } from "antd";

//helpers
import useFetch from "../../../../../helpers/useFetch";

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

const ProductModalForm = ({ form, item, handleCancel, setIsModalVisible }) => {
  const [loading, setLoading] = useState(false);
  const { fetchOperation } = useFetch();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (item) {
        if (window.confirm("Ürün güncellenecek emin misiniz?")) {
          await fetchOperation("put", "/api/costomer/product/edit", {
            _id: item._id,
            ...form.getFieldsValue(),
          });
          await mutate("/api/costomer/product", (data) =>
            data.map((elem) => (elem._id == item._id ? item : elem))
          );
        }
      } else {
        if (window.confirm("Yeni ürün eklenecek emin misiniz?")) {
          const res = await fetchOperation(
            "post",
            "/api/costomer/product/add",
            {
              ...form.getFieldsValue(),
            }
          );
          await mutate("/api/costomer/product", (data) => [res, ...data]);
        }
      }

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
