<template>
	<app-panel
		dark
		noerror
	>
		<template slot="title">
			<v-icon left>{{form.icon}}</v-icon>
			{{form.title}}
		</template>
		<template slot="button">
			<app-tooltip
				bottom
				tooltip="Buscar"
			>
				<v-text-field
					clearable
					dark
					v-model="search"
					prepend-icon="fa-search"
					single-line
					style="position:relative;top:4px"
					placeholder="Buscar"
				></v-text-field>
			</app-tooltip>
			<app-tooltip
				bottom
				:tooltip="view?'Mostrar Lista':'Mostrar Cuadricula'"
			>
				<v-btn
					icon
					@click="c_view"
				>
					<v-icon
						dark
						class="text-white"
					>{{view?'fa-list':'fa-th'}}</v-icon>
				</v-btn>
			</app-tooltip>
			<app-tooltip
				bottom
				tooltip="Actualizar"
			>
				<v-btn
					icon
					@click="refresh"
				>
					<v-icon
						dark
						class="text-white"
					>fa-refresh</v-icon>
				</v-btn>
			</app-tooltip>
		</template>
		<v-card-text>
			<app-responses
				:items="responses"
				:search="search"
				:view="view"
			></app-responses>
		</v-card-text>
	</app-panel>
</template>

<script>
import cmpAppResponses from '@/components/modules/ask/list/ask_list_responses.vue';

export default {
    components: { 'app-responses': cmpAppResponses },
    data: () => ({
        form: {
            icon: 'question_answer',
            title: 'Solicitudes'
        },
        search: '',
        view: false
    }),
    computed: {
        responses () {
            return this.$store.getters.ask_g_responses;
        }
    },
    methods: {
        c_view () {
            this.view = !this.view;
        },
        updateask () {
            this.$store.dispatch('ask_a_setresponses');
        },
        refresh () {
            this.updateask();
        }
    },
    created () {
        this.updateask();
    },
    updated () {
        // eslint-disable-next-line
		console.log("updated responses");
    }
};
</script>
