<template>
  <v-row>
    <v-col>
      <v-card raised
        class="mx-auto"
        outlined
      >
      <!-- <v-responsive :aspect-ratio="16/9"> -->
        <v-list-item>
          <v-list-item-content >
            <v-list-item-title class="headline mb-1">Assets</v-list-item-title>
            <v-list-item-subtitle>Substations, Transformers and Electric Meters</v-list-item-subtitle>
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
              </div> -->
              <div style="height: 80%; position: relative; outline: currentcolor none medium; z-index: 1">
                <l-map style="height: 400px; width: 100%"
                  v-if="showMap"
                  :zoom="zoom"
                  :center="center"
                  :options="mapOptions"
                  @update:center="centerUpdate"
                  @update:zoom="zoomUpdate"
                >
                  <l-tile-layer
                    :url="url"
                    :attribution="attribution"
                  />
                  <l-marker :lat-lng="withPopup">
                    <l-popup>
                      <div @click="innerClick">
                        Substation, Transformer or Electric Meter:
                        <p v-show="showParagraph">
                          Latitude: {{ withPopup.lat }} <br>
                          Longitude: {{ withPopup.lng }}
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
              </div>
          </v-list-item-content>
        </v-list-item>
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
import { LMap, LTileLayer, LMarker, LPopup/*, LTooltip */ } from 'vue2-leaflet'

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
    LPopup
    // LTooltip
  },
  data () {
    return {
      zoom: 14,
      center: latLng(3.4516, -76.5320),
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      withPopup: latLng(3.4516, -76.5320),
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
    }
  },
  beforeCreate () {
    this.$store.dispatch('getSubstations')
  }
}
</script>

<style scoped>

</style>
