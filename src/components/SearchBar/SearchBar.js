import { Input } from "antd";

const { Search } = Input;

const onSearch = (value) => console.log(value);

const SearchBar = ({setFilterText}) => {

  // const onChange = e => console.log(e.target.value)
  const onChange = e => setFilterText(e.target.value)

  return (
    <>
      <Search
        placeholder="Buscar Productos"
        onSearch={onSearch}
        onChange={onChange}
        style={{ width: 200 }}
      />
    </>
  );
};

export default SearchBar;
