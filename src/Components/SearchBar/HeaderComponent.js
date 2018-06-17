import React , { Component } from 'react'
import { Navbar } from 'react-bootstrap'

const HeaderComponent =() =>{
    return (
        <Navbar >
            <Navbar.Header>
                <Navbar.Brand>
                    <a href="#">Locate People</a>
                </Navbar.Brand>
            </Navbar.Header>
        </Navbar>
        )
}

export { HeaderComponent }