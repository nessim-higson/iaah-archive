// lib/handlebars/base.js
var Handlebars = {};

Handlebars.VERSION = "1.0.beta.6";

Handlebars.helpers  = {};
Handlebars.partials = {};

Handlebars.registerHelper = function(name, fn, inverse) {
  if(inverse) { fn.not = inverse; }
  this.helpers[name] = fn;
};

Handlebars.registerPartial = function(name, str) {
  this.partials[name] = str;
};

Handlebars.registerHelper('helperMissing', function(arg) {
  if(arguments.length === 2) {
    return undefined;
  } else {
    throw new Error("Could not find property '" + arg + "'");
  }
});

var toString = Object.prototype.toString, functionType = "[object Function]";

Handlebars.registerHelper('blockHelperMissing', function(context, options) {
  var inverse = options.inverse || function() {}, fn = options.fn;


  var ret = "";
  var type = toString.call(context);

  if(type === functionType) { context = context.call(this); }

  if(context === true) {
    return fn(this);
  } else if(context === false || context == null) {
    return inverse(this);
  } else if(type === "[object Array]") {
    if(context.length > 0) {
      for(var i=0, j=context.length; i<j; i++) {
        ret = ret + fn(context[i]);
      }
    } else {
      ret = inverse(this);
    }
    return ret;
  } else {
    return fn(context);
  }
});

Handlebars.registerHelper('each', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var ret = "";

  if(context && context.length > 0) {
    for(var i=0, j=context.length; i<j; i++) {
      ret = ret + fn(context[i]);
    }
  } else {
    ret = inverse(this);
  }
  return ret;
});

Handlebars.registerHelper('if', function(context, options) {
  var type = toString.call(context);
  if(type === functionType) { context = context.call(this); }

  if(!context || Handlebars.Utils.isEmpty(context)) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

Handlebars.registerHelper('unless', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  options.fn = inverse;
  options.inverse = fn;

  return Handlebars.helpers['if'].call(this, context, options);
});

Handlebars.registerHelper('with', function(context, options) {
  return options.fn(context);
});

Handlebars.registerHelper('log', function(context) {
  Handlebars.log(context);
});
;
// lib/handlebars/compiler/parser.js
/* Jison generated parser */
var handlebars = (function(){

var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"root":3,"program":4,"EOF":5,"statements":6,"simpleInverse":7,"statement":8,"openInverse":9,"closeBlock":10,"openBlock":11,"mustache":12,"partial":13,"CONTENT":14,"COMMENT":15,"OPEN_BLOCK":16,"inMustache":17,"CLOSE":18,"OPEN_INVERSE":19,"OPEN_ENDBLOCK":20,"path":21,"OPEN":22,"OPEN_UNESCAPED":23,"OPEN_PARTIAL":24,"params":25,"hash":26,"param":27,"STRING":28,"INTEGER":29,"BOOLEAN":30,"hashSegments":31,"hashSegment":32,"ID":33,"EQUALS":34,"pathSegments":35,"SEP":36,"$accept":0,"$end":1},
terminals_: {2:"error",5:"EOF",14:"CONTENT",15:"COMMENT",16:"OPEN_BLOCK",18:"CLOSE",19:"OPEN_INVERSE",20:"OPEN_ENDBLOCK",22:"OPEN",23:"OPEN_UNESCAPED",24:"OPEN_PARTIAL",28:"STRING",29:"INTEGER",30:"BOOLEAN",33:"ID",34:"EQUALS",36:"SEP"},
productions_: [0,[3,2],[4,3],[4,1],[4,0],[6,1],[6,2],[8,3],[8,3],[8,1],[8,1],[8,1],[8,1],[11,3],[9,3],[10,3],[12,3],[12,3],[13,3],[13,4],[7,2],[17,3],[17,2],[17,2],[17,1],[25,2],[25,1],[27,1],[27,1],[27,1],[27,1],[26,1],[31,2],[31,1],[32,3],[32,3],[32,3],[32,3],[21,1],[35,3],[35,1]],
performAction: function anonymous(yytext,yyleng,yylineno,yy,yystate,$$,_$) {

var $0 = $$.length - 1;
switch (yystate) {
case 1: return $$[$0-1]
break;
case 2: this.$ = new yy.ProgramNode($$[$0-2], $$[$0])
break;
case 3: this.$ = new yy.ProgramNode($$[$0])
break;
case 4: this.$ = new yy.ProgramNode([])
break;
case 5: this.$ = [$$[$0]]
break;
case 6: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]
break;
case 7: this.$ = new yy.InverseNode($$[$0-2], $$[$0-1], $$[$0])
break;
case 8: this.$ = new yy.BlockNode($$[$0-2], $$[$0-1], $$[$0])
break;
case 9: this.$ = $$[$0]
break;
case 10: this.$ = $$[$0]
break;
case 11: this.$ = new yy.ContentNode($$[$0])
break;
case 12: this.$ = new yy.CommentNode($$[$0])
break;
case 13: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1])
break;
case 14: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1])
break;
case 15: this.$ = $$[$0-1]
break;
case 16: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1])
break;
case 17: this.$ = new yy.MustacheNode($$[$0-1][0], $$[$0-1][1], true)
break;
case 18: this.$ = new yy.PartialNode($$[$0-1])
break;
case 19: this.$ = new yy.PartialNode($$[$0-2], $$[$0-1])
break;
case 20:
break;
case 21: this.$ = [[$$[$0-2]].concat($$[$0-1]), $$[$0]]
break;
case 22: this.$ = [[$$[$0-1]].concat($$[$0]), null]
break;
case 23: this.$ = [[$$[$0-1]], $$[$0]]
break;
case 24: this.$ = [[$$[$0]], null]
break;
case 25: $$[$0-1].push($$[$0]); this.$ = $$[$0-1];
break;
case 26: this.$ = [$$[$0]]
break;
case 27: this.$ = $$[$0]
break;
case 28: this.$ = new yy.StringNode($$[$0])
break;
case 29: this.$ = new yy.IntegerNode($$[$0])
break;
case 30: this.$ = new yy.BooleanNode($$[$0])
break;
case 31: this.$ = new yy.HashNode($$[$0])
break;
case 32: $$[$0-1].push($$[$0]); this.$ = $$[$0-1]
break;
case 33: this.$ = [$$[$0]]
break;
case 34: this.$ = [$$[$0-2], $$[$0]]
break;
case 35: this.$ = [$$[$0-2], new yy.StringNode($$[$0])]
break;
case 36: this.$ = [$$[$0-2], new yy.IntegerNode($$[$0])]
break;
case 37: this.$ = [$$[$0-2], new yy.BooleanNode($$[$0])]
break;
case 38: this.$ = new yy.IdNode($$[$0])
break;
case 39: $$[$0-2].push($$[$0]); this.$ = $$[$0-2];
break;
case 40: this.$ = [$$[$0]]
break;
}
},
table: [{3:1,4:2,5:[2,4],6:3,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],24:[1,15]},{1:[3]},{5:[1,16]},{5:[2,3],7:17,8:18,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,19],20:[2,3],22:[1,13],23:[1,14],24:[1,15]},{5:[2,5],14:[2,5],15:[2,5],16:[2,5],19:[2,5],20:[2,5],22:[2,5],23:[2,5],24:[2,5]},{4:20,6:3,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],24:[1,15]},{4:21,6:3,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,4],22:[1,13],23:[1,14],24:[1,15]},{5:[2,9],14:[2,9],15:[2,9],16:[2,9],19:[2,9],20:[2,9],22:[2,9],23:[2,9],24:[2,9]},{5:[2,10],14:[2,10],15:[2,10],16:[2,10],19:[2,10],20:[2,10],22:[2,10],23:[2,10],24:[2,10]},{5:[2,11],14:[2,11],15:[2,11],16:[2,11],19:[2,11],20:[2,11],22:[2,11],23:[2,11],24:[2,11]},{5:[2,12],14:[2,12],15:[2,12],16:[2,12],19:[2,12],20:[2,12],22:[2,12],23:[2,12],24:[2,12]},{17:22,21:23,33:[1,25],35:24},{17:26,21:23,33:[1,25],35:24},{17:27,21:23,33:[1,25],35:24},{17:28,21:23,33:[1,25],35:24},{21:29,33:[1,25],35:24},{1:[2,1]},{6:30,8:4,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],22:[1,13],23:[1,14],24:[1,15]},{5:[2,6],14:[2,6],15:[2,6],16:[2,6],19:[2,6],20:[2,6],22:[2,6],23:[2,6],24:[2,6]},{17:22,18:[1,31],21:23,33:[1,25],35:24},{10:32,20:[1,33]},{10:34,20:[1,33]},{18:[1,35]},{18:[2,24],21:40,25:36,26:37,27:38,28:[1,41],29:[1,42],30:[1,43],31:39,32:44,33:[1,45],35:24},{18:[2,38],28:[2,38],29:[2,38],30:[2,38],33:[2,38],36:[1,46]},{18:[2,40],28:[2,40],29:[2,40],30:[2,40],33:[2,40],36:[2,40]},{18:[1,47]},{18:[1,48]},{18:[1,49]},{18:[1,50],21:51,33:[1,25],35:24},{5:[2,2],8:18,9:5,11:6,12:7,13:8,14:[1,9],15:[1,10],16:[1,12],19:[1,11],20:[2,2],22:[1,13],23:[1,14],24:[1,15]},{14:[2,20],15:[2,20],16:[2,20],19:[2,20],22:[2,20],23:[2,20],24:[2,20]},{5:[2,7],14:[2,7],15:[2,7],16:[2,7],19:[2,7],20:[2,7],22:[2,7],23:[2,7],24:[2,7]},{21:52,33:[1,25],35:24},{5:[2,8],14:[2,8],15:[2,8],16:[2,8],19:[2,8],20:[2,8],22:[2,8],23:[2,8],24:[2,8]},{14:[2,14],15:[2,14],16:[2,14],19:[2,14],20:[2,14],22:[2,14],23:[2,14],24:[2,14]},{18:[2,22],21:40,26:53,27:54,28:[1,41],29:[1,42],30:[1,43],31:39,32:44,33:[1,45],35:24},{18:[2,23]},{18:[2,26],28:[2,26],29:[2,26],30:[2,26],33:[2,26]},{18:[2,31],32:55,33:[1,56]},{18:[2,27],28:[2,27],29:[2,27],30:[2,27],33:[2,27]},{18:[2,28],28:[2,28],29:[2,28],30:[2,28],33:[2,28]},{18:[2,29],28:[2,29],29:[2,29],30:[2,29],33:[2,29]},{18:[2,30],28:[2,30],29:[2,30],30:[2,30],33:[2,30]},{18:[2,33],33:[2,33]},{18:[2,40],28:[2,40],29:[2,40],30:[2,40],33:[2,40],34:[1,57],36:[2,40]},{33:[1,58]},{14:[2,13],15:[2,13],16:[2,13],19:[2,13],20:[2,13],22:[2,13],23:[2,13],24:[2,13]},{5:[2,16],14:[2,16],15:[2,16],16:[2,16],19:[2,16],20:[2,16],22:[2,16],23:[2,16],24:[2,16]},{5:[2,17],14:[2,17],15:[2,17],16:[2,17],19:[2,17],20:[2,17],22:[2,17],23:[2,17],24:[2,17]},{5:[2,18],14:[2,18],15:[2,18],16:[2,18],19:[2,18],20:[2,18],22:[2,18],23:[2,18],24:[2,18]},{18:[1,59]},{18:[1,60]},{18:[2,21]},{18:[2,25],28:[2,25],29:[2,25],30:[2,25],33:[2,25]},{18:[2,32],33:[2,32]},{34:[1,57]},{21:61,28:[1,62],29:[1,63],30:[1,64],33:[1,25],35:24},{18:[2,39],28:[2,39],29:[2,39],30:[2,39],33:[2,39],36:[2,39]},{5:[2,19],14:[2,19],15:[2,19],16:[2,19],19:[2,19],20:[2,19],22:[2,19],23:[2,19],24:[2,19]},{5:[2,15],14:[2,15],15:[2,15],16:[2,15],19:[2,15],20:[2,15],22:[2,15],23:[2,15],24:[2,15]},{18:[2,34],33:[2,34]},{18:[2,35],33:[2,35]},{18:[2,36],33:[2,36]},{18:[2,37],33:[2,37]}],
defaultActions: {16:[2,1],37:[2,23],53:[2,21]},
parseError: function parseError(str, hash) {
    throw new Error(str);
},
parse: function parse(input) {
    var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    this.lexer.setInput(input);
    this.lexer.yy = this.yy;
    this.yy.lexer = this.lexer;
    if (typeof this.lexer.yylloc == "undefined")
        this.lexer.yylloc = {};
    var yyloc = this.lexer.yylloc;
    lstack.push(yyloc);
    if (typeof this.yy.parseError === "function")
        this.parseError = this.yy.parseError;
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    function lex() {
        var token;
        token = self.lexer.lex() || 1;
        if (typeof token !== "number") {
            token = self.symbols_[token] || token;
        }
        return token;
    }
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol == null)
                symbol = lex();
            action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
            if (!recovering) {
                expected = [];
                for (p in table[state])
                    if (this.terminals_[p] && p > 2) {
                        expected.push("'" + this.terminals_[p] + "'");
                    }
                var errStr = "";
                if (this.lexer.showPosition) {
                    errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + this.terminals_[symbol] + "'";
                } else {
                    errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1?"end of input":"'" + (this.terminals_[symbol] || symbol) + "'");
                }
                this.parseError(errStr, {text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected});
            }
        }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(this.lexer.yytext);
            lstack.push(this.lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = this.lexer.yyleng;
                yytext = this.lexer.yytext;
                yylineno = this.lexer.yylineno;
                yyloc = this.lexer.yylloc;
                if (recovering > 0)
                    recovering--;
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column};
            r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
            if (typeof r !== "undefined") {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}
};/* Jison generated lexer */
var lexer = (function(){

var lexer = ({EOF:1,
parseError:function parseError(str, hash) {
        if (this.yy.parseError) {
            this.yy.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },
setInput:function (input) {
        this._input = input;
        this._more = this._less = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {first_line:1,first_column:0,last_line:1,last_column:0};
        return this;
    },
input:function () {
        var ch = this._input[0];
        this.yytext+=ch;
        this.yyleng++;
        this.match+=ch;
        this.matched+=ch;
        var lines = ch.match(/\n/);
        if (lines) this.yylineno++;
        this._input = this._input.slice(1);
        return ch;
    },
unput:function (ch) {
        this._input = ch + this._input;
        return this;
    },
more:function () {
        this._more = true;
        return this;
    },
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20)+(next.length > 20 ? '...':'')).replace(/\n/g, "");
    },
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c+"^";
    },
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) this.done = true;

        var token,
            match,
            col,
            lines;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i=0;i < rules.length; i++) {
            match = this._input.match(this.rules[rules[i]]);
            if (match) {
                lines = match[0].match(/\n.*/g);
                if (lines) this.yylineno += lines.length;
                this.yylloc = {first_line: this.yylloc.last_line,
                               last_line: this.yylineno+1,
                               first_column: this.yylloc.last_column,
                               last_column: lines ? lines[lines.length-1].length-1 : this.yylloc.last_column + match[0].length}
                this.yytext += match[0];
                this.match += match[0];
                this.matches = match;
                this.yyleng = this.yytext.length;
                this._more = false;
                this._input = this._input.slice(match[0].length);
                this.matched += match[0];
                token = this.performAction.call(this, this.yy, this, rules[i],this.conditionStack[this.conditionStack.length-1]);
                if (token) return token;
                else return;
            }
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            this.parseError('Lexical error on line '+(this.yylineno+1)+'. Unrecognized text.\n'+this.showPosition(),
                    {text: "", token: null, line: this.yylineno});
        }
    },
lex:function lex() {
        var r = this.next();
        if (typeof r !== 'undefined') {
            return r;
        } else {
            return this.lex();
        }
    },
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },
popState:function popState() {
        return this.conditionStack.pop();
    },
_currentRules:function _currentRules() {
        return this.conditions[this.conditionStack[this.conditionStack.length-1]].rules;
    },
topState:function () {
        return this.conditionStack[this.conditionStack.length-2];
    },
pushState:function begin(condition) {
        this.begin(condition);
    }});
lexer.performAction = function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {

var YYSTATE=YY_START
switch($avoiding_name_collisions) {
case 0:
                                   if(yy_.yytext.slice(-1) !== "\\") this.begin("mu");
                                   if(yy_.yytext.slice(-1) === "\\") yy_.yytext = yy_.yytext.substr(0,yy_.yyleng-1), this.begin("emu");
                                   if(yy_.yytext) return 14;

break;
case 1: return 14;
break;
case 2: this.popState(); return 14;
break;
case 3: return 24;
break;
case 4: return 16;
break;
case 5: return 20;
break;
case 6: return 19;
break;
case 7: return 19;
break;
case 8: return 23;
break;
case 9: return 23;
break;
case 10: yy_.yytext = yy_.yytext.substr(3,yy_.yyleng-5); this.popState(); return 15;
break;
case 11: return 22;
break;
case 12: return 34;
break;
case 13: return 33;
break;
case 14: return 33;
break;
case 15: return 36;
break;
case 16: /*ignore whitespace*/
break;
case 17: this.popState(); return 18;
break;
case 18: this.popState(); return 18;
break;
case 19: yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2).replace(/\\"/g,'"'); return 28;
break;
case 20: return 30;
break;
case 21: return 30;
break;
case 22: return 29;
break;
case 23: return 33;
break;
case 24: yy_.yytext = yy_.yytext.substr(1, yy_.yyleng-2); return 33;
break;
case 25: return 'INVALID';
break;
case 26: return 5;
break;
}
};
lexer.rules = [/^[^\x00]*?(?=(\{\{))/,/^[^\x00]+/,/^[^\x00]{2,}?(?=(\{\{))/,/^\{\{>/,/^\{\{#/,/^\{\{\//,/^\{\{\^/,/^\{\{\s*else\b/,/^\{\{\{/,/^\{\{&/,/^\{\{![\s\S]*?\}\}/,/^\{\{/,/^=/,/^\.(?=[} ])/,/^\.\./,/^[\/.]/,/^\s+/,/^\}\}\}/,/^\}\}/,/^"(\\["]|[^"])*"/,/^true(?=[}\s])/,/^false(?=[}\s])/,/^[0-9]+(?=[}\s])/,/^[a-zA-Z0-9_$-]+(?=[=}\s\/.])/,/^\[[^\]]*\]/,/^./,/^$/];
lexer.conditions = {"mu":{"rules":[3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],"inclusive":false},"emu":{"rules":[2],"inclusive":false},"INITIAL":{"rules":[0,1,26],"inclusive":true}};return lexer;})()
parser.lexer = lexer;
return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = handlebars;
exports.parse = function () { return handlebars.parse.apply(handlebars, arguments); }
exports.main = function commonjsMain(args) {
    if (!args[1])
        throw new Error('Usage: '+args[0]+' FILE');
    if (typeof process !== 'undefined') {
        var source = require('fs').readFileSync(require('path').join(process.cwd(), args[1]), "utf8");
    } else {
        var cwd = require("file").path(require("file").cwd());
        var source = cwd.join(args[1]).read({charset: "utf-8"});
    }
    return exports.parser.parse(source);
}
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
}
};
;
// lib/handlebars/compiler/base.js
Handlebars.Parser = handlebars;

Handlebars.parse = function(string) {
  Handlebars.Parser.yy = Handlebars.AST;
  return Handlebars.Parser.parse(string);
};

Handlebars.print = function(ast) {
  return new Handlebars.PrintVisitor().accept(ast);
};

Handlebars.logger = {
  DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, level: 3,

  // override in the host environment
  log: function(level, str) {}
};

Handlebars.log = function(level, str) { Handlebars.logger.log(level, str); };
;
// lib/handlebars/compiler/ast.js
(function() {

  Handlebars.AST = {};

  Handlebars.AST.ProgramNode = function(statements, inverse) {
    this.type = "program";
    this.statements = statements;
    if(inverse) { this.inverse = new Handlebars.AST.ProgramNode(inverse); }
  };

  Handlebars.AST.MustacheNode = function(params, hash, unescaped) {
    this.type = "mustache";
    this.id = params[0];
    this.params = params.slice(1);
    this.hash = hash;
    this.escaped = !unescaped;
  };

  Handlebars.AST.PartialNode = function(id, context) {
    this.type    = "partial";

    // TODO: disallow complex IDs

    this.id      = id;
    this.context = context;
  };

  var verifyMatch = function(open, close) {
    if(open.original !== close.original) {
      throw new Handlebars.Exception(open.original + " doesn't match " + close.original);
    }
  };

  Handlebars.AST.BlockNode = function(mustache, program, close) {
    verifyMatch(mustache.id, close);
    this.type = "block";
    this.mustache = mustache;
    this.program  = program;
  };

  Handlebars.AST.InverseNode = function(mustache, program, close) {
    verifyMatch(mustache.id, close);
    this.type = "inverse";
    this.mustache = mustache;
    this.program  = program;
  };

  Handlebars.AST.ContentNode = function(string) {
    this.type = "content";
    this.string = string;
  };

  Handlebars.AST.HashNode = function(pairs) {
    this.type = "hash";
    this.pairs = pairs;
  };

  Handlebars.AST.IdNode = function(parts) {
    this.type = "ID";
    this.original = parts.join(".");

    var dig = [], depth = 0;

    for(var i=0,l=parts.length; i<l; i++) {
      var part = parts[i];

      if(part === "..") { depth++; }
      else if(part === "." || part === "this") { this.isScoped = true; }
      else { dig.push(part); }
    }

    this.parts    = dig;
    this.string   = dig.join('.');
    this.depth    = depth;
    this.isSimple = (dig.length === 1) && (depth === 0);
  };

  Handlebars.AST.StringNode = function(string) {
    this.type = "STRING";
    this.string = string;
  };

  Handlebars.AST.IntegerNode = function(integer) {
    this.type = "INTEGER";
    this.integer = integer;
  };

  Handlebars.AST.BooleanNode = function(bool) {
    this.type = "BOOLEAN";
    this.bool = bool;
  };

  Handlebars.AST.CommentNode = function(comment) {
    this.type = "comment";
    this.comment = comment;
  };

})();;
// lib/handlebars/utils.js
Handlebars.Exception = function(message) {
  var tmp = Error.prototype.constructor.apply(this, arguments);

  for (var p in tmp) {
    if (tmp.hasOwnProperty(p)) { this[p] = tmp[p]; }
  }

  this.message = tmp.message;
};
Handlebars.Exception.prototype = new Error;

// Build out our basic SafeString type
Handlebars.SafeString = function(string) {
  this.string = string;
};
Handlebars.SafeString.prototype.toString = function() {
  return this.string.toString();
};

(function() {
  var escape = {
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };

  var badChars = /&(?!\w+;)|[<>"'`]/g;
  var possible = /[&<>"'`]/;

  var escapeChar = function(chr) {
    return escape[chr] || "&amp;";
  };

  Handlebars.Utils = {
    escapeExpression: function(string) {
      // don't escape SafeStrings, since they're already safe
      if (string instanceof Handlebars.SafeString) {
        return string.toString();
      } else if (string == null || string === false) {
        return "";
      }

      if(!possible.test(string)) { return string; }
      return string.replace(badChars, escapeChar);
    },

    isEmpty: function(value) {
      if (typeof value === "undefined") {
        return true;
      } else if (value === null) {
        return true;
      } else if (value === false) {
        return true;
      } else if(Object.prototype.toString.call(value) === "[object Array]" && value.length === 0) {
        return true;
      } else {
        return false;
      }
    }
  };
})();;
// lib/handlebars/compiler/compiler.js
Handlebars.Compiler = function() {};
Handlebars.JavaScriptCompiler = function() {};

(function(Compiler, JavaScriptCompiler) {
  Compiler.OPCODE_MAP = {
    appendContent: 1,
    getContext: 2,
    lookupWithHelpers: 3,
    lookup: 4,
    append: 5,
    invokeMustache: 6,
    appendEscaped: 7,
    pushString: 8,
    truthyOrFallback: 9,
    functionOrFallback: 10,
    invokeProgram: 11,
    invokePartial: 12,
    push: 13,
    assignToHash: 15,
    pushStringParam: 16
  };

  Compiler.MULTI_PARAM_OPCODES = {
    appendContent: 1,
    getContext: 1,
    lookupWithHelpers: 2,
    lookup: 1,
    invokeMustache: 3,
    pushString: 1,
    truthyOrFallback: 1,
    functionOrFallback: 1,
    invokeProgram: 3,
    invokePartial: 1,
    push: 1,
    assignToHash: 1,
    pushStringParam: 1
  };

  Compiler.DISASSEMBLE_MAP = {};

  for(var prop in Compiler.OPCODE_MAP) {
    var value = Compiler.OPCODE_MAP[prop];
    Compiler.DISASSEMBLE_MAP[value] = prop;
  }

  Compiler.multiParamSize = function(code) {
    return Compiler.MULTI_PARAM_OPCODES[Compiler.DISASSEMBLE_MAP[code]];
  };

  Compiler.prototype = {
    compiler: Compiler,

    disassemble: function() {
      var opcodes = this.opcodes, opcode, nextCode;
      var out = [], str, name, value;

      for(var i=0, l=opcodes.length; i<l; i++) {
        opcode = opcodes[i];

        if(opcode === 'DECLARE') {
          name = opcodes[++i];
          value = opcodes[++i];
          out.push("DECLARE " + name + " = " + value);
        } else {
          str = Compiler.DISASSEMBLE_MAP[opcode];

          var extraParams = Compiler.multiParamSize(opcode);
          var codes = [];

          for(var j=0; j<extraParams; j++) {
            nextCode = opcodes[++i];

            if(typeof nextCode === "string") {
              nextCode = "\"" + nextCode.replace("\n", "\\n") + "\"";
            }

            codes.push(nextCode);
          }

          str = str + " " + codes.join(" ");

          out.push(str);
        }
      }

      return out.join("\n");
    },

    guid: 0,

    compile: function(program, options) {
      this.children = [];
      this.depths = {list: []};
      this.options = options;

      // These changes will propagate to the other compiler components
      var knownHelpers = this.options.knownHelpers;
      this.options.knownHelpers = {
        'helperMissing': true,
        'blockHelperMissing': true,
        'each': true,
        'if': true,
        'unless': true,
        'with': true,
        'log': true
      };
      if (knownHelpers) {
        for (var name in knownHelpers) {
          this.options.knownHelpers[name] = knownHelpers[name];
        }
      }

      return this.program(program);
    },

    accept: function(node) {
      return this[node.type](node);
    },

    program: function(program) {
      var statements = program.statements, statement;
      this.opcodes = [];

      for(var i=0, l=statements.length; i<l; i++) {
        statement = statements[i];
        this[statement.type](statement);
      }
      this.isSimple = l === 1;

      this.depths.list = this.depths.list.sort(function(a, b) {
        return a - b;
      });

      return this;
    },

    compileProgram: function(program) {
      var result = new this.compiler().compile(program, this.options);
      var guid = this.guid++;

      this.usePartial = this.usePartial || result.usePartial;

      this.children[guid] = result;

      for(var i=0, l=result.depths.list.length; i<l; i++) {
        depth = result.depths.list[i];

        if(depth < 2) { continue; }
        else { this.addDepth(depth - 1); }
      }

      return guid;
    },

    block: function(block) {
      var mustache = block.mustache;
      var depth, child, inverse, inverseGuid;

      var params = this.setupStackForMustache(mustache);

      var programGuid = this.compileProgram(block.program);

      if(block.program.inverse) {
        inverseGuid = this.compileProgram(block.program.inverse);
        this.declare('inverse', inverseGuid);
      }

      this.opcode('invokeProgram', programGuid, params.length, !!mustache.hash);
      this.declare('inverse', null);
      this.opcode('append');
    },

    inverse: function(block) {
      var params = this.setupStackForMustache(block.mustache);

      var programGuid = this.compileProgram(block.program);

      this.declare('inverse', programGuid);

      this.opcode('invokeProgram', null, params.length, !!block.mustache.hash);
      this.declare('inverse', null);
      this.opcode('append');
    },

    hash: function(hash) {
      var pairs = hash.pairs, pair, val;

      this.opcode('push', '{}');

      for(var i=0, l=pairs.length; i<l; i++) {
        pair = pairs[i];
        val  = pair[1];

        this.accept(val);
        this.opcode('assignToHash', pair[0]);
      }
    },

    partial: function(partial) {
      var id = partial.id;
      this.usePartial = true;

      if(partial.context) {
        this.ID(partial.context);
      } else {
        this.opcode('push', 'depth0');
      }

      this.opcode('invokePartial', id.original);
      this.opcode('append');
    },

    content: function(content) {
      this.opcode('appendContent', content.string);
    },

    mustache: function(mustache) {
      var params = this.setupStackForMustache(mustache);

      this.opcode('invokeMustache', params.length, mustache.id.original, !!mustache.hash);

      if(mustache.escaped && !this.options.noEscape) {
        this.opcode('appendEscaped');
      } else {
        this.opcode('append');
      }
    },

    ID: function(id) {
      this.addDepth(id.depth);

      this.opcode('getContext', id.depth);

      this.opcode('lookupWithHelpers', id.parts[0] || null, id.isScoped || false);

      for(var i=1, l=id.parts.length; i<l; i++) {
        this.opcode('lookup', id.parts[i]);
      }
    },

    STRING: function(string) {
      this.opcode('pushString', string.string);
    },

    INTEGER: function(integer) {
      this.opcode('push', integer.integer);
    },

    BOOLEAN: function(bool) {
      this.opcode('push', bool.bool);
    },

    comment: function() {},

    // HELPERS
    pushParams: function(params) {
      var i = params.length, param;

      while(i--) {
        param = params[i];

        if(this.options.stringParams) {
          if(param.depth) {
            this.addDepth(param.depth);
          }

          this.opcode('getContext', param.depth || 0);
          this.opcode('pushStringParam', param.string);
        } else {
          this[param.type](param);
        }
      }
    },

    opcode: function(name, val1, val2, val3) {
      this.opcodes.push(Compiler.OPCODE_MAP[name]);
      if(val1 !== undefined) { this.opcodes.push(val1); }
      if(val2 !== undefined) { this.opcodes.push(val2); }
      if(val3 !== undefined) { this.opcodes.push(val3); }
    },

    declare: function(name, value) {
      this.opcodes.push('DECLARE');
      this.opcodes.push(name);
      this.opcodes.push(value);
    },

    addDepth: function(depth) {
      if(depth === 0) { return; }

      if(!this.depths[depth]) {
        this.depths[depth] = true;
        this.depths.list.push(depth);
      }
    },

    setupStackForMustache: function(mustache) {
      var params = mustache.params;

      this.pushParams(params);

      if(mustache.hash) {
        this.hash(mustache.hash);
      }

      this.ID(mustache.id);

      return params;
    }
  };

  JavaScriptCompiler.prototype = {
    // PUBLIC API: You can override these methods in a subclass to provide
    // alternative compiled forms for name lookup and buffering semantics
    nameLookup: function(parent, name, type) {
			if (/^[0-9]+$/.test(name)) {
        return parent + "[" + name + "]";
      } else if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
	    	return parent + "." + name;
			}
			else {
				return parent + "['" + name + "']";
      }
    },

    appendToBuffer: function(string) {
      if (this.environment.isSimple) {
        return "return " + string + ";";
      } else {
        return "buffer += " + string + ";";
      }
    },

    initializeBuffer: function() {
      return this.quotedString("");
    },

    namespace: "Handlebars",
    // END PUBLIC API

    compile: function(environment, options, context, asObject) {
      this.environment = environment;
      this.options = options || {};

      this.name = this.environment.name;
      this.isChild = !!context;
      this.context = context || {
        programs: [],
        aliases: { self: 'this' },
        registers: {list: []}
      };

      this.preamble();

      this.stackSlot = 0;
      this.stackVars = [];

      this.compileChildren(environment, options);

      var opcodes = environment.opcodes, opcode;

      this.i = 0;

      for(l=opcodes.length; this.i<l; this.i++) {
        opcode = this.nextOpcode(0);

        if(opcode[0] === 'DECLARE') {
          this.i = this.i + 2;
          this[opcode[1]] = opcode[2];
        } else {
          this.i = this.i + opcode[1].length;
          this[opcode[0]].apply(this, opcode[1]);
        }
      }

      return this.createFunctionContext(asObject);
    },

    nextOpcode: function(n) {
      var opcodes = this.environment.opcodes, opcode = opcodes[this.i + n], name, val;
      var extraParams, codes;

      if(opcode === 'DECLARE') {
        name = opcodes[this.i + 1];
        val  = opcodes[this.i + 2];
        return ['DECLARE', name, val];
      } else {
        name = Compiler.DISASSEMBLE_MAP[opcode];

        extraParams = Compiler.multiParamSize(opcode);
        codes = [];

        for(var j=0; j<extraParams; j++) {
          codes.push(opcodes[this.i + j + 1 + n]);
        }

        return [name, codes];
      }
    },

    eat: function(opcode) {
      this.i = this.i + opcode.length;
    },

    preamble: function() {
      var out = [];

      // this register will disambiguate helper lookup from finding a function in
      // a context. This is necessary for mustache compatibility, which requires
      // that context functions in blocks are evaluated by blockHelperMissing, and
      // then proceed as if the resulting value was provided to blockHelperMissing.
      this.useRegister('foundHelper');

      if (!this.isChild) {
        var namespace = this.namespace;
        var copies = "helpers = helpers || " + namespace + ".helpers;";
        if(this.environment.usePartial) { copies = copies + " partials = partials || " + namespace + ".partials;"; }
        out.push(copies);
      } else {
        out.push('');
      }

      if (!this.environment.isSimple) {
        out.push(", buffer = " + this.initializeBuffer());
      } else {
        out.push("");
      }

      // track the last context pushed into place to allow skipping the
      // getContext opcode when it would be a noop
      this.lastContext = 0;
      this.source = out;
    },

    createFunctionContext: function(asObject) {
      var locals = this.stackVars;
      if (!this.isChild) {
        locals = locals.concat(this.context.registers.list);
      }

      if(locals.length > 0) {
        this.source[1] = this.source[1] + ", " + locals.join(", ");
      }

      // Generate minimizer alias mappings
      if (!this.isChild) {
        var aliases = []
        for (var alias in this.context.aliases) {
          this.source[1] = this.source[1] + ', ' + alias + '=' + this.context.aliases[alias];
        }
      }

      if (this.source[1]) {
        this.source[1] = "var " + this.source[1].substring(2) + ";";
      }

      // Merge children
      if (!this.isChild) {
        this.source[1] += '\n' + this.context.programs.join('\n') + '\n';
      }

      if (!this.environment.isSimple) {
        this.source.push("return buffer;");
      }

      var params = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];

      for(var i=0, l=this.environment.depths.list.length; i<l; i++) {
        params.push("depth" + this.environment.depths.list[i]);
      }

      if (asObject) {
        params.push(this.source.join("\n  "));

        return Function.apply(this, params);
      } else {
        var functionSource = 'function ' + (this.name || '') + '(' + params.join(',') + ') {\n  ' + this.source.join("\n  ") + '}';
        Handlebars.log(Handlebars.logger.DEBUG, functionSource + "\n\n");
        return functionSource;
      }
    },

    appendContent: function(content) {
      this.source.push(this.appendToBuffer(this.quotedString(content)));
    },

    append: function() {
      var local = this.popStack();
      this.source.push("if(" + local + " || " + local + " === 0) { " + this.appendToBuffer(local) + " }");
      if (this.environment.isSimple) {
        this.source.push("else { " + this.appendToBuffer("''") + " }");
      }
    },

    appendEscaped: function() {
      var opcode = this.nextOpcode(1), extra = "";
      this.context.aliases.escapeExpression = 'this.escapeExpression';

      if(opcode[0] === 'appendContent') {
        extra = " + " + this.quotedString(opcode[1][0]);
        this.eat(opcode);
      }

      this.source.push(this.appendToBuffer("escapeExpression(" + this.popStack() + ")" + extra));
    },

    getContext: function(depth) {
      if(this.lastContext !== depth) {
        this.lastContext = depth;
      }
    },

    lookupWithHelpers: function(name, isScoped) {
      if(name) {
        var topStack = this.nextStack();

        this.usingKnownHelper = false;

        var toPush;
        if (!isScoped && this.options.knownHelpers[name]) {
          toPush = topStack + " = " + this.nameLookup('helpers', name, 'helper');
          this.usingKnownHelper = true;
        } else if (isScoped || this.options.knownHelpersOnly) {
          toPush = topStack + " = " + this.nameLookup('depth' + this.lastContext, name, 'context');
        } else {
          this.register('foundHelper', this.nameLookup('helpers', name, 'helper'));
          toPush = topStack + " = foundHelper || " + this.nameLookup('depth' + this.lastContext, name, 'context');
        }

        toPush += ';';
        this.source.push(toPush);
      } else {
        this.pushStack('depth' + this.lastContext);
      }
    },

    lookup: function(name) {
      var topStack = this.topStack();
      this.source.push(topStack + " = (" + topStack + " === null || " + topStack + " === undefined || " + topStack + " === false ? " +
 				topStack + " : " + this.nameLookup(topStack, name, 'context') + ");");
    },

    pushStringParam: function(string) {
      this.pushStack('depth' + this.lastContext);
      this.pushString(string);
    },

    pushString: function(string) {
      this.pushStack(this.quotedString(string));
    },

    push: function(name) {
      this.pushStack(name);
    },

    invokeMustache: function(paramSize, original, hasHash) {
      this.populateParams(paramSize, this.quotedString(original), "{}", null, hasHash, function(nextStack, helperMissingString, id) {
        if (!this.usingKnownHelper) {
          this.context.aliases.helperMissing = 'helpers.helperMissing';
          this.context.aliases.undef = 'void 0';
          this.source.push("else if(" + id + "=== undef) { " + nextStack + " = helperMissing.call(" + helperMissingString + "); }");
          if (nextStack !== id) {
            this.source.push("else { " + nextStack + " = " + id + "; }");
          }
        }
      });
    },

    invokeProgram: function(guid, paramSize, hasHash) {
      var inverse = this.programExpression(this.inverse);
      var mainProgram = this.programExpression(guid);

      this.populateParams(paramSize, null, mainProgram, inverse, hasHash, function(nextStack, helperMissingString, id) {
        if (!this.usingKnownHelper) {
          this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';
          this.source.push("else { " + nextStack + " = blockHelperMissing.call(" + helperMissingString + "); }");
        }
      });
    },

    populateParams: function(paramSize, helperId, program, inverse, hasHash, fn) {
      var needsRegister = hasHash || this.options.stringParams || inverse || this.options.data;
      var id = this.popStack(), nextStack;
      var params = [], param, stringParam, stringOptions;

      if (needsRegister) {
        this.register('tmp1', program);
        stringOptions = 'tmp1';
      } else {
        stringOptions = '{ hash: {} }';
      }

      if (needsRegister) {
        var hash = (hasHash ? this.popStack() : '{}');
        this.source.push('tmp1.hash = ' + hash + ';');
      }

      if(this.options.stringParams) {
        this.source.push('tmp1.contexts = [];');
      }

      for(var i=0; i<paramSize; i++) {
        param = this.popStack();
        params.push(param);

        if(this.options.stringParams) {
          this.source.push('tmp1.contexts.push(' + this.popStack() + ');');
        }
      }

      if(inverse) {
        this.source.push('tmp1.fn = tmp1;');
        this.source.push('tmp1.inverse = ' + inverse + ';');
      }

      if(this.options.data) {
        this.source.push('tmp1.data = data;');
      }

      params.push(stringOptions);

      this.populateCall(params, id, helperId || id, fn, program !== '{}');
    },

    populateCall: function(params, id, helperId, fn, program) {
      var paramString = ["depth0"].concat(params).join(", ");
      var helperMissingString = ["depth0"].concat(helperId).concat(params).join(", ");

      var nextStack = this.nextStack();

      if (this.usingKnownHelper) {
        this.source.push(nextStack + " = " + id + ".call(" + paramString + ");");
      } else {
        this.context.aliases.functionType = '"function"';
        var condition = program ? "foundHelper && " : ""
        this.source.push("if(" + condition + "typeof " + id + " === functionType) { " + nextStack + " = " + id + ".call(" + paramString + "); }");
      }
      fn.call(this, nextStack, helperMissingString, id);
      this.usingKnownHelper = false;
    },

    invokePartial: function(context) {
      params = [this.nameLookup('partials', context, 'partial'), "'" + context + "'", this.popStack(), "helpers", "partials"];

      if (this.options.data) {
        params.push("data");
      }

      this.pushStack("self.invokePartial(" + params.join(", ") + ");");
    },

    assignToHash: function(key) {
      var value = this.popStack();
      var hash = this.topStack();

      this.source.push(hash + "['" + key + "'] = " + value + ";");
    },

    // HELPERS

    compiler: JavaScriptCompiler,

    compileChildren: function(environment, options) {
      var children = environment.children, child, compiler;

      for(var i=0, l=children.length; i<l; i++) {
        child = children[i];
        compiler = new this.compiler();

        this.context.programs.push('');     // Placeholder to prevent name conflicts for nested children
        var index = this.context.programs.length;
        child.index = index;
        child.name = 'program' + index;
        this.context.programs[index] = compiler.compile(child, options, this.context);
      }
    },

    programExpression: function(guid) {
      if(guid == null) { return "self.noop"; }

      var child = this.environment.children[guid],
          depths = child.depths.list;
      var programParams = [child.index, child.name, "data"];

      for(var i=0, l = depths.length; i<l; i++) {
        depth = depths[i];

        if(depth === 1) { programParams.push("depth0"); }
        else { programParams.push("depth" + (depth - 1)); }
      }

      if(depths.length === 0) {
        return "self.program(" + programParams.join(", ") + ")";
      } else {
        programParams.shift();
        return "self.programWithDepth(" + programParams.join(", ") + ")";
      }
    },

    register: function(name, val) {
      this.useRegister(name);
      this.source.push(name + " = " + val + ";");
    },

    useRegister: function(name) {
      if(!this.context.registers[name]) {
        this.context.registers[name] = true;
        this.context.registers.list.push(name);
      }
    },

    pushStack: function(item) {
      this.source.push(this.nextStack() + " = " + item + ";");
      return "stack" + this.stackSlot;
    },

    nextStack: function() {
      this.stackSlot++;
      if(this.stackSlot > this.stackVars.length) { this.stackVars.push("stack" + this.stackSlot); }
      return "stack" + this.stackSlot;
    },

    popStack: function() {
      return "stack" + this.stackSlot--;
    },

    topStack: function() {
      return "stack" + this.stackSlot;
    },

    quotedString: function(str) {
      return '"' + str
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r') + '"';
    }
  };

  var reservedWords = (
    "break else new var" +
    " case finally return void" +
    " catch for switch while" +
    " continue function this with" +
    " default if throw" +
    " delete in try" +
    " do instanceof typeof" +
    " abstract enum int short" +
    " boolean export interface static" +
    " byte extends long super" +
    " char final native synchronized" +
    " class float package throws" +
    " const goto private transient" +
    " debugger implements protected volatile" +
    " double import public let yield"
  ).split(" ");

  var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

  for(var i=0, l=reservedWords.length; i<l; i++) {
    compilerWords[reservedWords[i]] = true;
  }

	JavaScriptCompiler.isValidJavaScriptVariableName = function(name) {
		if(!JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(name)) {
			return true;
		}
		return false;
	}

})(Handlebars.Compiler, Handlebars.JavaScriptCompiler);

Handlebars.precompile = function(string, options) {
  options = options || {};

  var ast = Handlebars.parse(string);
  var environment = new Handlebars.Compiler().compile(ast, options);
  return new Handlebars.JavaScriptCompiler().compile(environment, options);
};

Handlebars.compile = function(string, options) {
  options = options || {};

  var compiled;
  function compile() {
    var ast = Handlebars.parse(string);
    var environment = new Handlebars.Compiler().compile(ast, options);
    var templateSpec = new Handlebars.JavaScriptCompiler().compile(environment, options, undefined, true);
    return Handlebars.template(templateSpec);
  }

  // Template is only compiled on first use and cached after that point.
  return function(context, options) {
    if (!compiled) {
      compiled = compile();
    }
    return compiled.call(this, context, options);
  };
};
;
// lib/handlebars/runtime.js
Handlebars.VM = {
  template: function(templateSpec) {
    // Just add water
    var container = {
      escapeExpression: Handlebars.Utils.escapeExpression,
      invokePartial: Handlebars.VM.invokePartial,
      programs: [],
      program: function(i, fn, data) {
        var programWrapper = this.programs[i];
        if(data) {
          return Handlebars.VM.program(fn, data);
        } else if(programWrapper) {
          return programWrapper;
        } else {
          programWrapper = this.programs[i] = Handlebars.VM.program(fn);
          return programWrapper;
        }
      },
      programWithDepth: Handlebars.VM.programWithDepth,
      noop: Handlebars.VM.noop
    };

    return function(context, options) {
      options = options || {};
      return templateSpec.call(container, Handlebars, context, options.helpers, options.partials, options.data);
    };
  },

  programWithDepth: function(fn, data, $depth) {
    var args = Array.prototype.slice.call(arguments, 2);

    return function(context, options) {
      options = options || {};

      return fn.apply(this, [context, options.data || data].concat(args));
    };
  },
  program: function(fn, data) {
    return function(context, options) {
      options = options || {};

      return fn(context, options.data || data);
    };
  },
  noop: function() { return ""; },
  invokePartial: function(partial, name, context, helpers, partials, data) {
    options = { helpers: helpers, partials: partials, data: data };

    if(partial === undefined) {
      throw new Handlebars.Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    } else if (!Handlebars.compile) {
      throw new Handlebars.Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    } else {
      partials[name] = Handlebars.compile(partial);
      return partials[name](context, options);
    }
  }
};

Handlebars.template = Handlebars.VM.template;
;
/* Modernizr 2.5.3 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-csstransitions-svg-svgclippaths-touch-cssclasses-teststyles-testprop-testallprops-prefixes-domprefixes
 */
;window.Modernizr=function(a,b,c){function A(a){j.cssText=a}function B(a,b){return A(m.join(a+";")+(b||""))}function C(a,b){return typeof a===b}function D(a,b){return!!~(""+a).indexOf(b)}function E(a,b){for(var d in a)if(j[a[d]]!==c)return b=="pfx"?a[d]:!0;return!1}function F(a,b,d){for(var e in a){var f=b[a[e]];if(f!==c)return d===!1?a[e]:C(f,"function")?f.bind(d||b):f}return!1}function G(a,b,c){var d=a.charAt(0).toUpperCase()+a.substr(1),e=(a+" "+o.join(d+" ")+d).split(" ");return C(b,"string")||C(b,"undefined")?E(e,b):(e=(a+" "+p.join(d+" ")+d).split(" "),F(e,b,c))}var d="2.5.3",e={},f=!0,g=b.documentElement,h="modernizr",i=b.createElement(h),j=i.style,k,l={}.toString,m=" -webkit- -moz- -o- -ms- ".split(" "),n="Webkit Moz O ms",o=n.split(" "),p=n.toLowerCase().split(" "),q={svg:"http://www.w3.org/2000/svg"},r={},s={},t={},u=[],v=u.slice,w,x=function(a,c,d,e){var f,i,j,k=b.createElement("div"),l=b.body,m=l?l:b.createElement("body");if(parseInt(d,10))while(d--)j=b.createElement("div"),j.id=e?e[d]:h+(d+1),k.appendChild(j);return f=["&#173;","<style>",a,"</style>"].join(""),k.id=h,(l?k:m).innerHTML+=f,m.appendChild(k),l||(m.style.background="",g.appendChild(m)),i=c(k,a),l?k.parentNode.removeChild(k):m.parentNode.removeChild(m),!!i},y={}.hasOwnProperty,z;!C(y,"undefined")&&!C(y.call,"undefined")?z=function(a,b){return y.call(a,b)}:z=function(a,b){return b in a&&C(a.constructor.prototype[b],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(b){var c=this;if(typeof c!="function")throw new TypeError;var d=v.call(arguments,1),e=function(){if(this instanceof e){var a=function(){};a.prototype=c.prototype;var f=new a,g=c.apply(f,d.concat(v.call(arguments)));return Object(g)===g?g:f}return c.apply(b,d.concat(v.call(arguments)))};return e});var H=function(c,d){var f=c.join(""),g=d.length;x(f,function(c,d){var f=b.styleSheets[b.styleSheets.length-1],h=f?f.cssRules&&f.cssRules[0]?f.cssRules[0].cssText:f.cssText||"":"",i=c.childNodes,j={};while(g--)j[i[g].id]=i[g];e.touch="ontouchstart"in a||a.DocumentTouch&&b instanceof DocumentTouch||(j.touch&&j.touch.offsetTop)===9},g,d)}([,["@media (",m.join("touch-enabled),("),h,")","{#touch{top:9px;position:absolute}}"].join("")],[,"touch"]);r.touch=function(){return e.touch},r.csstransitions=function(){return G("transition")},r.svg=function(){return!!b.createElementNS&&!!b.createElementNS(q.svg,"svg").createSVGRect},r.svgclippaths=function(){return!!b.createElementNS&&/SVGClipPath/.test(l.call(b.createElementNS(q.svg,"clipPath")))};for(var I in r)z(r,I)&&(w=I.toLowerCase(),e[w]=r[I](),u.push((e[w]?"":"no-")+w));return A(""),i=k=null,e._version=d,e._prefixes=m,e._domPrefixes=p,e._cssomPrefixes=o,e.testProp=function(a){return E([a])},e.testAllProps=G,e.testStyles=x,g.className=g.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(f?" js "+u.join(" "):""),e}(this,this.document);/*
 * jQuery Backstretch ( Slightly customized )
 * Version 1.2.5
 * http://srobbin.com/jquery-plugins/jquery-backstretch/
 *
 * Add a dynamically-resized background image to the page
 *
 * Copyright (c) 2011 Scott Robbin (srobbin.com)
 * Dual licensed under the MIT and GPL licenses.
*/

(function($) {

    var deleteTimer = null,
        toLoadSource = null;

    $.backstretch = function(src, options, callback) {
        console.log('backstretch init!');
        var defaultSettings = {
            centeredX: true,         // Should we center the image on the X axis?
            centeredY: true,         // Should we center the image on the Y axis?
            speed: 500,               // fadeIn speed for background after image loads (e.g. "fast" or 500)
            holder: "body"
        },
        container = $("#backstretch"),
        settings = container.data("settings") || defaultSettings, // If this has been called once before, use the old settings as the default
        existingSettings = container.data('settings'),
        rootElement = ("onorientationchange" in window) ? $(document) : $(window), // hack to acccount for iOS position:fixed shortcomings
        rootElementHeight, imgRatio, bgImg, bgWidth, bgHeight, bgOffset, bgCSS;
        if(deleteTimer !== null) {
          clearTimeout(deleteTimer);
        }
        // toLoadSource = null;
        // deleteTimer = null;
        // Extend the settings with those the user has provided
        if(options && typeof options == "object") $.extend(settings, options);

        // Just in case the user passed in a function without options
        if(options && typeof options == "function") callback = options;

        // Initialize
        $(document).ready(_init);

        // For chaining
        return this;

        function _init() {
            // console.log('init!', deleteTimer);
            // Prepend image, wrapped in a DIV, with some positioning and zIndex voodoo
            if(src) {
                var img;
                toLoadSource = src;

                // If this is the first time that backstretch is being called
                if(container.length == 0) {
                    container = $("<div />").attr("id", "backstretch")
                        .css({left: 0, top: 0, position: "fixed", overflow: "hidden", margin: 0, padding: 0, height: "100%", width: "100%"}); // top used to be 93
                } else {
                    // Prepare to delete any old images
                    container.find("img").addClass("deleteable");
                }

                img = $("<img />").css({position: "absolute", display: "block", opacity: 0, margin: 0, padding: 0, border: "none", zIndex: -999999})
                                  .bind("load", function(e) {
                                      if(this.src !== toLoadSource) return;
                                      var self = $(this),
                                          imgWidth, imgHeight;

                                      self.css({width: "auto", height: "auto"});
                                      imgWidth = this.width || $(e.target).width();
                                      imgHeight = this.height || $(e.target).height();
                                      imgRatio = imgWidth / imgHeight;

                                      // hide loader
                                      // $("#nav_loadspin").hide();
                                      $(document).trigger(IAAH.EVENTS.LOADING_COMPLETE);

                                      _adjustBG(function() {
                                          if (Modernizr.csstransitions) {
                                              // if transitionend event supported
                                              if(transitionendEventExists) {
                                                  self.bind(transitionendEventExists.event, function(event) {
                                                      // console.log( 'Finished transition!', transitionendEventExists.event );
                                                      self.unbind(transitionendEventExists.event);

                                                      if(self.attr('src') === toLoadSource) {
                                                        deleteTimer = setTimeout(function() {
                                                          container.find('.deleteable').remove();
                                                        }, 300);
                                                      }

                                                      if(typeof callback == "function") callback();
                                                  }, false );
                                              }else{
                                                  if(self.attr('src') === toLoadSource) {
                                                    deleteTimer = setTimeout(function() {
                                                        container.find('.deleteable').remove();
                                                    }, 300);
                                                  }
                                              }

                                              self.css('opacity', '1');
                                          }else{
                                              self.fadeIn(settings.speed, function(){
                                                  // Remove the old images, if necessary.
                                                  if(self.attr('src') === toLoadSource) {
                                                    container.find('.deleteable').remove();
                                                  }
                                                  // Callback
                                                  if(typeof callback == "function") callback();
                                              });
                                          }
                                      });

                                  })
                                  .appendTo(container);

                // Append the container to the body, if it's not already there
                if($("body #backstretch").length == 0) {
                    $(defaultSettings.holder).append(container);
                }

                // Attach the settings
                container.data("settings", settings);

                img.attr("src", src); // Hack for IE img onload event
                // Adjust the background size when the window is resized or orientation has changed (iOS)
                $(window).resize(_adjustBG);
            }
        }

        function _adjustBG(fn) {
            try {
                bgCSS = {left: 0, top: 0};
                bgWidth = rootElement.width();
                bgHeight = bgWidth / imgRatio;
                rootElementHeight = rootElement.height(); //                 rootElementHeight = rootElement.height() - 93;
                // Make adjustments based on image ratio
                // Note: Offset code provided by Peter Baker (http://ptrbkr.com/). Thanks, Peter!
                if(bgHeight >= rootElementHeight) {
                    bgOffset = (bgHeight - rootElementHeight) /2;
                    if(settings.centeredY) $.extend(bgCSS, {top: "-" + bgOffset + "px"});
                } else {
                    bgHeight = rootElementHeight;
                    bgWidth = bgHeight * imgRatio;
                    bgOffset = (bgWidth - rootElement.width()) / 2;
                    if(settings.centeredX) $.extend(bgCSS, {left: "-" + bgOffset + "px"});
                }

                $("#backstretch, #backstretch img:not(.deleteable)").width( bgWidth ).height( bgHeight )
                                                   .filter("img").css(bgCSS);
            } catch(err) {
                // IE7 seems to trigger _adjustBG before the image is loaded.
                // This try/catch block is a hack to let it fail gracefully.
            }

            // Executed the passed in function, if necessary
            if (typeof fn == "function") fn();
        }
    };

})(jQuery);/*!
 * jQuery Cookie Plugin
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2011, Klaus Hartl
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/GPL-2.0
 */
(function($) {
    $.cookie = function(key, value, options) {

        // key and at least value given, set cookie...
        if (arguments.length > 1 && (!/Object/.test(Object.prototype.toString.call(value)) || value === null || value === undefined)) {
            options = $.extend({}, options);

            if (value === null || value === undefined) {
                options.expires = -1;
            }

            if (typeof options.expires === 'number') {
                var days = options.expires, t = options.expires = new Date();
                t.setDate(t.getDate() + days);
            }

            value = String(value);

            return (document.cookie = [
                encodeURIComponent(key), '=', options.raw ? value : encodeURIComponent(value),
                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                options.path    ? '; path=' + options.path : '',
                options.domain  ? '; domain=' + options.domain : '',
                options.secure  ? '; secure' : ''
            ].join(''));
        }

        // key and possibly options given, get cookie...
        options = value || {};
        var decode = options.raw ? function(s) { return s; } : decodeURIComponent;

        var pairs = document.cookie.split('; ');
        for (var i = 0, pair; pair = pairs[i] && pairs[i].split('='); i++) {
            if (decode(pair[0]) === key) return decode(pair[1] || ''); // IE saves cookies with empty string as "c; ", e.g. without "=" as opposed to EOMB, thus pair[1] may be undefined
        }
        return null;
    };
})(jQuery);
/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built in easing capabilities added In jQuery 1.1
 * to offer multiple easing options
 *
 * TERMS OF USE - jQuery Easing
 *
 * Open source under the BSD License.
 *
 * Copyright Â© 2008 George McGinley Smith
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
*/

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});

/*
 *
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright Â© 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice, this list of
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list
 * of conditions and the following disclaimer in the documentation and/or other materials
 * provided with the distribution.
 *
 * Neither the name of the author nor the names of contributors may be used to endorse
 * or promote products derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
 * OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 *//*
* jquery-google-analytics plugin
*
* A jQuery plugin that makes it easier to implement Google Analytics tracking,
* including event and link tracking.
*
* Adds the following methods to jQuery:
*   - $.trackPage() - Adds Google Analytics tracking on the page from which
*     it's called.
*   - $.trackPageview() - Tracks a pageview using the given uri. Can be used for tracking Ajax requests: http://www.google.com/support/analytics/bin/answer.py?hl=en&answer=55519
*   - $.trackEvent() - Tracks an event using the given parameters.
*   - $('a').track() - Adds event tracking to element(s).
*   - $.timePageLoad() - Measures the time it takes  an event using the given parameters.
*
* Features:
*   - Improves page load time by loading Google Analytics code without blocking.
*   - Easy and extensible event and link tracking plugin for jQuery and Google Analytics
*   - Automatic internal/external link detection. Default behavior is to skip
*     tracking of internal links.
*   - Enforces that tracking event handler is added to an element only once.
*   - Configurable: custom event tracking, skip internal links, metadata
*     extraction using callbacks.
*
* Copyright (c) 2008-09 Christian Hellsten
*
* Plugin homepage:
*   http://aktagon.com/projects/jquery/google-analytics/
*   http://github.com/christianhellsten/jquery-google-analytics/
*
* Examples:
*   http://aktagon.com/projects/jquery/google-analytics/examples/
*   http://code.google.com/apis/analytics/docs/eventTrackerGuide.html
*
* Repository:
*   git://github.com/christianhellsten/jquery-google-analytics.git
*
* Version 1.1.3
*
* Tested with:
*   - Mac: Firefox 3, Safari 3
*   - Linux: Firefox 3
*   - Windows: Firefox 3, Internet Explorer 6
*
* Licensed under the MIT license:
* http://www.opensource.org/licenses/mit-license.php
*
* Credits:
*   - http://google.com/analytics
*   - http://lyncd.com:
*       Idea for trackPage method came from this blog post: http://lyncd.com/2009/03/better-google-analytics-javascript/
*/
(function($) {

  var pageTracker;

  /**
   * Enables Google Analytics tracking on the page from which it's called.
   *
   * Usage:
   *  <script type="text/javascript">
   *    $.trackPage('UA-xxx-xxx', options);
   *  </script>
   *
   * Parameters:
   *   account_id - Your Google Analytics account ID.
   *   options - An object containing one or more optional parameters:
   *     - onload - boolean - If false, the Google Analytics code is loaded
   *       when this method is called instead of on window.onload.
   *     - status_code - The HTTP status code of the current server response.
   *       If this is set to something other than 200 then the page is tracked
   *       as an error page. For more details: http://www.google.com/support/analytics/bin/answer.py?hl=en&answer=86927
   *     - callback  - function to be executed after the Google Analytics code is laoded and initialized
   *
   */
  $.trackPage = function(account_id, options) {
    var host = (("https:" === document.location.protocol) ? "https://ssl." : "http://www.");
    var script;

    // Use default options, if necessary
    var settings = $.extend({}, {onload: true, status_code: 200}, options);
    var src  = host + 'google-analytics.com/ga.js';

    function init_analytics() {
      if (typeof _gat !== undefined) {
        debug('Google Analytics loaded');

        pageTracker = _gat._createTracker(account_id);

        if(settings.status_code === null || settings.status_code === 200) {
          // pageTracker._trackPageview();
        } else {
          debug('Tracking error ' + settings.status_code);
          // pageTracker._trackPageview("/" + settings.status_code + ".html?page=" + document.location.pathname + document.location.search + "&from=" + document.referrer);
        }
        if($.isFunction(settings.callback)){
          settings.callback(pageTracker);
        }
      }
      else {
        throw "_gat is undefined"; // setInterval loading?
      }
    }

    load_script = function() {
      $.ajax({
        type: "GET",
        url: src,
        success: function() {
          init_analytics();
        },
        dataType: "script",
        cache: true // We want the cached version
      });
    };

    // Enable tracking when called or on page load?
    if(settings.onload === true || settings.onload === null) {
      $(window).load(load_script);
    } else {
      load_script();
    }
  };

  /**
   * Tracks an event using the given parameters.
   *
   * The trackEvent method takes four arguments:
   *
   *  category - required string used to group events
   *  action - required string used to define event type, eg. click, download
   *  label - optional label to attach to event, eg. buy
   *  value - optional numerical value to attach to event, eg. price
   *  skip_internal - optional boolean value. If true then internal links are not tracked.
   *
   */
  $.trackEvent = function(category, action, label, value) {
    if(typeof pageTracker === 'undefined') {
      debug('FATAL: pageTracker is not defined'); // blocked by whatever
    } else {
      pageTracker._trackEvent(category, action, label, value);
    }
  };

  /**
   * Tracks socialnetworks using the given parameters.
   *
   * The trackSocial method takes four arguments:
   *
   * network      - name of the network, e.g. facebook, tweeter
   * socialAction - action, e.g. like/unlike
   * opt_target   - Optional: A string representing the URL (or resource) which receives the action.
   * opt_pagePath - Optional: A string representing the page by path (including parameters) from which the action occurred.
   *
   */
  $.trackSocial = function(network, socialAction, opt_target, opt_pagePath) {
    if(typeof pageTracker == 'undefined') {
      debug('FATAL: pageTracker is not defined'); // blocked by whatever
    } else {
      pageTracker._trackSocial(network, socialAction, opt_target, opt_pagePath);
    }
  };

  /**
   * Tracks a pageview using the given uri.
   *
   */
  $.trackPageview = function(uri) {
    if(typeof pageTracker === 'undefined') {
      debug('FATAL: pageTracker is not defined');
    } else {
      pageTracker._trackPageview(uri);
    }
  };

  /**
   * Adds click tracking to elements. Usage:
   *
   *  $('a').track()
   *
   */
  $.fn.track = function(options) {
    /**
     * Checks whether a setting value is a string or a function.
     *
     * If second parameter is a string: returns the value of the second parameter.
     * If the second parameter is a function: passes the element to the function and returns function's return value.
     */
    function evaluate(element, text_or_function) {
      if(typeof text_or_function === 'function') {
        text_or_function = text_or_function(element);
      }
      return text_or_function;
    }

    // Add event handler to all matching elements
    return this.each(function() {
      var element = $(this);

      // Prevent an element from being tracked multiple times.
      if (element.hasClass('tracked')) {
        return false;
      } else {
        element.addClass('tracked');
      }

      // Use default options, if necessary
      var settings = $.extend({}, $.fn.track.defaults, options);

      // Merge custom options with defaults.
      var category = evaluate(element, settings.category);
      var action   = evaluate(element, settings.action);
      var label    = evaluate(element, settings.label);
      var value    = evaluate(element, settings.value);
      var event_name = evaluate(element, settings.event_name);

      var message = "category:'" + category + "' action:'" + action + "' label:'" + label + "' value:'" + value + "'";

      debug('Tracking ' + event_name + ' ' + message);

      // Bind the event to this element.
      // TODO Use .live since jQuery 1.4 now supports it better.
      element.bind(event_name + '.track', function() {
        // Should we skip internal links? REFACTOR
        var skip = settings.skip_internal && (element[0].hostname === location.hostname);

        if(!skip) {
          $.trackEvent(category, action, label, value);
          debug('Tracked ' + message);
        } else {
          debug('Skipped ' + message);
        }

        return true;
      });
    });
  };

  /**
   * Prints to Firebug console, if available. To enable:
   *   $.fn.track.defaults.debug = true;
   */
  function debug(message) {
    if ($.fn.track.defaults.debug && typeof console !== 'undefined' && typeof console.debug !== 'undefined') {
      console.debug(message);
    }
  }

  /**
   * Default (overridable) settings.
   */
  $.fn.track.defaults = {
    category      : function(element) { return (element[0].hostname === location.hostname) ? 'internal':'external'; },
    action        : 'click',
    label         : function(element) { return element.attr('href'); },
    value         : null,
    skip_internal : true,
    event_name    : 'click',
    debug         : false
  };
}(jQuery));(function($) {
  $.fn.swipeEvents = function() {
    return this.each(function() {

      var startX,
          startY,
          $this = $(this);

      $this.bind('touchstart', touchstart);

      function touchstart(event) {
        var touches = event.originalEvent.touches;
        if (touches && touches.length) {
          startX = touches[0].pageX;
          startY = touches[0].pageY;
          $this.bind('touchmove', touchmove);
        }
        event.preventDefault();
      }

      function touchmove(event) {
        var touches = event.originalEvent.touches;
        if (touches && touches.length) {
          var deltaX = startX - touches[0].pageX;
          var deltaY = startY - touches[0].pageY;

          if (deltaX >= 50) {
            $this.trigger("swipeLeft");
          }
          if (deltaX <= -50) {
            $this.trigger("swipeRight");
          }
          if (deltaY >= 50) {
            $this.trigger("swipeUp");
          }
          if (deltaY <= -50) {
            $this.trigger("swipeDown");
          }
          if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
            $this.unbind('touchmove', touchmove);
          }
        }
        event.preventDefault();
      }

    });
  };
})(jQuery);
var IAAH = IAAH || {};

(function ($) {

    $(document).ready(function () {

        IAAH.manager.init();

    });

})(jQuery);var IAAH = IAAH || {};

IAAH.ENV = {
	DEV: 'DEV',
	PROD: 'PROD'
};

IAAH.GOOGLE_ANALYTICS_ID = 'UA-32406095-1';

// Grid
IAAH.MIN_COL_WIDTH = {
    normal: 300,
    touchdevice: 250
};

IAAH.MIN_COLS = 3;

// Header
IAAH.HEADER_HEIGHT = 109;

// Global styles
IAAH.NUM_GLOBAL_STYLES = 12;
IAAH.MINIMAL_GLOBAL_STYLES = [12, 10];
// Threshold used for switching over to minimal global style
IAAH.WIDTH_THRESHOLD = 1100;

// Pages
IAAH.HOME_PAGE = 'HOME_PAGE';
IAAH.PROJECT_PAGE = 'PROJECT_PAGE';
IAAH.INFO_PAGE = 'INFO_PAGE';

// Events
IAAH.EVENTS = IAAH.EVENTS || {};
IAAH.EVENTS.IMAGE_CHANGED = 'IMAGE_CHANGED';
IAAH.EVENTS.PROJECTDETAILS_TOGGLED = 'PROJECTDETAILS_TOGGLED';
IAAH.EVENTS.KEY_DOWN = 'KEY_DOWN';
IAAH.EVENTS.LOADING = 'LOADING';
IAAH.EVENTS.LOADING_COMPLETE = 'LOADING_COMPLETE';
IAAH.EVENTS.TOGGLE_INTROPANEL = 'TOGGLE_INTROPANEL';

// Events - Fullscreen Gallery
IAAH.EVENTS.NEXT_IMAGE = 'NEXT_IMAGE';
IAAH.EVENTS.PREV_IMAGE = 'PREV_IMAGE';

// URLS
IAAH.IAAH_URL = 'https://www.iamalwayshungry.com';
IAAH.FACEBOOK_URL = 'https://www.facebook.com/IAAH.IAMALWAYSHUNGRY';
IAAH.TWITTER_URL = 'https://twitter.com/iamalwayshungry';
IAAH.PINTEREST_URL = 'https://pinterest.com/nessim_higson/';var IAAH = IAAH || {};

/**
* Footer
* Displaying global footer containing contact information and moving the cargo branding
*/

IAAH.footer = (function() {

    var $footer = null,
        $cargoBranding;

    var init = function() {
        addFooter();
    };

    var addFooter = function() {
        if($footer === null) {
            var template = Handlebars.compile(IAAH.templates.footer),
                html = template({'includeCargoBranding': true});
            $footer = $(html);

            trackOutboundLinks();
            moveCargobranding();
        }
    };

    var trackOutboundLinks = function() {
        $footer.find('a').track({
            category: 'global-footer',
            action: 'click',
            label: function(element) { return element.text().toLowerCase() }
        });
    };

    var moveCargobranding = function() {
        $cargoBranding = $footer.find('#cargo-branding');
        $cargoBranding.prepend($('#toolset'));
        $('#content_container').append($footer);
    };

    var show = function() {
        if($footer.css('display')==='none') $footer.show();
    };

    var hide = function() {
        $footer.hide();
    };

    return {
        init: init,
        show: show,
        hide: hide
    };

})();var IAAH = IAAH || {};

/**
* Grid
* Arranges grid on homepage/bottom of projectpage
*/

IAAH.grid = (function () {

    var firstTime = true,
        $page1 = null,
        $thumbs = null,
        $pageContainer = null;
        // $contentContainer = null;

    var init = function() {
        // cache elements
        $page1Wrapper = $(document.createElement('div')).attr('id', 'page_1-wrapper');
        $page1 = $('#page_1');
        // $contentContainer = $('#content_container');
        $pageContainer = $('#content_container > .pagecontainer');

        $page1Wrapper.append($page1);

        if($pageContainer.length > 0) {
            $pageContainer.after($page1Wrapper);
        }else{
            $('#maincontainer').after($page1Wrapper);
        }

        $thumbs = $('.project_thumb', $page1);
    };

    var rearrange = function () {

        var numCols,
            colWidth = IAAH.MIN_COL_WIDTH.normal,
            windowWidth = $(window).width();

        if(IAAH.utils.isTouchDevice()) {
            // use different col-width for touch devices ( it will add 1 column to the grid for the iPad )
            colWidth = IAAH.MIN_COL_WIDTH.touchdevice;
        }

        // set number of columns
        numCols = Math.floor(windowWidth / colWidth);
        if(numCols < IAAH.MIN_COLS) numCols = IAAH.MIN_COLS;

        // set column width
        colWidth = Math.ceil(windowWidth / numCols);
        $page1.css('width', windowWidth + 20);
        $page1Wrapper.css('width', windowWidth);

        // re-set the image dimensions
        for(var i = 0, l = $thumbs.length; i < l; i++) {
            var $thumb = $($thumbs[i]),
                $img,
                $overlayHolder,
                $thumbCopy,
                newHeight,
                title;

            $img = $thumb.find('.cardimgcrop img');

            if(firstTime) {

                // store original dimensions
                $img.attr({
                    'data-width': $img.attr('width'),
                    'data-height': $img.attr('height'),
                    'nopin': 'nopin'
                });

                // console.log($img.parent().id, $img, $img.attr('width'), $img.attr('height'));

                // create overlay with title
                $overlayHolder = $(document.createElement('div')).attr('class', 'overlay-holder');
                title = $thumb.find('.thumb_title span').text();

                if(title.indexOf('{inactive}') > 0) {
                    //$overlayHolder.addClass('inactive');
                    $thumb.addClass('inactive');
                    $thumb.find('a')
                        .unbind()
                        .attr('href', '')
                        .bind('click', onClick);
                }else{
                    $thumbCopy = $(document.createElement('div')).attr('class', 'thumb-copy').text(title);
                    $overlayHolder
                        .addClass('active')
                        .append($thumbCopy);
                }

                // add overlays with title
                $thumb.find('.loader_holder').after($overlayHolder).end()
                    .find('.thumb_title').remove()
                    .css({
                        'margin': '0'
                    });
            }

            newHeight = colWidth / $img.attr('data-width') * $img.attr('data-height');

            $img.attr({
                'width': colWidth,
                'height': newHeight
              })
              .css({
                'width': colWidth
              });
        }

        $page1
            .masonry({
                singleMode: false,
                itemSelector: '.project_thumb',
                resizeable: false,
                animate: false,
                saveOptions: true,
                columnWidth: colWidth
            })
            .css('visibility', 'visible');

        if(firstTime) $(document).trigger(IAAH.EVENTS.LOADING_COMPLETE);

        firstTime = false;
    };

    var onClick = function(e) {
        e.preventDefault();
    };

    var show = function() {
        $page1.show();
    };

    var hide = function() {
        $page1.hide();
    };

    return {
        init: init,
        rearrange: rearrange,
        show: show,
        hide: hide
    };
})();var IAAH = IAAH || {};

/**
* Header
*/

IAAH.header = (function () {

    var $logoHolder = null,
        $logo = null,
        $primaryNav = null,
        $secondaryNav = null,
        $navContainer = null,
        $navContainerBg = null,
        $navContainerHoverBg = null,
        $workButton = null,
        $profileButton = null,
        $iaahButton = null,
        $introPanelButton = null,
        selected = [],
        hoverColor = null,
        initiated = false,
        intervalId = null;


    var init = function () {

        if(!initiated) {

            initiated = true;
            $navContainer = $(document.querySelector('.nav_container'));

            initPrimaryNav();
            initSecondaryNav();
            initLogo();
        }
    };

    var initLogo = function () {
        if ($logo === null) {
            $logo = $(IAAH.templates.logo);
            $logo.find('a').bind('click', function(e) {
                e.preventDefault();
                Projects.CloseProject();
                return false;
            });
            $navContainer.append($logo);
        }
    };

    var initPrimaryNav = function() {
        initNavContainerBg();
        initNavContainerHoverBg();
        initNavLinks();
    };

    var initSecondaryNav = function() {

        if ($secondaryNav === null) {
            $secondaryNav = $(IAAH.templates.secondaryNav);
            $('.nav_container').append($secondaryNav);
        }

    };

    var initNavContainerBg = function() {
        if ($navContainerBg === null) {
            $navContainerBg = $(document.createElement('div')).attr('id', 'nav-container-bg');
            $navContainer.before($navContainerBg);
        }
    };

    var showNavContainerBg = function() {
        if ($navContainerBg !== null) {
            $navContainerBg.css('display', 'block');
        }
    };

    var hideNavContainerBg = function() {
        if ($navContainerBg !== null) {
            $navContainerBg.css('display', 'none');
        }
    };

    var initNavContainerHoverBg = function() {
        if ($navContainerHoverBg === null) {
            $navContainerHoverBg = $(document.createElement('div')).attr('id', 'nav-container-hover-bg');
            $navContainer.prepend($navContainerHoverBg);
        }
    };

    var initNavLinks = function() {

        if ($primaryNav === null) {

            var profileButtonCls = IAAH.manager.getEnvironment() === IAAH.ENV.PROD ? '#p903269' : '#p2860434';
            $primaryNav = $(IAAH.templates.primaryNav);

            $iaahButton = $primaryNav.find('#iaah-button');
            $workButton = $primaryNav.find('#work-button');
            $profileButton = $navContainer.find(profileButtonCls).parent();

            $iaahButton.bind('click', function(e) {
                e.preventDefault();
                Projects.CloseProject();
            });

            $workButton.bind('click', function(e) {
                e.preventDefault();
                Projects.CloseProject();
            });

            // move "original" profile button
            $workButton.after($profileButton);

            $($navContainerHoverBg).after($primaryNav);
        }
    };

    var selectWorkButton = function() {
        if(!$workButton.hasClass('active')) $workButton.addClass('active');
    };

    var deselectWorkButton = function() {
        $workButton.removeClass('active');
    };

    var showIntropanelButton = function() {
        console.log('showIntropanelButton', $introPanelButton);
        if($introPanelButton === null) {
            $introPanelButton = $(IAAH.templates.introPanelButton);
        }
        $introPanelButton.find('a').bind('click', function(e) {
            e.preventDefault();
            $(document).trigger(IAAH.EVENTS.TOGGLE_INTROPANEL);
        });
        $secondaryNav.append($introPanelButton);
    };

    var emptySecondaryNav = function() {
        if($introPanelButton !== null) $introPanelButton.remove();
        // $secondaryNav.empty();
    };

    var setPage = function(p) {
        switch(p) {
            case IAAH.HOME_PAGE:
                showNavContainerBg();
                selectWorkButton();
                showIntropanelButton();
            break;
            case IAAH.PROJECT_PAGE:
                selectWorkButton();
                if(document.querySelector('#fullscreen-gallery') === null) {
                    showNavContainerBg();
                }else{
                    hideNavContainerBg();
                }
            break;
            case IAAH.INFO_PAGE:
                showNavContainerBg();
                deselectWorkButton();
                emptySecondaryNav();
            break;
        }
    };

    return {
        init: init,
        setPage: setPage
    };
})();var IAAH = IAAH || {};

/**
* IntroPanel:
* Contains message in two sizes
* - Small: Displayed when deeplinked into project
* - Large: Displayed when entering on homepage
*/

IAAH.introPanel = (function () {

    var $introPanel = null,
        $readmore = null,
        $closeButton = null,
        $largeMessage = null,
        $smallMessage = null,
        isCreated = false,
        isTouchDevice,
        isFirstVisit = null,
        STATE_SMALL = 'STATE_SMALL',
        STATE_LARGE = 'STATE_LARGE',
        STATE_CLOSED = 'STATE_CLOSED',
        clsMapping = {
            STATE_SMALL: 'small-state',
            STATE_LARGE: 'large-state',
            STATE_CLOSED: 'closed-state'
        },
        state = null;


    var init = function(firstVisit) {
        if(!isCreated) {
            isFirstVisit = firstVisit;
            isCreated = true;
            isTouchDevice = IAAH.utils.isTouchDevice();
            addListeners();
            create();
        }else{
            appendToDOM(false);
        }
    };

    var create = function() {

        var initState;

        $introPanel = $(document.createElement('div')).attr({
            id: 'intro-panel'
        });

        initSmallMessage();
        initLargeMessage();

        if(isFirstVisit) {
            switch(IAAH.manager.getPage()) {
                case IAAH.HOME_PAGE:
                    initState = STATE_LARGE;
                break;
                case IAAH.PROJECT_PAGE:
                    initState = STATE_SMALL;
                break;
                default:
                    initState = STATE_CLOSED;
                break;
            }
        }else{
            initState = STATE_CLOSED;
        }

        setState(initState);

        addCloseButton();
        appendToDOM(IAAH.manager.isGalleryEnabled());
    };

    var initSmallMessage = function() {

        var socialComponentTemplate;

        $smallMessage = $(IAAH.templates.introPanelSmallMessage);
        // $smallMessage.append(getSocialComponentHTML());

        // if(!isTouchDevice) {
        //     socialComponent = new IAAH.socialComponent({
        //         offset: 40,
        //         buttonWidth: 45,
        //         expandedButtonWidth: 90,
        //         $holder: $smallMessage,
        //         isTouchDevice: isTouchDevice
        //     });
        // }

        $readMore = $smallMessage.find('.readmore');
        $readMore.bind('click', function() {
            $.trackEvent('intro-panel', 'click', 'readmore');
            setState(STATE_LARGE);
        });

        $introPanel.append($smallMessage);
    };

    var initLargeMessage = function() {

        var socialComponentTemplate;

        $largeMessage = $(IAAH.templates.introPanelLargeMessage);
        // $largeMessage.append(getSocialComponentHTML());

        // if(!isTouchDevice) {
        //     socialComponent = new IAAH.socialComponent({
        //         offset: 0,
        //         buttonWidth: 45,
        //         expandedButtonWidth: 90,
        //         $holder: $largeMessage,
        //         alignment: 'left',
        //         isTouchDevice: isTouchDevice
        //     });
        // }
        $introPanel.append($largeMessage);

        // $introPanel.addClass(IAAH.manager.isFirstVisit() ? 'expanded' : 'collapsed');
    };

    var appendToDOM = function(isGalleryEnabled) {
        var parentHolder = isGalleryEnabled ? 'body' : '#content_container';
        $(parentHolder).prepend($introPanel);
    };

    var addCloseButton = function() {
        $closeButton = $(IAAH.templates.introPanelCloseButton);
        $closeButton.bind('click', function(e) {
            $.trackEvent('intro-panel', 'click', 'close-intropanel-button');
            setState(STATE_CLOSED);
        });
        $introPanel.append($closeButton);
    };

    var getSocialComponentHTML = function() {
        if(IAAH.introPanel.getSocialComponentHTML.cache !== null && IAAH.introPanel.getSocialComponentHTML.cache !== undefined) return IAAH.introPanel.getSocialComponentHTML.cache;

        var componentTemplate = Handlebars.compile(IAAH.templates.socialComponent),
            HTML = componentTemplate({
                isIntroPanel: true,
                facebookURL: isTouchDevice ? IAAH.FACEBOOK_URL : encodeURIComponent(IAAH.FACEBOOK_URL),
                twitterURL: isTouchDevice ? IAAH.TWITTER_URL : encodeURIComponent(IAAH.TWITTER_URL),
                pinterestURL: IAAH.PINTEREST_URL,
                isTouchDevice: isTouchDevice,
                iconsColor: 'lightgray',
                includeWidgets: !isTouchDevice
            });
        IAAH.introPanel.getSocialComponentHTML.cache = HTML;
        return HTML;
    };

    var toggle = function() {

        if($introPanel.hasClass(clsMapping[STATE_CLOSED])) {
            setState(STATE_LARGE);
        }else{
            setState(STATE_CLOSED);
        }
    };

    var close = function() {
        if(state !== STATE_CLOSED) setState(STATE_CLOSED);
    };

    var setState = function(s) {

        $introPanel
            .removeClass(clsMapping[state])
            .addClass(clsMapping[s]);

        $('html, body').animate({scrollTop: '0px'}, '2300');

        state = s;
    };

    var addListeners = function() {
        $(document).bind(IAAH.EVENTS.TOGGLE_INTROPANEL, function() {
            toggle();
        });
    };

    var isVisible = function() {
        return $introPanel === null ? false : $introPanel.parent().length;
    };

    return {
        init: init,
        toggle: toggle,
        close: close,
        isVisible: isVisible,
        getSocialComponentHTML: getSocialComponentHTML
    };

})();var IAAH = IAAH || {};

/**
* Manager
*/

IAAH.manager = (function() {

    var initialised = false,
        galleryEnabled = false,
        resizeTimeout = null,
        page,
        globalStyleId = 0,
        topOffset = 0,
        isMinimalStyle = false,
        firstVisit = null,
        environment = null;

    var init = function() {

        var bodyClasses = '';

        // redirect users trying to access inactive projects (unless using ?preview as a url variable)
        if(isInactiveProject() && !isPreview()) {
            window.location = 'https://work.iamalwayshungry.com';
            return;
        }

        // firstVisit = true;
        firstVisit = $.cookie('iaah-visited') === null;
        // console.log('firstVisit', firstVisit, $.cookie('iaah-visited') );
        if(firstVisit) setCookie();

        if (initialised) return;

        $('#content_container').css('visibility', 'visible');

        initialised = true;

        // Touch should have been simply detected with Modernizr
        if (IAAH.utils.isTouchDevice()) {
            bodyClasses += 'touch-device';
        }else {
            bodyClasses += 'none-touch-device';
        }

        if(IAAH.utils.isiPhone()) {
            // to set the header as position absolute instead of fixed, to solve fixed element zoom issue
            bodyClasses += ' iphone';
        }

        $('body').addClass(bodyClasses);


        if (IAAH.utils.isiPad()) {
            // disable scaling
            $('head').append('<meta name="viewport" content="user-scalable=no" />');
        }

        // remove listener from Hegel template
        $(document).unbind('contentResize');

        IAAH.styles.init();
        IAAH.tracking.init();

        IAAH.header.init();
        IAAH.grid.init();
        IAAH.footer.init();

        updateContentContainerWidth();
        addListeners();

        // console.log('isHomePage: ', isHomePage());
        if(isHomePage()) {
            openPage(IAAH.HOME_PAGE);
        }
        // Intialisation of projectPages/infoPages are triggered by projectLoadComplete event dispatched from Hegel's template.js
    };

    var openPage = function(p) {

        // to avoid Cargo's double call for homepage
        if (p === IAAH.HOME_PAGE && page === IAAH.HOME_PAGE) return;

        // hide previous page
        if (page !== undefined) {
            closePage(page, p);
            return;
        }

        page = p;
        console.log('open page: ' + p);

        // instantiate new page
        switch (page) {
            case IAAH.HOME_PAGE:
                IAAH.tracking.trackPageview('/');
                IAAH.grid.show();
                IAAH.grid.rearrange();
                IAAH.footer.show();
                scrollToLastPosition();
                break;
            case IAAH.PROJECT_PAGE:

                IAAH.tracking.trackPageview(getProjectTitle());
                $('body').addClass('project-page');

                galleryEnabled = document.querySelector('#fullscreen-gallery') !== null;
                if (galleryEnabled) {
                    $('.entry').hide();
                    $('.project_content').css('display', 'none');
                    IAAH.grid.hide();
                    IAAH.footer.hide();
                    IAAH.gallery.init();
                }else {
                    $('.entry').css('opacity', 1);
                    $('.project_content').css('display', 'block');
                    IAAH.grid.show();
                    IAAH.grid.rearrange();
                    IAAH.footer.show();
                }
                IAAH.projectPage.init();
                break;
            case IAAH.INFO_PAGE:
                IAAH.tracking.trackPageview('/profile');
                IAAH.infoPage.init();
                $('.entry').css('opacity', 1);
                $('#page_1').css('display', 'none');
                IAAH.footer.hide();
                break;
        }

        IAAH.header.setPage(page);

        // if(firstVisit) IAAH.introPanel.init(firstVisit);
        IAAH.introPanel.init(firstVisit);
    };

    var closePage = function(oldPage, newPage) {
        console.log('closePage:', oldPage);
        IAAH.introPanel.close();

        switch (oldPage) {
            case IAAH.HOME_PAGE:
                topOffset = $(window).scrollTop();
                if($('#intro-panel').length) topOffset -= $('#intro-panel').height();
            break;
            case IAAH.PROJECT_PAGE:
                $('body').removeClass('project-page');
                galleryEnabled = false;
                IAAH.projectPage.hide();
            break;
            case IAAH.INFO_PAGE:
                topOffset = 0;
            break;
        }
        page = undefined;

        openPage(newPage);
    };

    var scrollToLastPosition = function() {
        setTimeout(function() {
            $('html, body').scrollTop(topOffset);
        }, 0);
    };

    var addListeners = function() {
        $(window).bind('resize', resize);

        if (IAAH.utils.isTouchDevice()) addOrientationChangeListener();

        $('body').bind('keydown', function(e) {
            // console.log('onKeyDown', e.keyCode);
            $(document).trigger(IAAH.EVENTS.KEY_DOWN, e.keyCode);
        });

        $(document).bind('projectCloseComplete', function(e, pid) {
            openPage(IAAH.HOME_PAGE);
        });

        $(document).bind(IAAH.EVENTS.LOADING, function(e) {
            $('#nav_loadspin').css('display', 'block');
        });

        $(document).bind(IAAH.EVENTS.LOADING_COMPLETE, function(e) {
            $('#nav_loadspin').css('display', 'none');
        });

        $(document).bind('projectLoadComplete', function(e, dataObj) {
            var page;
            //if( IAAH.INFO_PAGE_IDS.indexOf(dataObj) > -1 ) {
            if ($('#content_container .entry').attr('page_type') === 'page') {
                page = IAAH.INFO_PAGE;
            }else {
                page = IAAH.PROJECT_PAGE;
            }
            openPage(page);
        });
    };

    var addOrientationChangeListener = function() {
        window.onorientationchange = function() {
            resize(null, 0);
        };
    };

    var getProjectTitle = function() {
        var url = document.URL,
            project = url.substring(url.lastIndexOf('/'));
        return project.replace('#', '').toLowerCase();
    };

    var isHomePage = function() {
        var url = document.URL,
            page = url.substring(url.lastIndexOf('/') + 1);
        return page.length < 2 || page === 'aoverb';
    };

    var setCookie = function() {
        if($.cookie('iaah-visited') === null) {
            $.cookie('iaah-visited', 'true', { expires: 14 });
        }
    };

    var isInactiveProject = function() {
        var projectTitle = $('.project_title').text();
        return projectTitle.indexOf('inactive') > 0;
    };

    var isPreview = function() {
        return window.location.href.indexOf('preview') > -1;
    };

    var resize = function(e, delay) {

        delay = delay === undefined ? 100 : 0;

        var timeoutCall = null;
        if (resizeTimeout !== null) clearTimeout(resizeTimeout);

        updateContentContainerWidth();
        IAAH.styles.resize();

        if (page === IAAH.HOME_PAGE) {

            IAAH.grid.rearrange();

        }else if (page === IAAH.PROJECT_PAGE) {

            resizeTimeout = setTimeout(function() {
                if (galleryEnabled) {
                    IAAH.gallery.resize();
                }else {
                    IAAH.grid.rearrange();
                }
                IAAH.projectPage.resize();
            }, delay);
        }
    };

    var updateContentContainerWidth = function() {
        var windowWidth = $(window).width();
        $('#content_container, .nav_container').css('width', windowWidth);
        // $('.nav_container').css('width', windowWidth);
    };

    var isGalleryEnabled = function() {
        return galleryEnabled;
    };

    var isFirstVisit = function() {
        return firstVisit;
    };

    var getPage = function() {
        return page;
    };

    var getEnvironment = function() {
        return window.location.href.indexOf('aoverb') > -1 ? IAAH.ENV.DEV : IAAH.ENV.PROD;
    };

    return {
        init: init,
        isGalleryEnabled: isGalleryEnabled,
        getPage: getPage,
        getProjectTitle: getProjectTitle,
        getEnvironment: getEnvironment,
        isFirstVisit: isFirstVisit
    };
})();

var IAAH = IAAH || {};

/**
* Styles
* Sets the global style for the website and stores it in a Cookie session
* Styles are for the most part visible in the header, for testing purposes you
* can press 'c' to change the current global style
*/

IAAH.styles = (function() {

	var id = null,
		isMinimalStyle = false;


	var init = function() {
		addListeners();
        // console.log('init with session:', getFromCookie('iaah-s'));
		setStyle(getFromCookie('iaah-s'));
	};

	var setStyle = function(styleId) {

        styleId = validateId(styleId);

        // styleId = 4; // for testing purposes
        $('body').addClass('style' + styleId);
        setId(styleId);
    };

    var validateId = function(styleId) {
		if (styleId === undefined || styleId === null) {

            if($(window).width() < IAAH.WIDTH_THRESHOLD) {
				// set a minimal style
                styleId = IAAH.MINIMAL_GLOBAL_STYLES[getRandomIndex(IAAH.MINIMAL_GLOBAL_STYLES.length)];
                isMinimalStyle = true;
            }else{
				// set a random style
                styleId = Math.round(Math.random() * (IAAH.NUM_GLOBAL_STYLES - 1)) + 1;
            }
        }

        if(!isMinimalStyle) isMinimalStyle = checkIsMinimalStyle(styleId);
        return styleId;
    };

    var storeInCookie = function(key, value, options) {
        if($.cookie(key) === null) $.cookie(key, value, options);
    };

    var getFromCookie = function(key) {
        return $.cookie(key);
    };

    var checkIsMinimalStyle = function(styleId) {
		return IAAH.MINIMAL_GLOBAL_STYLES.indexOf(styleId) > -1;
    };

    var setId = function(styleId) {
        id = styleId;
        storeInCookie('iaah-s', styleId, {domain: 'iamalwayshungry.com'});
    };

    var addListeners = function() {
		$(document).bind(IAAH.EVENTS.KEY_DOWN, function(e, keyCode) {
            if(keyCode === 67) { // key: c
                $('body').removeClass('style' + id);
                setStyle(IAAH.utils.calculateIndex(id, 1, IAAH.NUM_GLOBAL_STYLES, false)); // add 1 since it counts from 0
            }
        });
    };

    var resize = function() {
        // set a minimal global style if window width is below threshold
		if($(window).width() < IAAH.WIDTH_THRESHOLD && !isMinimalStyle) {
            var newId = IAAH.MINIMAL_GLOBAL_STYLES[getRandomIndex(IAAH.MINIMAL_GLOBAL_STYLES.length)];
            $('body')
                .removeClass('style' + id)
                .addClass('style' + newId);
            isMinimalStyle = true;
            setId(newId);
        }
    };

    var getRandomIndex = function(num) {
        return Math.round( Math.random() * (num-1) );
    };

    return  {
		init: init,
		resize: resize
    };

})();var IAAH = IAAH || {};

/**
* Tracking
*/

IAAH.tracking = (function() {

	var init = function()  {
        $.trackPage(IAAH.GOOGLE_ANALYTICS_ID);
    };

    var trackPageview = function(page) {
        $.trackPageview(page);
    };

    return {
		init: init,
		trackPageview: trackPageview
    };

})();var IAAH = IAAH || {};

/**
* Utils
*/

IAAH.utils = {

    storeInSession: function(key, value) {
        // console.log('storeInSession', value);
        if (window.sessionStorage) {
            sessionStorage.setItem('s', value);
        }
    },

    getFromSession: function(key) {
        // console.log('getFromSession', sessionStorage.getItem(key));
        if (window.sessionStorage) {
            return sessionStorage.getItem(key);
        }else{
            return null;
        }
    },

    getRandomArrayIndex: function(arr) {
        return Math.round( Math.random() * (arr.length-1) );
    },
    getTransitionEvent: function(){
        var t;
        var el = document.createElement('fakeelement');
        var transitions = {
          'transition':'transitionEnd',
          'OTransition':'oTransitionEnd',
          'MSTransition':'msTransitionEnd',
          'MozTransition':'transitionend',
          'WebkitTransition':'webkitTransitionEnd'
        };

        for(t in transitions){
            if( el.style[t] !== undefined ){
                return transitions[t];
            }
        }
    },
    isTouchDevice: function() {
        // return cached result if available
        if(IAAH.utils.isTouchDevice.cache != null) return IAAH.utils.isTouchDevice.cache;
        var el = document.createElement('div');
        el.setAttribute('ongesturestart', 'return;');
        // add result to cache
        IAAH.utils.isTouchDevice.cache = typeof el.ongesturestart === 'function';
        return IAAH.utils.isTouchDevice.cache;
    },
    getDeviceOrientation: function() {
        var orientation = window.orientation;
        if(orientation === 0 || orientation === 180) {
           return 'portrait';
        }else if (orientation === 90 || orientation === -90){
            return 'landscape';
        }
    },
    isiPhone: function() {
        return (navigator.platform.match(/iPhone/i));
    },
    isiPad: function() {
        return (navigator.platform.indexOf("iPad") != -1);
    },
    calculateIndex: function (index, delta, total, startWithZero) {
        index += delta;
        if(startWithZero) {
            if (index >= total) {
                index = minimum;
            } else if (index < 0) {
                index = total - 1;
            }
        }else{
            if (index > total) {
                index = 1;
            } else if (index < 0) {
                index = total - 1;
            }
        }
        return index;
    }
};



// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,clear,count,debug,dir,dirxml,error,exception,firebug,group,groupCollapsed,groupEnd,info,log,memoryProfile,memoryProfileEnd,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());
    /*
if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
  var viewportmeta = document.querySelector('meta[name="viewport"]');
  if (viewportmeta) {
    viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
    document.body.addEventListener('gesturestart', function() {
        // viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
    }, false);
  }
}
    */
spaceMaker = false;

/*

Copyright (c) 2010 Sebastien P.

  http://twitter.com/_sebastienp

  MIT licensed.

*/

var transitionendEventExists = (function (WINDOW) { // Munge "window"

    var prefixes = [
        "",       // Firefox
        "webkit", // Webkit-based
        "o"       // Opera
    ],
    i = -1,
    l = prefixes.length,
    ret = false,
    vendor;

    while ((i += 1) < l) {

        vendor = prefixes[i];

        if (("on" + vendor + "transitionend") in WINDOW) {

            ret = new WINDOW.Boolean(true);
            ret.event = ((vendor) ? vendor + "T" : "t") + "ransitionEnd";

            break;

        }

    }

    return ret;

}(this));


// $(function() {

    // var $allVideos = $("iframe[src^='http://player.vimeo.com'], iframe[src^='http://www.youtube.com'], object, embed"),
    // $fluidEl = $(".project_content");

    // $allVideos.each(function() {

    //   $(this)
    //     // jQuery .data does not work on object/embed elements
    //     .attr('data-aspectRatio', this.height / this.width)
    //     .removeAttr('height')
    //     .removeAttr('width');

    // });

    // $(window).resize(function() {

    //   var newWidth = $fluidEl.width();
    //   $allVideos.each(function() {

    //     var $el = $(this);
    //     $el
    //         .width(newWidth)
    //         .height(newWidth * $el.attr('data-aspectRatio'));

    //   });

    // }).resize();

// });
var IAAH = IAAH || {};

/**
* InfoPage
* Adds global footer and enables tracking for all outgoing links
*/

IAAH.infoPage = (function () {

    var $entry = null,
        $projectContent = null,
        $footer = null,
        template = null,
        html = null;

    var init = function() {

        $projectContent = $('.project_content', '#maincontainer');
        $entry = $('.entry', '#maincontainer');

        $projectContent.css('display', 'block');

        // set page type as class attribute
        if($entry.attr('page_type') === 'page' && !$entry.hasClass('page')) {
            $entry.addClass('page');
        }

        // tracking
        $entry.find('.history a').track({
            category: 'info-page',
            action: 'click',
            label: function(element) { return element.text().toLowerCase() }
        });

        addFooter();
    };

    var addFooter = function() {

        if($footer === null) {
            template = Handlebars.compile(IAAH.templates.footer),
            html = template({
                'includeCargoBranding': false,
                'includeCredits': true
            });
        }

        $footer = $(html);

        $footer.find('a').track({
            category: 'global-footer',
            action: 'click',
            label: function(element) { return element.text().toLowerCase() }
        });

        $projectContent.append($footer);

        $(document).trigger(IAAH.EVENTS.LOADING_COMPLETE);
    };

    var remove = function() {
        $entry.removeClass('page');
    };

    return {
        init: init,
        remove: remove
    };

})();
var IAAH = IAAH || {};

/**
* ProjectContent
* Resizing video embeds
*/

IAAH.projectContent = (function() {

	var $fluidEl = null,
		$allVideos = null;

	var init = function() {

		$allVideos = null;

		$fluidEl = $('.project_content');
		// console.log('$fluidEl', $fluidEl);
		$allVideos = $("iframe[src^='https://player.vimeo.com'], iframe[src^='https://www.youtube.com'], object, embed"),

		$allVideos.each(function() {
			$(this)
				// jQuery .data does not work on object/embed elements
				.attr('data-aspectRatio', this.height / this.width)
				.removeAttr('height')
				.removeAttr('width');
		});

		resize();
	};

	var resize = function() {

		var newWidth = $fluidEl.width();
		// console.log('newWidth', newWidth);
		$allVideos.each(function() {

			var $el = $(this);
			$el
				.width(newWidth)
				.height(newWidth * $el.attr('data-aspectRatio'));
		});

	};

	return {
		init: init,
		resize: resize
	};



})();var IAAH = IAAH || {};

/**
* ProjectDetails
* Displays the project description in an overlay on top of the default project content
* To use this feature the admin needs to put the copy inside a div tag with the id 'project-description'
* <div id="project-description">Lorem ipsum</div>
*/

IAAH.projectDetails = (function() {

    var isVisible,
        $projectDetails = null,
        $projectDetailsCopy = null,
        $projectDetailsBg = null,
        $oriDescription = null,
        $mainContainer = null;

    var init = function () {

        isVisible = false;

        $mainContainer = $('#maincontainer');
        // original copy holder
        $description = $('#project-description');
        $description.hide();

        create();
    };

    var create = function() {

        if ($projectDetails === null) {

            $projectDetailsBg = $(document.createElement('div')).attr({
                'id': 'project-details-bg'
            });
            $projectDetailsCopy = $(document.createElement('div')).attr({
                'id': 'project-details-copy'
            });
            $projectDetails = $(document.createElement('div')).attr({
                    'id': 'project-details',
                    'class': 'hide'
                })
                .append($projectDetailsBg, $projectDetailsCopy);
            $('body').append($projectDetails);
        }

        $projectDetailsCopy.text($description.text());
        $projectDetails.removeAttr('style');
        addListeners();
    };

    var toggle = function () {

        if($projectDetails !== null) {

            isVisible = !isVisible;
            var props = {};
            if(isVisible) {
                $.trackEvent('project-page', 'click', IAAH.manager.getProjectTitle() + '-details');
                $projectDetails
                    .bind('click', function() {
                        toggle();
                    })
                    .removeClass('hide');
                resize();
                $('html, body').animate({scrollTop: '0px'}, '2300');
            }else{
                $projectDetails.unbind('click');
                if(transitionendEventExists) {
                    $projectDetails.bind(IAAH.utils.getTransitionEvent(), onTransitionEnd);
                }else{
                    onTransitionEnd();
                }
            }
            props.opacity = isVisible ? 1 : 0;
            $projectDetails.css(props);
        }

        $projectDetails.show();
        $(document).trigger(IAAH.EVENTS.PROJECTDETAILS_TOGGLED, isVisible);
    };

    var onTransitionEnd = function(e) {
        $projectDetails
            .addClass('hide')
            .unbind(IAAH.utils.getTransitionEvent());
    };

    var onKeyDown = function(e, keyCode) {
        if(keyCode === 27 && isVisible) { // escape key
            toggle();
        }
    };

    var addListeners = function() {
        $(document).bind(IAAH.EVENTS.KEY_DOWN, onKeyDown);
    };

    var removeListeners = function() {
        $(document).unbind(IAAH.EVENTS.KEY_DOWN, onKeyDown);
    };

    var show = function() {
        if($projectDetails !== null) $projectDetails.show();
    };

    var hide = function() {
        if($projectDetails !== null) {
            $projectDetails.addClass('hide');
            // $projectDetails.hide();
            $projectDetails.unbind();
            isVisible = false;
        }

        removeListeners();
    };

    var resize = function () {

        var h = 0,
            introPanelHeight = $('#intro-panel').length ? $('#intro-panel').height() : 0;

        // $projectDetails.css('height', 'auto');

        if (IAAH.manager.isGalleryEnabled()) {
            h = $(window).height() > $projectDetails.height() ? $(window).height() : $projectDetails.height();
            $mainContainer.css('min-height', '100%');
        }else{
            if($mainContainer === null) return;
            $mainContainer.css('min-height', 'auto');
            h = $mainContainer.height() + IAAH.HEADER_HEIGHT + introPanelHeight;
        }
        // console.log('resize', $projectDetails.height(), IAAH.HEADER_HEIGHT, $(window).height());
        // $projectDetails.css('height', h);
        $projectDetailsBg.css('height', h);
    };

    var areVisible = function() {
        return isVisible; //$projectDetails !== null ? $projectDetails.css('opacity') >= 0  : false;
    };

    return {
        init: init,
        toggle: toggle,
        show: show,
        hide: hide,
        areVisible: areVisible,
        resize: resize
    };
})();var IAAH = IAAH || {};

/**
* ProjectFooter
* Contains the social buttons for sharing the current page on Twitter/Facebook/Pinterest
* For Pinterest it uses the bookmarklet instead of the official 'Pin It' widget
*/

IAAH.projectFooter = (function() {

    var init = function() {
        create();
    };

    var create = function() {
        var template = Handlebars.compile(IAAH.templates.socialComponent),
            html,
            projectTitle = $.trim( $('.project_title', '#maincontainer').text() ),
            isTouchDevice =  IAAH.utils.isTouchDevice();

        html = template({
            isIntroPanel: false,
            facebookURL: 'https://www.facebook.com/sharer.php?u=' + encodeURIComponent(window.location.href) + '&t=' + encodeURIComponent($('.project_title', '#maincontainer')),
            twitterURL: isTouchDevice ? 'https://twitter.com/share?url=' + encodeURIComponent(window.location.href) + '&text=' + encodeURIComponent(projectTitle + ' by IAAH / iamalwayshungry') : encodeURIComponent(window.location.href),
            twitterText:  encodeURIComponent(projectTitle + ' by IAAH / iamalwayshungry'),
            pinterestURL: isTouchDevice ? 'javascript:void((function()%7Bvar%20e=document.createElement(&apos;script&apos;);e.setAttribute(&apos;type&apos;,&apos;text/javascript&apos;);e.setAttribute(&apos;charset&apos;,&apos;UTF-8&apos;);e.setAttribute(&apos;src&apos;,&apos;https://assets.pinterest.com/js/pinmarklet.js?r=&apos;+Math.random()*99999999);document.body.appendChild(e)%7D)());' : encodeURIComponent(window.location.href),
            projectTitle: projectTitle,
            iconsColor: 'darkgray',
            includeWidgets: !isTouchDevice,
            isTouchDevice: isTouchDevice
        });

        $('.project_content', '#maincontainer').append(html);

        if(!isTouchDevice) {
            initSocialComponent();
        }
    };

    var initSocialComponent = function() {
        var socialComponent = new IAAH.socialComponent({
            offset: 0,
            buttonWidth: 45,
            expandedButtonWidth: 90,
            $holder: $('.project_content', '#maincontainer'),
            alignment: 'center'
        });

    };

    return {
        init: init
    };

})();
var IAAH = IAAH || {};

/**
* ProjectPage
*/

IAAH.projectPage = (function() {

	var init = function() {
		IAAH.projectContent.init();
		IAAH.projectPanel.init();
        IAAH.projectDetails.init();
        IAAH.projectFooter.init();
	};

	var show = function() {

	};

	var hide = function() {
		IAAH.projectDetails.hide();
        IAAH.gallery.hide();
        IAAH.projectPanel.hide();
	};

	var resize = function() {
		IAAH.projectContent.resize();
		IAAH.projectDetails.resize();
	};

	return {
		init: init,
		hide: hide,
		resize: resize
	};



})();var IAAH = IAAH || {};

/**
* ProjectPanel
* Displays basic project information, like title, image-count, project-details toggle (MORE/LESS)
*/

IAAH.projectPanel = (function () {

    var $navContainer = null,
        $projectPanel = null,
        $projectTitle = null,
        $detailsButton = null,
        $images = null,
        $imageNav = null,
        $divider = null,
        numImages = 0,
        isMinimal = false,
        selected;

    var init = function() {
        console.log('init projectPanel');
        selected = [];
        $images = $('.project_content img', '#maincontainer');
        numImages = $images.length;

        if($projectPanel !== null) {
            hide();
        }
        create();
    };

    var create = function() {

        var template = Handlebars.compile(IAAH.templates.projectPanel),
            templateData = {},
            html;

        var $originalProjectTitle = $('.project_title', '#maincontainer');

        // set template data
        templateData.projectTitle = $originalProjectTitle.text();
        templateData.hasProjectDetails = $('#project-description').text().trim().length > 0;
        templateData.fullscreenGalleryEnabled = false;

        $originalProjectTitle.css('display', 'none');
        $originalProjectTitle = null;

        if(IAAH.manager.isGalleryEnabled()) {
            templateData.fullscreenGalleryEnabled = true;
            templateData.numImages = numImages;
        }

        html = template(templateData);
        $projectPanel = $(html);
        $imageNav = $projectPanel.filter('#image-nav');
        $detailsButton = $projectPanel.filter('#details-button');

        // append to DOM
        $('#secondary-nav').html($projectPanel);

        addListeners();
        onImageChanged(null, 0);
    };

    var onImageChanged = function(e, imageIndex) {
        // hide project details if visible
        if(IAAH.projectDetails.areVisible()) {
            IAAH.projectDetails.toggle();
        }

        $imageNav.text((imageIndex+1) + ' / ' + numImages);
    };

    var onProjectDetailsToggled = function(detailsDisplayed) {
        if($detailsButton !== null) {
            $detailsButton.find('a').text(detailsDisplayed ? 'LESS' : 'MORE');
        }
    };

    var addListeners = function() {
        $(document).bind(IAAH.EVENTS.PROJECTDETAILS_TOGGLED, function(e, detailsVisible) {
            onProjectDetailsToggled(detailsVisible);
        });

        $detailsButton.bind('click', function (e) {
            e.preventDefault();
            IAAH.projectDetails.toggle();
        });

        $(document).bind(IAAH.EVENTS.IMAGE_CHANGED, onImageChanged);
    };

    var removeListeners = function() {
        $(document).unbind(IAAH.EVENTS.PROJECTDETAILS_TOGGLED);
        $(document).unbind(IAAH.EVENTS.IMAGE_CHANGED);
        if($detailsButton !== null) $detailsButton.unbind('click');
    };

    var show = function() {
        if ($projectPanel !== null) $projectPanel.show();
        addListeners();
    };

    var hide = function() {
        removeListeners();

        if ($projectPanel !== null) {
            $projectPanel.remove();
            $projectPanel = null;
        }
    };

    return {
        init: init,
        show: show,
        hide: hide
    };

})();var IAAH = IAAH || {};

/**
* GalleryNoneTouchControls
* Displays arrows on sides and creates hitarea
*/

IAAH.galleryNoneTouchControls = (function () {

    var $body = null,
        $controls = null,
        timeout = null,
        delay = 3000,
        windowWidth = 0,
        activeNavButton = 'none';

    var init = function() {
        if($body === null) $body = $('body');

        resize();
        create();
    };

    var create = function () {

        if($controls === null) {

            $controls = $(document.createElement('div')).attr('id', 'gallery-controls');

            var $prevButton = $(document.createElement('div')).attr({
                'class': 'button prev-button',
                'alt': 'Previous slide'
            });

            var $nextButton = $(document.createElement('div')).attr({
                'class': 'button next-button',
                'alt': 'Next slide'
            });

            $controls.append($prevButton, $nextButton);
            $body.append($controls);
            addListeners();

        }else{
            $controls.show();
        }
    };

    var initTimeout = function() {
        if(timeout) window.clearTimeout(timeout);

        timeout = window.setTimeout(function() {
            hideControls();
        }, delay);
    };

    var reposition = function () {
        $controls.css({
          'top': Math.floor($(window).height() / 2) - (37 / 2) // 37 = image height
        });
    };

    var setNavButton = function(button) {
        if(button === activeNavButton) return;

        if(button === 'none') {
            $body.css('cursor', 'default');
            hideButton('.prev-button');
            hideButton('.next-button');
        }else{
            $body.css('cursor', 'pointer');
            showButton(button);
            hideButton(activeNavButton);
        }
        activeNavButton = button;
    };

    var showButton = function(button) {
        if(button === 'none' || button === null) return;
        $(button, $controls).css('opacity', 1);
    };

    var hideButton = function(button) {
        if(button === 'none' || button === null) return;
        $(button, $controls).css('opacity', 0);
    };

    var showControls = function() {
        $controls.css('opacity', 1);
    };

    var hideControls = function() {
        $controls.css('opacity', 0);
    };

    var onKeyDown = function (e, keyCode) {
        // console.log(this, e.keyCode);
        switch (keyCode) {
            case 37: // left arrow
                $(document).trigger(IAAH.EVENTS.PREV_IMAGE);
                break;
            case 39: // right arrow
                $(document).trigger(IAAH.EVENTS.NEXT_IMAGE);
                break;
            default:
                // console.log(this, e.keyCode);
                break;
        }
    };

    var onMouseOver = function() {
        showControls();
    };

    var onMouseOut = function() {
        hideControls();
    };

    var onMouseMove = function(e) {

        if(e.pageY < IAAH.HEADER_HEIGHT) {
            setNavButton('none');
        }else if(e.pageX < 0.5 * windowWidth) {
            setNavButton('.prev-button');
        }else if(e.pageX > 0.5 * windowWidth) {
           setNavButton('.next-button');
        }else{
            setNavButton('none');
        }

        showControls();
        initTimeout();
    };

    var onMouseClick = function(e) {

        showControls();
        initTimeout();

        if(activeNavButton === '.prev-button') {
            $(document).trigger(IAAH.EVENTS.PREV_IMAGE);
        }else if(activeNavButton === '.next-button'){
            $(document).trigger(IAAH.EVENTS.NEXT_IMAGE);
        }
    };

    var addListeners = function () {
        $(document).bind(IAAH.EVENTS.KEY_DOWN, onKeyDown);
        $controls.bind('mouseover', onMouseOver)
            .bind('mouseout', onMouseOut)
            .bind('mousemove', onMouseMove)
            .bind('click', onMouseClick);
    };

    var removeListeners = function () {
        $(document).unbind(IAAH.EVENTS.KEY_DOWN, onKeyDown);
        if($controls !== null ) {
            $controls.unbind('mouseover')
                .unbind('mouseout')
                .unbind('mousemove')
                .unbind('click');
        }

        if(timeout) window.clearTimeout(timeout);
        timeout = null;
    };

    var destroy = function() {

        removeListeners();

        setNavButton('none');

        if($controls !== null) {
            $controls.remove();
            $controls = null;
        }
    };

    var resize = function() {
        windowWidth = $(window).width();
    };

    return {
        init: init,
        reposition: reposition,
        addListeners: addListeners,
        removeListeners: removeListeners,
        destroy: destroy,
        resize: resize
    };
})();var IAAH = IAAH || {};

/**
* GalleryTouchControls
* Enables swipe gesture for fullscreen gallery
*/

IAAH.galleryTouchControls = (function() {

    var $body = null,
        $swipeArea = null;

    var init = function() {
        $body = $('body');
        addSwipeDetection();
    };

    var addSwipeDetection = function() {
        if ($swipeArea === null) {
            $swipeArea = $(document.createElement('div')).attr('id', 'swipe-area');
            $body.append($swipeArea);
        }

        addListeners();
    };

    var addListeners = function() {

        $swipeArea.css({
            '-webkit-user-select': 'none',
            '-webkit-user-drag': 'none'
        });

        $swipeArea.swipeEvents()
            .bind('swipeLeft', next)
            .bind('swipeRight', prev);
    };

    var removeListeners = function() {

        if ($swipeArea !== null) {
            $swipeArea.unbind();
        }
    };

    var next = function() {
        $(document).trigger(IAAH.EVENTS.NEXT_IMAGE);
    };

    var prev = function() {
        $(document).trigger(IAAH.EVENTS.PREV_IMAGE);
    };

    var resize = function() {};

    var destroy = function() {

        removeListeners();

        if ($swipeArea !== null) {
            $swipeArea.remove();
            $swipeArea = null;
        }
    };

    return {
        init: init,
        addListeners: addListeners,
        removeListeners: removeListeners,
        destroy: destroy,
        resize: resize
    };
})();
var IAAH = IAAH || {};

/**
* Gallery
* Fetches images from DOM and displays them in a fullscreen image gallery
* To use place images inside div with id 'fullscreen-gallery', sample:
* <div id="fullscreen-gallery">{image 1}{image 2}</div>
*/

IAAH.gallery = (function () {

    var numImages,
        imageIndex,
        imageList,
        $body = null,
        $images = null,
        $backstretch = null,
        $loader = null,
        controls = null;

    var init = function() {
        if($body === null) $body = $('body');
        $loader = $('#nav_loadspin');

        imageList = [];
        imageIndex = 0;
        numImages = 0;

        fetchImages();

        if (numImages > 1) {
            initControls();
        }

        addListeners();
        setImage(0);

        if($backstretch !== null) {
            $backstretch.show();
        }
    };

    var fetchImages = function() {

        $images = $('.project_content img', '#maincontainer');
        numImages = $images.length;

        for(var i = 0; i < numImages; i++) {

            var src = $($images[i]).attr('src_o');
            if (src.substr(0, 2) === '//') {
                src = 'https:' + src;
            }

            imageList.push(src);
        }

        console.log('fetchImages', imageList);
    };

    var initControls = function () {

        if(IAAH.utils.isTouchDevice()) {
            controls = IAAH.galleryTouchControls;
        }else{
            controls = IAAH.galleryNoneTouchControls;
        }
        controls.init();
    };

    var setImage = function (index) {

        imageIndex = index;
        $loader.show();

        $.backstretch(imageList[index]);

        if($backstretch === null) {
            $backstretch = $('#backstretch');
        }
        $(document).trigger(IAAH.EVENTS.IMAGE_CHANGED, index);
    };

    var calculateIndex = function (index, delta) {
        index += delta;
        if (index >= numImages) {
            index = 0;
        } else if (index < 0) {
            index = numImages - 1;
        }
        return index;
    };

    var addListeners = function() {
        if (numImages > 1) {

            $(document).bind(IAAH.EVENTS.PROJECTDETAILS_TOGGLED, function() {
                // if(IAAH.manager.isFullscreenGalleryEnabled()) {
                    if(IAAH.projectDetails.areVisible()) {
                        controls.removeListeners();
                    }else{
                        controls.addListeners();
                    }
                // }
            });
        }

        $(document).bind(IAAH.EVENTS.NEXT_IMAGE, function() {
            setImage(calculateIndex(imageIndex, 1));
        });

        $(document).bind(IAAH.EVENTS.PREV_IMAGE, function() {
            setImage(calculateIndex(imageIndex, -1));
        });

    };

    var removeListeners = function() {
        $(document).unbind(IAAH.EVENTS.PROJECTDETAILS_TOGGLED);
        $(document).unbind(IAAH.EVENTS.NEXT_IMAGE);
        $(document).unbind(IAAH.EVENTS.PREV_IMAGE);
    };

    var hide = function() {

        if($backstretch !== null) {
            $backstretch.hide();
            $backstretch.empty();
        }

        if(controls !== null) {
            controls.destroy();
            controls = null;
        }

        removeListeners();
    };

    var resize = function() {
        controls.resize();
    };

    return {
        init: init,
        hide: hide,
        addListeners: addListeners,
        removeListeners: removeListeners,
        resize: resize
    };
})();var IAAH = IAAH || {};

/**
* SocialComponent
* Activates social component making the widgets appear on rollover
*/

IAAH.socialComponent = function(props) {
    this.init(props);
};

IAAH.socialComponent.prototype.init = function(props) {
    if(props) {
        this.offset = props.offset;
        this.buttonWidth = props.buttonWidth || 45;
        this.expandedButtonWidth = props.expandedButtonWidth || 90;
        this.$holder = props.$holder;
        this.alignment = props.alignment || 'center';
    }

    this.supportCSSTransitions = Modernizr.csstransitions;
    this.activeIndex = null;
    this.timer = null;

    this.$social = this.$holder.find('.social-outer');
    this.$socialIcons = this.$social.find('.social-icon');
    this.$socialWidgets = this.$social.find('.social-widget');

    this.addListeners();
    this.positionSocialItems();
    this.initWidgets();
};

IAAH.socialComponent.prototype.positionSocialItems = function() {

    for (var i = 0, l = this.$socialIcons.length; i < l; i++) {
        $(this.$socialIcons[i]).css('left', this.offset + i * this.buttonWidth );
        if(this.alignment === 'left') {
            $(this.$socialWidgets[i]).css('left', this.offset + i * this.buttonWidth );
        }else{
            $(this.$socialWidgets[i]).css('left', this.offset + this.buttonWidth * 0.5 - this.expandedButtonWidth * 0.5 + i * this.buttonWidth );
        }
    }
};

IAAH.socialComponent.prototype.onSocialButtonOver = function(e, t) {
    this.updateSocialItems($(e.currentTarget).index());
};

IAAH.socialComponent.prototype.onSocialOut = function(e) {
    this.updateSocialItems(null);
};

IAAH.socialComponent.prototype.updateSocialItems = function(index) {
    if(this.activeIndex === index) return;

    this.activeIndex = index;
    for (var i = this.$socialIcons.length - 1; i >= 0; i--) {
        if(i === index) { // if active item
            this.activateSocialItem(i);
        }else{
            this.deactivateSocialItem(i, index === null);
        }
    }
};

IAAH.socialComponent.prototype.activateSocialItem = function(i) {

    $(this.$socialIcons[i])
        .addClass('expand')
        .css('left', this.offset + i * this.buttonWidth);

    $(this.$socialWidgets[i]).unbind(IAAH.utils.getTransitionEvent());

    $(this.$socialWidgets[i]).css({
        'visibility': 'visible',
        'opacity': '1'
    });
};

IAAH.socialComponent.prototype.deactivateSocialItem = function(i, deactivateAll) {
    var leftPos = 0;
    if(!deactivateAll) {
        if(this.alignment === 'left') {
            leftPos = i > this.activeIndex ? 44 : 0;
        }else{
            leftPos = i < this.activeIndex ? -22 : 22;
        }
    }

    $(this.$socialIcons[i])
        .css('left', this.offset + i * this.buttonWidth + leftPos)
        .removeClass('expand');

    if(transitionendEventExists) {
        $(this.$socialWidgets[i]).bind(IAAH.utils.getTransitionEvent(), function(e) {
            $(e.currentTarget)
                .unbind(IAAH.utils.getTransitionEvent())
                .css('visibility', 'hidden');
        });
        $(this.$socialWidgets[i]).css('opacity', '0');

    }else{
        $(this.$socialWidgets[i]).css({
            'visibility': 'hidden',
            'opacity': '0'
        });
    }
};

IAAH.socialComponent.prototype.addListeners = function() {

    this.$social.find('.social-icon').bind('mouseover', this.onSocialButtonOver.bind(this));
    this.$social.bind('mouseleave', this.onSocialOut.bind(this));
};

IAAH.socialComponent.prototype.removeListeners = function() {

    this.$social.find('.social-icon').unbind('mouseover');
    this.$social.unbind('mouseleave');
};

IAAH.socialComponent.prototype.initWidgets = function() {

    $.getScript('//platform.twitter.com/widgets.js', function(){
        twttr.widgets.load();
    });
};