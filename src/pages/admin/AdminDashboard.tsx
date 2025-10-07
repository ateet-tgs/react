import { useNavigate } from "react-router-dom";
import { removeTokens } from "../../common/utils";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const logout = () => {
    removeTokens("admin");
    navigate("/auth/login");
  };
  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)",
      }}
    >
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold" href="#">
            Admin Portal
          </a>
          <div className="d-flex">
            <div className="dropdown">
              <button
                className="btn btn-outline-light dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
              >
                Admin User
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    System Settings
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    User Management
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
            <h2 className="text-white mb-0">Admin Dashboard</h2>
            <p className="text-white-50">Monitor and manage your system.</p>
          </div>
        </div>

        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div
              className="card border-0"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="card-body text-white">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="card-title text-white-50">Total Users</h6>
                    <h3 className="mb-0">1,247</h3>
                  </div>
                  <div className="bg-primary rounded p-3">
                    <i className="bi bi-people fs-4"></i>
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
              }}
            >
              <div className="card-body text-white">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="card-title text-white-50">Total Revenue</h6>
                    <h3 className="mb-0">$24,580</h3>
                  </div>
                  <div className="bg-success rounded p-3">
                    <i className="bi bi-graph-up fs-4"></i>
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
              }}
            >
              <div className="card-body text-white">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="card-title text-white-50">Active Orders</h6>
                    <h3 className="mb-0">89</h3>
                  </div>
                  <div className="bg-warning rounded p-3">
                    <i className="bi bi-box-seam fs-4"></i>
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
              }}
            >
              <div className="card-body text-white">
                <div className="d-flex justify-content-between">
                  <div>
                    <h6 className="card-title text-white-50">
                      Support Tickets
                    </h6>
                    <h3 className="mb-0">12</h3>
                  </div>
                  <div className="bg-danger rounded p-3">
                    <i className="bi bi-headset fs-4"></i>
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
              }}
            >
              <div className="card-header bg-transparent border-0">
                <h5 className="text-white mb-0">Recent Activity</h5>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-dark table-hover">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Action</th>
                        <th>Time</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>john@example.com</td>
                        <td>Placed Order #12345</td>
                        <td>2 min ago</td>
                        <td>
                          <span className="badge bg-success">Completed</span>
                        </td>
                      </tr>
                      <tr>
                        <td>sarah@example.com</td>
                        <td>Updated Profile</td>
                        <td>5 min ago</td>
                        <td>
                          <span className="badge bg-info">Info</span>
                        </td>
                      </tr>
                      <tr>
                        <td>mike@example.com</td>
                        <td>Login Failed</td>
                        <td>8 min ago</td>
                        <td>
                          <span className="badge bg-warning">Warning</span>
                        </td>
                      </tr>
                      <tr>
                        <td>admin@example.com</td>
                        <td>System Backup</td>
                        <td>15 min ago</td>
                        <td>
                          <span className="badge bg-success">Success</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div
              className="card border-0 mb-4"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="card-header bg-transparent border-0">
                <h5 className="text-white mb-0">Quick Actions</h5>
              </div>
              <div className="card-body">
                <div className="d-grid gap-2">
                  <button className="btn btn-primary">Add New User</button>
                  <button className="btn btn-outline-light">
                    Manage Products
                  </button>
                  <button className="btn btn-outline-light">
                    View Reports
                  </button>
                  <button className="btn btn-outline-light">
                    System Settings
                  </button>
                </div>
              </div>
            </div>
            <div
              className="card border-0"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="card-header bg-transparent border-0">
                <h5 className="text-white mb-0">System Status</h5>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-white">Server Status</span>
                  <span className="badge bg-success">Online</span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="text-white">Database</span>
                  <span className="badge bg-success">Connected</span>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-white">Storage</span>
                  <span className="badge bg-warning">75% Full</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
