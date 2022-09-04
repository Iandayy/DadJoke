import { lazy, useState } from "react";
import { useRecoilValue } from "recoil";
import axios from "axios";
import styled from "styled-components";

import userInfoState from "../../state/userInfoState";

const Button = lazy(() => import("../ui/Button"));

const Container = styled.section`
  display: flex;
  button {
    width: 50px;
    margin-left: 10px;
    margin-top: 10px;
  }
`;

// const DeleteBtn = styled.section``;

const ListItem = ({ niceItem, badItem }) => {
  const userId = localStorage.getItem("userId");

  const [deleteBtn, setDeleteBtn] = useState(false);

  const userInfo = useRecoilValue(userInfoState(userId));

  const deleteBtnHandler = () => {
    setDeleteBtn((prev) => !prev);
  };

  const deleteHandler = async () => {
    let niceFilter = userInfo.nice.filter(
      (el) => userInfo.nice.indexOf(el) !== userInfo.nice.indexOf(niceItem)
    );
    let badFilter = userInfo.bad.filter(
      (el) => userInfo.bad.indexOf(el) !== userInfo.bad.indexOf(badItem)
    );

    let niceArr = {
      ...userInfo,
      nice: [...niceFilter],
    };
    let badArr = {
      ...userInfo,
      bad: [...badFilter],
    };

    console.log(niceItem);
    console.log(badItem);

    if (niceItem !== undefined) {
      await axios.patch(`http://localhost:3001/userInfo/${userId}`, niceArr);
      window.location.replace("/list");
    }
    if (badItem !== undefined) {
      await axios.patch(`http://localhost:3001/userInfo/${userId}`, badArr);
      window.location.replace("/list");
    }
  };

  return (
    <Container>
      <p onClick={deleteBtnHandler}>{niceItem}</p>
      <p onClick={deleteBtnHandler}>{badItem}</p>
      {deleteBtn && <Button onClick={deleteHandler}>delete</Button>}
    </Container>
  );
};

export default ListItem;
