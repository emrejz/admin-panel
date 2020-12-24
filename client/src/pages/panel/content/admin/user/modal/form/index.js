import React, { useState } from "react";
import { mutate } from "swr";
import { Button, Form, Input, Select } from "antd";
import { useTranslation } from "react-i18next";

//helpers
import useFetch from "../../../../../../../helpers/useFetch";

//scss
import "./index.scss";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { Option } = Select;

const UserModalForm = ({ form, item, handleCancel, setIsModalVisible }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { fetchOperation } = useFetch();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (item) {
        if (window.confirm(t("panel.content.admin.confirm.update"))) {
          await fetchOperation("put", "/api/admin/user/edit", {
            _id: item._id,
            ...values,
          });

          mutate(
            "/api/admin/user/list",
            (data) => ({
              ...data,
              users: data.users.map((elem) =>
                elem._id === item._id ? { _id: item._id, ...values } : elem
              ),
            }),
            false
          );
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
      className="adminUserModalFormContainer"
      onFinish={onFinish}
    >
      <Form.Item
        name={"email"}
        label={t("panel.content.admin.text.email")}
        rules={[
          {
            required: true,
            message: t("panel.content.admin.error.validation.email.required"),
          },
          {
            type: "email",
            message: t("panel.content.admin.error.validation.email.isEmail"),
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name={"role"}
        label={t("panel.content.admin.text.role")}
        rules={[
          {
            required: true,
            message: t("panel.content.admin.error.validation.role.required"),
          },
        ]}
      >
        <Select style={{ width: 120 }}>
          <Option value="admin"> {t("panel.content.admin.text.admin")}</Option>
          <Option value="customer">
            {" "}
            {t("panel.content.admin.text.customer")}
          </Option>
          <Option value="user"> {t("panel.content.admin.text.user")}</Option>
        </Select>
      </Form.Item>

      <Form.Item className="buttons">
        <Button type="primary" htmlType="submit" loading={loading}>
          {t("panel.content.admin.text.ok")}
        </Button>
        <Button
          type="danger"
          htmlType="button"
          onClick={handleCancel}
          loading={loading}
        >
          {t("panel.content.admin.text.cancel")}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserModalForm;
