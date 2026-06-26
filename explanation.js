// ===============================================
// MathHeroes Explanation Engine V2
// ===============================================

const Explanation = {

    generate(operation, a, b, language = "id") {

    switch (operation) {

        case "addition":
            return this.addition(a, b, language);

        case "subtraction":
            return this.subtraction(a, b, language);

        case "multiplication":
            return this.multiplication(a, b, language);

        case "division":
            return this.division(a, b, language);

        default:
            return null;

    }

},

    // ===========================================
    // PENJUMLAHAN
    // ===========================================

    addition(a, b, language) {

    const satuan1 = a % 10;
const t = language === "en"
? {
    title: "How to Solve",
    answer: "Answer",

    step1: "Step 1",
    step2: "Step 2",
    step3: "Step 3",

    desc1: "Add the ones digits.",
    desc2: "Write the ones digit and carry the tens digit.",
    desc3: "Add the tens digits.",

    final: "Final answer."

}
: {

    title: "Cara Menghitung",
    answer: "Jawaban",

    step1: "Langkah 1",
    step2: "Langkah 2",
    step3: "Langkah 3",

    desc1: "Jumlahkan angka satuan.",
    desc2: "Tulis angka satuan dan simpan angka puluhan.",
    desc3: "Jumlahkan angka puluhan.",

    final: "Hasil akhir."

};
    const satuan2 = b % 10;

    const puluhan1 = Math.floor(a / 10);
    const puluhan2 = Math.floor(b / 10);

    const hasilSatuan = satuan1 + satuan2;

    const simpan = Math.floor(hasilSatuan / 10);

    const tulis = hasilSatuan % 10;

    const hasilPuluhan =
        puluhan1 +
        puluhan2 +
        simpan;

    return {

        title: t.title,

        question: `${a} + ${b}`,

        answer: a + b,

        steps: [

            {

                title: t.step1,

                description: t.desc1,

                value:
                `${satuan1} + ${satuan2} = ${hasilSatuan}`

            },

            {

                title: t.step2,

                description: t.desc2,

                value:
language === "en"
    ? `Write ${tulis}, carry ${simpan}`
    : `Tulis ${tulis}, simpan ${simpan}`

            },

            {

                title: t.step3,

                description: t.desc3,

                value:
                `${puluhan1} + ${puluhan2} + ${simpan} = ${hasilPuluhan}`

            },

            {

                title: t.answer,

                description: t.final,

                value:
                `${a} + ${b} = ${a + b}`

            }

        ]

    };

},

    // ===========================================
    // PENGURANGAN
    // ===========================================

    subtraction(a, b, language) {
const t = language === "en"
?{

    title:"How to Solve",

    answer:"Answer",

    step1:"Step 1",

    step2:"Step 2",

    final:"Final Answer.",

    desc1:"Subtract the ones digits.",

    desc2:"Subtract the tens digits."

}
:{

    title:"Cara Menghitung",

    answer:"Jawaban",

    step1:"Langkah 1",

    step2:"Langkah 2",

    final:"Hasil akhir.",

    desc1:"Kurangi angka satuan.",

    desc2:"Kurangi angka puluhan."

};

    const satuan1 = a % 10;
    const satuan2 = b % 10;

    const puluhan1 = Math.floor(a / 10);
    const puluhan2 = Math.floor(b / 10);

    const pinjam = satuan1 < satuan2;

    const nilaiSatuan = pinjam ? satuan1 + 10 : satuan1;

    const hasilSatuan = nilaiSatuan - satuan2;

    const hasilPuluhan =
        (pinjam ? puluhan1 - 1 : puluhan1) - puluhan2;

    const steps = [];

    steps.push({

        title: t.step1,

        description: t.desc1,

        value: pinjam
    ? (
        language === "en"
        ? `${satuan1} is not enough, borrow 1 ten → ${nilaiSatuan} - ${satuan2} = ${hasilSatuan}`
        : `${satuan1} tidak cukup, pinjam 1 puluhan → ${nilaiSatuan} - ${satuan2} = ${hasilSatuan}`
    )
    : `${satuan1} - ${satuan2} = ${hasilSatuan}`

    });

    steps.push({

        title: t.step2,

        description: t.desc2,

        value: pinjam
    ? (
        language === "en"
        ? `${puluhan1} - 1 = ${puluhan1 - 1}, then ${(puluhan1 - 1)} - ${puluhan2} = ${hasilPuluhan}`
        : `${puluhan1}-1 = ${puluhan1-1}, lalu ${(puluhan1-1)} - ${puluhan2} = ${hasilPuluhan}`
    )
    : `${puluhan1} - ${puluhan2} = ${hasilPuluhan}`

    });

    steps.push({

        title: t.answer,

        description: t.final,

        value: `${a} - ${b} = ${a-b}`

    });

    return {

        title: t.title,

        question: `${a} - ${b}`,

        answer: a - b,

        steps: steps

    };

},

    // ===========================================
    // PERKALIAN
    // ===========================================

    multiplication(a, b, language) {
const t = language === "en"
?{

    title:"How to Solve",

    answer:"Answer",

    step1:"Step 1",

    step2:"Step 2",

    final:"Final Answer.",

    desc1:"Multiplication is repeated addition.",

    desc2:"Add the same number repeatedly."

}
:{

    title:"Cara Menghitung",

    answer:"Jawaban",

    step1:"Langkah 1",

    step2:"Langkah 2",

    final:"Hasil akhir.",

    desc1:"Perkalian adalah penjumlahan berulang.",

    desc2:"Lakukan penjumlahan berulang."

};

    const hasil = a * b;

    const steps = [];

    steps.push({

        title: t.step1,

        description: t.desc1,

        value:
language === "en"
? `${a} × ${b} means adding ${a} a total of ${b} times`
: `${a} × ${b} berarti ${a} dijumlahkan sebanyak ${b} kali`

    });

    let penjumlahan = "";
    let total = 0;

    for(let i = 1; i <= b; i++){

        total += a;

        penjumlahan += a;

        if(i < b){

            penjumlahan += " + ";

        }

    }

    penjumlahan += ` = ${hasil}`;

    steps.push({

        title: t.step2,

        description: t.desc2,

        value: penjumlahan

    });

    steps.push({

        title: t.answer,

        description: t.final,

        value: `${a} × ${b} = ${hasil}`

    });

    return{

        title: t.title,

        question: `${a} × ${b}`,

        answer: hasil,

        steps: steps

    };

},

    // ===========================================
    // PEMBAGIAN
    // ===========================================

    division(a, b, language) {
const t = language === "en"
?{

    title:"How to Solve",

    answer:"Answer",

    step1:"Step 1",

    step2:"Step 2",

    step3:"Step 3",

    final:"Final Answer.",

    desc1:"Division is the opposite of multiplication.",

    desc2:"Find how many times the divisor fits into the dividend.",

    desc3:"Each group contains."

}
:{

    title:"Cara Menghitung",

    answer:"Jawaban",

    step1:"Langkah 1",

    step2:"Langkah 2",

    step3:"Langkah 3",

    final:"Hasil akhir.",

    desc1:"Pembagian adalah kebalikan dari perkalian.",

    desc2:"Cari berapa kali angka pembagi dapat membentuk angka yang dibagi.",

    desc3:"Setiap kelompok berisi."

};

    const hasil = a / b;

    const steps = [];

    steps.push({

        title: t.step1,

        description: t.desc1,

        value:
language === "en"
? `${a} ÷ ${b} means dividing ${a} into ${b} equal groups`
: `${a} ÷ ${b} berarti membagi ${a} menjadi ${b} bagian yang sama besar`

    });

    steps.push({

        title: t.step2,

        description: t.desc2,

        value:
language === "en"
? `${b} × ${hasil} = ${a}`
: `${b} × ${hasil} = ${a}`

    });

    steps.push({

        title: t.step3,

        description: t.desc3,

        value: `${hasil}`

    });

    steps.push({

        title: t.answer,

        description: t.final,

        value: `${a} ÷ ${b} = ${hasil}`

    });

    return {

        title: t.title,

        question: `${a} ÷ ${b}`,

        answer: hasil,

        steps: steps

        };

    }

};

// ===============================================
// END OF FILE
// ===============================================
