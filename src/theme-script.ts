/**
 * 首屏渲染前把配色类名挂到 `<html>` 上，避免暗色用户看到亮色闪烁。
 * 内联执行，所以写成字符串；`vueuse-color-scheme` 与 ColorModeButton 共用 localStorage 键。
 */
export const themeScript = `
try {
    const preference = localStorage.getItem('vueuse-color-scheme')
    const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches
    if (preference === 'dark' || ((!preference || preference === 'auto') && prefersDark)) {
        document.documentElement.classList.add('dark')
    }
} catch {}
`
