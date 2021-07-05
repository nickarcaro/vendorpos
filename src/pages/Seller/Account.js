import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { getMeApi } from "../../api/user";
import { useHistory } from "react-router-dom";
import { Layout, Button } from "antd";


const Account = () => {
  const { Content } = Layout;
  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth();
  const history = useHistory();
  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response);
    })();
  }, [auth, setUser, logout]);
  if (user === undefined) return null;
  if (!auth && !user) {
    history.replace("/");
    return null;
  }
  console.log(user)
  return (
    <Content>
      <Layout
        className="site-layout-background"
        style={{ padding: "24px 0", background: "#fff" }}
      >
        <Content style={{ padding: "0 24px", minHeight: 280 }}>
          <Button type="primary">hola</Button>
        </Content>
      </Layout>
    </Content>
  );
};

export default Account;
