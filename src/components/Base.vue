<template>
  <v-container class="fill-height">
    <v-row align="center" align-content="center" justify="center" class="text-center">
      <v-col class="mb-5" cols="9">
        <v-row v-show="hidden" justify="center">
          <v-progress-linear
            v-model="value"
            height="10"
          ></v-progress-linear>
          <h4 class="text--error">{{ progressMessage }}</h4>
        </v-row>
      </v-col>
      <v-fab-transition>
        <v-btn class="mb-12" color="pink" @click="checkAndDoTrafficRedirecting" absolute dark bottom right fab>
          <v-icon>mdi-restart</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-row>
  </v-container>
</template>

<script>
import { getItem } from "../util/localStorage";

export default {
  name: "Base",

  data: () => ({
    value: 0,
    interval: 0,
    progressMessage:"",
    hidden:false,
  }),

  beforeDestroy() {
    clearInterval(this.interval);
  },

  methods: {
    checkAndDoTrafficRedirecting() {
      this.queryAndIndeterminate();
      let config = getItem("CONFIG");
      if (config.trafficForwarding === "PORT_FORWARDING") {
        this.progressMessage =
          "Creating rule to re-route all using port forwarding";
        setTimeout(() => {
          this.progressMessage = "Port forwarding in progress";
          this.doPortForwarding(config);
        }, 1500);
      } else {
        this.progressMessage =
          "Creating rule to re-route all using reverse proxy";
        setTimeout(() => {
          this.progressMessage = "Reverse proxy-ing in progress";
          this.doReverseProxy(config);
        }, 1500);
      }
    },
    doReverseProxy(config) {
      var httpProxy = window.nw.require("http-proxy");
      //HTTP -> HTTP
      httpProxy
        .createProxyServer({
          target: "http://" + config.targetHost + ":" + config.targetPort,
        })
        .listen(config.localPort);
      //HTTP -> HTTPS (using a PKCS12 client certificate)
      //var fs = window.nw.require("fs");
      //
      // Create an HTTP proxy server with an HTTPS target
      //
      // httpProxy.createProxyServer({
      //   target: {
      //     protocol: 'https:',
      //     host: self.setting.targetHost,
      //     port: 443,
      //     pfx: fs.readFileSync('path/to/certificate.p12'),
      //     passphrase: 'password',
      //   },
      //   changeOrigin: true,
      // }).listen(self.setting.localPort);
      this.progressMessage = "Reverse proxy completed";
    },
    doPortForwarding(config) {
      var net = window.nw.require("net");
      net
        .createServer(function (from) {
          var to = net.createConnection({
            host: config.targetHost,
            port: config.targetPort,
          });
          from.pipe(to);
          to.pipe(from);
        })
        .listen(config.localPort, config.localHost);
      this.progressMessage = "Port forwarding completed";
    },
    queryAndIndeterminate() {
      this.hidden = true;
      this.value = 0;

        this.interval = setInterval(() => {
          if (this.value === 100) {
            clearInterval(this.interval);
          }
          this.value += 25;
        }, 1000);
    },
  },
};
</script>
