<template>
    <div class="close_container" v-bind:style="closeContainerCss">
        <img class="close_button"
            v-bind:src="uiImage(CMS_CLOSE_ICON)"
            v-bind:style="closeButtonCss"
            v-on:click="closeMf"
        >
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import closeMf from '../services/closeMf.js';
    import { COMPONENT_CLOSE_BUTTON, CMS_CLOSE_ICON, UI_OPTION_CLOSE_CONTAINER_CSS, UI_OPTION_CLOSE_BUTTON_CSS } from '../utils/constants.js';

    export default {
        name: COMPONENT_CLOSE_BUTTON,
        data() {
            return {
                CMS_CLOSE_ICON
            };
        },
        computed: {
            ...mapGetters({
                uiImage: 'uiImage',
                uiOption: 'uiOption',
                uxWrapper: 'uxWrapper'
            }),
            closeContainerCss() {
                return this.uiOption(UI_OPTION_CLOSE_CONTAINER_CSS);
            },
            closeButtonCss () {
                return this.uiOption(UI_OPTION_CLOSE_BUTTON_CSS);
            },
        },
        methods: {
            closeMf,
        }
    };
</script>

<style scoped>
    .close_container {
        position: absolute;
        left: 0px;
        top: 0px;
        width: 100%;
        height: 22vmin;
        z-index: 100;
    }
    .close_button {
        width: 8vmin;
        position: absolute;
        top: 0%;
        right: 0%;
        margin-top: 0%;
        margin-right: 0%;
        cursor: pointer;
        user-select: none;
    }
</style>



// WEBPACK FOOTER //
// src/components/TheCloseButton.vue