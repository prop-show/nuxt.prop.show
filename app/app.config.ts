import type { NavigationMenuItem } from "@nuxt/ui";

export default defineAppConfig({
  ui: {
    colors: {
      primary: 'yellow',
      secondary: 'sky',
      neutral: 'zinc'
    }
  },

  navigationLinks: [
    { label: "首页", icon: "i-tabler-armchair-2", to: "/" },
    { label: "视频", icon: "i-tabler-device-tv", to: "/videos" },
    { label: "速报", icon: "i-tabler-news", to: "/news" },
    { label: "关于我们", icon: "i-tabler-brand-asana", to: "/about" },
  ] as NavigationMenuItem[]
})
