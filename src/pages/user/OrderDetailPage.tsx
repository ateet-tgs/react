import { useEffect, useState } from "react";
import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Table,
} from "reactstrap";
import { useParams } from "react-router-dom";
import { format } from "date-fns";
import { AxiosResponse } from "axios";
import { ApiResponse } from "../../common/interfaces";
import { useGetOrderDetail } from "../../api/order";

const statusColors: Record<string, string> = {
  pending: "warning",
  processing: "info",
  completed: "success",
  failed: "danger",
};

const OrderDetailPage = () => {
  const { id } = useParams();
  const { mutate, isPending } = useGetOrderDetail(id!);
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (id) {
      mutate(
        { id },
        {
          onSuccess: (res: AxiosResponse<ApiResponse>) => {
            const { data, status, message } = res.data;
            if (status) setOrder(data);
            else alert(message);
          },
        }
      );
    }
  }, [id]);

  if (!order) return <div className="text-center py-5">Loading...</div>;

  const { orderDetails, status, logs, createdAt } = order;

  return (
    <Container className="py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Order Details</h2>
        <button
          className="btn btn-secondary"
          onClick={() => window.history.back()}>
          <i className="bi bi-arrow-left me-1"></i> Back
        </button>
      </div>

      {/* Order Info */}
      <Card className="shadow-sm border-0 mb-4">
        <CardBody>
          <div className="row">
            <div className="col-md-6 mb-2">
              <strong>Order ID:</strong> <br />
              <span className="text-muted">{order.id}</span>
            </div>
            <div className="col-md-3 mb-2">
              <strong>Status:</strong> <br />
              <Badge
                color={statusColors[status]}
                className="text-uppercase px-3">
                {status}
              </Badge>
            </div>
            <div className="col-md-3 mb-2">
              <strong>Created At:</strong> <br />
              <span className="text-muted">
                {format(new Date(createdAt), "dd MMM yyyy, HH:mm")}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>

      <Row>
        {/* Items Table */}
        <Col lg="8">
          <Card className="shadow-sm border-0 mb-4">
            <CardHeader className="bg-primary text-white fw-semibold">
              Ordered Items ({orderDetails.items.length})
            </CardHeader>
            <CardBody>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item</th>
                    <th>SKU</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orderDetails.items.map((item: any, idx: number) => (
                    <tr key={item.sku}>
                      <td>{idx + 1}</td>
                      <td>{item.name}</td>
                      <td>
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
            </CardBody>
          </Card>
        </Col>

        {/* Shipping Info */}
        <Col lg="4">
          <Card className="shadow-sm border-0 mb-4">
            <CardHeader className="bg-success text-white fw-semibold">
              Shipping Details
            </CardHeader>
            <CardBody>
              <p>
                <strong>Method:</strong> {orderDetails.shipping.method}
              </p>
              <p>
                <strong>Tracking:</strong>{" "}
                {orderDetails.shipping.tracking || <em>Not provided</em>}
              </p>
              <p>
                <strong>Address:</strong>
                <br />
                {orderDetails.shipping.address}
              </p>
            </CardBody>
          </Card>

          {/* Status Tracker */}
          <Card className="shadow-sm border-0">
            <CardHeader className="bg-dark text-white fw-semibold">
              Status Timeline
            </CardHeader>
            <CardBody>
              {logs.length === 0 ? (
                <p className="text-muted mb-0">No logs yet 📝</p>
              ) : (
                <ListGroup flush>
                  {logs.map((log: any, idx: number) => (
                    <ListGroupItem key={idx}>
                      <div className="d-flex justify-content-between">
                        <div>
                          <Badge
                            color={statusColors[log.status]}
                            className="text-uppercase me-2">
                            {log.status}
                          </Badge>
                          {log.message}
                        </div>
                        <small className="text-muted">
                          {format(
                            new Date(log.timestamp),
                            "dd MMM yyyy, HH:mm"
                          )}
                        </small>
                      </div>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderDetailPage;
