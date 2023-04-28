import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import checkAuth from "../../guards/checkAuth";
import BasicAxios from "../../helpers/axios/BasicAxios";
import BasicTable from "../../components/BasicTable";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    BasicAxios.get("brands").then((res) => {
      setColumnNames(Object.keys(res.data.data[0]));
      setBrands(res.data.data);
      setLoaded(true);
    });
  }, []);
  if (!loaded) return;

  return <BasicTable type="Brands" data={brands} columns={columnNames} />;
}
