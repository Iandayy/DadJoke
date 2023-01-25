import { lazy } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import shortid from "shortid";
import jokeState from "../../state/jokeState";

const ListItem = lazy(() => import("./LIstItem"));

const Title = styled.h2`
  margin-left: 40px;
`;

const Card = styled.div`
  border-radius: 10px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  margin: 40px;
  padding: 20px;
  /* height: 50vh; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const Container = styled.section`
  button {
    width: 30px;
    height: 30px;
  }
  span {
    padding: 10px;
  }
`;

const List = () => {
  const jokes = useRecoilValue(jokeState);
  return (
    <div>
      <Container>
        <Title>My Nice Joke List</Title>
        <Card>
          {jokes.nice.length === 0 && <p>No Joke.</p>}
          {jokes.nice.length > 0 &&
            jokes.nice.map((joke) => (
              <ListItem key={shortid()} niceJoke={joke} />
            ))}
        </Card>
      </Container>
      <Container>
        <Title>My Bad Joke List</Title>
        <Card>
          {jokes.bad.length === 0 && <p>No Joke.</p>}
          {jokes.bad.length > 0 &&
            jokes.bad.map((joke) => (
              <ListItem key={shortid()} badJoke={joke} />
            ))}
        </Card>
      </Container>
    </div>
  );
};

export default List;
