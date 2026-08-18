import { Link } from 'react-router-dom'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import {
  ArrowRightLeft,
  BadgeCheck,
  Banknote,
  BookOpen,
  BadgeDollarSign,
  BriefcaseBusiness,
  CircleDollarSign,
  CirclePercent,
  HandCoins,
  Landmark,
  PieChart,
  Receipt,
  ReceiptText,
  ShieldCheck,
  TrendingUp,
  Wallet,
  BarChart3,
  Users,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BaseLayout } from '@/components/layouts/base-layout'

const formatPHP = (value: number) =>
  new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    maximumFractionDigits: 0,
  }).format(value)

const monthlyTrend = [
  { month: 'Apr', collections: 4_850_000, disbursements: 3_620_000, net: 1_230_000 },
  { month: 'May', collections: 5_120_000, disbursements: 3_980_000, net: 1_140_000 },
  { month: 'Jun', collections: 4_960_000, disbursements: 3_720_000, net: 1_240_000 },
  { month: 'Jul', collections: 5_430_000, disbursements: 4_050_000, net: 1_380_000 },
]

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

const pendingTasks = [
  { title: 'Reconcile payroll clearing account', due: 'Today · 3:00 PM' },
  { title: 'Approve vendor disbursement batch', due: 'Today · 5:30 PM' },
  { title: 'Review AR aging for recruiting clients', due: 'Tomorrow' },
]

export default function AccountantPage() {
  return (
    <BaseLayout
      title="Accountant Dashboard"
      description="Access to 10 finance modules — full accounting oversight"
    >
      <div className="space-y-6 px-4 lg:px-6">
        <div className="rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-6 shadow-sm">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Badge variant="secondary" className="rounded-full">
                  ISMERS Finance Command Center
                </Badge>
                <Badge variant="outline" className="rounded-full">
                  Accountant Office
                </Badge>
              </div>
              <h1 className="text-2xl font-semibold tracking-tight">
                Accounting oversight for the full enterprise ecosystem
              </h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Monitor financial performance across General Ledger, AP, AR, cash, budget, tax, and reporting modules while keeping the broader ISMERS platform aligned.
              </p>
            </div>
            <div className="rounded-xl border bg-background/70 px-4 py-3 text-sm">
              <p className="text-muted-foreground">Accessible modules</p>
              <p className="font-semibold">10 modules · Full accounting access</p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Gross Receivables</CardTitle>
              <CircleDollarSign className="size-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{formatPHP(18_450_000)}</div>
              <p className="mt-1 text-xs text-muted-foreground">+8.4% vs last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Disbursements</CardTitle>
              <Banknote className="size-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{formatPHP(4_050_000)}</div>
              <p className="mt-1 text-xs text-muted-foreground">Within approved budget envelope</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cash Position</CardTitle>
              <Wallet className="size-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">{formatPHP(9_780_000)}</div>
              <p className="mt-1 text-xs text-muted-foreground">3 operating accounts above minimum balance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
              <ShieldCheck className="size-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">98.2%</div>
              <p className="mt-1 text-xs text-muted-foreground">Tax and statutory documents up to date</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="size-4 text-primary" />
                Cash flow trend
              </CardTitle>
              <CardDescription>Collections vs. disbursements across the last four months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyTrend}>
                    <defs>
                      <linearGradient id="collectionsFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.04} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} />
                    <YAxis tickLine={false} axisLine={false} fontSize={12} tickFormatter={(value) => `${value / 1000000}M`} />
                    <Tooltip formatter={(value) => formatPHP(Number(value))} />
                    <Area type="monotone" dataKey="collections" stroke="hsl(var(--primary))" fill="url(#collectionsFill)" strokeWidth={2} />
                    <Area type="monotone" dataKey="disbursements" stroke="hsl(var(--chart-3))" fill="transparent" strokeWidth={2} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Landmark className="size-4 text-primary" />
                Office highlights
              </CardTitle>
              <CardDescription>Critical finance metrics for the week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border bg-muted/40 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Collection efficiency</span>
                  <span className="font-semibold text-emerald-600">94%</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Above the 90% target set for this quarter.</p>
              </div>
              <div className="rounded-lg border bg-muted/40 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Pending approvals</span>
                  <span className="font-semibold">8</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Mostly vendor invoices and reimbursement claims.</p>
              </div>
              <div className="rounded-lg border bg-muted/40 p-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Audit readiness</span>
                  <span className="font-semibold text-emerald-600">Ready</span>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">Documents and controls are prepared for the next review.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BriefcaseBusiness className="size-4 text-primary" />
                Finance modules
              </CardTitle>
              <CardDescription>Click a module to navigate directly</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {modules.map((mod) => (
                <Link key={mod.url} to={mod.url} className="group">
                  <div className="flex items-center justify-between rounded-lg border p-3 transition-colors group-hover:border-primary/50 group-hover:bg-muted/30">
                    <div className="flex items-center gap-3">
                      <mod.icon className={`size-4 ${mod.color}`} />
                      <div>
                        <p className="font-medium text-sm">{mod.title}</p>
                        <p className="text-xs text-muted-foreground">{mod.description}</p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      Open
                    </Badge>
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ReceiptText className="size-4 text-primary" />
                Pending office actions
              </CardTitle>
              <CardDescription>Today's priorities for the accounting team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingTasks.map((task) => (
                <div key={task.title} className="rounded-lg border p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{task.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{task.due}</p>
                    </div>
                    <Badge variant="outline" className="rounded-full">
                      <BadgeCheck className="mr-1 size-3" />
                      Ready
                    </Badge>
                  </div>
                </div>
              ))}
              <div className="rounded-lg border border-dashed p-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ArrowRightLeft className="size-4 text-primary" />
                  Cross-module reconciliation is running smoothly across HR, Procurement, and Finance.
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BaseLayout>
  )
}
