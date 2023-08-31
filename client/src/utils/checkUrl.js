export const checkUrl = (url) => {
  // Remove trailing slashes
  url = url.replace(/\/+$/, "");

  // Remove empty spaces
  url = url.replace(/\s/g, "");

  return url;
};
