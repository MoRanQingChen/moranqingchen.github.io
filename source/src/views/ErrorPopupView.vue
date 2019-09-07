<template>
    <div class="error_page" v-bind:style="errorPageCss">
        <span class="error_title" v-bind:style="errorTitleCss">{{ errorText.title }}</span>
        <span class="error_description" v-bind:style="errorSubtitleCss">{{ errorText.description }}</span>
        <div class="error_buttons">
            <div class="error_button" v-bind:style="errorPhotoButtonCss" v-if="showUpload" v-on:click="triggerUpload">
                <img class="error_button_icon" v-bind:style="errorPhotoIconCss" src="../assets/img/intermediate_upload_icon.png">
                <span v-bind:style="errorPhotoTextCss">{{ errorText.upload }}</span>
                <input ref="fileUpload" type="file" accept="image/*" v-show="false"
                        v-on:change="modeChange(MODE_PHOTO,$event.target)">
            </div>
            <div class="error_button" v-bind:style="errorLiveButtonCss" v-if="showLive" v-on:click="modeChange(MODE_LIVE)">
                <img v-bind:style="errorLiveIconCss" class="error_button_icon" src="../assets/img/intermediate_camera_icon.png">
                <span v-bind:style="errorLiveTextCss">{{ errorText.live }}</span>
            </div>
            <div class="error_button" v-if="showClose" v-on:click="close">
                <span>{{ errorText.close }}</span>
            </div>
            <img v-bind:src="errorCloseIcon" class="close_button" v-on:click="close">
        </div>
        <div class="warning_check_do_not_show" v-if="showCheckDoNotShow" v-on:click="toggleCheckDoNotShow">
            <div class="checkbox">
                <img src="../assets/img/icon_checkmark.svg" v-if="doNotShowChecked">
            </div>
            <div class="check_do_not_show_text">{{ errorText.checkDoNotShow }}</div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import processUpload from '../utils/processUpload.js';
    import eventMessage from '../utils/eventMessage.js';
    import { MODE_PHOTO, MODE_LIVE, VIEW_LANDING, VIEW_ERROR_POPUP, VIEW_LIVE_DASHBOARD, 
            VIEW_PHOTO_DASHBOARD, 
            CHANNEL_EVENT_MODE_CHANGE, CHANNEL_EVENT_TRACKING, CHANNEL_EVENT_DISPLAY_SHADE_OVERLAY,
            CATEGORY_HAIR,
            TRACKING_TYPE_KEY, TRACKING_PAGE_TYPE_KEY,
            TRACKING_TYPE_CTA_CLOSE_ERROR,
            UI_OPTION_INTERMEDIATE_ERROR_PAGE_CSS, UI_OPTION_INTERMEDIATE_ERROR_TITLE_CSS, UI_OPTION_INTERMEDIATE_ERROR_SUBTITLE_CSS,
            UI_OPTION_INTERMEDIATE_ERROR_LIVE_BUTTON_CSS, UI_OPTION_INTERMEDIATE_ERROR_LIVE_ICON_CSS, UI_OPTION_INTERMEDIATE_ERROR_LIVE_TEXT_CSS,
            UI_OPTION_INTERMEDIATE_ERROR_PHOTO_BUTTON_CSS, UI_OPTION_INTERMEDIATE_ERROR_PHOTO_ICON_CSS, UI_OPTION_INTERMEDIATE_ERROR_PHOTO_TEXT_CSS } from '../utils/constants.js';
    import { getIntermediateTrackingType, getIntermediateTrackingPageType } from '../utils/trackingHelpers.js';

    import { modeChangeHandler, intermediateErrorHandler } from '../services/listenerHandlers.js';
    import { resetStates } from '../services/closeMf.js';
    import liveMode from '../services/liveMode.js';
    import photoMode from '../services/photoMode.js';
    import initLibModule from '../services/initLibModule.js';
    import { liveModuleExist, initLiveModule, playLiveModule, getLiveHairColor,
        showLiveModule, hideLiveModule, createLiveEffect } from '../utils/libModules.js';

    export default {
        name: VIEW_ERROR_POPUP,
        beforeDestroy() {
            this.setErrorType({
                errorType: null,
                warning: null
            });

            if(this.showClose) {
                this.showTryon();
            }
        },
        props: [
            'showUpload',
            'showLive',
            'showClose',
            'showCheckDoNotShow',
            'isWarningError',
            'closeRedirect'
        ],
        data() {
            return {
                MODE_PHOTO,
                MODE_LIVE,
                doNotShowChecked: false,
            };
        },
        computed: {
            ...mapGetters({
                frameReady: 'frameReady',
                selectedMode: 'selectedMode',
                uiText: 'uiText',
                uiOption: 'uiOption',
            }),
            errorText() {
                return this.uiText(VIEW_ERROR_POPUP);
            },
            errorCloseIcon() {
                if(this.$store.getters.category === CATEGORY_HAIR) {
                    return require('../assets/img/hair_intermediate_error_close.png');
                } else {
                    return require('../assets/img/intermediate_error_close.png');
                }
            },
            errorPageCss() {
                let errorPageCssObj = this.uiOption(UI_OPTION_INTERMEDIATE_ERROR_PAGE_CSS);
                if(this.$store.getters.category === CATEGORY_HAIR) {
                    errorPageCssObj.color = errorPageCssObj.color || 'white';
                    errorPageCssObj.backgroundImage = errorPageCssObj.backgroundImage || `url('${require('../assets/img/hair_error_background.png')}')`;
                }
                return errorPageCssObj;
            },
            errorTitleCss() {
                return this.uiOption(UI_OPTION_INTERMEDIATE_ERROR_TITLE_CSS);
            },
            errorSubtitleCss() {
                return this.uiOption(UI_OPTION_INTERMEDIATE_ERROR_SUBTITLE_CSS);
            },
            errorLiveButtonCss() {
                return this.uiOption(UI_OPTION_INTERMEDIATE_ERROR_LIVE_BUTTON_CSS);
            },
            errorLiveIconCss() {
                return this.uiOption(UI_OPTION_INTERMEDIATE_ERROR_LIVE_ICON_CSS);
            },
            errorLiveTextCss() {
                return this.uiOption(UI_OPTION_INTERMEDIATE_ERROR_LIVE_TEXT_CSS);
            },
            errorPhotoButtonCss() {
                return this.uiOption(UI_OPTION_INTERMEDIATE_ERROR_PHOTO_BUTTON_CSS);
            },
            errorPhotoIconCss() {
                return this.uiOption(UI_OPTION_INTERMEDIATE_ERROR_PHOTO_ICON_CSS);
            },
            errorPhotoTextCss() {
                return this.uiOption(UI_OPTION_INTERMEDIATE_ERROR_PHOTO_TEXT_CSS);
            }
        },
        methods: {
            ...mapActions({
                showTryon: 'showTryon',
                setErrorType: 'setErrorType',
                dispatchChannelEvent: 'dispatchChannelEvent',
            }),
            triggerUpload() {
                this.$refs.fileUpload.click();
            },
            getPageType() {
                if(this.isWarningError) {
                    return this.$store.getters.errorType;
                } else {
                    return getIntermediateTrackingPageType(this.$route.name, this.$store.getters.errorType);
                }
            },
            modeChange(mode, eventTarget) {
                if(!this.frameReady) return;

                let trackingData = {};
                trackingData[TRACKING_TYPE_KEY] = getIntermediateTrackingType(mode);
                trackingData[TRACKING_PAGE_TYPE_KEY] = this.getPageType();

                processUpload(mode, eventTarget).then( img => {
                    let data = { mode, img};
                    this.modeChangeHandler(data);

                    this.dispatchChannelEvent({
                        message: new eventMessage(CHANNEL_EVENT_TRACKING, trackingData)
                    });

                    this.showTryon();
                });
            },
            toggleCheckDoNotShow() {
                this.doNotShowChecked = !this.doNotShowChecked;

                this.$store.dispatch({
                    type: 'setDoNotShow',
                    checked: this.doNotShowChecked
                });

                // close right away?
            },
            close() {
                let trackingData = {};
                trackingData[TRACKING_TYPE_KEY] = TRACKING_TYPE_CTA_CLOSE_ERROR;
                trackingData[TRACKING_PAGE_TYPE_KEY] = this.getPageType();
                this.dispatchChannelEvent({
                    message: new eventMessage(CHANNEL_EVENT_TRACKING, trackingData)
                });

                this.$router.replace(this.closeRedirect);
            },
            modeChangeHandler,
            intermediateErrorHandler,
            resetStates,
            liveMode,
            photoMode,
            initLiveModule,
            initLibModule,
        },
        mounted() {
            this.dispatchChannelEvent({
                message: new eventMessage(
                    CHANNEL_EVENT_DISPLAY_SHADE_OVERLAY, {
                        show: false,
                        showShade: false
                    })
            });
        }
    };
</script>

<style scoped>
    .error_page {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 28vh 15vw 8vh;
        color: black;
        background: white url('../assets/img/error_background.png') no-repeat;
        background-size: 100% 100%;
        text-align: center;
        letter-spacing: 0.1em;
    }
    .error_page > * {
        display: inline-block;
        margin: 2vh 0;
    }
    .error_title {
        color: inherit;
        font-size: 1.0em;
        font-weight: 600;
    }
    .error_description {
        color: inherit;
        font-size: 0.7em;
        font-weight: 400;
    }
    .error_buttons {
        width: 100%;
        margin: 5vh 0;
        color: white;
    }
    .error_button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 86%;
        height: 12%;
        margin: 2vh 0;
        background: black;
        color: white;
        font-size: 0.7em;
        font-weight: 400;
        cursor: pointer;
    }
    .error_button > * {
        display: inline-block;
        position: relative;
    }
    .error_button_icon {
        margin-right: 16px;
        height: 54%;
    }
    .close_button {
        position: absolute;
        width: 4vmin;
        top: 5vmin;
        right: 5vmin;
        cursor: pointer;
    }
    .warning_check_do_not_show {
        cursor: pointer;
        display: inline-flex;
        margin: 3vh 0;
        font-size: 0.7em;
        font-weight: 400;
    }
    .check_do_not_show_text {
        color: inherit;
    }
    .checkbox {
        display: inline-block;
        width: 1em;
        height: 1em;
        border: 1px solid white;
        margin-right: 0.7em;
        vertical-align: middle;
        cursor: pointer;
    }
    .checkbox > img {
        width: 100%;
        height: 100%;
        user-select: none;
    }
</style>



// WEBPACK FOOTER //
// src/views/ErrorPopupView.vue