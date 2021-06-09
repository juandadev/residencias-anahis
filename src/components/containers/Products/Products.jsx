import React, { useEffect, useState } from 'react';
import { Col, Jumbotron, Row } from 'react-bootstrap';
import { getProducts } from '../../../utils/services/database';
import { Actions, List } from '../../elements/index';

export default function products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => setProducts(res));
  }, []);

  return (
    <>
      <h1>Productos</h1>

      <Jumbotron>
        <Row>
          <Col className="d-flex justify-content-end">
            <Actions module="producto" />
          </Col>
        </Row>

        <Row>
          <Col>
            <List
              id="product"
              data={products}
              structure={{
                Producto: [
                  ['font-weight-bold text-capitalize', 'name_product'],
                  ['text-black-50', 'key_product'],
                ],
                Existencias: [
                  ['text-body', 'stock_product'],
                  ['text-capitalize text-black-50', 'fk_store_id'],
                ],
                Estatus: [['badge', 'state_product']],
              }}
            />
          </Col>
        </Row>
      </Jumbotron>
    </>
  );
}
