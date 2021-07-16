<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/App.png"
          transition="scale-transition"
          width="40"
        />
        <h2>Port-Advancer</h2>
      </div>

      <v-spacer></v-spacer>

      <v-btn text @click="dialog = true">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <Base />
    </v-main>

    <v-dialog max-width="30%" v-model="dialog" persistent>
      <v-card>
        <v-card-title class="text-h5">Settings</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-text-field
                v-model="config.localHost"
                label="LocalHost"
                placeholder="LocalHost"
                outlined
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="config.localPort"
                label="LocalPort"
                placeholder="LocalPort"
                outlined
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="config.targetHost"
                label="TargetHost"
                placeholder="TargetHost"
                outlined
              ></v-text-field>
            </v-row>
            <v-row>
              <v-text-field
                v-model="config.targetPort"
                label="TargetPort"
                placeholder="TargetPort"
                outlined
              ></v-text-field>
            </v-row>
            <v-row>
              <v-radio-group v-model="config.trafficForwarding" mandatory>
                <v-radio label="Port Forwarding" value="PORT_FORWARDING"></v-radio>
                <v-radio label="Reverse Proxieing" value="REVERSE_PROXIEING"></v-radio>
              </v-radio-group>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="saveConfig">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import Base from "./components/Base";
import { getItem, setItem } from "./util/localStorage";

export default {
  name: "App",

  components: {
    Base,
  },

  data: () => ({
    dialog: false,
    config: {
      targetHost: "10.49.76.146",
      targetPort: 8080,
      localHost: "192.168.1.150",
      localPort: 8080,
      trafficForwarding: "REVERSE_PROXIEING",
    },
  }),
  methods: {
    saveConfig() {
      setItem("CONFIG", this.config);
      this.dialog = false;
    },
  },
  beforeMount() {
    let config = getItem("CONFIG");
    if(config !== null && config !== undefined){
      this.config = config;
    }else{
      this.saveConfig();
    }
  },
};
</script>
<style>
html {
  overflow: scroll;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  width: 0px; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}
</style>