
import Topbar from './components/topbar/Topbar'
import './App.css'
import Home from './pages/home/Home';
import UserList from './pages/userList/UserList'
import Sidebar from './components/sidebar/Sidebar'
import {
  BrowserRouter as Router, 
  Redirect, 
  Route,
  Switch

} from 'react-router-dom'
import User from './pages/user/User';
import NewUser from './pages/newUser/NewUser';
import ProductList from './pages/productList/ProductList';
import Product from './pages/product/Product';
import NewProduct from './pages/newProduct/NewProduct';
import Login from './pages/login/Login';

function App() {

  const admin = JSON.parse(
    JSON.parse(localStorage.getItem("persist:root")).user
    ).currentUser.isAdmin && JSON.parse(
      JSON.parse(localStorage.getItem("persist:root")).user
      ).error === false;
    console.log(admin)
  return (
   <Router>
     
    <Switch>
    <Route path ="/login">
    {admin ? <Redirect to="/" /> : <Login/>}
    </Route>

     { admin && (<> 
      <Topbar/>
     
      <div className='container'>
      <Sidebar/>
      <Route exact path="/"  component={Home}/>
         <Route path="/users"  component={UserList}/>
         <Route path="/user/:userId"  component={User}/>
         <Route path="/newUser"  component={NewUser}/>
         <Route path="/products"  component={ProductList}/>
         <Route path="/product/:productsId"  component={Product}/>
         <Route path="/newProduct"  component={NewProduct}/>
      </div>
      </>)}
    </Switch>
   
   </Router>
  );
}

export default App;


/*<Topbar/>
     <div className="container">
       <Sidebar/>
        <Switch>
         <Route exact path="/"  component={Home}/>
         <Route path="/users"  component={UserList}/>
         <Route path="/user/:userId"  component={User}/>
         <Route path="/newUser"  component={NewUser}/>
         <Route path="/products"  component={ProductList}/>
         <Route path="/product/:productsId"  component={Product}/>
         <Route path="/newProduct"  component={NewProduct}/>
         <Route path="/login"  component={Login}/>
        </Switch>
     </div>

     */