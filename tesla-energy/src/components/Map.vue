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
      <!-- <v-responsive :aspect-ratio="16/9"> -->
           <!--  <v-card-title class="text-center" >Assets</v-card-title>
            <v-card-subtitle>Substations, Transformers and Electric Meters</v-card-subtitle> -->
            <!-- OpenStreetMap -->
              <!-- <div style="height: 500px; width: 100%;">
                <div>
                  <p>First marker is placed at {{ withPopup.lat }}, {{ withPopup.lng }}</p>
                  <p>Center is at {{ currentCenter }} and the zoom is: {{ currentZoom }}</p>
                  <button @click="showLongText">
                    Toggle long popup
                  </button>
                  <button @click="showMap = !showMap">
                    Toggle map
                  </button>
                </div>
              </div>  height: 80%; position: relative; outline: currentcolor none medium;-->
             <!--  <div style="z-index: 0"> -->
                <l-map
                  v-if="showMap"
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
                  :lat-lng="latLng2(substation.latitude, substation.longitude)"
                  >
                  <l-icon icon-url="https://cdn0.iconfinder.com/data/icons/electricity-14/64/electrical-substation-transformer-voltage-power-512.png" :icon-size="[37,37]" :icon-anchor="[20,20]"></l-icon>
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
                  <!-- <l-marker :lat-lng="withTooltip">
                    <l-tooltip :options="{ permanent: true, interactive: true }">
                      <div @click="innerClick">
                        I am a tooltip
                        <p v-show="showParagraph">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                          sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
                          Donec finibus semper metus id malesuada.
                        </p>
                      </div>
                    </l-tooltip>
                  </l-marker> -->
                </l-map>
              <!-- </div> -->
        <!-- <v-card-actions>
          <v-btn text>Button</v-btn>
          <v-btn text>Button</v-btn>
        </v-card-actions> -->
      <!-- </v-responsive> -->
      </v-card>
     </v-col>
  </v-row>
</template>

<script>
import { latLng, Icon } from 'leaflet'
import { LMap, LTileLayer, LMarker, LPopup, LIcon/*, LTooltip */ } from 'vue2-leaflet'

// To solve missing icons
delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LIcon
    // LTooltip
  },
  data () {
    return {
      zoom: 14,
      center: latLng(3.4516, -76.5320),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      positionPopup: latLng(3.4516, -76.5320),
      withTooltip: latLng(47.41422, -1.250482),
      currentZoom: 11.5,
      currentCenter: latLng(3.4516, -76.5320),
      showParagraph: true,
      mapOptions: {
        zoomSnap: 0.5
      },
      showMap: true
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
      return latLng(latitude, longitude)
    },
    selectSite (e) {
      this.positionPopup = e.latlng
      /* var nam = String.fromCharCode((Math.random() * 100))
      var sub = { name: nam, latitude: e.latlng.lat, longitude: e.latlng.lng } */
      /* console.log(sub) */
      /* this.register(sub) */
      console.log(this.substations_computed)
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
