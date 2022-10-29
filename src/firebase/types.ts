export const EMPTY_BANNER: BannerType = { id: "", text: "", url: "" };

export interface BannerType {
  id?: string;
  text: string;
  url: string;
}

export enum RoutesType {
  HOME = "/",
  AUTHENTICATE = "authenticate",
  DASHBOARD = "dashboard",
}
