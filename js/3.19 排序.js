/**
 * 1 冒泡排序
 * 将当前元素和下⼀个索引元素进⾏⽐较。如果当前元素⼤，那么就交换位置，重复操作直到⽐较到最后⼀个元素，那么此时最后⼀个元素就是该数组中最⼤的数。
 */

function swap(arr, left, right) {
    const rightVal = arr[right]
    arr[right] = arr[left]
    arr[left] = rightVal
}
const bubbleSort = (arr) => {
    const length = arr.length
    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            const itemLeft = arr[j];
            const itemRight = arr[j + 1];
            //后面的值小于前面的 就换位
            if (itemRight < itemLeft) {
                swap(arr, j, j + 1)
            }
        }

    }
    console.log(arr);

}
bubbleSort([3, 2, 1, 7, 9, 10, 5])



/**
 * 2 插入排序
 * 第⼀个元素默认是已排序元素，取出下⼀个元素和当前元素⽐较，如果当前元素⼤就交换位置。那么此时第⼀个元素就是当前的最⼩数，所以下次取出操作从第三个元素开始，向前对⽐，重复之前的操作。
 */
function insert(array) {
    for (let i = 1; i < array.length; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (array[j] > array[j + 1]) {
                swap(array, j, j + 1);
            }
        }
    }
    return array;

}
insert([3, 2, 1, 7, 9, 10, 5])

/**
 * 3 选择排序
 * 遍历数组，设置最⼩值的索引为 0，如果取出
的值⽐当前最⼩值⼩，就替换最⼩值索引，遍历完成后，将第⼀个元
素和最⼩值索引上的值交换。如上操作后，第⼀个元素就是数组中的
最⼩值，下次遍历就可以从索引 1 开始重复上述操作。
 */
function selection(array) {
    for (let i = 0; i < array.length-1; i++) {
        let minIndex = i
        for (let j = i+1; j < array.length; j++) {
            minIndex = array[j]<array[minIndex]?j:minIndex
        }
        swap(array,i,minIndex)
    }
}
/**
 * 4 快速排序
 */
function quickSort(array){
    if(!array||array.length<=1){
        return array
    }
    const midIndex = Math.floor(array.length/2)
    const midVal = array.splice(midIndex,1)[0]
    const left  =[]
    const right  =[]
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if(element<=midVal){
            left.push(element)
        }else{
            right.push(element)
        }
    }
    return quickSort(left).concat([midVal],quickSort(right))
}
