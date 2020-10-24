import React from 'react'
import {Navbar , Nav, Container} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'

const Header = () => {
    return (
       <header> 
           <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
               <Container>
                 <LinkContainer to='/'>
          <Navbar.Brand>Kay-Shop</Navbar.Brand>
                </LinkContainer>
    
       <Nav className="ml-auto">    {/* margin left auto   */}

       <LinkContainer to='/car'>
         <Nav.Link ><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
         </LinkContainer>

         <LinkContainer to='/login'>
         <Nav.Link ><i className='fas fa-user'></i>Sign In</Nav.Link>
         </LinkContainer>
       </Nav>
       </Container>
     </Navbar>
     </header>
    )
}

export default Header
