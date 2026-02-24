import React, { useState } from "react";


function VendorLogin({ onLogin }) {
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "vendor123") {
      onLogin(true);
      localStorage.setItem("vendorLoggedIn", "true");
    } else {
      alert("Invalid password");
    }
  };

  return (
    <div className="vendorLogin">
      <form onSubmit={handleLogin}>
        <h2>Vendor Login</h2>
        <input
          type="password"
          placeholder="Enter vendor password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default VendorLogin;
