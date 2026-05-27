const siteName = "湘岚实验室";
const siteEmail = "xianglan010@foxmail.com";

export type SiteLogo =
  | {
      mode: "image";
      src: string;
      alt?: string;
    }
  | {
      mode: "text";
      text: string;
    }
  | {
      mode: "default";
    };

export const site = {
  name: siteName,
  logo: {
    mode: "image",
    src: "/logo.jpg",
    alt: `${siteName} 标志`,
  } as SiteLogo,
  eyebrow: "研究 / 开发 / 竞赛",
  typewriterLines: [
    "一个专注信息安全、工程实践与技术表达的小型团队。我们重视高密度训练、可复用工具和经得起复盘的成果。",
    "我们要的是长期积累，而不是短期炫耀。",
  ],
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
