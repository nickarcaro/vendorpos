import { useState, useEffect, useMemo, useCallback } from "react";
import "./less/App.less";
import Navigation from "./config/Navigation";
import AuthContext from "./context/AuthContext";
import { setToken, getToken, removeToken } from "./api/token";
import jwtDecode from "jwt-decode";

function App() {
  const [auth, setAuth] = useState(null);
  const [reloadUser, setReloadUser] = useState(false);
  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser]);

  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id,
    });
    window.location.replace("/pos");
  };

  const logout = useCallback(() => {
    if (auth) {
      removeToken();
      setAuth(null);
      window.location.replace("/");
    }
  }, [auth, setAuth]);

  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth, logout]
  );

  return (
    <AuthContext.Provider value={authData}>
      <Navigation />
    </AuthContext.Provider>
  );
}

export default App;

/*   explicacion sistema de ruteo: 

<Route 

parametros: 

path: string ""
component: Nodo de componente 
exact : bolean



se añaden en ciclo for
[
 {
  
path:  ""
component: pagina 
exact : true

}
 {
  
path:  "/cuenta"
component: Account 
exact : true

}
 {
  
path:  "/payment"
component: pagina 
exact : true

}
 {
  
path:  ""
component: pagina 
exact : true

}
 {
  
path:  ""
component: pagina 
exact : true

}

]

*/
