import { useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../context/authContext";
import { DarkModeContext } from "../../context/darkModeContext";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import "./style.scss";

const Navbar = () => {
	const { toggle, darkMode } = useContext(DarkModeContext);
	const { currentUser } = useContext(AuthContext);

	return (
		<div className="navbar">
			<div className="left">
				<Link to="/" style={{ textDecoration: "none" }}>
					<span>lamasocial</span>
				</Link>

				<HomeOutlinedIcon />
				{darkMode ? (
					<WbSunnyOutlinedIcon onClick={toggle} />
				) : (
					<DarkModeOutlinedIcon onClick={toggle} />
				)}

				<GridViewOutlinedIcon />

				<div className="search">
					<SearchOutlinedIcon />
					<input type="text" id="search" name="search" placeholder="Search..." />
				</div>
			</div>

			<div className="right">
				<PersonOutlinedIcon />
				<EmailOutlinedIcon />
				<NotificationsOutlinedIcon />
				<div className="user">
					<img src={"/upload/" + encodeURIComponent(currentUser.profilePicture)} alt="" />
					<span>{currentUser.name}</span>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
