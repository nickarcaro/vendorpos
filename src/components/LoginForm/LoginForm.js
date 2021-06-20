import { React, useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import { loginApi } from "../../api/user";

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await loginApi(formData);
      if (response?.jwt) {
        notification["success"]({
          message: "Login correcto.",
        });
        login(response.jwt);
      } else {
        notification["error"]({
          message: "El email o la contraseña son incorrectos",
        });
      }
      setLoading(false);
    },
  });

  return (
    <Form
      style={{ maxWidth: 300, float: "left" }}
      onFinish={formik.handleSubmit}
    >
      <Form.Item>
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          name="identifier"
          type="text"
          placeholder="Correo electrónico"
          onChange={formik.handleChange}
          value={formik.values.identifier}
        />
        {formik.errors.identifier ? (
          <div>{formik.errors.identifier}</div>
        ) : null}
      </Form.Item>
      <Form.Item>
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={formik.handleChange}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="login-form-button"
          loading={loading}
        >
          Iniciar Sesión
        </Button>
      </Form.Item>
    </Form>
  );
};

function initialValues() {
  return {
    identifier: "",
    password: "",
  };
}

function validationSchema() {
  return {
    identifier: Yup.string()
      .email("El email no es valido")
      .required("El email es obligatorio"),
    password: Yup.string().required("La contraseña es obligatorio"),
  };
}
export default LoginForm;
