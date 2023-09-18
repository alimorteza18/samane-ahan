/**
 * @param targetPath url
 * @returns 'img' | 'pdf | 'mp4
 */
export const getType = (targetPath: string) => {
  // prettier-ignore
  let extension = targetPath.split(/[#?]/)[0].split(".").pop()?.trim().toLocaleLowerCase() ?? "";

  // prettier-ignore
  if (["jpeg", "jpg", "png", "webp"].includes(extension)) 
      return "img";

  if (extension == "mp4") return "mp4";
  if (extension == "pdf") return "pdf";
};
