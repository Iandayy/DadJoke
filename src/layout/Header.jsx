import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Head = styled.header`
  margin: 10px 20px;
  padding: 10px;
`;

const Logo = styled.h1`
  cursor: pointer;
  color: #fee440;
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  span {
    text-align: end;
  }
`;

const NavIcon = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  img {
    cursor: pointer;
    width: 40px;
    height: 40px;
  }
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  padding-left: 20px;
  li {
    padding-right: 10px;
    cursor: pointer;
    @media screen and (max-width: 390px) {
      font-size: 15px;
    }
  }
`;

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();

  const homeHandler = () => {
    navigate("/");
  };

  const menuHandler = () => {
    setIsVisible((prev) => !prev);
  };
  return (
    <Head>
      <Logo>
        <em onClick={homeHandler}>Dad Joke</em>
      </Logo>
      <Nav>
        <NavIcon>
          <img
            onClick={menuHandler}
            src="https://img.icons8.com/external-jumpicon-line-ayub-irawan/32/000000/external-hamburger-basic-ui-jumpicon-line-jumpicon-line-ayub-irawan.png"
            alt=""
          />
          {isVisible && (
            <Ul>
              <li onClick={() => navigate("/")}>Home</li>
              <li onClick={() => navigate("/joke")}>Joke</li>
              <li onClick={() => navigate("/list")}>List</li>
            </Ul>
          )}
        </NavIcon>
      </Nav>
    </Head>
  );
};

export default Header;
