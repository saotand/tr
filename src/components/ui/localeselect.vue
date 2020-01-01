<template>
  <span>
    <v-layout row>
      <v-flex
        xs12
        sm12
        md4
      >
        <v-autocomplete
          label="Pais"
          v-model="country"
          :items="countrysel"
          @input="clean_city"
        ></v-autocomplete>
      </v-flex>
      <v-flex
        xs12
        sm12
        md4
      >
        <v-autocomplete
          label="Estado"
          v-model="city"
          :items="citysel"
          @input="clean_location"
        ></v-autocomplete>
      </v-flex>
      <v-flex
        xs12
        sm12
        md4
      >
        <v-autocomplete
          label="Ciudad"
          v-model="location"
          :items="locationsel"
          @input="updateCmp"
        ></v-autocomplete>
      </v-flex>
    </v-layout>
  </span>
</template>

<script>
export default {
  props: {
    value: {
      default: ""
    }
  },
  data: () => ({
    location: "",
    city: "",
    country: ""
  }),
  watch: {
    countrysel (valuec) {
      this.gotfromlocation(valuec);
    },
    location (value) {
      if (value != "") {
        this.gotfromlocation(value);
      }
    }
  },
  computed: {
    countrysel () {
      return this.$store.getters.ui_g_locationlist;
    },
    citysel () {
      let countrylist = [];
      if (this.countrysel) {
        this.countrysel.forEach(c => {
          if (c.value == this.country) {
            c.childs.forEach(city => {
              countrylist.push(city);
            });
          }
        });
      }
      return countrylist;
    },
    locationsel () {
      let locationlist = [];
      if (this.citysel) {
        this.citysel.forEach(l => {
          if (l.value == this.city) {
            l.childs.forEach(location => {
              locationlist.push(location);
            });
          }
        });
      }
      return locationlist;
    }
  },
  methods: {
    updateCmp () {
      this.$emit("input", this.location);
    },
    gotfromlocation (location) {
      this.countrysel.forEach(country_e => {
        country_e.childs.forEach(city_e => {
          city_e.childs.forEach(location_e => {
            if (location_e.value == location) {
              this.country = country_e.value;
              this.city = city_e.value;
              this.location = location_e.value;
            }
          });
        });
      });
    },
    clean_city () {
      this.city = "";
      this.location = "";
      this.$emit("input", "");
    },
    clean_location () {
      this.location = "";
      this.$emit("input", "");
    }
  },
  created () {
    this.location = this.value;
  },
  mounted () {
    this.gotfromlocation(this.value);
  }
};

/*
      return [
        {
          text: "Venezuela",
          value: "1",
          childs: [
            {
              text: "Anzoategui",
              value: "2",
              childs: [{ text: "barcelona", value: "3" }]
            },
            {
              text: "caracas",
              value: "10",
              childs: [{ text: "Distrito Capital", value: "12" }]
            }
          ]
        },
        {
          text: "Colombia",
          value: "4",
          childs: [
            {
              text: "Bogota",
              value: "5",
              childs: [{ text: "bucaramanga", value: "6" }]
            }
          ]
        },
        {
          text: "Ecuador",
          value: "7",
          childs: [
            {
              text: "quito",
              value: "8",
              childs: [
                {
                  text: "q1",
                  value: "9"
                }
              ]
            }
          ]
        }
      ];*/
</script>

<style >
</style>