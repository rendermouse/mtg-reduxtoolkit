import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type Legality = {
  format: string,
  legality: string
}

export type Identifier = {
  multiverseid: number,
  scryfallid: string
}

export type Ruling = {
  date: string,
  text: string
}

export type ForeignName = {
  name: string,
  text: string,
  type: string,
  flavor: string,
  imageUrl: string,
  language: string,
  identifiers: Identifier[],
  multiverseid: number
}

export type CardData = {
  name: string,
  multiverseid: string,
  layout: string,
  names: string[],
  manaCost: string,
  cmc: string,
  colors: string[],
  type: string,
  types: string[],
  subtypes: string[],
  rarity: string,
  text: string,
  flavor: string,
  artist: string,
  number: string,
  power: string,
  toughness: string,
  reserved: string,
  rulings: Ruling[],
  foreginNames: ForeignName[],
  printings: string[],
  originalText: string,
  originalType: string,
  legalities: Legality[],
  source: string,
  imageUrl: string,
  set: string,
  id: string
}

type CardListApiResponse = {
  cards: CardData[],
  total: number,
  skip: number
}

// Redux Toolkit Query API slice to fetch cards by set code
export const cardListApiSlice = createApi({
  reducerPath: "cardListApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.magicthegathering.io/v1/cards" }),
  endpoints: (build) => ({
    // accepts an object so callers can request pages: { setCode, page, pageSize }
    getCardList: build.query<CardListApiResponse, { setCode: string; page?: number; pageSize?: number }>({
      query: ({ setCode, page = 1, pageSize = 100 }) => `?set=${setCode}&page=${page}&pageSize=${pageSize}`,
    }),
  }),
})

// A slice to store the currently selected set code
export type SelectedSetState = {
  currentSetCode: string
}

const initialState: SelectedSetState = {
  currentSetCode: "AER",
}

export const selectedSetSlice = createSlice({
  name: "selectedSet",
  initialState,
  reducers: {
    setCurrentSetCode(state, action: PayloadAction<string>) {
      state.currentSetCode = action.payload
    },
  },
})

export const { setCurrentSetCode } = selectedSetSlice.actions
export const selectCurrentSetCode = (state: any) => state.selectedSet.currentSetCode

export const { useGetCardListQuery } = cardListApiSlice

export default selectedSetSlice.reducer
