import React, { useEffect, useState, useContext } from 'react'
import {getMeApi} from '../api/user'
import {getStores, putUserStore} from '../api/stores'
import useAuth from '../hooks/useAuth'
import { List, Button } from "antd";
import { StoreContext } from '../context/StoreContext'
import { useHistory } from "react-router-dom";



const SelectStore = () => {
  const [user, setUser] = useContext(StoreContext)
  const { auth, logout } = useAuth();
  const [stores, setStores] = useState([])
  const [storesFetched, setStoresFetched] = useState(false)
  const [storeId, setStoreId] = useState(undefined)
  const history = useHistory()
  

  useEffect(() => {
    (async () => {
      if (user === undefined) return
      if (user.is_admin === false) history.push("/pos")
      else if (user.is_admin === true){
        const storeData = await getStores(user.id, logout)
        console.log('storedata: ',  storeData)
        setStores(storeData)
        setStoresFetched(true)
      }
    })();
  }, [storesFetched , user, logout]);

  // useEffect(() => {
  //   localStorage.setItem("POS-Almacenes-Cart", JSON.stringify(cart))
  // },[cart]);

  useEffect(()=>{
    (async () => {
      if (user === undefined) return
      if (storeId === undefined) return
      await putUserStore(user.id, {...user, almacen: storeId}, logout)
      history.push("/post")
    })();
  },[storeId])

  console.log('user: ', user)
  console.log('stores: ', stores)
  return (
    <div>
      <List
        style={{ background: "#fff" }}
        bordered
        dataSource={stores}
        renderItem={(almacen) => (
          <List.Item>
            {/* <List.Item.Meta
  
              title={almacen.nombre}
              description={
                <Button>asdf</Button>
              }
            /> */}
            <Button onClick={()=>{
              setStoreId(almacen.id)
            }}>
              nombre: {almacen.nombre}
              , id:  {almacen.id}
            </Button>
            
          </List.Item>
        )}
      />
    </div>
  )
}

export default SelectStore
