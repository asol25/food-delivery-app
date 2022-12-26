import PropTypes from 'prop-types';
// @mui
import { Grid } from '@mui/material';
import ShopProductCard from './ProductCard';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  filterProducts: PropTypes.array.isRequired,
  setProducts: PropTypes.func.isRequired,
};

export default function ProductList({ products, filterProducts, setProducts, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {filterProducts.map((product) => (
        <Grid key={product.id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} setProducts={setProducts} products={products} />
        </Grid>
      ))}
    </Grid>
  );
}
