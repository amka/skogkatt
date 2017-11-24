<template>
  <span>
   <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat :to="{name: 'auth.signup'}">{{ $t('auth.signup') }}</v-btn>
      <v-btn flat :to="{name: 'auth.signin'}">{{ $t('auth.signin') }}</v-btn>
   </v-toolbar-items>
   <v-menu allow-overflow class="hidden-md-and-up">
      <v-btn icon slot="activator" dark>
        <v-icon>more_vert</v-icon>
      </v-btn>
      <v-list>
        <v-list-tile :to="{name: 'auth.signup'}">
          <v-list-tile-title>{{ $t('auth.signup') }}</v-list-tile-title>
        </v-list-tile>
        <v-list-tile :to="{name: 'auth.signin'}">
          <v-list-tile-title>{{ $t('auth.signin') }}</v-list-tile-title>
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

