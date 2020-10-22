import React from 'react';
import Footer from './components/Footer'
import {Container} from 'react-bootstrap'
import Header from './components/Header'


const App=() => {
  return (
    
    <>
     <Header/>
    <main className='py-3'>
     
      <Container>
      <h1>Hello Welcome</h1>
      </Container>
     
    </main>
    <Footer/>
    </>
  );
}


export default App;
