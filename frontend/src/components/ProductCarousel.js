import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image, Carousel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Loader from './Loader';
import Message from './Message';

import { listTopProducts } from '../actions/productActions';

const ProductCarousel = () => {
  const dispatch = useDispatch();
  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, products, error } = productTopRated;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <Carousel pause='hover'>
      {products.map((product) => (
        <Carousel.Item key={product._id} interval={1000}>
          <Link to={`/product/${product._id}`}>
            <img
              className='d-block w-50 h-50'
              src={product.image}
              alt={product.name}
            />
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
