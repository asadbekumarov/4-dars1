import "./App.css";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo } from "react";

function App() {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Hero />
    </QueryClientProvider>
  );
}

export default App;
