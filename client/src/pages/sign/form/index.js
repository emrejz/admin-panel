import { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

//scss
import "./index.scss";

const SignForm = () => {
  const [signIn, setSignIn] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    setLoading(true);
    setError(null);
    const { email, password, remember } = values;
    const path = signIn ? "/api/user/signin" : "/api/user/signup";
    const result = await fetch(
      process.env.REACT_APP_CUSTOMER_PRODUCT_API + path,
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: "customer" }),
      }
    );
    const res = await result.json();
    if (res.error) {
      setError(res.error);
    } else {
      localStorage.setItem("token", res.token);
      if (remember)
        localStorage.setItem("user", JSON.stringify({ email, password }));
      else localStorage.removeItem("user");
    }
    setLoading(false);
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
        validateStatus={error && error.code === 11000 ? "error" : null}
        help={error && error.code == 11000 ? error.message : null}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Lütfen email giriniz!",
          },
          { type: "email", message: "Geçerli bir email giriniz!" },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name="password"
        hasFeedback
        rules={[
          {
            required: true,
            message: "Lütfen şifre giriniz!",
          },
          {
            min: 3,
            message: "Şifre minimum 3 karakterli olmalı!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Şifre"
        />
      </Form.Item>

      <Form.Item
        name="cPassword"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Lütfen şifre giriniz!",
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("Şifreler eşleşmiyor!");
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Şifreyi tekrar giriniz"
        />
      </Form.Item>

      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          {signIn ? "Sign in" : "Sign Up"}
        </Button>
        Or <a onClick={signInSwitch}>{signIn ? "register now!" : "sign in!"}</a>
      </Form.Item>
    </Form>
  );
};
export default SignForm;
