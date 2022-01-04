import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    height: 30px;
    color: white;
    background-color: teal;
    display: flex;
    align-items: center; /*This will center items horizontally */
    font-weight: 500px;
    justify-content: center; /*This will center items vertically */
    font-size: 14px;

`


const Announcement = () => {
    return (
        <Container>
            Super Deal! Free Shipping on Orders Over $50
        </Container>
    )
}

export default Announcement
