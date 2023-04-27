import './Skills.scss';
import { ChangeEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { selectError, selectItems, selectLoading, selectSearch } from '../../slices/skillsSlice';
import {
  changeSearchField,
  searchSkillsFailure,
  searchSkillsRequest,
  searchSkillsSuccess
} from '../../slices/skillsSlice';

export default function Skills(): JSX.Element {
  const error = useAppSelector(selectError);
  const items = useAppSelector(selectItems);
  const loading = useAppSelector(selectLoading);
  const search = useAppSelector(selectSearch);
  const dispatch = useAppDispatch();
  const hasQuery = search.trim() !== '';

  useEffect(() => {
    console.log({ search, items, loading, error })
  }, [search, items, loading, error])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(changeSearchField({ search: value }))
  }

  return (
    <div className="item">
      <input
        type="search"
        value={search}
        onChange={handleChange}
        className="item__input"
      />
      {!hasQuery && <div className='item__text'>Type something to search...</div>}
      {hasQuery && loading && <div className='item__searching'>searching...</div>}
      {error && hasQuery && <div className='item__error'>Error: {error.message}</div>}
      {items?.length ? <ul className='item__list list'>
        {items.map((el) => <li className='list__item list-item' key={el.id}>{el.name}</li>)}
      </ul> : null}
      {!items && hasQuery && <div className='item__noresult'>There are no results...</div>}
    </div>
  )
}