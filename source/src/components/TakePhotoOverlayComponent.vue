<template>
    <div style="z-index: 500;">
        <div class="overlay" v-bind:style="overlay"></div>
        <div class="countdown-container">
            <div class="countdown-text" v-if="countdown > 0">
                {{ countdown }}
            </div>
        </div>
    </div>
</template>

<script>
    import { COMPONENT_CAPTURE_OVERLAY } from '../utils/constants.js';

    export default {
        name: COMPONENT_CAPTURE_OVERLAY,
        props: [
            'countdown'
        ],
        computed: {
            overlay() {
                return {
                    background: (this.countdown <= 0)? 'rgba(0,0,0,0)':'',
                };
            }
        },
    };
</script>

<style scoped>
    .overlay {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        background: black;
        opacity: 0.6;
        z-index: 0;
    }
    .countdown-container {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 100%;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        z-index: 100;
    }
    .countdown-text {
        font-size: 30vmin;
        font-weight: bold;
        color: rgb(255, 255, 255);
        /*font-family: arial;*/
    }
</style>



// WEBPACK FOOTER //
// src/components/TakePhotoOverlayComponent.vue