import { useDispatch } from 'react-redux';
import { changeFilter } from 'redux/contactsSlice';
import { SearchInput, SearchLabel } from './Filter.styled';

export const Filter = () => {
  const dispatch = useDispatch();

  const handleChangeFilter = e => {
    dispatch(changeFilter(e.currentTarget.value));
  };

  return (
    <>
      <SearchLabel htmlFor="">Find contact by name and number</SearchLabel>
      <SearchInput
        type="text"
        name="filter"
        onChange={handleChangeFilter}
        placeholder="Search"
      />
    </>
  );
};
