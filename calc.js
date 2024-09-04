const activate = function (buttons, func) {
    buttons.forEach(button => {
        if (button.id == "=") {
            button.addEventListener("click", eval)
        }
        else {
            button.addEventListener("click", e => {
                func(e);
                INPUT.textContent = STATE.input;
                RESULT.textContent = STATE.output;
            });
        }
    });
}

const eval = function () {
    STATE.eval();
}

const numpad = function (e) {
    let id = e.target.id;
    let disable=false;
    if (id==".") {
        if (STATE.current == "op1" && STATE.input.includes(".")) disable=true;
        if (STATE.current == "op2" && STATE.input.split(STATE.ops)[1].includes(".")) disable=true;
    }
    if (disable == false) {
        if(STATE.current=="done") CLA();
        STATE.input = STATE.input.concat(id);
    }
    if (disable == true) {
        alert ("REMINDER\nYou have not published your pioneering work in discovery of multidecimal numbers. You're missing a Field Medal!");
    }
}

const special = function (e) {
    if (e.target.id == "clear") CLE();
    else CLA();
}

const CLE = function () {
    if (STATE.current == "op1") STATE.input="";
    else if (STATE.current == "done") CLA();
    else {
        let nums = STATE.input.split(STATE.ops);
        STATE.input=String(nums[0]);
        STATE.current="op1";
        if (nums[1]!="") {
            STATE.input=STATE.input.concat(STATE.ops);
            STATE.current="op2";
        }
    }
}

const CLA = function () {
    STATE = { ...FRESH };
}

const operate = function (e) {
    let id = e.target.id;
    if (STATE.current == "op1") {
        STATE.current = "op2";
    }
    else {
        if (STATE.current == "op2") STATE.eval();
        if (STATE.current == "done") STATE.current = "op2";
        STATE.input = STATE.output;
        STATE.op1 = Number(STATE.input);
    }
    funcSort(id);
    STATE.ops = id;
    STATE.input = STATE.input.concat(id);
}

const funcSort = function (id) {
    if (id == "+") {
        STATE.op = ADD;
    }
    else if (id == "-") {
        STATE.op = SUB;
    }
    else if (id == "*") {
        STATE.op = MUL;
    }
    else {
        STATE.op = DIV;
    }
}

const ADD = function (a, b) {
    return a + b;
}
const SUB = function (a, b) {
    return a - b;
}
const MUL = function (a, b) {
    return a * b;
}
const DIV = function (a, b) {
    if (b!=0) return a / b;
    else {
        alert("REMINDER\nYou have won a Field Medal but you need to publish your pioneering work in division by zero to claim it!");
        return STATE.output;
    }
}


const INPUT = document.querySelector(".input");
const RESULT = document.querySelector(".result");
const NUMPAD = document.querySelectorAll(".numpad button");
const SPECIAL = document.querySelectorAll(".special button");
const OPERATE = document.querySelectorAll(".operate button");

const FRESH = {
    op1: 0,
    op2: 0,
    current: "op1",
    input: "",
    output: "",
    ops: "+",
    op: ADD,
    eval: function () {
        if (this.current == "op1") {
            this.op1 = Number(this.input);
        }
        
        else if (this.current == "done") {
            let output = this.output;
            this.op1=0;
            this.op2=0;
            this.current="op1";
            this.input="";
            this.output="";
            this.ops="+";
            this.op=ADD;
            this.input = output;
            this.op1 = Number(this.input);
        }

        else {
            let nums = this.input.split(this.ops);
            this.op1 = Number(nums[0]);
            this.op2 = Number(nums[1]);
        }
        this.output = String(this.op(this.op1, this.op2));
        RESULT.textContent = this.output;
        this.current="done"
        // this.current = "op1";
        // this.input = this.output;
        // this.op1 = Number(this.input);
    }
}
let STATE = { ...FRESH };

// document.addEventListener("keypress", e=>{
//     let key=e.key;
//     let elem = document.querySelector("#");
//     console.log(elem);
// })
activate(NUMPAD, numpad);
activate(SPECIAL, special);
activate(OPERATE, operate);