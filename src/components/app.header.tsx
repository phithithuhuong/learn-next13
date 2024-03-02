"use client"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link'
function AppHeader() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Link href="/" className='nav-link'>
          <Navbar.Brand>Home</Navbar.Brand>
        </Link>

        <Nav className="me-auto">
          <Link href="/table" className='nav-link'>Table</Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AppHeader;