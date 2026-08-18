import { Link } from 'react-router-dom'
import {
  BookOpen,
  Receipt,
  BadgeDollarSign,
  Banknote,
  HandCoins,
  PieChart,
  Wallet,
  Landmark,
  BarChart3,
  CirclePercent,
  Users,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BaseLayout } from '@/components/layouts/base-layout'
import { useAuth } from '@/contexts/auth-context'

const modules = [
  {
    title: 'General Ledger',
    description: 'Core accounting records and journal entries',
    url: '/general-ledger',
    icon: BookOpen,
    color: 'text-blue-600 dark:text-blue-400',
  },
  {
    title: 'Accounts Payable',
    description: 'Vendor invoices and payment obligations',
    url: '/accounts-payable',
    icon: Receipt,
    color: 'text-orange-600 dark:text-orange-400',
  },
  {
    title: 'Accounts Receivable',
    description: 'Customer invoices and collections tracking',
    url: '/accounts-receivable',
    icon: BadgeDollarSign,
    color: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    title: 'Disbursement Management',
    description: 'Payment execution and bank reconciliation',
    url: '/disbursement-management',
    icon: Banknote,
    color: 'text-red-600 dark:text-red-400',
  },
  {
    title: 'Collection Management',
    description: 'Customer ledger, dunning, and payment application',
    url: '/collection-management',
    icon: HandCoins,
    color: 'text-violet-600 dark:text-violet-400',
  },
  {
    title: 'Budget Management',
    description: 'Budget planning, allocation, and variance analysis',
    url: '/budget-management',
    icon: PieChart,
    color: 'text-amber-600 dark:text-amber-400',
  },
  {
    title: 'Cash Management',
    description: 'Bank accounts, receipts, disbursements, and forecasts',
    url: '/cash-management',
    icon: Wallet,
    color: 'text-teal-600 dark:text-teal-400',
  },
  {
    title: 'Cashier Terminal',
    description: 'Point-of-collection, till reconciliation, and receipts',
    url: '/cashier',
    icon: Landmark,
    color: 'text-pink-600 dark:text-pink-400',
  },
  {
    title: 'Financial Reporting & Analytics',
    description: 'Reports, dashboards, and financial analytics',
    url: '/financial-reporting-analytics',
    icon: BarChart3,
    color: 'text-indigo-600 dark:text-indigo-400',
  },
  {
    title: 'Tax Management',
    description: 'Tax computation, compliance, and filing',
    url: '/tax-management',
    icon: CirclePercent,
    color: 'text-cyan-600 dark:text-cyan-400',
  },
  {
    title: 'Account (Subsystem)',
    description: 'User assignments, roles, and subsystem access',
    url: '/account-ss',
    icon: Users,
    color: 'text-rose-600 dark:text-rose-400',
  },
]

export default function AdminPage() {
  const { user } = useAuth()

  return (
    <BaseLayout
      title="Admin Dashboard"
      description="Full access to all 11 finance modules"
    >
      <div className="px-4 lg:px-6 space-y-6">
        <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-6 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="secondary" className="rounded-full">
                  ISMERS Finance
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  Administrator
                </Badge>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Welcome back, {user?.email?.split('@')[0] ?? 'Admin'}
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                You have full access to all 11 finance modules. Select a module below to get started.
              </p>
            </div>
            <div className="rounded-xl border bg-background/70 px-4 py-3 text-sm">
              <p className="text-muted-foreground">Active modules</p>
              <p className="font-semibold">11 modules · All access</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {modules.map((mod) => (
            <Link key={mod.url} to={mod.url} className="group">
              <Card className="h-full transition-colors group-hover:border-primary/50 group-hover:shadow-md">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <mod.icon className={`size-5 ${mod.color}`} />
                    <Badge variant="secondary" className="text-xs">
                      Open
                    </Badge>
                  </div>
                  <CardTitle className="text-base">{mod.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {mod.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </BaseLayout>
  )
}
