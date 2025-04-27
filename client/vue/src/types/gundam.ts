export interface Series {
  id: number;
  name: string;
  yearStart: number;
  yearEnd: number;
  episodes: number;
  description: string;
}

export interface Pilot {
  id: number;
  name: string;
  codename: string;
  affiliation: string;
  seriesId: number;
}

export interface MobileSuit {
  id: number;
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
