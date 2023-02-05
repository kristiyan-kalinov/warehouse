import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Login } from './components/auth/login/Login';
import { Register } from './components/auth/register/Register';
import { Layout } from './components/layout/Layout';
import { UserForm } from './components/users/user-form/UserForm';
import { AuthenticatedRoute } from './utils/guards/AuthenticatedRoute';
import { NonAuthenticatedGuard } from './utils/guards/NonAuthenticatedGuard';
import { ProductForm } from './components/products/product-form/ProductForm';
import { ProductsList } from './components/products/products-list/ProductsList';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/register" element={<NonAuthenticatedGuard> <Register /> </NonAuthenticatedGuard>} />
        <Route exact path="/login" element={<NonAuthenticatedGuard> <Login /> </NonAuthenticatedGuard>} />
        <Route exact path="/" element={<AuthenticatedRoute><Layout /></AuthenticatedRoute>}>
        <Route path="/user/create" element={<UserForm />} />
        <Route path="/products-list" element={<ProductsList />} />
        <Route path="/product/create" element={<ProductForm />} />
        <Route path="/product/edit/:id" element={<ProductForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
