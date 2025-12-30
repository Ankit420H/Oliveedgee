import React, { ErrorInfo, ReactNode } from 'react';
import SystemFailure from './SystemFailure';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Clinical System Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <SystemFailure error={this.state.error} />;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
