export interface IResult {
  id: string;
  title: string;
  miniDesc: string | null;
  desc: string;
  pdf: string | null;
  cover: string | null;
  images: string[] | null;
}
