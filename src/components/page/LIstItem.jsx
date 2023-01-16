import { lazy, useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import instance from "../../service/request";
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

    if (niceItem !== undefined) {
      try {
        await instance.patch(`/${userId}`, niceArr);
        alert("The joke has been removed.");
        window.location.replace("/list");
      } catch (err) {
        console.log("err", err);
      }
    }
    if (badItem !== undefined) {
      try {
        await instance.patch(`/${userId}`, badArr);
        alert("The joke has been removed.");
        window.location.replace("/list");
      } catch (err) {
        console.log("err", err);
      }
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
