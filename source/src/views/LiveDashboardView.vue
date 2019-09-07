<template>
    <div>
        <component v-bind:is="COMPONENT_LIVE" class="live_component"></component>
        <component v-bind:is="COMPONENT_CTA_BUTTONS"
            side="LEFT"
            v-on="ctaCustomEvents"></component>
        <component v-bind:is="COMPONENT_CTA_BUTTONS"
            side="RIGHT"
            v-on="ctaCustomEvents"></component>
        <component v-bind:is="COMPONENT_CLOSE_BUTTON"></component>
        <component v-bind:is="COMPONENT_CAPTURE_OVERLAY"
            class="overlay_component"
            v-if="takePhotoOn"
            v-bind:countdown="takePhotoCountdown"
        ></component>
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
            v-on="onIntensitySlide()"
            v-model="sliderValue">
        </vue-slider>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import lookChange from '../services/lookChange.js';
    import vueSlider from 'vue-slider-component';
    import LiveComponent from '../components/LiveDashboardLive.vue';
    import TakePhotoOverlayComponent from '../components/TakePhotoOverlayComponent.vue';
    import CloseButton from '../components/TheCloseButton.vue';
    import CtaButtons from '../components/TheCtaButtons.vue';

    import eventMessage from '../utils/eventMessage.js';
    import { playLiveModule, pauseLiveModule, getLiveAfter, 
            tutorialLiveSetStep, tutorialLiveSetPlayCount } from '../utils/libModules.js';

    import { VIEW_LIVE_DASHBOARD, VIEW_QUAD_COMPARE, VIEW_SHARE, VIEW_FAVORITE,
            COMPONENT_LIVE, COMPONENT_CAPTURE_OVERLAY,
            COMPONENT_CTA_BUTTONS, COMPONENT_CLOSE_BUTTON,
            EVENT_START_SHARE, EVENT_START_QUAD, EVENT_START_FAVORITE,
            UI_OPTION_INTENSITY_SLIDER_CSS, UI_OPTION_INTENSITY_SLIDER_BOB_CSS, UI_OPTION_INTENSITY_SLIDER_ENABLED,
            CATEGORY_FOUNDATION, CATEGORY_LIPCOLOR, CATEGORY_EYESHADOW, CATEGORY_EYELINER, CATEGORY_BLUSH, CATEGORY_LIPLINER, CATEGORY_MASCARA, CATEGORY_BROW, CATEGORY_HAIR,
            EVENT_TUTORIAL_NEXT, EVENT_TUTORIAL_PREV, 
            CHANNEL_EVENT_DISPLAY_SHADE_OVERLAY, MODE_LIVE,
            CHANNEL_EVENT_TUTORIAL_SET_STEP, UI_OPTION_SHARE_TO_DOWNLOAD_DIRECTLY, SHARE_DOWNLOAD } from '../utils/constants.js';

    export default {
        name: VIEW_LIVE_DASHBOARD,
        components: {
            LiveComponent,
            TakePhotoOverlayComponent,
            CtaButtons,
            CloseButton,
            vueSlider
        },
        data() {
            return {
                sliderValue: 0,
                COMPONENT_LIVE,
                COMPONENT_CAPTURE_OVERLAY,
                COMPONENT_CTA_BUTTONS,
                COMPONENT_CLOSE_BUTTON,
                takePhotoCountdown: -1,
                takePhotoOn: false,
                ctaCustomEvents: {
                    [EVENT_START_SHARE]: this.startCountdown,
                    [EVENT_START_QUAD]: this.startCountdown,
                    [EVENT_START_FAVORITE]: this.startCountdown,
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
                    tooltip: 'hidden'
                },
            };
        },
        computed: {
            ...mapGetters({
                countDownSec: 'countDownSec',
                validLookId: 'validLookId',
                category: 'category',
                selectedLookId: 'selectedLookId',
                upcInfo: 'upcInfo',
                intensityValue: 'intensityValue',
                getSelectedLookInfo: 'getSelectedLookInfo', 
                effectJson: 'effectJson', 
                moduleMode: 'moduleMode',
                uiOption: 'uiOption',
                getIntensityRange: 'getIntensityRange',
                intensitySliderAvailable: 'intensitySliderAvailable',
                tutorialStep: 'tutorialStep',
                tutorialEffects: 'tutorialEffects',
                tutorialMaxStep: 'tutorialMaxStep',
                tutorialOptions: 'tutorialOptions',
                getSelectedTutorialLookInfo: 'getSelectedTutorialLookInfo',
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
                setCtaState : 'setCtaState',
                setCaptureTimeoutId: 'setCaptureTimeoutId',
                uploadShareImage: 'uploadShareImage',
                dispatchChannelEvent: 'dispatchChannelEvent',
                shareWrapper: 'shareWrapper',
                loaded: 'loaded',
            }),
            startCountdown(view) {
                this.takePhotoOn = true;
                this.takePhotoCountdown = this.countDownSec;

                // show loader if not showing any countdown
                if(this.takePhotoCountdown === 0) {
                    this.loading();
                }

                this.recordSetTimeout(this.loopCountdown,1000,view);
            },
            loopCountdown(view) {
                this.takePhotoCountdown--;
                if(!this.validLookId) {
                    // interrupt the countdown
                    this.takePhotoOn = false;
                } else if(this.takePhotoCountdown <= 0) {
                    // pause live stream
                    pauseLiveModule();

                    let capturePromise;
                    if(view === VIEW_QUAD_COMPARE) {
                        capturePromise = Promise.resolve();
                    } else if(view === VIEW_SHARE || view === VIEW_FAVORITE) {
                        capturePromise = getLiveAfter().then( liveData => {
                            // upload share image, show loader after at most 2 seconds or when upload finishes
                            const uploadProgress = this.uploadShareImage({
                                uriData: liveData
                            }),
                            previewTimeout = new Promise( resolve => {
                                setTimeout(resolve, 2000);  // 2 seconds
                            });
                            Promise.race([previewTimeout,uploadProgress]).then(this.loading);   // show loader until share image is loaded
                            return uploadProgress;  // wait till upload finishes before switching to share view
                        });
                    } else {
                        capturePromise = Promise.reject();
                    }

                    capturePromise.then( () => {
                        if(this.uiOption(UI_OPTION_SHARE_TO_DOWNLOAD_DIRECTLY)) {
                            this.shareWrapper({
                                type: SHARE_DOWNLOAD,
                                imageType: this.$route.query
                            });
                            this.loaded();
                            playLiveModule();
                            this.takePhotoOn = false;
                        } else {
                            this.$router.replace(view);
                        }
                    }, () => {
                        // upload failed
                        playLiveModule();
                        this.takePhotoOn = false;
                        console.log('share image upload failed');
                    });
                } else {
                    this.recordSetTimeout(this.loopCountdown,1000,view);
                }
            },
            recordSetTimeout(...args) {
                this.setCaptureTimeoutId({
                    id: setTimeout(...args)
                });
            },
            onIntensitySlide() {
                if(this.category === CATEGORY_HAIR) {
                    this.sliderValue = this.intensityValue;
                }
                else {
                    this.sliderValue = this.intensityValue / this.getIntensityRange;
                }
            },
            lookChange,
            tutorialNext() {
                let step = this.tutorialStep + 1;
                this.$store.dispatch({
                    type: 'setTutorialStep',
                    step: this.tutorialStep + 1
                });
                if(step == this.tutorialMaxStep) {
                    tutorialLiveSetPlayCount(0);
                } else {
                    this.tutorialSetCurrentStep(this.tutorialStep);
                }
            },
            tutorialPrev() {
                tutorialLiveSetPlayCount(this.tutorialOptions['playCount']);
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
                tutorialLiveSetStep(n);
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
                }
                vm.dispatchChannelEvent({
                    message: new eventMessage(
                        CHANNEL_EVENT_DISPLAY_SHADE_OVERLAY, {
                            show: true,
                            showShade: !vm.$route.query.beforeAfter
                        })
                });
            });
        },
        beforeRouteUpdate (to, from, next) {
            // do not have access to 'this', use callback of next() instead
            this.dispatchChannelEvent({
                message: new eventMessage(
                    CHANNEL_EVENT_DISPLAY_SHADE_OVERLAY, {
                        show: true,
                        showShade: !to.query.beforeAfter
                    })
            });
            next();
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
    .live_component {
        width: 100%;
        height: 100%;
    }
    .overlay_component {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0px;
        left: 0px;
    }
</style>



// WEBPACK FOOTER //
// src/views/LiveDashboardView.vue