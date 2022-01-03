import { Grid, Paper } from "@mui/material";
import { useEffect } from "react";
import AppPAgination from "../../app/components/AppPagination";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  fetchFilters,
  fetchProductsAsync,
  productSlectors,
  setPageNumber,
  setProductParams,
} from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Highest to lowest price" },
  { value: "price", label: "Lowest to Highest price" },
];

export default function Catalog() {
  // const [products, setProducts] = useState<Product[]>([]);
  // const [loading, setLoading] = useState(true);

  const products = useAppSelector(productSlectors.selectAll);
  const {
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // agent.Catalog.list()
    //   .then((products) => setProducts(products))
    //   .catch((e) => console.log(e))
    //   .finally(() => setLoading(false));

    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [dispatch, productsLoaded]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [filtersLoaded, dispatch]);

  if (!filtersLoaded) return <LoadingComponent message="Fetching products.." />;

  return (
    <Grid container columnSpacing={4}>
      <Grid item xs={3}>
        <ProductSearch />
        <RadioButtonGroup
          selectedValue={productParams.orderBy}
          options={sortOptions}
          onChange={(event) =>
            dispatch(setProductParams({ orderBy: event.target.value }))
          }
        />
        <Paper sx={{ mb: 2, padding: 2 }}>
          <CheckboxButtons
            items={brands}
            checked={productParams.brands}
            onChange={(items) => dispatch(setProductParams({ brands: items }))}
          />
        </Paper>
        <Paper sx={{ mb: 2, padding: 2 }}>
          <CheckboxButtons
            items={types}
            checked={productParams.types}
            onChange={(items) => dispatch(setProductParams({ types: items }))}
          />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        {products.length > 0 ? (
          <ProductList products={products} />
        ) : (
          <h3>Not matching products for "{productParams.searchTerm}"</h3>
        )}
      </Grid>
      <Grid item xs={3} />
      <Grid item xs={9} sx={{ mb: 2 }}>
        {metaData && (
          <AppPAgination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        )}
      </Grid>
    </Grid>
  );
}
