
export type globalStateType = {
    cy: cytoscape.Core;
    userOptions: userOptionType;
    seriesSelected?: cytoscape.CollectionReturnValue;
    seriesList?: seriesListElementType[];
    seriesDict: { [key: string]: seriesListElementType };
    cyViz?: cytoscape.Core;

};

export type checkBoxStateType = {
    id: string;
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    series: cytoscape.CollectionReturnValue
}

export type userOptionType = {
    sort: sortType;
    completition: ("smart" | "anime" | "TV" | "TV_SHORT" | "MOVIE" | "SPECIAL" | "OVA" | "ONA" | "MUSIC" | "MANGA" | "NOVEL" | "ONE_SHOT")[];
}
export type sortType = {
    type: "complete%" | "alphabetical" | "size";
    inverted: boolean;
}

export type statsType = {
    [key: string]: {
        tot: number;
        miss: number;
        got:number;
        per?: number;
    }
}

export type seriesListElementType =
    {
        seriesPrime: cytoscape.NodeSingular;
        series: cytoscape.CollectionReturnValue;
        stats: statsType;
    }
