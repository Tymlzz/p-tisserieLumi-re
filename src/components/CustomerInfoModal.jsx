import { useState, useEffect } from "react";


function CustomerInfoModal({ onSave }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedCustomer = localStorage.getItem("customerInfo");
    if (!savedCustomer) setIsOpen(true);
  }, []);

  const handleSave = () => {
    if (!name || !number) {
      alert("Please enter your name and phone number");
      return;
    }

    const info = { name, number };
    localStorage.setItem("customerInfo", JSON.stringify(info));
    onSave(info);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="customerModalOverlay">
      <div className="customerModal">
        <h2>Welcome!</h2>
        <p>Before you start shopping, please enter your details.</p>

        <div className="inputGroup">
          <label>Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="inputGroup">
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Your phone number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>

        <button onClick={handleSave}>Continue</button>
      </div>
    </div>
  );
}

export default CustomerInfoModal;
