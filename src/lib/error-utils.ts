export const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
        // Handle Axios error structure safely
        const data = (error as { response?: { data?: { message?: string } } }).response?.data;
        if (data?.message) {
            return data.message;
        }
        return error.message;
    }
    if (typeof error === 'string') return error;
    try {
        return JSON.stringify(error);
    } catch {
        return 'An unknown error occurred';
    }
};
