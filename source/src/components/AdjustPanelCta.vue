<template>
    <div class="cta_panel" v-bind:style="adjustCtaBg">
        <div class="cta_container">
            <div class="cta_button" v-bind:style="ctaButton" v-on:click="reset(false)">
                <img v-if="uiOption(UI_OPTION_DISPLAY_ADJUST_ICON)" v-bind:src="uiImage(CMS_ADJUST_RESET_ICON)">
                <span v-bind:ref="ADJUST_RESET" v-bind:style="ctaButtonText[ADJUST_RESET]">{{ uiText(ADJUST_RESET) }}</span>
            </div>
            <div class="cta_button" v-bind:style="ctaButton" v-on:click="save">
                <img v-if="uiOption(UI_OPTION_DISPLAY_ADJUST_ICON)" v-bind:src="uiImage(CMS_ADJUST_SAVE_ICON)">
                <span v-bind:ref="ADJUST_SAVE" v-bind:style="ctaButtonText[ADJUST_SAVE]">{{ uiText(ADJUST_SAVE) }}</span>
            </div>
            <div class="cta_button" v-bind:style="ctaButton" v-on:click="cancel" v-if="uiOption(UI_OPTION_USE_SAME_ADJUST_CTA_STYLE)">
                <img v-if="uiOption(UI_OPTION_DISPLAY_ADJUST_ICON)" v-bind:src="uiImage(CMS_ADJUST_CANCEL_ICON)">
                <span v-bind:ref="ADJUST_CANCEL" v-bind:style="ctaButtonText[ADJUST_CANCEL]">{{ uiText(ADJUST_CANCEL) }}</span>
            </div>
        </div>
        <div class="cta_cancel" v-if="!uiOption(UI_OPTION_USE_SAME_ADJUST_CTA_STYLE)">
            <span class="cancel_button" v-on:click="cancel">{{ uiText(ADJUST_CANCEL) }}</span>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { applyPhotoCoords } from '../utils/libModules.js';
    import eventMessage from '../utils/eventMessage.js';
    import { MODE_LIVE, MODE_PHOTO,
            VIEW_PHOTO_DASHBOARD, VIEW_LIVE_DASHBOARD,
            COMPONENT_ADJUST_PANEL_CTA, CHANNEL_EVENT_TRACKING, COORDS_MOUTH_OPEN,
            ADJUST_LIPS, ADJUST_RESET, ADJUST_SAVE, ADJUST_CANCEL,
            TRACKING_TYPE_KEY, TRACKING_TYPE_CTA_ADJUST_RESET, TRACKING_TYPE_CTA_ADJUST_SAVE,
            UI_OPTION_ADJUST_PANEL_GRADIENT_FROM_COLOR, UI_OPTION_ADJUST_PANEL_GRADIENT_TO_COLOR,
            UI_OPTION_ADJUST_CTA_TEXT_COLOR, UI_OPTION_DISPLAY_ADJUST_ICON, UI_OPTION_DISPLAY_ADJUST_CTA_BORDER,
            CMS_ADJUST_RESET_ICON, CMS_ADJUST_SAVE_ICON, 
            CMS_ADJUST_CANCEL_ICON, UI_OPTION_ADJUST_CTA_CSS, UI_OPTION_USE_SAME_ADJUST_CTA_STYLE } from '../utils/constants.js';

    export default {
        name: COMPONENT_ADJUST_PANEL_CTA,
        mounted() {
            // adjust button text font sizes to fit within button container
            this.adjustCtaButtonText();

            this.initialCoords = JSON.parse(JSON.stringify(this.resetPhotoModuleCoords));  // deep copy
            this.resetCoords = JSON.parse(JSON.stringify(this.photoModuleCoords));  // deep copy
        },
        beforeDestroy() {
            if(this.improperExit) {
                // if page exit is triggered by means other than closeAdj(), cancel any coords change
                this.reset(true);
            }
            this.setAdjustState({
                adjustState: null
            });
        },
        props: [
            'mouthOpened'
        ],
        data() {
            return {
                CMS_ADJUST_RESET_ICON,
                CMS_ADJUST_SAVE_ICON,
                CMS_ADJUST_CANCEL_ICON,
                ADJUST_RESET,
                ADJUST_SAVE,
                ADJUST_CANCEL,
                UI_OPTION_DISPLAY_ADJUST_ICON,
                initialCoords: {},
                resetCoords: {},
                improperExit: true,
                ctaButtonText: {},
                UI_OPTION_USE_SAME_ADJUST_CTA_STYLE
            };
        },
        computed: {
            ...mapGetters({
                uiText: 'uiText',
                uiImage: 'uiImage',
                uiOption: 'uiOption',
                selectedMode: 'selectedMode',
                adjustState : 'adjustState',
                getAdjustCoords: 'getAdjustCoords',
                getAdjustStepsArr: 'getAdjustStepsArr',
                resetPhotoModuleCoords: 'resetPhotoModuleCoords',
                photoModuleCoords: 'photoModuleCoords',
            }),
            mainDashboardView() {
                if(this.selectedMode === MODE_LIVE) {
                    return VIEW_LIVE_DASHBOARD;
                } else if(this.selectedMode === MODE_PHOTO) {
                    return VIEW_PHOTO_DASHBOARD;
                }
            },
            adjustCtaBg() {
                return {
                    '--grad-from': this.uiOption(UI_OPTION_ADJUST_PANEL_GRADIENT_TO_COLOR),
                    '--grad-to': this.uiOption(UI_OPTION_ADJUST_PANEL_GRADIENT_FROM_COLOR),
                };
            },
            ctaButton() {
                let css = this.uiOption(UI_OPTION_ADJUST_CTA_CSS);
                css.borderWidth = this.uiOption(UI_OPTION_DISPLAY_ADJUST_CTA_BORDER)? '':'0px',
                css.color = this.uiOption(UI_OPTION_ADJUST_CTA_TEXT_COLOR);
                return css;
            },
        },
        methods: {
            ...mapActions({
                setAdjustState: 'setAdjustState',
                resetPhotoCoords: 'resetPhotoCoords',
                dispatchChannelEvent: 'dispatchChannelEvent'
            }),
            async adjustCtaButtonText() {
                const ctaButtonText = [ADJUST_RESET,ADJUST_SAVE];
                for (let i = 0; i < ctaButtonText.length; i++) {
                    const textEle = this.$refs[ctaButtonText[i]];
                    while(textEle.offsetHeight > textEle.parentElement.offsetHeight) {
                        this.ctaButtonText[ctaButtonText[i]] = {
                            fontSize: parseFloat(window.getComputedStyle(textEle).fontSize)-1+'px'
                        };
                        // wait for ui update before next iteration
                        this.$forceUpdate();
                        await this.$nextTick();
                    }
                }
            },
            reset(cancelCta) {
                if(!cancelCta) {
                    let trackingData = {};
                    trackingData[TRACKING_TYPE_KEY] = TRACKING_TYPE_CTA_ADJUST_RESET;

                    this.dispatchChannelEvent({
                        message: new eventMessage(CHANNEL_EVENT_TRACKING, trackingData)
                    });
                }

                // reset button resets to initial coords detected by makeup module
                // cancel button resets to last saved coords by user
                const resetCoords = cancelCta?this.resetCoords:this.initialCoords;
                let features = [this.getAdjustCoords],
                    coords = [resetCoords[this.getAdjustCoords]];
                if(this.adjustState===ADJUST_LIPS && cancelCta) {
                    features = features.concat([COORDS_MOUTH_OPEN]);
                    coords = coords.concat([resetCoords[COORDS_MOUTH_OPEN]]);
                }
                this.resetPhotoCoords({
                    features,
                    coords
                });
            },
            save() {
                let trackingData = {};
                trackingData[TRACKING_TYPE_KEY] = TRACKING_TYPE_CTA_ADJUST_SAVE;

                this.dispatchChannelEvent({
                    message: new eventMessage(CHANNEL_EVENT_TRACKING, trackingData)
                });

                const nextAdjInd = this.getAdjustStepsArr.indexOf(this.adjustState) + 1,
                    nextAdj = this.getAdjustStepsArr[nextAdjInd];
                if(nextAdj) {   // if next adjust step exists
                    this.setAdjustState({
                        adjustState: nextAdj
                    });
                } else {
                    applyPhotoCoords(this.photoModuleCoords).then( () => {
                        this.closeAdj();
                    });
                }
            },
            cancel() {
                this.reset(true);
                this.closeAdj();
            },
            closeAdj() {
                this.improperExit = false;
                this.$router.replace(this.mainDashboardView);
            }
        },
    };
</script>

<style scoped>
    .cta_panel {
        --grad-from: rgba(0,0,0,0);   /* default */
        --grad-to: rgba(0,0,0,0.3);   /* default */

        display: flex;
        flex-direction: column;
        background: linear-gradient(var(--grad-from), var(--grad-to));
    }
    .cta_container {
        display: flex;
        /* justify-content: space-around; */
        /* justify-content: space-evenly; */
        justify-content: space-between;
        flex-grow: 0;
        margin: 0px 3%;
    }
    .cta_button {
        width: 47.75%;
        /* height: 45%; */
        height: 9vh;
        border: 1px solid black;
        color: black;
        display: flex;
        align-items: center;
        justify-content: center;
        background: white;
        text-align: center;
        cursor: pointer;
        user-select: none;
    }
    .cta_button > * {
        /* vertical-align: middle; */
    }
    .cta_button > img {
        height: 4vmin;
    }
    .cta_button > span {
        font-size: 0.7em;
        letter-spacing: 0.05em;
        margin-left: 3%;
        max-width: 82%;
    }
    .cta_cancel {
        position: relative;
        flex-grow: 1;
    }
    .cancel_button {
        display: inline-block;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        color: white;
        font-size: 0.7em;
        letter-spacing: 0.15em;
        text-decoration: underline;
        cursor: pointer;
        user-select: none;
    }
</style>



// WEBPACK FOOTER //
// src/components/AdjustPanelCta.vue