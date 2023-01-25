import styled from "styled-components";

const Btn = styled.button`
  width: 60px;
  height: 5vh;
  border: none;
  border-radius: 1rem;
  cursor: pointer;
`;

const Button = (props) => {
  return (
    <Btn
      name={props.name}
      value={props.value}
      className={props.className}
      onClick={props.onClick}
    >
      {props.children}
    </Btn>
  );
};

export default Button;
