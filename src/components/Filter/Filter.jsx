import { SearchInput, SearchLabel } from './Filter.styled';

export const Filter = ({ handleChangeFilter, filter }) => {
  return (
    <>
      <SearchLabel htmlFor="">Find contact by name and number</SearchLabel>
      <SearchInput
        type="text"
        name="filter"
        onChange={handleChangeFilter}
        value={filter}
        placeholder="Search"
      />
    </>
  );
};
