// ==========================================================
// MathHeroes
// questions.js V2
// PART 1 OF 4
// ==========================================================

const QuestionGenerator = {

    // ==========================================
    // RANGE PER GRADE
    // ==========================================

    ranges: {
        1: 10,
        2: 20,
        3: 50,
        4: 100,
        5: 500,
        6: 1000
    },

    // ==========================================
    // LANGUAGE
    // ==========================================

    language: {

        id: {
            addition: "Penjumlahan",
            subtraction: "Pengurangan",
            multiplication: "Perkalian",
            division: "Pembagian"
        },

        en: {
            addition: "Addition",
            subtraction: "Subtraction",
            multiplication: "Multiplication",
            division: "Division"
        }

    },

    // ==========================================
    // STORY DATABASE
    // ==========================================

    storyData: {
        
        items: {

    id: [
        "apel",
        "pensil",
        "buku",
        "bola",
        "permen",
        "jeruk"
    ],

    en: [
        "apples",
        "pencils",
        "books",
        "balls",
        "candies",
        "oranges"
    ]

},

places: {

    id: [
        "sekolah",
        "rumah",
        "toko",
        "kebun"
    ],

    en: [
        "school",
        "house",
        "store",
        "garden"
    ]

},

names: {

    id: [
        "Kenan",
        "Kinan",
        "Arsyi",
        "Adzni"
    ],

    en: [
        "Mickey",
        "JJ",
        "Akudav",
        "Sixseven"
    ]

},

    // ==========================================
    // STORY TEMPLATE
    // ==========================================

    storyTemplates: {

    id: {

        addition: [

            "{name} memiliki {a} {item}. Kemudian membeli lagi {b} {item}. Berapa jumlah {item} milik {name} sekarang?",

            "Di {place}, {name} menemukan {a} {item}. Setelah itu ia mendapatkan lagi {b} {item}. Berapa jumlah seluruh {item}?",

            "{name} membawa {a} {item} ke sekolah. Guru memberikan lagi {b} {item}. Berapa jumlah {item} yang dimiliki {name}?"

        ],

        subtraction: [

            "{name} mempunyai {a} {item}. Ia memberikan {b} {item} kepada temannya. Berapa sisa {item} milik {name}?",

            "Di {place}, terdapat {a} {item}. Sebanyak {b} {item} dipindahkan. Berapa yang masih tersisa?",

            "{name} membeli {a} {item}. Sebanyak {b} {item} hilang. Berapa {item} yang masih dimiliki?"

        ],

        multiplication: [

            "{name} mempunyai {a} kotak. Setiap kotak berisi {b} {item}. Berapa jumlah seluruh {item}?",

            "Di {place} terdapat {a} rak. Setiap rak berisi {b} {item}. Berapa jumlah semuanya?",

            "{name} menanam {a} baris tanaman. Setiap baris berisi {b} tanaman. Berapa jumlah tanaman?"

        ],

        division: [

            "{name} memiliki {a} {item}. Semua {item} dibagikan sama banyak kepada {b} anak. Berapa yang diterima setiap anak?",

            "Di {place} tersedia {a} {item}. Semua dimasukkan ke dalam {b} kotak sama banyak. Berapa isi setiap kotak?",

            "{name} mempunyai {a} permen. Permen dibagikan kepada {b} teman dengan jumlah yang sama. Berapa permen yang diterima setiap teman?"

        ]

    },

    en: {

        addition: [

            "{name} has {a} {item}. Then buys {b} more {item}. How many {item} does {name} have now?",

            "At the {place}, {name} finds {a} {item}. Later receives {b} more. How many {item} are there in total?",

            "{name} brings {a} {item} to school. The teacher gives {b} more. How many {item} does {name} have?"

        ],

        subtraction: [

            "{name} has {a} {item}. Gives {b} {item} to a friend. How many {item} are left?",

            "There are {a} {item} in the {place}. {b} are taken away. How many remain?",

            "{name} buys {a} {item}. Then loses {b}. How many {item} remain?"

        ],

        multiplication: [

            "{name} has {a} boxes. Each box contains {b} {item}. How many {item} are there altogether?",

            "There are {a} shelves in the {place}. Each shelf has {b} {item}. How many are there in total?",

            "{name} plants {a} rows. Each row has {b} plants. How many plants are there?"

        ],

        division: [

            "{name} has {a} {item}. They are shared equally among {b} children. How many does each child receive?",

            "There are {a} {item} in the {place}. They are packed equally into {b} boxes. How many are in each box?",

            "{name} has {a} candies. The candies are shared equally among {b} friends. How many candies does each friend get?"

        ]

     }

},

},

    // ==========================================
    // RANDOM NUMBER
    // ==========================================

    random(min, max){

        return Math.floor(
            Math.random() *
            (max-min+1)
        ) + min;

    },

    // ==========================================
    // RANDOM ITEM
    // ==========================================

    pick(array){

        return array[
            this.random(
                0,
                array.length-1
            )
        ];

    },
    // ==========================================
    // SHUFFLE ARRAY
    // ==========================================

    shuffle(array){

        for(let i=array.length-1;i>0;i--){

            const j=this.random(0,i);

            [array[i],array[j]]=[
                array[j],
                array[i]
            ];

        }

        return array;

    },

    // ==========================================
    // CREATE OPTIONS
    // ==========================================

    createOptions(answer){

        const options=[answer];

        while(options.length<4){

            let wrong=
                answer+
                this.random(-10,10);

            if(wrong<0)
                continue;

            if(options.includes(wrong))
                continue;

            options.push(wrong);

        }

        return this.shuffle(options);

    },

    // ==========================================
    // CREATE STORY QUESTION
    // ==========================================

    createStoryQuestion(
        grade,
        operation,
        language
    ){

        const max=this.ranges[grade];

        let a,b,answer;

        switch(operation){

            case "addition":

                a=this.random(1,max);
                b=this.random(1,max);
                answer=a+b;

            break;

            case "subtraction":

                a=this.random(1,max);
                b=this.random(1,max);

                if(a<b){

                    [a,b]=[b,a];

                }

                answer=a-b;

            break;

            case "multiplication":

                a=this.random(
                    1,
                    Math.max(
                        5,
                        Math.floor(max/10)
                    )
                );

                b=this.random(1,10);

                answer=a*b;

            break;

            case "division":

                b=this.random(1,10);

                answer=this.random(
                    1,
                    Math.max(
                        5,
                        Math.floor(max/10)
                    )
                );

                a=answer*b;

            break;

        }

        const template =
    this.pick(
        this.storyData.storyTemplates[
            language
        ][
            operation
        ]
    );

        const question=
            template

            .replaceAll(
    "{name}",
    this.pick(
        this.storyData.names[language]
    )
)

.replaceAll(
    "{item}",
    this.pick(
        this.storyData.items[language]
    )
)

.replaceAll(
    "{place}",
    this.pick(
        this.storyData.places[language]
    )
)

            .replaceAll(
                "{a}",
                a
            )

            .replaceAll(
                "{b}",
                b
            );

        const options=
            this.createOptions(answer);

        return{

    a: a,

    b: b,

    operation: operation,

    correctAnswer: answer,

    question:

        question,

    options:

        options,

    answer:

        options.indexOf(answer)

};

    },
    // ==========================================
    // CREATE NORMAL QUESTION
    // ==========================================

    createNormalQuestion(
        grade,
        operation
    ){

        const max=this.ranges[grade];

        let a,b,answer;

        switch(operation){

            case "addition":

                a=this.random(1,max);
                b=this.random(1,max);
                answer=a+b;

            break;

            case "subtraction":

                a=this.random(1,max);
                b=this.random(1,max);

                if(a<b){

                    [a,b]=[b,a];

                }

                answer=a-b;

            break;

            case "multiplication":

                a=this.random(
                    1,
                    Math.max(
                        5,
                        Math.floor(max/10)
                    )
                );

                b=this.random(1,10);

                answer=a*b;

            break;

            case "division":

                b=this.random(1,10);

                answer=this.random(
                    1,
                    Math.max(
                        5,
                        Math.floor(max/10)
                    )
                );

                a=answer*b;

            break;

        }

        const options=
            this.createOptions(answer);

        return{

    a: a,

    b: b,

    operation: operation,

    correctAnswer: answer,

    question:

        `${a} ${
            operation==="addition" ? "+" :
            operation==="subtraction" ? "-" :
            operation==="multiplication" ? "×" : "÷"
        } ${b} = ?`,

    options:

        options,

    answer:

        options.indexOf(answer)

};

    },
    // ==========================================
    // GENERATE QUESTIONS
    // ==========================================

    generate(
        grade,
        operation,
        totalQuestions,
        language = "id",
        questionType = "normal"
    ){

        const questions = [];

        for(let i=0;i<totalQuestions;i++){

            let q;

            if(questionType==="story"){

                q = this.createStoryQuestion(
                    grade,
                    operation,
                    language
                );

            }else{

                q = this.createNormalQuestion(
                    grade,
                    operation
                );

            }

            q.grade = grade;
            q.operation = operation;
            q.language = language;
            q.type = questionType;
            q.number = i + 1;

            questions.push(q);

        }

        return questions;

    },

    // ==========================================
    // GET OPERATION NAME
    // ==========================================

    getOperationName(operation,language="id"){

        return this.language[language][operation];

    },

    // ==========================================
    // GET MAX NUMBER
    // ==========================================

    getMaxNumber(grade){

        return this.ranges[grade];

    },

    // ==========================================
    // GET GRADE LIST
    // ==========================================

    getGrades(){

        return [

            {value:1,text:"Kelas 1"},
            {value:2,text:"Kelas 2"},
            {value:3,text:"Kelas 3"},
            {value:4,text:"Kelas 4"},
            {value:5,text:"Kelas 5"},
            {value:6,text:"Kelas 6"}

        ];

    },

    // ==========================================
    // GET OPERATION LIST
    // ==========================================

    getOperations(language="id"){

        return [

            {
                value:"addition",
                text:this.language[language].addition
            },

            {
                value:"subtraction",
                text:this.language[language].subtraction
            },

            {
                value:"multiplication",
                text:this.language[language].multiplication
            },

            {
                value:"division",
                text:this.language[language].division
            }

        ];

    }

};

// ==========================================================
// END OF FILE
// ==========================================================