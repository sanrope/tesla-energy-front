<template>
   <v-row>
    <v-col cols="12">
      <v-card raised
        class="mx-auto"
        outlined
        relative
        height="73vh"
        width="100vw"
        style="z-index: 1"
      >
        <l-map
          :zoom="zoom"
          :center="center"
          :options="mapOptions"
          @update:center="centerUpdate"
          @update:zoom="zoomUpdate"
          @click="selectSite"
        >
          <l-tile-layer
            :url="url"
            :attribution="attribution"
          />
          <l-marker v-for="(substation,i) in substations" :key="i"
          :icon="iconSubstation"
          :lat-lng="latLng2(substation.latitude, substation.longitude)"
          >
            <l-popup>
              <v-row>
                <v-col cols="12">
                  <v-menu center>
                    <template v-slot:activator="{ on }">
                      <div v-on="on">
                      Substation, Transformer or Electric Meter: {{substation.name}}
                        <p v-show="showParagraph">
                          Latitude:  {{substation.latitude}}<br>
                          Longitude:  {{substation.longitude}}
                        </p>
                      </div>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>one item menu</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
            </l-popup>
          </l-marker>

          <l-marker v-for="(transformer,x) in transformers" :key="x"
          :icon="iconTransformator"
          :lat-lng="latLng2(transformer.latitude, transformer.longitude)"
          >
            <l-popup>
              <v-row>
                <v-col cols="12">
                  <v-menu center>
                    <template v-slot:activator="{ en }">
                      <div v-on="en">
                      Substation, Transformer or Electric Meter: {{transformer.name}}
                        <p v-show="showParagraph">
                          Latitude:  {{transformer.latitude}}<br>
                          Longitude:  {{transformer.longitude}}<br>
                          substation-id:  {{transformer.substation}}
                        </p>
                      </div>
                    </template>
                    <v-list>
                      <v-list-item>
                        <v-list-item-title>one item menu</v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-col>
              </v-row>
            </l-popup>
          </l-marker>
<!-- Marker drawing when a point on map its selected -->
          <l-marker
          :icon="active_type === 'S' ? iconSubstation : active_type === 'T' ? iconTransformator : active_type === 'E' ? iconEMeter : null"
          width="30vw"
          :visible="positionPopup ? true : false"
          :lat-lng="positionPopup"
          >
            <l-popup width="30vw">
                  <v-card elevation="0" width="45vw">
                  <v-container width="55vw">

                  <v-form v-model="valid" >
                    <v-col cols="12">
                      <v-row>
                    <v-select outlined
                     label="Active type"
                     :items="actives"
                     v-model="active_type"
                     width="30vw"
                     :rules="[rules.required]"></v-select>
                      </v-row>
                      <v-row>
                     <v-text-field :disabled="active_type ? false : true"
                     label="NAME"
                     v-model="active_name"
                     :rules="[rules.required]"></v-text-field>
                      </v-row>
                      <v-row>
                        <v-select v-if="active_type === 'T' || active_type === 'E' " v-model="active_bind" :disabled="active_type === 'S' ? true : false"
                        :items="active_type === 'T' ? substations.map((s, indexS) => {var indexS=indexS +1
                        return {text: s.name, value: indexS}} ) : active_type === 'E' ? transformers.map(a => a.name) : null "
                        label="comming soon..."
                        :rules="[rules.required]"></v-select>
                      </v-row>
                      <v-row justify="center">
                    <v-btn outlined :disabled="!valid" @click="register">register</v-btn>
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
</template>

<script>
/* eslint-disable */
//import L from 'leaflet'
import { LMap, LTileLayer, LMarker, LPopup/*, LTooltip */ } from 'vue2-leaflet'

// To solve missing icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})
/* eslint-disable no-new */
export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup
    // LTooltip
  },
  data () {
    return {
      zoom: 14,
      center: L.latLng(3.4516, -76.5320),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      positionPopup: L.latLng(0, 0),
      withTooltip: L.latLng(47.41422, -1.250482),
      currentZoom: 11.5,
      currentCenter: L.latLng(3.4516, -76.5320),
      valid: null,
      active: null,
      actives: [
        { text: 'Substation', value: 'S'
        },
        { text: 'Transformer' , value: 'T' },
        { text: 'Electric Meter', value: 'E' }],
        active_type: null,
        active_name: null,
        active_bind: null,
      showParagraph: true,
      iconSubstation: L.icon({
        iconUrl: /* 'https://lh3.googleusercontent.com/ADBp5lqoyDlVEH6XtOLw55Bv-HYn4zzNjwY2CGaWd3C565Rbdp_0uOyETZfy4ppV1GdvN1GydR-fxNFYn_rB=w1920-h1008' */ require('../assets/substation.png') ,
        shadowUrl: /* 'https://lh3.googleusercontent.com/mGCdckEPv5TII-w_j1K1wcLiNUIaWCkHEVVW6tODBL0w94OQKLIE8lyqPI-xTFQ3P0_y1lRMyYAmG1riWanE=w1920-h1008' */ require('../assets/substation_shadow.png'),
        iconSize: [50, 45],
        iconAnchor: [40, 37],
        shadowSize: [50, 45],
        shadowAnchor: [29, 37]
      }),
      iconTransformator: L.icon({
        iconUrl: /* 'https://lh4.googleusercontent.com/pFHh5jBrMEQzCaaq60KORJewL_UPQ92HK-QPQjmrFwxEUzqPpYyb5uQ1h8Fnoh9Ke4RWImRbWP3Q1A6cILPX=w952-h991' */require('../assets/tranformer.png'),
        shadowUrl:/* 'https://lh4.googleusercontent.com/vKcAc0AjLbvlA2upY6-SWebeE1GACLO6CJ2nlh-12WcMB_uyCGhChUEpd2QJwIXCTDfjoY56awhebumeWIRZ=w952-h991' */require('../assets/tranformer-shadow.png'),
        iconSize: [50, 45],
        iconAnchor: [40, 37],
        shadowSize: [50, 45],
        shadowAnchor: [35, 37]
      }),
      iconEMeter: L.icon({
        iconUrl: require('../assets/meter.png'),
        iconSize: [50, 45],
        iconAnchor: [40, 37]
      }),
      mapOptions: {
        zoomSnap: 0.5
      },
      rules: {
        required: value => !!value || 'Required.'
      }
    }
  },
  methods: {
    zoomUpdate (zoom) {
      this.currentZoom = zoom
    },
    centerUpdate (center) {
      this.currentCenter = center
    },
    showLongText () {
      this.showParagraph = !this.showParagraph
    },
    innerClick () {
      alert('Click!')
    },
    latLng2 (latitude, longitude) {
      return L.latLng(latitude, longitude)
    },
    selectSite (e) {
      this.positionPopup = e.latlng
      /* var nam = String.fromCharCode((Math.random() * 100))
      var sub = { name: nam, latitude: e.latlng.lat, longitude: e.latlng.lng } */
      /* console.log(sub) */
      /* this.register(sub) */
    },
    getActiveNames () {
      var actnames;
      if (this.active_type === 'T') {
        actnames = substations
        actnames.map((a, index)=> {
          
          return { text: a.name,  value: index}
        })
      }else if (this.active_type === 'E') {
        
      }
    },
    register () {
      console.log(this.active_bind)
     /*  if (this.active_bind) { */
      switch (this.active_type) {
        case 'S':
          this.active= {name: this.active_name, latitude: this.positionPopup.lat, longitude: this.positionPopup.lng }
          this.$store.dispatch('registerSubstation', this.active)
        .then(res => {
          alert('sub registered successfully', this.active.name)
        })
        .catch(err => {
          console.log('register Active error: ' + err)
        })
          break;
        case 'T':
          this.active= {name: this.active_name, latitude: this.positionPopup.lat, longitude: this.positionPopup.lng, substation: this.active_bind/* this.active_bind */ }
          console.log(this.active)
          this.$store.dispatch('registerTransformer', this.active)
        .then(res => {
          alert('transformer registered successfully', this.active.name)
        })
        .catch(err => {
          console.log('register Active error: ' + err)
        })
          break;
        case 'E':
          this.active= {name: this.active_name, latitude: this.positionPopup.lat, longitude: this.positionPopup.lng, transformer: this.active_bind }
          this.$store.dispatch('registerMeter', this.active)
        .then(res => {
          alert('meter registered successfully', this.active.name)
        })
        .catch(err => {
          console.log('register Active error: ' + err)
        })
          break;
      
        default:
          break;
      }
    /* } */
    }
  },
  beforeCreate () {
    this.$store.dispatch('getSubstations')
    this.$store.dispatch('getTransformers')
    this.$store.dispatch('getMeters')
  },
  computed: {
    substations () {
      return this.$store.getters.getSubstations
    },
    transformers () {
      return this.$store.getters.getTransformers
    },
    meters () {
      return this.$store.getters.getMeters
    }
  }
}
</script>

<style scoped>

</style>
