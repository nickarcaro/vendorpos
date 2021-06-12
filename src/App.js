import "./less/App.less";
import Navigation from "./config/Navigation";
import AuthContext from "./context/AuthContext";
import ExampleContext from "./context/ExampleContext";
function App() {
  return (
    <ExampleContext.Provider value>
      <AuthContext.Provider>
        <Navigation />
      </AuthContext.Provider>
    </ExampleContext.Provider>
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
