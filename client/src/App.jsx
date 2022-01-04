import Home from './pages/Home'
import ProductList from './pages/ProductList';
import Product from './pages/Product';
import Register from './pages/Register';
import Login from './pages/Login';
import Cart from './pages/Cart';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate 
    } from "react-router-dom" //note to self Switch was replaced by Routes
import Success from './pages/Success';
import { useSelector } from 'react-redux';


const App = () => {
    // also In react-router-dom, you also not need to use exact in Route declaration.
    const user = useSelector(state=>state.user.currentUser);
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/product/:id" element={<Product/>} />
                <Route path="/products/:category" element={<ProductList/>} />
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />}/>
                <Route path="/register" element={user? <Navigate to="/" /> : <Register/>} />
                <Route path="/cart" element={<Cart/>} />
                <Route path="/success" element={<Success/>} />
            </Routes>
                
        </Router>
    )
}


export default App;
