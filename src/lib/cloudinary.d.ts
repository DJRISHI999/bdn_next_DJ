declare module "cloudinary" {
  const cloudinary: {
    v2: {
      config: (options: {
        cloud_name: string;
        api_key: string;
        api_secret: string;
      }) => void;
      uploader: {
        upload: (file: string, options?: Record<string, unknown>) => Promise<unknown>;
      };
    };
  };
  export = cloudinary;
}