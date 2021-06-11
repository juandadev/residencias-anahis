import React from "react";
import { Form, Spinner } from "react-bootstrap";

export default function SearchInput({ data, setData, module }) {
  function handleChange(e) {
    const { value } = e.target;
    const filteredData = data?.filter(
      (item) =>
        item[`name_${module}`]?.includes(value.toLowerCase()) > 0 ||
        item[`store_${module}`]?.includes(value.toLowerCase()) > 0 ||
        item[`category_${module}`]?.includes(value.toLowerCase()) > 0 ||
        item[`vendor_${module}`]?.includes(value.toLowerCase()) > 0 ||
        item[`key_${module}`]?.includes(value.toLowerCase()) > 0 ||
        item[`address_${module}`]?.includes(value.toLowerCase()) > 0 ||
        item[`phone_${module}`]?.toString().includes(value.toLowerCase()) > 0 ||
        item[`email_${module}`]?.includes(value.toLowerCase()) > 0 ||
        item[`stock_${module}`]?.toString().includes(value.toLowerCase()) > 0 ||
        item[`social_${module}`]?.includes(value.toLowerCase()) > 0 ||
        item[`bank_${module}`]?.toString().includes(value.toLowerCase()) > 0 ||
        item[`level_${module}`]?.includes(value.toLowerCase()) > 0
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
