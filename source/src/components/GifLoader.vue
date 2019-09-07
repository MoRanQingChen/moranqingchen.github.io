<template>
    <div class="loader">
        <img v-bind:src="uiImage(CMS_GIF_LOADER)">
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { COMPONENT_DEFAULT_GIF_LOADER,
            CMS_GIF_LOADER } from '../utils/constants.js';
    export default {
        name: COMPONENT_DEFAULT_GIF_LOADER,
        data() {
            return {
                CMS_GIF_LOADER,
            };
        },
        computed: {
            ...mapGetters({
                uiImage: 'uiImage',
            }),
        }
    }
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
// src/components/GifLoader.vue