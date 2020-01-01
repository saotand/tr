<template>
  <span>
    <!-- <v-text-field v-model="profile" @input="changeProfile"></v-text-field> -->
    <v-expansion-panel>
      <v-expansion-panel-content>
        <template v-slot:header>
          <h3 style="width:100%">Marcas</h3>
          <v-spacer></v-spacer>
        </template>
        <v-card>
          <v-card-text>
            <v-layout
              row
              wrap
            >
              <v-flex
                xs12
                sm12
                md2
                lg2
                xl2
              >
                <v-checkbox
                  @change="changemyprofile"
                  color="primary"
                  v-model="myprofile"
                  :label="'[Todos]'"
                  :value="'000000000000000000000000000000'"
                ></v-checkbox>
              </v-flex>
              <v-flex
                xs12
                sm12
                md2
                lg2
                xl2
                v-for="(brand) in brands"
                :key="brand.ID"
              >
                <v-checkbox
                  @change="changemyprofile"
                  :disabled="myprofile.indexOf('000000000000000000000000000000')!=-1"
                  :ref="brand.ID"
                  color="primary"
                  :key="brand.ID"
                  v-model="myprofile"
                  :label="brand.text"
                  :value="brand.value"
                ></v-checkbox>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>

      <v-expansion-panel-content>
        <template v-slot:header>
          <h3 style="width:100%">Partes</h3>
          <v-spacer></v-spacer>
        </template>
        <v-card>
          <v-card-text>
            <v-expansion-panel>
              <v-expansion-panel-content
                v-for="(subpart,index) in subparts"
                :key="index"
              >
                <template v-slot:header>
                  <h3 style="width:100%">{{subpart.text}}</h3>
                  <v-spacer></v-spacer>
                </template>
                <v-card>
                  <v-card-text>
                    <v-layout
                      row
                      wrap
                    >
                      <v-flex
                        xs12
                        sm12
                        md2
                        lg2
                        xl2
                      >
                        <app-tooltip
                          top
                          :tooltip="'Seleccionar todo de ' + subpart.text"
                        >
                          <v-checkbox
                            @change="changemyprofile"
                            color="primary"
                            v-model="myprofile"
                            :label="'[Todos]'"
                            :value="subpart.value"
                          ></v-checkbox>
                        </app-tooltip>
                      </v-flex>
                      <template v-for="(part,index) in subpart.childs">
                        <v-flex
                          xs12
                          sm12
                          md2
                          lg2
                          xl2
                          :key="index"
                        >
                          <v-checkbox
                            @change="changemyprofile"
                            :disabled="myprofile.indexOf(subpart.value) != -1"
                            color="primary"
                            :key="index"
                            v-model="myprofile"
                            :label="part.text"
                            :value="part.value"
                          ></v-checkbox>
                        </v-flex>
                      </template>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-btn
      @click="savechanges"
      :disabled="!savenow"
    >Guardar</v-btn>
  </span>
</template>

<script>
/* eslint-disable */
import Axios from "axios";
export default {
  props: {
    profile: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    myprofile: [],
    brands: [],
    subparts: []
  }),
  computed: {
    allbrands () {
      let abitem = "000000000000000000000000000000";
      return this.myprofile.indexOf(abitem) != -1;
    },
    savenow () {
      return this.profile != this.myprofile;
    }
  },
  watch: {
    myprofile (value) {
      this.subparts.forEach((part, index) => {
        this.myprofile.forEach((item, indexpf) => {
          if (item == part.value) {
            this.subparts[index].childs.forEach((spart, indexch) => {
              this.myprofile.find((pfdata, indexpf) => {
                if (pfdata) {
                  if (pfdata == spart.value) {
                    this.myprofile.splice(indexpf, 1);
                  }
                }
              });
            });
          }
        });
      });
      this.$emit("profilechanged", this.myprofile);
    },
    allbrands (value) {
      if (value) {
        let br = this.brands;
        let pf = this.myprofile;
        br.forEach((br_elm, spindex) => {
          pf.forEach((elm, index) => {
            if (elm == br_elm.value) {
              this.myprofile.splice(index, 1);
            }
          });
        });
      }
    }
  },
  methods: {
    savechanges () {
      this.$store.dispatch("user_a_setprofile", this.myprofile);
    },
    changemyprofile (event) {
      this.myprofile = event;
      this.$emit("profilechanged", this.myprofile);
    },
    profile_brands () {
      Axios.get("ask/notilist/brands")
        .then(response => {
          const list = response.data.data;
          this.brands = list;
        })
        .catch(error => {
          let message = "";
          if (error.response != undefined) {
            message = error.response.data.error.message;
          } else {
            message = error;
          }
        })
        .then(() => { });
    },
    profile_subparts () {
      Axios.get("ask/notilist/subparts")
        .then(response => {
          const list = response.data.data;
          this.subparts = list;
        })
        .catch(error => {
          let message = "";
          if (error.response != undefined) {
            message = error.response.data.error.message;
          } else {
            message = error;
          }
        })
        .then(() => { });
    }
  },
  created () {
    this.profile_brands();
    this.profile_subparts();
    this.myprofile = this.profile;
  }
  /*
  ,
  updated(event) {
    //this.myprofile = event;
    if (this.myprofile.length) {
      this.$emit("profilechanged", this.myprofile);
    } else {
      this.myprofile = this.profile;
    }
  }*/
};
</script>
