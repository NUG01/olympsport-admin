import { useEffect, useState } from "react";
import checkAuth from "../../guards/checkAuth";
import BasicTable from "../../components/BasicTable";
import BasicAxios from "../../helpers/axios/BasicAxios";

const categories = [
  { id: 1, name: "1st category", number_of_products: 23, brands: 4 },
  { id: 2, name: "2nd category", number_of_products: 0, brands: 65 },
  { id: 3, name: "3rd category", number_of_products: 4, brands: 6 },
  { id: 4, name: "4th category", number_of_products: 1, brands: 2 },
  { id: 5, name: "5th category", number_of_products: 55, brands: 7 },
];

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [dataIsFetched, setDataIsFetched] = useState(false);
  useEffect(() => {
    BasicAxios.get("categories").then((res) => {
      setCategories(res.data.data);
      setColumnNames(Object.keys(res.data.data[0]));
      setDataIsFetched(true);
    });
  }, []);

  if (columnNames && columnNames.find((c) => c == "children")) {
    const filteredNames = columnNames.filter((name) => name !== "children");
    setColumnNames(filteredNames);
  }

  if (!dataIsFetched) return;

  return (
    <BasicTable type="Categories" data={categories} columns={columnNames} />
  );
}
