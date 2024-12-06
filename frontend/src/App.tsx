import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from 'sonner';
import { TailwindIndicator } from './components/tailwind-indicator';
import { persistor, store } from './redux/store';
import { router } from './routes/routes';
import { authStore } from './store/auth.store';

const App = () => {
  const { setIsAuth } = authStore();

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setIsAuth(true);
    }
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster richColors position="top-center" />
        <RouterProvider router={router} />
        <TailwindIndicator />
      </PersistGate>
    </Provider>
  );
};

export default App;
