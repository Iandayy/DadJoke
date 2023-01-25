import { useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import randomColorState from "../state/randomColorState";
import smaile from "../images/smile.jpg";

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
      <Img src={smaile} alt="smaile Img" />
      <StartBtn style={{ color: randomColor }} onClick={jokePageHandler}>
        Start Dad Joke, Go go
      </StartBtn>
    </Main>
  );
};

export default Home;
