import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import randomColorState from "../../state/randomColorState";

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 80px;
  font-size: xx-large;
`;

const Title = styled.button`
  border: none;
  background-color: white;
  font-size: large;
  cursor: pointer;
`;

const Img = styled.img`
  width: 70%;
  border-radius: 20px;
  margin: 20px;
`;

const StartBtn = styled.button`
  background-color: white;
  font-size: large;
  padding: 10px;
  border-radius: 20px;
  border-color: #fee440;
  cursor: pointer;
`;

const Home = () => {
  const navigation = useNavigate();
  const setRandomColor = useSetRecoilState(randomColorState);
  const randomColor = useRecoilValue(randomColorState);

  const randomColorHandler = () => {
    setRandomColor("#" + Math.round(Math.random() * 0xffffff).toString(16));
  };

  const jokePageHandler = () => {
    navigation("/joke");
  };
  return (
    <Main>
      <Title style={{ color: randomColor }} onClick={randomColorHandler}>
        Click Me, haha
      </Title>
      <Img src="https://images.unsplash.com/photo-1526297003708-f5a1c2c9c6e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
      <StartBtn style={{ color: randomColor }} onClick={jokePageHandler}>
        Start Dad Joke, Go go
      </StartBtn>
    </Main>
  );
};

export default Home;
