import { computeData } from "./Utils";

export const wComputeData = (
  data: any[],
  relationPriority: { [key: string]: number },
  problematicEles: string[]
) => {
  return computeData(data, relationPriority, problematicEles);
};

// export const wTest = () => {
//   console.log(self.name);
//   console.log(self);
//   self.postMessage({ "Hello from worker": "Hello from worker" });
//   self.postMessage("Hello from worker");
//   self.postMessage("Hello from worker");
//   setTimeout(() => {
//     self.postMessage("Long Computation");
//     console.log("TLComp");
//   }, 1000);
//   console.log("TComp");
//   return "Test Complete";
// };
