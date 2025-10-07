import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../common/hooks";
import { removeTokens } from "../../common/utils";

const UserDashboard = () => {
  const { userData } = useUserStore();
  const navigate = useNavigate();

  const logout = () => {
    removeTokens("customer");
    navigate("/auth/login");
  };

  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">
            User Portal
          </a>
          <div className="d-flex">
            <div className="dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown">
                {userData.email}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li onClick={logout}>
                  <a className="dropdown-item">Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <div className="container-fluid px-4 py-4">
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="text-white mb-0">Welcome back, John!</h2>
            <p className="text-white-50">
              Here's what's happening with your account today.
            </p>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div
              className="card border-0"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}>
              <div className="card-body text-white">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="card-title text-white-50">Total Orders</h6>
                    <h3 className="mb-0">24</h3>
                  </div>
                  <div className="bg-primary rounded p-3">
                    <i className="bi bi-cart fs-4"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card border-0"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}>
              <div className="card-body text-white">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="card-title text-white-50">Total Spent</h6>
                    <h3 className="mb-0">$1,248</h3>
                  </div>
                  <div className="bg-success rounded p-3">
                    <i className="bi bi-currency-dollar fs-4"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card border-0"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}>
              <div className="card-body text-white">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="card-title text-white-50">Pending</h6>
                    <h3 className="mb-0">3</h3>
                  </div>
                  <div className="bg-warning rounded p-3">
                    <i className="bi bi-clock fs-4"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div
              className="card border-0"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}>
              <div className="card-body text-white">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="card-title text-white-50">Saved Items</h6>
                    <h3 className="mb-0">12</h3>
                  </div>
                  <div className="bg-info rounded p-3">
                    <i className="bi bi-heart fs-4"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4">
          <div className="col-lg-8">
            <div
              className="card border-0"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}>
              <div className="card-header bg-transparent border-0">
                <h5 className="text-white mb-0">Recent Orders</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-dark table-hover">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Product</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>#12345</td>
                        <td>Wireless Headphones</td>
                        <td>Dec 15, 2024</td>
                        <td>
                          <span className="badge bg-success">Delivered</span>
                        </td>
                        <td>$89.99</td>
                      </tr>
                      <tr>
                        <td>#12344</td>
                        <td>Smartphone Case</td>
                        <td>Dec 12, 2024</td>
                        <td>
                          <span className="badge bg-warning">Shipping</span>
                        </td>
                        <td>$24.99</td>
                      </tr>
                      <tr>
                        <td>#12343</td>
                        <td>Laptop Stand</td>
                        <td>Dec 10, 2024</td>
                        <td>
                          <span className="badge bg-success">Delivered</span>
                        </td>
                        <td>$45.99</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div
              className="card border-0"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}>
              <div className="card-header bg-transparent border-0">
                <h5 className="text-white mb-0">Quick Actions</h5>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <button className="btn btn-primary">Track Order</button>
                  <button className="btn btn-outline-light">
                    View Wishlist
                  </button>
                  <button className="btn btn-outline-light">
                    Update Profile
                  </button>
                  <button className="btn btn-outline-light">
                    Contact Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
