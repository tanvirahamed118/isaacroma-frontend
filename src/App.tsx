import { BrowserRouter, Route, Routes } from "react-router";
import AppRoute from "./routes/App.route";
import Dashboard from "./pages/Dashboard";
import CreateBusiness from "./pages/Create.business";
import CreateCategory from "./pages/Create-category";
import EditBusiness from "./pages/Edit.business";
import BudgetSheet from "./components/calculation/Budget.sheet";
import CashflowSheet from "./components/calculation/Cashflow-sheet";
import ProjectionSheet from "./components/calculation/Projection.sheet";
import BusinessList from "./pages/Business-list";
import BusinessPlans from "./pages/Business.plans";
import Profile from "./pages/Profile";
import ProfileSetting from "./pages/Profile.setting";
import Subscription from "./pages/Subscription";
import Register from "./pages/Register";
import UserRoute from "./routes/User.route";
import PublicRoute from "./routes/Public.route";
import Login from "./pages/Login";
import Reset from "./pages/Reset";
import PaymentSuccess from "./pages/Payment.success";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<UserRoute />}>
          <Route element={<AppRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/business/plans" element={<BusinessPlans />} />

            <Route path="/businesses" element={<BusinessList />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/create-business" element={<CreateBusiness />} />
            <Route path="/edit-business/:id" element={<EditBusiness />} />
            <Route path="/create-business/:id" element={<CreateCategory />} />
            <Route path="/payment/success" element={<PaymentSuccess />} />
            <Route
              path="/create-business/budget/:id"
              element={<BudgetSheet />}
            />
            <Route
              path="/create-business/cashflow/:id"
              element={<CashflowSheet />}
            />
            <Route
              path="/create-business/projection/:id"
              element={<ProjectionSheet />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile-setting" element={<ProfileSetting />} />
          </Route>
        </Route>
        <Route element={<PublicRoute />}>
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/reset" element={<Reset />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
