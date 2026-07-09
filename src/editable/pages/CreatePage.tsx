'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Lock, Send } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const fieldClass = 'rounded-md border border-[#dfd5d4] bg-white px-4 py-3.5 text-sm font-semibold text-[var(--editable-page-text)] outline-none transition placeholder:text-[#7d8795] focus:border-[#3867e8] focus:ring-2 focus:ring-[#3867e8]/15'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const task = (enabledTasks[0]?.key || 'article') as TaskKey
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-[#fff4f3] px-4 py-16 text-[var(--editable-page-text)] sm:px-6 lg:px-8">
          <section className="mx-auto grid max-w-5xl gap-8 border border-[#eadbda] bg-white p-7 shadow-[0_24px_70px_rgba(30,42,58,0.08)] md:grid-cols-[0.9fr_1.1fr] md:p-10">
            <div className="flex h-full min-h-72 items-center justify-center bg-[#ff3b35] text-white">
              <Lock className="h-20 w-20 opacity-80" />
            </div>
            <div className="self-center">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ff3b35]">{pagesContent.create.locked.badge}</p>
              <h1 className="editable-display mt-5 text-5xl font-bold leading-[1.02] sm:text-6xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-6 max-w-xl text-base font-semibold leading-8 opacity-70">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-md bg-[#3867e8] px-6 py-3 text-sm font-black text-white transition hover:bg-[#2d56c7]">Login <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-md border border-[#dfd5d4] bg-white px-6 py-3 text-sm font-black transition hover:border-[#ff3b35]">Register</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-white text-[var(--editable-page-text)]">
        <section className="editable-angle bg-[#fff4f3]">
          <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 pb-24 pt-14 sm:px-6 lg:grid-cols-[0.82fr_1.18fr] lg:px-8 lg:pb-28 lg:pt-20">
            <aside className="self-center">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-[#ff3b35]">{pagesContent.create.hero.badge}</p>
              <h1 className="editable-display mt-5 max-w-lg text-5xl font-bold leading-[1.02] sm:text-6xl lg:text-7xl">{pagesContent.create.hero.title}</h1>
              <p className="mt-6 max-w-lg text-base font-medium leading-8 text-[#536072]">{pagesContent.create.hero.description}</p>
              <div className="mt-9 flex items-center gap-4 border-l-4 border-[#3867e8] bg-white px-5 py-4 shadow-sm">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3867e8] font-black text-white">
                  {(session.name || session.email).slice(0, 1).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7d8795]">Publishing as</p>
                  <p className="truncate font-bold">{session.name || session.email}</p>
                </div>
              </div>
            </aside>

            <form onSubmit={submit} className="border border-[#eadbda] bg-white p-5 shadow-[0_24px_70px_rgba(30,42,58,0.09)] sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-[#ff3b35]">New submission</p>
                  <h2 className="editable-display mt-1 text-3xl font-bold">{pagesContent.create.formTitle}</h2>
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <p className="flex items-center gap-2 text-sm font-black"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm font-semibold opacity-80">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#3867e8] px-6 py-4 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-[#2d56c7]">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
