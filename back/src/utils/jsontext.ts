const jsonToText=(json:string)=> {
    let res = "";

    if (Object.prototype.toString.call(json) === "[object String]" && json.length > 0) {
        for (let i = 0, j = 0, k = 0, ii, ele; i < json.length; i++) {//k:缩进，j:""个数
            let ele = json.charAt(i);
            if (j % 2 == 0 && ele == "}") {
                k--;
                for (ii = 0; ii < k; ii++) ele = "    " + ele;
                ele = "\n" + ele;
            } else if (j % 2 == 0 && ele == "{") {
                ele += "\n";
                k++;
                for (ii = 0; ii < k; ii++) ele += "    ";
            } else if (j % 2 == 0 && ele == ",") {
                ele += "\n";
                for (ii = 0; ii < k; ii++) ele += "    ";
            } else if (ele == "\"") j++;
            res += ele;
        }
    }
    return res;
}
export default jsonToText
