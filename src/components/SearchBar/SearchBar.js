import { Input } from "antd";

const { Search } = Input;

const onSearch = (value) => console.log(value);

/**
 * Componente barra de busqueda
 * @param {object} props 
 * @param {function} props.setFilterText setter de filterText
 * @returns Renderizado barra de busqueda
 */
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
