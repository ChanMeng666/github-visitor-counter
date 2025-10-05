"use client";

import Link from "next/link";
import Image from "next/image";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <Image
            src="/github-visitor-counter-logo-1.svg"
            alt="GitHub Visitor Counter Logo"
            width={32}
            height={32}
            className="transition-transform hover:scale-110"
          />
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold tracking-tight">GitHub Visitor Counter</h1>
            <p className="text-xs text-muted-foreground">Track visitors worldwide</p>
          </div>
          <h1 className="sm:hidden text-lg font-bold">GVC</h1>
        </Link>

        <nav className="flex items-center space-x-2 sm:space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Dashboard
            </Button>
          </Link>
          <Link href="/api-help">
            <Button variant="ghost" size="sm">
              API Docs
            </Button>
          </Link>
          <Link
            href="https://github.com/ChanMeng666/github-visitor-counter"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="default" size="sm" className="gap-2">
              <Github className="h-4 w-4" />
              <span className="hidden sm:inline">GitHub</span>
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}
