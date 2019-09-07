<template>
    <div>
        <component v-bind:is="COMPONENT_SIM_PHOTO"
            class="simulation_photo"
            v-bind:imageSrc="uploadedImage.uri"></component>
        <component v-bind:is="COMPONENT_ADJUST_PANEL" class="adjust_panel"></component>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import SimulationPhoto from '../components/TheSimulationPhoto.vue';
    import AdjustPanel from '../components/AdjustPanel.vue';
    import { VIEW_ADJUST, COMPONENT_SIM_PHOTO, COMPONENT_ADJUST_PANEL, CTA_ADJUST } from '../utils/constants.js';

    export default {
        name: VIEW_ADJUST,
        components: {
            SimulationPhoto,
            AdjustPanel
        },
        data() {
            return {
                COMPONENT_SIM_PHOTO,
                COMPONENT_ADJUST_PANEL,
            };
        },
        computed: {
            ...mapGetters({
                uploadedImage: 'uploadedImage'
            })
        },
        methods: {
            ...mapActions({
                setCtaState: 'setCtaState',
            }),
        },
        beforeRouteEnter (to, from, next) {
            // do not have access to 'this', use callback of next() instead
            next( vm => {
                vm.setCtaState({
                    cta: CTA_ADJUST
                });
            });
        },
    };
</script>

<style scoped>
    .simulation_photo {
        width: 100vw;
        height: 100vh;
    }
    .adjust_panel {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        font-size: 5vmin;
    }
</style>



// WEBPACK FOOTER //
// src/views/AdjustView.vue