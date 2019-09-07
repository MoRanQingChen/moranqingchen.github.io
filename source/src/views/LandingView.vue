<template>
    <div class="landing_container" v-bind:style="landingContainerCss">
        <div class="landing_page" v-bind:style="landingPageCss">
            <span v-bind:style="landingTitleCss" class="landing_title">{{ landingText.title }}</span>
            <span v-bind:style="landingSubtitleCss">{{ landingText.description }}</span>
            <div class="tryon_buttons">
                <div v-bind:class="tryonEnabled"
                    v-bind:style="landingLiveButtonCss"
                    v-if="frameReady&&showLive"
                    v-on:click="modeChange(MODE_LIVE)"
                >
                    <img v-bind:style="landingLiveIconCss" class="tryon_button_icon" src="../assets/img/intermediate_camera_icon.png">
                    <span v-bind:style="landingLiveTextCss">{{ landingText.live }}</span>
                </div>
                <div v-bind:class="tryonEnabled"
                    v-bind:style="landingPhotoButtonCss"
                    v-visible="frameReady"
                    v-on:click="triggerUpload"
                >
                    <img v-bind:style="landingPhotoIconCss" class="tryon_button_icon" src="../assets/img/intermediate_upload_icon.png">
                    <span v-bind:style="landingPhotoTextCss">{{ landingText.upload }}</span>
                    <input ref="fileUpload" type="file" accept="image/*" v-show="false"
                            v-on:change="modeChange(MODE_PHOTO,$event.target)">
                </div>
                <img v-bind:src="whiteOrBlackClose" v-bind:style="intermediateCloseButtonCss" class="close_button" v-on:click="closeMf()">
            </div>
            <span v-if="landingText.instruction || landingText.instruction2" class="landing_instr">
                {{ landingText.instruction }}
                <br v-if="landingText.instruction2">
                {{ landingText.instruction2 }}
            </span>
            <div v-if="showPrivacyPolicy" class="privacy_policy_section">
                <img class="privacy_policy_checkbox"
                    v-bind:src="isPrivacyPolicyAccepted ? uiImage(CMS_INTERMEDIATE_LANDING_PRIVACY_POLICY_CHECKBOX_ON):uiImage(CMS_INTERMEDIATE_LANDING_PRIVACY_POLICY_CHECKBOX_OFF)"
                    v-on:click="togglePrivacyCheckbox()">
                <span class="privacy_policy_checkbox_label"> 
                    {{ landingText.privacyPolicyCheckboxText }} 
                </span>
                <br>
                <span>{{ landingText.privacyPolicyPreLinkText }}</span>
                <span class="privacy_policy_link"
                    v-on:click="openPrivacyPolicy()">{{ landingText.privacyPolicyLinkText}}</span>
                <span>{{ landingText.privacyPolicyPostLinkText}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import processUpload from '../utils/processUpload.js';
    import eventMessage from '../utils/eventMessage.js';
    import { MODE_PHOTO, MODE_LIVE, VIEW_LANDING,
            UI_OPTION_INTERMEDIATE_LANDING_BG_COLOR,
            CATEGORY_HAIR,
            CHANNEL_EVENT_MODE_CHANGE, CHANNEL_EVENT_TRACKING, CHANNEL_EVENT_CHILD_EXIT, CHANNEL_EVENT_DISPLAY_SHADE_OVERLAY,
            TRACKING_TYPE_KEY, TRACKING_PAGE_TYPE_KEY, TRACKING_TYPE_CTA_EXIT, TRACKING_PAGE_TYPE_VIEW_INTERMEDIATE_LANDING, CMS_INTERMEDIATE_LANDING_CONTAINER_BG_IMAGE,
            UI_OPTION_INTERMEDIATE_LANDING_PAGE_CSS, UI_OPTION_INTERMEDIATE_LANDING_TITLE_CSS, UI_OPTION_INTERMEDIATE_LANDING_SUBTITLE_CSS,
            UI_OPTION_INTERMEDIATE_LANDING_LIVE_BUTTON_CSS, UI_OPTION_INTERMEDIATE_LANDING_LIVE_ICON_CSS, UI_OPTION_INTERMEDIATE_LANDING_LIVE_TEXT_CSS,
            UI_OPTION_INTERMEDIATE_LANDING_PHOTO_BUTTON_CSS, UI_OPTION_INTERMEDIATE_LANDING_PHOTO_ICON_CSS, UI_OPTION_INTERMEDIATE_LANDING_PHOTO_TEXT_CSS,
            UI_OPTION_INTERMEDIATE_LANDING_CLOSE_BUTTON_CSS, UI_OPTION_INTERMEDIATE_LANDING_CLOSE_BUTTON_USE_BLACK, UI_OPTION_INTERMEDIATE_LANDING_CONTAINER_BG_IMAGE_ENABLED,
            UI_OPTION_INTERMEDIATE_LANDING_CONTAINER_CSS,
            UI_OPTION_INTERMEDIATE_LANDING_PRIVACY_POLICY_ENABLED,
            CMS_INTERMEDIATE_LANDING_PRIVACY_POLICY_CHECKBOX_ON,
            CMS_INTERMEDIATE_LANDING_PRIVACY_POLICY_CHECKBOX_OFF } from '../utils/constants.js';
    import { getIntermediateTrackingType, getIntermediateTrackingPageType } from '../utils/trackingHelpers.js';
    import { modeChangeHandler, intermediateErrorHandler } from '../services/listenerHandlers.js';
    import { resetStates } from '../services/closeMf.js';
    import liveMode from '../services/liveMode.js';
    import photoMode from '../services/photoMode.js';
    import initLibModule from '../services/initLibModule.js';
    import { liveModuleExist, initLiveModule, playLiveModule, getLiveHairColor,
        showLiveModule, hideLiveModule, createLiveEffect } from '../utils/libModules.js';

    import { getParentModeChangeTrackingType } from '../utils/trackingHelpers.js';

    export default {
        name: VIEW_LANDING,
        data() {
            return {
                MODE_PHOTO,
                MODE_LIVE,
                CMS_INTERMEDIATE_LANDING_PRIVACY_POLICY_CHECKBOX_ON,
                CMS_INTERMEDIATE_LANDING_PRIVACY_POLICY_CHECKBOX_OFF
            };
        },
        computed: {
            ...mapGetters({
                tryon: 'tryon',
                frameReady: 'frameReady',
                uiText: 'uiText',
                uiImage: 'uiImage',
                uiOption: 'uiOption',
                showLive: 'liveModeSupport',
                isPrivacyPolicyAccepted: 'isPrivacyPolicyAccepted',

            }),
            whiteOrBlackClose() {
                if(this.uiOption(UI_OPTION_INTERMEDIATE_LANDING_CLOSE_BUTTON_USE_BLACK)) {
                    return require('../assets/img/intermediate_landing_close_black.png');
                } else {
                    return require('../assets/img/intermediate_landing_close.png');
                }
            },
            intermediateCloseButtonCss() {
                return this.uiOption(UI_OPTION_INTERMEDIATE_LANDING_CLOSE_BUTTON_CSS);
            },
            landingText() {
                return this.uiText(VIEW_LANDING);
            },
            fullInstruction() {
                if(this.landingText.instruction === "" && this.landingText.instruction2 === "") {
                    return "";
                } else {
                    return this.landingText.instruction + "<br>" + this.landingText.instruction2;
                }
            },
            landingContainerCss() {
                let landingContainerCss = this.uiOption(UI_OPTION_INTERMEDIATE_LANDING_CONTAINER_CSS);

                const bgImgEnabled = this.uiOption(UI_OPTION_INTERMEDIATE_LANDING_CONTAINER_BG_IMAGE_ENABLED);
                const bgImg = `url(${this.uiImage(CMS_INTERMEDIATE_LANDING_CONTAINER_BG_IMAGE)})`;

                if(bgImgEnabled) {
                    landingContainerCss.backgroundImage = bgImg;
                }

                return landingContainerCss;
            },
            landingPageCss() {
                let landingPageCssObj = this.uiOption(UI_OPTION_INTERMEDIATE_LANDING_PAGE_CSS);

                landingPageCssObj.backgroundColor = (this.uiOption(UI_OPTION_INTERMEDIATE_LANDING_BG_COLOR) || landingPageCssObj.backgroundColor) ||
                                (this.$store.getters.category === CATEGORY_HAIR? 'rgb(169, 125, 175)':'');

                return landingPageCssObj;
            },
            landingTitleCss() {
                return this.uiOption(UI_OPTION_INTERMEDIATE_LANDING_TITLE_CSS);
            },
            landingSubtitleCss() {
                return this.uiOption(UI_OPTION_INTERMEDIATE_LANDING_SUBTITLE_CSS);
            },
            landingLiveButtonCss() {
                return this.uiOption(UI_OPTION_INTERMEDIATE_LANDING_LIVE_BUTTON_CSS);
            },
            landingLiveIconCss() {
                return this.uiOption(UI_OPTION_INTERMEDIATE_LANDING_LIVE_ICON_CSS);
            },
            landingLiveTextCss() {
                return this.uiOption(UI_OPTION_INTERMEDIATE_LANDING_LIVE_TEXT_CSS);
            },
            landingPhotoButtonCss() {
                return this.uiOption(UI_OPTION_INTERMEDIATE_LANDING_PHOTO_BUTTON_CSS);
            },
            landingPhotoIconCss() {
                return this.uiOption(UI_OPTION_INTERMEDIATE_LANDING_PHOTO_ICON_CSS);
            },
            landingPhotoTextCss() {
                return this.uiOption(UI_OPTION_INTERMEDIATE_LANDING_PHOTO_TEXT_CSS);
            },
            showPrivacyPolicy() {
                return this.uiOption(UI_OPTION_INTERMEDIATE_LANDING_PRIVACY_POLICY_ENABLED);
            },
            tryonEnabled() {
                if(this.showPrivacyPolicy && !this.isPrivacyPolicyAccepted) {
                    return "tryon_button_disabled";
                } else {
                    return "tryon_button";
                }
            }
        },
        methods: {
            ...mapActions({
                showTryon: 'showTryon',
                dispatchChannelEvent: 'dispatchChannelEvent',
                setPrivacyPolicyAccepted: 'setPrivacyPolicyAccepted',
            }),
            triggerUpload() {
                if(this.showPrivacyPolicy && !this.isPrivacyPolicyAccepted) {
                    return;
                }
                this.$refs.fileUpload.click();
            },
            modeChange(mode, eventTarget) {
                if(!this.frameReady || 
                    (this.showPrivacyPolicy && !this.isPrivacyPolicyAccepted)) return;

                let trackingData = {};
                trackingData[TRACKING_TYPE_KEY] = getIntermediateTrackingType(mode);
                trackingData[TRACKING_PAGE_TYPE_KEY] = getIntermediateTrackingPageType(this.$route.name);

                processUpload(mode, eventTarget).then( img => {
                    //should be handled with a service locally
                    let data = { mode, img};
                    this.modeChangeHandler(data);


                    //send directly to parent
                    this.dispatchChannelEvent({
                        message: new eventMessage(CHANNEL_EVENT_TRACKING, trackingData)
                    });

                    this.showTryon();
                });
            },
            closeMf() {
                // send event tracking
                let trackingData = {};
                trackingData[TRACKING_TYPE_KEY] = TRACKING_TYPE_CTA_EXIT;
                trackingData[TRACKING_PAGE_TYPE_KEY] = TRACKING_PAGE_TYPE_VIEW_INTERMEDIATE_LANDING;

                this.dispatchChannelEvent({
                    message: new eventMessage(CHANNEL_EVENT_TRACKING, trackingData)
                });

                this.dispatchChannelEvent({
                    message: new eventMessage(CHANNEL_EVENT_CHILD_EXIT)
                });
            },
            togglePrivacyCheckbox() {
                this.setPrivacyPolicyAccepted({
                    checked: !this.isPrivacyPolicyAccepted
                });
            },
            openPrivacyPolicy() {
                window.open(this.landingText.privacyPolicyUrl, '_blank');
            },
            modeChangeHandler,
            resetStates,
            liveMode,
            photoMode,
            initLiveModule,
            initLibModule,
            getParentModeChangeTrackingType,
            intermediateErrorHandler,
        },
        directives: {
            visible(el, binding) {
                el.style.visibility = (!!binding.value)?'visible':'hidden';
            }
        },
        mounted() {
            if(this.tryon) {
                // TODO: change this to correctly show "showShade"
                this.dispatchChannelEvent({
                    message: new eventMessage(
                        CHANNEL_EVENT_DISPLAY_SHADE_OVERLAY, {
                            show: true,
                            showShade: true
                        })
                });            
            } else {
                this.dispatchChannelEvent({
                    message: new eventMessage(
                        CHANNEL_EVENT_DISPLAY_SHADE_OVERLAY, {
                            show: false,
                            showShade: false
                        })
                });
            }
        }
    };
</script>

<style scoped>
    .landing_container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .landing_page {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0vh 10vw 0vh;
        background: rgb(220, 92, 90);
        text-align: center;
        letter-spacing: 0.1em;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .landing_page > * {
        color: white;
        display: block;
        margin: 1vh 0;
    }
    .landing_title {
        font-size: 1.5em;
    }
    .landing_instr {
        letter-spacing: 0;
        font-weight: 200;
        font-size: 0.8em;
        line-height: 1.8em;
    }
    .tryon_buttons {
        width: 100%;
        margin: 5vh 0;
    }
    .tryon_button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 9vh;
        margin: 2vh 0;
        border: 2px solid white;
        box-sizing: border-box;
        color: white;
        font-size: 0.7em;
        font-weight: 500;
        cursor: pointer;
    }
    .tryon_button_disabled {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 9vh;
        margin: 2vh 0;
        border: 2px solid white;
        box-sizing: border-box;
        color: white;
        font-size: 0.7em;
        font-weight: 500;
        cursor: default;
        opacity: 0.5;
    }
    .tryon_button > * {
        display: inline-block;
        position: relative;
    }
    .tryon_button_icon {
        margin-right: 16px;
        max-height: 54%;
    }
    .privacy_policy_section {
        font-weight: 200;
        font-size: 0.6em;
        line-height: 1.6em;
    }
    .privacy_policy_link {
        text-decoration: underline;
        cursor:pointer;
    }
    .privacy_policy_checkbox {
        position:absolute;
        display:inline-block;
        width:1.6em;
        height:1.6em;
        cursor:pointer;
        border:0px;
        margin-top: 2vh;
    }
    .privacy_policy_checkbox_label {
        display:inline-block;
        margin-left: 2em;
        margin-bottom: 1vh;
        margin-top: 2vh;
        font-size: 1.2em;
        font-weight: bold;
    }
    .close_button {
        position: absolute;
        width: 4vmin;
        top: 5vmin;
        right: 5vmin;
        cursor: pointer;
    }
</style>



// WEBPACK FOOTER //
// src/views/LandingView.vue