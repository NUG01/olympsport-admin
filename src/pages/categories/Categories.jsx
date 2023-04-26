import { useEffect, useState } from "react";
import checkAuth from "../../guards/checkAuth";
import BasicTable from "../../components/BasicTable";
import BasicAxios from "../../helpers/axios/BasicAxios";
import { Load, RemoveLoader } from "../../hooks/Loader";


export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [columnNames, setColumnNames] = useState([]);

  function orderCategories(data){
    data.forEach(item => {
      setCategories(categories => [...categories, item])
      if(item.children && item.children.length > 0) orderCategories(item.children)
    })
    
    RemoveLoader()
  }

  useEffect(() => {

    Load()

    BasicAxios.get("admin/categories").then((res) => {
      console.log(res.data.data);
      orderCategories(res.data.data)
      setColumnNames(Object.keys(res.data.data[0]));
    });
  }, []);

  if (columnNames && columnNames.find((c) => c == "children")) {
    const filteredNames = columnNames.filter((name) => name !== "children");
    setColumnNames(filteredNames);
  }

  return (
    <BasicTable type="Categories" data={categories} columns={columnNames} />
  );
}
