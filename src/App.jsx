import { BrowserRouter, Routes,Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar.jsx";
import Body from "./components/Body.jsx";
import Login from "./components/Login.jsx";
import Profile from "./components/Profile.jsx";
import { Provider } from "react-redux";
import appStore from "./utils/appStore.js";
import Feed from "./components/Feed.jsx";
import Connections from "./components/Connections.jsx";
import Requests from "./components/Requests.jsx";
import Signup from "./components/Signup.jsx";
import Shipping from "./components/Shipping.jsx";
import TermsAndConditions from "./components/TermsAndConditions.jsx";
import Privacy from "./components/Privacy.jsx";
import ContactUs from "./components/ContactUs.jsx";
import Refunds from "./components/Refunds.jsx";

function App() {
  return (
   <>
     <Provider store={appStore}>
 
    <BrowserRouter basename="/">
      <Routes>
        <Route path='/' element={<Body/>}>
        <Route path='/' element={<Feed/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/> 
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/connections' element={<Connections/>}/>
          <Route path='/requests' element={<Requests/>}/>
          <Route path='/shipping' element={<Shipping/>}/>
          <Route path='/terms&conditions' element={<TermsAndConditions/>}/>
          <Route path='/privacy' element={<Privacy/>}/>
          <Route path='/contactus' element={<ContactUs/>}/>
          <Route path='/refunds' element={<Refunds/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
   </>
  );
}

export default App;
