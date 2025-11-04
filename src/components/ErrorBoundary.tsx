import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          padding: "40px",
          textAlign: "center",
          fontFamily: "Inter, sans-serif",
        }}>
          <h1 style={{ color: "#dc3545", fontSize: "48px" }}>Oops!</h1>
          <h2 style={{ color: "#6c757d", fontSize: "24px", marginBottom: "20px" }}>
            Something went wrong
          </h2>
          <p style={{ color: "#6c757d", marginBottom: "30px" }}>
            We're sorry for the inconvenience. Please try refreshing the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              backgroundColor: "#6b46c1",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Refresh Page
          </button>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <details style={{ marginTop: "30px", textAlign: "left" }}>
              <summary style={{ cursor: "pointer", color: "#6c757d" }}>
                Error Details (Development Only)
              </summary>
              <pre style={{
                backgroundColor: "#f5f5f5",
                padding: "15px",
                borderRadius: "4px",
                overflow: "auto",
                marginTop: "10px",
              }}>
                {this.state.error.toString()}
                {this.state.error.stack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
