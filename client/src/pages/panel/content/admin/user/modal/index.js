import React, { useState, useEffect } from "react";
import { Modal, Typography, Form } from "antd";
import { useTranslation } from "react-i18next";

//comps
import UserModalForm from "./form";

const { Text } = Typography;

const UserModal = ({ item }) => {
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
    if (window.confirm(t("panel.content.admin.confirm.exit"))) {
      setIsModalVisible(false);
    }
  };

  return (
    <>
      <Text onClick={showModal} type="warning">
        {t("panel.content.admin.text.edit")}
      </Text>
      <Modal
        title={t("panel.content.admin.text.modalTitle")}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <UserModalForm
          form={form}
          item={item}
          handleCancel={handleCancel}
          setIsModalVisible={setIsModalVisible}
        />
      </Modal>
    </>
  );
};
export default UserModal;
