import React ,{useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'

import {Link} from 'react-router-dom'
import {Row,Col,Image,ListGroup,Card,Button, ListGroupItem} from 'react-bootstrap'

import Loader from '../components/Loader'
import Message from '../components/Message'

import Rating from '../components/Rating'

import {listProductDetails} from '../actions/productActions.js'



const ProductScreen = ({match}) => {

    const dispatch = useDispatch();
    const productDetails = useSelector( state => state.productDetails)
    const {loading , error, product} = productDetails;


    useEffect(()=>{
            dispatch(listProductDetails(match.params.id));
    },[dispatch]) // runs as soon as the page loads
    //asuync await creates a promise

    return (
        <>

        
        <Link to='/' className='btn btn-light my-3'>Go Back</Link>  
        { loading ? <Loader/> :  error ? <Message variant='danger'>{error}</Message> : 

        <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid/>
            </Col>

            <Col md={3}>
                <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                          <Rating
                          value={product.rating}
                          text={`${product.numReviews} reviews`}
                          />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product.price}
                        </ListGroup.Item>
                        <ListGroupItem>
                        Description: {product.description}
                        </ListGroupItem>
                        
                </ListGroup>

            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <Row>
                                <Col>Price:</Col>
                                <Col>
                                    <strong>${product.price}</strong>
                                </Col>
                            </Row>
                        </ListGroupItem>

                    </ListGroup>

                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <Row>
                                <Col>Status</Col>
                                <Col>
                                    <strong>{product.countInStock > 0? 'In stock ' : 'Out of Stock'}</strong>
                                </Col>
                            </Row>
                        </ListGroupItem>
                        <ListGroupItem>
                            <Button 
                            className='btn-block' 
                            type='button'
                            disabled={product.countInStock === 0 }
                            >Add to Cart</Button>
                        </ListGroupItem>

                    </ListGroup>
                </Card>
            </Col>
            </Row>  
        }
        
        </>
    )
}

export default ProductScreen
