import addToCartIcon from "/assets/images/icon-add-to-cart.svg";
import IconCarbon from "/assets/images/icon-carbon-neutral.svg";
import incrementIcon from "/assets/images/icon-increment-quantity.svg";
import decrementIcon from "/assets/images/icon-decrement-quantity.svg";
import OrderConfirmedIcon from "/assets/images/icon-order-confirmed.svg";
import EmptyCard from "/assets/images/illustration-empty-cart.svg";
import RemoveFromCard from "/assets/images/icon-remove-item.svg";
import EmptyCart from "./components/EmptyCart";
import CartDrawer from "./components/CartDrawer";
import data from "../data.js";
import "./App.css";
import ProductCard from "./components/ProductCard.jsx";
import Header from "./components/Header.jsx";
import { useState } from "react";
import OrderSummaryModal from "./components/OrderSummaryModal.jsx";

function App() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleAddToCart(data, index) {
    console.log(items);
    const existingItem = items.find((item) => item.index === index);

    if (existingItem) {
      const updatedItems = items.map((item) =>
        item.index === index ? { ...item, quantity: item.quantity + 1 } : item
      );
      setItems(updatedItems);
      //setActive(true)
      console.log(1);
    } else {
      setItems([...items, { ...data, quantity: 1, index }]);
      //setActive(true)
    }
    setActive(true);
  }

  function increaseQuantity(data, index) {
    const updatedItems = items.map((item) =>
      item.index == index ? { ...item, quantity: item.quantity + 1 } : item
    );
    setItems(updatedItems);
    console.log(items);
  }
  function decreaseQuantity(data, index) {
    const updatedItems = items.map((item) =>
      item.index == index
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item
    );
    setItems(updatedItems);
    console.log(items);
  }

  function handleRemove(index) {
    const updatedItems = items.filter((item) => item.index !== index);
    setItems(updatedItems);
    console.log("hello");
  }
  function handleClose() {
    setModalIsOpen(false);
    setItems([]);
  }
  //the items on cart count 
  const totalItem = items.reduce((total, item) => total + item.quantity, 0);
  //calcution of sub-total items
  function subtotal(index) {
    const itemExisted = items.find((item) => item.index === index);
    return itemExisted ? itemExisted.price * itemExisted.quantity : 0;
  }
  //the grand total price of all the items
  const grandTotal = items
    .reduce((total, item) => total + item.quantity * item.price, 0)
    .toFixed(2);
  return (
    <>
      <Header />
      <div className="main_wrapper">
        <div className="card_container">
          {data.map((d, index) => {
            const cartItem = items.find((item) => item.index === index);
            return (
              <ProductCard
                key={index}
                // data={d}
                isActive={active}
                incrementIcon={incrementIcon}
                decrementIcon={decrementIcon}
                addToCartIcon={addToCartIcon}
                decreaseQuantity={() => decreaseQuantity(d, index)}
                increaseQuantity={() => increaseQuantity(d, index)}
                handleAddToCart={() => handleAddToCart(d, index)}
                data={{ ...d, quantity: cartItem?.quantity || 0 }}
                isInCart={!!cartItem}
              />
            );
          })}
        </div>
        {/* cart drawer jsx starts here */}
        {items.length > 0 ? (
          <div>
            <CartDrawer
              handleRemove={handleRemove}
              items={items}
              removeIcon={RemoveFromCard}
              iconCarbon={IconCarbon}
              open={() => setModalIsOpen(true)}
              grandTotal={grandTotal}
              totalItem={totalItem}
              subtotal={subtotal}
            />
            <OrderSummaryModal
              items={items}
              OrderConfirmedIcon={OrderConfirmedIcon}
              isOpen={modalIsOpen}
              onClose={handleClose}
              grandTotal = {grandTotal}
              subtotal = {subtotal}
            />
          </div>
        ) : (
          <EmptyCart emptyCartImage={EmptyCard} />
        )}
      </div>
    </>
  );
}

export default App;
