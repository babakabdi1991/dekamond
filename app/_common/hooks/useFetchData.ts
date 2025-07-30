import { useState } from "react";
import { isErrorType } from "../utils";

interface FetchState {
  loading: boolean;
  error: string | null;
}

const initialState: FetchState = {
  loading: false,
  error: null,
};

export function useFetchData() {
  const [state, setState] = useState<FetchState>(initialState);

  const fetchData = async <T>(url: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = response.json();
      if (data) {
        setState({ loading: false, error: null });
        return Promise.resolve(data as T);
      }
    } catch (error: unknown) {
      const err = isErrorType(error) ? error.message : "An error occurred";
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err,
      }));
    }
  };

  return {
    loading: state.loading,
    error: state.error,
    fetchData,
  };
}
