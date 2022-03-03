import { useEffect } from 'react';

import { Input } from 'antd';
import Typed from 'typed.js';

interface Props {
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const { Search } = Input;
const SearchBar = ({ searchTerm, handleSearchChange }: Props) => {
  useEffect(() => {
    // Options for the Typed object
    const options = {
      strings: ['Hey, If you need to find something just search and it will filter it', 'For Example', 'Guide', 'Grammar', 'Tool', ''],
      bindInputFocusEvents: true,
      attr: 'placeholder',
      typeSpeed: 25,
      backSpeed: 25,
      cursorChar: '_',
      startDelay: 1000,
      smartBackspace: true,
      showCursor: true,
    };

    // New Typed instance
    const typed = new Typed('.ant-input', options);

    // Destroy Typed instance on unmounting the component to prevent memory leaks
    return () => {
      typed.destroy();
    };
  }, []);
  return <Search placeholder="Search to filter what you are looking for" type="text" value={searchTerm} onChange={handleSearchChange} />;
};

export default SearchBar;
