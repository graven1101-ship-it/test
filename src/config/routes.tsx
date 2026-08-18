import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@/components/protected-route'
import { ROLES, type Role } from '@/contexts/auth-context'

// Lazy load components for better performance
const Landing = lazy(() => import('@/app/landing/page'))
const Dashboard = lazy(() => import('@/app/dashboard/page'))
const Dashboard2 = lazy(() => import('@/app/dashboard-2/page'))
const Mail = lazy(() => import('@/app/mail/page'))
const Tasks = lazy(() => import('@/app/tasks/page'))
const Chat = lazy(() => import('@/app/chat/page'))
const Calendar = lazy(() => import('@/app/calendar/page'))
const Users = lazy(() => import('@/app/users/page'))
const FAQs = lazy(() => import('@/app/faqs/page'))
const Pricing = lazy(() => import('@/app/pricing/page'))
const GeneralLedger = lazy(() => import('@/app/general-ledger/page'))
const AccountsPayable = lazy(() => import('@/app/accounts-payable/page'))
const AccountsReceivable = lazy(() => import('@/app/accounts-receivable/page'))
const DisbursementManagement = lazy(() => import('@/app/disbursement-management/page'))
const CollectionManagement = lazy(() => import('@/app/collection-management/page'))
const BudgetManagement = lazy(() => import('@/app/budget-management/page'))
const CashManagement = lazy(() => import('@/app/cash-management/page'))
const Cashier = lazy(() => import('@/app/cashier/index'))
const Accountant = lazy(() => import('@/app/accountant/index'))
const Admin = lazy(() => import('@/app/admin/index'))
const AccountSs = lazy(() => import('@/app/account-ss/page'))
const FinancialReportingAnalytics = lazy(() => import('@/app/financial-reporting-analytics/page'))
const TaxManagement = lazy(() => import('@/app/tax-management/page'))

// Auth pages
const SignIn = lazy(() => import('@/app/auth/sign-in/page'))
const SignIn2 = lazy(() => import('@/app/auth/sign-in-2/page'))
const SignIn3 = lazy(() => import('@/app/auth/sign-in-3/page'))
const SignUp = lazy(() => import('@/app/auth/sign-up/page'))
const SignUp2 = lazy(() => import('@/app/auth/sign-up-2/page'))
const SignUp3 = lazy(() => import('@/app/auth/sign-up-3/page'))
const ForgotPassword = lazy(() => import('@/app/auth/forgot-password/page'))
const ForgotPassword2 = lazy(() => import('@/app/auth/forgot-password-2/page'))
const ForgotPassword3 = lazy(() => import('@/app/auth/forgot-password-3/page'))

// Error pages
const Unauthorized = lazy(() => import('@/app/errors/unauthorized/page'))
const Forbidden = lazy(() => import('@/app/errors/forbidden/page'))
const NotFound = lazy(() => import('@/app/errors/not-found/page'))
const InternalServerError = lazy(() => import('@/app/errors/internal-server-error/page'))
const UnderMaintenance = lazy(() => import('@/app/errors/under-maintenance/page'))

// Settings pages
const UserSettings = lazy(() => import('@/app/settings/user/page'))
const AccountSettings = lazy(() => import('@/app/settings/account/page'))
const BillingSettings = lazy(() => import('@/app/settings/billing/page'))
const AppearanceSettings = lazy(() => import('@/app/settings/appearance/page'))
const NotificationSettings = lazy(() => import('@/app/settings/notifications/page'))
const ConnectionSettings = lazy(() => import('@/app/settings/connections/page'))

const ALL_ROLES: Role[] = [ROLES.ADMIN, ROLES.CASHIER, ROLES.ACCOUNTANT]
const ADMIN_AND_ACCOUNTANT: Role[] = [ROLES.ADMIN, ROLES.ACCOUNTANT]
const ADMIN_ONLY: Role[] = [ROLES.ADMIN]

export interface RouteConfig {
  path: string
  element: React.ReactNode
  children?: RouteConfig[]
}

export const routes: RouteConfig[] = [
  // Default route - redirect to sign-in-3
  {
    path: "/",
    element: <Navigate to="auth/sign-in-3" replace />
  },

  // Landing Page (public)
  {
    path: "/landing",
    element: <Landing />
  },

  // Dashboard Routes (admin only)
  {
    path: "/dashboard",
    element: <ProtectedRoute allowedRoles={ADMIN_ONLY}><Dashboard /></ProtectedRoute>
  },
  {
    path: "/dashboard-2",
    element: <ProtectedRoute allowedRoles={ADMIN_ONLY}><Dashboard2 /></ProtectedRoute>
  },

  // Application Routes (all authenticated users)
  {
    path: "/mail",
    element: <ProtectedRoute allowedRoles={ALL_ROLES}><Mail /></ProtectedRoute>
  },
  {
    path: "/tasks",
    element: <ProtectedRoute allowedRoles={ALL_ROLES}><Tasks /></ProtectedRoute>
  },
  {
    path: "/chat",
    element: <ProtectedRoute allowedRoles={ALL_ROLES}><Chat /></ProtectedRoute>
  },
  {
    path: "/calendar",
    element: <ProtectedRoute allowedRoles={ALL_ROLES}><Calendar /></ProtectedRoute>
  },

  // Content Pages (admin only)
  {
    path: "/users",
    element: <ProtectedRoute allowedRoles={ADMIN_ONLY}><Users /></ProtectedRoute>
  },
  {
    path: "/faqs",
    element: <ProtectedRoute allowedRoles={ALL_ROLES}><FAQs /></ProtectedRoute>
  },
  {
    path: "/pricing",
    element: <ProtectedRoute allowedRoles={ALL_ROLES}><Pricing /></ProtectedRoute>
  },

  // Finance Modules (admin + accountant)
  {
    path: "/general-ledger",
    element: <ProtectedRoute allowedRoles={ADMIN_AND_ACCOUNTANT}><GeneralLedger /></ProtectedRoute>
  },
  {
    path: "/accounts-payable",
    element: <ProtectedRoute allowedRoles={ADMIN_AND_ACCOUNTANT}><AccountsPayable /></ProtectedRoute>
  },
  {
    path: "/accounts-receivable",
    element: <ProtectedRoute allowedRoles={ADMIN_AND_ACCOUNTANT}><AccountsReceivable /></ProtectedRoute>
  },
  {
    path: "/disbursement-management",
    element: <ProtectedRoute allowedRoles={ADMIN_AND_ACCOUNTANT}><DisbursementManagement /></ProtectedRoute>
  },
  {
    path: "/collection-management",
    element: <ProtectedRoute allowedRoles={ADMIN_AND_ACCOUNTANT}><CollectionManagement /></ProtectedRoute>
  },
  {
    path: "/budget-management",
    element: <ProtectedRoute allowedRoles={ADMIN_AND_ACCOUNTANT}><BudgetManagement /></ProtectedRoute>
  },
  {
    path: "/cash-management",
    element: <ProtectedRoute allowedRoles={[ROLES.ADMIN, ROLES.ACCOUNTANT, ROLES.CASHIER]}><CashManagement /></ProtectedRoute>
  },

  // Role-specific Portals
  {
    path: "/cashier",
    element: <ProtectedRoute allowedRoles={[ROLES.CASHIER, ROLES.ADMIN]}><Cashier /></ProtectedRoute>
  },
  {
    path: "/accountant",
    element: <ProtectedRoute allowedRoles={[ROLES.ACCOUNTANT]}><Accountant /></ProtectedRoute>
  },
  {
    path: "/admin",
    element: <ProtectedRoute allowedRoles={ADMIN_ONLY}><Admin /></ProtectedRoute>
  },

  // Account & Reporting (admin + accountant)
  {
    path: "/account-ss",
    element: <ProtectedRoute allowedRoles={ADMIN_AND_ACCOUNTANT}><AccountSs /></ProtectedRoute>
  },
  {
    path: "/financial-reporting-analytics",
    element: <ProtectedRoute allowedRoles={ADMIN_AND_ACCOUNTANT}><FinancialReportingAnalytics /></ProtectedRoute>
  },
  {
    path: "/tax-management",
    element: <ProtectedRoute allowedRoles={ADMIN_AND_ACCOUNTANT}><TaxManagement /></ProtectedRoute>
  },

  // Authentication Routes (public)
  {
    path: "/auth/sign-in",
    element: <SignIn />
  },
  {
    path: "/auth/sign-in-2",
    element: <SignIn2 />
  },
  {
    path: "/auth/sign-in-3",
    element: <SignIn3 />
  },
  {
    path: "/auth/sign-up",
    element: <SignUp />
  },
  {
    path: "/auth/sign-up-2",
    element: <SignUp2 />
  },
  {
    path: "/auth/sign-up-3",
    element: <SignUp3 />
  },
  {
    path: "/auth/forgot-password",
    element: <ForgotPassword />
  },
  {
    path: "/auth/forgot-password-2",
    element: <ForgotPassword2 />
  },
  {
    path: "/auth/forgot-password-3",
    element: <ForgotPassword3 />
  },

  // Error Pages (public)
  {
    path: "/errors/unauthorized",
    element: <Unauthorized />
  },
  {
    path: "/errors/forbidden",
    element: <Forbidden />
  },
  {
    path: "/errors/not-found",
    element: <NotFound />
  },
  {
    path: "/errors/internal-server-error",
    element: <InternalServerError />
  },
  {
    path: "/errors/under-maintenance",
    element: <UnderMaintenance />
  },

  // Settings Routes (all authenticated users)
  {
    path: "/settings/user",
    element: <ProtectedRoute allowedRoles={ALL_ROLES}><UserSettings /></ProtectedRoute>
  },
  {
    path: "/settings/account",
    element: <ProtectedRoute allowedRoles={ALL_ROLES}><AccountSettings /></ProtectedRoute>
  },
  {
    path: "/settings/billing",
    element: <ProtectedRoute allowedRoles={ADMIN_ONLY}><BillingSettings /></ProtectedRoute>
  },
  {
    path: "/settings/appearance",
    element: <ProtectedRoute allowedRoles={ALL_ROLES}><AppearanceSettings /></ProtectedRoute>
  },
  {
    path: "/settings/notifications",
    element: <ProtectedRoute allowedRoles={ALL_ROLES}><NotificationSettings /></ProtectedRoute>
  },
  {
    path: "/settings/connections",
    element: <ProtectedRoute allowedRoles={ALL_ROLES}><ConnectionSettings /></ProtectedRoute>
  },

  // Catch-all route for 404
  {
    path: "*",
    element: <NotFound />
  }
]
