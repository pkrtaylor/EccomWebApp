
import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import Products from '../components/Products'
import { mobile } from '../responsive'

const Container = styled.div`


`
const Title = styled.h1`
    margin: 20px;


`
const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between; /* this alone placed filter2 to the other end of the page/container   */

`
const Filter = styled.div`
    margin: 20px;
    ${mobile({ margin: "0px 24px", display: "flex", flexDirection: "column" })}

`

const FilterText = styled.span`
    font-size: 20px;
    font-weight: 600;
    margin-right: 20px;
    ${mobile({ marginRight: "0px", fontSize: "17px"})}

`

const Select = styled.select`
    padding: 10px;
    margin-right: 20px;
    ${mobile({ margin:"10px 0px"})}
`

const Option = styled.option`


` 
const ProductList = () => {

    const location = useLocation();
    const cat = location.pathname.split("/")[2];
    const [filters, setFilters] = useState({});
    const [sort, setSort] = useState("newest")
    //this fucntion allows us to access our picked filter values
    const handleFilters = (e) =>{
        const value = e.target.value; // the value picked in the select element 
        setFilters({
            ...filters,
            //e.target.name represents a in the select elements which are filters
            [e.target.name]: value, //filter value with variable is saved in object
        });
    }

 
    return (
       <Container>
           <Navbar />
           <Announcement/>
           <Title>{cat}</Title>
            <FilterContainer>
                <Filter>
                    <FilterText>Filter Products:</FilterText>
                    <Select name="color" onChange={handleFilters}>
                        <Option disabled selected>
                            Color
                        </Option>
                        <Option>white</Option>
                        <Option>black</Option>
                        <Option>red</Option>
                        <Option>blue</Option>
                        <Option>yellow</Option>
                        <Option>green</Option>
                    </Select>
                    <Select name="size" onChange={handleFilters}>
                        <Option disabled selected>
                            Size
                        </Option>
                        <Option>XS</Option>
                        <Option>S</Option>
                        <Option>M</Option>
                        <Option>L</Option>
                        <Option>XL</Option>
                    </Select>
                </Filter>
                <Filter>
                    <FilterText>Sort Products:</FilterText>
                    <Select onChange={(e) => setSort(e.target.value)}>
                        <Option value="newest">Newest</Option>
                        <Option value="asc">Price (Low to High))</Option>
                        <Option value="desc">Price (High to low)</Option>
                    </Select>
                </Filter>
            </FilterContainer>
            <Products cat={cat} filters={filters} sort={sort}/>
            <Newsletter/>
            <Footer/>
       </Container>
    )
}

export default ProductList
