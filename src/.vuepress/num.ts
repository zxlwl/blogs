import { NavbarLinkOptions } from "vuepress-theme-hope";
// const tech = 1
// const daily = 1
// const techs: NavbarLinkOptions[] = new Array()
// for (let i = 1; i <= tech; i++) {
//     techs.push(i.toString())
// }
// const dailys: NavbarLinkOptions[] = new Array()
// for (let i = 1; i <= daily; i++) {
//     dailys.push(i.toString())
// }
// export { techs, dailys }


// 注意：该代码仅能在 Node.js 环境执行（如 VuePress 配置文件、Node 脚本），不可在浏览器/客户端代码中使用
import fs from 'fs/promises'; // ESM 规范导入 fs 模块（Promise 版本，支持 async/await）
import path from 'path';       // ESM 规范导入 path 模块（处理路径）

/**
 * 读取指定文件夹内的文件名列表（仅文件，不含子文件夹）
 * @param {string} folderPath - 目标文件夹路径（相对路径/绝对路径均可）
 * @returns {Promise<string[]>} 文件名列表（如 ['a.txt', 'b.md']）
 */
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

        // 4. 输出结果（可选，根据需求保留）
        console.log(`✅ 成功读取文件夹：${absoluteFolderPath}`);
        console.log(`📄 该文件夹下共有 ${fileNames.length} 个文件`);
        if (fileNames.length > 0) {
            console.log('文件名列表：', fileNames);
        }

        return fileNames; // 返回文件名列表，供后续使用

    } catch (error) {
        // 错误处理（如路径不存在、权限不足等）
        console.error('❌ 读取文件夹失败：', error.message);
        throw error; // 抛出错误，供调用者进一步处理
    }
}


// ------------------- 示例：调用函数读取目标文件夹 -------------------
// 注意：在 VuePress 中，若在 config.js 中使用，需确保在 Node.js 生命周期内调用（如配置生成阶段）
async function runExample() {
    // 目标文件夹路径（根据你的需求修改，示例为「当前目录下的 docs 文件夹」）
    const targetFolder = path.resolve(__dirname, '../posts/daily');

    try {
        const fileNames = await getFolderFileNames(targetFolder);
        // 这里可以添加你对文件名列表的后续操作（如生成导航、注入配置等）
        // 例如：VuePress 导航配置可基于 fileNames 动态生成
        // console.log('后续操作：', fileNames);
    } catch (err) {
        console.error('❌ 示例执行失败：', err.message);
    }
}

// 执行示例（若在 VuePress 配置中，需确保仅执行一次）
const dailys = await runExample();
const techs = null
console.log('✅ 示例执行成功：', dailys);
export default { techs, dailys };