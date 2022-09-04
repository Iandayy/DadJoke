import { lazy, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import userInfoState from "../../state/usersAllState";
import loginState from "../../state/loginState";
import errorState from "../../state/errorState";

const Button = lazy(() => import("../ui/Button"));
const Card = lazy(() => import("../ui/Card"));

const Form = styled.form`
  h2 {
    text-align: center;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 15px;
  padding: 5px;
  input {
    width: 25%;
    height: 3vh;
  }
  button {
    border: none;
    background-color: white;
    cursor: pointer;
  }
  span {
    color: #ff9f9f;
    text-align: center;
  }
`;

const Login = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    alias: "",
    key: "",
  });

  const setValue = useSetRecoilState(loginState);
  const value = useRecoilValue(userInfoState);
  const serErr = useSetRecoilState(errorState);
  const err = useRecoilValue(errorState);

  const valueChangeHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    setValue(input);

    setInput({
      alias: "",
      key: "",
    });

    return value.map((el) => {
      if (el.alias === input.alias && el.key === input.key) {
        localStorage.setItem("userId", el.id);
        localStorage.setItem("userAlias", el.alias);
        localStorage.setItem("login", true);

        alert(`welcome ! ${el.alias}`);
        navigate("/joke");
      } else {
        serErr("Please check your login information");
        setTimeout(() => {
          serErr("");
        }, 2000);
      }
      return true;
    });
  };
  return (
    <Card>
      <Form onSubmit={submitHandler}>
        <h2>Login</h2>
        <Section>
          <label htmlFor="alias">Alias : </label>
          <input
            id="alias"
            type="text"
            name="alias"
            value={input.alias}
            onChange={valueChangeHandler}
          />
        </Section>
        <Section>
          <label htmlFor="key">Secret Key : </label>
          <input
            id="key"
            type="password"
            name="key"
            value={input.key}
            onChange={valueChangeHandler}
          />
        </Section>
        <Section>
          <span>{err}</span>
        </Section>
        <Section>
          <Button>
            <img
              src="https://img.icons8.com/ios/50/000000/go.png"
              alt="login"
            />
          </Button>
        </Section>
      </Form>
    </Card>
  );
};

export default Login;
