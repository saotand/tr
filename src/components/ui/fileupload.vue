<template>
  <span>
    <v-input
      v-if="!iconbtn"
      id="imagebtn"
      :messages="!nofilename?filename?filename:'No se ha seleccionado archivo':false"
    >
      <span v-if="preview && previewfirst">
        <v-avatar
          style="margin:15px"
          v-if="preview && previewfirst"
          :size="size"
        >
          <img
            v-if="image"
            :src="image"
            class="img-responsive"
          />
          <img
            v-else-if="src"
            :src="src"
            class="img-responsive"
          />
          <img
            v-else
            src="@/assets/no-photo-available.png"
            class="img-responsive"
          />
        </v-avatar>
      </span>
      <v-btn
        :small="small"
        :large="large"
        :block="block"
        @click="seleccionar"
        :color="color"
      >
        <v-icon left>{{icon?icon:icono}}</v-icon>
        {{ text?'':(filename?'cambiar':'seleccionar')}} {{fileobject}}
      </v-btn>

      <span v-if="preview && !previewfirst">
        <v-tooltip top>
          <v-avatar
            v-if="preview && !previewfirst"
            :size="size"
          >
            <img
              v-if="image"
              :src="image"
              class="img-responsive"
            />
            <img
              v-else-if="src"
              :src="src"
              class="img-responsive"
            />
            <img
              v-else
              src="@/assets/no-photo-available.png"
              class="img-responsive"
            />
          </v-avatar>
        </v-tooltip>
      </span>
      <input
        :value="value"
        :multiple="multiple"
        type="file"
        placeholder="Archivo"
        :name="name"
        :ref="name"
        style="display:none"
        :accept="accept"
        @change="alseleccionar"
        @input="seleccionado"
      />
    </v-input>
    <v-btn
      v-else
      icon
      @click="seleccionar"
    >
      <v-icon>{{icon?icon:icono}}</v-icon>
    </v-btn>
    <input
      :value="value"
      :multiple="multiple"
      type="file"
      placeholder="Archivo"
      :name="name"
      :ref="name"
      style="display:none"
      :accept="accept"
      @change="alseleccionar"
      @input="seleccionado"
    />
  </span>
</template>

<script>
export default {
    props: {
        iconbtn: {
            type: Boolean,
            default: false,
            required: false
        },
        value: {
            required: false
        },
        text: {
            default: false,
            required: false
        },
        multiple: {
            type: Boolean,
            default: false,
            required: false
        },
        previewfirst: {
            type: Boolean,
            default: false,
            required: false
        },
        small: {
            type: Boolean,
            default: false,
            required: false
        },
        large: {
            type: Boolean,
            default: false,
            required: false
        },
        block: {
            type: Boolean,
            default: false,
            required: false
        },
        size: {
            type: String,
            default: '38',
            required: false
        },
        color: {
            type: String,
            default: '',
            required: false
        },
        icon: {
            type: String,
            default: '',
            required: false
        },
        placeholder: {
            type: String,
            default: '',
            required: false
        },
        name: {
            type: String,
            default: 'fileimput',
            required: false
        },
        accept: {
            type: String,
            default: '*',
            required: false
        },
        src: {
            type: String,
            default: '',
            required: false
        },
        nofilename: {
            type: Boolean,
            default: false,
            required: false
        },
        preview: {
            type: Boolean,
            default: false,
            required: false
        }
    },
    computed: {
        fileRef () {
            return 'this.$refs.' + this.name + '.click();';
        },
        icono () {
            let icons = {
                '*': 'fa-file-o',
                'image/*': 'fa-file-image-o',
                'image/png': 'fa-file-image-o',
                'image/jpg': 'fa-file-image-o',
                'image/bmp': 'fa-file-image-o',
                'image/gif': 'fa-file-image-o',
                'aplication/pdf': 'fa-file-pdf',
                'aplication/html': 'fa-file-code'
            };
            let curicon = icons[this.accept];
            if (curicon) {
                return curicon;
            } else {
                return 'fa-file-o';
            }
        },
        fileobject () {
            if (this.text) {
                return this.text;
            } else {
                let fileobj = {
                    '*': 'archivo',
                    'image/*': 'imagen',
                    'image/png': 'imagen',
                    'image/jpg': 'imagen',
                    'image/bmp': 'imagen',
                    'image/gif': 'imagen',
                    'aplication/pdf': 'pdf',
                    'aplication/html': 'html'
                };
                let object = fileobj[this.accept];
                if (object) {
                    return object;
                } else {
                    return 'archivo';
                }
            }
        }
    },
    data: () => ({
        filename: '',
        image: ''
    }),
    methods: {
        seleccionado () {
            this.$emit('input', event.target.value);
            this.$emit('selectedimage', event);
        },
        seleccionar () {
            eval(this.fileRef);
        },
        alseleccionar (event) {
            this.$emit('selectedimage');
            const archivos = event.target.files;
            if (archivos[0]) {
                let nombrearchivo = archivos[0].name;
                this.filename = nombrearchivo;
                if (nombrearchivo.lastIndexOf('.') <= 0) {
                    return alert('Agrega un archvio valido');
                }
                const lectorarchivo = new FileReader();
                lectorarchivo.readAsDataURL(archivos[0]);
                lectorarchivo.addEventListener('load', () => {
                    this.image = lectorarchivo.result;
                    this.$emit('base64', lectorarchivo.result);
                });
            } else {
                return;
            }
        }
    }
};
</script>

<style>
</style>
