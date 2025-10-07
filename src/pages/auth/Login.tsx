import { useNavigate } from "react-router-dom";
import { useStoreActions } from "easy-peasy";
import { useState } from "react";
import { useLogin } from "../../api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ApiResponse, LoginPayload } from "../../common/interfaces";
import { loginSchema } from "../../common/validators/auth.validator";
import { AxiosResponse } from "axios";
import { setToken } from "../../common/utils";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { mutate: loginUser, isPending } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    resolver: yupResolver(loginSchema),
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (data: LoginPayload) => {
    loginUser(
      {
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: (res: AxiosResponse<ApiResponse>) => {
          const { data, message, status } = res.data;
          const role = data.user.role;
          if (status) {
            setToken(data, role);
            const rolePaths: Record<string, string> = {
              admin: "/",
              user: "/user",
            };
            const navigateTo = rolePaths[role] || "/user";
            navigate(navigateTo);
          } else {
            alert(message);
          }
        },
      }
    );
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            {/* Login Card */}
            <div
              className="card shadow-lg border-0"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(10px)",
                borderRadius: "15px",
              }}
            >
              {/* Card Header */}
              <div className="card-header text-center border-0 bg-transparent pt-4 pb-2">
                <h2
                  className="fw-bold mb-2"
                  style={{
                    background: "linear-gradient(135deg, #667eea, #764ba2)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Welcome Back
                </h2>
                <p className="text-muted">
                  Sign in to your account to continue
                </p>
              </div>

              {/* Card Body */}
              <div className="card-body px-4 pb-4">
                <form onSubmit={handleSubmit(handleLogin)}>
                  {/* Email Field */}
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="fas fa-envelope text-muted"></i>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                      </span>
                      <input
                        type="email"
                        className="form-control border-start-0 bg-light"
                        id="email"
                        placeholder="Enter your email"
                        {...register("email")}
                        style={{ borderLeft: "none !important" }}
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label fw-semibold"
                    >
                      Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect
                            x="3"
                            y="11"
                            width="18"
                            height="11"
                            rx="2"
                            ry="2"
                          />
                          <circle cx="12" cy="16" r="1" />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control border-0 bg-light"
                        id="password"
                        placeholder="Enter your password"
                        {...register("password")}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary border-start-0 bg-light"
                        onClick={togglePasswordVisibility}
                        style={{ borderLeft: "none" }}
                      >
                        {showPassword ? (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94L6.06 6.06" />
                            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19l-2.83-2.83" />
                            <line x1="1" y1="1" x2="23" y2="23" />
                          </svg>
                        ) : (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Forgot Password */}
                  <div className="d-flex justify-content-end mb-3">
                    <a
                      href="#"
                      className="text-decoration-none small"
                      style={{ color: "#667eea" }}
                    >
                      Forgot password?
                    </a>
                  </div>

                  {/* Sign In Button */}
                  <button
                    type="submit"
                    className="btn w-100 text-white fw-semibold py-2 mb-3"
                    style={{
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      border: "none",
                      borderRadius: "8px",
                      boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow =
                        "0 6px 20px rgba(102, 126, 234, 0.6)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 15px rgba(102, 126, 234, 0.4)";
                    }}
                  >
                    Sign In
                  </button>
                </form>

                {/* Divider */}
                <div className="text-center mb-3">
                  <hr className="my-3" />
                  <small
                    className="text-muted bg-white px-2"
                    style={{ position: "relative", top: "-12px" }}
                  >
                    or continue with
                  </small>
                </div>

                {/* Social Login */}
                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <button className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center">
                      <svg
                        className="me-2"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <small>Google</small>
                    </button>
                  </div>
                  <div className="col-6">
                    <button className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center">
                      <svg
                        className="me-2"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      <small>GitHub</small>
                    </button>
                  </div>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                  <small className="text-muted">
                    Don't have an account?{" "}
                    <a
                      href="#"
                      className="text-decoration-none fw-semibold"
                      style={{ color: "#667eea" }}
                    >
                      Sign up
                    </a>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
