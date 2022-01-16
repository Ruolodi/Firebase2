<template>
  <div class="card">
    <div class="form-control" id="0">
      <h2 v-if="changeAnswer === false" style="font-size: 2rem">
        {{ item.keyWordBD }}
      </h2>
      <input v-if="changeAnswer" class="inputLine" v-model="modelKeyWord" />
      <hr />

      <h2
        v-if="changeAnswer === false"
        style="font-size: 1.5rem; color: green; text-align: left"
      >
        Номер заявки: {{ item.numberBD }}
      </h2>
      <input v-if="changeAnswer" class="inputLine" v-model="modelNumber" />
      <hr />
      <p>Расшифровка:</p>
      <p v-if="changeAnswer === false">{{ item.discriptionBD }}</p>
      <textarea
        v-if="changeAnswer"
        class="inputLineBig1"
        v-model="modelDiscription"
      ></textarea>
      <hr />
      <p>Ответ:</p>
      <pre v-if="changeAnswer === false">{{ item.answerBD }}</pre>
      <textarea
        v-if="changeAnswer"
        class="inputLineBig"
        v-model="modelAnswer"
      ></textarea>

      <hr />
      <select v-if="changeAnswer" v-model="modelSelect">
        <option disabled value="">Выберите статус</option>
        <option
          v-for="(selectItem, id) in $store.state.arraySelect"
          :key="selectItem"
        >
          {{ $store.state.arraySelect[id] }}
        </option>
      </select>
      <p v-if="changeAnswer === false" style="font-size: 1.5rem">
        Статус заявки: {{ item.statusBD }}
      </p>
      <br />
      <button
        v-if="changeAnswer"
        class="btn primary"
        @click="changeAnswerMeth(item.id)"
      >
        Отправить
      </button>
      <button
        :class="changeAnswer === true ? 'btn danger' : 'btn primary'"
        @click="openChange(item)"
      >
        {{ changeAnswer === false ? "Изменить" : "Отмена" }}
      </button>

      <button class="btn danger" @click="removeNote(item.id)">
        Удалить запись
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  props: ["item", "id"],
  data() {
    return {
      changeAnswer: false,
      modelAnswer: "",
      modelKeyWord: "",
      modelNumber: "",
      modelDiscription: "",
      modelSelect: "",
      token: "9VIfEVIaYVIWjgWJUxbdd6TqHEHIeIqBbxdUXsfh",
    }
  },
  methods: {
    openChange(item) {
      ;(this.changeAnswer = !this.changeAnswer),
        (this.modelAnswer = item.answerBD),
        (this.modelKeyWord = item.keyWordBD),
        (this.modelNumber = item.numberBD),
        (this.modelDiscription = item.discriptionBD),
        (this.modelSelect = item.statusBD)
    },
    async removeNote(id) {
      await axios.delete(
        `https://fireguard-e136d-default-rtdb.firebaseio.com/answers/${id}.json?auth=${this.token}`
      )
      this.$store.state.answers = this.$store.state.answers.filter(
        (answers) => answers.id !== id
      )
    },
    async changeAnswerMeth(id) {
      this.modelKeyWord = this.modelKeyWord.toUpperCase()

      const response = await axios.patch(
        `https://fireguard-e136d-default-rtdb.firebaseio.com/answers/${id}.json?auth=${this.token}`,
        {
          answerBD: this.modelAnswer,
          discriptionBD: this.modelDiscription,
          keyWordBD: this.modelKeyWord,
          numberBD: this.modelNumber,
          statusBD: this.modelSelect,
        }
      )
      this.$store.commit("loadLinks")
      console.log(response)
      this.changeAnswer = false
    },
  },
}
</script>

<style></style>
