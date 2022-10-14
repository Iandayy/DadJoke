import { lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = lazy(() => import("../ui/Button"));

const Head = styled.header`
  margin: 10px 20px;
  padding: 10px;
`;

const Logo = styled.h1`
  cursor: pointer;
  color: #fee440;
`;

const Container1 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 55px;
  span {
    text-align: end;
  }
`;

const Container2 = styled.div`
  display: flex;
  justify-content: end;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
`;

const Nav = styled.nav`
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

const Alias = styled.span`
  text-align: end;
  margin-right: 10px;
  padding: 5px;
  border-top: 1px solid #dcdcdc;
  font-size: small;
`;

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  const login = localStorage.getItem("login");
  const alias = localStorage.getItem("userAlias");

  const navigate = useNavigate();

  const homeHandler = () => {
    navigate("/");
  };

  const loginHandler = () => {
    navigate("/login");
  };

  const signupHandler = () => {
    navigate("/signup");
  };

  const logoutHandler = () => {
    localStorage.clear();
    alert("You are logged out.");
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
      <Container1>
        {login && (
          <>
            <Nav>
              <img
                onClick={menuHandler}
                src="https://img.icons8.com/external-jumpicon-line-ayub-irawan/32/000000/external-hamburger-basic-ui-jumpicon-line-jumpicon-line-ayub-irawan.png"
                alt=""
              />
              {isVisible && (
                <Ul>
                  <li onClick={() => navigate("/")}>Home</li>
                  <li onClick={() => navigate("/joke")}>Joke</li>
                  <li onClick={() => window.location.replace("/list")}>List</li>
                </Ul>
              )}
            </Nav>
            <Info>
              <Alias>{alias}</Alias>
              <Button onClick={logoutHandler}>logout</Button>
            </Info>
          </>
        )}
      </Container1>
      <Container2>
        {!login && (
          <>
            <Button onClick={loginHandler}>login</Button>
            <Button onClick={signupHandler}>signup</Button>
          </>
        )}
      </Container2>
    </Head>
  );
};

export default Header;
