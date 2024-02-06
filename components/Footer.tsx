import { Typography } from "@mui/material";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import TwitterIcon from "@mui/icons-material/Twitter";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="bandage-socials">
        <Typography
          fontFamily="Montserrat"
          color="#252B42"
          variant="h5"
          fontWeight="700"
        >
          Bandage
        </Typography>
        <div className="footer-socials">
          <Link
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookRoundedIcon />
          </Link>
          <Link
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </Link>
          <Link
            href="https://www.twitter.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </Link>
        </div>
      </div>
      <div className="main-footer">
        <div>
          <Typography
            variant="h6"
            color="#252B42"
            fontWeight="700"
            fontFamily="Montserrat"
          >
            Company Info
          </Typography>
          <div>
            <Link href="#">
              <Typography
                fontFamily="Montserrat"
                variant="body2"
                fontWeight="700"
                fontSize={14}
                marginTop="1.5em"
              >
                About Us
              </Typography>
            </Link>
            <Link href="#">
              <Typography
                fontFamily="Montserrat"
                variant="body2"
                fontWeight="700"
                fontSize={14}
                marginTop="1em"
              >
                Carrier
              </Typography>
            </Link>
            <Link href="#">
              <Typography
                fontFamily="Montserrat"
                variant="body2"
                fontWeight="700"
                fontSize={14}
                marginTop="1em"
              >
                We are hiring
              </Typography>
            </Link>
            <Link href="#">
              <Typography
                fontFamily="Montserrat"
                variant="body2"
                fontWeight="700"
                fontSize={14}
                marginTop="1em"
              >
                Blog
              </Typography>
            </Link>
          </div>
        </div>
        <div>
          <Typography
            variant="h6"
            color="#252B42"
            fontWeight="700"
            fontFamily="Montserrat"
          >
            Legal
          </Typography>
          <div>
            <Link href="#">
              <Typography
                fontFamily="Montserrat"
                variant="body2"
                fontWeight="700"
                fontSize={14}
                marginTop="1.5em"
              >
                About Us
              </Typography>
            </Link>
            <Link href="#">
              <Typography
                fontFamily="Montserrat"
                variant="body2"
                fontWeight="700"
                fontSize={14}
                marginTop="1em"
              >
                Carrier
              </Typography>
            </Link>
            <Link href="#">
              <Typography
                fontFamily="Montserrat"
                variant="body2"
                fontWeight="700"
                fontSize={14}
                marginTop="1em"
              >
                We are hiring
              </Typography>
            </Link>
            <Link href="#">
              <Typography
                fontFamily="Montserrat"
                variant="body2"
                fontWeight="700"
                fontSize={14}
                marginTop="1em"
              >
                Blog
              </Typography>
            </Link>
          </div>
        </div>
        <div>
          <Typography
            variant="h6"
            color="#252B42"
            fontWeight="700"
            fontFamily="Montserrat"
          >
            Features
          </Typography>
          <div>
            <Link href="#">
              <Typography
                fontFamily="Montserrat"
                variant="body2"
                fontWeight="700"
                fontSize={14}
                marginTop="1.5em"
              >
                Business Marketing
              </Typography>
            </Link>
            <Link href="#">
              <Typography
                fontFamily="Montserrat"
                variant="body2"
                fontWeight="700"
                fontSize={14}
                marginTop="1em"
              >
                User Analytic
              </Typography>
            </Link>
            <Link href="#">
              <Typography
                fontFamily="Montserrat"
                variant="body2"
                fontWeight="700"
                fontSize={14}
                marginTop="1em"
              >
                Live Chat
              </Typography>
            </Link>
            <Link href="#">
              <Typography
                fontFamily="Montserrat"
                variant="body2"
                fontWeight="700"
                fontSize={14}
                marginTop="1em"
              >
                Unlimited Support
              </Typography>
            </Link>
          </div>
        </div>
        <div>
          <Typography
            variant="h6"
            color="#252B42"
            fontWeight="700"
            fontFamily="Montserrat"
          >
            Resources
          </Typography>
          <div>
            <Link href="#">
              <Typography
                fontFamily="Montserrat"
                variant="body2"
                fontWeight="700"
                fontSize={14}
                marginTop="1.5em"
              >
                IOS & Android
              </Typography>
            </Link>
            <Link href="#">
              <Typography
                fontFamily="Montserrat"
                variant="body2"
                fontWeight="700"
                fontSize={14}
                marginTop="1em"
              >
                Watch a Demo
              </Typography>
            </Link>
            <Link href="#">
              <Typography
                fontFamily="Montserrat"
                variant="body2"
                fontWeight="700"
                fontSize={14}
                marginTop="1em"
              >
                Customers
              </Typography>
            </Link>
            <Link href="#">
              <Typography
                fontFamily="Montserrat"
                variant="body2"
                fontWeight="700"
                fontSize={14}
                marginTop="1em"
              >
                API
              </Typography>
            </Link>
          </div>
        </div>
        <div className="footer-line">
          <Typography
            variant="h6"
            color="#252B42"
            fontWeight="700"
            fontFamily="Montserrat"
          >
            Get In Touch
          </Typography>
          <div className="suscribe">
            <div className="input">
              <input
                type="email"
                // value={data.email}
                // onChange={(e) => setData({ email: e.target.value })}
                placeholder="Your Email"
                className="inputs"
              />
              <button>
                <Typography
                  fontFamily="Montserrat"
                  variant="body2"
                  fontSize={14}
                >
                  Suscribe
                </Typography>
              </button>
            </div>
            <Typography
              fontFamily="Montserrat"
              variant="body2"
              fontSize={12}
              marginTop="0.5em"
            >
              Lore imp sum dolor Amit
            </Typography>
          </div>
        </div>
      </div>
      <div className="rights-reserved">
        <Typography
          fontFamily="Montserrat"
          variant="body2"
          fontSize={14}
          fontWeight={700}
        >
          Made With Love By DanielBlac All Right Reserved
        </Typography>
      </div>
    </footer>
  );
}
