import React, { useState, createContext, useEffect,} from 'react'
import { useHistory } from "react-router-dom";
import  useAuth  from '../hooks/useAuth';
import { getMeApi } from '../api/user'

export const StoreContext = createContext();

export const StoreProvider = (props) => {

  const [user, setUser] = useState(undefined);
  const { auth, logout } = useAuth();
  // const history = useHistory();
  useEffect(() => {
    (async () => {
      const response = await getMeApi(logout);
      setUser(response);
    })();
  }, [auth, logout]);

  // if (user === undefined) return null;
  // if (!auth && !user) {
  //   history.replace("/");
  //   return null;
  // }

  return (
    <StoreContext.Provider value={
      [user, setUser]
    }>
      {props.children}
    </StoreContext.Provider>
  )
}