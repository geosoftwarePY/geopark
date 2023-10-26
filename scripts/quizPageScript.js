//import myQuestions from './quizData.js'

const myQuestions = [
    {
        question_txt: "Jesteś bardziej jak:",
        answers: {
            a: "ogień, ponieważ wybucham jak wulkan",
            b: "woda, bo jestem tajemniczy jak ocean",
            c: "lodowiec, ponieważ poruszam się w ślimaczym tempie, ale zawsze do przodu"
        },

        parks: {
            a: "Krajowy Geopark Kraina Wygasłych Wulkanów",
            b: "Światowy Geopark UNESCO Geopark Świętokrzyski",
            c: "Światowy Geopark UNESCO Łuk Mużakowa"
        }
    },

    {
        question_txt: "Gdybyś mógł podrózówać w czasie, najchętniej przeniósł być się do momentu, gdy:",
        answers: {
            a: "wymarłe zwierzęta królowały na wodach i lądzie",
            b: "mamuty przemierzały mroźne pustkowia",
            c: "na Ziemi wybuchały najsłynniejsze wulkany"
        },

        parks: {
            a: "Światowy Geopark UNESCO Geopark Świętokrzyski",
            b: "Światowy Geopark UNESCO Łuk Mużakowa",
            c: "Krajowy Geopark Kraina Wygasłych Wulkanów"
        }
    },

    {
        question_txt: "Gdybyś był poszukiwaczem skarbów, szukałbyś:",
        answers: {
            a: "złota, ponieważ jego duża ilość, podniosłaby mój status społeczny",
            b: "węgla brunatnego, bo miałbym nieskończoną ilość energii",
            c: "miedzi, bo wyprodukowałbym najlepszy samochód elektryczny, który byłby lepszą konkuręcją dla Tesli"
        },

        parks:{
            a: "Krajowy Geopark Kraina Wygasłych Wulkanów",
            b: "Światowy Geopark UNESCO Łuk Mużakowa",
            c: "Światowy Geopark UNESCO Geopark Świętokrzyski"
        }
    },

    {
        question_txt: "Czy marsz pod górkę sprawia Ci przyjemność?",
        answers: {
            a: "tak, uwielbiam wysiłek fizyczny",
            b: "nie, znacznie bardziej lubię schodzić z górki"
        },

        parks: {
            a: ["Krajowy Geopark Kraina Wygasłych Wulkanów", "Światowy Geopark UNESCO Geopark Świętokrzyski"],
            b: "Światowy Geopark UNESCO Łuk Mużakowa"
        }
    },

    {
        question_txt: "Gdyby ktoś zaproponował Ci spływ rzeką, to:",
        answers: {
            a: "przystałbym na tą szaloną propozycję - uwielbiam adrenalinę",
            b: "wybrałbym inną atrakcję - boję się wody i wolę jej unikać"
        },

        parks: {
            a: ["Krajowy Geopark Kraina Wygasłych Wulkanów", "Światowy Geopark UNESCO Geopark Świętokrzyski"],
            b: "Światowy Geopark UNESCO Łuk Mużakowa"
        }
    },

    {
        question_txt: "Czy jesteś zainteresowany podziwianiem kamiennych przybyszy ze Skandynawii?",
        answers: {
            a: "oczywiście! Przecież przybyły z krainy Wikingów",
            b: "nie, jestem geologicznym patriotą"
        },

        parks: {
            a: "Światowy Geopark UNESCO Łuk Mużakowa",
            b: ["Krajowy Geopark Kraina Wygasłych Wulkanów", "Światowy Geopark UNESCO Geopark Świętokrzyski"]
        }
    },
];

const btnNext = document.querySelector(".btn-next-question")
const questionText = document.querySelector(".question-text")
const radioABC = document.querySelector(".answers-abc")
const radioAB = document.querySelector(".answers-ab")

const answerA_ABC = document.querySelector(".aABC")
const answerB_ABC = document.querySelector(".bABC")
const answerC_ABC = document.querySelector(".cABC")
const answerA_AB = document.querySelector(".aAB")
const answerB_AB = document.querySelector(".bAB")


function uncheckSelection(radios) {
    for (let index = 0; index < radios.length; index++) {
        if (radios[index].checked) {
            radios[index].checked = false
        }
    }
}

function displayQuestionData(question) {
    questionText.innerHTML = question.question_txt

    if (Object.keys(question.answers).length === 2) {
        radioAB.style.display = "flex";
        radioABC.style.display = "none";
        answerA_AB.innerHTML = "A. " + question.answers.a
        answerB_AB.innerHTML = "B. " + question.answers.b
    } else {
        radioABC.style.display = "flex";
        radioAB.style.display = "none";
        answerA_ABC.innerHTML = "A. " + question.answers.a
        answerB_ABC.innerHTML = "B. " + question.answers.b
        answerC_ABC.innerHTML = "C. " + question.answers.c
    }
}

window.onload = (event) => {
    let questions;
    let question;
    let radios;
    let i = 0;
    let answersArrayAB = Array.from(document.getElementsByName("answer-ab"));
    let answersArrayABC = Array.from(document.getElementsByName("answer-abc"));
    let allAnswersArray = answersArrayAB.concat(answersArrayABC);
    let userAnswers = new Array();
    let userAnswer;

    btnNext.disabled = true;

    questions = myQuestions;
    question = questions[i];
    answLength = Object.keys(question.answers).length

    if (answLength === 2) {
        radios = document.getElementsByName("answer-ab")
    } else {
        radios = document.getElementsByName("answer-abc")
    }

    displayQuestionData(question);

    for (let index = 0; index < allAnswersArray.length; index++) {
        allAnswersArray[index].addEventListener("click", () => {

            //enable next question button when user selected answer for current question
            btnNext.disabled = false

            //get user answer
            for (let index = 0; index < radios.length; index++) {
                if (radios[index].checked) {
                    userAnswer = Object.values(question.parks)[index]
                }
            }
        })
    }

    i++;

    btnNext.addEventListener("click", () => {

        userAnswers.push(userAnswer)
        // console.log(userAnswers)
        btnNext.disabled = true;
        question = questions[i];

        if (i < questions.length) {
            displayQuestionData(question)
        } else {
            // console.log("final array")
            // console.log(userAnswers.flat(Infinity))
            sessionStorage.setItem("userAnswers", JSON.stringify(userAnswers.flat(Infinity)))
            window.location.href = "./resultsPage"
        }

        if (Object.keys(question.answers).length === 2) {
            radios = document.getElementsByName("answer-ab")
        } else {
            radios = document.getElementsByName("answer-abc")
        }

        for (let index = 0; index < allAnswersArray.length; index++) {
            allAnswersArray[index].addEventListener("click", () => {

                //enable next question button when user selected answer for current question
                btnNext.disabled = false
    
                //get user answer
                for (let index = 0; index < radios.length; index++) {
                    if (radios[index].checked) {
                        userAnswer = Object.values(question.parks)[index]
                    }
                }
            })
        }

        uncheckSelection(radios)

        i++;
    })

};