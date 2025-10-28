import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

function OrderSummaryModal({ items, OrderConfirmedIcon, isOpen, onClose,subtotal,grandTotal }) {
  return (
    <div>
      <Modal
        overlayClassName="modalBackdrop"
        className="orderSummaryContainer"
        isOpen={isOpen}
        onRequestClose={onClose}
      >
        
            <div>
              <div className="orderSummaryHeaderSection">
                <img src={OrderConfirmedIcon} alt="Order Confirmed" />
                <div className="header">Order Confirmed</div>
                <p>We hope you enjoy your food!</p>
              </div>

              <ul className="orderSummaryModal_items">
                {items.map((item)=>{
                  return(
                    <div>
                      <li className="orderSummaryModal_item">
                  <img
                    src={item.image.thumbnail}
                    alt=""
                    className="item_thumb"
                  />
                  <div className="item_text">
                    <div className="name">{item.name}</div>
                    <div className="item_details_row">
                      <div className="Order_item_details">
                        <span className="Order_item_count">{item.quantity}x</span>
                        <span className="Order_item_price">@${item.price}</span>
                      </div>
                      <div className="Order_item_sum">${subtotal(item.index).toFixed(2)}</div>
                    </div>
                  </div>
                </li>
                    </div>
                  )
                })}
                

                {/* <li className="orderSummaryModal_item">
            <img
              src="/assets/images/image-waffle-thumbnail.jpg"
              alt=""
              className="item_thumb"
            />
            <div className="item_text">
              <div className="name">Waffle with Berries</div>
              <div className="item_details_row">
                <div className="Order_item_details">
                  <span className="Order_item_count">2x</span>
                  <span className="Order_item_price">@ $6.50</span>
                </div>
                <div className="Order_item_sum">$13.00</div>
              </div>
            </div>
          </li>  */}

                {/* <li className="orderSummaryModal_item">
            <img
              src="/assets/images/image-waffle-thumbnail.jpg"
              alt=""
              className="item_thumb"
            />
            <div className="item_text">
              <div className="name">Waffle with Berries</div>
              <div className="item_details_row">
                <div className="Order_item_details">
                  <span className="Order_item_count">2x</span>
                  <span className="Order_item_price">@ $6.50</span>
                </div>
                <div className="Order_item_sum">$13.00</div>
              </div>
            </div>
          </li>  */}

                <div className="orderSummaryModal_total">
                  <div className="order">Order Total</div>
                  <div className="Order_total">${grandTotal}</div>
                </div>
              </ul>

              <div className="orderSummaryModal_buttonWrapper">
                <button type="button" onClick={onClose}>
                  Start New Order
                </button>
              </div>
            </div>
        
      </Modal>
    </div>
  );
}

export default OrderSummaryModal;
