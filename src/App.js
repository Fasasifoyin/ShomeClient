import "./App.css";
import Routespath from "./routes/Routespath";
import { Toaster } from "react-hot-toast";

// const splitToNumber = (array) => {
//   return String(array)
//     .split("")
//     .map((each) => parseInt(each));
// };

// const reduce = (array) => {
//   return array.reduce((p, c) => p + c, 0);
// };

// const stringValid = (string) => {
//   const all = string.split(".");
//   const allNew = all.map((each) => parseInt(each));
//   const firstSet = allNew[0];
//   const secondSet = allNew[1];
//   const thirdSet = allNew[2];

//   const firstSetSplit = splitToNumber(firstSet);
//   const secondSetSplit = splitToNumber(secondSet);
//   const thirdSetSplit = splitToNumber(thirdSet);

//   const summedFirstSet = reduce(firstSetSplit);
//   const summedSecondSet = reduce(secondSetSplit);

//   const firstCheck = firstSetSplit.length === 3;
//   const secondCheck = secondSetSplit.length === 3;
//   const thirdCheck = thirdSetSplit.length === 3;
//   const fourthCheck = summedFirstSet % 2 === 0;
//   const fifthCheck = summedSecondSet % 2 !== 0;

//   const sixthCheck =
//     firstSetSplit[2] > firstSetSplit[1] && firstSetSplit[2] > firstSetSplit[0];
//   const seventhCheck =
//     secondSetSplit[2] > secondSetSplit[1] && secondSetSplit[2] > secondSetSplit[0];
//   const eightCheck =
//     thirdSetSplit[2] > thirdSetSplit[1] && thirdSetSplit[2] > thirdSetSplit[0];

//   if (firstCheck && secondCheck && thirdCheck && fourthCheck && fifthCheck && sixthCheck && sixthCheck && seventhCheck && eightCheck){
//     return true 
//   }else{
//     return false
//   }
// };

// console.log(stringValid("112.346.558"));

// const preventRepeat = (s) => {
//   const all = s.split("")
//   const allNew = [...new Set(all)]
//   return allNew.length
// }

// console.log(preventRepeat("abcdabcd"))

function App() {

  return (
    <>
      <Toaster />
      <Routespath />
    </>
  );
}

export default App;
