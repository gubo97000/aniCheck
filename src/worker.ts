import { computeData } from "./Utils";

export const wComputeData = (
  data: any[],
  relationPriority: { [key: string]: number },
  problematicEles: string[]
) => {
  console.log("ComputeData");
  return computeData(data, relationPriority, problematicEles);
};

