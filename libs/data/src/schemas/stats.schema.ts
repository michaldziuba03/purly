import {Type} from "class-transformer";

export class Stats {
  alias: string;
  timestamp: string;
  os: string;
  country: string;
  browser: string;
  referer: string;
}

export class ClickStats {
  timestamp: string;

  @Type(() => Number)
  views: number;
}

export class BrowserStats {
  browser: string;
  views: string;
}

export class OperatingSystemStats {
  os: string;
  views: string;
}

export class CountryStats {
  country: string;
  views: string;
}
