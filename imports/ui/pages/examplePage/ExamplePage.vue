<template>
  <v-layout align-start row wrap>
    <v-flex xs12>
        <page title="My Example Page"
            subtitle="A subtitle for my example page."
            page="example-page">
        </page>
    </v-flex>
  </v-layout>
</template>

<script>
import Page from "../page/Page";
export default {
  components: {
    Page
  }
};
</script>
