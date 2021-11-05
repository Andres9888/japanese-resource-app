import { Input } from 'antd';

interface Props {
  searchTerm: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const { Search } = Input;
const SearchBar = ({ searchTerm, handleChange }: Props) => {
  return (
    <Search
      placeholder="Search to filter what you are looking for"
      type="text"
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
