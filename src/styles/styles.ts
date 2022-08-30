const styles = {
  colors: {
    brand: {
      normal: "#1890ff",
      hover: "#40a9ff",
      click: "#096dd9",
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
      secondaryText: "#8c8c8c",
      disable: "#bfbfbf",
      border: "#d9d9d9",
      backgroundBody: "#ff0f2f5",
      light: "#fff",
    },
  },
  breakpoints: {
    small: "33.75rem",
    medium: "45rem",
    large: "60rem",
  },
};

export type Breakpoints = keyof typeof styles.breakpoints;

export default styles;
