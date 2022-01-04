import { Badge } from '@material-ui/core'
import { Search, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import {Link } from "react-router-dom"
import { useSelector } from 'react-redux'


const Container = styled.div`
    height: 60px;
    ${mobile({ height: "50px"})}
`

const Wrapper = styled.div`
    padding : 10px 20px; /* 10px for top/bottom 20px for left/right */
    display: flex;
    justify-content: space-between;
    ${mobile({ padding: "10px 0px"})}
`

//inorder to prevent overlapping of navbar sections we specify equal space for each
//we can do this by writing flex 1
const Left = styled.div`
 flex: 1;
 display: flex;
 align-items: center;
`
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
    ${mobile({ display: "none"})}
`

const SearchContainer = styled.div`

    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
    ${mobile({ marginLeft: "15px"})}
`

const Input = styled.input`
    border: none; /*it takes away default view of border but when you click on input border comes back  */
    ${mobile({ width: "50px"})}


    `
const Center = styled.div`
 flex: 1;
 text-align: center;
`
const Logo = styled.h1`
    font-weight: bold;
    ${mobile({ fontSize: "20px"})}
`
const Right = styled.div`
 flex: 1;
 display: flex;
 align-items: center;
 justify-content: flex-end; /*this places the element to the end  */
 ${mobile({ flex: 2,  justifyContent: "center" })}
`

const MenuItem =styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
    ${mobile({ fontSize: "12px", marginLeft: "10px"})}



`



const Navbar = () => {

    const quantity = useSelector(state=> state.cart.quantity)
    return (
        <Container>
         <Wrapper>
             <Left>
                <Language>
                    EN
                </Language>
                <SearchContainer>
                    <Input placeholder="Search..."/>
                    <Search style={{color: "gray", fontSize:16 }} />
                </SearchContainer>
             </Left>
             <Center>
                <Link style={{color: "black", textDecoration: "none"}}to='/' >
                 <Logo>
                     IMMORTAL
                 </Logo>
                </Link>
             </Center>
             <Right>
                 <Link style={{color: "black", textDecoration: "none"}} to="/register">
                <MenuItem>REGISTER</MenuItem>
                </Link>
                <Link style={{color: "black", textDecoration: "none"}} to="/login">
                <MenuItem>SIGN IN</MenuItem>
                </Link>
                <Link style={{color:"black"}} to="/cart">
                <MenuItem>
                    <Badge badgeContent={quantity} color="secondary">
                    <ShoppingCartOutlined/>
                    </Badge>
                </MenuItem>
                </Link>
             </Right>
         </Wrapper>
        </Container>
    )
}

export default Navbar
