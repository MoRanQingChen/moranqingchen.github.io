<template>
    <div class="share-container" v-bind:style="shareContainerCss">
        <img v-bind:src="uiImage(CMS_SHARE_FACEBOOK_ICON)"
            v-on:click="shareCta(SHARE_FACEBOOK)"
            v-bind:style="shareButtonCss"
            v-if="enableShareCta(SHARE_FACEBOOK)&&!downloadOnlyShare">
        <img v-bind:src="uiImage(CMS_SHARE_TWITTER_ICON)"
            v-on:click="shareCta(SHARE_TWITTER)"
            v-bind:style="shareButtonCss"
            v-if="enableShareCta(SHARE_TWITTER)&&!downloadOnlyShare">
        <img v-bind:src="uiImage(CMS_SHARE_PINTEREST_ICON)"
            v-on:click="shareCta(SHARE_PINTEREST)"
            v-bind:style="shareButtonCss"
            v-if="enableShareCta(SHARE_PINTEREST)&&!downloadOnlyShare">
        <img v-bind:src="uiImage(CMS_SHARE_DOWNLOAD_ICON)"
            v-on:click="shareCta(SHARE_DOWNLOAD)"
            v-bind:style="shareButtonCss"
            v-if="enableShareCta(SHARE_DOWNLOAD)">
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import share from '../utils/share.js';
    import { COMPONENT_SHARE_POPUP, CHANNEL_EVENT_TRACKING, LOOK_INFO_PROD_NAME,
            SHARE_COPY, SHARE_FACEBOOK, SHARE_TWITTER, SHARE_PINTEREST, SHARE_DOWNLOAD,
            TRACKING_TYPE_KEY, TRACKING_SOCIAL_NETWORK_KEY, TRACKING_SOCIAL_ACTION_KEY,
            TRACKING_SOCIAL_TARGET_KEY, TRACKING_SHARE_IMAGE_TYPE_KEY,
            TRACKING_TYPE_SHARE_SOCIAL_NETWORK, TRACKING_TYPE_SHARE_DOWNLOAD,
            CMS_SHARE_FACEBOOK_ICON, CMS_SHARE_TWITTER_ICON, CMS_SHARE_PINTEREST_ICON, CMS_SHARE_DOWNLOAD_ICON,
            UI_OPTION_SHARE_CONTAINER_BG_COLOR, UI_OPTION_CLIENT_MANAGE_SHARING,
            UI_OPTION_SHARE_CONTAINER_CSS, UI_OPTION_SHARE_BUTTON_CSS, UI_OPTION_ENABLE_SHARE_CTA, UI_OPTION_SHARE_NO_UPLOAD } from '../utils/constants.js';

    import eventMessage from '../utils/eventMessage.js';
    import { getSocialNetwork, getSocialAction, getShareImageType } from '../utils/trackingHelpers.js';

    export default {
        name: COMPONENT_SHARE_POPUP,
        data() {
            return {
                SHARE_FACEBOOK,
                SHARE_TWITTER,
                SHARE_PINTEREST,
                SHARE_DOWNLOAD,
                CMS_SHARE_FACEBOOK_ICON,
                CMS_SHARE_TWITTER_ICON,
                CMS_SHARE_PINTEREST_ICON,
                CMS_SHARE_DOWNLOAD_ICON,
            };
        },
        computed: {
            ...mapGetters({
                uiText: 'uiText',
                uiImage: 'uiImage',
                uiOption: 'uiOption',
                getLookInfo: 'getLookInfo',
                lookHistory: 'lookHistory',
                sharedShareUrl: 'sharedShareUrl',
                sharedLookName: 'sharedLookName',
                sharedProdName: 'sharedProdName',
                sharedShadeName: 'sharedShadeName',
                shareImage: 'shareImage',
                shareImageFb: 'shareImageFb',
                shareImageUri: 'shareImageUri'
            }),
            shareContainerCss() {
                let shareContainerCssObj = this.uiOption(UI_OPTION_SHARE_CONTAINER_CSS);
                shareContainerCssObj.backgroundColor = this.uiOption(UI_OPTION_SHARE_CONTAINER_BG_COLOR);
                return shareContainerCssObj;
            },
            shareButtonCss() {
                let shareButtonCssObj = this.uiOption(UI_OPTION_SHARE_BUTTON_CSS);
                shareButtonCssObj.visibility = this.uiOption(UI_OPTION_CLIENT_MANAGE_SHARING)? 'hidden':'';
                return shareButtonCssObj;
            },
            downloadOnlyShare() {
                return this.uiOption(UI_OPTION_SHARE_NO_UPLOAD);
            }
        },
        methods: {
            ...mapActions({
                dispatchChannelEvent: 'dispatchChannelEvent',
                shareWrapper: 'shareWrapper',
            }),
            shareCta(type) {
                this.shareWrapper({
                    type,
                    imageType: this.$route.query
                });
            },
            enableShareCta(type) {
                return this.uiOption(UI_OPTION_ENABLE_SHARE_CTA)[type];
            }
        }
    };
</script>

<style scoped>
    .share-container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 16vmin;
        width: 100%;
        position: absolute;
        bottom: 0%;
        padding: 0 20%;
        box-sizing: border-box;
        background-color: black;
    }
    .share-container > img {
        height: 8vmin;
        visibility: visible;
        cursor: pointer;
        user-select: none;
    }
</style>



// WEBPACK FOOTER //
// src/components/SharePopup.vue