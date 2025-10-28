import React from "react";

function EmptyCart({emptyCartImage}) {
  return (
    <div>
      <article className="empty_cart">
        <div className="header">Your Cart (0)</div>

        <div className="empty_cart_content">
          <img src={emptyCartImage} alt="Empty cart" />
          <p>Your added items will appear here</p>
        </div>
      </article>
    </div>
  );
}

export default EmptyCart;
