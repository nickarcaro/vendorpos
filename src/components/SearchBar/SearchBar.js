import { Input } from "antd";

const { Search } = Input;

const onSearch = (value) => console.log(value);

const SearchBar = () => {
  return (
    <>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{ width: 200 }}
      />
    </>
  );
};

export default SearchBar;
