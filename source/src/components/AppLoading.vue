<template>
    <div v-if="loading" class="loader_container" v-bind:style="loaderBackground">
        <component :is="customLoaderComponent" v-bind="customLoaderParams">
        </component>
        <!--
        <div class="loader">
            <img v-bind:src="uiImage(CMS_GIF_LOADER)">
        </div>
        -->
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { COMPONENT_APP_LOAD, COMPONENT_DEFAULT_GIF_LOADER,
            UI_OPTION_LOADER_BG_COLOR, UI_OPTION_LOADER_BG_IMAGE_ENABLED,
            CMS_LOADER_BG_IMAGE,
            UI_OPTION_CUSTOM_LOADER_COMPONENT, UI_OPTION_CUSTOM_LOADER_PARAMS } from '../utils/constants.js';
    import GifLoader from '../components/GifLoader.vue';
    // custom vuejs loaders
    import LoaderLorealparisV3 from '../customs/LorealparisV3Loader.vue';

    export default {
        name: COMPONENT_APP_LOAD,
        components: {
            GifLoader,
            LoaderLorealparisV3
        },
        computed: {
            ...mapGetters({
                uiImage: 'uiImage',
                uiOption: 'uiOption',
                loading: 'loading'
            }),
            customLoaderComponent() {
                const uiOptionCustomLoaderComponent = this.uiOption(UI_OPTION_CUSTOM_LOADER_COMPONENT);
                if(uiOptionCustomLoaderComponent !== "" && uiOptionCustomLoaderComponent in this.$options.components) {
                    return uiOptionCustomLoaderComponent;
                } else {
                    return COMPONENT_DEFAULT_GIF_LOADER;
                }
            },
            customLoaderParams() {
                return this.uiOption(UI_OPTION_CUSTOM_LOADER_PARAMS);
                /*
            width="23"
        :height="23"
        :sprite-width="23"
        :sprite-height="3450"
        sprite-url="loader.png"
        :ticks-per-frame="1"
        :number-of-frames="150"
        */
            },
            loaderBackground() {
                const bgImgEnabled = this.uiOption(UI_OPTION_LOADER_BG_IMAGE_ENABLED);
                const bgImg = `url(${this.uiImage(CMS_LOADER_BG_IMAGE)})`;
                const bgColor = this.uiOption(UI_OPTION_LOADER_BG_COLOR);
                return {
                    background: bgImgEnabled? bgImg:bgColor,
                };
            },
        }
    };

 </script>

<style scoped>
    .loader_container {
        width:100%;
        height:100%;
        position: absolute;
        left: 0;
        top: 0;
        background: black;
        background-size: cover;
        z-index: 1000;
    }
</style>



// WEBPACK FOOTER //
// src/components/AppLoading.vue