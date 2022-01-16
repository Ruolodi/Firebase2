<template>
  <div class="navbar">
    <router-link to="/requestAnswer"
      ><button class="btn">Назад к заполнению</button></router-link
    >
  </div>
  <br />
  <br />
  <br />
  <div class="form-control">
    <input type="text" v-model.trim="$store.state.searchKeyWord" />

    <br />
    <letters-answers
      v-for="(item, id) in searchKey"
      :key="item.id"
      :item="item"
      :id="id"
    ></letters-answers>
  </div>
</template>
<script>
import lettersVue from "./lettersAnwers.vue"

export default {
  data() {
    return {
      changeAnswer: false,
      modelAnswer: "",
      modelKeyWord: "",
      modelNumber: "",
      modelDiscription: "",
      modelSelect: "",
    }
  },
  mounted() {
    this.$store.commit("loadLinks")
  },
  computed: {
    searchKey() {
      return this.$store.state.answers.filter((answers) =>
        answers.keyWordBD.includes(
          this.$store.state.searchKeyWord.toUpperCase()
        )
      )
    },
  },
  /* 
  watch: {
    //кавычки для того чтобы передавать переменную из Vuex, а function для определения функции
    "$store.state.searchKeyWord": function () {
      if (this.$store.state.searchKeyWord.length === 0) {
        this.$store.commit("duplicLinks")
      }
    },
  }, */
  components: {
    "letters-answers": lettersVue,
  },
}
</script>
