<template>
    <div class="compare"
        id="the_compare_slider"
        v-bind:style="slider"
        v-on:mousedown="mouseSlide"
        v-on:touchstart="touchSlide">
        <img v-bind:src="uiImage(CMS_SLIDER_KNOB)" v-bind:style="sliderKnob" draggable="false" v-on:dragstart.prevent="">
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { mouseSlide, touchSlide } from '../services/slider.js';
    import { COMPONENT_SLIDER, CTA_BEFORE_AFTER, EVENT_SLIDE,
            UI_OPTION_COMPARE_SLIDER_CSS, UI_OPTION_COMPARE_SLIDER_KNOB_CSS,
            CMS_SLIDER_KNOB, UI_OPTION_COMPARE_SLIDER_BG_COLOR } from '../utils/constants.js';

    export default {
        name: COMPONENT_SLIDER,
        mounted() {
            this.setCtaState({
                cta: CTA_BEFORE_AFTER
            });
        },
        beforeDestroy() {
            this.setCtaState({
                cta: null
            });
        },
        data() {
            return {
                sliderLeft: '',
                CMS_SLIDER_KNOB
            };
        },
        computed: {
            ...mapGetters({
                uiImage: 'uiImage',
                uiOption: 'uiOption'
            }),
            slider() {
                let compareSliderCssObj = this.uiOption(UI_OPTION_COMPARE_SLIDER_CSS);
                compareSliderCssObj.backgroundColor = (this.uiOption(UI_OPTION_COMPARE_SLIDER_BG_COLOR) || compareSliderCssObj.backgroundColor); 
                return compareSliderCssObj;
            },
            sliderKnob() {
                return this.uiOption(UI_OPTION_COMPARE_SLIDER_KNOB_CSS);
            }
        },
        methods: {
            ...mapActions({
                setCtaState: 'setCtaState',
            }),
            mouseSlide,
            touchSlide
        },
        watch: {
            sliderLeft(val) {
                this.$emit(EVENT_SLIDE, val);
                $('#the_compare_slider')[0].style.left = val;
            }
        }
    };
</script>

<style scoped>
    .compare {
        width: 2px;
        height: 100%;
        position: fixed;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        background: black;
        z-index: 20;
    }
    .compare > img {
        max-width: 10vw;
        max-height: 10vh;
        position: absolute;
        bottom: 10%;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 50%;
        cursor: pointer;
        user-select: none;
    }
</style>



// WEBPACK FOOTER //
// src/components/TheSlider.vue