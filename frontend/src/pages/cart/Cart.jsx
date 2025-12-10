import { Box, Paper, Typography, IconButton, Stack, Button } from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, deleteProduct } from "Redux/cartSlice";

const Cart = () => {
  // @ts-ignore
  const { selectedProducts } = useSelector((state) => state.carttt);
  const dispatch = useDispatch();

  const subtotal = selectedProducts.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Box sx={{ p: 3, minHeight: "100vh" }}>
      <Typography variant="h4" fontWeight={700} mb={3} align="center">
        Cart
      </Typography>

      {selectedProducts.length === 0 ? (
        <Typography variant="h6" align="center" mt={5}>
          Your cart is empty.
        </Typography>
      ) : (
        <>
          {selectedProducts.map((item) => (
            <Paper
              key={item.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                mb: 2,
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              {/* Image + Name */}
              <Stack direction="row" spacing={2} alignItems="center">
                <img
                  src={item.imageLink[0]}
                  alt={item.productName}
                  style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 4 }}
                />
                <Typography>{item.productName}</Typography>
              </Stack>

              {/* Quantity */}
              <Stack direction="row" spacing={1} alignItems="center">
                <IconButton size="small" onClick={() => dispatch(decreaseQuantity(item))}>
                  <Remove />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton size="small" onClick={() => dispatch(increaseQuantity(item))}>
                  <Add />
                </IconButton>
              </Stack>

              {/* Price */}
              <Typography>${(item.price * item.quantity).toFixed(2)}</Typography>

              {/* Delete */}
              <IconButton color="error" onClick={() => dispatch(deleteProduct(item))}>
                <Delete />
              </IconButton>
            </Paper>
          ))}

          {/* Subtotal + Checkout */}
          <Paper sx={{ maxWidth: 300, mx: "auto", mt: 3, p: 2, borderRadius: 2, boxShadow: 1 }}>
            <Typography variant="h6" fontWeight={700} mb={2}>
              Subtotal: ${subtotal.toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ py: 1.5, fontSize: 16, borderRadius: 2 }}
              onClick={() => alert("Proceed to payment")}
            >
              Checkout
            </Button>
          </Paper>
        </>
      )}
    </Box>
  );
};

export default Cart;
