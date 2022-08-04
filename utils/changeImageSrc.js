// Function to change titles in images cards src
export const changeImageSrc = (title) => {
  if (title === "Earth’s Untouched") {
    const earthsuntouched = "earths-untouched";
    return earthsuntouched;
  }
  const src = title
    .replace(/([^\w]+|\s+)/g, "-")
    .replace("II", "2")
    .toLowerCase();
  return src;
};
