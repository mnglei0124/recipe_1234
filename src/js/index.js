const arr = [1, 2, 3];

let func = (a) => {
  console.log(`num : ${a}`);
};

const arr2 = [...arr, 4, 5];

func(arr2[4]);
