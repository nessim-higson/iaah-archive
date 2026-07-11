var LetterDataModel = (function() {

    // static function!   

    // Just so you can see what "this" refers to. It's the global window object.
    // Never attach anything to "this" because then it's a global var/method
    // and you start polluting the global namespace.


    // This pattern gives you closure privacy. This is self executing which
    // means you don't have to use the new operator but this is a static/singleton
    // class. Only one instance is created.

    // All methods are private. You don't have to worry about scoping or using
    // "this". If you were to trace out "this", you would get an instance of
    // the global window object. Never use "this" within the module pattern.
    'use strict';

    var objectsTemp = {
        "A": [
            { file: "A_1.png" },
            { file: "A_2.png" },
            { file: "A_3.png" },
            { file: "A_4.png" }
        ],
        " ": [
            { file: "space.png" }
        ],
        "B": [
            { file: "B_1.png" },
            { file: "B_2.png" },
            { file: "B_3.png" }
        ],
        "C": [
            { file: "C_1.png" },
            { file: "C_2.png" },
            { file: "C_3.png" }
        ],
        "D": [
            { file: "D_1.png" },
            { file: "D_2.png" },
            { file: "D_3.png" }
        ],
        "E": [
            { file: "E_1.png" },
            { file: "E_2.png" },
            { file: "E_3.png" }
        ],
        "F": [
            { file: "F_1.png" },
            { file: "F_2.png" },
            { file: "F_3.png" }
        ],
        "G": [
            { file: "G_1.png" },
            { file: "G_2.png" },
            { file: "G_3.png" },
            { file: "G_4.png" }
        ],
        "H": [
            { file: "H_1.png" },
            { file: "H_2.png" },
            { file: "H_3.png" }
        ],
        "I": [
            { file: "I_1.png" },
            { file: "I_2.png" },
            { file: "I_3.png" }
        ],
        "J": [
            { file: "J_1.png" },
            { file: "J_2.png" },
            { file: "J_3.png" }
        ],
        "K": [
            { file: "K_1.png" },
            { file: "K_2.png" },
            { file: "K_3.png" }
        ],
        "L": [
            { file: "L_1.png" },
            { file: "L_2.png" },
            { file: "L_3.png" }
        ],
        "M": [
            { file: "M_1.png" },
            { file: "M_2.png" },
            { file: "M_3.png" }
        ],
        "N": [
            { file: "N_1.png" },
            { file: "N_2.png" },
            { file: "N_3.png" }
        ],
        "O": [
            { file: "O_1.png" },
            { file: "O_2.png" },
            { file: "O_3.png" },
            { file: "O_4.png" },
            { file: "O_5.png" },
            { file: "O_6.png" }
        ],
        "P": [
            { file: "P_1.png" },
            { file: "P_2.png" },
            { file: "P_3.png" }
        ],
        "Q": [
            { file: "Q_1.png" },
            { file: "Q_2.png" },
            { file: "Q_3.png" }
        ],
        "R": [
            { file: "R_1.png" },
            { file: "R_2.png" },
            { file: "R_3.png" }
        ],
        "S": [
            { file: "S_1.png" },
            { file: "S_2.png" },
            { file: "S_3.png" }
        ],
        "T": [
            { file: "T_1.png" },
            { file: "T_2.png" },
            { file: "T_3.png" }
        ],
        "U": [
            { file: "U_1.png" },
            { file: "U_2.png" },
            { file: "U_3.png" }
        ],
        "V": [
            { file: "V_1.png" },
            { file: "V_2.png" },
            { file: "V_3.png" }
        ],
        "W": [
            { file: "W_1.png" },
            { file: "W_2.png" },
            { file: "W_3.png" },
            { file: "W_4.png" },
            { file: "W_5.png" },
            { file: "W_6.png" }
        ],
        "X": [
            { file: "X_1.png" },
            { file: "X_2.png" },
            { file: "X_3.png" }
        ],
        "Y": [
            { file: "Y_1.png" },
            { file: "Y_2.png" },
            { file: "Y_3.png" }
        ],
        "Z": [
            { file: "Z_1.png" },
            { file: "Z_2.png" },
            { file: "Z_3.png" }
        ],

    }

    var objectsLines = {
        "lines": [
            { file: "line-1.png" },
            { file: "line-2.png" },
            { file: "line-3.png" },
            { file: "line-4.png" },
            { file: "line-5.png" },
            { file: "line-6.png" },
            { file: "line-7.png" },
            { file: "line-8.png" },
            { file: "line-9.png" }
        ]
    }

    var objectsHorizontalLines = {
        "lines": [
            { file: "line-1.png" },
            { file: "line-2.png" },
            { file: "line-3.png" },
            { file: "line-4.png" },
            { file: "line-5.png" },
            { file: "line-6.png" },
            { file: "line-7.png" },
            { file: "line-8.png" },
            { file: "line-9.png" },
            { file: "line-10.png" },
            { file: "line-11.png" },
            { file: "line-12.png" },
            { file: "line-13.png" },
            { file: "line-14.png" },
            { file: "line-15.png" },
            { file: "line-16.png" }

        ]
    }

    var objectsCorners = {
        "corners": [
            { file: "CORNER-1.png" },
            { file: "CORNER-2.png" },
            { file: "CORNER-3.png" },
            { file: "CORNER-4.png" },
            { file: "CORNER-5.png" },
            { file: "CORNER-6.png" },
            { file: "CORNER-7.png" },
            { file: "CORNER-8.png" },
            { file: "CORNER-9.png" },
            { file: "CORNER-10.png" }
        ]
    }

    function getData() {
        return objectsTemp;
    }

    function getDataById(id) {
        // return data[id]
    }

    function getObjectsByLetter(type) {
        return objectsTemp[type];
    }

    function getLines() {
        return objectsLines;
    }

    function getHorizontalLines() {
        return objectsHorizontalLines;
    }

    function getCorners() {
        return objectsCorners;
    }

    return {

        // public functions  example.  Application.init

        getLines: getLines,
        getHorizontalLines: getHorizontalLines,
        getCorners: getCorners,
        getObjectsByLetter: getObjectsByLetter,
        getData: getData,
        getDataById: getDataById

        // public vars


    };

})();
