"use client"

import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-card rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">Create your Education Marketplace account</h2>

        <form className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground">Name</label>
            <Input type="text" placeholder="Your full name" />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Email</label>
            <Input type="email" placeholder="you@example.com" />
          </div>

          <div>
            <label className="text-sm text-muted-foreground">Password</label>
            <Input type="password" placeholder="••••••••" />
          </div>

          <div className="flex items-center justify-between">
            <Button type="submit">Create account</Button>
            <Link href="/auth/login" className="text-sm text-primary">Already have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
