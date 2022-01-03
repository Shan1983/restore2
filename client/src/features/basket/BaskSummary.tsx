import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

// import { useStoreContext } from "../../app/context/StoreContext";
import { useAppSelector } from "../../app/store/configureStore";
import { handleSubTotalCalc } from "../../app/util/util";

export default function BasketSummary() {
  //   const { basket } = useStoreContext();
  const { basket } = useAppSelector((state) => state.basket);

  const subTotal =
    basket?.items.reduce((sum, item) => {
      return sum + item.quantity * item.price;
    }, 0) ?? 0;

  const deliveryFee = subTotal > 10000 ? 0 : 999;

  return (
    <>
      <TableContainer component={Paper} variant={"outlined"}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={2}>Subtotal</TableCell>
              <TableCell align="right">
                {handleSubTotalCalc(subTotal)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Delivery fee*</TableCell>
              <TableCell align="right">
                {handleSubTotalCalc(deliveryFee)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell align="right">
                {handleSubTotalCalc(subTotal + deliveryFee)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <span style={{ fontStyle: "italic" }}>
                  *Orders over $100 qualify for free delivery
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
