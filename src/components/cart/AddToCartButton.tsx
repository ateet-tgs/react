import { useState } from "react";
import { useStoreActions } from "easy-peasy";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { CartItem } from "../../common/interfaces";

type AddToCartButtonProps = {
  product: {
    id: string;
    sku: string;
    name: string;
    price: number;
    image?: string;
  };
};

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
  const [modal, setModal] = useState(false);
  const [qty, setQty] = useState(1);

  const toggle = () => setModal(!modal);

  const addItem = useStoreActions((actions: any) => actions.cart.addItem);

  const handleAdd = () => {
    const item: CartItem = {
      id: product.id,
      sku: product.sku,
      name: product.name,
      price: product.price,
      qty,
      image: product.image,
    };
    addItem(item);
    setQty(1);
    toggle();
  };

  return (
    <>
      {/* 🛍 Add to Cart Button */}
      <Button
        color="primary"
        className="my-2 rounded"
        size="sm"
        onClick={toggle}>
        Add to Cart
      </Button>

      {/* 🧾 Quantity Modal */}
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Add to Cart</ModalHeader>

        <ModalBody>
          {/* Product info */}
          <div className="d-flex align-items-center mb-3">
            <div>
              <h6 className="mb-1">{product.name}</h6>
              <div>{product.sku}</div>
              <span className="text-primary fw-bold">
                ₹{product.price.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="d-flex justify-content-center align-items-center">
            <Button
              color="secondary"
              outline
              size="sm"
              onClick={() => setQty(Math.max(1, qty - 1))}>
              −
            </Button>
            <Input
              type="number"
              min={1}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Number(e.target.value)))}
              className="text-center mx-2"
              style={{ width: "80px" }}
            />
            <Button
              color="secondary"
              outline
              size="sm"
              onClick={() => setQty(qty + 1)}>
              +
            </Button>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleAdd}>
            Add to Cart
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AddToCartButton;
