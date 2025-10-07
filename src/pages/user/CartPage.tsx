import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormFeedback,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
} from "reactstrap";
import {
  ShippingFormData,
  shippingSchema,
} from "../../common/validators/cart.validator";
import { useCartStore } from "../../common/hooks/useCartStore";
import { useCreateOrder } from "../../api/order";
import { useStoreActions } from "easy-peasy";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { cartData: cart } = useCartStore();
  const { mutate: createOrder } = useCreateOrder();
  const navigate = useNavigate();
  const clearCart = useStoreActions((actions: any) => actions.cart.clearCart);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ShippingFormData>({
    resolver: yupResolver(shippingSchema),
  });

  useEffect(() => {
    reset(cart.shipping || {});
  }, [cart, reset]);

  const onSubmit = (data: ShippingFormData) => {
    const finalPayload = {
      ...cart,
      shipping: data,
    };
    createOrder(finalPayload, {
      onSuccess: () => {
        alert("Order placed successfully!");
        clearCart();
        navigate("/customer/items");
      },
    });
  };

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Your Cart</h2>
        <Button color="secondary" onClick={() => window.history.back()}>
          <i className="bi bi-arrow-left me-1"></i> Back
        </Button>
      </div>

      <Row>
        {/* Cart Items Section */}
        <Col lg="8" className="mb-4">
          <Card className="shadow-sm border-0">
            <CardHeader className="bg-primary text-white fw-semibold">
              Cart Items ({cart.totalQuantity})
            </CardHeader>
            <CardBody>
              {cart.items.length === 0 ? (
                <p className="text-muted mb-0">Your cart is empty 🛍️</p>
              ) : (
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Item</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.items.map((item: any, idx: number) => (
                      <tr key={item.sku}>
                        <td>{idx + 1}</td>
                        <td>
                          <strong>{item.name}</strong>
                          <br />
                          <small className="text-muted">{item.sku}</small>
                        </td>
                        <td>{item.qty}</td>
                        <td>₹{item.price.toFixed(2)}</td>
                        <td className="fw-semibold">
                          ₹{(item.qty * item.price).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </CardBody>
          </Card>
        </Col>

        {/* Shipping & Summary Section */}
        <Col lg="4">
          <Card className="shadow-sm border-0 mb-4">
            <CardHeader className="bg-success text-white fw-semibold">
              Shipping Details
            </CardHeader>
            <CardBody>
              <Form onSubmit={handleSubmit(onSubmit)}>
                {/* Method */}
                <FormGroup>
                  <Label for="method">Shipping Method</Label>
                  <Controller
                    name="method"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="method"
                        type="text"
                        placeholder="e.g., Standard / Express"
                        invalid={!!errors.method}
                      />
                    )}
                  />
                  {errors.method && (
                    <FormFeedback>{errors.method.message}</FormFeedback>
                  )}
                </FormGroup>

                {/* Tracking */}
                <FormGroup>
                  <Label for="tracking">Tracking Number</Label>
                  <Controller
                    name="tracking"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="tracking"
                        type="text"
                        placeholder="Enter tracking number"
                        invalid={!!errors.tracking}
                      />
                    )}
                  />
                  {errors.tracking && (
                    <FormFeedback>{errors.tracking.message}</FormFeedback>
                  )}
                </FormGroup>

                {/* Address */}
                <FormGroup>
                  <Label for="address">Shipping Address</Label>
                  <Controller
                    name="address"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="address"
                        type="textarea"
                        placeholder="Enter full address"
                        invalid={!!errors.address}
                      />
                    )}
                  />
                  {errors.address && (
                    <FormFeedback>{errors.address.message}</FormFeedback>
                  )}
                </FormGroup>

                <hr />

                {/* Summary */}
                <div className="d-flex justify-content-between mb-3">
                  <span className="fw-semibold">Total Items:</span>
                  <span>{cart.totalQuantity}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="fw-semibold">Total Amount:</span>
                  <span>₹{cart.totalAmount.toFixed(2)}</span>
                </div>

                <Button
                  type="submit"
                  color="primary"
                  className="w-100 fw-semibold">
                  <i className="bi bi-cart-check me-2"></i>
                  Place Order
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
