const Encode = (phrase, table) => {
  const indexes = [];
  var i = 0;
  while (i < phrase.length) {
    const matches = table.filter((element) => {
      return element.value.startsWith(phrase[i]);
    });
    //console.log(matches);
    const longestMatch = { len: 0, value: "", index: null };
    matches.map((element) => {
      var toMatch = "";
      var step = element.value.length;

      toMatch = phrase.substring(i, i + step);
      //console.log("Substring: " + phrase[i + step]);

      //console.log("element.value:" + element.value);
      //console.log("toMatch:" + toMatch);
      if (element.value === toMatch) {
        if (toMatch.length > longestMatch.len) {
          //console.log("Updated");
          longestMatch.len = toMatch.length;
          longestMatch.value = toMatch;
          longestMatch.index = element.index;
          //console.log(longestMatch);
        }
      }
    });
    //console.log("next_char:" + phrase[i + longestMatch.len]);
    if (phrase[i + longestMatch.len]) {
      table.push({
        index: table.length + 1,
        value: longestMatch.value + phrase[i + longestMatch.len],
      });
    }
    indexes.push(longestMatch.index);
    //console.log(table);
    //console.log(indexes);
    i += longestMatch.len;
    //console.log("i:" + i);
  }
  //console.log(table);
  return { indexes, table };
};

const Decode = (enc) => {
  var decoded = "";
  for (var i = 0; i < enc.indexes.length; i++) {
    for (var j = 0; j < enc.table.length; j++) {
      if (enc.indexes[i] === enc.table[j].index) {
        decoded += enc.table[j].value;
        break;
      }
    }
  }
  return decoded;
};

const Main = () => {
  const phrase = "BLAHBLAHBLA";
  const init_table = [
    { index: 1, value: "B" },
    { index: 2, value: "L" },
    { index: 3, value: "A" },
    { index: 4, value: "H" },
  ];

  const encoded = Encode(phrase, init_table);
  console.log(`Phrase ${phrase} is encoded as: ${encoded.indexes}`);
  console.log(encoded.table);

  const decoded = Decode(encoded);
  console.log(`Decoded: ${decoded}`);
};

Main();
