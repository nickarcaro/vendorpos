import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { getMeApi } from "../../api/user";
import { useHistory } from "react-router-dom";
import { Layout, Button } from "antd";
const Stores = () => {
  const { Content } = Layout;
  const [user, setUser] = useState(undefined);
  const { auth, logout, setReloadUser } = useAuth();
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

  return <div>almacenes</div>;
};

export default Stores;
