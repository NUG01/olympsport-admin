import { useEffect } from "react";
import checkAuth from "../../guards/checkAuth";
import BasicAxios from "../../helpers/axios/BasicAxios";
import { useParams } from "react-router-dom";

function CategoryEdit() {
  const params = useParams();
  useEffect(() => {
    BasicAxios.get("category/" + params.id).then((res) => {
      console.log(res);
    });
  }, []);
  return <h1 style={{ backgroundColor: "red" }}>CategoryEdit</h1>;
}

// export default checkAuth(MainPage)
export default CategoryEdit;
