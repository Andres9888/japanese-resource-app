import { Input } from 'antd';

interface Props {
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const { Search } = Input;
const SearchBar = ({ searchTerm, handleSearchChange }: Props) => {
  return <Search placeholder="Search to filter what you are looking for" type="text" value={searchTerm} onChange={handleSearchChange} />;
};

export default SearchBar;
