import React, { useState } from "react";
import { Box, Typography, IconButton, Button, Stack, CircularProgress, Badge, Snackbar, Alert } from "@mui/material";
import { Add, Remove, ShoppingCart } from "@mui/icons-material";
import { styled, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import { useGetproductsByNameQuery } from "../../Redux/productsApi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseQuantity, increaseQuantity } from "Redux/cartSlice";
import { useNavigate } from "react-router-dom";
import "./Home.css";

// Badge styling (يمكنك تعديلها حسب الحاجة)
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {},
}));

const Home = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Snackbar state
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Fetch all products
  const { data, error, isLoading } = useGetproductsByNameQuery();

  const { selectedProducts, selectedProductsID } = useSelector(
    (state) => state.carttt
  );

  // Get quantity of a product in cart
  const productQuantity = (itemAPI) => {
    const myProduct = selectedProducts.find((itemUser) => itemUser.id === itemAPI.id);
    return myProduct?.quantity || 0;
  };

  // Handle Add to Cart and show snackbar
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    setSnackbarMessage(`${item.productName} added to cart!`);
    setOpenSnackbar(true);
  };

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Typography variant="h4" color="error">
          ERROR
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Stack direction="row" sx={{ flexWrap: "wrap", justifyContent: "center" }}>
        {data?.map((item) => (
          <Card key={item.id} sx={{ maxWidth: 277, mb: 6, mx: 2 }} className="card">
            <CardMedia
              component="img"
              height="277"
              image={item.imageLink[0]}
              alt={item.productName}
              onClick={() => navigate(`product-details/${item.id}`)}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }} disableSpacing>
              {selectedProductsID.includes(item.id) ? (
                <div style={{ display: "flex", alignItems: "center" }} dir="rtl">
                  <IconButton color="primary" sx={{ ml: 1 }} onClick={() => dispatch(increaseQuantity(item))}>
                    <Add fontSize="small" />
                  </IconButton>
                  <StyledBadge badgeContent={productQuantity(item)} color="primary" />
                  <IconButton color="primary" sx={{ mr: 1 }} onClick={() => dispatch(decreaseQuantity(item))}>
                    <Remove fontSize="small" />
                  </IconButton>
                </div>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ textTransform: "capitalize", p: 1, lineHeight: 1.1 }}
                  onClick={() => handleAddToCart(item)}
                >
                  <ShoppingCart sx={{ fontSize: 18, mr: 1 }} /> Add to cart
                </Button>
              )}
              <Typography variant="body1" color={theme.palette.error.light} mr={1}>
                ${item.price}
              </Typography>
            </CardActions>
          </Card>
        ))}
      </Stack>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;
