<template>
  <div class="loader">
    <canvas
      ref="loader"
      class="loader-canvas"
      :style="{ display: `${showLoader ? 'block' : 'none'}` }">
    </canvas>
  </div>
</template>

<script>
import { COMPONENT_CUSTOM_LOADER_LOREAL_PARIS_V3 } from '../utils/constants.js';
  export default {
    name: COMPONENT_CUSTOM_LOADER_LOREAL_PARIS_V3,
    props: {
      width: { type: Number, default: undefined },
      height: { type: Number, default: undefined },
      spriteWidth: { type: Number, default: undefined },
      spriteHeight: { type: Number, default: undefined },
      spriteUrl: { type: String, default: undefined },
      ticksPerFrame: { type: Number, default: undefined },
      numberOfFrames: { type: Number, default: undefined },
    },

    data() {
      return {
        showLoader: true
      };
    },
    mounted() {
      this.canvas = this.$refs.loader;
      this.canvas.width = this.width;
      this.canvas.height = this.height;

      this.loaderImage = new Image();

      this.loader = this.sprite({
        context: this.canvas.getContext('2d'),
        width: 23,
        height: 3450,
        image: this.loaderImage,
        numberOfFrames: 150,
        ticksPerFrame: 1
      });

      this.loaderImage.addEventListener('load', this.loop);
      this.loaderImage.src = this.spriteUrl;
    },
    methods: {
      loop() {
        window.requestAnimationFrame(this.loop);
        this.loader.update();
        this.loader.render();
      },

      sprite(options) {
        const that = {};
        let frameIndex = 0;
        let tickCount = 0;
        const ticksPerFrame = options.ticksPerFrame || 0;
        const numberOfFrames = options.numberOfFrames || 1;

        that.context = options.context;
        that.width = options.width;
        that.height = options.height;
        that.image = options.image;

        that.update = function () {
          tickCount += 1;

          if (tickCount > ticksPerFrame) {
            tickCount = 0;

            if (frameIndex < numberOfFrames - 1) {
              frameIndex += 1;
            } else {
              frameIndex = 0;
            }
          }
        };

        that.render = function () {
          that.context.clearRect(0, 0, that.width, that.height);
          that.context.drawImage(
            that.image,
            0,
            frameIndex * that.height / numberOfFrames,
            that.width,
            that.height / numberOfFrames,
            0,
            0,
            that.width,
            that.height / numberOfFrames
          );
        };

        return that;
      }
    }
  };
</script>

<style scoped>
    .loader {
        --loader-size: 10%;
        width: var(--loader-size);
        height: 0;
        padding-bottom: var(--loader-size);    /* a hack to keep height equal to width */
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        user-select: none;
    }
    .loader > img {
        max-width: 100%;
    }
</style>


// WEBPACK FOOTER //
// src/customs/LorealparisV3Loader.vue