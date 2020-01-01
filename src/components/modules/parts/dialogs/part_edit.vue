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
          <v-icon :class="black?'text-white':''">{{form.icon}}</v-icon>
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
                  v-model="part.name"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs11>
                <v-autocomplete
                  item-value="value"
                  item-text="text"
                  v-model="part.classID"
                  :items="subpartslist"
                  :rules="[v => !!v || 'Establece la Sub Parte']"
                  label="Sub Parte"
                  required
                ></v-autocomplete>
              </v-flex>
              <v-flex xs1>
                <app-subparts-dialog-add :black="true"></app-subparts-dialog-add>
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
                    v-model="active"
                    :label="active?'Activa':'Inactiva'"
                  ></v-switch>
                </span>
              </template>
              <span>{{form.activetooltip}}</span>
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
export default {
    props: ['subparts', 'item', 'black'],
    data: () => ({
        form: {
            action: 'Editar',
            title: 'Partes',
            icon: 'fa-edit',
            ok: 'Aceptar',
            cancel: 'Cancelar',
            ok_icon: 'fa-save',
            cancel_icon: 'fa-times',
            persistent: true,
            activetooltip:
        'Al desactivar no se mostraran en el listado de Partes (incio)',
            width: '500',
            add: 'Añadir Subpartes',
            switchcolor: 'primary',
            minlength: 3,
            dialog: false
        },
        part: {
            ID: '',
            name: '',
            image: '',
            classID: '',
            count: '0',
            active: true
        },
        active: true
    }),
    computed: {
        changed () {
            let i = this.item;
            let p = this.part;
            return (
                (p.name == i.name && p.classID == i.classID && p.active == i.active) ||
        p.name.length < 3
            );
        },
        darkset () {
            return this.$store.getters.ui_g_dark;
        },
        loading () {
            return this.$store.getters.ui_g_loading;
        },
        subpartslist () {
            let mysubparts = [];
            this.subparts.forEach(function (x) {
                let curobj = { text: x.name, value: x.ID };
                mysubparts.push(curobj);
            });
            return mysubparts;
        }
    },
    watch: {
        active (value) {
            this.part.active = value ? '1' : '0';
        }
    },
    methods: {
        onsubmit () {
            let editpart = {
                ID: this.part.ID,
                name: this.part.name,
                image: this.part.image,
                classID: this.part.classID,
                count: this.part.count,
                active: this.part.active
            };
            this.$store.dispatch('admin_a_edit_parts', editpart);
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
            this.part.ID = this.item.ID;
            this.part.name = this.item.name;
            this.part.image = this.item.image;
            this.part.classID = this.item.classID;
            this.part.count = this.item.count;
            if (this.item.active == '1') {
                this.active = true;
                this.part.active = '1';
            } else {
                this.active = false;
                this.part.active = '0';
            }
        },
        onDismissed () {
            this.$store.dispatch('ui_a_clear_error');
        }
    },
    updated () {
        if (this.part.ID != this.item.ID) {
            this.clearform();
        }
    }
};
</script>