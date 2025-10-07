import { useStoreActions } from "easy-peasy";
import { CartItem } from "../../common/interfaces";
import AddToCartButton from "../cart/AddToCartButton";

type Product = {
  id: string;
  brand: string;
  description: string;
  name: string;
  sku: string;
  price: number;
  stockQuantity: number;
};

export function ProductCard({ product }: { product: Product }) {
  const { brand, name, price, description, stockQuantity } = product;

  const addItem = useStoreActions((actions: any) => actions.cart.addItem);

  return (
    <div className="card h-100 border-0 shadow-sm position-relative">
      <button
        className="btn btn-light rounded-circle position-absolute top-0 end-0 m-2"
        aria-label="Wishlist">
        <i className="bi bi-heart" />
      </button>

      <div className="card-body">
        <div className="small text-uppercase fw-semibold mb-1">{brand}</div>
        <h5 className="card-title text-truncate text-pretty" title={name}>
          {name}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">{description}</h6>

        <div className="d-flex align-items-baseline gap-2">
          <strong className="text-brand">{price}</strong>
          {stockQuantity > 0 ? (
            <span className="badge bg-success">In Stock</span>
          ) : (
            <span className="badge bg-danger">Out of Stock</span>
          )}
        </div>
        <div className="mt-auto">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
