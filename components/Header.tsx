import PhoneIcon from "@mui/icons-material/Phone";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { Typography } from "@mui/material";
import Link from "next/link";
import NavLink from "./NavLink";

export default function Header() {
  return (
    <header className="header">
      <div className="socials">
        <div className="social-contact">
          <div className="social-phone">
            <PhoneIcon fontSize="small" />
            <Typography
              fontFamily="Montserrat"
              variant="subtitle2"
              fontWeight="700"
            >
              (225) 555-0118
            </Typography>
          </div>
          <div className="social-email">
            <EmailOutlinedIcon fontSize="small" />
            <Typography
              fontFamily="Montserrat"
              variant="subtitle2"
              fontWeight="700"
            >
              michelle.rivera@example.com
            </Typography>
          </div>
        </div>
        <div>
          <Typography
            fontFamily="Montserrat"
            variant="subtitle2"
            fontWeight="700"
          >
            Follow Us and get a chance to win 80% off
          </Typography>
        </div>
        <div className="social-media">
          <Typography
            fontFamily="Montserrat"
            variant="subtitle2"
            fontWeight="700"
          >
            Follow Us :
          </Typography>
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon fontSize="small" />
          </Link>
          <Link
            href="https://www.youtube.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTubeIcon fontSize="small" />
          </Link>
          <Link
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookRoundedIcon fontSize="small" />
          </Link>
          <Link
            href="https://www.twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon fontSize="small" />
          </Link>
        </div>
      </div>
      <div className="header-nav">
        <div className="nav">
          <Typography
            fontFamily="Montserrat"
            color="#252B42"
            variant="h4"
            fontWeight="700"
          >
            Bandage
          </Typography>
          <nav>
            <NavLink href="/">
              <Typography
                fontFamily="Montserrat"
                variant="subtitle2"
                fontWeight="700"
              >
                Home
              </Typography>
            </NavLink>
            <NavLink href="#">
              <div className="shop-nav">
                <Typography
                  fontFamily="Montserrat"
                  variant="subtitle2"
                  fontWeight="700"
                >
                  Shop
                </Typography>
                <KeyboardArrowDownIcon fontSize="small" />
              </div>
            </NavLink>
            <NavLink href="#">
              <Typography
                fontFamily="Montserrat"
                variant="subtitle2"
                fontWeight="700"
              >
                About
              </Typography>
            </NavLink>
            <NavLink href="#">
              <Typography
                fontFamily="Montserrat"
                variant="subtitle2"
                fontWeight="700"
              >
                Blog
              </Typography>
            </NavLink>
            <NavLink href="#">
              <Typography
                fontFamily="Montserrat"
                variant="subtitle2"
                fontWeight="700"
              >
                Contact
              </Typography>
            </NavLink>
            <NavLink href="#">
              <Typography
                fontFamily="Montserrat"
                variant="subtitle2"
                fontWeight="700"
              >
                Pages
              </Typography>
            </NavLink>
          </nav>
        </div>
        <div className="user">
          <div className="user-login">
            <PersonOutlineIcon fontSize="small" />
            <Typography
              fontFamily="Montserrat"
              variant="subtitle2"
              fontWeight="700"
            >
              Login / Register
            </Typography>
          </div>
          <div className="search-icon">
            <SearchOutlinedIcon />
          </div>
          <div className="cart">
            <ShoppingCartOutlinedIcon fontSize="small" />
            <Typography fontFamily="Montserrat" variant="subtitle2">
              1
            </Typography>
          </div>
          <div className="wishlist">
            <FavoriteBorderOutlinedIcon fontSize="small" />
            <Typography fontFamily="Montserrat" variant="subtitle2">
              1
            </Typography>
          </div>
        </div>
      </div>
    </header>
  );
}
