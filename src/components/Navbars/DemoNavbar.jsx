import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from "reactstrap";
import { useDispatch, useSelector} from 'react-redux';
import routes from "routes.js";
import IconKanban from 'assets/img/icon-kanban.svg'
import IconKanbanSelected from 'assets/img/icon-kanban-selected.svg'
import IconList from 'assets/img/icon-list.svg'
import IconListSelected from 'assets/img/icon-list-selected.svg'

function Header (props) {
  const dispatch = useDispatch();
  const { typeSolicitacao } = useSelector(state => state.info)
  const [ st, setState ] = useState({
    isOpen: false,
    dropdownOpen: false,
    color: 'transparent',
  })

  const sidebarToggle = useRef();
  
 function toggle() {
    const { isOpen } = st
    isOpen ? setState({...st, color: "transparent" }) :  setState({...st, color: "dark" });

    setState({...st, isOpen: !isOpen });
  }

  function dropdownToggle(e) {
    setState({...st, dropdownOpen: !st.dropdownOpen });
  }

 function getBrand() {
    let brandName = null;

    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });

    return brandName;
  }

  function openSidebar() {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  }
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  
  useEffect(() => {
    window.addEventListener("resize", updateColor(this));
    function updateColor() {
      if (window.innerWidth < 993 && st.isOpen) {
        setState({...st, color: "dark" });
      } else {
        setState({...st, color: "transparent" });
      }
    }
  },[st]) 
    
  useEffect((e) => {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  },[])

    const { color, isOpen, dropdownOpen } = st;
    const { pathname } = props.location;

    return (
      // add or remove classes depending if we are on full-screen-maps page or not
      <Navbar
        color={
          pathname.indexOf("full-screen-maps") !== -1
            ? "dark"
            : color
        }
        expand="lg"
        className={
          pathname.indexOf("full-screen-maps") !== -1
            ? "navbar-absolute fixed-top"
            : "navbar-absolute fixed-top " +
              (color === "transparent" ? "navbar-transparent " : "")
        }
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={sidebarToggle}
                className="navbar-toggler"
                onClick={() => openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="/">{getBrand()}</NavbarBrand>
          </div>
          
          <NavbarToggler onClick={toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <Collapse
            isOpen={isOpen}
            navbar
            className="justify-content-between"
          >
            <div></div>
            <div>
              {typeSolicitacao === 'kanban' ? (
                <>
                  <img src={IconKanbanSelected} alt="Kanban" onClick={() => dispatch({type: 'SET_INFO', payload: {typeSolicitacao: 'kanban'}})} className="mx-3 "  style={{cursor: 'pointer'}}/>
                  <img src={IconList} alt="List" onClick={() => dispatch({type: 'SET_INFO', payload: {typeSolicitacao: 'list'}})}  style={{cursor: 'pointer'}}/>
                </>
                ): (
                  <>
                    <img src={IconKanban} alt="Kanban" onClick={() => dispatch({type: 'SET_INFO', payload: {typeSolicitacao: 'kanban'}})} className="mx-3 "  style={{cursor: 'pointer'}}/>
                    <img src={IconListSelected} alt="List" onClick={() => dispatch({type: 'SET_INFO', payload: {typeSolicitacao: 'list'}})}  style={{cursor: 'pointer'}}/>
                  </>
              )}
            </div>
            <div className="d-flex">
            <form>
              <InputGroup className="no-border">
                <Input placeholder="Search..." />
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                    <i className="nc-icon nc-zoom-split" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </form>
            <Nav navbar>
              <NavItem>
                <Link to="#pablo" className="nav-link btn-magnify">
                  <i className="nc-icon nc-layout-11" />
                  <p>
                    <span className="d-lg-none d-md-block">Stats</span>
                  </p>
                </Link>
              </NavItem>
              <Dropdown
                nav
                isOpen={dropdownOpen}
                toggle={e => dropdownToggle(e)}
              >
                <DropdownToggle caret nav>
                  <i className="nc-icon nc-bell-55" />
                  <p>
                    <span className="d-lg-none d-md-block">Some Actions</span>
                  </p>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag="a">Action</DropdownItem>
                  <DropdownItem tag="a">Another Action</DropdownItem>
                  <DropdownItem tag="a">Something else here</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <NavItem>
                <Link to="#pablo" className="nav-link btn-rotate">
                  <i className="nc-icon nc-settings-gear-65" />
                  <p>
                    <span className="d-lg-none d-md-block">Account</span>
                  </p>
                </Link>
              </NavItem>
            </Nav>
            </div>
          </Collapse>
        </Container>
      </Navbar>
    );
  }

export default Header;