import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { handleSubTotalCalc } from "../../app/util/util";
import { addBasketItemAsync, removeBasketItemAsync } from "./basketSlice";
import BasketSummary from "./BaskSummary";

export default function BasketPage() {
  // const { basket } = useStoreContext();
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  // const { setBasket, removeItem } = useStoreContext();
  // const [status, setStatus] = useState({
  //   loading: false,
  //   name: "",
  // });

  if (!basket || basket.items.length === 0)
    return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="your basket items">
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Sub Total</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.productId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link
                    to={`/catalog/${item.productId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Box display="flex" alignItems="center">
                      <img
                        src={item.pictureUrl}
                        alt={`${item.name}`}
                        style={{ height: 50, marginRight: 20 }}
                      />
                      <Typography
                        variant="inherit"
                        sx={{ color: "primary.main" }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  </Link>
                </TableCell>
                <TableCell align="center">{`${handleSubTotalCalc(
                  item.price
                )}`}</TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={
                      status === `pendingRemoveItem-${item.productId}-rem`
                    }
                    color="error"
                  >
                    <Remove
                      onClick={() =>
                        dispatch(
                          removeBasketItemAsync({
                            productId: item.productId,
                            quantity: 1,
                            name: "rem",
                          })
                        )
                      }
                    />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton
                    loading={status === `pendingAddItem-${item.productId}`}
                    color="success"
                  >
                    <Add
                      onClick={() =>
                        dispatch(
                          addBasketItemAsync({
                            productId: item.productId,
                          })
                        )
                      }
                    />
                  </LoadingButton>
                </TableCell>
                <TableCell align="center">{`${handleSubTotalCalc(
                  item.price,
                  item.quantity
                )}`}</TableCell>
                <TableCell align="center">
                  <LoadingButton
                    loading={
                      status === `pendingRemoveItem-${item.productId}-del`
                    }
                    color="error"
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: "del",
                        })
                      )
                    }
                  >
                    <Delete />
                  </LoadingButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container style={{ marginTop: "10px" }}>
        <Grid item sm={6} />
        <Grid item sm={6}>
          <BasketSummary />
          <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
            style={{ marginTop: "10px" }}
          >
            Checkout
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
