import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input;

const onSearch = value => console.log(value);

const SearchBar = () => {
  return (
    <>
      <Search placeholder="input search text" onSearch={onSearch} style={{ width: 200 }} />
    </>
  )
}

export default SearchBar
