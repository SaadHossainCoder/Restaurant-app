// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SnackbarProvider } from "notistack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import store from './redux/store.js';
import { Provider } from 'react-redux';


const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        staleTime: 30000,
      },
    }
  }
)

export default queryClient

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <SnackbarProvider autoHideDuration={3000}>
        <QueryClientProvider client={queryClient} >
          <App />
        </QueryClientProvider>
      </SnackbarProvider>
    </Provider>
)
