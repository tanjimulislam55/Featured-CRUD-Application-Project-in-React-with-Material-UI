function rotateByOne(arr) {
    const x = [];
    for (let i = 0; i < arr.length; i += 1) {
        if (i !== arr.length - 1) x[i + 1] = arr[i];
        else x[0] = arr[i];
    }
    return x;
}

console.log(rotateByOne([4, 20, 15, 26, 8]));
