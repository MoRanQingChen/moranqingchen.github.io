<template>
    <div id="iosDownloadPopup" v-bind:style="showIosDownload">
        <div class="popupContainer" v-bind:style="whiteOrBlackTheme">
            <img id="iosDownloadImg"
                class="downloadImg"
                v-bind:src="shareImageUri">
            <div class="downloadInstr">{{ uiText(IOS_DOWNLOAD_POPUP_INST_TEXT) }}</div>
            <img v-bind:style="closeButtonCss" 
                v-on:click="closePopup" 
                v-bind:src="whiteOrBlackClose">
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapActions } from 'vuex';
    import { COMPONENT_IOS_DOWNLOAD_POPUP, UI_OPTION_CLOSE_BUTTON_CSS, CMS_CLOSE_ICON, CMS_CLOSE_ICON_BLACK,
        IOS_DOWNLOAD_POPUP_INST_TEXT, UI_OPTION_IOS_DOWNLOAD_POPUP_USE_BLACK_THEME } from '../utils/constants.js';

    export default {
        name: COMPONENT_IOS_DOWNLOAD_POPUP,
        data() {
            return {
                CMS_CLOSE_ICON,
                CMS_CLOSE_ICON_BLACK,
                IOS_DOWNLOAD_POPUP_INST_TEXT
            };
        },
        computed: {
            ...mapGetters({
                uiImage: 'uiImage',
                uiOption: 'uiOption',
                uiText: 'uiText',
                isIosDownload: 'isIosDownload',
                shareImageUri: 'shareImageUri'
            }),
            closeButtonCss () {
                return {
                    position: 'absolute',
                    top: '0px',
                    right: '0px',
                    width: '8vmin',
                    height: 'auto',
                    cursor: 'pointer'
                };
            },
            showIosDownload () {
                return {
                    display: this.isIosDownload ? 'block' : 'none',
                    background: this.uiOption(UI_OPTION_IOS_DOWNLOAD_POPUP_USE_BLACK_THEME) ? 
                    'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)'
                };
            },
            whiteOrBlackTheme () {
                if(this.uiOption(UI_OPTION_IOS_DOWNLOAD_POPUP_USE_BLACK_THEME)) {
                    return {
                        'background': 'rgb(0,0,0)',
                        'color': 'rgb(255,255,255)'
                    };
                } 
                else {
                    return {
                        'background': 'rgb(255,255,255)',
                        'color': 'rgb(0,0,0)'
                    };
                }
            },
            whiteOrBlackClose() {
                if(this.uiOption(UI_OPTION_IOS_DOWNLOAD_POPUP_USE_BLACK_THEME)) {
                    return this.uiImage(CMS_CLOSE_ICON_BLACK);
                } else {
                    return this.uiImage(CMS_CLOSE_ICON);
                }
            },
        },
        methods: {
            ...mapActions({
                setIosDownload: 'setIosDownload'
            }),
            closePopup() {
                this.setIosDownload({
                    isIosDownload: false
                });
            }
        }
    };

 </script>

<style scoped>
    .popupContainer {
        position: absolute;
        width: auto;
        height: auto;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    #iosDownloadPopup {
        position: absolute;
        left: 0%;
        top: 0%;
        width: 100%;
        height: 100%;
        z-index: 99999999;
    }

    .downloadImg {
        height: auto;
        width: 50vh;
    }

    .downloadInstr {
        width: auto;
        text-align: center;
        margin-bottom: 4vmin;
        margin-top: 4vmin;
        font-size: 3vmin;
    }
</style>



// WEBPACK FOOTER //
// src/components/IosDownloadPopup.vue