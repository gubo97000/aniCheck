
export type globalStateType = {
    cy: cytoscape.Core;
    userOptions: userOptionType;
    seriesSelected?: cytoscape.CollectionReturnValue;
    seriesList?: seriesListElementType[];
    seriesDict?: { [key: string]: seriesListElementType };
    cyViz?: cytoscape.Core;

};

export type checkBoxStateType = {
    id: string;
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    series: cytoscape.CollectionReturnValue
}

export type userOptionType = {
    sort: sortType;
}
export type sortType = {
    type: "complete%"|"alphabetical"|"size";
    inverted: boolean;
}

export type statsType = {
    serieTot: number;
    serieMiss: number;
    seriePer: number;
    mangaTot: number;
    mangaMiss: number;
    mangaPer: number;
    animeTot: number;
    animeMiss: number;
    animePer: number;
}

export type seriesListElementType =
    {
        seriesPrime: cytoscape.NodeSingular;
        series: cytoscape.CollectionReturnValue;
        stats: statsType;
    }
