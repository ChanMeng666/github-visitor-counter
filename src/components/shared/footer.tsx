"use client";

import Link from "next/link";
import Image from "next/image";
import { Github, Mail, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Project Brand Section */}
        <div className="flex flex-col items-center gap-4 pb-8 border-b mb-8">
          <div className="flex items-center gap-4">
            <Image
              src="/github-visitor-counter-logo-1.svg"
              alt="GitHub Visitor Counter"
              width={64}
              height={64}
              className="rounded-lg border-2 p-2 bg-background shadow-sm"
            />
            <div>
              <h3 className="text-xl font-bold">GitHub Visitor Counter</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Display visitor flags on your GitHub profile and showcase your global reach
              </p>
            </div>
          </div>
        </div>

        {/* Developer Brand Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-8 border-b mb-8">
          <div className="flex items-center gap-4">
            <Image
              src="/chan_logo.svg"
              alt="Chan Meng Logo"
              width={48}
              height={48}
              className="rounded-lg border-2 p-1 bg-background"
            />
            <div>
              <h3 className="text-lg font-bold">Chan Meng</h3>
              <p className="text-sm text-muted-foreground">Full-Stack Developer & Digital Creator</p>
            </div>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground italic mb-2">
              Need a custom web solution? Let's build something amazing together!
            </p>
            <Link href="mailto:chanmeng.dev@gmail.com">
              <Button className="gap-2">
                <Mail className="h-4 w-4" />
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">Developer</h4>
            <div className="flex flex-col space-y-2">
              <Link
                href="https://github.com/ChanMeng666"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-4 w-4" />
                Portfolio & Works
              </Link>
              <Link
                href="mailto:chanmeng.dev@gmail.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                chanmeng.dev@gmail.com
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-3">This Project</h4>
            <div className="flex flex-col space-y-2">
              <Link
                href="https://github.com/ChanMeng666/github-visitor-counter"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Code className="h-4 w-4" />
                Source Code
              </Link>
              <Link
                href="https://flagcounter.com"
                target="_blank"
                rel="noopener"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
                  <line x1="4" y1="22" x2="4" y2="15"/>
                </svg>
                Powered by Flag Counter
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} Chan Meng. Built with ❤️ for the GitHub community.
          </p>
          <p className="text-xs text-muted-foreground/80 italic mt-1">
            Connecting developers worldwide, one visitor at a time.
          </p>
        </div>
      </div>
    </footer>
  );
}
