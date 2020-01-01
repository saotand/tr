<template>
  <v-card
    class="roundedbox"
    :draggable="draggable"
  >
    <app-loading
      v-if="!noloading"
      :loading="loading"
    ></app-loading>
    <template>
      <v-toolbar
        dense
        :color="color"
        :dark="dark"
        v-if="!notitle"
        :fixed="fixed"
        prominent
      >
        <v-toolbar-title>
          <slot name="title"></slot>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <template>
          <slot name="button"></slot>
        </template>
      </v-toolbar>
    </template>
    <span v-if="error && !noerror">
      <app-alert
        @dismissed="onDismissed"
        :text="error"
      ></app-alert>
    </span>
    <slot></slot>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-divider></v-divider>
    <v-divider></v-divider>
  </v-card>
</template>

<script>
export default {
    props: {
        draggable: {
            type: Boolean,
            default: false,
            required: false
        },
        fixed: {
            type: Boolean,
            default: false,
            required: false
        },
        notitle: {
            type: Boolean,
            default: false,
            required: false
        },
        dark: {
            type: Boolean,
            default: true,
            required: false
        },
        color: {
            type: String,
            default: 'primary',
            required: false
        },
        noerror: {
            type: Boolean,
            default: false,
            required: false
        },
        noloading: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    computed: {
        users () {
            return this.$store.getters.admin_g_users;
        },
        loading () {
            return this.$store.getters.ui_g_loading;
        },
        error () {
            return this.$store.getters.ui_g_error;
        }
    },
    methods: {
        onDismissed () {
            this.$store.dispatch('ui_a_clear_error');
        }
    }
};
</script>

<style>
.roundedbox {
  border-radius: 10px;
  overflow: hidden;
}
</style>

