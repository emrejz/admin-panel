import { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

//comps
import customNotification from "../../../components/customNotification";

//constants
import {
  emailErrorCodes,
  passwordErrorCodes,
  customerRole,
} from "../../../constants/general";

//scss
import "./index.scss";

const SignForm = () => {
  const [signIn, setSignIn] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const { t } = useTranslation();

  useEffect(() => {
    form.resetFields();
    const user = localStorage.getItem("user");
    if (user && signIn) {
      form.setFieldsValue({ ...JSON.parse(user) });
    }
  }, [signIn]);
  useEffect(() => {
    if (error) {
      const { code } = error;
      if (emailErrorCodes.includes(code)) {
        form.setFields([
          {
            name: "email",
            errors: [t("fetch.code." + code)],
          },
        ]);
      }
      if (passwordErrorCodes.includes(code)) {
        form.setFields([
          {
            name: "password",
            errors: [t("fetch.code." + code)],
          },
        ]);
      }
      customNotification({
        title: t("fetch.text.error"),
        description: t("fetch.code." + code),
      });
    }
  }, [error]);
  const onFinish = async (values) => {
    if (!loading) {
      setLoading(true);
      setError(null);
      const { email, password, remember } = values;
      const path = signIn ? "/api/auth/signin" : "/api/auth/signup";
      const result = await fetch(
        process.env.REACT_APP_CUSTOMER_PRODUCT_API + path,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role: customerRole }),
        }
      );
      const res = await result.json();
      setLoading(false);

      if (res.error) {
        setError(res.error);
      } else {
        localStorage.setItem("token", res.token);
        if (remember) {
          localStorage.setItem("user", JSON.stringify({ email, password }));
        } else {
          localStorage.removeItem("user");
        }
        //find best practise
        window.location.reload();
      }
    }
  };
  const signInSwitch = () => setSignIn((x) => !x);

  return (
    <Form
      form={form}
      name="sign"
      className="signFormCont"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        hasFeedback
        rules={[
          {
            required: true,
            message: t("sign.error.validation.email.required"),
          },
          { type: "email", message: t("sign.error.validation.email.isEmail") },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder={t("sign.placeholder.email")}
        />
      </Form.Item>
      <Form.Item
        name="password"
        hasFeedback
        rules={[
          {
            required: true,
            message: t("sign.error.validation.password.required"),
          },
          {
            required: true,
            pattern: new RegExp("^\\S*$"),
            message: t("sign.error.validation.password.whitespace"),
          },
          {
            min: 3,
            message: t("sign.error.validation.password.min"),
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder={t("sign.placeholder.password")}
        />
      </Form.Item>
      {!signIn && (
        <Form.Item
          name="cPassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: t("sign.error.validation.password.required"),
            },
            {
              required: true,
              pattern: new RegExp("^\\S*$"),
              message: t("sign.error.validation.password.whitespace"),
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  t("sign.error.validation.password.match")
                );
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder={t("sign.placeholder.cPassword")}
          />
        </Form.Item>
      )}
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>{t("sign.text.remember")}</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          {signIn ? t("sign.text.signIn") : t("sign.text.signUp")}
        </Button>
        {t("sign.text.or")}{" "}
        <a onClick={signInSwitch}>
          {signIn ? t("sign.text.register") : t("sign.text.signIn")}
        </a>
      </Form.Item>
    </Form>
  );
};
export default SignForm;
