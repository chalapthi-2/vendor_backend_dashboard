

import React, { useEffect, useState } from "react";

const NavBar = ({
  showLoginHandler,
  showRegisterHandler,
  showLogoutHandler,
  showLogout,
}) => {
  const [firmName, setFirmName] = useState("");

  useEffect(() => {
    // firmName from localStorage
    const storedFirmName = localStorage.getItem("firmName");
    if (storedFirmName) {
      setFirmName(storedFirmName);
    }
  }, []);

  return (
    <>
      <div className="navSec">
        <div className="company">
          Vendor Dashboard
          {firmName && (
            <span style={{ marginLeft: "15px", fontWeight: "bold" }}>
              | Firm: {firmName}
            </span>
          )}
        </div>

        <span>
          {!showLogout ? (
            <>
              <span onClick={showLoginHandler} style={{ cursor: "pointer" }}>
                Login /
              </span>
              <span onClick={showRegisterHandler} style={{ cursor: "pointer" }}>
                Register
              </span>
            </>
          ) : (
            <span onClick={showLogoutHandler} style={{ cursor: "pointer" }}>
              Logout
            </span>
          )}
        </span>
      </div>
    </>
  );
};

export default NavBar;
