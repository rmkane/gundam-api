export interface Series {
  name: string;
  yearStart: number;
  yearEnd: number;
  episodes: number;
  description: string;
}

export interface Pilot {
  name: string;
  codename: string;
  affiliation: string;
  seriesId: number;
}

export interface MobileSuit {
  name: string;
  modelNumber: string;
  manufacturer: string;
  height: number;
  weight: number;
  armorMaterial: string;
  powerPlant: string;
  seriesId: number;
}

export interface ApiResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}
