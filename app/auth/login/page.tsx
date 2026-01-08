"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Sign in to Education Marketplace</h2>

        <form className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground">Email</label>
            <Input type="email" placeholder="you@example.com" />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Password</label>
            <Input type="password" placeholder="••••••••" />
          </div>

          <div className="flex items-center justify-between">
            <Button type="submit">Sign in</Button>
            <Link href="/auth/signup" className="text-sm text-primary">Create account</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
