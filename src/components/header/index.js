import { StyledHeader, StyledNavbarContainer } from "./styles";
import Logo from "../logo";
import Navbar from "./navbar";
import NavbarItem from "./navbar-item";
import { useRef, useState } from "react";
import { GrClose } from "react-icons/gr";
import { headerLinks, linkTypes } from "../../config/header-links";
import { StyledSlider } from "./styles";

function Header() {
  const [active, setActive] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  const sliderRef = useRef(null);

  const handleMouseHover = (e) => {
    const currentElement = e.target;
    if (currentElement.id !== "nav-item") return;
    setShowSlider(true);
    const left = currentElement.getBoundingClientRect().left;
    sliderRef.current.style.width = `${currentElement.offsetWidth}px`;
    sliderRef.current.style.height = `${currentElement.offsetHeight}px`;
    sliderRef.current.style.left = `${left}px`;
  };

  return (
    <StyledHeader
      onMouseMove={(e) => handleMouseHover(e)}
      onMouseLeave={() => setShowSlider(false)}
    >
      <Logo />
      <StyledSlider ref={sliderRef} show={!active && showSlider} />
      <StyledNavbarContainer className={active ? "active" : ""}>
        <Navbar>
          {headerLinks
            .filter((link) => link.type === linkTypes.CENTER)
            .map(({ name, href }) => (
              <NavbarItem key={name} href={href}>
                {name}
              </NavbarItem>
            ))}
        </Navbar>
        <Navbar>
          {headerLinks
            .filter((link) => link.type !== linkTypes.CENTER)
            .map(({ name, href, type }) => (
              <NavbarItem key={name} href={href} type={type}>
                {name}
              </NavbarItem>
            ))}
          <NavbarItem id="menu" onClick={() => setActive(!active)}>
            Menu
          </NavbarItem>
        </Navbar>
        <GrClose id="close" onClick={() => setActive(false)} />
      </StyledNavbarContainer>
    </StyledHeader>
  );
}

export default Header;
