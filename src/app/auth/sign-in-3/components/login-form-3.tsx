"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/logo"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import darkModeImage from "./darkMODE.jpg"

function RoleSelector() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string>("Select role")
  const ref = useRef<HTMLDivElement | null>(null)
  const roles = ["Cashier", "Accountant", "Admin"]

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", onDocClick)
    return () => document.removeEventListener("mousedown", onDocClick)
  }, [])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={() => setOpen(true)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-md border bg-transparent"
      >
        <span className={cn("text-sm", selected === "Select role" ? "text-muted-foreground" : "")}>{selected}</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.584l3.71-4.354a.75.75 0 011.14.976l-4.25 5a.75.75 0 01-1.14 0l-4.25-5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className="absolute z-10 mt-2 w-full rounded-md border bg-card shadow-sm"
        >
          {roles.map((r) => (
            <li key={r}>
              <button
                type="button"
                onClick={() => {
                  setSelected(r)
                  setOpen(false)
                  if (r === 'Cashier') {
                    navigate('/cashier')
                  } else if (r === 'Accountant') {
                    navigate('/accountant')
                  } else if (r === 'Admin') {
                    navigate('/admin')
                  }
                }}
                className="w-full text-left px-3 py-2 text-sm hover:bg-accent"
              >
                {r}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function LoginForm3({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" action="/dashboard">
            <div className="flex flex-col gap-6">
              <div className="flex justify-center mb-2">
                <a href="/" className="flex items-center gap-2 font-medium">
                  <div className="flex size-8 items-center justify-center rounded-md">
                    <Logo size={24} />
                  </div>
                  <span className="text-xl"> PMS FINANCE</span>
                </a>
              </div>
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-muted-foreground text-balance">Login to your PMS FINANCE account</p>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="test@example.com" defaultValue="test@example.com" required />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="/templates/dashboard/shadcn-dashboard-landing-template/auth/forgot-password-3" className="ml-auto text-sm underline-offset-2 hover:underline">
                    Forgot your password?
                  </a>
                </div>
                <Input id="password" type="password" defaultValue="password" required />
              </div>
              <Button type="submit" className="w-full cursor-pointer">
                Login
              </Button>

              <RoleSelector />

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/templates/dashboard/shadcn-dashboard-landing-template/auth/sign-up-3" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:flex items-center justify-center bg-white dark:bg-neutral-900 p-8">
            <img src={darkModeImage} alt="PMS Dark Mode" className="max-w-full max-h-full object-contain filter dark:brightness-95" />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
