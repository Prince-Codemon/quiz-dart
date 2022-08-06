import React from 'react'

const Footer = () => {
  return (
    <footer
      style={{
        width: "100%",
        padding: "10px",
        textAlign: "center",
        margin: "0 auto",
        color: "#d3d3d3",
      }}
    >
      All Rights &copy; Reserved 2022;
      <br />
      <a
        href="https://github.com/Prince-Codemon"
        target={"_blank"}
        rel="noreferrer"
        style={{ color: "teal", fontWeight: "bold", fontSize: "1.2rem" }}
      >
        Prince Codemon
      </a>
    </footer>
  );
}

export default Footer