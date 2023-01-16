import { lazy, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import styled from "styled-components";
import randomColorState from "../../state/randomColorState";
import oneUserState from "../../state/oneUserState";

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

const Joke = () => {
  const userId = localStorage.getItem("userId");
  const randomColor = useRecoilValue(randomColorState);

  const [joke, setJoke] = useState("");
  const [isOk, setIsOk] = useState(false);
  const [choice, setChoice] = useState("");
  const setUserInfo = useSetRecoilState(oneUserState);
  const userInfo = useRecoilValue(oneUserState);

  const getDadJoke = async () => {
    try {
      const config = { headers: { Accept: "application/json" } };
      const res = await axios.get("https://icanhazdadjoke.com/", config);
      return res.data.joke;
    } catch {
      return "No Joke, sorry";
    }
  };

  const addNewJoke = async () => {
    const jokeText = await getDadJoke();
    setJoke(jokeText);
    const res = await axios.get(`http://localhost:8080/userInfo/${userId}`);
    setUserInfo(res.data);
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
      ...userInfo,
      nice: [...userInfo.nice, joke],
    };
    await axios.patch(`http://localhost:8080/userInfo/${userInfo.id}`, item);
  };

  const badHandler = async () => {
    if (joke.trim() === "") return;

    setChoice("bad");
    setTimeout(() => {
      setChoice("");
    }, 2000);

    let item = {
      ...userInfo,
      bad: [...userInfo.bad, joke],
    };

    await axios.patch(`http://localhost:8080/userInfo/${userInfo.id}`, item);
  };

  return (
    <Main>
      <Title style={{ color: randomColor }}>Dad Joke 🤣</Title>
      <Card>
        <JokeItem onClick={jokeHandler}>{joke} :)</JokeItem>
        {isOk && (
          <>
            <SelectBtn>
              <img
                onClick={niceHandler}
                src="https://img.icons8.com/external-creatype-outline-colourcreatype/64/000000/external-good-marketplace-outline-creatype-outline-colourcreatype.png"
                alt="nice"
              />
              <img
                onClick={badHandler}
                src="https://img.icons8.com/external-creatype-outline-colourcreatype/64/000000/external-bad-marketplace-outline-creatype-outline-colourcreatype.png"
                alt="bad"
              />
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
