#react 阅读官方文档笔记
##1 JSX 简介

-   在 jsx 中可以使用表达式，if 语句
-   jsx 的属性用引号定义字符串，大括号定义表达式
    ```
    const element = <div tabIndex="0"></div>;
    const element = <img src={user.avatarUrl}></img>;
    ```
-   React DOM 使用 camelCase 小驼峰命名 来定义属性的名称，而不是使用 HTML 的属性名称
    > 例如 class 变成了 className，而 tabindex 则对应着 tabIndex
    > 类似：label 的 for 属性，使用 htmlFor 代替
-   jsx 防防注入攻击，React DOM 在渲染之前默认会 过滤 所有传入的值。它可以确保你的应用不会被注入攻击。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS(跨站脚本) 攻击。
    > XSS 跨网站指令码（英语：Cross-site scripting，通常简称为：XSS）是一种网站应用程式的安全漏洞攻击，是代码注入的一种。它允许恶意使用者将程式码注入到网页上，其他使用者在观看网页时就会受到影响。这类攻击通常包含了 HTML 以及使用者端脚本语言。
    > **如何防御**
    > 1 最普遍的做法是转义输入输出的内容，对于引号，尖括号，斜杠进行转义
    ```
                function escape(str) {
                str = str.replace(/&/g, "&amp;");
                str = str.replace(/</g, "&lt;");
                str = str.replace(/>/g, "&gt;");
                str = str.replace(/"/g, "&quto;");
                str = str.replace(/'/g, "&##39;");
                str = str.replace(/`/g, "&##96;");
                str = str.replace(/\//g, "&##x2F;");
                return str
            }r   
    ```                                                                                                      
    > 2 对于显示富文本来说，不能通过上面的办法来转义所有字符，因为这样会把需要的格式也过滤掉。这种情况通常采用白名单过滤的办法，当然也可以通过黑名单过滤，但是考虑到需要过滤的标签和标签属性实在太多，更加推荐使用白名单的方式。
-   Babel 转译器会把 JSX 转换成一个名为 React.createElement() 的方法调用。
    ```
    const element = <h1>Hello, world!</h1>;
    const element = React.createElement(
        'h1',
        {className: 'greeting'},
        'Hello, world!'
    );
    ```
    > React.createElement() 这个方法首先会进行一些避免 bug 的检查，之后会返回一个类似下面例子的对象：
    ```
    // 注意: 以下示例是简化过的（不代表在 React 源码中是这样）
    const element = {
    type: 'h1',
    props: {
        className: 'greeting',
        children: 'Hello, world'
    }
    };
    ```
    > 这样的对象被称为 “React 元素”。它代表所有你在屏幕上看到的东西。React 通过读取这些对象来构建 DOM 并保持数据内容一致。
-   在运行时选择类型

    > 不能使用表达式来作为 React 元素的标签。如果你的确想通过表达式来确定 React 元素的类型，请先将其赋值给大写开头的变量

    ```
    const components = {
        photo: PhotoStory,
        video: VideoStory
    };

    function Story(props) {
        // 正确！JSX 标签名可以为大写开头的变量。
        const SpecificStory = components[props.storyType];
        return <SpecificStory story={props.story} />;
    }
    ```

-   属性
    > 1 如果属性是布尔类型,与 vue 一致,写了属性名称则属性值默认为 true
    > 2 扩展属性.使用...语法扩展已有的对象
    ```
    function App2() {
        const props = {firstName: 'Ben', lastName: 'Hector'};
        return <Greeting {...props} />;
    }
    ```
-   props 的子代为函数情况

    ```
        function Repeat(props) {
        let items = [];
        for (let i = 0; i < props.numTimes; i++) {
            items.push(props.children(i));
        }
        return <div>{items}</div>;
        }

        function ListOfTenThings() {
        return (
            <Repeat numTimes={10}>
            {(index) => <div key={index}>This is item {index} in the list</div>}
            </Repeat>
        );
        }
    ```

-   props 的 children 为布尔值,NULL 和 undefined 会被忽略

## 2 元素渲染

-   ReactDOM.render()方法进行渲染
    ```
    const element = <h1>Hello, world</h1>;
    ReactDOM.render(element, document.getElementById('root'));
    ```
-   更新渲染,不停的调用 render 方法

    ```
    function tick() {
        const element = (
            <div>
            <h1>Hello, world!</h1>
            <h2>It is {new Date().toLocaleTimeString()}.</h2>
            </div>
        );
        ReactDOM.render(element, document.getElementById('root'));
    }

    setInterval(tick, 1000);
    ```

    > 在实际生产开发中，大多数 React 应用只会调用一次 ReactDOM.render().

-   react 只会更新必要的部分
    > 将界面视为一个个特定时刻的固定内容（就像一帧一帧的动画），而不是随时处于变化之中（而不是处于变化中的一整段动画）

## 3 组件和 props

-   组件可以将 UI 切分成一些独立的、可复用的部件
    > 组件的名称首字母要大写来表示这是一个组件
-   函数定义和类定义组件

```
    函数定义 函数定义的是无状态的组件,即无state
    function Welcome(props) {
        return <h1>Hello, {props.name}</h1>;
    }
    类定义 有状态state的组件
    class Welcome extends React.Component {
        render() {
            return <h1>Hello, {this.props.name}</h1>;
        }
    }
```

-   props
    > 当 React 遇到的元素是用户自定义的组件，它会将 JSX 属性作为单个对象传递给该组件，这个对象称之为“props”。

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```

-   props 是只读的,不能修改它的值
-   props.children 获取组件的内容
    > 比如：<Hello\> 组件内容</Hello\> 中的 组件内容

## 4 state

-   state 是组件的局部状态,
    > 在组件实例化 constructor 的时候构造 state,this.state= {data:new Date()};
-   更新 state,在组件内部调用 this.setState().当组件的 props 和 state 更新时都会渲染视图(react 调用 render 方法)
    > 不要直接更新 state,例如
    > this.state.comment = 'Hello';//错误的做法,此时不会更新视图
-   state 和 props 更新可能异步的

```
这种做法可能出现问题
this.setState({
  counter: this.state.counter + this.props.increment,
});
此时可以使用函数来更新
this.setState(function(prevState, props) {
  return {
    counter: prevState.counter + props.increment
  };
});
```

-   状态更新合并
    > 当调用 setState() 时，React 将你提供的对象合并到当前状态

```
例如，你的状态可能包含一些独立的变量：
 constructor(props) {
    super(props);
    this.state = {
      posts: [],
      comments: []
    };
  }
你可以调用 setState() 独立地更新它们：
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
这里的合并是浅合并，也就是说this.setState({comments})完整保留了this.state.posts，但完全替换了this.state.comments。
```

-   数据自顶向下流动或单向数据流

## 5 生命周期

> 生命周期分为三种状态

### 1 创建阶段（Mounting）

-   constructor()
-   static getDerivedStateFromProps(nextProps,prevState)

    > //组件实例化后和接受新属性时将会调用 getDerivedStateFromProps。
    > 如果父组件导致了组件的重新渲染，即使属性没有更新，这一方法也会被调用;
    > 调用 this.setState() 通常不会触发 getDerivedStateFromProps()

-   componentWillMount() / UNSAFE_componentWillMount()
    > 其在 render()之前被调用，因此在这方法里同步地设置状态将不会触发重渲
    > 避免在该方法中引入任何的副作用或订阅。对于这些使用场景
-   render()
    > render()函数应该纯净，意味着其不应该改变组件的状态，其每次调用都应返回相同的结果，同时不直接和浏览器交互。
    > 若需要和浏览器交互，将任务放在 componentDidMount()阶段或其他的生命周期方法。
-   componentDidMount()
    > 1 在组件被装配后立即调用.
    > 2 初始化使得 DOM 节点应该进行到这里。若你需要从远端加载数据，这是一个适合实现网络请求的地方.
    > 3 这一方法是一个发起任何订阅的好地方。如果你这么做了，别忘了在 componentWillUnmount()退订。
    > 4 在这个方法中调用 setState()将会触发一次额外的渲染，但是它将在浏览器刷新屏幕之前发生。这保证了即使 render()将会调用两次，但用户不会看到中间状态。谨慎使用这一模式，因为它常导致性能问题。

### 2 运行和交互阶段（Updating）

-   componentWillReceiveProps(nextProps)/UNSAFE_componentWillReceiveProps(nextProps)

    > 1 在装配了的组件接收到新属性前调用
    > 2 注意即使属性未有任何改变，React 可能也会调用该方法，因此若你想要处理改变，请确保比较当前和之后的值。这可能会发生在当父组件引起你的组件重渲。
    > 3 在 装配期间，React 并不会调用带有初始属性的 UNSAFE_componentWillReceiveProps 方法。其仅会调用该方法如果某些组件的属性可能更新。
    > 4 调用 this.setState 通常不会触发

-   static getDerivedStateFromProps(nextProps,prevState)()
-   shouldComponentUpdate(nextProps,nextState)
    > 1 默认为 true,默认行为是在每一次状态的改变重渲
    > 2 当接收到新属性或状态时，shouldComponentUpdate() 在渲染前被调用。
    > 3 该方法并不会在初始化渲染或当使用 forceUpdate()时被调用。
    > 4 若 shouldComponentUpdate()返回 false，而后 UNSAFE_componentWillUpdate()，render()， 和 componentDidUpdate()将不会被调用
-   componentWillUpdate()/UNSAFE_componentWillUpdate(nextProps, nextState)

    > 1 注意你不能在这调用 this.setState()，若你需要更新状态响应属性的调整，使用 getDerivedStateFromProps() 代替。

-   render()
-   getSnapshotBeforeUpdate()

    > 1 在最新的渲染输出提交给 DOM 前将会立即调用;
    > 2 它让你的组件能在当前的值可能要改变前获得它们。这一生命周期返回的任何值将会 作为参数被传递给 componentDidUpdate()。

    ```
    class ScrollingList extends React.Component {
        listRef = React.createRef();

        getSnapshotBeforeUpdate(prevProps, prevState) {
            // Are we adding new items to the list?
            // Capture the current height of the list so we can adjust scroll later.
            if (prevProps.list.length < this.props.list.length) {
            return this.listRef.current.scrollHeight;
            }
            return null;
        }

        componentDidUpdate(prevProps, prevState, snapshot) {
            // If we have a snapshot value, we've just added new items.
            // Adjust scroll so these new items don't push the old ones out of view.
            if (snapshot !== null) {
            this.listRef.current.scrollTop +=
                this.listRef.current.scrollHeight - snapshot;
            }
        }

        render() {
            return (
            <div ref={this.listRef}>{/* ...contents... */}</div>
            );
        }
    }
    ```

-   componentDidUpdate()
    > componentDidUpdate()会在更新发生后立即被调用。该方法并不会在初始化渲染时调用。

### 3 卸载阶段（Unmounting）

-   componentWillUnmount()
    > 在组件被卸载和销毁之前立刻调用。可以在该方法里处理任何必要的清理工作，例如解绑定时器，取消网络请求，清理任何在 componentDidMount 环节创建的 DOM 元素。

## 6 事件处理

-   React 事件绑定属性的命名采用驼峰式写法，而不是小写。
-   如果采用 JSX 的语法你需要传入一个函数作为事件处理函数，而不是一个字符串(DOM 元素的写法)
    ```
    <button onClick={activateLasers}>
    Activate Lasers
    </button>
    ```
-   不能使用返回 false 的方式阻止默认行为,必须明确的使用 preventDefault
-   this 问题,类的方法默认是不会绑定 this 的,解决方式有下面三种

    ```
    1 使用bind,在constructor中this.handleClick = this.handleClick.bind(this);
    2 实验性的属性初始化器语法
    class LoggingButton extends React.Component {
        // This syntax ensures `this` is bound within handleClick.
        // Warning: this is *experimental* syntax.
        handleClick = () => {
            console.log('this is:', this);
        }

        render() {
            return (
            <button onClick={this.handleClick}>
                Click me
            </button>
            );
        }
    }
    3 在回调函数中使用 箭头函数;
    class LoggingButton extends React.Component {
        handleClick() {
            console.log('this is:', this);
        }

        render() {
            // This syntax ensures `this` is bound within handleClick
            return (
            <button onClick={(e) => this.handleClick(e)}>
                Click me
            </button>
            );
        }
    }
    ```

-   事件传递参数
    `<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button> <button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>` 
    > 1 箭头函数的方式，事件对象必须显式的进行传递
    > 2 bind 的方式，事件对象以及更多的参数将会被隐式的进行传递。 
    > 3 通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面

## 7 条件渲染

-
-   在 render 中使用 if 语句进行条件判断,渲染不同的内容
-   &&运算符,当第一个为 true 的时候才会渲染后面的.false 时直接跳过;
    ```
    function Mailbox(props) {
        const unreadMessages = props.unreadMessages;
        return (
            <div>
            <h1>Hello!</h1>
            {unreadMessages.length > 0 &&
                <h2>
                You have {unreadMessages.length} unread messages.
                </h2>
            }
            </div>
        );
    }
    ```
-   三目运算符
-   组件 render 函数中返回 null,即会隐藏组件

## 8 列表渲染

-   使用 js 数组的 map 方法,返回多个组件,此时每个组件应该加个独一无二的 key 值

    ```
    function NumberList(props) {
    const numbers = props.numbers;
    const listItems = numbers.map((number) =>
        <li key={number.toString()>{number}</li>
    );
    return (
        <ul>{listItems}</ul>
    );
    }

    const numbers = [1, 2, 3, 4, 5];
    ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
    );
    ```

-   组件的 key 值,当元素没有确定的 id 时，你可以使用他的序列号索引 index 作为 key
    > 如果列表可以重新排序，我们不建议使用索引来进行排序，因为这会导致渲染变得很慢
-   元素的 key 只有在它和它的兄弟节点对比时才有意义
-   元素的 key 在他的兄弟元素之间应该唯一
    > 它们不需要是全局唯一的
-   在 jsx 中使用 map

    ```
    function NumberList(props) {
        const numbers = props.numbers;
        return (
            <ul>
            {numbers.map((number) =>
                <ListItem key={number.toString()}
                        value={number} />

            )}
            </ul>
        );
    }
    ```

## 9 表单

### 1 受控组件

    > 在 HTML 当中，像 input,textarea 和 select 这类表单元素会维持自身状态，并根据用户输入进行更新。
    > 在 React 中，可变的状态通常保存在组件的 state 中，并且只能用 setState() 方法进行更新.
    > React 根据初始状态渲染表单组件，接受用户后续输入，改变表单组件内部的状态。
    > 因此，将那些值由 React 控制的表单元素称为：受控组件。
    
    ```
    class NameForm extends React.Component {
        constructor(props) {
            super(props);
            this.state = {value: ''};
    
            this.handleChange = this.handleChange.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);
        }
    
        handleChange(event) {
            this.setState({value: event.target.value});
        }
    
        handleSubmit(event) {
            alert('A name was submitted: ' + this.state.value);
            event.preventDefault();
        }
    
        render() {
            return (
            <form onSubmit={this.handleSubmit}>
                <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
            );
        }
    }
    ```

-   多个输入的解决方法
    > 当你有处理多个受控的 input 元素时，你可以通过给每个元素添加一个 name 属性，来让处理函数根据 event.target.name 的值来选择做什么

### 2 非受控组件的默认值

-   指定 defaultValue 属性

```
render() {
  return (
    <form onSubmit={this.handleSubmit}>
      <label>
        Name:
        <input
          defaultValue="Bob"
          type="text"
          ref={(input) => this.input = input} />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
```

## 10 状态提升

> 用 react 经常会遇到几个组件需要共用状态数据的情况。这种情况下，我们最好将这部分共享的状态提升至他们最近的父组件当中进行管理

-   将共享的状态放到离他们最近的父组件中,需要修改 state 时,通过父组件传递的修改组件的函数进行修改.
    > 通过父组件传递的回调函数,在子组件中调用函数来修改父组件中共享 state 的值,这样操作符合单一数据流.

## 11 PropTypes 检查类型

> 使用 prop-types 库检查组件的属性 props

-   PropTypes 的类型 array,bool,func,number,object,string

    ```
    import PropTypes from 'prop-types';

    class Greeting extends React.Component {
    render() {
        return (
        <h1>Hello, {this.props.name}</h1>
        );
    }
    }

    Greeting.propTypes = {
    name: PropTypes.string
    };
    ```

*   属性默认值 defaultProps

    ```
    class Greeting extends React.Component {
    render() {
        return (
        <h1>Hello, {this.props.name}</h1>
        );
    }
    }

    // 为属性指定默认值:
    Greeting.defaultProps = {
    name: 'Stranger'
    };

    // 渲染 "Hello, Stranger":
    ReactDOM.render(
    <Greeting />,
    document.getElementById('example')
    );
    或者使用静态属性（使用 transform-class-properties 转换器）
    class Greeting extends React.Component {
        static defaultProps = {
            name: 'stranger'
        }

        render() {
            return (
            <div>Hello, {this.props.name}</div>
            )
        }
    }
    ```

## 12 Refs & DOM

> 在典型的 React 数据流中, 属性（props）是父组件与子组件交互的唯一方式。要修改子组件，你需要使用新的 props 重新渲染它。但是，某些情况下你需要在典型数据流外强制修改子组件。要修改的子组件可以是 React 组件的实例，也可以是 DOM 元素。

### 1 何时使用 Refs

-   处理焦点、文本选择或媒体控制
-   触发强制动画。
-   集成第三方 DOM 库
    **如果可以通过声明式实现，则尽量避免使用 refs。请注意不要过度使用 Refs!**

### 2 创建 refs

-   1 通过 React.createRef() 创建 refs,通过 ref 属性来获得 React 元素

    ```
    class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    render() {
        return <div ref={this.myRef} />;
    }
    }
    ```

-   2 回调 refs,使用 ref 回调函数，在实例的属性中存储对 DOM 节点的引用。

    ```
    class CustomTextInput extends React.Component {
        constructor(props) {
            super(props);

            this.textInput = null;

            this.setTextInputRef = element => {
            this.textInput = element;
            };

            this.focusTextInput = () => {
            // 直接使用原生 API 使 text 输入框获得焦点
            if (this.textInput) this.textInput.focus();
            };
        }

        componentDidMount() {
            // 渲染后文本框自动获得焦点
            this.focusTextInput();
        }

        render() {
            // 使用 `ref` 的回调将 text 输入框的 DOM 节点存储到 React
            // 实例上（比如 this.textInput）
            return (
            <div>
                <input
                type="text"
                ref={this.setTextInputRef}
                />
                <input
                type="button"
                value="Focus the text input"
                onClick={this.focusTextInput}
                />
            </div>
            );
        }
    }
    ```

    > 1 React 将在组件挂载时将 DOM 元素传入 ref 回调函数并调用，当卸载时传入 null 并调用它。
    > 2 ref 回调函数会在 componentDidMout 和 componentDidUpdate 生命周期函数前被调用

-   3 父组件获取子组件的 ref

    ```
    function CustomTextInput(props) {
        return (
            <div>
            <input ref={props.inputRef} />
            </div>
        );
        }

        class Parent extends React.Component {
        render() {
            return (
            <CustomTextInput
                inputRef={el => this.inputElement = el}
            />
            );
        }
    }
    ```

### 3 赋值 ref

-   1 为 dom 赋值 ref,可以直接使用上诉两种方法赋值
-   2 为自定义组件赋值 ref 时,分两种

    -   a 函数式组件

        > 1 你不能在函数式组件上使用 ref 属性，因为它们没有实例

        ```
            function MyFunctionalComponent() {
                return <input /\>;
                }
            class Parent extends React.Component {
                constructor(props) {
                    super(props);
                    this.textInput = React.createRef();
                }
                render() {
                    // 这将 *不会* 工作！
                    return (
                    <MyFunctionalComponent ref={this.textInput} />
                    );
                }
            }
        ```

        > 2 但是可以在函数式组件内部使用 ref，只要它指向一个 DOM 元素或者 class 组件

        ```
        function CustomTextInput(props) {
        // 这里必须声明 textInput，这样 ref 回调才可以引用它
        let textInput = null;

        function handleClick() {
            textInput.focus();
        }

        return (
            <div>
            <input
                type="text"
                ref={(input) => { textInput = input; }} />

            <input
                type="button"
                value="Focus the text input"
                onClick={handleClick}
            />
            </div>
        );
        }
        ```

    -   b class 类组件可以直接使用

## 13 Reconciliation 协调(diff 算法)

> 当你使用 React 的时候，在某个时间点 render() 函数创建了一棵 React 元素树，
> 在下一个 state 或者 props 更新的时候，render() 函数将创建一棵新的 React 元素树，
> React 将对比这两棵树的不同之处，计算出如何高效的更新 UI（只更新变化的地方）

### 1 对比算法

-   1 不同类型的元素.如果两棵树的根元素类型不同，React 会销毁旧树，创建新树

    ```
    // 旧树
    <div>
    <Counter />
    </div>

    // 新树
    <span>
    <Counter />
    </span>

    执行过程：destory Counter -> insert Counter
    ```

-   2 相同类型的 DOM 元素.对于类型相同的 React DOM 元素，React 会对比两者的属性是否相同，只更新不同的属性.当处理完这个 DOM 节点，React 就会递归处理子节点。
-   3 子节点.

    -   当在子节点的后面添加一个节点，这时候两棵树的转化工作执行的很好

        ```
        // 旧
        <ul>
        <li>first</li>
        <li>second</li>
        </ul>

        // 新
        <ul>
        <li>first</li>
        <li>second</li>
        <li>third</li>
        </ul>

        执行过程：
        React会匹配新旧两个<li>first</li>，匹配两个<li>second</li>，然后添加 <li>third</li> tree
        ```

    -   但是如果你在开始位置插入一个元素，那么问题就来了

        ```
        // 旧
        <ul>
        <li>Duke</li>
        <li>Villanova</li>
        </ul>

        // 新
        <ul>
        <li>Connecticut</li>
        <li>Duke</li>
        <li>Villanova</li>
        </ul>

        在没有key属性时执行过程：
        React将改变每一个子删除重新创建，而非保持 <li>Duke</li> 和 <li>Villanova</li> 不变
        ```

### 2 key 属性

> 为了解决以上问题，React 提供了一个 key 属性。当子节点带有 key 属性，React 会通过 key 来匹配原始树和后来的树。

```
// 旧
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

// 新
<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
执行过程：
现在 React 知道带有key '2014' 的元素是新的，对于 '2015' 和 '2016' 仅仅移动位置即可
```

**说明**

-   说明 key 属性在 React 内部使用，但不会传递给你的组件
-   推荐 在遍历数据时，推荐在组件中使用 key 属性：\<li key={item.id}>{item.name}</li\>
-   注意 key 只需要保持与他的兄弟节点唯一即可，不需要全局唯一
-   注意 尽可能的减少数组 index 作为 key，数组中插入元素的等操作时，会使得效率低下

## 14 context

> Context 通过组件树提供了一个传递数据的方法，从而避免了在每一个层级手动的传递 props 属性。

-   何时使用 context?
    > 共享那些被认为对于一个组件树而言是“全局”的数据,例如 a->b->c 组件都需要使用 props 传递一个属性,那么使用 context, 可以避免通过中间元素传递 props
-   **注意** 不要仅仅为了避免在几个层级下的组件传递 props 而使用 context，它是被用于在多个层级的多个组件需要访问相同数据的情景。

    ```
    // 创建一个 theme Context,  默认 theme 的值为 light
    const ThemeContext = React.createContext('light');

    function ThemedButton(props) {
    // ThemedButton 组件从 context 接收 theme
    return (
        <ThemeContext.Consumer>
        {theme => <Button {...props} theme={theme} />}
        </ThemeContext.Consumer>
    );
    }

    // 中间组件
    function Toolbar(props) {
    return (
        <div>
        <ThemedButton />
        </div>
    );
    }

    class App extends React.Component {
    render() {
        return (
        <ThemeContext.Provider value="dark">
            <Toolbar />
        </ThemeContext.Provider>
        );
    }
    }
    ```

### 1 创建 context

-   React.createContext
    ```
    const {Provider, Consumer} = React.createContext(defaultValue);
    ```
    > 1 创建一对 { Provider, Consumer }。当 React 渲染 context 组件 Consumer 时，它将从组件树的上层中最接近的匹配的 Provider 读取当前的 context 值。
    > 2 如果上层的组件树没有一个匹配的 Provider，而此时你需要渲染一个 Consumer 组件，那么你可以用到 defaultValue 。这有助于在不封装它们的情况下对组件进行测试。
-   Provider React 组件允许 Consumers 订阅 context 的改变
    ```
    <Provider value={/* some value */}>
    ```
    > 接收一个 value 属性传递给 Provider 的后代 Consumers。
    > 一个 Provider 可以联系到多个 Consumers。
    > Providers 可以被嵌套以覆盖组件树内更深层次的值。
-   Consumer 一个可以订阅 context 变化的 React 组件
    ```
    <Consumer>
    {value => /* render something based on the context value */}
    </Consumer>
    ```
    > 接收一个 函数作为子节点. 函数接收当前 context 的值并返回一个 React 节点。
    > 传递给函数的 value 将等于组件树中上层 context 的最近的 Provider 的 value 属性。
    > 如果 context 没有 Provider ，那么 value 参数将等于被传递给 createContext() 的 defaultValue 。

**每当 Provider 的值发送改变时, 作为 Provider 后代的所有 Consumers 都会重新渲染。 从 Provider 到其后代的 Consumers 传播不受 shouldComponentUpdate 方法的约束，因此即使祖先组件退出更新时，后代 Consumer 也会被更新**

### 2 在生命周期中访问 Context

> 只需要将它作为一个 props 传递，然后像通常使用 props 一样去使用它

```
class Button extends React.Component {
  componentDidMount() {
    // ThemeContext value is this.props.theme
  }

  componentDidUpdate(prevProps, prevState) {
    // Previous ThemeContext value is prevProps.theme
    // New ThemeContext value is this.props.theme
  }

  render() {
    const {theme, children} = this.props;
    return (
      <button className={theme ? 'dark' : 'light'}>
        {children}
      </button>
    );
  }
}

export default props => (
  <ThemeContext.Consumer>
    {theme => <Button {...props} theme={theme} />}
  </ThemeContext.Consumer>
);
```

### 3 高阶组件中使用 context

> 某些类型的上下文被许多组件（例如主题或者地点信息）共用。使用 <Context.Consumer> 元素显示地封装每个依赖项是冗余的。

```
const ThemeContext = React.createContext('light');

// 在函数中引入组件
export function withTheme(Component) {
  // 然后返回另一个组件
  return function ThemedComponent(props) {
    // 最后使用context theme渲染这个被封装组件
    // 注意我们照常引用了被添加的属性
    return (
      <ThemeContext.Consumer>
        {theme => <Component {...props} theme={theme} />}
      </ThemeContext.Consumer>
    );
  };
}
```

    目前任何组件都依赖于主题 context，它们都可以很容易的使用我们创建的 withTheme 函数进行订阅。

```
function Button({theme, ...rest}) {
  return <button className={theme} {...rest} />;
}

const ThemedButton = withTheme(Button);
```

### 4 转发 Refs

> 一个关于渲染属性 API 的问题是 refs 不会自动的传递给被封装的元素。使用 React.forwardRef

    fancy-button.js

```
class FancyButton extends React.Component {
  focus() {
    // ...
  }

  // ...
}

// 使用 context 传递当前的 "theme" 给 FancyButton.
// 使用 forwardRef 传递 refs 给 FancyButton 也是可以的.
export default React.forwardRef((props, ref) => (
  <ThemeContext.Consumer>
    {theme => (
      <FancyButton {...props} theme={theme} ref={ref} />
    )}
  </ThemeContext.Consumer>
));
```

    app.js

```
import FancyButton from './fancy-button';

const ref = React.createRef();

// ref属性将指向 FancyButton 组件,
// ThemeContext.Consumer 没有包裹它
// 这意味着我们可以调用 FancyButton 的方法就像这样 ref.current.focus()
<FancyButton ref={ref} onClick={handleClick}>
  Click me!
</FancyButton>;
```

**告诫**

> 因为 context 使用 reference identity 确定何时重新渲染，在 Consumer 中，当一个 Provider 的父节点重新渲染的时候，有一些问题可能触发意外的渲染。例如下面的代码，所有的 Consumner 在 Provider 重新渲染之时，每次都将重新渲染，因为一个新的对象总是被创建对应 Provider 里的 value

```
class App extends React.Component {
  render() {
    return (
      <Provider value={{something: 'something'}}>
        <Toolbar />
      </Provider>
    );
  }
}
```

    为了防止这样, 提升 value 到父节点的 state里:

```
class App extends React.Component {
  constructor(props) {
    this.state = {
      value: {something: 'something'},
    };
  }

  render() {
    return (
      <Provider value={this.state.value}>
        <Toolbar />
      </Provider>
    );
  }
}
```

## 15 Fragments

> React 中一个常见模式是为一个组件返回多个元素。Fragments 可以让你聚合一个子元素列表，并且不在 DOM 中增加额外节点.类似于 document.createDocumentFragment()创建文档碎片

-   Fragments 看起来像空的 JSX 标签：
    ```
    render() {
        return (
            <>
            <ChildA />
            <ChildB />
            <ChildC />
            </>
        );
    }
    ```
-   使用
    -   1 使用空标签
    ```
    class Columns extends React.Component {
        render() {
            return (
            <>
                <td>Hello</td>
                <td>World</td>
            </>
            );
        }
    }
    ```
    -   2 使用 React.Fragment 组件
    ```
    class Columns extends React.Component {
        render() {
            return (
            <React.Fragment>
                <td>Hello</td>
                <td>World</td>
            </React.Fragment>
            );
        }
    }
    ```
-   带 key 的 Fragments
    > <></> 语法不能接受键值或属性
    -   如果你需要一个带 key 的片段，你可以直接使用 <React.Fragment />
        ```
        function Glossary(props) {
            return (
                <dl>
                {props.items.map(item => (
                    // 没有`key`，将会触发一个key警告
                    <React.Fragment key={item.id}>
                    <dt>{item.term}</dt>
                    <dd>{item.description}</dd>
                    </React.Fragment>
                ))}
                </dl>
            );
        }
        key 是唯一可以传递给 Fragment 的属性。在将来，我们可能增加额外的属性支持，比如事件处理。
        ```

## 15 Portals

> Portals 提供了一种很好的将子节点渲染到父组件以外的 DOM 节点的方式.

```
ReactDOM.createPortal(child, container)
第一个参数（child）是任何可渲染的 React 子元素，例如一个元素，字符串或碎片
第二个参数（container）则是一个 DOM 元素。
```

1 _通常讲，当你从组件的 render 方法返回一个元素，该元素仅能装配 DOM 节点中离其最近的父元素_,然而有时候需要将其插入到 DOM 节点的不同位置.

> 对于 portal 的一个典型用例是当父组件有 overflow: hidden 或 z-index 样式，但你需要子组件能够在视觉上“跳出（break out）”其容器。例如，对话框、hovercards 以及提示框

```
render() {
  // React does *not* create a new div. It renders the children into `domNode`.
  // `domNode` is any valid DOM node, regardless of its location in the DOM.
  return ReactDOM.createPortal(
    this.props.children,
    domNode,
  );
}
```

**注意** 通过 Portals 进行事件冒泡

> 尽管 portal 可以被放置在 DOM 树的任何地方，但在其他方面其行为和普通的 React 子节点行为一致。如上下文特性依然能够如之前一样正确地工作，无论其子节点是否是 portal，由于 portal 仍存在于 React 树中，而不用考虑其在 DOM 树中的位置。

_这包含事件冒泡。一个从 portal 内部会触发的事件会一直冒泡至包含 React 树 的祖先_
假设如下 HTML 结构

```
<html>
  <body>
    <div id="app-root"></div>
    <div id="modal-root"></div>
  </body>
</html>
```

    在 #app-root 里的 Parent 组件能够捕获到未被捕获的从兄弟节点 #modal-root 冒泡上来的事件

```
const appRoot = document.getElementById('app-root');
const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el,
    );
  }
}

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {clicks: 0};
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    // This will fire when the button in Child is clicked,
    // updating Parent's state, even though button
    // is not direct descendant in the DOM.
    this.setState(prevState => ({
      clicks: prevState.clicks + 1
    }));
  }

  render() {
    return (
      <div onClick={this.handleClick}>
        <p>Number of clicks: {this.state.clicks}</p>
        <p>
          Open up the browser DevTools
          to observe that the button
          is not a child of the div
          with the onClick handler.
        </p>
        <Modal>
          <Child />
        </Modal>
      </div>
    );
  }
}

function Child() {
  // The click event on this button will bubble up to parent,
  // because there is no 'onClick' attribute defined
  return (
    <div className="modal">
      <button>Click</button>
    </div>
  );
}

ReactDOM.render(<Parent />, appRoot);
```

## 15 错误边界

> 错误边界是用于捕获其子组件树 JavaScript 异常，记录错误并展示一个回退的 UI 的 React 组件，而不是整个组件树的异常。错误组件在渲染期间，生命周期方法内，以及整个组件树构造函数内捕获错误
> 仅有类组件可以成为错误边界

**错误边界无法捕获如下错误**

-   事件处理
-   异步代码 （例如 setTimeout 或 requestAnimationFrame 回调函数）
-   服务端渲染
-   错误边界自身抛出来的错误 （而不是其子组件）
    > 1 如果一个类组件定义了一个名为 componentDidCatch(error, info): 的新方法，则其成为一个错误边界：
    > 2 error 是被抛出的错误
    > 3 info 是一个含有 componentStack 属性的对象。这一属性包含了错误期间关于组件的堆栈信息。

## 16 高阶组件

> 1 高阶组件（HOC）是 react 中对组件逻辑进行重用的高级技术。但高阶组件本身并不是 React API,它只是一种模式
> 2 高阶组件就是一个函数，且该函数接受一个组件作为参数，并返回一个新的组件。将一个组件转换成另一个新组件。

**注意**

> 高阶组件既不会修改 input 原组件，也不会使用继承复制 input 原组件的行为。相反，高阶组件是通过将原组件 包裹（wrapping） 在容器组件（container component）里面的方式来 组合（composes） 使用原组件。高阶组件就是一个没有副作用的纯函数。

高阶组件例子

```
const CommentListWithSubscription = withSubscription(
  CommentList,
  (DataSource) => DataSource.getComments()
);

const BlogPostWithSubscription = withSubscription(
  BlogPost,
  (DataSource, props) => DataSource.getBlogPost(props.id)
);

// 函数接受一个组件参数……
function withSubscription(WrappedComponent, selectData) {
  // ……返回另一个新组件……
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        data: selectData(DataSource, props)
      };
    }

    componentDidMount() {
      // ……注意订阅数据……
      DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
      DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
      this.setState({
        data: selectData(DataSource, this.props)
      });
    }

    render() {
      // ……使用最新的数据渲染组件
      // 注意此处将已有的props属性传递给原组件
      return <WrappedComponent data={this.state.data} {...this.props} />;
    }
  };
}
```

-   不要改变原始组件，使用组合
-   将不相关的 props 属性传递给包裹组件
    > 高阶组件给组件添加新特性。他们不应该大幅修改原组件的 props
-   最大化使用组合

    ```
    // connect是一个返回函数的函数（译者注：就是个高阶函数）
    const enhance = connect(commentListSelector, commentListActions);
    // 返回的函数就是一个高阶组件，该高阶组件返回一个与Redux store
    // 关联起来的新组件
    const ConnectedComment = enhance(CommentList);
    ```

    ```
    // 不要这样做……
    const EnhancedComponent = withRouter(connect(commentSelector)(WrappedComponent))

    // ……你可以使用一个功能组合工具
    // compose(f, g, h) 和 (...args) => f(g(h(...args)))是一样的
    const enhance = compose(
    // 这些都是单参数的高阶组件
    withRouter,
    connect(commentSelector)
    )
    const EnhancedComponent = enhance(WrappedComponent)
    ```

-   包装显示名字以便于调试

    > 所以，如果你的高阶组件名字是 withSubscription，且包裹组件的显示名字是 CommentList，那么就是用 WithSubscription(CommentList)这样的显示名字：

    ```
    function withSubscription(WrappedComponent) {
        class WithSubscription extends React.Component {/* ... */}
        WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
        return WithSubscription;
    }

    function getDisplayName(WrappedComponent) {
        return WrappedComponent.displayName || WrappedComponent.name || 'Component';
    }
    ```

-   不要在 render 函数中使用高阶组件

    > React 使用的差异算法（称为协调）使用组件标识确定是否更新现有的子对象树或丢掉现有的子树并重新挂载。如果 render 函数返回的组件和之前 render 函数返回的组件是相同的，React 就递归地比较新子对象树和旧的子对象树的差异，并更新旧的子对象树。如果它们不相等，就会完全卸载掉旧的子对象树。

    **但是它对高阶函数的使用有影响，那就是你不能在组件的 render 函数中调用高阶函数**

    ```
    render() {
        // 每一次render函数调用都会创建一个新的EnhancedComponent实例
        // EnhancedComponent1 !== EnhancedComponent2
        const EnhancedComponent = enhance(MyComponent);
        // 每一次都会使子对象树完全被卸载或移除
        return <EnhancedComponent />;
    }
    ```

    > 这里产生的问题不仅仅是性能问题 —— 还有，重新加载一个组件会引起原有组件的所有状态和子组件丢失。

-   静态方法做拷贝
    > 1 当使用高阶组件包装组件，原始组件被容器组件包裹，也就意味着新组件会丢失原始组件的所有静态方法。
    > 2 解决这个问题的方法就是，将原始组件的所有静态方法全部拷贝给新组件
    ```
    function enhance(WrappedComponent) {
        class Enhance extends React.Component {/*...*/}
        // 必须得知道要拷贝的方法 :(
        Enhance.staticMethod = WrappedComponent.staticMethod;
        return Enhance;
    }
    ```
    -   1 可以使用 hoist-non-react-statics 来帮处理，它会自动拷贝所有非 React 的静态方法
        ```
        import hoistNonReactStatic from 'hoist-non-react-statics';
            function enhance(WrappedComponent) {
             	class Enhance extends React.Component {/*...*/}
            	hoistNonReactStatic(Enhance, WrappedComponent);
           		return Enhance;
        }
        ```
    -   2 另外一个解决方案就是分别导出组件自身的静态方法
-   Refs 属性不能传递
    > 一般来说，高阶组件可以传递所有的 props 属性给包裹的组件，但是不能传递 refs 引用。因为并不是像 key 一样，refs 是一个伪属性，React 对它进行了特殊处理。如果你向一个由高阶组件创建的组件的元素添加 ref 应用，那么 ref 指向的是最外层容器组件实例的，而不是包裹组件。

## 17 转发高阶函数的refs
```
function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const {forwardedRef, ...rest} = this.props;

      // Assign the custom prop "forwardedRef" as a ref
      return <Component ref={forwardedRef} {...rest} />;
    }
  }

  // Note the second param "ref" provided by React.forwardRef.
  // We can pass it along to LogProps as a regular prop, e.g. "forwardedRef"
  // And it can then be attached to the Component.
  function forwardRef(props, ref) {
    return <LogProps {...props} forwardedRef={ref} />;
  }

  // These next lines are not necessary,
  // But they do give the component a better display name in DevTools,
  // e.g. "ForwardRef(logProps(MyComponent))"
  const name = Component.displayName || Component.name;
  forwardRef.displayName = `logProps(${name})`;

  return React.forwardRef(forwardRef);
}
```
## 18 Render Props
>术语 “render prop” 是指一种在 React 组件之间使用一个值为函数的 prop 在 React 组件间共享代码的简单技术。
```
class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <img src="/cat.jpg" style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>

        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>Move the mouse around!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}
```
>提供了一个 render prop 以让 <Mouse> 能够动态决定什么需要渲染，而不是克隆 <Mouse> 组件并硬编码来解决特定的用例。

**更具体地说，render prop 是一个组件用来了解要渲染什么内容的函数 prop。**