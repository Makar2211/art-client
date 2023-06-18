import { configureStore } from '@reduxjs/toolkit';
import { artworkReducer } from './slices/artwork';

export const store = configureStore({
  reducer: { artworks: artworkReducer },
});
