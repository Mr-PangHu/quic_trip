import axios from "axios";
import { useState, useEffect, use } from "react";
import { Button, Input } from "antd";

export default function TestPage() {
  const [data, setData] = useState([]);
  const [val, setVal] = useState("");
  const getData = async (op) => {
    const results = await axios.post(`http://localhost:3000/api/mock/${op}`, {
      data: val,
    });
    console.log(results.data.users);
    const tmp = results.data.users.map((item) => item.name);
    setData(tmp);
    return;
  };

  useEffect(() => {
    getData("show");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p>{data.join(" | ")}</p>
      <Input
        value={val}
        onChange={(e) => {
          // console.log(e.target.value);
          setVal(e.target.value);
        }}
      ></Input>
      <Button
        onClick={() => {
          getData("add");
        }}
      >
        add
      </Button>
      <Button
        onClick={() => {
          getData("delete");
        }}
      >
        delete
      </Button>
    </div>
  );
}
