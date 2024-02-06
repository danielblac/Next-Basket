import {
  ReactNode,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  FormEvent,
} from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Form, Modal } from "react-bootstrap";
import {
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { ProductsTypes } from "@/types/UserInterface";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/store";
import Image from "next/image";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SendIcon from "@mui/icons-material/Send";
import { setCart } from "@/store/features/cartSlice";
import { setWishlist } from "@/store/features/wishlistSlice";
import Providers from "./Providers";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signIn } from "next-auth/react";

interface IProps {
  myVar: boolean;
  setMyVar?: Dispatch<SetStateAction<boolean>>;
}

type LayoutProps = { children?: ReactNode };

export default function Layout({ children }: LayoutProps) {
  // STATES
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWish, setOpenWish] = useState(false);
  const [login, setLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  function openSearchModal() {
    setOpen(true);
  }

  function openCartModal() {
    setOpenCart(true);
  }

  function openWishModal() {
    setOpenWish(true);
  }

  function openLoginModal() {
    setLogin(true);
  }

  const handleClose = () => {
    setOpen(false);
  };

  const handleCartClose = () => {
    setOpenCart(false);
  };

  const handleWishClose = () => {
    setOpenWish(false);
  };

  const handleLoginClose = () => {
    setLogin(false);
  };

  async function getProducts() {
    try {
      const productsResponse = await fetch("https://dummyjson.com/products");
      const products = await productsResponse.json();

      if (products) {
        setProducts(products.products);
      }
      // Use the data as needed
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  useEffect(() => {
    if (products.length >= 0) {
      const filtered = products.filter((product: any) => {
        const productInfo = `${product.title}, ${product.brand}, ${product.category}`;
        return productInfo.toLowerCase().includes(search.toLowerCase());
      });
      setFilteredProducts(filtered);
    }
  }, [search, products]);

  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.cart);
  const wishlist = useAppSelector((state) => state.wishlist.wishList);

  useEffect(() => {
    if (cart >= 0) {
      const updatedCart = cart.map((item: any) => ({
        ...item,
        count: item.count || 1,
      }));
      dispatch(setCart(updatedCart));
    }
  }, []);

  const increaseCount = (id: number) => {
    const updatedCart = cart.map((item: any) =>
      item.id === id ? { ...item, count: (item.count || 1) + 1 } : item
    );
    dispatch(setCart(updatedCart));
  };

  const decreaseCount = (id: number) => {
    const updatedCart = cart.map((item: any) =>
      item.id === id && item.count && item.count > 0
        ? { ...item, count: item.count - 1 }
        : item
    );
    dispatch(setCart(updatedCart));
  };

  const deleteCartItem = (id: number) => {
    const updatedCart = cart.filter((item: any) => item.id !== id);
    dispatch(setCart(updatedCart));
  };

  const deleteWishListItem = (id: number) => {
    const updatedWishList = wishlist.filter((item: any) => item.id !== id);
    dispatch(setWishlist(updatedWishList));
  };

  const getSubtotalPrice = (item: any) => {
    return item.price * (item.count || 1);
  };

  const getTotalPrice = () => {
    return cart.reduce(
      (total: any, item: any) => total + item.price * (item.count || 1),
      0
    );
  };

  // SIGN IN
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (formData.username === "") {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
    if (formData.password === "") {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    if (formData.username && formData.password) {
      setLoading(true);
      try {
        const response = await signIn("credentials", {
          ...formData,
          redirect: false,
        });
        console.log(response);
        if (response?.error === "Invalid credentials") {
          setLoading(false);
          setError("credentials does not match");
        } else if (response?.ok) {
          setLoading(false);
          setLogin(false);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  }

  return (
    <div className="layout">
      <Header
        openSearchModal={openSearchModal}
        openCartModal={openCartModal}
        openWishModal={openWishModal}
        openLoginModal={openLoginModal}
      />
      <div className="admin-dashboard">{children}</div>
      <Footer />
      <div className="search-modal">
        <Modal show={open} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Search Products</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TextField
              variant="outlined"
              fullWidth
              placeholder="Search Products"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              value={search}
              sx={{ marginBottom: "1em" }}
            />
            {search && (
              <div className="search-layout">
                {filteredProducts.length > 0 ? (
                  <Grid
                    container
                    spacing={3}
                    rowSpacing={3}
                    marginTop="2em"
                    marginBottom="2em"
                  >
                    {filteredProducts.map(
                      ({
                        thumbnail,
                        title,
                        id,
                        price,
                        category,
                        discountPercentage,
                      }: ProductsTypes) => (
                        <Grid item key={id} xs={6} md={4}>
                          <Card>
                            <Link
                              href={`/products/${id}`}
                              style={{
                                textDecoration: "none",
                                color: "inherit",
                              }}
                            >
                              <CardMedia
                                component="img"
                                height="150"
                                image={thumbnail}
                                alt={title}
                              />
                              <CardContent>
                                <div
                                  style={{
                                    minHeight: "1.8em",
                                    marginTop: "0.5em",
                                  }}
                                >
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
                                <div
                                  style={{
                                    display: "flex",
                                    marginTop: "1em",
                                    gap: "0.5em",
                                    justifyContent: "center",
                                  }}
                                >
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
                ) : (
                  <div style={{ marginTop: "2em", marginBottom: "2em" }}>
                    <Typography
                      align="center"
                      variant="body2"
                      fontFamily="Montserrat"
                    >
                      No result found
                    </Typography>
                  </div>
                )}
              </div>
            )}
          </Modal.Body>
        </Modal>
      </div>
      <div className="cart-modal">
        <Modal show={openCart} onHide={handleCartClose}>
          <Modal.Header closeButton>
            <Modal.Title>Products Cart</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="cart-cont">
              {cart
                .filter(
                  ({ id }: any, index: any) =>
                    !cart.map(({ id }: any) => id).includes(id, index + 1)
                )
                .map((item: any) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1em",
                    }}
                    className="cart-mate"
                  >
                    <div style={{ width: "25%" }}>
                      <Image
                        src={item.thumbnail}
                        alt="product"
                        width={150}
                        height={120}
                        style={{ width: "100%" }}
                      />
                    </div>
                    <Typography
                      variant="body2"
                      fontWeight="700"
                      fontFamily="Montserrat"
                      fontSize={10}
                      width="32%"
                    >
                      {item.title}
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.7em",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="#252B42"
                        fontWeight="700"
                        fontFamily="Montserrat"
                        fontSize={12}
                      >
                        {item.count ? item.count : 1}
                      </Typography>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <IconButton
                          color="primary"
                          aria-label="add to shopping cart"
                          onClick={() => increaseCount(item.id)}
                        >
                          <ArrowDropUpIcon />
                        </IconButton>
                        <IconButton
                          color="primary"
                          aria-label="add to shopping cart"
                          onClick={() => decreaseCount(item.id)}
                        >
                          <ArrowDropDownIcon />
                        </IconButton>
                      </div>
                    </div>
                    <div>
                      <Typography
                        variant="body2"
                        color="#252B42"
                        fontWeight="700"
                        fontFamily="Montserrat"
                        fontSize={16}
                      >
                        ${getSubtotalPrice(item)}
                      </Typography>
                      <div onClick={() => deleteCartItem(item.id)}>
                        <Typography
                          variant="body2"
                          color="error"
                          fontWeight="700"
                          fontFamily="Montserrat"
                          fontSize={8}
                          align="right"
                          sx={{ cursor: "pointer" }}
                        >
                          Delete
                        </Typography>
                      </div>
                    </div>
                  </div>
                ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "2em",
                }}
              >
                <div>
                  <Typography
                    variant="h5"
                    color="#252B42"
                    fontWeight="700"
                    fontFamily="Montserrat"
                  >
                    Total
                  </Typography>
                  <Typography
                    variant="body2"
                    fontFamily="Montserrat"
                    fontSize={12}
                    marginTop="-5px"
                  >
                    {
                      cart.filter(
                        ({ id }: any, index: any) =>
                          !cart.map(({ id }: any) => id).includes(id, index + 1)
                      ).length
                    }{" "}
                    items
                  </Typography>
                </div>
                <Typography
                  variant="h4"
                  color="#252B42"
                  fontWeight="700"
                  fontFamily="Montserrat"
                >
                  ${getTotalPrice()}
                </Typography>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div className="wishlist-modal">
        <Modal show={openWish} onHide={handleWishClose}>
          <Modal.Header closeButton>
            <Modal.Title>Wishlish</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="cart-cont">
              {wishlist
                .filter(
                  ({ id }: any, index: any) =>
                    !wishlist.map(({ id }: any) => id).includes(id, index + 1)
                )
                .map((item: any) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1em",
                    }}
                    className="cart-mate"
                  >
                    <div style={{ width: "40%" }}>
                      <Image
                        src={item.thumbnail}
                        alt="product"
                        width={150}
                        height={150}
                        style={{ width: "100%" }}
                      />
                    </div>
                    <Typography
                      variant="body2"
                      fontWeight="700"
                      fontFamily="Montserrat"
                      fontSize={10}
                      width="32%"
                    >
                      {item.title}
                    </Typography>
                    <div>
                      <Typography
                        variant="h6"
                        color="#252B42"
                        fontWeight="700"
                        fontFamily="Montserrat"
                      >
                        ${getSubtotalPrice(item)}
                      </Typography>
                      <div onClick={() => deleteWishListItem(item.id)}>
                        <Typography
                          variant="body2"
                          color="error"
                          fontWeight="700"
                          fontFamily="Montserrat"
                          fontSize={8}
                          align="right"
                          sx={{ cursor: "pointer" }}
                        >
                          Delete
                        </Typography>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Modal.Body>
        </Modal>
      </div>
      <div className="login-modal">
        <Modal show={login} onHide={handleLoginClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "2em",
            }}
          >
            <>
              <form
                onSubmit={handleSubmit}
                style={{
                  width: "100%",
                }}
              >
                <TextField
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  label="Username"
                  fullWidth
                  variant="outlined"
                  error={usernameError}
                  value={formData.username}
                  placeholder="kminchelle"
                />
                <FormControl
                  sx={{ width: "100%", marginTop: "2em" }}
                  variant="outlined"
                >
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                    value={formData.password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    placeholder="0lelplR"
                  />
                </FormControl>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "0.3em",
                    width: "100%",
                  }}
                >
                  <FormControlLabel
                    control={<Checkbox defaultChecked color="primary" />}
                    label="Remember Me"
                  />
                  <Typography
                    variant="body2"
                    fontWeight="700"
                    fontFamily="Montserrat"
                    fontSize={14}
                    sx={{ color: "#23a6f0", cursor: "pointer" }}
                  >
                    Forgot Password?
                  </Typography>
                </div>
                <LoadingButton
                  type="submit"
                  size="large"
                  fullWidth
                  endIcon={<SendIcon />}
                  loading={loading}
                  loadingPosition="end"
                  variant="contained"
                  sx={{ marginTop: "3em" }}
                >
                  <span>Login</span>
                </LoadingButton>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    marginTop: "10px",
                    gap: "6px",
                  }}
                >
                  <Typography
                    variant="body2"
                    fontWeight="500"
                    fontFamily="Montserrat"
                    fontSize={12}
                  >
                    Don’t have an account yet?
                  </Typography>
                  <Typography
                    variant="h6"
                    fontWeight="700"
                    fontFamily="Montserrat"
                    fontSize={14}
                    sx={{ color: "#23a6f0", cursor: "pointer" }}
                  >
                    Sign Up
                  </Typography>
                </div>
                <Providers />
              </form>
            </>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
}
