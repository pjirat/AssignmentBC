//#region 1
function mysolution(textInput) {
  const tempText = textInput;
  let charDup = "_";

  if (validateInputTypeString(textInput)) {
    for (let index = 0; index < textInput.length; index++) {
      charDup = textInput[0];
      // console.log("charDup", charDup);
      const charArr = Array.from(textInput).filter((chr) => chr == charDup);
      if (charArr.length == 1) {
        //   console.log("break", charArr);
        break;
      } else {
        textInput = textInput.replaceAll(charDup, "");
        //   console.log("length", textInput.length);
        if (textInput.length > 0) {
          charDup = textInput[0];
        } else {
          charDup = "_";
        }
      }
    }
    return `Input - ${tempText}, Return – ${charDup}`;
  }
  return `Input - ${tempText || ""}, Return – ${charDup}`;
}
console.log("1.1", mysolution("abacabadabacaba"));
console.log("1.2", mysolution("programming"));
//#endregion

//#region 2
function compresRunLengthEncoding(textInput) {
  if (validateInputTypeString(textInput)) {
    let runLengthText = "";
    let count = 1;
    for (let index = 0; index < textInput.length; index++) {
      const charBefore = textInput[index];
      const charAfter = textInput[index + 1] || "";
      // console.log("charAfter", charAfter);˚
      if (charBefore != charAfter) {
        runLengthText += count + charBefore;
        count = 1;
      } else {
        count++;
      }
    }

    return textInput + " => " + runLengthText;
  }

  return "-";
}
console.log("2.1.1", compresRunLengthEncoding("HELLOOO"));
console.log("2.1.2", compresRunLengthEncoding("BWAAALAAA"));
console.log("2.1.3", compresRunLengthEncoding("ISEEABEEONMYKNEE"));

function deCompresRunLengthEncoding(textInput) {
  if (validateInputTypeString(textInput)) {
    let runLengthText = "";
    let stackCharCount = "";
    for (let index = 0; index < textInput.length; index++) {
      stackCharCount = textInput[index];
      //   console.log("stackCharCount1", stackCharCount);
      while (
        index < textInput.length - 1 &&
        parseInt(textInput[index + 1]).toString() !== "NaN"
      ) {
        // console.log("textInput", textInput[index+1]);
        // console.log("bool", parseInt(textInput[index+1]) !== 'NaN');
        // console.log("bool", parseInt(textInput[index+1]).toString() !== 'NaN');

        stackCharCount += textInput[index + 1];
        index++;
      }
      //   console.log("stackCharCount2", stackCharCount);
      //   console.log("textInput[index]", textInput[index + 1]);
      //   console.log("====================");
      for (let chrIndex = 1; chrIndex <= parseInt(stackCharCount); chrIndex++) {
        runLengthText += textInput[index + 1] || "";
      }
      index++;
    }

    return textInput + " => " + runLengthText;
  }

  return "-";
}
console.log("2.2.1", deCompresRunLengthEncoding("1H1E2L3O"));
console.log("2.2.2", deCompresRunLengthEncoding("1B1W3A1L3A"));
console.log("2.2.3", deCompresRunLengthEncoding("1I1S2E1A1B2E1O1N1M1Y1K1N2E"));
//#endregion

//#region 3 ทำไม่สำเร็จ
function convertArray(params) {
  let arrayResult = [];
  const countX = params.length;
  let _countY = 0;
  params.map((p) => (_countY += p.length));
  const countY = _countY;
  console.log("countX", countX);
  console.log("countY", countY);

  let countOut = 0;
  while (countOut < countY) {
    let countIn = 0;
    let tempArray = [];

    while (countIn < countX) {
      for (let i = 0; i < params[countIn].length; i++) {
        console.log('countOut',countOut);
        console.log('countIn',countIn);
        console.log('i',i);

        tempArray.push(params[countIn][i]);

        console.log("==============================");
      }
      countIn++;
    }
    arrayResult.push(tempArray);
    countOut++;
  }

  return arrayResult;
}

console.log("3.", convertArray([[1], [2], [3, 4], [5, 6], [7, 8]]));
// console.log("3.", convertArray([[1], [2, 3], [4, 5, 6]]));
//#endregion

//#region fn utility
function validateInputTypeString(params) {
  if (params != undefined && params != "" && typeof params == "string") {
    return true;
  }
  return false;
}
//#endregion
