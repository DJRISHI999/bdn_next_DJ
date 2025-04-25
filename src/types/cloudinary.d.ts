declare module "cloudinary" {
  const cloudinary: {
    v2: {
      uploader: {
        upload: (file: string, options?: Record<string, unknown>) => Promise<unknown>;
      };
    };
  };
  export = cloudinary;
}