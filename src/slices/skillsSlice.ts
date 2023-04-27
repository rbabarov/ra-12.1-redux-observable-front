import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface Item {
  id: number,
  name: string,
}

export interface Skills {
  items: Item[] | null,
  loading: boolean,
  error: null | Error,
  search: string
}

export interface SearchAction {
  type: string;
  payload: any
}

const initialState: Skills = {
  items: [],
  loading: false,
  error: null,
  search: ''
}

export const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    changeSearchField: (state: Skills, action: PayloadAction<{ search: string }>) => {
      const { search } = action.payload;
      return { items: [], search, loading: false, error: null }
    },
    searchSkillsRequest: (state: Skills, action: PayloadAction<{ search: string }>) => {
      return { ...state, items: [], loading: true, error: null }
    },
    searchSkillsFailure: (state: Skills, action: PayloadAction<{ error: Error }>) => {
      const { error } = action.payload;
      return { ...state, items: [], loading: false, error }
    },
    searchSkillsSuccess: (state: Skills, action: PayloadAction<{ items: Item[] | null }>) => {
      const { items } = action.payload;
      let result;
      if (items?.length) {
        result = items;
      } else {
        result = null
      }
      return { ...state, items: result, loading: false, error: null }
    }
  }
});

export const selectItems = (state: RootState) => state.skills.items;
export const selectLoading = (state: RootState) => state.skills.loading;
export const selectError = (state: RootState) => state.skills.error;
export const selectSearch = (state: RootState) => state.skills.search;
export const {
  changeSearchField,
  searchSkillsFailure,
  searchSkillsRequest,
  searchSkillsSuccess } = skillsSlice.actions;

export default skillsSlice.reducer;
