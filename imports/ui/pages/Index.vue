<template>
  <v-layout justify-center row wrap class="back">
    <v-flex xs12 sm8 md6 lg4 class="text-xs-center ma-5">
      <v-card>
        <v-card-title class="text-xs-center">
          <h1 class="display-2">{{appTitle}}</h1>
        </v-card-title>
        <v-layout justify-center align-start row wrap>
          <v-flex xs12 class="text-xs-center">
            <h2 class="headline">Meteor <v-icon>favorite</v-icon> Vue</h2>
            <p class="mt-3">You pressed the button {{count}} times.</p>
            <v-btn outline color="primary" @click="addOne">{{buttonLabel}}</v-btn>
            <p>Learn more <a href="https://github.com/tundar.official/skogkatt">on GitHub</a>.</p>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { Session } from "meteor/session";
Session.setDefault("counter", 0);

let labels = [
  "Click me!",
  "Click me again!",
  "Here! Click here!",
  "Again! Again!",
  "Don't click me! No, I'm just kidding. You can.",
  "You like that?",
  "Can you stratch me in the back please?",
  "You are soooo nice! Click!",
  "Hmmmm...",
  "You know, you are wasting time clicking me.",
  "No really, you can click me as much as you want.",
  "Click me to level up!"
];

export default {
  data: () => ({
    buttonLabel: "Click me!"
    // count: 0
  }),
  meteor: {
    data: {
      count() {
        return Session.get("counter");
      }
    }
  },
  computed: {
    count() {
      return Session.get("counter");
    },
    appTitle() {
      return Meteor.settings.public.appTitle;
    }
  },
  methods: {
    addOne() {
      Session.set("counter", this.count + 1);

      this.buttonLabel =
        labels[Math.round(Math.random() * (labels.length - 1))];
    }
  }
};
</script>

<style>
.back {
  background: url("/static/skogkatt.jpg") center no-repeat;
  background-size: cover;
}
</style>
