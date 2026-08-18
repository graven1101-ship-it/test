"use client"

import * as React from "react"
import {
  Mail,
  CheckSquare,
  MessageCircle,
  Calendar,
  Shield,
  AlertTriangle,
  Settings,
  HelpCircle,
  CreditCard,
  LayoutTemplate,
  Users,
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
} from "lucide-react"
import { Link } from "react-router-dom"
import { Logo } from "@/components/logo"
import { useAuth, ROLES } from "@/contexts/auth-context"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const allModules = [
  { title: "General Ledger", url: "/general-ledger", icon: BookOpen, color: "text-blue-600 dark:text-blue-400" },
  { title: "Accounts Payable (AP)", url: "/accounts-payable", icon: Receipt, color: "text-orange-600 dark:text-orange-400", items: [
    { title: "Overview", url: "/accounts-payable" },
    { title: "Payroll", url: "/accounts-payable" },
    { title: "Tax Management", url: "/tax-management" },
  ]},
  { title: "Accounts Receivable (AR)", url: "/accounts-receivable", icon: BadgeDollarSign, color: "text-emerald-600 dark:text-emerald-400" },
  { title: "Disbursement Management", url: "/disbursement-management", icon: Banknote, color: "text-red-600 dark:text-red-400" },
  { title: "Collection Management", url: "/collection-management", icon: HandCoins, color: "text-violet-600 dark:text-violet-400" },
  { title: "Budget Management", url: "/budget-management", icon: PieChart, color: "text-amber-600 dark:text-amber-400" },
  { title: "Cash Management", url: "/cash-management", icon: Wallet, color: "text-teal-600 dark:text-teal-400" },
  { title: "Cashier Terminal", url: "/cashier", icon: Landmark, color: "text-pink-600 dark:text-pink-400" },
  { title: "Financial Reporting & Analytics", url: "/financial-reporting-analytics", icon: BarChart3, color: "text-indigo-600 dark:text-indigo-400" },
  { title: "Tax Management", url: "/tax-management", icon: CirclePercent, color: "text-cyan-600 dark:text-cyan-400" },
  { title: "Account", url: "/account-ss", icon: Users, color: "text-rose-600 dark:text-rose-400" },
]

const CASHIER_MODULES = new Set(["/cash-management", "/cashier"])
const ACCOUNTANT_EXCLUDED = new Set(["/cashier"])

function getModulesForRole(role: string | undefined) {
  if (!role) return []
  if (role === ROLES.ADMIN) return allModules
  if (role === ROLES.CASHIER) return allModules.filter((m) => CASHIER_MODULES.has(m.url))
  if (role === ROLES.ACCOUNTANT) return allModules.filter((m) => !ACCOUNTANT_EXCLUDED.has(m.url))
  return []
}

function getSidebarLabel(role: string | undefined) {
  if (role === ROLES.ADMIN) return "Admin Dashboard"
  if (role === ROLES.CASHIER) return "Cashier Terminal"
  if (role === ROLES.ACCOUNTANT) return "Accountant Portal"
  return "Dashboard"
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth()
  const modules = getModulesForRole(user?.role)
  const sidebarLabel = getSidebarLabel(user?.role)

  const navGroups = [
    {
      label: "Sub Modules",
      items: modules,
    },
    {
      label: "Apps",
      items: [
        { title: "Mail", url: "/mail", icon: Mail },
        { title: "Tasks", url: "/tasks", icon: CheckSquare },
        { title: "Chat", url: "/chat", icon: MessageCircle },
        { title: "Calendar", url: "/calendar", icon: Calendar },
        ...(user?.role === ROLES.ADMIN ? [{ title: "Users", url: "/users", icon: Users }] : []),
      ],
    },
    {
      label: "Pages",
      items: [
        { title: "Landing", url: "/landing", target: "_blank", icon: LayoutTemplate },
        {
          title: "Auth Pages",
          url: "#",
          icon: Shield,
          items: [
            { title: "Sign In 1", url: "/auth/sign-in" },
            { title: "Sign In 2", url: "/auth/sign-in-2" },
            { title: "Sign In 3", url: "/auth/sign-in-3" },
            { title: "Sign Up 1", url: "/auth/sign-up" },
            { title: "Sign Up 2", url: "/auth/sign-up-2" },
            { title: "Sign Up 3", url: "/auth/sign-up-3" },
            { title: "Forgot Password 1", url: "/auth/forgot-password" },
            { title: "Forgot Password 2", url: "/auth/forgot-password-2" },
            { title: "Forgot Password 3", url: "/auth/forgot-password-3" },
          ],
        },
        {
          title: "Errors",
          url: "#",
          icon: AlertTriangle,
          items: [
            { title: "Unauthorized", url: "/errors/unauthorized" },
            { title: "Forbidden", url: "/errors/forbidden" },
            { title: "Not Found", url: "/errors/not-found" },
            { title: "Internal Server Error", url: "/errors/internal-server-error" },
            { title: "Under Maintenance", url: "/errors/under-maintenance" },
          ],
        },
        {
          title: "Settings",
          url: "#",
          icon: Settings,
          items: [
            { title: "User Settings", url: "/settings/user" },
            { title: "Account Settings", url: "/settings/account" },
            { title: "Plans & Billing", url: "/settings/billing" },
            { title: "Appearance", url: "/settings/appearance" },
            { title: "Notifications", url: "/settings/notifications" },
            { title: "Connections", url: "/settings/connections" },
          ],
        },
        { title: "FAQs", url: "/faqs", icon: HelpCircle },
        { title: "Pricing", url: "/pricing", icon: CreditCard },
      ],
    },
  ]

  const homeRoute = user?.role === ROLES.CASHIER ? "/cashier"
    : user?.role === ROLES.ACCOUNTANT ? "/accountant"
    : "/admin"

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={homeRoute}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground border-none ring-0 shadow-none">
                  <Logo size={24} className="text-current" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">FINANCE</span>
                  <span className="truncate text-xs">{sidebarLabel}</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {navGroups.map((group) => (
          <NavMain key={group.label} label={group.label} items={group.items} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user ? { name: user.email.split("@")[0], email: user.email, avatar: "" } : { name: "User", email: "", avatar: "" }} />
      </SidebarFooter>
    </Sidebar>
  )
}
