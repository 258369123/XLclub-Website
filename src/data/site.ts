const siteName = "XLclub";
const siteEmail = "hello@xlclub.dev";

export const site = {
  name: siteName,
  eyebrow: "研究 / 开发 / 竞赛",
  description:
    "一个专注信息安全、工程实践与技术表达的小型团队。我们重视高密度训练、可复用工具和经得起复盘的成果。",
  email: siteEmail,
  github: "https://github.com/258369123/XLclub-Website",
  join: `mailto:${siteEmail}?subject=${encodeURIComponent(`加入 ${siteName}`)}`,
};

export const stats = [
  { label: "研究方向", value: "06" },
  { label: "成员方向", value: "04" },
  { label: "公开笔记", value: "128" },
  { label: "训练周期", value: "24" },
];

export const focusAreas = [
  "web安全",
  "逆向工程",
  "二进制安全",
  "云原生攻防",
  "ai安全",
  "开发",
];
