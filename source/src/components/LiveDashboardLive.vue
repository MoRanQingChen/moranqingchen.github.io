<template>
    <div style="z-index: 0;">
        <div v-bind:id="canvasInfo.rendered.containerId" v-bind:style="renderedLiveContainerCss" class="rendered"></div>
        <div class="original_wrapper" v-bind:style="{width:origWidth}">
            <div v-bind:id="canvasInfo.original.containerId" class="original" v-show="beforeafterState"></div>
        </div>
        <component v-bind:is="COMPONENT_SLIDER" v-if="beforeafterState" v-on="sliderCustomEvents"></component>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import SliderComponent from './TheSlider.vue';
    import { liveViewMounted, liveViewBeforeDestroy, positionLive, browBeforeAfterSlide } from '../services/liveMode.js';
    import { COMPONENT_LIVE, COMPONENT_SLIDER, EVENT_SLIDE, CTA_BEFORE_AFTER, 
        MODULE_BROWSTYLE,
        UI_OPTION_RENDERED_LIVE_CONTAINER_CSS } from '../utils/constants.js';

    export default {
        name: COMPONENT_LIVE,
        mounted() {
            this.liveViewMounted();
            if(this.moduleMode === MODULE_BROWSTYLE) {
                if(this.beforeafterState) {
                    this.browBeforeAfterSlide(50);
                } else {
                    this.browBeforeAfterSlide(0);
                }
            }
        },
        beforeDestroy: liveViewBeforeDestroy,
        data() {
            return {
                COMPONENT_SLIDER,
                canvasInfo: {
                    original: {
                        containerId: 'original_live_container',
                        canvasId: 'original_live_canv',
                        canvasClass: 'original_live_canv'
                    },
                    rendered: {
                        containerId: 'rendered_live_container',
                        canvasId: 'rendered_live_canv',
                        canvasClass: 'rendered_live_canv'
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
                moduleMode: 'moduleMode',
                uiOption: 'uiOption'
            }),
            beforeafterState() {
                return this.$route.query.beforeAfter;
            },
            renderedLiveContainerCss() {
                return this.uiOption(UI_OPTION_RENDERED_LIVE_CONTAINER_CSS);
            }
        },
        components: {
            SliderComponent
        },
        methods: {
            onSlide(percent) {
                this.origWidth = percent;
                if(this.moduleMode === MODULE_BROWSTYLE) {
                    this.browBeforeAfterSlide(percent);
                }
            },
            browBeforeAfterSlide,
            liveViewMounted,
            positionLive,
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
        left: 0px;
        top: 0px;
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
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
    }
</style>



// WEBPACK FOOTER //
// src/components/LiveDashboardLive.vue