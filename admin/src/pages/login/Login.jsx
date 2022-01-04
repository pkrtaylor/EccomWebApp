import { Height } from '@material-ui/icons';
import React, {useState} from 'react'
import { useDispatch } from 'react-redux';                
import { login } from '../../redux/apiCalls';

//putting type password in the input, hides the password when typing
const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleClick = (e) =>{
        e.preventDefault(); //trying to pevent refreshing of page
        //send data to api

        login(dispatch, {username, password});
    }

    return (
        
        <div 
        style={{
             display:"flex", 
             alignItems:"center",
             flexDirection:"column", 
             justifyContent:"center",
             height:"100vh"}}>
            <input
            style={{padding:10, marginBottom:20}}
            type="text" 
            placeholder='username' 
            onChange={e=>setUsername(e.target.value)}
            />
            <input 
            style={{padding:10, marginBottom:20}}
            type="password" 
            placeholder='password'
            onChange={e=>setPassword(e.target.value)}
            />
           
            <button
            style={{padding:10, width:"100px", cursor:"pointer"}}
             onClick={handleClick}>Login</button>
             
        </div>
    )
}

export default Login
