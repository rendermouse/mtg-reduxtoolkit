// slice for selecting mana cost
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type CardToolsState = {
    manaFilter: Array<boolean>;
}

const initialState: CardToolsState = {
  manaFilter: [true,true,true,true,true,true,true,true,true,true]
}

export const manaFilterSlice = createSlice({
  name: "manaFilter",
  initialState,
  reducers: {
    setManaFilter(state, action: PayloadAction<Array<boolean>>) {
      state.manaFilter = action.payload
    },
  },
})

export default manaFilterSlice.reducer;
export const { setManaFilter } = manaFilterSlice.actions;
export const selectManaFilter = (state: any) => state.manaFilter.manaFilter;
