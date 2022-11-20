import AppBar from "@mui/material/AppBar"
import React from "react"
import { Link } from "react-router-dom"

let Header = () => 
  <header className="header-div">
    <AppBar position="static" style={{textAlign: "center"}}>
      <Link to="/">
        <h1>ProxiHeat 🔥</h1>
      </Link>
    </AppBar>
  </header>

export default Header