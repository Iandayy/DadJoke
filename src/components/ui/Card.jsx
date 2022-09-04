import styled from "styled-components";

const Container = styled.div`
  border-radius: 10px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
  margin: 40px;
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const Card = (props) => {
  return <Container>{props.children}</Container>;
};

export default Card;
