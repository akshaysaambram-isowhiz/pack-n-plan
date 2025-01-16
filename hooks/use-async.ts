import { useState, useCallback } from "react";

interface AsyncState<T> {
  isLoading: boolean;
  error: Error | null;
  value: T | null;
}

type AsyncFn<T> = (...args: any[]) => Promise<T>;

export function useAsync<T>(asyncFunction: AsyncFn<T>, immediate = false) {
  const [state, setState] = useState<AsyncState<T>>({
    isLoading: immediate,
    error: null,
    value: null,
  });

  const execute = useCallback(
    async (...args: any[]) => {
      setState({ isLoading: true, error: null, value: null });

      try {
        const response = await asyncFunction(...args);
        setState({ isLoading: false, error: null, value: response });
        return response;
      } catch (error) {
        setState({
          isLoading: false,
          error: error instanceof Error ? error : new Error(String(error)),
          value: null,
        });
        throw error;
      }
    },
    [asyncFunction],
  );

  return { execute, ...state };
}
