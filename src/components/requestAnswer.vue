<template>
  <form class="card" @submit.prevent="$store.commit('createAnswer')">
    <h2>Отправка информации в БД</h2>
    <div class="form-control">
      <label for="numberNote">Введите номер заявки...</label>
      <input
        type="number"
        class="inputLine"
        id="numberNote"
        v-model.trim="$store.state.numberNote"
      />
    </div>
    <div class="form-control">
      <label for="keyWord">Введите ключевое слово</label>
      <input
        type="text"
        class="inputLine"
        id="keyWord"
        v-model.trim="$store.state.keyWord"
      />
    </div>
    <div class="form-control">
      <label for="discription">Введите краткое описание...</label>
      <textarea
        class="inputLineBig1"
        v-model="$store.state.discription"
        id="discription"
        cols="20"
        rows="10"
      ></textarea>
    </div>
    <div class="form-control">
      <label for="answer">Введите текст ответа...</label>
      <textarea
        class="inputLineBig"
        id="answer"
        v-model="$store.state.answer"
        cols="100"
        rows="20"
      ></textarea>
    </div>
    <div class="form-control">
      <select v-model="$store.state.select">
        <option disabled value="">Выберите статус</option>
        <option
          v-for="(selectItem, id) in $store.state.arraySelect"
          :key="selectItem"
        >
          {{ $store.state.arraySelect[id] }}
        </option>
      </select>
    </div>

    <button class="btn primary" type="submit">Отправить</button>
    <router-link to="/cardscomp">
      <button class="btn">К заявкам</button></router-link
    >
  </form>
</template>
