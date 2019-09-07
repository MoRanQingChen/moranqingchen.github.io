<template>
    <div v-bind:id="simImgInfo.containerId" class="simulation_photo_container">
        <img v-bind:id="simImgInfo.imgId" v-bind:src="imageSrc" v-bind:style="simImgStyle" v-on:load="simImgLoaded">
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { simPhotoMounted, simPhotoBeforeDestroy, positionSimPhoto } from '../services/simulationPhoto.js';
    import { COMPONENT_SIM_PHOTO } from '../utils/constants.js';

    export default {
        name: COMPONENT_SIM_PHOTO,
        mounted: simPhotoMounted,
        beforeDestroy: simPhotoBeforeDestroy,
        props: [
            'imageSrc'
        ],
        data() {
            return {
                simImgInfo: {
                    containerId: 'simulation_photo_container',
                    imgId: 'simulation_photo_img'
                }
            };
        },
        computed: {
            ...mapGetters({
                adjustState: 'adjustState',
                simImgStyle: 'simImgStyle'
            })
        },
        methods: {
            ...mapActions({
                loaded: 'loaded',
            }),
            positionSimPhoto,
            simImgLoaded() {
                this.positionSimPhoto();
                this.loaded();
            }
        },
        watch: {
            adjustState() {
                this.positionSimPhoto();
            }
        }
    };
</script>

<style scoped>
    .simulation_photo_container {
        overflow: hidden;
        user-select: none;
    }
</style>



// WEBPACK FOOTER //
// src/components/TheSimulationPhoto.vue