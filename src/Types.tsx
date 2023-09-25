export type formatsType =
  | "TV"
  | "TV_SHORT"
  | "MOVIE"
  | "SPECIAL"
  | "OVA"
  | "ONA"
  | "MUSIC"
  | "MANGA"
  | "NOVEL"
  | "ONE_SHOT";
export type serieStatusType =
  | "COMPLETE"
  | "PLAN_TO_COMPLETE"
  | "NOT_COMPLETE"
  | "ERR";
export type relationsType =
  | "CHARACTER"
  | "SEQUEL"
  | "SIDE_STORY"
  | "SOURCE"
  | "ALTERNATIVE"
  | "SPIN_OFF"
  | "SUMMARY"
  | "COMPILATION"
  | "CONTAINS"
  | "PREQUEL"
  | "ADAPTATION"
  | "PARENT"
  | "OTHER";
export type statusType =
  | "CURRENT"
  | "PLANNING"
  | "COMPLETED"
  | "DROPPED"
  | "PAUSED"
  | "REPEATING"
  | "NO";
export type releaseStatusType =
  | "FINISHED"
  | "RELEASING"
  | "NOT_YET_RELEASED"
  | "CANCELLED"
  | "HIATUS";
export type formatsBulkTermsType = "anime" | "manga" | "novel";

export type globalStateType = {
  // cy: cytoscape.Core;
  userOptions: userOptionType;
  modalOpenState?: [boolean, (openState: boolean, page?: string) => void];
  // modalInfoOpenState?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  modalInfoOpenState?: boolean;
  seriesSelected?: seriesListElementType;
  seriesDict: { [key: string]: seriesListElementType };
  cyViz?: cytoscape.Core;
  globalStats: statsType[formatsType | "selected"];
  status: ["ok" | "loading" | "error" | "success", string];
  user: userType;
  usersHist: string[];
  seriesToRender?: seriesListElementType[];
  tempInfo: { usingCache: boolean };
};

export type userOptionType = {
  themeMode: "light" | "dark" | "auto";
  vizMode: "graph" | "list";
  listLayout: string;
  sort: sortType;
  smartCompletion: boolean;
  animeComposition: formatsType[];
  mangaComposition: formatsType[];
  novelComposition: formatsType[];
  completion: formatsType[];
  statusFilter: serieStatusType[];
  cyShowHidden: boolean;
  cyShowNav: boolean;
  cyFormatFilter: formatsType[];
  cyLayout: string;
  cyFilter: (formatsType | serieStatusType | statusType)[];
};

export type sortType = {
  type: "complete%" | "weight%" | "alphabetical" | "size" | "missWeight";
  inverted: boolean;
};

export type statsType = {
  [key in formatsType | "selected"]: {
    tot: number;
    miss: number;
    got: number;
    plan: number;
    gotPer?: number;
    planPer?: number;
    totWeight?: number;
    missWeight?: number;
    gotWeight?: number;
    planWeight?: number;
    missPerWeight?: number;
    gotPerWeight?: number;
    planPerWeight?: number;
  };
};

export type seriesListElementType = {
  seriesPrime: NodeType;
  series: { nodes: NodeType[]; edges: EdgeType[] };
  stats: statsType;
  formatsIncluded?: formatsType[];
  status: serieStatusType;
  serieComplete: { nodes: NodeType[]; edges: EdgeType[] };
};

export type NodeType = {
  id: any;
  status: statusType;
  airStatus: releaseStatusType;
  format: formatsType;
  title: string;
  titles: string[];
  siteUrl: any;
  bannerImage: string;
  cover: string;
  popularity: any;
  compWeight: number;
  startDate: string;
};
export type EdgeType = {
  id: any;
  source: any;
  target: any;
  relation: string;
};

export type userType = {
  name?: string;
  avatar?: string;
  color?: string;
  cover?: string;
};
