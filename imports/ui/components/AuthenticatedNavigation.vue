<template>
  <span class="navigation">
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat :to="{name: 'auth.profile'}">{{ $t('auth.profile') }}</v-btn>
      <v-btn flat :to="{name: 'auth.signout'}">{{ $t('auth.signout') }}</v-btn>
    </v-toolbar-items>

    <v-menu allow-overflow class="hidden-md-and-up">
      <v-btn icon slot="activator" dark>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile :to="{name: 'auth.profile'}">
          <v-list-tile-title>{{ $t('auth.profile') }}</v-list-tile-title>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile :to="{name: 'auth.signout'}">
          <v-list-tile-title>{{ $t('auth.signout') }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>
  </span>
</template>

<script>
export default {
  props: ['isLogging'],
  data: () => ({})
};
</script>
