import React from 'react'
import {Navbar , Nav, Container} from 'react-bootstrap'

const Header = () => {
    return (
       <header> 
           <Navbar bg="primary" variant="dark">
               <Container>
       <Navbar.Brand href="#home">Kay-Shop</Navbar.Brand>
    
       <Nav className="ml-auto">    {/* margin left auto   */}
         <Nav.Link href="/cart"><i className='fas fa-shopping-cart'></i>Cart</Nav.Link>
         <Nav.Link href="/login"><i className='fas fa-user'></i>Sign In</Nav.Link>
       </Nav>
       </Container>
     </Navbar>
     </header>
    )
}

export default Header
