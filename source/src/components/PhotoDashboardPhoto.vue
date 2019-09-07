<template>
    <div style="z-index: 0;">
        <div v-bind:id="canvasInfo.rendered.containerId" class="rendered"></div>
        <div class="original_wrapper" v-bind:style="{width:origWidth}">
            <div v-bind:id="canvasInfo.original.containerId" class="original" v-show="beforeafterState"></div>
        </div>
        <component v-bind:is="COMPONENT_SLIDER" v-if="beforeafterState" v-on="sliderCustomEvents"></component>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import SliderComponent from './TheSlider.vue';
    import { photoViewMounted, photoViewBeforeDestroy, positionPhoto, browBeforeAfterSlide } from '../services/photoMode.js';
    import { COMPONENT_PHOTO, COMPONENT_SLIDER, EVENT_SLIDE, MODULE_BROWSTYLE } from '../utils/constants.js';

    export default {
        name: COMPONENT_PHOTO,
        mounted() {
            this.photoViewMounted();
            if(this.moduleMode === MODULE_BROWSTYLE) {
                if(this.beforeafterState) {
                    this.browBeforeAfterSlide(50);
                } else {
                    this.browBeforeAfterSlide(0);
                }
            }
        },
        beforeDestroy: photoViewBeforeDestroy,
        data() {
            return {
                COMPONENT_SLIDER,
                canvasInfo: {
                    original: {
                        containerId: 'original_photo_container',
                        canvasId: 'original_photo_canv',
                        canvasClass: 'original_photo_canv'
                    },
                    rendered: {
                        containerId: 'rendered_photo_container',
                        canvasId: 'rendered_photo_canv',
                        canvasClass: 'rendered_photo_canv'
                    }
                },
                origWidth: '',
                sliderCustomEvents: {
                    [EVENT_SLIDE]: this.onSlide,
                },
            };
        },
        computed: {
            ...mapGetters({
                ctaState: 'ctaState',
                browCanvas: 'browCanvas',
                browCanvasOriginal: 'browCanvasOriginal',
                moduleMode: 'moduleMode'
            }),
            beforeafterState() {
                return this.$route.query.beforeAfter;
            }
        },
        methods: {
            positionPhoto,
            browBeforeAfterSlide,
            photoViewMounted,
            onSlide(percent) {
                this.origWidth = percent;
                if(this.moduleMode === MODULE_BROWSTYLE) {
                    this.browBeforeAfterSlide(percent);
                }
            }
        },
        watch: {
            beforeafterState(origShown) {
                if(!origShown) {
                    this.origWidth = '';
                    if(this.moduleMode === MODULE_BROWSTYLE) {
                        this.browBeforeAfterSlide(0);
                    }
                } else {
                    if(this.moduleMode === MODULE_BROWSTYLE) {
                        this.browBeforeAfterSlide(50);
                    }
                }
            }
        },
        components: {
            SliderComponent
        }
    };
</script>

<style scoped>
    .original_wrapper {
        z-index: 10;
        width: 50%;
        height: 100%;
        position: relative;
        overflow: hidden;
    }
    .original, .rendered {
        position: absolute;
        height: 100%;
        overflow: hidden;
    }
    .original {
        width: 100vw;
    }
    .rendered {
        z-index: 0;
        width: 100%;
    }
    .original > canvas, .rendered > canvas {
        position: relative;
        z-index: -1;
    }
</style>


// WEBPACK FOOTER //
// src/components/PhotoDashboardPhoto.vue