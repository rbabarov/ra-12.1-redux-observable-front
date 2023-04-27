import {configureStore} from '@reduxjs/toolkit';
import skillsReducer from '../slices/skillsSlice';
import {createEpicMiddleware, combineEpics, Epic} from 'redux-observable';
import {changeSearchEpic, searchSkillsEpic} from '../epics';

const epic: Epic = combineEpics(
  changeSearchEpic,
  searchSkillsEpic,
);

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    skills: skillsReducer,
  },
  middleware: [epicMiddleware]
});

epicMiddleware.run(epic)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
