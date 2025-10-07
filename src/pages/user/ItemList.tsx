import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetItemsList } from "../../api/user";
import { ProductCard } from "../../components/cards/ProductCard";
import "./page.css";
import { AxiosResponse } from "axios";
import { ApiResponse } from "../../common/interfaces";

const ItemList = () => {
  const { mutate, isPending } = useGetItemsList();
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    mutate(
      {},
      {
        onSuccess: (res: AxiosResponse<ApiResponse>) => {
          const { data, message, status } = res.data;
          if (status) {
            setProducts(data);
          } else {
            alert(message);
          }
        },
      }
    );
  }, []);

  return (
    <main className="container py-3">
      <header className="d-flex align-items-center mb-3">
        <button
          className="btn btn-outline-secondary d-flex align-items-center me-2"
          onClick={() => navigate("/customer")}>
          <i className="bi bi-arrow-left me-1"></i>
          Back
        </button>
        <h5 className="mb-0">Products</h5>
      </header>

      {/* Product grid */}
      <section className="row g-3">
        {products.map((p) => (
          <div key={p.id} className="col-6 col-md-4 col-lg-3">
            <ProductCard product={p} />
          </div>
        ))}
      </section>

      {/* Floating support button */}
      <button
        className="btn btn-brand btn-lg rounded-circle position-fixed end-0 bottom-0 m-4 shadow"
        aria-label="Customer Support">
        <i className="bi bi-headset" />
      </button>
    </main>
  );
};

export default ItemList;
