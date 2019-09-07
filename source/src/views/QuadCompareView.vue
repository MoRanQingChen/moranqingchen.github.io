<template>
    <div>
        <div v-bind:id="quadContainerId" v-bind:class="quadContainerId">
            <component v-bind:is="COMPONENT_SINGLE_LOOK"
                v-for="i in lookNum" v-bind:key="i"
                v-bind:class="singleLookClass"
                v-bind:singleLookInd="i-1"
                v-on="singleLookCustomEvents"></component><!-- this removes spaces between inline blocks
     --><div v-for="j in (4 - lookNum)"
            v-bind:key="j+lookNum"
            class="single_look_placeholder">
            <span v-if="uiOption(UI_OPTION_QUAD_NUMBER)" class="placeholder_num">{{ j+lookNum }}</span>
            <div v-else class="placeholder_plus"></div>
        </div>
        </div>
        <component v-bind:is="COMPONENT_CTA_BUTTONS" 
            side="RIGHT"
            v-on="ctaCustomEvents"></component>
        <component v-bind:is="COMPONENT_BACK_BUTTON"></component>
        <component v-bind:is="COMPONENT_CAPTURE_OVERLAY"
            class="overlay_component"
            v-if="takePhotoOn"
            v-bind:countdown="takePhotoCountdown"
        ></component>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import is from 'is_js';
    import SingleLookComponent from '../components/QuadCompareSingleLook.vue';
    import TakePhotoOverlayComponent from '../components/TakePhotoOverlayComponent.vue';
    import BackButton from '../components/TheBackButton.vue';
    import CtaButtons from '../components/TheCtaButtons.vue';
    import { quadCompareMounted, queueSingleLookRender, recordSingleLookInfo } from '../services/quadCompare.js';
    import { playLiveModule, pauseLiveModule, getLookAfter } from '../utils/libModules.js';
    import combineQuadImg from '../utils/combineQuadImg.js';
    import { MODULE_MAKEUP, MODE_LIVE, VIEW_QUAD_COMPARE, VIEW_SHARE,
            COMPONENT_SINGLE_LOOK, COMPONENT_CAPTURE_OVERLAY, COMPONENT_BACK_BUTTON,
            COMPONENT_CTA_BUTTONS, 
            EVENT_QUEUE_RENDER, EVENT_REPORT_INFO, EVENT_START_SHARE,
            CTA_QUAD_COMPARE, UI_OPTION_QUAD_REVERSE_ORDER, UI_OPTION_QUAD_NUMBER,
            UI_OPTION_SHARE_TO_DOWNLOAD_DIRECTLY, SHARE_DOWNLOAD } from '../utils/constants.js';

    export default {
        name: VIEW_QUAD_COMPARE,
        mounted: quadCompareMounted,
        data() {
            return {
                COMPONENT_SINGLE_LOOK,
                COMPONENT_CAPTURE_OVERLAY,
                COMPONENT_CTA_BUTTONS,
                COMPONENT_BACK_BUTTON,
                UI_OPTION_QUAD_NUMBER,
                quadContainerId: 'quad_container',
                singleLookClass: 'single_look_component' + (is.ios()?' ios_fix':''),
                singleLookInit: true,
                singleLookRenderQueue: Promise.resolve(),
                lookCanvases: [],
                lookNameText: [],
                takePhotoCountdown: -1,
                takePhotoOn: false,
                singleLookCustomEvents: {
                    [EVENT_QUEUE_RENDER]: this.queueSingleLookRender,
                    [EVENT_REPORT_INFO]: this.recordSingleLookInfo,
                },
                ctaCustomEvents: {
                    [EVENT_START_SHARE]: this.startShare,
                },
            };
        },
        computed: {
            ...mapGetters({
                lookHistory: 'lookHistory',
                selectedMode: 'selectedMode',
                validLookId: 'validLookId',
                moduleMode: 'moduleMode',
                uiOption: 'uiOption',
                countDownSec: 'countDownSec',
            }),
            lookNum() {
                return Math.min(this.lookHistory.length,4);
            },
            lookIdLookup() {
                const lookIdArr = Array.from(
                    {length: this.lookNum},
                    (val, ind) => 'single_look_'+(this.lookHistory.length - this.lookNum + ind)
                );
                if(this.uiOption(UI_OPTION_QUAD_REVERSE_ORDER)) {
                    return lookIdArr;
                } else {
                    return lookIdArr.slice().reverse();
                }
            },
        },
        components: {
            SingleLookComponent,
            TakePhotoOverlayComponent,
            CtaButtons,
            BackButton
        },
        methods: {
            ...mapActions({
                loading: 'loading',
                loaded: 'loaded',
                setCtaState : 'setCtaState',
                setCaptureTimeoutId: 'setCaptureTimeoutId',
                uploadShareImage: 'uploadShareImage',
                shareWrapper: 'shareWrapper',
            }),
            queueSingleLookRender,
            recordSingleLookInfo,
            startShare() {
                if(this.lookHistory.length === 0) {
                    this.uploadShare([Promise.reject()]); // trigger upload error handler
                } else if(this.selectedMode === MODE_LIVE && this.moduleMode === MODULE_MAKEUP) {
                    this.startCountdown();
                } else {
                    this.loading();
                    const getPhotoAfterAll = [];
                    for (let i = 0; i < this.lookCanvases.length; i++) {
                        getPhotoAfterAll.push(getLookAfter({
                            mode: this.selectedMode,
                            lookId: this.lookIdLookup[i]
                        }));
                    }
                    this.uploadShare(getPhotoAfterAll);
                }
            },
            startCountdown() {
                this.takePhotoOn = true;
                this.takePhotoCountdown = this.countDownSec;
                this.setCaptureTimeoutId({
                    id: setTimeout(this.loopCountdown,1000)
                });
            },
            loopCountdown() {
                this.takePhotoCountdown--;
                if(!this.validLookId) {
                    // interrupt the countdown
                    this.takePhotoOn = false;
                } else  if(this.takePhotoCountdown <= 0) {
                    // pause live stream
                    pauseLiveModule();
                    // upload share image
                    const getLiveAfterAll = [];
                    for(let i = 0; i < this.lookCanvases.length; i++) {
                        getLiveAfterAll.push(getLookAfter({
                            mode: this.selectedMode,
                            lookId: this.lookIdLookup[i]
                        }));
                    }
                    this.uploadShare(getLiveAfterAll);
                } else {
                    this.setCaptureTimeoutId({
                        id: setTimeout(this.loopCountdown,1000)
                    });
                }
            },
            uploadShare(getImgAfterAll) {
                Promise.all(getImgAfterAll).then( imgDataArr => {
                    const imgArr = [], textArr = [];
                    for(let i = 0; i < imgDataArr.length; i++) {
                        imgArr.push({
                            imgUri: imgDataArr[i],
                            ...this.lookCanvases[i]
                        });
                        textArr.push({
                            ...this.lookNameText[i]
                        });
                    }
                    return combineQuadImg({
                        quadContainerId: this.quadContainerId,
                        imgArr,
                        textArr,
                    });
                }).then( combinedImgUri => {
                    // upload share image, show loader after at most 2 seconds or when upload finishes
                    const uploadProgress = this.uploadShareImage({
                        uriData: combinedImgUri
                    }),
                    previewTimeout = new Promise( resolve => {
                        setTimeout(resolve, 2000);  // 2 seconds
                    });
                    Promise.race([previewTimeout,uploadProgress]).then(this.loading);   // show loader until share image is loaded
                    return uploadProgress;  // wait till upload finishes before switching to share view
                }).then( () => {
                    if(this.uiOption(UI_OPTION_SHARE_TO_DOWNLOAD_DIRECTLY)) {
                        this.shareWrapper({
                            type: SHARE_DOWNLOAD,
                            imageType: { quad: true }
                        });
                        this.loaded();
                        playLiveModule();
                        this.takePhotoOn = false;
                    } else {
                        this.$router.replace({ path: VIEW_SHARE, query: { quad: true }});
                    }
                }, () => {
                    // upload failed
                    if(this.selectedMode === MODE_LIVE && this.moduleMode === MODULE_MAKEUP) {
                        playLiveModule();
                        this.takePhotoOn = false;
                    }
                    this.loaded();
                    console.log('share image upload failed');
                });
            },
        },
        beforeRouteEnter (to, from, next) {
            // do not have access to 'this', use callback of next() instead
            next( vm => {
                vm.setCtaState({
                    cta: CTA_QUAD_COMPARE
                });
            });
        },
    };
</script>

<style scoped>
    .quad_container {
        --quad-border-width: 1px;
        width: 100%;
        height: 100%;
        border: var(--quad-border-width) solid black;
        box-sizing: border-box;
    }
    .quad_container::before, .quad_container::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background: black;
    }
    .quad_container::before {
        width: 100%;
        height: 1px;
    }
    .quad_container::after {
        width: 1px;
        height: 100%;
    }
    .single_look_component {
        width: 50%;
        height: 50%;
        vertical-align: top;
        display: inline-block;
    }
    .quad_container > .single_look_component.ios_fix {
        /* using percentage with width and height causes issues in ios safari, so use vw and vh instead */
        width: calc(50vw - var(--quad-border-width));
        height: calc(50vh - var(--quad-border-width));
    }
    .single_look_placeholder {
        width: 50%;
        height: 50%;
        position: relative;
        display: inline-block;
    }
    .placeholder_num {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        font-size: 5vmin;
    }
    .placeholder_plus {
        width: 100%;
        height: 100%;
        background: url('../assets/img/quad_plus_icon2.png') center no-repeat;
        background-size: 3vmin;
    }
</style>



// WEBPACK FOOTER //
// src/views/QuadCompareView.vue