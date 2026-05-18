

import Noaccess from "../components/Noaccess";
import Login from "../components/Login";
import Register from "../components/Register";
import Profile from "../components/Profile";
export default function PrivateRouter({user, children}) {
  

    if (user.isconnected ){
      return <Profile />;
    } else {
      return children;
    }

  
}