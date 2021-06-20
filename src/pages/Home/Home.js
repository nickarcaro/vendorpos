import LoginForm from "../../components/LoginForm";
import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { getMeApi } from "../../api/user";
import { useHistory } from "react-router-dom";
import { Layout, Button } from "antd";
const Home = () => {
  const [user, setUser] = useState(undefined);
  const { auth, logout, setReloadUser } = useAuth();
  const history = useHistory();

  if (auth) {
    history.replace("/pos");
    return null;
  }
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default Home;
