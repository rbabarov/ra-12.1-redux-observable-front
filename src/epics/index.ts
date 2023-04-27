import { Observable, AnyAction } from '@reduxjs/toolkit';
import { Epic, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { map, filter, debounceTime, switchMap, catchError } from 'rxjs/operators';
import {
  searchSkillsFailure,
  searchSkillsRequest,
  searchSkillsSuccess,
  changeSearchField
} from '../slices/skillsSlice';
import skillsReducer from '../slices/skillsSlice';
import { Item, SearchAction } from '../slices/skillsSlice';

export type TState = ReturnType<typeof skillsReducer>;
export type TEpic = Epic<AnyAction, AnyAction, TState>
export interface IAjax {
  getJSON<T>(url: string, headers?: Object): Observable<T>
}

export const changeSearchEpic: Epic<SearchAction, SearchAction, TState> = (action$) => action$.pipe(
  ofType(changeSearchField.type),
  map(o => o.payload.search.trim()),
  filter(o => o !== ''),
  debounceTime(100),
  map(o => searchSkillsRequest({ search: o })),
)

export const searchSkillsEpic: Epic<SearchAction, SearchAction, TState> = (action$) => action$.pipe(
  ofType(searchSkillsRequest.type),
  map(o => o.payload.search),
  map(o => new URLSearchParams({ q: o })),

  switchMap(o => ajax.getJSON<Item[]>(`${process.env.REACT_APP_SEARCH_URL}?${o}`).pipe(
    map((o) => searchSkillsSuccess({ items: o })),
    catchError(e => of({
      type: searchSkillsFailure.type,
      payload: { error: e },
    }))
  )),
)

