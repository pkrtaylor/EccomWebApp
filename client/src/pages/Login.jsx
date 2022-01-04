import React, {useState} from 'react'
import styled from 'styled-components'
import { login } from '../redux/apiCalls'
import { mobile } from '../responsive'
import { useDispatch, useSelector } from 'react-redux'


const Container = styled.div`
    width: 100vw; /* we do this because it will be a full screen component */
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5), 
        rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940") 
    center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
    

`

const Wrapper = styled.div`
        padding: 20px;
        width: 25%;
        background-color: white;
        ${mobile({ width: "75%" })}

`
const Title = styled.h1`
        font-size: 24px;
        font-weight: 300;

`
const Form = styled.form`
        display: flex;
        flex-direction: column;
        


`
const Input = styled.input`
        flex: 1;
        min-width: 40%;
        margin: 10px 0px;
        padding: 10px;


`
const Button = styled.button`
        width: 40%;
        background-color: teal;
        border: none;
        cursor: pointer;
        padding: 15px 20px;
        margin-bottom: 10px;

        &:disabled{
            background-color: lightgrey;
            cursor: not-allowed;
        }
        

`

const Link = styled.a`
        margin: 5px 0px;
        font-size: 12px;
        text-decoration: underline;
        cursor: pointer;
`
const Error = styled.span`
        color: red;
`

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const {isFetching, error } = useSelector((state) => state.user);

    //we use the e for event because we want to prevent the page from reloading wehn we click on the button before authentication is done
    const handleClick = (e) => {
        e.preventDefault();
        login(dispatch, {username, password});
    }
    return (
       <Container>
           <Wrapper>
               <Title>SIGN IN</Title>
               <Form>
                   <Input placeholder="username"
                          onChange={(e) => setUsername(e.target.value)} required />
                   <Input placeholder="password"
                          type= "password"
                          onChange={(e) => setPassword(e.target.value)} required />
                   <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
                   {error && <Error>Please try again...</Error>}
                   <Link>YOU FORGOT YOUR PASSWORD?</Link>
                   <Link>CREATE A NEW ACCOUNT</Link>
               </Form>
           </Wrapper>
       </Container>
    )
}

export default Login
