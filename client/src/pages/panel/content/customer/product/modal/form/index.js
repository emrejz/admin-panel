import React, { useState } from "react";
import { mutate } from "swr";
import { Button, Form, Input, InputNumber } from "antd";
import { useTranslation } from "react-i18next";

//helpers
import useFetch from "../../../../../../../helpers/useFetch";

//scss
import "./index.scss";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const ProductModalForm = ({ form, item, handleCancel, setIsModalVisible }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { fetchOperation } = useFetch();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (item) {
        if (window.confirm(t("panel.content.customer.confirm.update"))) {
          await fetchOperation("put", "/api/costomer/product/edit", {
            _id: item._id,
            ...form.getFieldsValue(),
          });

          mutate(
            "/api/costomer/product",
            (data) =>
              data.map((elem) =>
                elem._id === item._id ? { _id: item._id, ...values } : elem
              ),
            false
          );
        }
      } else {
        if (window.confirm(t("panel.content.customer.confirm.add"))) {
          const res = await fetchOperation(
            "post",
            "/api/costomer/product/add",
            {
              ...form.getFieldsValue(),
            }
          );

          mutate("/api/costomer/product", (data) => [res, ...data], false);
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
    >
      <Form.Item
        name={"title"}
        label={t("panel.content.customer.text.title")}
        rules={[
          {
            required: true,
            message: t(
              "panel.content.customer.error.validation.title.required"
            ),
          },
          {
            whitespace: true,
            message: t(
              "panel.content.customer.error.validation.title.whitespace"
            ),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"picture"}
        label={t("panel.content.customer.text.pic")}
        rules={[
          {
            required: true,
            message: t("panel.content.customer.error.validation.pic.required"),
          },
          {
            type: "url",
            message: t("panel.content.customer.error.validation.pic.url"),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"price"}
        label={t("panel.content.customer.text.price")}
        rules={[
          {
            type: "number",
            min: 0,
            max: 1000,
            message: t("panel.content.customer.error.validation.price.minMax"),
          },
          {
            required: true,
            message: t(
              "panel.content.customer.error.validation.price.required"
            ),
          },
        ]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name={"description"}
        label={t("panel.content.customer.text.desc")}
        rules={[
          {
            required: true,
            message: t("panel.content.customer.error.validation.desc.required"),
          },
          {
            whitespace: true,
            message: t(
              "panel.content.customer.error.validation.desc.whitespace"
            ),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item className="buttons">
        <Button type="primary" htmlType="submit" loading={loading}>
          {t("panel.content.customer.text.ok")}
        </Button>
        <Button
          type="danger"
          htmlType="button"
          onClick={handleCancel}
          loading={loading}
        >
          {t("panel.content.customer.text.cancel")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductModalForm;
