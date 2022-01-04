import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'

const Container = styled.div`
    display: flex;
    ${mobile({ flexDirection: "column"})}

`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;


`

const Logo = styled.h1`


`
const Desc = styled.p`
    margin: 20px 0px;

`
const SocialContainer = styled.div`
    display: flex;
  


`
const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #${props => props.color };
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px; /* at first i had regular margin an dit made he first icon move aswell, but with margin right first icon stays in place while space is added to the right inbetween each icon */     */
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover{
        transform: scale(1.1);
    }
`
const Center = styled.div`
    flex: 1;
    padding: 20px;

`

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`

const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;

`

const Title = styled.h3`
    margin-bottom: 30px;

`
const Right = styled.div`
    flex: 1;
    padding: 20px;
`
const ContactItem =styled.div`
    margin-bottom: 20px;
    display: flex;
    align=items: center;



`
const Payment =styled.img`
    width: 50%;
`
const Footer = () => {
    return (
      <Container>
          <Left>
            <Logo>IMMORTAL</Logo>
            <Desc>There are many variation sof passages of Lorem Ipsum available, but 
                the majority have sufferd alteration in some form, by injected 
                humor, or randomised words which dont look even slighlty beleivable
            </Desc>
            <SocialContainer>
                <SocialIcon color="3B5999">
                    <Facebook />
                </SocialIcon>
                <SocialIcon color="E4405F">
                    <Instagram />
                </SocialIcon>
                <SocialIcon color="55ACEE">
                    <Twitter />
                </SocialIcon>
                <SocialIcon color="E60023">
                    <Pinterest />
                </SocialIcon>
            </SocialContainer>
          </Left>
          <Center>
            <Title>
                Useful Links
            </Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Men's Fashion</ListItem>
                <ListItem>Woman's Fashion</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>My Account</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Terms</ListItem>
            </List>
          </Center>
          <Right>
            <Title>Contact</Title>
            <ContactItem>
                <Room style={{marginRight: "10px"}}/>
                New York, NY
            </ContactItem>
            <ContactItem>
                <Phone style={{marginRight: "10px"}}/>
                + 000 000 0000
            </ContactItem>
            <ContactItem>
                <MailOutline style={{marginRight: "10px"}} />
                contact@immortal.gmail.com
            </ContactItem>
            <Payment src ="https://i.ibb.co/Qfvn4z6/payment.png" />
          </Right>
      </Container>
    )
}

export default Footer
