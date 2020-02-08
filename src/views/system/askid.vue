<template>
	<span>
		<v-card-text>
			<v-layout wrap>
				<v-flex
					offset-xs0
					xs12
					sm8
					md10
				>
					<h1>
						<app-tooltip
							bottom
							tooltip="Marca, Modelo y AÃ±o"
						>
							<v-icon
								x-large
								style="margin:2px 0"
							>fa-car</v-icon>
							{{ask.brand}}, {{ask.model}} - {{ask.year}}
						</app-tooltip>
					</h1>
					<hr>
				</v-flex>
				<v-flex
					offset-xs0
					xs12
					sm4
					md2
				>
					<br>
					<app-tooltip
						bottom
						tooltip="Creado"
					>
						<v-icon small>fa-calendar</v-icon>
						{{createdformatted}}
					</app-tooltip>
					<br>
					<br>
				</v-flex>
				<v-flex
					offset-xs0
					xs12
				>
					<h2>
						<app-tooltip
							bottom
							tooltip="Parte y Subparte"
						>
							<v-icon>fa-cogs</v-icon>
							{{ask.subpart}}, {{ask.part}}
						</app-tooltip>
					</h2>
				</v-flex>
				<v-flex
					offset-xs0
					xs12
				>
					<br>
					<v-card flat>
						<v-card-text>
							<p style="text-transform:capitalize">{{ask.details ? ask.details:'Sin descripción'}}</p>
						</v-card-text>
					</v-card>
				</v-flex>
			</v-layout>
		</v-card-text>
		<v-card-actions>
			<v-chip
				style="margin-left:10px"
				text-color="red"
				outline
				disabled
			>
				<b>{{ask.responses.length}} Respuestas</b>
			</v-chip>
			<v-spacer></v-spacer>
			<v-btn
				color="primary"
				to="/system/asked"
				round
			>
				<v-icon left>fa-reply</v-icon>Regresar
			</v-btn>
		</v-card-actions>
		<v-container>
			<v-layout
				v-for="response in ask.responses"
				:key="response.ID"
			>
				<v-flex>
					<v-card
						style="border:1px solid #aaa"
						:color="ask.selected==response.ID?'#041':''"
					>
						<v-card-text>
							<v-layout column>
								<v-flex>
									<h3>{{response.details}}</h3>
									<v-divider></v-divider>
									<h2>Precio: {{response.price}}{{currency[response.currency]}}</h2>
								</v-flex>
								<v-flex>
									<v-layout>
										<v-flex
											xs12
											sm12
											md6
										>
											<img
												style="display:flex"
												class="img-responsive"
												:src="baseURL+response.image"
											>
										</v-flex>
										<v-flex
											xs12
											sm12
											md6
											v-if="ask.selected==response.ID"
										>
											<v-container>
												<v-flex v-if="userdatashow">Informacion del Vendedor<br>
													<v-list class="px-4">
														<v-avatar size="60">
															<img :src="baseURL + ask.sellerimage">
														</v-avatar>
														<v-list-item><br>
															<v-list-title><span style="color:#aaa">Nombre:</span>
																<h3> {{ask.sellername}} {{ask.sellerlast}}</h3>
															</v-list-title>
														</v-list-item><br>
														<v-divider></v-divider>

														<v-list-item><br>
															<v-list-title><span style="color:#aaa">Correo Eletronico:</span>
																<h3><a :href="'mailto:'+ask.selleremail">{{ask.selleremail}}</a></h3>
															</v-list-title>
														</v-list-item><br>
														<v-divider></v-divider>
														<v-list-item><br>
															<v-list-title><span style="color:#aaa">Telefono:</span>
																<h3> {{ask.sellerphone}}</h3>
															</v-list-title>
														</v-list-item><br>
														<v-divider></v-divider>
													</v-list>
												</v-flex>
												<v-flex v-else>
													<v-btn @click="showuserresponsedata">Informacion del Vendedor</v-btn>
												</v-flex>
											</v-container>
										</v-flex>
									</v-layout>
								</v-flex>
							</v-layout>
						</v-card-text>
						<v-card-actions class="pl-3 pb-3">
							<v-btn
								:disabled="ask.selected"
								:color="(ask.selected==response.ID)?'info':'success'"
								@click="selresponse(response.ID)"
							>
								<v-icon left>fa-check</v-icon>{{(ask.selected==response.ID)?'Seleccionado':'Seleccionar'}}
							</v-btn>
						</v-card-actions>
					</v-card><br>
					<v-divider></v-divider>
				</v-flex>
			</v-layout>
		</v-container>
	</span>
</template>
<script>
/* eslint-disable */
import axios from 'axios';

export default {
	data: () => ({
		panel: {
			title: "Preguntas",
			icon: "fa-comment",
			refresh: true,
			add: true,
			edit: true,
			delete: true,
			pause: true,
			search: true
		},
		details: true,
		search: "",
		currency: ['Bs.', "$"],
		userdatashow: true,
		sellerdata: []
	}),
	watch: {},
	computed: {
		baseURL () {
			return axios.defaults.baseURL;
		},
		askID () {
			return this.$route.params.askid;
		},
		ask () {
			return this.$store.getters.ask_g_ask(this.askID);
		},
		createdformatted () {
			return this.formatDate(this.ask.startdate.substr(0, 10));
		}
	},
	methods: {
		showuserresponsedata () {
			this.userdatashow = true;
		},
		formatDate (date) {
			if (!date) return null;
			const [year, month, day] = date.split("-");
			return `${day}/${month}/${year}`;
		},
		parseDate (date) {
			if (!date) return null;
			const [month, day, year] = date.split("/");
			return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
		},
		selresponse (ID) {
			this.$store.dispatch('ask_a_selectresponse', ID);
			console.log('update ask')
			this.$store.dispatch('ask_a_myasks');
		}
	},
	updated () {
		console.log("updated user");
	}
};
</script>

