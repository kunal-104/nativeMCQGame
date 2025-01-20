import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const products = [
    {
      id: '1',
      name: 'T-Shirt',
      brand: 'Nike',
      price: '$25',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '2',
      name: 'Jeans',
      brand: 'Levi’s',
      price: '$45',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '3',
      name: 'Jacket',
      brand: 'Adidas',
      price: '$65',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '4',
      name: 'Sneakers',
      brand: 'Puma',
      price: '$80',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '5',
      name: 'Cap',
      brand: 'Reebok',
      price: '$20',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: '6',
      name: 'Socks',
      brand: 'Under Armour',
      price: '$10',
      image: 'https://via.placeholder.com/150',
    },
  ];


// Thunk to fetch products from an API
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://fakestoreapi.com/products'); // Example API
  const data = await response.json();
//   console.log('products',data);
  return data;
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    // items: products,
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {
    // You can add other synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload; // Set the products from the API response
        
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
