
export type globalStateType = {
    cy: cytoscape.Core;
    seriesSelected?: cytoscape.CollectionReturnValue,
    seriesList?: { seriesPrime: cytoscape.CollectionReturnValue, series: cytoscape.CollectionReturnValue }[],
    cyViz?:cytoscape.Core;

};

export type checkBoxStateType={
    id: string;
    state: [boolean, React.Dispatch<React.SetStateAction<boolean>>],
    series: cytoscape.CollectionReturnValue
  }