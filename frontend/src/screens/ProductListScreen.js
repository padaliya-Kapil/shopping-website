import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Table, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { createProduct, deleteProduct, listProducts } from '../actions/productActions.js';
import {PRODUCT_CREATE_RESET} from '../constants/productConstants'

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingProduct,
    error: errorProduct,
    success: successCreate,
    product : createdProduct
  } = productCreate;

  useEffect(() => {
    if(!userInfo || !userInfo.isAdmin) {
      history.push('/login')
    }
    dispatch({type : PRODUCT_CREATE_RESET})
    if(successCreate){
      history.push(`/admin/product/${createdProduct._id}`)
    }
   
      dispatch(listProducts());
  
  }, [dispatch, history, userInfo , successDelete , successCreate,createProduct] );

  const createProductHandler = () => {
    dispatch(createProduct())
  };

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure to delete the product ?')) {
      dispatch(deleteProduct(id));
    }
  };
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            <i className='fas fa-plus'></i> Create Product
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader/>}
      {errorDelete && <Message variant = 'danger'>{errorDelete}</Message>}

      {loadingProduct && <Loader/>}
      {errorProduct && <Message variant = 'danger'>{errorProduct}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>BRAND</th>
              <th> </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <LinkContainer to={`/admin/product/${product._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    className='btn-sm'
                    variant='danger'
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
