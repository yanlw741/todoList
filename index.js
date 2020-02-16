var canvas = document.getElementById('drawing');
var context = canvas.getContext('2d');
context.fillStyle = '#ff0000';
context.fillRect(10, 10, 50, 50);
context.fillStyle = "rgba(0,0,255,0.5)";
context.fillRect(30, 30, 50, 50);

//记录数据部分
var dataList = new Array();
var todocount = 0;
var donecount = 0;

//展示数据部分
var oIn = document.getElementById("title");
var todoList = document.getElementById("todolist");
var doneList = document.getElementById("donelist");
var todoCount = document.getElementById("todocount");
var doneCount = document.getElementById("donecount");


// 作用：对相应事件绑定侦听器（既可以直接对元素绑定，也可以对元素下的子节点绑定）
// ele————元素，selector————类选择器， event————事件对象， fn————要添加的函数 
function bindEvent(ele, selector, event, fn) {
    if (arguments.length == 4) {
        ele.addEventListener(event, function (e) {
            var target = e.target;
            if (target.className.indexOf(selector) > -1) {
                fn(e);
            }
        });
    } else {
        fn = event;
        event = selector;
        ele.addEventListener(event, fn);
    }
}

//作用：重置
function reset() {
    todocount = 0;
    donecount = 0;
}


//作用：添加子节点（正在进行）--- input[type="text"] keydown
var addItem = function (event) {
    if (event.keyCode == 13 && oIn.value) {
        dataList.push({
            value: oIn.value,
            done: false,
            id: +new Date()
        });
        oIn.value = "";
        showList();
    }
}
//作用：改变子节点的完成程度（正进行/已完成）---input[type="checkbox"] change
var changeItem = function (event) {
    var target = event.target;
    var value = +target.value;
    console.log(value);
    for (var i = 0; i < dataList.length; i++) {
        if (dataList[i].id === value) {
            dataList[i].done = target.checked;
        }
    }
    showList();
}
//作用：清除子节点 --- a click
var clearItem = function (event) {
    var target = event.target;
    var value = +target.id;
    console.log(value)
    for (var i = 0; i < dataList.length; i++) {
        if (dataList[i].id === value) {
            dataList.splice(i, 1);
            break;
        }
    }
    showList();
}

//作用：存储在本地的localStorage，可注释
var saveData = function () {
    window.localStorage.setItem('todoList', JSON.stringify(dataList));
};
var getData = function () {
    var item = window.localStorage.getItem('todoList');
    if (item) {
        dataList = JSON.parse(item);
    } else {
        dataList = [];
    }
    showList();
};

//作用：将子数据文档化（将dataList的一个数据反映在HTML文档上）
function showDetail(e) {
    var checked = e.done ? 'checked' : '';
    return [
        '<li>',
        '<input type="checkbox"/ ' + checked + ' value="' + e.id + '" class="itemValue">',
        '<p>' + e.value + '</p>',
        '<a  id="' + e.id + '" class="itemClear">-</a>',
        '</li>'
    ].join('');
}

//作用：将数据进行统筹处理（将dataList的所有数据识别，分离）
function showList() {
    reset();
    var todohtml = "";
    var donehtml = "";

    for (var i = 0; i < dataList.length; i++) {
        if (dataList[i].done === false) {
            todohtml += showDetail(dataList[i]);
            todocount++;
        }
        if (dataList[i].done === true) {
            donehtml += showDetail(dataList[i]);
            donecount++;
        }
    }
    todoList.innerHTML = todohtml;
    todoCount.innerHTML = todocount;
    doneList.innerHTML = donehtml;
    doneCount.innerHTML = donecount;

    saveData();
}

bindEvent(oIn, "keydown", addItem);
bindEvent(todoList, 'itemValue', 'change', changeItem);
bindEvent(doneList, 'itemValue', 'change', changeItem);
bindEvent(todoList, 'itemClear', 'click', clearItem);
bindEvent(doneList, 'itemClear', 'click', clearItem);

getData();




