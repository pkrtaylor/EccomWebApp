import { FavoriteBorderOutlined, SearchOutlined, ShoppingCartOutlined } from '@material-ui/icons'
import React from 'react'
import styled from 'styled-components'
import {Link} from "react-router-dom"


const Info =styled.div`

    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;

`
const Container = styled.div`
    flex: 20%;
    margin: 5px;
    /* taking care of image size  */
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;

    &:hover ${Info}{
        opacity: 1;
    }
    `

const Circle =styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute; /* this will make the circle overlap, from prevoiuslu being next to pic because of flex */



`
const Image =styled.img`
    height: 75%;
    z-index: 2; /* the white circle is now behind the image */
`

const Icon =styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px; /* margin adds space between elements without ading padding */
    cursor: pointer;
    transition: all 0.5s ease;
    
    &:hover{
        background-color: #f5fbfd;
        transform: scale(1.1);

    }




`


const Product = ({item}) => {
    return (
        <Container>
                <Circle />
                <Image src={item.img}/>
                <Info>
                    <Icon>
                    <ShoppingCartOutlined/>
                    </Icon>
                    <Icon>
                        <Link style={{color:"black"}}to={`/product/${item._id}`}>
                            <SearchOutlined/>
                        </Link>
                    </Icon>
                    <Icon>
                    <FavoriteBorderOutlined/>
                    </Icon>
                </Info>
        </Container>
    )
}

export default Product
