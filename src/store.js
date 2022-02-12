import { createStore } from "vuex"
import axios from "axios"

export default createStore({
  state() {
    return {
      searchKeyWord: "",
      //блок requestAnswer
      numberNote: "",
      discription: "",
      select: "",
      keyWord: "",
      answer: "",
      answers: [],
      arraySelect: [
        "Решена",
        "Ответ направлен",
        "Жду ответа",
        "Создана задача",
        "Не удовлетворительно",
        "Удовлетворительно",
      ],
      //блок cardsComp
    }
  },
  mutations: {
    async createAnswer(getters) {
      //создание заявки и отправка ее на сервер firebase
      const token = "9VIfEVIaYVIWjgWJUxbdd6TqHEHIeIqBbxdUXsfh"
      const request = {
        numberBD: getters.numberNote,
        keyWordBD: getters.keyWord.toUpperCase(),
        answerBD: getters.answer,
        statusBD: getters.select,
        discriptionBD: getters.discription,
      }

      const response = await axios.post(
        `https://fireguard-e136d-default-rtdb.firebaseio.com/answers.json?auth=${token}`,
        request
      )
      getters.keyWord = ""
      getters.answer = ""
      getters.numberNote = ""
      getters.discription = ""
      getters.select = ""
      console.log(response)
    },
    //константа request нужна для того чтобы загнать в нее присваивание отправляемых переменных, так как getters не воспринимает в axios...

    async loadLinks(state, getters) {
      //Загрузка заявок

      const token = "9VIfEVIaYVIWjgWJUxbdd6TqHEHIeIqBbxdUXsfh"
      const { data } = await axios.get(
        `https://fireguard-e136d-default-rtdb.firebaseio.com/answers.json?auth=${token}`
      )

      state.answers = Object.keys(data).map((key) => {
        return {
          id: key,
          ...data[key],
        }
      })
      state.answersDuplic = state.answers
      state.answersDuplic.sort((a, b) => a.keyWordBD.localeCompare(b.keyWordBD)) //cортировка массива ансверс
      console.log(state.answers)
    },
  },
  getters: {
    numberNote(state) {
      return state.numberNote
    },
    discription(state) {
      return state.discription
    },
    select(state) {
      return state.select
    },
    keyWord(state) {
      return state.keyWord
    },
    answer(state) {
      return state.answer
    },
    answers(state) {
      return state.answers
    },
    answersDuplic(state) {
      return state.answersDuplic
    },
    changeAnswer(state) {
      return state.changeAnswer
    },
    arraySelect(state) {
      return state.arraySelect
    },
    searchKeyWord(state) {
      return state.searchKeyWord
    },
  },
})
