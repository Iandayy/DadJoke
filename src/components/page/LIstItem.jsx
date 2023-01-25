import { lazy, useState } from "react";
import { useRecoilState } from "recoil";

import styled from "styled-components";

import jokeState from "../../state/jokeState";

const Button = lazy(() => import("../ui/Button"));

const Container = styled.section`
  display: flex;
  button {
    width: 50px;
    margin-left: 10px;
    margin-top: 10px;
  }
`;

const ListItem = ({ niceJoke, badJoke }) => {
  const [userJoke, setUserJoke] = useRecoilState(jokeState);
  const [deleteBtn, setDeleteBtn] = useState(false);

  const deleteBtnHandler = () => {
    setDeleteBtn((prev) => !prev);
  };

  const deleteHandler = () => {
    if (niceJoke) {
      const deleteJoke = userJoke.nice.filter((joke) => joke !== niceJoke);

      let item = {
        ...userJoke,
        nice: deleteJoke,
      };
      setUserJoke(item);
    }
    if (badJoke) {
      const deleteJoke = userJoke.bad.filter((joke) => joke !== badJoke);

      let item = {
        ...userJoke,
        bad: deleteJoke,
      };
      setUserJoke(item);
    }
  };

  return (
    <Container>
      <p onClick={deleteBtnHandler}>{niceJoke}</p>
      <p onClick={deleteBtnHandler}>{badJoke}</p>
      {deleteBtn && <Button onClick={deleteHandler}>delete</Button>}
    </Container>
  );
};

export default ListItem;
