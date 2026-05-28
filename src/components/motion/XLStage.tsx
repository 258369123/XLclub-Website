import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { focusAreas, site, stats } from "../../data/site";
import {
  honorCategories,
  honors,
  primaryHonorCategories,
  type HonorFilter,
} from "../../data/honors";
import {
  members,
  primaryMemberTracks,
  tracks,
  type Member,
  type MemberFilter,
} from "../../data/members";
import { aboutContent } from "../../data/about";

type PageId = "home" | "about" | "members" | "honors";
type ActiveTrack = MemberFilter;
type PageMeta = {
  id: PageId;
  number: string;
  label: string;
};

const MOBILE_STAGE_WIDTH = 540;
const MOBILE_STAGE_HEIGHT = 960;
const MOBILE_STAGE_BREAKPOINT = 900;
const TYPEWRITER_TYPE_DELAY = 52;
const TYPEWRITER_DELETE_DELAY = 28;
const TYPEWRITER_HOLD_DELAY = 1600;

const pages: PageMeta[] = [
  { id: "home", number: "01", label: "首页" },
  { id: "members", number: "02", label: "成员" },
  { id: "honors", number: "03", label: "成果" },
  { id: "about", number: "04", label: "关于" },
];

const pageVariants = {
  enter: { opacity: 0, x: 42 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -42 },
};

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

function getBrandMark(name: string) {
  return (
    name
      .replace(/[^a-z0-9]/gi, "")
      .slice(0, 2)
      .toUpperCase() || "XL"
  );
}

function isImageAvatar(value: string) {
  const avatar = value.trim();

  return (
    avatar.startsWith("http://") ||
    avatar.startsWith("https://") ||
    avatar.startsWith("//") ||
    avatar.startsWith("/") ||
    /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(avatar)
  );
}

function getAvatarImageSrc(value: string) {
  const avatar = value.trim();

  if (!avatar || !isImageAvatar(avatar)) return null;
  if (
    avatar.startsWith("http://") ||
    avatar.startsWith("https://") ||
    avatar.startsWith("//")
  )
    return avatar;
  if (avatar.startsWith("/")) return avatar;

  return `/${avatar.replace(/^\.?\//, "")}`;
}

function getAvatarText(member: Member) {
  const avatar = member.avatar.trim();

  if (avatar && !isImageAvatar(avatar)) return avatar.slice(0, 2);
  return member.name.slice(0, 1);
}

function isRealLink(href?: string) {
  return Boolean(href && href.trim() && href.trim() !== "#");
}

function isPrimaryMemberTrack(track: string) {
  return primaryMemberTracks.some((item) => item === track);
}

function isPrimaryHonorCategory(category: string) {
  return primaryHonorCategories.some((item) => item === category);
}

function BrandMark() {
  const [imageFailed, setImageFailed] = useState(false);
  const logo = site.logo;
  const fallbackText =
    logo.mode === "text" && logo.text.trim()
      ? logo.text.trim()
      : getBrandMark(site.name);

  if (logo.mode === "image" && logo.src && !imageFailed) {
    return (
      <img
        src={logo.src}
        alt={logo.alt ?? `${site.name} 标志`}
        className="size-full object-contain p-1"
        decoding="async"
        onError={() => setImageFailed(true)}
      />
    );
  }

  return (
    <span className="font-mono text-sm font-black tracking-normal">
      {fallbackText}
    </span>
  );
}

function TypewriterText({ lines }: { lines: string[] }) {
  const phrases =
    lines.length > 0 ? lines : [site.typewriterLines[0] ?? site.name];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [visibleLength, setVisibleLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const phrase = phrases[phraseIndex] ?? "";
  const visibleText = phrase.slice(0, visibleLength);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || phrases.length <= 1) {
      setVisibleLength(phrase.length);
      setIsDeleting(false);
      return;
    }

    const isComplete = visibleLength === phrase.length;
    const isEmpty = visibleLength === 0;
    const delay = isComplete
      ? TYPEWRITER_HOLD_DELAY
      : isDeleting
        ? TYPEWRITER_DELETE_DELAY
        : TYPEWRITER_TYPE_DELAY;

    const timer = window.setTimeout(() => {
      if (!isDeleting && isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && isEmpty) {
        setIsDeleting(false);
        setPhraseIndex((current) => (current + 1) % phrases.length);
        return;
      }

      setVisibleLength((current) => current + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isDeleting, phrase, phrases.length, visibleLength]);

  useEffect(() => {
    setVisibleLength(0);
    setIsDeleting(false);
  }, [phraseIndex]);

  return (
    <p className="typewriter-copy mt-7 max-w-xl text-lg leading-8 text-fog/86">
      <span>{visibleText}</span>
      <span className="typewriter-cursor" aria-hidden="true" />
    </p>
  );
}

export default function XLStage() {
  const [page, setPage] = useState<PageId>("home");
  const [track, setTrack] = useState<ActiveTrack>("全部");
  const [viewport, setViewport] = useState({ width: 1280, height: 720 });

  useEffect(() => {
    const updateViewport = () => {
      const visualViewport = window.visualViewport;

      setViewport({
        width: visualViewport?.width ?? window.innerWidth,
        height: visualViewport?.height ?? window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    window.visualViewport?.addEventListener("resize", updateViewport);

    return () => {
      window.removeEventListener("resize", updateViewport);
      window.visualViewport?.removeEventListener("resize", updateViewport);
    };
  }, []);

  const activePage = pages.find((item) => item.id === page) ?? pages[0];
  const activeIndex = pages.findIndex((item) => item.id === page);
  const nextPage = pages[(activeIndex + 1) % pages.length];
  const isMobileStage = viewport.width <= MOBILE_STAGE_BREAKPOINT;
  const mobileStageScale = Math.min(
    1,
    viewport.width / MOBILE_STAGE_WIDTH,
    viewport.height / MOBILE_STAGE_HEIGHT,
  );

  const visibleMembers = useMemo(
    () =>
      members.filter((member) => {
        if (track === "全部") return true;
        if (track === "其他") return !isPrimaryMemberTrack(member.track);

        return member.track === track;
      }),
    [track],
  );

  return (
    <div className="fixed inset-0 overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0">
        <div
          className={classNames(
            "xl-stage-frame overflow-hidden bg-ink",
            isMobileStage ? "absolute left-1/2 top-1/2 origin-center" : "",
          )}
          data-stage={isMobileStage ? "mobile" : "desktop"}
          style={
            isMobileStage
              ? {
                  width: MOBILE_STAGE_WIDTH,
                  height: MOBILE_STAGE_HEIGHT,
                  transform: `translate(-50%, -50%) scale(${mobileStageScale})`,
                }
              : undefined
          }
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(245,242,234,0.055)_1px,transparent_1px),linear-gradient(180deg,rgba(245,242,234,0.045)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="pointer-events-none absolute -left-16 bottom-8 h-8 w-[56rem] -rotate-[148deg] bg-coral/12" />
          <div className="pointer-events-none absolute right-[9vw] top-[14vh] h-28 w-2 bg-coral" />

          <header className="absolute left-0 right-0 top-0 z-20 border-b border-paper/12 bg-ink/82 backdrop-blur-md">
            <div className="xl-stage-bar flex h-16 items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setPage("home")}
                className="flex items-center gap-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
                aria-label="返回首页"
              >
                <span className="grid size-9 place-items-center border border-paper/20 bg-paper text-ink">
                  <BrandMark />
                </span>
                <span className="brand-text leading-none">
                  <span className="block font-mono text-sm font-semibold tracking-[0.24em] text-paper">
                    {site.name}
                  </span>
                  <span className="mt-1 block text-[10px] uppercase tracking-[0.32em] text-steel">
                    技术团队
                  </span>
                </span>
              </button>

              <div className="top-page-nav flex items-center gap-1">
                {pages.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPage(item.id)}
                    className={classNames(
                      "px-3 py-2 font-mono text-[11px] uppercase tracking-[0.22em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal",
                      page === item.id
                        ? "text-signal"
                        : "text-fog/76 hover:text-paper",
                    )}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <a
                href={site.join}
                className="join-link inline-flex h-10 items-center gap-2 border border-signal bg-signal px-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
              >
                加入我们
              </a>
            </div>
          </header>

          <aside className="xl-stage-left-rail absolute z-10 border-r border-paper/12">
            <div className="flex h-full flex-col items-center justify-between py-10">
              <div className="vertical-label font-mono text-xs tracking-[0.32em] text-steel">
                团队坐标
              </div>
              <div className="flex flex-col items-center gap-4">
                <span className="h-20 w-px bg-paper/20" />
                <span className="font-mono text-2xl font-black text-paper">
                  {activePage.number}
                </span>
                <span className="h-20 w-px bg-paper/20" />
              </div>
              <div className="vertical-label font-mono text-xs tracking-[0.32em] text-steel">
                技术展示
              </div>
            </div>
          </aside>

          <nav className="xl-stage-right-rail absolute z-10 border-l border-paper/12">
            <div className="flex h-full flex-col items-center justify-center gap-5">
              {pages.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setPage(item.id)}
                  className={classNames(
                    "vertical-label border-l px-4 py-2 font-mono text-xs tracking-[0.28em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal",
                    page === item.id
                      ? "border-signal text-signal"
                      : "border-paper/20 text-steel hover:border-paper/60 hover:text-paper",
                  )}
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setPage(nextPage.id)}
                className="mt-8 grid size-14 place-items-center border border-paper/18 bg-ink text-paper transition hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
                aria-label={`切换到${nextPage.label}`}
              >
                <span className="text-2xl" aria-hidden="true">
                  →
                </span>
              </button>
            </div>
          </nav>

          <footer className="absolute bottom-0 left-0 right-0 z-20 border-t border-paper/12 bg-ink/82 backdrop-blur-md">
            <div className="xl-stage-bar flex h-20 items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
              <span>联系 / 公开邮箱</span>
              <span>
                {activePage.number} / {activePage.label}
              </span>
            </div>
          </footer>

          <main className="xl-stage-main absolute z-0">
            <div className="relative mx-auto h-full w-full max-w-[1180px] overflow-hidden px-4 xl:px-0">
              <div className="stage-marker absolute left-0 top-5 z-10 flex items-center gap-4 md:top-8">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-signal">
                  {activePage.number}
                </span>
                <span className="h-px w-20 bg-paper/32" />
                <span className="font-mono text-xs uppercase tracking-[0.28em] text-steel">
                  欢迎
                </span>
              </div>

              <motion.section
                key={page}
                variants={pageVariants}
                initial="enter"
                animate="center"
                transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 pt-20 md:pt-24"
              >
                {page === "home" && <HomePanel />}
                {page === "about" && <AboutPanel />}
                {page === "members" && (
                  <MembersPanel
                    track={track}
                    setTrack={setTrack}
                    visibleMembers={visibleMembers}
                  />
                )}
                {page === "honors" && <HonorsPanel />}
              </motion.section>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function HomePanel() {
  return (
    <div className="grid h-full items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="max-w-2xl">
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.32em] text-signal">
          {site.eyebrow}
        </p>
        <h1 className="mt-6 text-6xl font-black leading-[0.9] tracking-normal text-paper sm:text-7xl xl:text-8xl">
          {site.name}
        </h1>
        <TypewriterText lines={site.typewriterLines} />
        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={site.join}
            className="inline-flex h-12 items-center border border-paper bg-paper px-5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-ink transition hover:border-signal hover:bg-signal"
          >
            联系我们
          </a>
          <a
            href={site.github}
            className="inline-flex h-12 items-center border border-paper/18 px-5 font-mono text-xs font-bold uppercase tracking-[0.18em] text-paper transition hover:border-paper/48 hover:bg-paper/8"
          >
            代码仓库
          </a>
        </div>
        <div className="mt-10 grid max-w-2xl grid-cols-2 border-y border-paper/12 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="border-paper/12 py-5 pr-4 sm:border-r sm:last:border-r-0"
            >
              <div className="font-mono text-2xl font-bold text-paper">
                {stat.value}
              </div>
              <div className="mt-2 text-xs uppercase tracking-[0.18em] text-steel">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative hidden min-h-[360px] overflow-hidden border border-paper/12 bg-paper/[0.035] p-4 lg:block xl:min-h-[520px]">
        <img
          src="/xlclub-wordmark.svg"
          alt={`${site.name} 几何字标`}
          className="absolute inset-x-6 top-6 h-auto w-[calc(100%-48px)] border border-paper/10 object-cover opacity-90"
        />
        <div className="absolute bottom-4 left-4 right-4 grid gap-2 sm:grid-cols-2">
          {focusAreas.map((area, index) => (
            <div
              key={area}
              className="flex items-center justify-between border border-paper/12 bg-ink/88 px-3 py-3 backdrop-blur"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-steel">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-sm text-paper">{area}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AboutPanel() {
  return (
    <div className="about-panel h-full min-w-0">
      <div className="about-scroll about-article h-full min-h-0 min-w-0 overflow-y-auto pr-4">
        <div className="about-article-head">
          <h3>{aboutContent.title}</h3>
        </div>
        <div className="space-y-8 py-6">
          {aboutContent.sections.map((section) => (
            <section key={section.title} className="about-article-section">
              <h4>{section.title}</h4>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              {section.items && (
                <ul>
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}

function MembersPanel({
  track,
  setTrack,
  visibleMembers,
}: {
  track: ActiveTrack;
  setTrack: (track: ActiveTrack) => void;
  visibleMembers: typeof members;
}) {
  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h2 className="text-4xl font-black leading-none text-paper sm:text-5xl">
            成员展示
          </h2>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {tracks.map((item) => {
            const selected = track === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setTrack(item)}
                className={classNames(
                  "h-10 shrink-0 border px-4 font-mono text-xs uppercase tracking-[0.18em] transition",
                  selected
                    ? "border-signal bg-signal text-ink"
                    : "border-paper/14 text-fog hover:border-paper/44 hover:bg-paper/7",
                )}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <motion.div
        layout
        className="stage-scroll -mt-3 grid min-h-0 flex-1 auto-rows-[7rem] content-start gap-3 overflow-y-auto pt-3 pr-1 pb-6 md:grid-cols-2"
      >
        <AnimatePresence mode="popLayout">
          {visibleMembers.map((member) => (
            <motion.article
              layout
              key={member.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="member-card-shell h-28 overflow-visible"
            >
              <div className="member-card grid h-full overflow-hidden grid-cols-[48px_minmax(0,1fr)] gap-3 border border-paper/12 bg-paper/[0.035] p-3 hover:border-signal/54 hover:bg-paper/[0.055]">
                <MemberAvatar member={member} />
                <div className="min-w-0 overflow-hidden">
                  <div className="flex min-w-0 items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="truncate text-lg font-semibold leading-5 text-paper">
                        {member.name}
                      </h3>
                      <p className="mt-1 truncate font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
                        {member.grade} / {member.track}
                      </p>
                    </div>
                    <span className="max-w-24 shrink-0 truncate border border-cobalt/50 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-cobalt">
                      {member.role}
                    </span>
                  </div>
                  <p className="member-intro mt-2 text-sm leading-5 text-fog/84">
                    {member.intro}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function MemberAvatar({ member }: { member: Member }) {
  const [imageFailed, setImageFailed] = useState(false);
  const imageSrc = getAvatarImageSrc(member.avatar);
  const fallbackText = getAvatarText(member);
  const primaryLink = member.links.find((link) => isRealLink(link.href));
  const primaryHref = primaryLink?.href.trim();
  const content =
    imageSrc && !imageFailed ? (
      <img
        src={imageSrc}
        alt={`${member.name}头像`}
        className="size-full object-cover"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setImageFailed(true)}
      />
    ) : (
      <span className="px-1 text-center leading-none">{fallbackText}</span>
    );
  const avatarClassName =
    "member-avatar grid size-12 overflow-hidden place-items-center border border-paper/16 bg-ink font-mono text-base font-black text-paper";

  if (!primaryLink || !primaryHref) {
    return <div className={avatarClassName}>{content}</div>;
  }

  return (
    <a
      href={primaryHref}
      className={classNames(
        avatarClassName,
        "transition hover:border-signal hover:text-signal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal",
      )}
      aria-label={`打开${member.name}的${primaryLink.label}`}
      title={primaryLink.label}
      target={primaryHref.startsWith("http") ? "_blank" : undefined}
      rel={primaryHref.startsWith("http") ? "noreferrer" : undefined}
    >
      {content}
    </a>
  );
}

function HonorsPanel() {
  const [category, setCategory] = useState<HonorFilter>("全部");
  const visibleHonors = useMemo(() => {
    if (category === "全部") return honors;
    if (category === "其他") {
      return honors.filter((honor) => !isPrimaryHonorCategory(honor.category));
    }

    return honors.filter((honor) => honor.category === category);
  }, [category]);

  return (
    <div className="honors-panel flex h-full flex-col gap-5">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h2 className="text-4xl font-black leading-none text-paper sm:text-5xl">
            成果展示
          </h2>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {honorCategories.map((item) => {
            const selected = category === item;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={classNames(
                  "h-10 shrink-0 border px-4 font-mono text-xs uppercase tracking-[0.18em] transition",
                  selected
                    ? "border-signal bg-signal text-ink"
                    : "border-paper/14 text-fog hover:border-paper/44 hover:bg-paper/7",
                )}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      <div className="honors-table stage-scroll min-h-0 flex-1 overflow-y-auto border border-paper/12">
        <div className="grid grid-cols-[80px_minmax(0,1fr)_140px] border-b border-paper/12 bg-paper/[0.055] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
          <span>年份</span>
          <span>记录</span>
          <span className="text-right">结果</span>
        </div>
        {visibleHonors.map((honor) => (
          <article
            key={`${honor.year}-${honor.title}`}
            className="grid grid-cols-[80px_minmax(0,1fr)_140px] gap-4 border-b border-paper/10 px-4 py-5 transition last:border-b-0 hover:bg-paper/[0.045]"
          >
            <div className="font-mono text-sm font-semibold text-signal">
              {honor.year}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-paper">
                {honor.title}
              </h3>
              <p className="mt-2 truncate font-mono text-[11px] uppercase tracking-[0.18em] text-steel">
                {honor.tag}
              </p>
            </div>
            <div className="text-right text-sm leading-6 text-fog/82">
              {honor.result}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
