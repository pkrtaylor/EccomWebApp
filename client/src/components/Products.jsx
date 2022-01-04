import React, {useEffect, useState} from 'react'
import styled from 'styled-components'
import { popularProducts } from '../data'
import Product from './Product'
import axios from 'axios'


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    
    
   

`






const Products = ({cat, filters, sort}) => {
    
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    useEffect(()=>{
        const getProducts = async () => {
            try {
                const res = await axios.get( 
                    cat 
                    ? `http://localhost:5000/api/products?category=${cat}` 
                    : "http://localhost:5000/api/products" 
                    );
               setProducts(res.data);
            } catch (err) {
                
            }
        }
        getProducts();
    }, [cat]);

    //if theres a cat then we setFilteredProducts
    //we take products and filter it,
    //we take each item and check whther those item include our filter or not
    //we take the key and value pairs from filters object and we try to match them with our products
    //remeber our products also have key value pair of color or size with their values just as filters array does
    //if item key includes the value we filter products
    useEffect( ()=>{
        cat && 
            setFilteredProducts(
                products.filter((item) => 
                    Object.entries(filters).every(([key, value]) => 
                        item[key].includes(value)
                        )
                      )
                    );
            
            }, [products, cat, filters]);

     useEffect(()=>{
         if(sort === "Newest") {
             setFilteredProducts((prev) => 
                [...prev].sort((a,b) => a.createdAt - b.createdAt));
         } else if(sort === "asc") {
            setFilteredProducts((prev) => 
            [...prev].sort((a,b) => a.price - b.price));
         } else {
            setFilteredProducts((prev) => 
            [...prev].sort((a,b) => b.price - a.price));
         }
     }, [sort])

    
    
    return (
        <Container>
            { cat 
                ? filteredProducts.map((item) => <Product item = {item} key={item._id} />)
                : products.slice(0,8).map((item) => <Product item = {item} key={item._id} />)
            }
        </Container>
    );
};

export default Products


//note to self the products werent showing up at first because the colors in the database we all lowercase while the options on client side had Capital