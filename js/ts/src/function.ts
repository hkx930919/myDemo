//ts 函数

//1 定义函数
/**
 * 1 给函数每个参数添加类型
 * 2 给函数的返回值添加类型
 */

 let myAdd:(x:number,y:number)=>string = function(x:number,y:number){
     return `${x}${y}`
 }

// 2 函数推断类型
let myAdd2:(x:number,y:number)=>string  = function(x,y){
    return `${x}${y}`
}


//3 函数参数
/**
 * 1 可选参数,在参数后面使用?
 *      1.1 可选参数必须跟在必须参数后面
 * 2 默认参数
 *      2.1 当一个参数没有传递时,或者值为undefined 那么就会使用默认参数
 * 3 剩余参数
 *      3.1 剩余参数使用扩展运算符...来代表剩余参数
 */
//可选参数
function fullName(firstName:string,lastName?:string):string{
    return lastName? firstName+lastName:firstName
}
// fullName('张三','1',2)
//默认参数
function getName(firstName:string,lastName:string='aaa'):string{
    return firstName+lastName
}
// getName('hu')
//剩余参数
function getName2(firstName:string,...rest:string[]):string{
return `${firstName} ${rest.join(' ')}`

}

//4 this 问题
/**
 * 1 使用箭头函数绑定对象方法的指针
 * 2 假参数 this参数,放在函数列表的最前面
 * 
 */
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) {
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();


//5 函数重载
/**
 * 1 根据传参不同,函数展现不同的处理
 * 
 */
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
// alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
// alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);