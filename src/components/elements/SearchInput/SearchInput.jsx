import React from "react";
import { Form, Spinner } from "react-bootstrap";

export default function SearchInput({ data, setData, module }) {
  function handleChange(e) {
    const { value } = e.target;
    const filteredData = data?.filter((item) =>
      item[`name_${module}`].includes(value.toLowerCase())
    );

    setData(filteredData);
  }

  return (
    <Form inline className="mt-3">
      {data.length === 0 ? (
        <Spinner animation="grow" variant="primary" />
      ) : (
        <Form.Control
          type="text"
          placeholder="Buscar..."
          onChange={handleChange}
        />
      )}
    </Form>
  );
}
