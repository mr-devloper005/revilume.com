'use client'

import Link from 'next/link'
import { LogOut, PlusCircle } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.6fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-[var(--slot4-accent)]">
              <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-8 w-8 object-contain" />
            </span>
            <span className="editable-display text-2xl font-bold tracking-[0.01em]">{SITE_CONFIG.name}</span>
          </Link>
          <p className="mt-4 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">{globalContent.footer?.description || SITE_CONFIG.description}</p>
          <p className="editable-display mt-4 max-w-sm text-xl font-bold leading-snug">Read, discover, and connect with useful public content.</p>
        </div>

        <div>
          <h3 className="text-sm font-bold text-[var(--slot4-page-text)]">Site</h3>
          <div className="mt-4 grid gap-2">
            {[
              ['About', '/about'],
              ['Contact', '/contact'],
              ...(session ? [['Create', '/create']] : [['Sign In', '/login'], ['Sign Up', '/signup']]),
            ].map(([label, href]) => (
              <Link key={href} href={href} className="text-sm font-medium text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-accent)]">{label}</Link>
            ))}
            {session ? (
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href="/create" className="inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-bold text-[var(--slot4-accent)] shadow-sm"><PlusCircle className="h-4 w-4" /> Create</Link>
                <button type="button" onClick={logout} className="inline-flex items-center gap-2 rounded-md bg-[var(--slot4-accent)] px-4 py-2 text-sm font-bold text-white"><LogOut className="h-4 w-4" /> Logout</button>
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[var(--editable-container)] border-t border-[var(--editable-border)] px-4 py-5 text-xs font-medium text-[var(--slot4-muted-text)] sm:px-6 lg:px-8">
        (c) {year} {SITE_CONFIG.name}. All rights reserved.
      </div>
    </footer>
  )
}
