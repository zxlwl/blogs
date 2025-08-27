import { navbar } from "vuepress-theme-hope";
// import { techs, dailys } from "./num.js";

import fs from "fs/promises";
import path from "path";
async function getFolderFileNames(folderPath) {
  try {
    // 1. 将输入路径转为绝对路径（避免相对路径混乱）
    const absoluteFolderPath = path.resolve(folderPath);

    // 2. 读取文件夹内容，并获取文件类型（withFileTypes: true 关键，避免二次判断）
    const fileEntries = await fs.readdir(absoluteFolderPath, { withFileTypes: true });

    // 3. 过滤出「仅文件」的名称（排除子文件夹）
    const fileNames = fileEntries
      .filter(entry => entry.isFile()) // 只保留文件（跳过文件夹）
      .map(entry => entry.name);       // 提取文件名

    return fileNames; // 返回文件名列表，供后续使用

  } catch (error) {
    // 错误处理（如路径不存在、权限不足等）
    console.error('❌ 读取文件夹失败：', error.message);
    throw error; // 抛出错误，供调用者进一步处理
  }
}
async function runExample(paths) {
  // 目标文件夹路径（根据你的需求修改，示例为「当前目录下的 docs 文件夹」）
  const targetFolder = path.resolve(__dirname, paths);
  try {
    const fileNames = await getFolderFileNames(targetFolder);
    // 这里可以添加你对文件名列表的后续操作（如生成导航、注入配置等）
    // 例如：VuePress 导航配置可基于 fileNames 动态生成
    // console.log('后续操作：', fileNames);
    return fileNames;
  } catch (err) {
    console.error('❌ 示例执行失败：', err.message);
  }
}

// 执行示例（若在 VuePress 配置中，需确保仅执行一次）
const dailys: string[] = await runExample("../posts/daily");
const techs: string[] = await runExample("../posts/tech");
export default navbar([
  "/",
  {
    text: "博文",
    icon: "pen-to-square",
    prefix: "/posts/",
    children: [
      {
        text: "日常",
        icon: "pen-to-square",
        prefix: "daily/",
        children: dailys
      },
      {
        text: "技术",
        icon: "pen-to-square",
        prefix: "tech/",
        children: techs
      },
    ],
  },
  {
    text: "朋友",
    icon: "",
    link: "/links/",
  },
]);
