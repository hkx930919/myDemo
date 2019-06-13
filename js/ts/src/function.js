//ts 函数
//1 定义函数
/**
 * 1 给函数每个参数添加类型
 * 2 给函数的返回值添加类型
 */
var myAdd = function (x, y) {
    return "" + x + y;
};
// 2 函数推断类型
var myAdd2 = function (x, y) {
    return "" + x + y;
};
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
function fullName(firstName, lastName) {
    return lastName ? firstName + lastName : firstName;
}
// fullName('张三','1',2)
//默认参数
function getName(firstName, lastName) {
    if (lastName === void 0) { lastName = 'aaa'; }
    return firstName + lastName;
}
// getName('hu')
//剩余参数
function getName2(firstName) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    return firstName + " " + rest.join(' ');
}
var deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function () {
        var _this = this;
        return function () {
            var pickedCard = Math.floor(Math.random() * 52);
            var pickedSuit = Math.floor(pickedCard / 13);
            return { suit: _this.suits[pickedSuit], card: pickedCard % 13 };
        };
    }
};
var cardPicker = deck.createCardPicker();
var pickedCard = cardPicker();
//5 函数重载
/**
 * 1 根据传参不同,函数展现不同的处理
 *
 */
var suits = ["hearts", "spades", "clubs", "diamonds"];
function pickCard(x) {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        var pickedCard_1 = Math.floor(Math.random() * x.length);
        return pickedCard_1;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        var pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}
var myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
var pickedCard1 = myDeck[pickCard(myDeck)];
// alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);
var pickedCard2 = pickCard(15);
// alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
