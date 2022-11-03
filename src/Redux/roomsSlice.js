import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const getRooms = createAsyncThunk('rooms/getRooms', async () => {
  const response = await axios.get('http://127.0.0.1:3001/room-list');
  return response.data.rooms;
});

export const roomsSlice = createSlice({
  name: 'rooms',
  initialState: {
    data: [],
    loading: 'idle',
    error: null,
  },

  reducers: {},
  extraReducers: (builder) => {
    /* eslint-disable no-param-reassign */
    // Pending
    builder.addCase(getRooms.pending, (state) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    });

    // Fulfilled
    builder.addCase(getRooms.fulfilled, (state, action) => {
      if (state.loading === 'pending') {
        state.data = action.payload;
        state.loading = 'idle';
      }
    });

    // Rejected
    builder.addCase(getRooms.rejected, (state) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = 'An error occurred !';
      }
    });
  },
});

export default roomsSlice.reducer;
