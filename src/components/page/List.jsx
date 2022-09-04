import { lazy } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import userInfoState from "../../state/userInfoState";
import listPageState from "../../state/listPageState";

import styled from "styled-components";
import shortid from "shortid";
import Button from "../ui/Button";

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
  const userId = localStorage.getItem("userId");
  const userInfo = useRecoilValue(userInfoState(userId));

  const [page, setPage] = useRecoilState(listPageState);

  const incrementHandler = (e) => {
    setPage({
      ...page,
      [e.target.name]: Number(e.target.value) + 1,
    });
    console.log(e.target.value);
  };

  const decrementHandler = (e) => {
    if (e.target.value <= 1) return;
    setPage({
      ...page,
      [e.target.name]: Number(e.target.value) - 1,
    });
  };

  let niceMgs = true;
  if (userInfo.nice.length === 0) {
    niceMgs = false;
  }

  let badMgs = true;
  if (userInfo.bad.length === 0) {
    badMgs = false;
  }

  return (
    <div>
      <Container>
        <Title>My Nice Joke List</Title>
        <Card>
          {!niceMgs && <p>No Joke</p>}
          {niceMgs &&
            userInfo.nice.map((el) => (
              <ListItem key={shortid.generate()} niceItem={el} />
            ))}
          <div>
            <Button name="nice" value={page.nice} onClick={decrementHandler}>
              &#8249;
            </Button>
            <span>{page.nice}</span>
            <Button name="nice" value={page.nice} onClick={incrementHandler}>
              &#8250;
            </Button>
          </div>
        </Card>
      </Container>
      <Container>
        <Title>My Bad Joke List</Title>
        <Card>
          {!badMgs && <p>No Joke</p>}
          {badMgs &&
            userInfo.bad.map((el) => (
              <ListItem key={shortid.generate()} badItem={el} />
            ))}
          <div>
            <Button name="bad" value={page.bad} onClick={decrementHandler}>
              &#8249;
            </Button>
            <span>{page.bad}</span>
            <Button name="bad" value={page.bad} onClick={incrementHandler}>
              &#8250;
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default List;
