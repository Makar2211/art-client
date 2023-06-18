import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../axios.js';

export const fetchArtworks = createAsyncThunk('allArtworks', async () => {
  const { data } = await axios.get('/artworks');
  return data;
});

export const filterArtworks = createAsyncThunk('filterArtworks', async (filters) => {
  const { data } = await axios.get('/filterartworks', { params: filters });
  return data;
});

const initialState = {
  allitems: {
    item: [],
    status: 'loading',
  },
  filteritems: {
    item: [],
    status: 'loading',
  },
};

export const artworkSlice = createSlice({
  name: 'artwork',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchArtworks.pending]: (state, action) => {
      state.status = 'loading';
      state.allitems.item = [];
    },
    [fetchArtworks.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.allitems.item = action.payload;
    },
    [fetchArtworks.rejected]: (state, action) => {
      state.status = 'error';
      state.allitems.item = [];
    },
    [filterArtworks.pending]: (state, action) => {
      state.status = 'loading';
      state.filteritems.item = [];
    },
    [filterArtworks.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.filteritems.item = action.payload;
    },
    [filterArtworks.rejected]: (state, action) => {
      state.status = 'error';
      state.filteritems.item = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {} = artworkSlice.actions;

export const artworkReducer = artworkSlice.reducer;
