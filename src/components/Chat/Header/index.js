"use client";

import { useState, useEffect } from "react";

// UI
import Avatar from "@mui/material/Avatar";

import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

// icons
import { MdOutlineMoreVert } from "react-icons/md";

// css
import css from "../style.module.scss";

export default function ChatHeader({ lastseen, name }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => console.log(anchorEl), [anchorEl]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const select = (option) => {
    handleClose();
  };

  const options = ["Chat"];

  return (
    <div className={css.chat__header}>
      <Avatar />

      <h3>{name}</h3>

      <IconButton
        className={css.menu_btn}
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MdOutlineMoreVert />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => select(option)}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
