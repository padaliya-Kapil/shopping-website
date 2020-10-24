import React,{useState,useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'
import axios from 'axios';

import Product from '../components/Product'


const HomeScreen = () => {
    const [products,setProducts] = useState([]); // hook

    useEffect(()=>{
        const fetchProducts = async() =>{
            const {data} = await axios.get('/api/products') ///** data === res.data we're using destructing here */
            setProducts(data);
        }
        fetchProducts() // calling function
    },[]) // runs as soon as the page loads
    //asuync await creates a promise


    return (
        <>
        <h1>Latest Products</h1>
        <Row>
    {/* //Looping through all the products in products.js */}
            {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                    <Product product = {product}></Product>
                 </Col>
            ))}
            
        </Row>
        </>
    )
}

export default HomeScreen
