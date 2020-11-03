import React from 'react'
import {Navbar , Nav, Container, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

import {useDispatch , useSelector} from 'react-redux'
import {logout} from '../actions/userAction'

const Header = () => {

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin)
  const {userInfo} = userLogin

  const logoutHandler = () => {
    dispatch(logout() )
  }


    return (
       <header> 
           <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
               <Container>
                 <LinkContainer to='/'>
          <Navbar.Brand>Kay-Shop</Navbar.Brand>
                </LinkContainer>
    
       <Nav className="ml-auto">    {/* margin left auto   */}

       <LinkContainer to='/cart'>
         <Nav.Link ><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
         </LinkContainer>

         {userInfo ?(
          
             <LinkContainer to='/profile'>
               
                <NavDropdown title = {userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
               <NavDropdown.Item>Profile</NavDropdown.Item>
               </LinkContainer>
               <NavDropdown.Item onClick = {logoutHandler}> Log out</NavDropdown.Item>
               </NavDropdown>
             </LinkContainer>

         )
          :   <LinkContainer to='/login'>
          <Nav.Link ><i className='fas fa-user'></i>Sign In</Nav.Link>
          </LinkContainer>
          }

       
       </Nav>
       </Container>
     </Navbar>
     </header>
    )
}

export default Header
