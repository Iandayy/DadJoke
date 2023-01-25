import { lazy, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import randomColorState from "../state/randomColorState";
import jokeState from "../state/jokeState";
import axios from "axios";
import good from "../images/good.png";
import bad from "../images/bad.png";

const Button = lazy(() => import("../ui/Button"));

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  button {
    width: 100px;
  }
`;

const Title = styled.p`
  font-size: xx-large;
`;

const Card = styled.div`
  border-radius: 10px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
  padding: 50px;
  margin: 30px;
  display: flex;
  flex-direction: column;
`;

const JokeItem = styled.p`
  cursor: pointer;
  font-size: large;
`;

const SelectBtn = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  img {
    cursor: pointer;
  }
`;

const Choice = styled.span`
  text-align: center;
  margin-top: 20px;
`;

const REACT_APP_JOKE_URL = "https://icanhazdadjoke.com";

const Joke = () => {
  const randomColor = useRecoilValue(randomColorState);
  const [userJoke, setUserJoke] = useRecoilState(jokeState);

  const [joke, setJoke] = useState("");
  const [isOk, setIsOk] = useState(false);
  const [choice, setChoice] = useState("");

  const getDadJoke = async () => {
    try {
      const config = { headers: { Accept: "application/json" } };
      const res = await axios.get(REACT_APP_JOKE_URL, config);
      return res.data.joke;
    } catch {
      return "No Joke, sorry";
    }
  };

  const addNewJoke = async () => {
    const jokeText = await getDadJoke();
    setJoke(jokeText);
  };

  const jokeHandler = () => {
    if (joke.trim() === "") return;
    setIsOk((prev) => !prev);
  };

  const niceHandler = async () => {
    if (joke.trim() === "") return;

    setChoice("nice");

    setTimeout(() => {
      setChoice("");
    }, 2000);

    let item = {
      ...userJoke,
      nice: [...userJoke.nice, joke],
    };
    setUserJoke(item);
  };

  const badHandler = async () => {
    if (joke.trim() === "") return;

    setChoice("bad");
    setTimeout(() => {
      setChoice("");
    }, 2000);

    let item = {
      ...userJoke,
      bad: [...userJoke.bad, joke],
    };

    setUserJoke(item);
  };

  return (
    <Main>
      <Title style={{ color: randomColor }}>Dad Joke 🤣</Title>
      <Card>
        <JokeItem onClick={jokeHandler}>{joke} :)</JokeItem>
        {isOk && (
          <>
            <SelectBtn>
              <img onClick={niceHandler} src={good} alt="nice Img" />
              <img onClick={badHandler} src={bad} alt="bad Img" />
            </SelectBtn>
            <Choice>
              {choice === "nice" && <span>(Choice Nice)</span>}
              {choice === "bad" && <span>(Choice Bad)</span>}
            </Choice>
          </>
        )}
      </Card>
      <Button onClick={addNewJoke}>Click Me !</Button>
    </Main>
  );
};

export default Joke;
