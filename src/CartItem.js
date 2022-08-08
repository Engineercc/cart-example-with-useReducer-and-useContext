import React from 'react'
import { useGlobalContext } from './context'
import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from "react-icons/fa";
const CartItem = ({ id, img, title, price, amount }) => {
  const {removeItem,increaseAmount,decreaseAmount,toggleAmount} = useGlobalContext();

  return (
    <article className="cart-item">
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className="item-price">${price}</h4>
        {/* remove button */}
        <button className="remove-btn" onClick={() => removeItem(id)}>
          <FaTrashAlt />remove
        </button>
      </div>
      <div className="cart-buttons">
        {/* increase amount */}
        <button className="amount-btn" onClick={() => toggleAmount(id, "inc")}>
          <FaPlusCircle className="plus-icon" />
        </button>
        {/* amount */}
        <input
          className="amount"
          type="text"
          value={amount}
          onChange={(e) => toggleAmount(id, "custom", e.target.value)}
        />
        {/* decrease amount */}
        <button className="amount-btn" onClick={() => toggleAmount(id, "dec")}>
          <FaMinusCircle className="minus-icon" />
        </button>
      </div>
    </article>
  );
}

export default CartItem
