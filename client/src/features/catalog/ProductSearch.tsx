import { debounce, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";

export default function ProductSearch() {
  const { productParams } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);

  const debouncedSearch = debounce((event: any) => {
    dispatch(setProductParams({ searchTerm: event.target.value }));
  }, 1000);

  return (
    <Paper sx={{ mb: 2 }}>
      <TextField
        label="Search Products"
        variant="outlined"
        fullWidth
        value={searchTerm || ""}
        onChange={(event: any) => {
          setSearchTerm(event.target.value);
          debouncedSearch(event);
        }}
      />
    </Paper>
  );
}
