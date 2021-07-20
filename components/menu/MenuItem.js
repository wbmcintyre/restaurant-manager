import React from "react";
import styled from "styled-components";

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border: 1px solid black;
`;

function MenuItem(props) {
  const { item } = props;
  return (
    <ItemContainer>
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>{item.price}</p>
    </ItemContainer>
  );
}

export default MenuItem;
