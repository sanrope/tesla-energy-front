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
                      <div @click="innerClick">
                        Substation, Transformer or Electric Meter: {{substation.name}}
                        <p v-show="showParagraph">
                          Latitude:  <br>
                          Longitude:
                        </p>
                      </div>
                    </l-popup>
                  </l-marker>
                </l-map>
      </v-card>
     </v-col>
  </v-row>
</template>

<script>
import L from 'leaflet'
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
      positionPopup: L.latLng(3.4516, -76.5320),
      withTooltip: L.latLng(47.41422, -1.250482),
      currentZoom: 11.5,
      currentCenter: L.latLng(3.4516, -76.5320),
      showParagraph: true,
      iconSubstation: L.icon({
        iconUrl: 'static/substation.png',
        iconSize: [50, 45],
        iconAnchor: [40, 37]
      }),
      mapOptions: {
        zoomSnap: 0.5
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
      console.log(this.substations)
      console.log(this.iconSubstation)
    },
    register (sub) {
      this.$store.dispatch('registerSubstation', sub)
        .then(res => {
          alert('sub registered successfully')
        })
        .catch(err => {
          console.log('register error: ' + err)
        })
    }
  },
  beforeCreate () {
    this.$store.dispatch('getSubstations')
    console.log(this.substations)
  },
  computed: {
    substations () {
      return this.$store.getters.getSubstations
    }
  }
}
</script>

<style scoped>

</style>
