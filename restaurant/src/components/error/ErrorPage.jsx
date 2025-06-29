/* eslint-disable react/prop-types */
import { Component } from "react";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router-dom";

/**
 * ErrorBoundaryWrapper for wrapping app sections with error handling.
 */
export function ErrorBoundaryWrapper({ children }) {
    return <ErrorBoundary>{children}</ErrorBoundary>;
}

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Error caught by boundary:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <UnifiedErrorDisplay error={this.state.error} />;
        }
        return this.props.children;
    }
}

/**
 * Handles both route-level and render-time errors.
 */
export function RouteErrorBoundary() {
    const error = useRouteError();
    return <UnifiedErrorDisplay error={error} />;
}

/**
 * Error display component for both error types.
 */
function UnifiedErrorDisplay({ error }) {
    const navigate = useNavigate();

    let title = "Unknown Error";
    let message = "Something went wrong, but we don't know what. 🤔";
    let stackTrace = null;

    if (isRouteErrorResponse(error)) {
        title = `${error.status} ${error.statusText}`;
        message = error.data || "An error occurred while loading the page.";
    } else if (error instanceof Error) {
        title = "⚠️ An Error Occurred ⚠️";
        message = error.message;
        stackTrace = error.stack;
    }

    return (
        <section className="w-screen h-screen flex flex-col justify-center items-center bg-[#f8d7da] text-[#721c24]">

            <div className="w-full h-full mt-5 flex flex-col justify-center items-center text-center text-[#7c0309] bg-[#ffefef] border border-[#D8000C] rounded-xl p-6 max-w-2xl shadow-md">
                <h1 className="text-2xl font-bold">{title}</h1>
                <h2 className="mt-3 text-base font-bold">😵 {message} 😵</h2>
                <p className="mt-4 text-sm">{stackTrace}</p>
            </div>

            <button
                onClick={() => navigate(-1)}
                className="mt-8 px-6 py-3 mb-10 bg-amber-900 text-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
            >
                Go Back
            </button>
        </section>
    );
}

export default ErrorBoundary;
