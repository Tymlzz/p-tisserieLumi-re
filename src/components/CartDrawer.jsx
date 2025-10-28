import React from "react";

function CartDrawer({ removeIcon, iconCarbon, items,handleRemove,open,grandTotal,totalItem,subtotal }) {
  

  
  return (
    <div>
      <article className="drawer">
        <div className="header">Your Cart ({totalItem})</div>
        {items.map((item) => {
          return (
            <div>
              <ul className="cart_items" key={item.index}>
                <li className="cart_item">
                  <div className="item_name">{item.name}</div>
                  <div className="item_details">
                    <span className="item_count">{item.quantity}x</span>{" "}
                    <span className="item_price">@ ${item.price}</span>
                    <span className="item_sum">
                      ${subtotal(item.index).toFixed(2)}
                    </span>
                    <button onClick={()=>handleRemove(item.index)} className="remove_from_cart">
                      <img src={removeIcon} alt="" />
                    </button>
                  </div>
                </li>

                {/* <li className="cart_item">
                    <div className="item_name">Waffle with Berries</div>
                    <div className="item_details">
                      <span className="item_count">2x</span>{" "}
                      <span className="item_price">@ $6.5</span>
                      <span className="item_sum">$13.0</span>
                      <button className="remove_from_cart">
                        <img src={removeIcon} alt="" />
                      </button>
                    </div>
                  </li>
      
                  <li className="cart_item">
                    <div className="item_name">Waffle with Berries</div>
                    <div className="item_details">
                      <span className="item_count">2x</span>{" "}
                      <span className="item_price">@ $6.5</span>
                      <span className="item_sum">$13.0</span>
                      <button className="remove_from_cart">
                        <img src={removeIcon} alt="" />
                      </button>
                    </div>
                  </li> */}
              </ul>
            </div>
          );
        })}

        <div className="cart_total">
          <div className="order">Order total</div>
          <div className="total">${grandTotal}</div>
        </div>

        <div className="delivery_wrapper">
          <span>
            <img src={iconCarbon} alt="Carbon neutral icon" />
          </span>
          This is a <strong>carbon-neutral</strong> delivery
        </div>

        <div className="confirm_button">
          <button type="button" onClick={open}>Confirm Order</button>
        </div>
      </article>
    </div>
  );
}

export default CartDrawer;
