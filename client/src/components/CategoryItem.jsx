import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive'
import {Link} from "react-router-dom"



const Container = styled.div`
    flex: 1;
    margin: 3px; /* separtes the images a little bit */
    height: 70vh; /* specifying the height made all 3 items the same items */
    position: relative; /* not to self when i just had the position absolute in the child and not here the title and button went to the top left corner of screen */
`
const Image= styled.img`
    width:100%;
    height: 100%; 
    object-fit: cover; /*this gives the image a good fit ex if they are too stretch the cover fit will fix it  */
    ${mobile({ height: "30vh" })}

    `
const Info = styled.div`
    position: absolute; /* this allows us to move the elements anywhere in the conainter, ex the title and button were below the pic but now they are on top of it*/
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Title = styled.h1`
    color: white;
    margin-bottom: 20px;
`
const Button = styled.button`
    border: none;
    padding: 10px;
    background-color: white;
    cursor: pointer;
    font-weight: 600;
`

const CategoryItem = ({item}) => {
    return (
    
       <Container>
        <Link to={`/products/${item.cat}`}>
          <Image src={item.img} />
          <Info>
              <Title>{item.title}</Title>
              <Button>SHOP NOW</Button>
          </Info>
        </Link>
       </Container>
    )
}

export default CategoryItem
