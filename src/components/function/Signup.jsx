import { lazy, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import styled from "styled-components";
import shortid from "shortid";
import usersAllState from "../../state/usersAllState";
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

const Signup = () => {
  const [input, setInput] = useState({
    alias: "",
    key: "",
  });

  const users = useRecoilValue(usersAllState);
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

    for (let el of users) {
      if (el.alias === input.alias) {
        serErr("A alias that already exists.");
        setTimeout(() => {
          serErr("");
        }, 2000);
        setInput({
          alias: "",
          key: "",
        });
        return;
      }
    }

    let item = {
      id: shortid.generate(),
      alias: input.alias,
      key: input.key,
      nice: [],
      bad: [],
    };
    try {
      await axios.post("http://localhost:3001/userInfo", item);
      alert("Congratulations on your membership !");
      window.location.replace("/login");
    } catch {
      console.log("err");
    }

    setInput({
      alias: "",
      key: "",
    });
  };
  return (
    <Card>
      <Form onSubmit={submitHandler}>
        <h2>Sign Up</h2>
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

export default Signup;
