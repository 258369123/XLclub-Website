import { site } from "./site";

export const primaryHonorCategories = ["比赛", "项目"] as const;

export type PrimaryHonorCategory = (typeof primaryHonorCategories)[number];
export type HonorCategory = PrimaryHonorCategory | (string & {});
export type HonorFilter = "全部" | PrimaryHonorCategory | "其他";

export type Honor = {
  year: string;
  title: string;
  result: string;
  tag: string;
  category: HonorCategory;
};

export const honorCategories: HonorFilter[] = [
  "全部",
  ...primaryHonorCategories,
  "其他",
];

export const honors: Honor[] = [
  {
    year: "2026",
    title: `${site.name} 春季建设周`,
    result: "完成 12 个演示项目",
    tag: "内部训练",
    category: "项目",
  },
  {
    year: "2025",
    title: "区域网络安全挑战赛",
    result: "进入前八",
    tag: "安全竞赛",
    category: "比赛",
  },
  {
    year: "2025",
    title: "开源工具冲刺",
    result: "发布 4 个实用工具",
    tag: "工程建设",
    category: "项目",
  },
  {
    year: "2024",
    title: "校园技术沙龙",
    result: "累计 320 人次参与",
    tag: "社区活动",
    category: "沙龙",
  },
  {
    year: "2024",
    title: "夺旗赛专项训练周期",
    result: "沉淀 18 篇复盘",
    tag: "研究复盘",
    category: "比赛",
  },
];
