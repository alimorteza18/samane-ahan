import http from "./http-service";

export const upload = (data: any) => http.post("upload", data);

export const uploadVendorGallery = ({ id, ...data }: any) => {
  return http.post(`vendor/${id}/gallery/upload`, data.formData);
};

export const uploadOwnVendorGallery = (data: any) => {
  return http.post(`own/vendor/gallery`, data);
};

export const deleteOwnVendorGallery = ({ id }: any) => {
  return http.delete(`own/vendor/gallery/${id}`);
};

export const setOwnVendorGalleryIntro = ({ id }: any) => {
  return http.put(`own/vendor/gallery/${id}/intro`);
};
