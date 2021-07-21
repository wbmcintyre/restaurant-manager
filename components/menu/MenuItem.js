import React, { useState } from "react";
import styled from "styled-components";
import PlusButton from "../ui/Links/PlusButton";
import MinusButton from "../ui/Links/MinusButton";
import ButtonSquare from "../ui/Links/ButtonSquare";

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border: 1px solid black;

  & > * {
    width: 100%;
  }
`;

const ItemImage = styled.img`
  border-radius: 3rem;
  width: 15rem;
  object-fit: cover;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 2rem;
`;

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  width: 15rem;
`;

const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityInput = styled.input.attrs((props) => ({
  type: "number",
  min: "0",
}))`
  width: 3rem;
  text-align: center;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

function MenuItem(props) {
  const [quantity, setQuantity] = useState(0);

  const { item } = props;
  return (
    <ItemContainer>
      <ItemImage src={item.image} alt={item.name} />
      <DescriptionContainer>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
      </DescriptionContainer>
      <PriceContainer onSubmit={props.onSubmit}>
        <p name="price" value={item.price}>{`$${item.price}`}</p>
        <QuantityContainer>
          <MinusButton
            type="button"
            onClick={() => quantity > 0 && setQuantity(+quantity - 1)}
          />
          <QuantityInput
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          ></QuantityInput>
          <PlusButton
            type="button"
            onClick={() => setQuantity(+quantity + 1)}
          />
        </QuantityContainer>
        <ButtonSquare
          type="button"
          onClick={() => props.submitItem(item, +quantity)}
          proportion="1.3"
          margin="2rem 0 0 0 "
        >
          Add To Cart
        </ButtonSquare>
      </PriceContainer>
    </ItemContainer>
  );
}

export default MenuItem;
