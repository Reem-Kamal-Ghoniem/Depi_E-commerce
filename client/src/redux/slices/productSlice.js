import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Axios from "../../axiosConfig";

// Initial state
const initialState = {
  products: [],
  product: null,
  filters: {},
  status: "idle",
  error: null,
};

// Async thunks
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await Axios.get("/products");
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/products/${id}`);
      return response.data.product;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductsByVendor = createAsyncThunk(
  "products/fetchByVendor",
  async (vendorId, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/products/vendor/${vendorId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/products/category/${categoryId}`);
      return response.data.products;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchProductsByKeyword = createAsyncThunk(
  "products/fetchByKeyword",
  async (keyword, { rejectWithValue }) => {
    try {
      console.log("Fetching products by keyword:", keyword);
      const response = await Axios.get(`/search?keyword=${keyword}`);
      console.log("Response from API:", response.data);
      return response.data.products;
    } catch (error) {
      console.error("Error fetching products by keyword:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createProduct = createAsyncThunk(
  "products/create",
  async (product, { rejectWithValue }) => {
    try {
      const response = await Axios.post("/products", product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/update",
  async ({ id, product }, { rejectWithValue }) => {
    try {
      const response = await Axios.put(`/products/${id}`, product);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      await Axios.delete(`/products/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Slice
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    resetProductsState: (state) => {
      state.products = [];
      state.status = "idle";
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder

      // Fetch all products
      .addCase(fetchAllProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Fetch product by ID
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Fetch products by vendor
      .addCase(fetchProductsByVendor.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByVendor.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProductsByVendor.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Fetch products by category
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Fetch products by keyword
      .addCase(fetchProductsByKeyword.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByKeyword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProductsByKeyword.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Create product
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Update product
      .addCase(updateProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        const index = state.products.findIndex(
          (product) => product._id === action.payload._id
        );
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      // Delete product
      .addCase(deleteProduct.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { resetProductsState, setFilters } = productSlice.actions; // Export the reset action

export default productSlice.reducer;
