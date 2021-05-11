
export type globalStateType = {
    cy: cytoscape.Core;
    userOptions: userOptionType;
    modalOpenState?: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    seriesSelected?: cytoscape.CollectionReturnValue;
    seriesList?: seriesListElementType[];
    seriesDict: { [key: string]: seriesListElementType };
    cyViz?: cytoscape.Core;
    globalStats: statsType[string];

};

export type checkBoxStateType = {
    id: string;
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    series: cytoscape.CollectionReturnValue
}

export type formatsType = "TV" | "TV_SHORT" | "MOVIE" | "SPECIAL" | "OVA" | "ONA" | "MUSIC" | "MANGA" | "NOVEL" | "ONE_SHOT"
export type serieStatusType = "COMPLETE" | "PLAN_TO_COMPLETE" | "NOT_COMPLETE" | "ERR"

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
        per?: number;
        totWeight?: number;
        missWeight?: number;
        gotWeight?: number;
        perWeight?: number;
    }
}

export type seriesListElementType =
    {
        seriesPrime: cytoscape.NodeSingular;
        series: cytoscape.CollectionReturnValue;
        stats: statsType;
        status: serieStatusType;
        serieComplete: cytoscape.CollectionReturnValue;
    }