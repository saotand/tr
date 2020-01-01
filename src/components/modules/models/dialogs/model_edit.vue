<template>
  <span>
    <v-dialog
      v-model="form.dialog"
      :width="form.width"
      :persistent="form.persistent"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          v-on="on"
        >
          <v-icon>{{form.icon}}</v-icon>
        </v-btn>
      </template>
      <app-panel
        dark
        noerror
        noloading
      >
        <template slot="title">
          <v-icon left>{{form.icon}}</v-icon>
          {{form.action}} {{form.title}}
        </template>
        <template slot="button">
          <app-tooltip
            right
            tooltip="Cerrar Ventana"
          >
            <v-btn
              icon
              @click="oncancel"
            >
              <v-icon>fa-times</v-icon>
            </v-btn>
          </app-tooltip>
        </template>
        <form @submit.prevent="onsubmit">
          <v-card-text>
            <v-layout row>
              <v-flex xs12>
                <v-text-field
                  name="name"
                  label="Nombre"
                  id="name"
                  type="text"
                  v-model="model.name"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs11>
                <v-autocomplete
                  item-value="value"
                  item-text="text"
                  v-model="model.brandID"
                  :items="brandslist"
                  :rules="[v => !!v || 'Establece la marca del modelo']"
                  label="Marca"
                  required
                ></v-autocomplete>
              </v-flex>
              <v-flex xs1>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">
                      <app-brand-dialog-add :black="true"></app-brand-dialog-add>
                      <!-- fa-plus -->
                    </span>
                  </template>
                  <span>{{form.add}}</span>
                </v-tooltip>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <span v-on="on">
                  <v-switch
                    :color="form.switchcolor"
                    v-model="model.active"
                    :label="model.active?'Activa':'Inactiva'"
                  ></v-switch>
                </span>
              </template>
              <span>{{form.active_tooltip}}</span>
            </v-tooltip>
            <v-spacer></v-spacer>
            <v-btn
              :outline="!darkset"
              :color="!darkset?'primary':''"
              v-if="!loading"
              @click="oncancel"
              :disabled="loading"
              :loading="loading"
            >
              <v-icon left>{{form.cancel_icon}}</v-icon>
              {{form.cancel}}
            </v-btn>
            <v-btn
              type="submit"
              color="success"
              :disabled="loading||changed"
              :loading="loading"
            >
              <v-icon left>{{form.ok_icon}}</v-icon>
              {{form.ok}}
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </form>
      </app-panel>
    </v-dialog>
  </span>
</template>
<script>
import { isNull } from 'util';
export default {
    props: ['item', 'brands'],
    data: () => ({
        form: {
            action: 'Editar',
            title: 'Modelo',
            icon: 'fa-edit',
            ok: 'Guardar',
            cancel: 'Cancelar',
            ok_icon: 'fa-save',
            cancel_icon: 'fa-times',
            persistent: true,
            active_tooltip:
        'Al desactivar no se mostraran en el listado de modelos (incio)',
            width: '500',
            add: 'Nueva Marca',
            switchcolor: 'primary',
            dialog: false
        },
        model: {
            ID: '',
            brandID: '',
            name: '',
            image: '',
            count: '',
            created: '',
            active: ''
        }
    }),
    computed: {
        darkset () {
            return this.$store.getters.ui_g_dark;
        },
        user () {
            return this.$store.getters.user_g_user;
        },
        error () {
            return this.$store.getters.ui_g_error;
        },
        loading () {
            return this.$store.getters.ui_g_loading;
        },
        brandslist () {
            let mybrands = [];
            this.brands.forEach(function (x) {
                let curobj = { text: x.name, value: x.ID };
                mybrands.push(curobj);
            });
            return mybrands;
        },
        changed () {
            return (
                this.model.name == this.item.name &&
        this.model.image == this.item.image &&
        this.model.brandID == this.item.brandID &&
        this.model.active == this.item.active
            );
        }
    },
    methods: {
        onsubmit () {
            let addmodel = {
                ID: this.model.ID,
                brandID: this.model.brandID,
                name: this.model.name,
                image: this.model.image,
                created: this.model.created,
                count: this.model.count,
                active: this.model.active
            };
            this.$store.dispatch('admin_a_edit_model', addmodel);
            this.closewindow();
        },
        oncancel () {
            this.closewindow();
            this.clearform();
        },
        closewindow () {
            this.form.dialog = false;
        },
        clearform () {
            this.model.ID = this.item.ID;
            this.model.brandID = this.item.brandID;
            this.model.name = this.item.name;
            this.model.image = isNull(this.item.image) ? '' : String(this.item.image);
            this.model.created = String(this.item.created);
            this.model.count = this.item.count;
            this.model.active = this.item.active === '1' ? true : false;
        },
        onDismissed () {
            this.$store.dispatch('ui_a_clear_error');
        }
    },
    updated () {
        if (this.model.ID != this.item.ID) {
            this.clearform();
        }
    }
};
</script>

