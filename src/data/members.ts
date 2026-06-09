export type MemberTrack = "导师" | "竞赛" | "开发" | "运营" | "视觉设计";
export type PrimaryMemberTrack = Exclude<MemberTrack, "视觉设计">;
export type MemberFilter = "全部" | PrimaryMemberTrack | "其他";

export type Member = {
  id: string;
  name: string;
  grade: string;
  track: MemberTrack;
  role: string;
  avatar: string;
  intro: string;
  motto?: string;
  links: {
    label: string;
    href: string;
  }[];
};

export const primaryMemberTracks: PrimaryMemberTrack[] = [
  "导师",
  "竞赛",
  "开发",
  "运营",
];

export const tracks: MemberFilter[] = ["全部", ...primaryMemberTracks, "其他"];

export const members: Member[] = [
  {
    id: "m-01",
    name: "周聪",
    grade: "2020 年入职",
    track: "导师",
    role: "二进制安全",
    avatar: "https://picsum.photos/seed/mentor-shen/200/200",
    intro:
      "十年安全攻防经验，专注二进制漏洞挖掘与高级利用技术。主持团队竞赛训练与研究方向规划，主张由浅入深、复现驱动的学习路径。",
    motto: "漏洞永远在细节里",
    links: [{ label: "主页", href: "#" }],
  },
  {
    id: "m-02",
    name: "顾霜",
    grade: "2020 年入职",
    track: "导师",
    role: "云原生安全",
    avatar: "https://picsum.photos/seed/mentor-gu/200/200",
    intro:
      "前云厂商安全架构师，研究方向覆盖容器逃逸、服务网格安全与云上攻防链路。负责团队基建安全与平台工程方向的技术指导。",
    motto: "基础设施安全决定上层建筑",
    links: [{ label: "主页", href: "#" }],
  },
  {
    id: "x-01",
    name: "星野",
    grade: "2026 级",
    track: "竞赛",
    role: "网站安全",
    avatar:
      "https://tuyiblog.oss-cn-guangzhou.aliyuncs.com/blog/b_f78ab69ec3bae09d408bf9e35ffee5aa.jpg",
    intro: "关注网站漏洞利用、源码审计和题目复盘，负责沉淀可复用的攻击链笔记。",
    links: [{ label: "博客", href: "http://baidu.com" }],
  },
  {
    id: "x-02",
    name: "林澈",
    grade: "2026 级",
    track: "开发",
    role: "前端系统",
    avatar: "https://picsum.photos/seed/frontend-dev/200/200",
    intro:
      "负责界面系统、数据驱动页面和可复用组件，把展示页做成长期可维护的工程。",
    links: [{ label: "代码", href: "#" }],
  },
  {
    id: "x-03",
    name: "砚池",
    grade: "2025 级",
    track: "竞赛",
    role: "逆向工程",
    avatar: "https://picsum.photos/seed/reverse-eng/200/200",
    intro: "做二进制分析、自动化脚本和竞赛题目复盘，偏爱把复杂流程拆成工具链。",
    links: [{ label: "笔记", href: "#" }],
  },
  {
    id: "x-04",
    name: "弥拉",
    grade: "2025 级",
    track: "视觉设计",
    role: "视觉方向",
    avatar: "https://picsum.photos/seed/visual-design/200/200",
    intro:
      "负责团队识别、动效语言、页面节奏和内容呈现，确保技术站点不只是资料堆叠。",
    links: [{ label: "作品", href: "#" }],
  },
  {
    id: "x-05",
    name: "轨道",
    grade: "2024 级",
    track: "开发",
    role: "平台工程",
    avatar: "https://picsum.photos/seed/platform-eng/200/200",
    intro: "维护内部服务、静态发布流水线和部署检查，让内容更新变成低成本动作。",
    links: [{ label: "实验室", href: "#" }],
  },
  {
    id: "x-06",
    name: "诺亚",
    grade: "2024 级",
    track: "运营",
    role: "社群运营",
    avatar: "https://picsum.photos/seed/community-ops/200/200",
    intro: "协调分享会、读书组、成员加入和外部合作，把团队节奏从热情变成制度。",
    links: [{ label: "邮箱", href: "#" }],
  },
  {
    id: "x-07",
    name: "风筝",
    grade: "2023 级",
    track: "竞赛",
    role: "二进制利用",
    avatar: "https://picsum.photos/seed/binary-exploit/200/200",
    intro: "研究堆利用、沙箱逃逸和调试工作流，偏向把底层细节讲到可以复现。",
    links: [{ label: "题解", href: "#" }],
  },
  {
    id: "x-08",
    name: "如恩",
    grade: "2023 级",
    track: "运营",
    role: "知识库",
    avatar: "https://picsum.photos/seed/knowledge-base/200/200",
    intro: "把分散成果整理成文档、课程材料和可检索记录，负责团队知识库质量。",
    links: [{ label: "维基", href: "#" }],
  },
  {
    id: "x-09",
    name: "鹤鸣",
    grade: "2022 级",
    track: "开发",
    role: "后端架构",
    avatar: "https://picsum.photos/seed/backend-arch/200/200",
    intro: "负责团队训练平台后端与内部工具链建设，追求稳定、可维护的服务架构。",
    links: [{ label: "代码", href: "#" }],
  },
];
