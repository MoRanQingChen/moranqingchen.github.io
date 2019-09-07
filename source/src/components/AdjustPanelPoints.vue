<template>
    <div>
        <canvas ref="mask" class="mask" v-bind:style="maskStyle"></canvas>
        <div class="dots" v-on:touchstart.prevent.self="triggerTouchDrag($event)">
            <div v-for="(coord,i) in currCoords" v-bind:key="i"
                v-bind:style="dotPosition(coord)"
                v-on:mousedown="mouseDrag($event,i)" v-on:touchstart.prevent.stop="touchDrag($event,i)"
                class="dot"></div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { mouseDrag, touchDrag, triggerTouchDrag } from '../services/dragDot.js';
    import drawMask from '../utils/drawMask.js';
    import { COMPONENT_ADJUST_PANEL_PTS, UI_OPTION_ADJUST_MASK_COLOR } from '../utils/constants.js';

    export default {
        name: COMPONENT_ADJUST_PANEL_PTS,
        props: [
            'mouthOpened'
        ],
        computed: {
            ...mapGetters({
                uiOption: 'uiOption',
                uploadedImage: 'uploadedImage',
                getAdjustCoords: 'getAdjustCoords',
                photoModuleCoords: 'photoModuleCoords',
                simImgStyle: 'simImgStyle',
                adjustState : 'adjustState'
            }),
            maskStyle() {
                const maskObj = drawMask({
                    canvas: this.$refs.mask,
                    adjustState: this.adjustState,
                    coords: this.photoModuleCoords,
                    imgW: this.uploadedImage.w,
                    imgH: this.uploadedImage.h,
                    color: this.uiOption(UI_OPTION_ADJUST_MASK_COLOR),
                });
                return {
                    left: maskObj.coords[0]*this.imgZoomLevel+parseFloat(this.simImgStyle.left)+'px',
                    top: maskObj.coords[1]*this.imgZoomLevel+parseFloat(this.simImgStyle.top)+'px',
                    width: maskObj.coords[2]*this.imgZoomLevel+'px',
                    height: maskObj.coords[3]*this.imgZoomLevel+'px'
                };
            },
            currCoords() {
                return this.photoModuleCoords[this.getAdjustCoords];
            },
            imgZoomLevel() {
                return parseFloat(this.simImgStyle.width)/this.uploadedImage.w;
            }
        },
        methods: {
            dotPosition(coord) {
                return {
                    top: coord.y*this.imgZoomLevel+parseFloat(this.simImgStyle.top)+'px',
                    left: coord.x*this.imgZoomLevel+parseFloat(this.simImgStyle.left)+'px'
                };
            },
            mouseDrag,
            touchDrag,
            triggerTouchDrag,
        }
    };
</script>

<style scoped>
    .mask {
        position: fixed;
        background: transparent;
        pointer-events: none;
    }
    .dots {
        width: 100%;
        height: 100%;
    }
    .dot {
        width: 2.5vmin;
        height: 2.5vmin;
        transform: translate(-50%,-50%);
        position: fixed;
        border-radius: 50%;
        background: white;
        cursor: pointer;
        user-select: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }
</style>



// WEBPACK FOOTER //
// src/components/AdjustPanelPoints.vue