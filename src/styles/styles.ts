const styles = {
  colors: {
    brand: {
      normal: "#2973B0",
      hover: "#4789BF",
      click: "#0A5B9F",
      dark: "#084679",
    },
    functional: {
      link: "#1890ff",
      success: "#52c41a",
      warning: "#faad14",
      error: "#ff4d4f",
    },
    neutral: {
      title: "#262626",
      primaryText: "#262626",
      secondaryText: "#6F6F6F",
      disable: "#bfbfbf",
      border: "#d9d9d9",
      backgroundBody: "#f0f2f5",
      light: "#ffffff",
      lightHover: "#f2f2f2",
      lightClick: "#e5e5e5",
    },
  },
  breakpoints: {
    small: "33.75rem",
    medium: "50rem",
    large: "60rem",
  },
};

export type Breakpoints = keyof typeof styles.breakpoints;

export default styles;
