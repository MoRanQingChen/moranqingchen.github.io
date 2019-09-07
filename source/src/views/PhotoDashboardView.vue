<template>
    <div>
        <component v-bind:is="COMPONENT_PHOTO"></component>
        <component v-bind:is="COMPONENT_CTA_BUTTONS"
            side="LEFT"
            v-on="ctaCustomEvents"></component>
        <component v-bind:is="COMPONENT_CTA_BUTTONS"
            side="RIGHT"
            v-on="ctaCustomEvents"></component>
        <component v-bind:is="COMPONENT_CLOSE_BUTTON"></component>
        <vue-slider 
            v-if="intensitySliderAvailable&&validLookId"
            v-show="isIntensitySliderEnabled"
            class="slider_container"
            tooltipDir='top' 
            ref="slider" 
            :dotSize="sliderOptions.dotSize" 
            :height='sliderOptions.height' 
            :width='sliderOptions.width'
            :min='sliderOptions.min' 
            :max='sliderOptions.max'
            :tooltip='sliderOptions.tooltip'
            :interval='sliderOptions.interval' 
            :bgStyle="intensitySliderBgStyle"
            :sliderStyle="intensitySliderBobStyle"
            :processStyle="intensitySliderFillStyle"
            direction="vertical" 
            v-model="sliderValue"
            v-on="onIntensitySlide()">
        </vue-slider>
    </div>
</template>

<script>
    import { mapActions, mapGetters } from 'vuex';
    import lookChange from '../services/lookChange.js';
    import vueSlider from 'vue-slider-component';
    import waitLoading from '../services/waitLoading.js';
    import PhotoComponent from '../components/PhotoDashboardPhoto.vue';
    import CloseButton from '../components/TheCloseButton.vue';
    import CtaButtons from '../components/TheCtaButtons.vue';
    import { getPhotoAfter,
            tutorialPhotoSetStep, tutorialPhotoSetPlayCount } from '../utils/libModules.js';
    import { getShareImageType } from '../utils/trackingHelpers.js';
    import share from '../utils/share.js';

    import eventMessage from '../utils/eventMessage.js';
    import { VIEW_PHOTO_DASHBOARD,
            COMPONENT_PHOTO, COMPONENT_CLOSE_BUTTON,
            COMPONENT_CTA_BUTTONS,
            EVENT_START_SHARE, EVENT_START_FAVORITE,
            UI_OPTION_INTENSITY_SLIDER_CSS, UI_OPTION_INTENSITY_SLIDER_BOB_CSS, UI_OPTION_INTENSITY_SLIDER_ENABLED,
            CATEGORY_FOUNDATION, CATEGORY_LIPCOLOR, CATEGORY_EYESHADOW, CATEGORY_EYELINER, CATEGORY_BLUSH, CATEGORY_LIPLINER, CATEGORY_MASCARA, CATEGORY_BROW, CATEGORY_HAIR,
            EVENT_TUTORIAL_NEXT, EVENT_TUTORIAL_PREV, 
            CHANNEL_EVENT_DISPLAY_SHADE_OVERLAY,
            CHANNEL_EVENT_TUTORIAL_SET_STEP,
            UI_OPTION_SHARE_TO_DOWNLOAD_DIRECTLY, SHARE_DOWNLOAD } from '../utils/constants.js';

    export default {
        name: VIEW_PHOTO_DASHBOARD,
        components: {
            PhotoComponent,
            CtaButtons,
            CloseButton,
            vueSlider
        },
        data() {
            return {
                sliderValue: 0,
                COMPONENT_PHOTO,
                COMPONENT_CTA_BUTTONS,
                COMPONENT_CLOSE_BUTTON,
                ctaCustomEvents: {
                    [EVENT_START_SHARE]: this.startShareFav,
                    [EVENT_START_FAVORITE]: this.startShareFav,
                    [EVENT_TUTORIAL_NEXT]: this.tutorialNext,
                    [EVENT_TUTORIAL_PREV]: this.tutorialPrev,
                },
                sliderOptions: {
                    width: 2,
                    height: 270,
                    dotSize: 25,
                    interval: 0.01,
                    min: 0,
                    max: 1,
                    tooltip: 'none'
                },
            };
        },
        computed: {
            ...mapGetters({
                category: 'category',
                selectedLookId: 'selectedLookId',
                upcInfo: 'upcInfo',
                initializingIntensitySlider: 'initializingIntensitySlider',
                intensityValue: 'intensityValue',
                getSelectedLookInfo: 'getSelectedLookInfo', 
                effectJson: 'effectJson', 
                moduleMode: 'moduleMode',
                uiOption: 'uiOption',
                intensitySliderAvailable: 'intensitySliderAvailable',
                getIntensityRange: 'getIntensityRange',
                tutorialStep: 'tutorialStep',
                tutorialEffects: 'tutorialEffects',
                tutorialMaxStep: 'tutorialMaxStep',
                tutorialOptions: 'tutorialOptions',
                getSelectedTutorialLookInfo: 'getSelectedTutorialLookInfo',
                validLookId: 'validLookId',
                intensitySliderEnabled: 'intensitySliderEnabled'
            }),
            intensitySliderBobStyle() {
                return this.uiOption(UI_OPTION_INTENSITY_SLIDER_BOB_CSS);
            },
            intensitySliderBgStyle() {
                return this.uiOption(UI_OPTION_INTENSITY_SLIDER_CSS);
            },
            intensitySliderFillStyle() {
                return this.uiOption(UI_OPTION_INTENSITY_SLIDER_CSS);
            },
            isIntensitySliderEnabled() {
                //intensitySliderEnabled is getter of frameParamsGetters
                if(typeof this.intensitySliderEnabled === 'undefined') {
                    return this.uiOption(UI_OPTION_INTENSITY_SLIDER_ENABLED);
                }
                else {
                    return this.intensitySliderEnabled;
                }
            },
        },
        methods: {
            ...mapActions({
                loading: 'loading',
                loaded: 'loaded',
                setCtaState : 'setCtaState',
                uploadShareImage: 'uploadShareImage',
                dispatchChannelEvent: 'dispatchChannelEvent',
                shareWrapper: 'shareWrapper',
            }),
            startShareFav(view) {
                // upload share image
                this.loading();
                getPhotoAfter().then( photoData => {
                    return this.uploadShareImage({
                        uriData: photoData
                    });
                }).then( () => {
                    if(this.uiOption(UI_OPTION_SHARE_TO_DOWNLOAD_DIRECTLY)) {
                        this.shareWrapper({
                            type: SHARE_DOWNLOAD,
                            imageType: this.$route.query
                        });
                        this.loaded();
                    } else {
                        this.$router.replace(view);
                    }
                }, () => {
                    // upload failed
                    this.loaded();
                    console.log('share image upload failed');
                });
            },
            lookChange,
            onIntensitySlide() {
                if(this.category === CATEGORY_HAIR) {
                    this.sliderValue = this.intensityValue;
                }
                else {
                    this.sliderValue = this.intensityValue / this.getIntensityRange;
                }
            },
            tutorialNext() {
                let step = this.tutorialStep + 1;
                this.$store.dispatch({
                    type: 'setTutorialStep',
                    step: this.tutorialStep + 1
                });
                if(step == this.tutorialMaxStep) {
                    tutorialPhotoSetPlayCount(0);
                } else {
                    this.tutorialSetCurrentStep(this.tutorialStep);
                }
            },
            tutorialPrev() {
                tutorialPhotoSetPlayCount(this.tutorialOptions['playCount']);
                this.$store.dispatch({
                    type: 'setTutorialStep',
                    step: this.tutorialStep - 1
                });
                this.tutorialSetCurrentStep(this.tutorialStep);
            },
            tutorialSetCurrentStep(n) {
                const stepInfo = this.getSelectedTutorialLookInfo['steps'][n];
                this.dispatchChannelEvent({
                    message: new eventMessage(
                        CHANNEL_EVENT_TUTORIAL_SET_STEP, 
                        { 
                            step: n,
                            stepInfo
                        }
                    )
                });
                tutorialPhotoSetStep(n);
            },
        },
        watch: {
            sliderValue(val) {
                if(this.category !== CATEGORY_HAIR) {
                    if(val == this.intensityValue / this.getIntensityRange) {
                        return;
                    }
                    let lookId = this.selectedLookId;
                    this.lookChange({
                        lookId: lookId,
                        shadeName: '',  // could be undefined
                        prodName: '',    // could be undefined
                        upcParams: {'color_a': val * this.getIntensityRange},  // could be undefined
                        shareUrl: '',      // could be undefined
                        eventType: ''   // could be undefined
                    });
                }
                else {
                    if(this.intensityValue == val) {
                        return;
                    }
                    let lookId = this.selectedLookId;
                    this.lookChange({
                        lookId: lookId,
                        shadeName: '',  // could be undefined
                        prodName: '',    // could be undefined
                        upcParams: {'intensity': val},  // could be undefined
                        shareUrl: '',      // could be undefined
                        eventType: ''   // could be undefined
                    });
                }
            }
        },
        beforeRouteEnter (to, from, next) {
            // do not have access to 'this', use callback of next() instead
            next( vm => {
                if(!vm.$route.query.beforeAfter) {
                    vm.setCtaState({
                        cta: null
                    });
                    vm.dispatchChannelEvent({
                        message: new eventMessage(
                            CHANNEL_EVENT_DISPLAY_SHADE_OVERLAY, {
                                show: true,
                                showShade: true
                            })
                    });
                } else {
                    vm.dispatchChannelEvent({
                        message: new eventMessage(
                            CHANNEL_EVENT_DISPLAY_SHADE_OVERLAY, {
                                show: true,
                                showShade: false
                            })
                    });
                }
            });
        },
    };
</script>

<style scoped>
.slider_container {
    position: absolute;
    bottom: 20px;
    left: 10px;
    height: 100vmin;
    z-index: 100;
}
</style>



// WEBPACK FOOTER //
// src/views/PhotoDashboardView.vue