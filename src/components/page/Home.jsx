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

const Title = styled.p`
  cursor: pointer;
`;

const Img = styled.img`
  width: 80%;
  border-radius: 20px;
`;

const Home = () => {
  const setRandomColor = useSetRecoilState(randomColorState);
  const randomColor = useRecoilValue(randomColorState);

  const randomColorHandler = () => {
    setRandomColor("#" + Math.round(Math.random() * 0xffffff).toString(16));
  };
  return (
    <Main>
      <Title style={{ color: randomColor }} onClick={randomColorHandler}>
        Start Dad Joke, haha
      </Title>
      <Img src="https://images.unsplash.com/photo-1526297003708-f5a1c2c9c6e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" />
    </Main>
  );
};

export default Home;
