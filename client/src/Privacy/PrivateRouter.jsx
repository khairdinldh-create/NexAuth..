

import Noaccess from "../components/Noaccess";
import Login from "../components/Login";
export default function PrivateRouter({user, children}) {
  

    if (user.isconnected ){
      return children;
    } else {
      return <Login />;
    }

  
}