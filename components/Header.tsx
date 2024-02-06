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
import SegmentRoundedIcon from "@mui/icons-material/SegmentRounded";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Typography } from "@mui/material";
import Link from "next/link";
import NavLink from "./NavLink";
import { Dispatch, SetStateAction, useState } from "react";
import { useAppSelector } from "@/store/store";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Image, { StaticImageData } from "next/image";

interface IProps {
  openSearchModal: () => void;
  openCartModal: () => void;
  openWishModal: () => void;
  openLoginModal: () => void;
}

interface ImageProps {
  src: string | StaticImageData;
  alt: string;
  width: number;
  height: number;
}

export default function Header(props: IProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  const cart = useAppSelector((state) => state.cart.cart);
  const wishlist = useAppSelector((state) => state.wishlist.wishList);

  /*  function getProfileImage() {
    if (session?.user) {
      return session?.user?.image;
    } else {
      return session?.image;
    }
  } */

  const profile = session?.user?.image;
  const ProfilePicture = ({ src, alt, width, height }: ImageProps) => {
    return <Image src={src} alt={alt} width={width} height={height} />;
  };

  return (
    <header
      className="header"
      style={menuOpen ? { paddingBottom: "42em" } : {}}
    >
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
          {session ? (
            <div className="user-login" onClick={() => signOut()}>
              <Image
                src={profile ? profile : "/img/user-one.jpg"}
                alt=""
                width={30}
                height={30}
              />
              {/* <Avatar src={session.user?.image} /> */}
              <Typography
                fontFamily="Montserrat"
                variant="subtitle2"
                fontWeight="700"
              >
                SignOut
              </Typography>
            </div>
          ) : (
            <div className="user-login" onClick={() => props.openLoginModal()}>
              <PersonOutlineIcon fontSize="small" />
              <Typography
                fontFamily="Montserrat"
                variant="subtitle2"
                fontWeight="700"
              >
                Login / Register
              </Typography>
            </div>
          )}

          <div className="search-icon" onClick={() => props.openSearchModal()}>
            <SearchOutlinedIcon />
          </div>
          <div className="cart" onClick={() => props.openCartModal()}>
            <ShoppingCartOutlinedIcon fontSize="small" />
            <Typography fontFamily="Montserrat" variant="subtitle2">
              {
                cart.filter(
                  ({ id }: any, index: any) =>
                    !cart.map(({ id }: any) => id).includes(id, index + 1)
                ).length
              }
            </Typography>
          </div>
          <div className="wishlist" onClick={() => props.openWishModal()}>
            <FavoriteBorderOutlinedIcon fontSize="small" />
            <Typography fontFamily="Montserrat" variant="subtitle2">
              {
                wishlist.filter(
                  ({ id }: any, index: any) =>
                    !wishlist.map(({ id }: any) => id).includes(id, index + 1)
                ).length
              }
            </Typography>
          </div>
        </div>
      </div>
      <div className="nav-mobile">
        <div>
          <Typography
            fontFamily="Montserrat"
            color="#252B42"
            variant="h4"
            fontWeight="700"
          >
            Bandage
          </Typography>
        </div>
        <div className="bar">
          {session && (
            <div>
              <Avatar src={profile ? profile : "/img/user-one.jpg"} />
            </div>
          )}
          {menuOpen ? (
            <div onClick={() => setMenuOpen(false)}>
              <CloseIcon fontSize="large" />
            </div>
          ) : (
            <div onClick={() => setMenuOpen(true)}>
              <SegmentRoundedIcon fontSize="large" />
            </div>
          )}
        </div>
        {menuOpen && (
          <nav>
            <div
              onClick={() => {
                router.push("/");
                setMenuOpen(false);
              }}
            >
              <Typography fontFamily="Montserrat" variant="body1" fontSize={30}>
                Home
              </Typography>
            </div>
            <div onClick={() => setMenuOpen(false)}>
              <Typography fontFamily="Montserrat" variant="body1" fontSize={30}>
                Shop
              </Typography>
            </div>
            <div onClick={() => setMenuOpen(false)}>
              <Typography fontFamily="Montserrat" variant="body1" fontSize={30}>
                About
              </Typography>
            </div>
            <div onClick={() => setMenuOpen(false)}>
              <Typography fontFamily="Montserrat" variant="body1" fontSize={30}>
                Blog
              </Typography>
            </div>
            <div onClick={() => setMenuOpen(false)}>
              <Typography fontFamily="Montserrat" variant="body1" fontSize={30}>
                Contact
              </Typography>
            </div>
            <div onClick={() => setMenuOpen(false)}>
              <Typography fontFamily="Montserrat" variant="body1" fontSize={30}>
                Pages
              </Typography>
            </div>
            <div className="user">
              {session ? (
                <div className="user-login">
                  <Typography
                    fontFamily="Montserrat"
                    variant="body1"
                    fontSize={30}
                  >
                    SignOut
                  </Typography>
                  <LogoutIcon fontSize="medium" />
                </div>
              ) : (
                <div
                  className="user-login"
                  onClick={() => {
                    props.openLoginModal();
                    setMenuOpen(false);
                  }}
                >
                  <PersonOutlineIcon fontSize="large" />
                  <Typography
                    fontFamily="Montserrat"
                    variant="body1"
                    fontSize={30}
                  >
                    Login / Register
                  </Typography>
                </div>
              )}

              <div className="search-icon">
                <SearchOutlinedIcon
                  fontSize="large"
                  onClick={() => {
                    props.openSearchModal();
                    setMenuOpen(false);
                  }}
                />
              </div>
              <div
                className="cart"
                onClick={() => {
                  props.openCartModal();
                  setMenuOpen(false);
                }}
              >
                <ShoppingCartOutlinedIcon fontSize="large" />
                <Typography
                  fontFamily="Montserrat"
                  variant="body1"
                  fontSize={25}
                >
                  {
                    cart.filter(
                      ({ id }: any, index: any) =>
                        !cart.map(({ id }: any) => id).includes(id, index + 1)
                    ).length
                  }
                </Typography>
              </div>
              <div
                className="wishlist"
                onClick={() => {
                  props.openWishModal();
                  setMenuOpen(false);
                }}
              >
                <FavoriteBorderOutlinedIcon fontSize="large" />
                <Typography
                  fontFamily="Montserrat"
                  variant="body1"
                  fontSize={25}
                >
                  {
                    wishlist.filter(
                      ({ id }: any, index: any) =>
                        !wishlist
                          .map(({ id }: any) => id)
                          .includes(id, index + 1)
                    ).length
                  }
                </Typography>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
