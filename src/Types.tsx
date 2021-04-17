
export type globalStateType = {
    cy: cytoscape.Core;
    seriesSelected?: cytoscape.CollectionReturnValue,
    seriesList?: { seriesPrime: (((cytoscape.SingularElementArgument & cytoscape.EdgeSingular) & cytoscape.NodeSingular) & cytoscape.EdgeSingular) & cytoscape.NodeSingular; series: cytoscape.CollectionReturnValue }[],
    cyViz?:cytoscape.Core;

};

export type checkBoxStateType={
    id: string;
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    series: cytoscape.CollectionReturnValue
  }