const BASE_URL = import.meta.env.BASE_URL || "/";

export const resolveAssetPath = (path) => {
  if (!path) return path;

  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }

  if (path.startsWith("/")) {
    return `${BASE_URL}${path.slice(1)}`;
  }

  return path;
};
