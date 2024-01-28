import { createSlice, PayloadAction, createAsyncThunk, Draft } from "@reduxjs/toolkit";
import { UserInterface, MovieInterface } from "@/types";
import { openDatabase } from "@/libs/helpers";

const initialState: UserInterface = {
  userId: "",
  username: "",
  firstName: null,
  lastName: null,
  watchList: [],
  watched: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addWatchList: (state, action: PayloadAction<MovieInterface>) => {
      // Menambahkan film ke list
      state.watchList.push(action.payload);
    },
    removeWatchList: (state, action: PayloadAction<number>) => {
      // Menghapus film berdasarkan ID dari array watchList
      state.watchList = state.watchList.filter((movie: any) => movie.id !== action.payload);
    },
    markAsWatched: (state, action: PayloadAction<MovieInterface>) => {
      // Manambahkan film ke list
      state.watched.push(action.payload);
    },
    removeAsWatched: (state, action: PayloadAction<number>) => {
      // Menghapus film berdasarkan ID dari array watched
      state.watched = state.watched.filter((movie: any) => movie.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(saveToDB.fulfilled, (state, action) => {})
      .addCase(retrieveFromDB.fulfilled, (state, action) => {
        state.watched = action.payload
      })
  },
});

// Async action untuk menyimpan watched atau watchlist ke IndexedDB
export const saveToDB = createAsyncThunk(
  "user/saveToDB",
  async ({ movie, dbName, storeName }: { movie: MovieInterface, dbName: string, storeName: string }) => {
    try {
      const db = await openDatabase(dbName, storeName);
      const tx = db.transaction(storeName, "readwrite");
      const store = tx.objectStore(storeName);

      // Simpan film ke IndexedDB
      store.put(movie);

      await new Promise<void>((resolve, reject) => {
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
    } catch (error) {
      console.error(`Error saving movie to IndexedDB (${storeName}):`, error);
      throw error;
    }
  }
);

// Async action untuk mengambil data dari InexedDB
export const retrieveFromDB = createAsyncThunk(
  "user/retrieveFromDB",
  async ({ dbName, storeName }: { dbName: string, storeName: string }): Promise<Draft<MovieInterface>[]> => {
    try {
      const db = await openDatabase(dbName, storeName);
      const tx = db.transaction(storeName, "readonly");
      const store = tx.objectStore(storeName);

      // Mendapatkan semua data dari objek store
      const allData: unknown = await store.getAll();

      return allData as Draft<MovieInterface>[];
    } catch (error) {
      console.error(`Error retrieving data from IndexedDB (${storeName}):`, error);
      throw error;
    }
  }
);


export const { addWatchList, markAsWatched, removeAsWatched, removeWatchList } = userSlice.actions;
export default userSlice.reducer;
