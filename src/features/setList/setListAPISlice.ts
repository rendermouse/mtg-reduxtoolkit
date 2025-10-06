// Need to use the React-specific entry point to import `createApi`
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

type Set = {
    code: string,
    name: string,
    gathererCode: string,
    oldCode: string,
    magicCardsInfoCode: string,
    releaseDate: string,
    border: string,
    type: string,
    block: string,
    onlineOnly: boolean,
    booster: string[],
    mkmId: string,
    mkmName: string,
}

type SetListApiResponse = {
  sets: Set[],
  total: number,
  skip: number,
  limit: number
}

export const setListApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.magicthegathering.io/v1/sets" }),
  reducerPath: "setListApi",
  tagTypes: ["SetList"],
  endpoints: build => ({
    getSetList: build.query<SetListApiResponse, string>({
      query: () => '',
      providesTags: (_result, _error, id) => [{ type: "SetList", id }],
    }),
  }),
})

export const { useGetSetListQuery } = setListApiSlice;
