import React from 'react'
import { Nav, NavItem, NavLink } from 'reactstrap';

const TopNavigation =()=>
  (
        <Nav>
          <NavItem>
            <NavLink href='/'>Strona startowa</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href='/rejestr'>Rejestr</NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink href='/konfiguracja'>Konfiguracja</NavLink>
          </NavItem> */}
          <NavItem>
            <NavLink href='/ustawienia'>Ustawienia</NavLink>
          </NavItem>
        </Nav>
   )

export default TopNavigation
