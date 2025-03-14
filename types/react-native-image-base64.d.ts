declare module "react-native-image-base64" {
    const convert: {
      encode: (filePath: string) => Promise<string>;
    };
    export default convert;
  }