
export type globalStateType = {
    cy: cytoscape.Core;
    userOptions: userOptionType;
    modalOpenState?: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    seriesSelected?: seriesListElementType;
    seriesDict: { [key: string]: seriesListElementType };
    cyViz?: cytoscape.Core;
    globalStats: statsType[string];
    status: ["ok" | "loading" | "error", string];
    user: userType;

};

export type checkBoxStateType = {
    id: string;
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    series: seriesListElementType["series"]
}

export type formatsType = "TV" | "TV_SHORT" | "MOVIE" | "SPECIAL" | "OVA" | "ONA" | "MUSIC" | "MANGA" | "NOVEL" | "ONE_SHOT"
export type serieStatusType = "COMPLETE" | "PLAN_TO_COMPLETE" | "NOT_COMPLETE" | "ERR"
export type relationsType = 'CHARACTER' | 'SEQUEL' | 'SIDE_STORY' | 'SOURCE' | 'ALTERNATIVE' | 'SPIN_OFF' | 'SUMMARY' | 'COMPILATION' | 'CONTAINS' | 'PREQUEL' | 'ADAPTATION' | 'PARENT' | 'OTHER'
export type statusType = "CURRENT" | "PLANNING" | "COMPLETED" | "DROPPED" | "PAUSED" | "REPEATING" | "NO"


export type userOptionType = {
    sort: sortType;
    smartCompletition: boolean;
    animeComposition: formatsType[];
    mangaComposition: formatsType[];
    completition: formatsType[];
    statusFilter: serieStatusType[];
}

export type sortType = {
    type: "complete%" | "weight%" | "alphabetical" | "size" | "missWeight";
    inverted: boolean;
}

export type statsType = {
    [key: string]: {
        tot: number;
        miss: number;
        got: number;
        plan: number;
        per?: number;
        totWeight?: number;
        missWeight?: number;
        gotWeight?: number;
        planWeight?: number;
        perWeight?: number;
    }
}

export type seriesListElementType =
    {
        seriesPrime: NodeType;
        series: { nodes: NodeType[], edges: EdgeType[] };
        stats: statsType;
        status: serieStatusType;
        serieComplete: { nodes: NodeType[], edges: EdgeType[] };
    }

export type NodeType = {
    id: any;
    status: string;
    airStatus: any;
    format: any;
    title: string;
    titles: string[];
    siteUrl: any;
    bannerImage: string;
    popularity: any;
    compWeight: number;
    startDate: string;
}
export type EdgeType = {
    id: any;
    source: any;
    target: any;
    relation: string;
}
export type userType = {
    avatar?: string;
    color?: string;
}