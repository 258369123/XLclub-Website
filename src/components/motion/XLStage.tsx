import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";
import { focusAreas, site, stats } from "../../data/site";
import { honors } from "../../data/honors";
import { members, tracks, type MemberTrack } from "../../data/members";

type PageId = "home" | "about" | "members" | "honors";
type ActiveTrack = "全部" | MemberTrack;

const pages: Array<{ id: PageId; number: string; label: string }> = [
  { id: "home", number: "01", label: "首页" },
  { id: "about", number: "02", label: "关于" },
  { id: "members", number: "03", label: "成员" },
  { id: "honors", number: "04", label: "荣誉" },
];

const pageVariants = {
  enter: { opacity: 0, x: 42 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -42 },
};

function classNames(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function XLStage() {
  const [page, setPage] = useState<PageId>("home");
  const [track, setTrack] = useState<ActiveTrack>("全部");

  const activePage = pages.find((item) => item.id === page) ?? pages[0];
  const activeIndex = pages.findIndex((item) => item.id === page);
  const nextPage = pages[(activeIndex + 1) % pages.length];

  const visibleMembers = useMemo(
    () => members.filter((member) => track === "全部" || member.track === track),
    [track],
  );

  return (
    <div className="fixed inset-0 overflow-hidden bg-ink text-paper">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(245,242,234,0.055)_1px,transparent_1px),linear-gradient(180deg,rgba(245,242,234,0.045)_1px,transparent_1px)] bg-[size:64px_64px]" />
      <div className="pointer-events-none absolute -left-16 bottom-8 h-8 w-[56rem] -rotate-[148deg] bg-coral/12" />
      <div className="pointer-events-none absolute right-[9vw] top-[14vh] h-28 w-2 bg-coral" />

      <header className="absolute left-0 right-0 top-0 z-20 border-b border-paper/12 bg-ink/82 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-[min(1180px,calc(100vw-32px))] items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setPage("home")}
            className="flex items-center gap-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
            aria-label="返回首页"
          >
            <span className="grid size-9 place-items-center border border-paper/20 bg-paper text-ink">
              <span className="font-mono text-sm font-black tracking-normal">XL</span>
            </span>
            <span className="hidden leading-none sm:block">
              <span className="block font-mono text-sm font-semibold tracking-[0.24em] text-paper">{site.name}</span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.32em] text-steel">技术团队</span>
            </span>
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {pages.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setPage(item.id)}
                className={classNames(
                  "px-3 py-2 font-mono text-[11px] uppercase tracking-[0.22em] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal",
                  page === item.id ? "text-signal" : "text-fog/76 hover:text-paper",
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <a
            href={site.join}
            className="inline-flex h-10 items-center gap-2 border border-signal bg-signal px-4 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-ink transition hover:bg-paper focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
          >
            加入
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>

      <aside className="absolute bottom-20 left-0 top-16 z-10 hidden w-[10vw] min-w-24 border-r border-paper/12 lg:block">
        <div className="flex h-full flex-col items-center justify-between py-10">
          <div className="vertical-label font-mono text-xs tracking-[0.32em] text-steel">团队坐标</div>
          <div className="flex flex-col items-center gap-4">
            <span className="h-20 w-px bg-paper/20" />
            <span className="font-mono text-2xl font-black text-paper">{activePage.number}</span>
            <span className="h-20 w-px bg-paper/20" />
          </div>
          <div className="vertical-label font-mono text-xs tracking-[0.32em] text-steel">技术展示</div>
        </div>
      </aside>

      <nav className="absolute bottom-20 right-0 top-16 z-10 hidden w-[10vw] min-w-24 border-l border-paper/12 lg:block">
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
        <div className="mx-auto flex h-20 w-[min(1180px,calc(100vw-32px))] items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
          <span>联系 / 公开邮箱</span>
          <span>{activePage.number} / {activePage.label}</span>
        </div>
      </footer>

      <main className="absolute inset-x-0 bottom-20 top-16 z-0 lg:left-[10vw] lg:right-[10vw]">
        <div className="relative mx-auto h-full w-full max-w-[1180px] overflow-hidden px-4 xl:px-0">
          <div className="absolute left-0 top-5 z-10 flex items-center gap-4 md:top-8">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-signal">
              {activePage.number}
            </span>
            <span className="h-px w-20 bg-paper/32" />
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-steel">欢迎</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.section
              key={page}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 pt-20 md:pt-24"
            >
              {page === "home" && <HomePanel />}
              {page === "about" && <AboutPanel />}
              {page === "members" && (
                <MembersPanel track={track} setTrack={setTrack} visibleMembers={visibleMembers} />
              )}
              {page === "honors" && <HonorsPanel />}
            </motion.section>
          </AnimatePresence>

        </div>
      </main>

      <div className="absolute bottom-20 left-0 right-0 z-30 grid grid-cols-4 border-y border-paper/12 bg-ink/92 md:hidden">
        {pages.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setPage(item.id)}
            className={classNames(
              "h-12 border-r border-paper/12 font-mono text-xs tracking-[0.18em] last:border-r-0",
              page === item.id ? "bg-paper text-ink" : "text-fog",
            )}
          >
            {item.label}
          </button>
        ))}
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
          {site.title}
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-fog/86">{site.description}</p>
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
            <div key={stat.label} className="border-paper/12 py-5 pr-4 sm:border-r sm:last:border-r-0">
              <div className="font-mono text-2xl font-bold text-paper">{stat.value}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.18em] text-steel">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative hidden min-h-[360px] overflow-hidden border border-paper/12 bg-paper/[0.035] p-4 lg:block xl:min-h-[520px]">
        <img
          src="/xlclub-wordmark.svg"
          alt="XLclub 几何字标"
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
    <div className="grid h-full items-center gap-8 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <h2 className="text-4xl font-black leading-tight text-paper sm:text-5xl">
          一个小而锋利的技术团队。
        </h2>
        <p className="mt-6 max-w-xl text-base leading-8 text-fog/84">
          XLclub 的组织方式很简单：围绕真实问题训练，围绕可复用成果建设，围绕复盘材料传承。我们不追求松散热闹，而追求每一次分享、每一个项目、每一场竞赛都有可追踪的增量。
        </p>
      </div>
      <div className="about-scroll grid max-h-[62vh] gap-3 overflow-y-auto pr-3 sm:grid-cols-2">
        {focusAreas.map((area, index) => (
          <article key={area} className="border border-paper/12 bg-paper/[0.035] p-3">
            <span className="font-mono text-xs font-semibold text-signal">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-lg font-semibold text-paper">{area}</h3>
            <p className="mt-2 line-clamp-2 text-sm leading-5 text-fog/74">
              通过内部分享、专项训练、工具开发和公开笔记持续推进，避免知识只停留在个人经验里。
            </p>
          </article>
        ))}
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
          <h2 className="text-4xl font-black leading-none text-paper sm:text-5xl">成员展示</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-fog/78">
            数据来自类型化本地文件，后续只需要维护成员列表，不需要改页面结构。
          </p>
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

      <motion.div layout className="stage-scroll grid min-h-0 flex-1 gap-3 overflow-y-auto pr-1 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visibleMembers.map((member) => (
            <motion.article
              layout
              key={member.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="grid min-h-0 grid-cols-[56px_1fr] gap-4 border border-paper/12 bg-paper/[0.035] p-4 transition hover:border-signal/54 hover:bg-paper/[0.055]"
            >
              <div className="grid size-14 place-items-center border border-paper/16 bg-ink font-mono text-base font-black text-paper">
                {member.avatar}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold leading-6 text-paper">{member.name}</h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
                      {member.grade} / {member.track}
                    </p>
                  </div>
                  <span className="border border-cobalt/50 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-cobalt">
                    {member.role}
                  </span>
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-fog/84 lg:line-clamp-3">
                  {member.intro}
                </p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

function HonorsPanel() {
  return (
    <div className="grid h-full items-center gap-8 lg:grid-cols-[0.72fr_1.28fr]">
      <div>
        <h2 className="text-4xl font-black leading-tight text-paper sm:text-5xl">
          把成果记录下来，而不是散落在聊天记录里。
        </h2>
        <p className="mt-6 max-w-xl text-base leading-8 text-fog/78">
          荣誉、活动、项目和复盘都可以继续放在本地文件里。页面保持静态，内容保持可维护。
        </p>
      </div>
      <div className="stage-scroll max-h-[62vh] overflow-y-auto border border-paper/12">
        <div className="grid grid-cols-[80px_1fr_120px] border-b border-paper/12 bg-paper/[0.055] px-4 py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
          <span>年份</span>
          <span>记录</span>
          <span className="text-right">结果</span>
        </div>
        {honors.map((honor) => (
          <article
            key={`${honor.year}-${honor.title}`}
            className="grid grid-cols-[80px_1fr_120px] gap-4 border-b border-paper/10 px-4 py-5 last:border-b-0"
          >
            <div className="font-mono text-sm font-semibold text-signal">{honor.year}</div>
            <div>
              <h3 className="text-base font-semibold text-paper">{honor.title}</h3>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-steel">{honor.tag}</p>
            </div>
            <div className="text-right text-sm text-fog/82">{honor.result}</div>
          </article>
        ))}
      </div>
    </div>
  );
}
