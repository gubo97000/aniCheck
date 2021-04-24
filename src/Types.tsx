
export type globalStateType = {
    cy: cytoscape.Core;
    seriesSelected?: cytoscape.CollectionReturnValue,
    seriesList?: seriesListElementType[],
    cyViz?: cytoscape.Core;

};

export type checkBoxStateType = {
    id: string;
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    series: cytoscape.CollectionReturnValue
}

export type seriesListElementType =
    { seriesPrime: cytoscape.NodeSingular; series: cytoscape.CollectionReturnValue }
