import Link from 'next/link'
import { Compass, Lightbulb, MessageSquare, Search, ShieldCheck, Sparkles, Star } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'
import type { LucideIcon } from 'lucide-react'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'

const supportItems: Array<{ Icon: LucideIcon; title: string; text: string }> = [
  { Icon: ShieldCheck, title: 'Clear by design', text: 'Every page keeps the same calm and dependable rhythm.' },
  { Icon: Compass, title: 'Easy to explore', text: 'Useful paths help you move naturally from one discovery to the next.' },
  { Icon: MessageSquare, title: 'Open conversation', text: 'Thoughtful discussion stays clear, welcoming, and easy to scan.' },
]

const discoveryItems: Array<{ Icon: LucideIcon; title: string; text: string; href: string }> = [
  { Icon: Compass, title: 'Explore freely', text: 'Follow fresh ideas, helpful resources, and unexpected points of view.', href: '/search' },
  { Icon: Lightbulb, title: 'Find inspiration', text: 'Discover practical knowledge that supports everyday questions and decisions.', href: '/about' },
  { Icon: ShieldCheck, title: 'Browse with clarity', text: 'Enjoy a focused experience designed to make useful information easier to find.', href: '/search' },
]

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  return posts.filter((post) => {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function allPosts(posts: SitePost[], timeSections: HomeTimeSection[]) {
  return dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
}

function Stars() {
  return (
    <span className="inline-flex items-center gap-[3px] text-[var(--slot4-accent)]">
      {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-4 w-4 fill-current" />)}
    </span>
  )
}

function FeaturedCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group block overflow-hidden bg-white editable-card-shadow">
      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="p-6 sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
        <h2 className="editable-display mt-3 text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h2>
        <p className="mt-4 line-clamp-3 text-base leading-8 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 190)}</p>
      </div>
    </Link>
  )
}

function CompactCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex gap-4 border-t border-[var(--editable-border)] py-5">
      <span className="editable-display text-2xl font-bold text-[var(--slot4-accent)]">{String(index + 1).padStart(2, '0')}</span>
      <span className="min-w-0">
        <span className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--slot4-muted-text)]">{getEditableCategory(post)}</span>
        <span className="editable-display mt-1 block text-xl font-bold leading-snug group-hover:text-[var(--slot4-accent)]">{post.title}</span>
      </span>
    </Link>
  )
}

function HorizontalCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group grid gap-5 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:grid-cols-[180px_minmax(0,1fr)]">
      <div className="aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="min-w-0 py-1">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
        <h3 className="editable-display mt-2 line-clamp-2 text-2xl font-bold leading-tight">{post.title}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 130)}</p>
      </div>
    </Link>
  )
}

function ImageFirstCard({ post, href }: { post: SitePost; href: string }) {
  return (
    <Link href={href} className="group relative block min-w-[280px] max-w-[280px] overflow-hidden bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:min-w-[340px] sm:max-w-[340px]">
      <div className="aspect-[4/5] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <div className="absolute inset-x-4 bottom-4 bg-white p-4 shadow-md">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--slot4-accent)]">{getEditableCategory(post)}</p>
        <h3 className="editable-display mt-1 line-clamp-2 text-xl font-bold leading-tight">{post.title}</h3>
      </div>
    </Link>
  )
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = allPosts(posts, timeSections)
  const featured = pool[0]
  const heroImage = featured ? getEditablePostImage(featured) : '/placeholder.svg?height=900&width=1200'

  return (
    <section className="editable-angle bg-[var(--slot4-warm)]">
      <div className={`${container} grid min-h-[620px] gap-12 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center`}>
        <div>
          <p className="text-sm font-bold text-[var(--slot4-muted-text)]">{pagesContent.home.hero.badge}</p>
          <h1 className="editable-display mt-5 max-w-xl text-5xl font-bold leading-[1.05] text-[var(--slot4-page-text)] sm:text-6xl">
            Ideas that brighten the way forward.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--slot4-page-text)]">Revilume is a calm place to discover useful knowledge, fresh perspectives, and practical resources for everyday life.</p>
          <form action="/search" className="mt-8 flex max-w-xl overflow-hidden rounded-md bg-white shadow-sm">
            <label className="flex min-w-0 flex-1 items-center gap-3 px-5">
              <Search className="h-5 w-5 text-[var(--slot4-accent)]" />
              <input name="q" placeholder="Search ideas, resources, and topics" className="min-w-0 flex-1 bg-transparent py-4 text-sm font-semibold outline-none placeholder:text-[var(--slot4-soft-muted-text)]" />
            </label>
            <button className="bg-[var(--editable-cta-bg)] px-6 text-sm font-bold text-white">Search</button>
          </form>
        </div>
        <Link href={featured ? postHref(primaryTask, featured, primaryRoute) : primaryRoute} className="group relative editable-float">
          <div className="absolute -bottom-4 -right-4 h-full w-full border-2 border-[var(--editable-border)]" />
          <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
            <img src={heroImage} alt={featured?.title || SITE_CONFIG.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
          </div>
        </Link>
      </div>
    </section>
  )
}

export function EditableStoryRail(_props: HomeSectionProps) {
  return (
    <section className="bg-white">
      <div className={`${container} grid gap-8 py-16 sm:grid-cols-2 lg:grid-cols-3`}>
        {discoveryItems.map(({ Icon, title, text, href }) => {
          return (
            <Link key={title} href={href} className="group flex gap-5 p-2">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[var(--editable-cta-bg)] text-white transition group-hover:-translate-y-1">
                <Icon className="h-7 w-7" />
              </span>
              <span>
                <span className="editable-display text-2xl font-bold group-hover:text-[var(--slot4-accent)]">{title}</span>
                <span className="mt-2 block max-w-xs text-sm leading-6 text-[var(--slot4-muted-text)]">{text}</span>
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = allPosts(posts, timeSections)
  if (!pool.length) return null
  return (
    <section className="bg-[var(--slot4-lavender)]">
      <div className={`${container} py-16`}>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="editable-display text-5xl font-bold leading-tight">Built for thoughtful discovery</h2>
          <p className="mt-4 text-lg leading-8 text-[var(--slot4-muted-text)]">Fresh perspectives and practical references come together in an experience that feels useful without feeling crowded.</p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <FeaturedCard post={pool[0]} href={postHref(primaryTask, pool[0], primaryRoute)} />
          <div className="bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Latest notes</p>
            {pool.slice(1, 6).map((post, index) => <CompactCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = allPosts(posts, timeSections).slice(0, 16)
  if (!pool.length) return null
  const doubled = [...pool, ...pool]
  return (
    <>
      <section className="overflow-hidden bg-[var(--slot4-warm)] py-16">
        <div className={`${container} mb-8 flex flex-wrap items-end justify-between gap-4`}>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Moving spotlight</p>
            <h2 className="editable-display mt-2 text-4xl font-bold">Fresh cards from Revilume</h2>
          </div>
          <Stars />
        </div>
        <div className="flex w-max gap-6 editable-marquee">
          {doubled.map((post, index) => <ImageFirstCard key={`${post.id || post.slug}-${index}`} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
        </div>
      </section>

      <section className="bg-white">
        <div className={`${container} grid gap-10 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start`}>
          <div>
            <h2 className="editable-display text-5xl font-bold leading-tight">With you from curiosity to clarity</h2>
            <p className="mt-5 text-lg leading-8 text-[var(--slot4-muted-text)]">Use Revilume to gather context, consider new perspectives, and continue exploring across connected pages.</p>
            <div className="mt-7 space-y-3">
              {supportItems.map(({ Icon, title, text }) => (
                <div key={title} className="border border-[var(--editable-border)] bg-white p-5 shadow-sm">
                  <div className="flex gap-4">
                    <Icon className="h-6 w-6 shrink-0 text-[var(--editable-cta-bg)]" />
                    <div>
                      <h3 className="font-bold">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-[var(--slot4-muted-text)]">{text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="grid gap-5">
            {pool.slice(4, 8).map((post) => <HorizontalCard key={post.id || post.slug} post={post} href={postHref(primaryTask, post, primaryRoute)} />)}
          </div>
        </div>
      </section>
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-white">
      <div className={`${container} border-t border-[var(--editable-border)] py-16 text-center`}>
        <Sparkles className="mx-auto h-8 w-8 text-[var(--slot4-accent)]" />
        <h2 className="editable-display mx-auto mt-4 max-w-2xl text-5xl font-bold leading-tight">Start exploring useful public knowledge today</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[var(--slot4-muted-text)]">Find useful ideas, fresh perspectives, and practical resources in one polished Revilume experience.</p>
        <Link href="/create" className="mt-8 inline-flex rounded-md bg-[var(--editable-cta-bg)] px-7 py-3 text-sm font-bold text-white">Create a post</Link>
      </div>
    </section>
  )
}
