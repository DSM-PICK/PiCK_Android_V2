import React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import ThemedComponent from "@/test";
import Test from "@/screen/test";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: true,
      retryDelay: 300,
      staleTime: 10000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemedComponent />
      <Test />
    </QueryClientProvider>
  );
}

export default App;
