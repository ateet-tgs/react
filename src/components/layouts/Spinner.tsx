import type React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "border" | "grow";
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  text?: string;
  overlay?: boolean;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  variant = "border",
  color = "primary",
  text,
  overlay = false,
  className = "",
}) => {
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "spinner-border-sm";
      case "lg":
        return "fs-3";
      case "xl":
        return "fs-1";
      default:
        return "";
    }
  };

  const getCustomSize = () => {
    switch (size) {
      case "lg":
        return { width: "3rem", height: "3rem" };
      case "xl":
        return { width: "4rem", height: "4rem" };
      default:
        return {};
    }
  };

  const spinnerClasses = [
    variant === "border" ? "spinner-border" : "spinner-grow",
    `text-${color}`,
    getSizeClass(),
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const spinnerElement = (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div
        className={spinnerClasses}
        style={getCustomSize()}
        role="status"
        aria-hidden="true"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      {text && <div className={`mt-3 text-${color} fw-medium`}>{text}</div>}
    </div>
  );

  if (overlay) {
    return (
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          zIndex: 9999,
          backdropFilter: "blur(2px)",
        }}
      >
        {spinnerElement}
      </div>
    );
  }

  return spinnerElement;
};

// Preset spinner components for common use cases
export const LoadingSpinner: React.FC<{ text?: string }> = ({
  text = "Loading...",
}) => <Spinner variant="border" color="primary" size="md" text={text} />;

export const SubmittingSpinner: React.FC = () => (
  <Spinner variant="border" color="success" size="sm" text="Submitting..." />
);

export const ProcessingSpinner: React.FC = () => (
  <Spinner variant="grow" color="info" size="lg" text="Processing..." />
);

export const OverlaySpinner: React.FC<{ text?: string }> = ({
  text = "Please wait...",
}) => (
  <Spinner variant="border" color="primary" size="lg" text={text} overlay />
);
