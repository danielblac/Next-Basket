import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useRouter } from "next/router";
import { ProductsTypes } from "@/types/UserInterface";
import { Carousel } from "react-bootstrap";
import Image from "next/image";
import { Key, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Popover,
} from "@mui/material";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useAppDispatch } from "@/store/store";
import { addToCart } from "@/store/features/cartSlice";
import { addToWish } from "@/store/features/wishlistSlice";
import { useSession } from "next-auth/react";

interface State extends SnackbarOrigin {
  open: boolean;
}

export default function Products({ product, products }: any) {
  // DECLARATIONS
  const {
    id,
    title,
    description,
    price,
    discountPercentage,
    stock,
    thumbnail,
    images,
  } = product;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const breadcrumbs = [
    <Link key="1" color="inherit" href="/" onClick={() => router.push("/")}>
      Home
    </Link>,
    <Typography key="3" color="text.primary">
      Shop
    </Typography>,
  ];

  // STATES
  const [desc, setDesc] = useState(false);
  const [addInfo, setAddInfo] = useState(true);
  const [review, setReview] = useState(false);

  // POPOVER / FUNCTIONS
  const [anchorCart, setAnchorCart] = useState<HTMLElement | null>(null);

  const handleCartPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorCart(event.currentTarget);
  };

  const handleCartPopoverClose = () => {
    setAnchorCart(null);
  };

  const openCart = Boolean(anchorCart);

  const [anchorWish, setAnchorWish] = useState<HTMLElement | null>(null);

  const handleWishPopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorWish(event.currentTarget);
  };

  const handleWishPopoverClose = () => {
    setAnchorWish(null);
  };

  const openWish = Boolean(anchorWish);

  //SNACKBAR
  const [snackbar, setSnackbar] = useState<State>({
    open: false,
    vertical: "bottom",
    horizontal: "right",
  });
  const { vertical, horizontal, open } = snackbar;

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <div className="products-details-page">
      <div className="breadcrumb">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          {breadcrumbs}
        </Breadcrumbs>
      </div>
      <section className="products-header">
        <div className="products-photo">
          <Carousel
            bsPrefix="carousel"
            slide={true}
            interval={1500}
            className="carousel"
          >
            {images.slice(0, 3).map((image: any) => (
              <Carousel.Item className="carousel-container" key={id}>
                <Image
                  className="carousel-image"
                  src={image}
                  alt="product"
                  width={500}
                  height={450}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="image-list">
            {images
              .slice(0, 3)
              .map((image: any, index: Key | null | undefined) => (
                <Image
                  src={image}
                  alt="product"
                  width={100}
                  height={75}
                  key={index}
                />
              ))}
          </div>
        </div>
        <div className="products-details">
          <Typography variant="h5" fontFamily="Montserrat">
            {title}
          </Typography>
          <div className="rating">
            <Image
              src="/img/stars.png"
              alt="rating"
              width={132}
              height={22}
              className="testimony-user"
            />
            <Typography
              variant="h6"
              fontWeight="700"
              fontFamily="Montserrat"
              fontSize={14}
            >
              10 Reviews
            </Typography>
          </div>
          <Typography
            variant="h4"
            color="#252B42"
            fontWeight="700"
            fontFamily="Montserrat"
            fontSize={24}
          >
            ${Math.trunc(price - (price / 100) * discountPercentage)}
          </Typography>
          <div className="availability">
            <Typography
              variant="h6"
              fontWeight="700"
              fontFamily="Montserrat"
              fontSize={14}
            >
              Availability :
            </Typography>
            {stock > 5 ? (
              <Typography
                variant="h6"
                fontWeight="700"
                fontFamily="Montserrat"
                fontSize={14}
                color="#23A6F0"
              >
                In Stock
              </Typography>
            ) : (
              <Typography
                variant="h6"
                fontWeight="700"
                fontFamily="Montserrat"
                fontSize={14}
                color="error"
              >
                Out Of Stock
              </Typography>
            )}
          </div>
          <div className="line-break">
            <hr />
          </div>
          <Image
            src="/img/product-colors.png"
            alt="product_colors"
            width={150}
            height={30}
            className="product-colors"
          />
          <div className="select-options">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#23A6F0",
                marginTop: "2em",
                fontSize: "14px",
                textTransform: "capitalize",
              }}
            >
              Select options
            </Button>
            <div
              className="icon-avatar"
              aria-owns={openWish ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={handleWishPopoverOpen}
              onMouseLeave={handleWishPopoverClose}
              onClick={() => {
                dispatch(addToWish(product));
                setSnackbar({ ...snackbar, open: true });
              }}
            >
              <FavoriteBorderOutlinedIcon fontSize="small" />
            </div>
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: "none",
              }}
              open={openCart}
              anchorEl={anchorCart}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handleCartPopoverClose}
              disableRestoreFocus
            >
              <Typography sx={{ p: 1 }}>Add to Cart</Typography>
            </Popover>
            <div
              className="icon-avatar"
              aria-owns={openCart ? "mouse-over-popover" : undefined}
              aria-haspopup="true"
              onMouseEnter={handleCartPopoverOpen}
              onMouseLeave={handleCartPopoverClose}
              onClick={() => {
                dispatch(addToCart(product));
                setSnackbar({ ...snackbar, open: true });
              }}
            >
              <ShoppingCartOutlinedIcon fontSize="small" />
            </div>
            <Popover
              id="mouse-over-popover"
              sx={{
                pointerEvents: "none",
              }}
              open={openWish}
              anchorEl={anchorWish}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              onClose={handleWishPopoverClose}
              disableRestoreFocus
            >
              <Typography sx={{ p: 1 }}>Add to Wishlist</Typography>
            </Popover>
            <div className="icon-avatar">
              <VisibilityOutlinedIcon fontSize="small" />
            </div>
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleSnackbarClose}
              message="Added Successfully"
              key={vertical + horizontal}
            />
          </div>
        </div>
      </section>
      <section className="products-description">
        <div className="desc-header">
          <div
            onClick={() => {
              setDesc(true), setAddInfo(false), setReview(false);
            }}
            className="desc-link"
          >
            <Typography
              variant="body2"
              fontWeight="600"
              fontFamily="Montserrat"
              fontSize={14}
              sx={desc ? { color: "#23a6f0" } : {}}
            >
              Description
            </Typography>
          </div>
          <div
            onClick={() => {
              setDesc(true), setAddInfo(false), setReview(false);
            }}
            className="desc-link-mobile"
          >
            <p style={desc ? { color: "#23a6f0" } : {}}>Description</p>
          </div>
          <div
            onClick={() => {
              setDesc(false), setAddInfo(true), setReview(false);
            }}
            className="desc-link"
          >
            <Typography
              variant="body2"
              fontWeight="600"
              fontFamily="Montserrat"
              fontSize={14}
              sx={addInfo ? { color: "#23a6f0" } : {}}
            >
              Additional Information
            </Typography>
          </div>
          <div
            onClick={() => {
              setDesc(false), setAddInfo(true), setReview(false);
            }}
            className="desc-link-mobile"
          >
            <p style={addInfo ? { color: "#23a6f0" } : {}}>
              Additional Information
            </p>
          </div>
          <div
            onClick={() => {
              setDesc(false), setAddInfo(false), setReview(true);
            }}
            className="review"
          >
            <Typography
              variant="body2"
              fontWeight="600"
              fontFamily="Montserrat"
              fontSize={14}
              sx={review ? { color: "#23a6f0" } : {}}
            >
              Review
            </Typography>
            <Typography
              variant="body2"
              fontWeight="600"
              fontFamily="Montserrat"
              fontSize={14}
              color="#23856D"
            >
              (0)
            </Typography>
          </div>
          <div
            onClick={() => {
              setDesc(false), setAddInfo(false), setReview(true);
            }}
            className="review-mobile"
          >
            <p style={review ? { color: "#23a6f0" } : {}}>Review</p>
            <p style={{ color: "#23856D" }}>(0)</p>
          </div>
        </div>
        <div className="desc-description">
          {desc && (
            <div className="text">
              <Typography
                align="center"
                variant="body2"
                fontFamily="Montserrat"
              >
                {description}
              </Typography>
            </div>
          )}
          {addInfo && (
            <div className="add-info">
              <div className="add-info-details">
                <Typography
                  variant="h4"
                  color="#252B42"
                  fontWeight="700"
                  fontFamily="Montserrat"
                  fontSize={24}
                >
                  the quick fox jumps over
                </Typography>
                <Typography
                  variant="body2"
                  fontFamily="Montserrat"
                  fontSize={14}
                >
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met
                  sent. RELIT official consequent door ENIM RELIT Mollie.
                  Excitation venial consequent sent nostrum met.
                </Typography>
                <div className="middle">
                  <Typography
                    variant="body2"
                    fontFamily="Montserrat"
                    fontSize={14}
                  >
                    Met minim Mollie non desert Alamo est sit cliquey dolor do
                    met sent. RELIT official consequent door ENIM RELIT Mollie.
                    Excitation venial consequent sent nostrum met.
                  </Typography>
                </div>
                <Typography
                  variant="body2"
                  fontFamily="Montserrat"
                  fontSize={14}
                >
                  Met minim Mollie non desert Alamo est sit cliquey dolor do met
                  sent. RELIT official consequent door ENIM RELIT Mollie.
                  Excitation venial consequent sent nostrum met.
                </Typography>
              </div>
              <div className="add-info-image">
                <Image
                  className="add-info-image"
                  src={thumbnail}
                  alt="product"
                  width={350}
                  height={350}
                />
              </div>
            </div>
          )}
          {review && (
            <div className="text">
              <Typography
                align="center"
                variant="body2"
                fontFamily="Montserrat"
              >
                No review yet for this product
              </Typography>
            </div>
          )}
        </div>
      </section>
      <section className="other-products">
        <Typography
          variant="h4"
          color="#252B42"
          fontWeight="700"
          fontFamily="Montserrat"
          fontSize={24}
          marginBottom="2.5em"
        >
          BESTSELLER PRODUCTS
        </Typography>

        <Grid container spacing={3} rowSpacing={3}>
          {products
            .filter((product: any) => product.id != id)
            .sort(() => 0.5 - Math.random())
            .slice(0, 8)
            .map(
              ({
                thumbnail,
                title,
                id,
                price,
                category,
                discountPercentage,
              }: ProductsTypes) => (
                <Grid item key={id} xs={12} sm={6} md={3}>
                  <Card>
                    <Link href={`/products/${id}`}>
                      <CardMedia
                        component="img"
                        height="238"
                        image={thumbnail}
                        alt={title}
                      />
                      <CardContent>
                        <div className="card-title">
                          <Typography
                            gutterBottom
                            align="center"
                            variant="body2"
                            color="#252B42"
                            fontWeight="700"
                            fontFamily="Montserrat"
                            fontSize={10}
                          >
                            {title}
                          </Typography>
                        </div>
                        <Typography
                          gutterBottom
                          align="center"
                          variant="body2"
                          fontWeight="600"
                          fontFamily="Montserrat"
                          fontSize={10}
                        >
                          {category}
                        </Typography>
                        <div className="prices">
                          <Typography
                            gutterBottom
                            align="center"
                            variant="body2"
                            fontWeight="600"
                            fontFamily="Montserrat"
                            fontSize={10}
                            color="#BDBDBD"
                          >
                            ${price}
                          </Typography>
                          <Typography
                            gutterBottom
                            align="center"
                            variant="body2"
                            fontWeight="600"
                            fontFamily="Montserrat"
                            fontSize={10}
                            color="#23856D"
                          >
                            $
                            {Math.trunc(
                              price - (price / 100) * discountPercentage
                            )}
                          </Typography>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                </Grid>
              )
            )}
        </Grid>
      </section>
      <section className="brands">
        <div className="brand">
          <Image src="/img/brands-1.png" alt="brands" width={103} height={35} />
          <Image src="/img/brands-2.png" alt="brands" width={84} height={59} />
          <Image src="/img/brands-3.png" alt="brands" width={102} height={75} />
          <Image src="/img/brands-4.png" alt="brands" width={103} height={43} />
          <Image src="/img/brands-5.png" alt="brands" width={105} height={63} />
          <Image src="/img/brands-6.png" alt="brands" width={77} height={73} />
        </div>
      </section>
      <div className="footer-pad"></div>
    </div>
  );
}

export async function getServerSideProps(context: { params: { id: any } }) {
  const { id } = context.params;

  let product = {};
  try {
    const single_product_response = await fetch(
      `https://dummyjson.com/products/${id}`
    );

    const single_load = await single_product_response.json();

    if (single_load) {
      product = single_load;
    }
    // Use the data as needed
  } catch (error) {
    console.error(error);

    if (error) {
      product = {};
    }
  }

  let allProducts = [];
  try {
    const productsResponse = await fetch("https://dummyjson.com/products");
    const products = await productsResponse.json();

    if (products) {
      allProducts = products;
    }
    // Use the data as needed
  } catch (error) {
    console.error(error);

    if (error) {
      allProducts = [];
    }
  }

  return {
    props: {
      product,
      products: allProducts.products,
    },
  };
}
