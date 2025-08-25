import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ItemPage from './components/ItemPage';
import theme from './styled/theme';
import GlobalStyles from './styled/GlobalStyles';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <HomePage />
      </>
    ),
  },
  {
    path: "/item/:id",
    element: (
      <>
        <Navbar />
        <ItemPage />
      </>
    ),
  },
]);

const AppRouter = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default AppRouter;
