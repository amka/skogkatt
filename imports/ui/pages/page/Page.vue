<template>
    <div>
        <h1 v-if="title" class="headline">{{ title }}</h1>
        <p v-if="subtitle" class="subheading">{{ subtitle }}</p>

        <div v-if="content" v-html="content" class="content"></div>
        <loading v-if="!content"></loading>
    </div>
</template>

<script>
import { Meteor } from "meteor/meteor";
import Loading from "../../components/Loading";

export default {
  props: ["title", "subtitle", "page"],
  data: () => ({
    content: ""
  }),
  components: {
      Loading
  },
  created() {
    Meteor.call("utility.getPage", this.page, (error, response) => {
      console.info(response);
      if (error) {
        console.warn(error);
      } else {
        this.content = response;
      }
    });
  }
};
</script>

