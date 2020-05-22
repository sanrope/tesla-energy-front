<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="4">
        <v-row>
          <v-card max-width="280">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="caption font-weight-black">{{ $t("assets.substation") }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-avatar tile size="45">
                <v-img :src="require('@/assets/substation.png')"></v-img>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
          <v-card max-width="280">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="caption font-weight-black">{{ $t("assets.transformer") }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-avatar tile size="45">
                <v-img :src="require('@/assets/tranformer.png')"></v-img>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
          <v-card max-width="280">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="caption font-weight-black">{{ $t("assets.electricMeter") }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-avatar tile size="45">
                <v-img :src="require('@/assets/meter.png')"></v-img>
              </v-list-item-avatar>
            </v-list-item>
          </v-card>
        </v-row>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="10">
        <v-card
          raised
          class="mx-auto"
          outlined
          relative
          height="65vh"
          width="100vw"
          style="z-index: 1"
        >
          <l-map
            ref="Map"
            :zoom="zoom"
            :center="center"
            :options="mapOptions"
            @update:center="centerUpdate"
            @update:zoom="zoomUpdate"
            @click="selectSite"
          >
            <l-tile-layer :url="url" :attribution="attribution" />
            <!-- Marker loop for substations -->
            <l-marker
              v-for="(substation,i) in substations"
              :key="i"
              :icon="iconSubstation"
              :lat-lng="latLng2(substation.latitude, substation.longitude)"
              @click="editSubstation(substation)"
            >
              <l-tooltip>{{substation.name}}</l-tooltip>
              <l-popup>
                <v-card elevation="0" width="20vw">
                  <v-container>
                    <v-form ref="updateSubstationForm" v-model="validtoupdate">
                      <v-col cols="12">
                        <v-row>
                          <v-text-field v-model="editedSubstation.name" label="Name" />
                        </v-row>
                        <v-row>
                          <v-switch v-model="editedSubstation.is_active" label="Avaible?" />
                        </v-row>
                        <v-row>
                          <v-col cols="6s">
                            <v-text-field v-model="editedSubstation.latitude" label="Latitude" type="number" />
                          </v-col>
                          <v-col cols="6">
                            <v-text-field v-model="editedSubstation.longitude" label="Longitude" type="number" />
                          </v-col>
                        </v-row>
                        <v-row justify="center">
                          <v-btn outlined :disabled="!validtoupdate" @click="updateAssets('substation')">update</v-btn>
                        </v-row>
                      </v-col>
                    </v-form>
                  </v-container>
                </v-card>
              </l-popup>
            </l-marker>
            <!-- Marker loop for transformers -->
            <l-marker
              v-for="(transformer,x) in transformers"
              :key="'x'+ x"
              :icon="iconTransformator"
              :lat-lng="latLng2(transformer.latitude, transformer.longitude)"
              @click="editTransformer(transformer)"
            >
              <l-tooltip>{{transformer.name}}</l-tooltip>
              <l-popup>
                <v-card elevation="0" width="20vw">
                  <v-container>
                    <v-form ref="updateTransformerForm" v-model="validtoupdate">
                      <v-col cols="12">
                        <v-row>
                          <v-text-field v-model="editedTransformer.name" label="Name" />
                        </v-row>
                        <v-row>
                          <v-switch v-model="editedTransformer.is_active" label="Avaible?" />
                        </v-row>
                        <v-row>
                          <v-select v-model="editedTransformer.substation" :items="substations.map(a => {return {text: a.name, value: a.id}})" label="Substation" />
                        </v-row>
                        <v-row>
                          <v-col cols="6s">
                            <v-text-field v-model="editTransformer.latitude" label="Latitude" type="number" />
                          </v-col>
                          <v-col cols="6">
                            <v-text-field v-model="editTransformer.longitude" label="Longitude" type="number" />
                          </v-col>
                        </v-row>
                        <v-row justify="center">
                          <v-btn outlined :disabled="!validtoupdate" @click="updateAssets('transformer')">update</v-btn>
                        </v-row>
                      </v-col>
                    </v-form>
                  </v-container>
                </v-card>
              </l-popup>
            </l-marker>
            <!-- Marker loop for meters -->
            <l-marker
              v-for="(meter,x) in meters"
              :key="'e'+ x"
              :icon="iconEMeter"
              :lat-lng="latLng2(meter.latitude, meter.longitude)"
              @click="editMeter(meter)"
            >
              <l-tooltip>{{meter.name}}</l-tooltip>
              <l-popup>
                <v-card elevation="0" width="20vw">
                  <v-container>
                    <v-form ref="updateMeterForm" v-model="validtoupdate">
                      <v-col cols="12">
                        <v-row>
                          <v-text-field :rules="[rules.required]" v-model="editedMeter.name" label="Name" />
                        </v-row>
                        <v-row>
                          <v-switch v-model="editedMeter.is_active" label="Avaible?" />
                        </v-row>
                         <v-row>
                          <v-select :rules="[rules.required]" v-model="editedMeter.transformer" :items="transformers.map(a => {return {text: a.name, value: a.id}})" label="Transformer" />
                        </v-row>
                        <v-row>
                          <v-col cols="6s">
                            <v-text-field :rules="[rules.required]" v-model="editedMeter.latitude" label="Latitude" type="number" />
                          </v-col>
                          <v-col cols="6">
                            <v-text-field :rules="[rules.required]" v-model="editedMeter.longitude" label="Longitude" type="number" />
                          </v-col>
                        </v-row>
                        <v-row justify="center">
                          <v-btn outlined :disabled="!validtoupdate" @click="updateAssets('meter')">update</v-btn>
                        </v-row>
                      </v-col>
                    </v-form>
                  </v-container>
                </v-card>
              </l-popup>
            </l-marker>
            <!-- Marker drawing when a point on map its selected -->
            <l-marker
              ref="ClickMarker"
              :icon="ClickMarkerIcon"
              width="30vw"
              :visible="positionPopup ? true : false"
              :lat-lng="positionPopup"
            >
            <l-tooltip>{{positionPopup}}</l-tooltip>
              <l-popup width="30vw">
                <v-card elevation="0" width="45vw">
                  <v-container width="55vw">
                    Latitude: {{positionPopup.lat}}, <br /> Longitude: {{positionPopup.lng}}
                    <v-form ref="ClickPopupForm" v-model="valid">
                      <v-col cols="12">
                        <v-row>
                          <v-select
                            outlined
                            v-on:change="changeMarkerIcon"
                            label="Active type"
                            :items="assets"
                            v-model="active_type"
                            width="30vw"
                            :rules="[rules.required]"
                          ></v-select>
                        </v-row>
                        <v-row>
                          <v-text-field
                            :disabled="active_type ? false : true"
                            label="NAME"
                            v-model="active_name"
                            :rules="[rules.required]"
                          ></v-text-field>
                        </v-row>
                        <v-row>
                          <v-select
                            v-if="active_type === 'T' || active_type === 'E' "
                            v-model="active_bind"
                            :disabled="active_type === 'S' ? true : false"
                            :items="active_type === 'T' ? substations.map(a => {return {text: a.name, value: a.id}}) : active_type === 'E' ? transformers.map(a => {return {text: a.name, value: a.id}}) : null "
                            label="Select Active"
                            :rules="[rules.required]"
                          ></v-select>
                        </v-row>
                        <v-row justify="center">
                          <v-btn outlined :disabled="!valid" @click="registerassets">register</v-btn>
                        </v-row>
                      </v-col>
                    </v-form>
                  </v-container>
                </v-card>
              </l-popup>
            </l-marker>
          </l-map>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
/* eslint-disable */
//import L from 'leaflet'
import {
  LMap,
  LTileLayer,
  LMarker,
  LPopup /*, LTooltip */,
  LTooltip
} from "vue2-leaflet";

// To solve missing icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});
/* eslint-disable no-new */
export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip
  },
  data() {
    return {
      zoom: 14,
      center: L.latLng(3.4249, -76.5179),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      positionPopup: L.latLng(0, 0),
      withTooltip: L.latLng(47.41422, -1.250482),
      currentZoom: 11.5,
      currentCenter: L.latLng(3.4516, -76.532),
      valid: null,
      validtoupdate: null,
      active: null,
      assets: [
        { text: "Substation", value: "S" },
        { text: "Transformer", value: "T" },
        { text: "Electric Meter", value: "E" }
      ],
      editedTransformer: {
        id: '',
        name: '',
        latitude: '',
        longitude: '',
        is_active: '',
        substation: ''
      },
      editedMeter: {
        id: '',
        name: '',
        latitude: '',
        longitude: '',
        substation: '',
        is_active: ''
      },
      editedSubstation: {
        id: '',
        name: '',
        latitude: '',
        longitude: '',
        transformer: '',
        is_active: ''
      },
      active_type: null,
      active_name: null,
      active_bind: null,
      showParagraph: true,
      ClickMarkerIcon: null,
      iconDefault: L.icon({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png")
      }),
      iconSubstation: L.icon({
        iconUrl: require("../assets/substation.png"),
        //  shadowUrl: require('../assets/substation_shadow.png'),
        iconSize: [50, 45],
        // iconAnchor: [40, 37],
        // shadowSize: [50, 45],
        // shadowAnchor: [29, 37],
        tooltipAnchor: [10, 0]
      }),
      iconTransformator: L.icon({
        iconUrl: require("../assets/tranformer.png"),
        // shadowUrl: require('../assets/tranformer-shadow.png'),
        iconSize: [50, 45],
        //  iconAnchor: [20, 37],
        //shadowSize: [50, 45],
        // shadowAnchor: [20, 37],
        tooltipAnchor: [7, 0]
      }),
      iconEMeter: L.icon({
        iconUrl: require("../assets/meter.png"),
        //shadowUrl: require('../assets/meter_shadow.png'),
        // shadowSize: [50, 45],
        iconSize: [50, 45],
        //iconAnchor: [40, 37]
        tooltipAnchor: [10, 0]
      }),
      mapOptions: {
        zoomSnap: 0.5
      },
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    zoomUpdate(zoom) {
      this.currentZoom = zoom;
    },
    centerUpdate(center) {
      this.currentCenter = center;
    },
    showLongText() {
      this.showParagraph = !this.showParagraph;
    },
    innerClick() {
      alert("Click!");
    },
    latLng2(latitude, longitude) {
      return L.latLng(latitude, longitude);
    },
    selectSite(e) {
      this.positionPopup = e.latlng;

      this.$refs.ClickMarker.setVisible(true);

      /* var nam = String.fromCharCode((Math.random() * 100))
      var sub = { name: nam, latitude: e.latlng.lat, longitude: e.latlng.lng } */
      /* console.log(sub) */
      /* this.register(sub) */
    },
    changeMarkerIcon() {
      console.log(this.active_type);
      if (this.active_type === "S") {
        this.ClickMarkerIcon = this.iconSubstation;
      } else if (this.active_type === "T") {
        this.ClickMarkerIcon = this.iconTransformator;
      } else if (this.active_type === "E") {
        this.ClickMarkerIcon = this.iconEMeter;
      } else {
        this.ClickMarkerIcon = L.Marker.prototype.options.icon;
      }
    },
    // deprecated, no used.
    getActiveNames() {
      var actnames;
      if (this.active_type === "T") {
        actnames = substations;
        actnames.map((a, index) => {
          return { text: a.name, value: index };
        });
      } else if (this.active_type === "E") {
      }
    },
    registerassets() {
      console.log(this.active_bind);
      switch (this.active_type) {
        case "S":
          this.active = {
            name: this.active_name,
            latitude: this.positionPopup.lat,
            longitude: this.positionPopup.lng,
            is_active: true
          };
          this.$store
            .dispatch("registerSubstation", this.active)
            .then(res => {
              alert("sub registered successfully", this.active.name);
            })
            .catch(err => {
              console.log("register Substation error: " + err);
            });
          break;
        case "T":
          this.active = {
            name: this.active_name,
            latitude: this.positionPopup.lat,
            longitude: this.positionPopup.lng,
            substation: this.active_bind,
            is_active: true
          };
          console.log(this.active);
          this.$store
            .dispatch("registerTransformer", this.active)
            .then(res => {
              alert("transformer registered successfully", this.active.name);
            })
            .catch(err => {
              console.log("register Transformer error: " + err);
            });
          break;
        case "E":
          this.active = {
            name: this.active_name,
            latitude: this.positionPopup.lat,
            longitude: this.positionPopup.lng,
            transformer: this.active_bind,
            is_active: true
          };
          this.$store
            .dispatch("registerMeter", this.active)
            .then(res => {
              alert("meter registered successfully", this.active.name);
            })
            .catch(err => {
              console.log("register ElectricMeter error: " + err);
            });
          break;

        default:
          break;
      }
      //reset the form fields and them validations
      this.$refs.ClickPopupForm.reset();
      this.$refs.ClickPopupForm.resetValidation();
      this.$refs.ClickMarker.setVisible(false);

     //load the assets from the API and this in turn from the database
      this.$store.dispatch("getSubstations");
      this.$store.dispatch("getTransformers");
      this.$store.dispatch("getMeters");
      //force update the component for solve some bugs.
      this.$forceUpdate();
      this.$refs.Map.$forceUpdate();

      //set icon marker on click to default value
      this.ClickMarkerIcon = L.Marker.prototype.options.icon;
    },
    editTransformer (transformer) {
      console.log(transformer)
      this.editedTransformer = Object.assign({}, transformer)
      console
    },
    editSubstation (sub) {
      console.log(sub)
      this.editedSubstation = Object.assign({}, sub)
      console
    },
    editMeter (meter) {
      console.log(meter)
      this.editedMeter = Object.assign({}, meter)
      console
    },
    updateAssets (typeofAsset) {
      switch (typeofAsset) {
        case 'meter':
          this.$store
            .dispatch("updateMeter", this.editedMeter)
            .then(res => {
              alert("meter registered successfully", this.editedMeter.name);
            })
            .catch(err => {
              console.log("update ElectricMeter error: " + err);
            });
          break;
        case 'transformer':
          this.$store
            .dispatch("updateTransformer", editedTransformer)
            .then(res => {
              alert("transformer registered successfully", this.editedTransformer.name);
            })
            .catch(err => {
              console.log("update Transformer error: " + err);
            });
          break;
        case 'substation':
          this.$store
            .dispatch("updateSubstation", this.editedSubstation)
            .then(res => {
              alert("sub registered successfully", this.editedSubstation.name);
            })
            .catch(err => {
              console.log("update Substation error: " + err);
            });
          break;
        default:
          break;
      }
    /* this.$refs.updateMeterForm.reset();
    this.$refs.updateMeterForm.resetValidation();

    this.$refs.updateSubstationForm.reset();
    this.$refs.updateSubstationForm.resetValidation();

    this.$refs.updateTransformerForm.reset();
    this.$refs.updateTransformerForm.resetValidation(); */
    }
  },
  beforeCreate() {
     //load the assets from the API and this in turn from the database
      this.$store.dispatch("getSubstations");
      this.$store.dispatch("getTransformers");
      this.$store.dispatch("getMeters");
  },
  computed: {
    substations() {
      return this.$store.getters.getSubstations;
    },
    transformers() {
      return this.$store.getters.getTransformers;
    },
    meters() {
      return this.$store.getters.getMeters;
    }
  }
};
</script>

<style scoped>
</style>
