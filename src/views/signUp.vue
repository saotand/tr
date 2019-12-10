<template>
  <div>
    <v-container>
      <v-layout>
        <v-flex>
          <app-panel noerror>
            <template slot="title">
              <v-icon left>assignment_turned_in</v-icon>Registro
            </template>
            <template slot="button"></template>
            <app-user-quest></app-user-quest>
          </app-panel>
        </v-flex>
      </v-layout>
    </v-container>
    <br />
    <br />
    <br />
  </div>
</template>

<script>
import cmpSignUpQuest from "@/components/modules/user/login/signupformquest";

export default {
  components:{
    "app-user-quest":cmpSignUpQuest
  }
};
</script>