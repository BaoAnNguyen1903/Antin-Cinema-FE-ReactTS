import { App, Button, Divider, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useState } from "react";
import type { FormProps } from "antd";
import { loginAPI } from "@/services/api";
import bg from "assets/auth/login&register.jpeg";
import { useCurrentApp } from "@/components/context/app.context";

type FieldType = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [isSubmit, setIsSubmit] = useState(false);
  const { message, notification } = App.useApp();
  const { setIsAuthenticated, setUser } = useCurrentApp();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const { username, password } = values;
    setIsSubmit(true);
    const res = await loginAPI(username, password);
    setIsSubmit(false);
    if (res?.data) {
      setIsAuthenticated(true);
      setUser(res.data.user);
      localStorage.setItem("access_token", res.data.access_token);
      message.success("Welcome to Antin Cinema!");
      navigate("/");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.message && Array.isArray(res.message)
            ? res.message[0]
            : res.message,
        duration: 5
      });
    }
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        margin: 0
      }}
    >
      <main className="main">
        <div className="container">
          <section className="wrapper">
            <div className="heading">
              <h2 className="text text-large">Đăng Nhập Antin Cinema</h2>
              <Divider />
            </div>
            <Form name="login-form" onFinish={onFinish} autoComplete="off">
              <Form.Item<FieldType>
                labelCol={{ span: 24 }} //whole column
                label="Tài khoản"
                name="username"
                rules={[
                  { required: true, message: "Email không được để trống!" }
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item<FieldType>
                labelCol={{ span: 24 }} //whole column
                label="Mật khẩu"
                name="password"
                rules={[
                  { required: true, message: "Mật khẩu không được để trống!" }
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isSubmit}>
                  Đăng nhập
                </Button>
              </Form.Item>
              <Divider>Or</Divider>

              <p className="text text-normal" style={{ textAlign: "center" }}>
                Chưa có tài khoản ?
                <span>
                  <Link to="/register"> Đăng Ký </Link>
                </span>
              </p>
              <br />
            </Form>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
