import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import addToCartIcon from "/assets/images/icon-add-to-cart.svg";
import IconCarbon from "/assets/images/icon-carbon-neutral.svg";
import incrementIcon from "/assets/images/icon-increment-quantity.svg";
import decrementIcon from "/assets/images/icon-decrement-quantity.svg";
import OrderConfirmedIcon from "/assets/images/icon-order-confirmed.svg";
import EmptyCard from "/assets/images/illustration-empty-cart.svg";
import RemoveFromCard from "/assets/images/icon-remove-item.svg";

import EmptyCart from "./components/EmptyCart";
import CartDrawer from "./components/CartDrawer";
import ProductCard from "./components/ProductCard.jsx";
import Header from "./components/Header.jsx";
import OrderSummaryModal from "./components/OrderSummaryModal.jsx";
import VendorDashboard from "./components/VendorDashboard";
import VendorLogin from "./components/VendorLogin";
import CustomerInfoModal from "./components/CustomerInfoModal";

import data from "../data.js";
import "./App.css";
import "./VendorLogin.css";
import "./VendorDashboard.css";
import "./CustomerInfoModal.css";

function App() {
  const [items, setItems] = useState([]);
  const [active, setActive] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isVendor, setIsVendor] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(null);

  // ✅ Added missing useEffect import & initialization
  useEffect(() => {
    const saved = localStorage.getItem("customerInfo");
    if (saved) setCustomerInfo(JSON.parse(saved));
  }, []);

  function handleAddToCart(data, index) {
    console.log(items);
    const existingItem = items.find((item) => item.index === index);

    if (existingItem) {
      const updatedItems = items.map((item) =>
        item.index === index ? { ...item, quantity: item.quantity + 1 } : item
      );
      setItems(updatedItems);
      console.log(1);
    } else {
      setItems([...items, { ...data, quantity: 1, index }]);
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

  function handleOpen() {
    setModalIsOpen(true);
  }

  const clearCart = () => setItems([]);
  const totalItem = items.reduce((total, item) => total + item.quantity, 0);

  function subtotal(index) {
    const itemExisted = items.find((item) => item.index === index);
    return itemExisted ? itemExisted.price * itemExisted.quantity : 0;
  }

  const grandTotal = items
    .reduce((total, item) => total + item.quantity * item.price, 0)
    .toFixed(2);

  return (
    <>
      <Router>
         {/* Modal to collect customer info  */}
        <CustomerInfoModal onSave={setCustomerInfo} />

        <Routes>
          <Route
            path="/"
            element={
              <div>
                <Header />
                <div className="main_wrapper">
                  <div className="card_container">
                    {data.map((d, index) => {
                      const cartItem = items.find(
                        (item) => item.index === index
                      );
                      return (
                        <ProductCard
                          key={index}
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

                  {items.length > 0 ? (
                    <div>
                      <CartDrawer
                        handleRemove={handleRemove}
                        items={items}
                        removeIcon={RemoveFromCard}
                        iconCarbon={IconCarbon}
                        open={handleOpen}
                        grandTotal={grandTotal}
                        totalItem={totalItem}
                        subtotal={subtotal}
                      />
                      <OrderSummaryModal
                        items={items}
                        OrderConfirmedIcon={OrderConfirmedIcon}
                        isOpen={modalIsOpen}
                        onClose={handleClose}
                        grandTotal={grandTotal}
                        subtotal={subtotal}
                        clearCart={clearCart}
                      />
                    </div>
                  ) : (
                    <EmptyCart emptyCartImage={EmptyCard} />
                  )}
                </div>
              </div>
            }
          />

          <Route
            path="/vendor"
            element={
              isVendor ? (
                <VendorDashboard />
              ) : (
                <VendorLogin onLogin={setIsVendor} />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
