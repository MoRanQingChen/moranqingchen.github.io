<template>
    <img v-bind:src="uiImage(CMS_BACK_ICON)"
        class="close_button"
        v-bind:style="backButtonCss"
        v-on:click="backToMainView">
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    import eventMessage from '../utils/eventMessage.js';
    import { getTrackingPageType } from '../utils/trackingHelpers.js';

    import { MODE_LIVE, MODE_PHOTO,
            VIEW_LIVE_DASHBOARD, VIEW_PHOTO_DASHBOARD,
            COMPONENT_BACK_BUTTON, CHANNEL_EVENT_TRACKING,
            TRACKING_TYPE_KEY, TRACKING_PAGE_TYPE_KEY, TRACKING_TYPE_CTA_BACK,
            CMS_BACK_ICON,
            UI_OPTION_BACK_BUTTON_CSS } from '../utils/constants.js';

    export default {
        name: COMPONENT_BACK_BUTTON,
        data() {
            return {
                CMS_BACK_ICON
            };
        },
        computed: {
            ...mapGetters({
                uiImage: 'uiImage',
                uiOption: 'uiOption',
                selectedMode: 'selectedMode'
            }),
            mainDashboardView() {
                if(this.selectedMode === MODE_LIVE) {
                    return VIEW_LIVE_DASHBOARD;
                } else if(this.selectedMode === MODE_PHOTO) {
                    return VIEW_PHOTO_DASHBOARD;
                }
            },
            backButtonCss() {
                return this.uiOption(UI_OPTION_BACK_BUTTON_CSS);
            },
        },
        methods: {
            ...mapActions({
                dispatchChannelEvent: 'dispatchChannelEvent'
            }),
            backToMainView() {
                const trackingData = {};
                trackingData[TRACKING_TYPE_KEY] = TRACKING_TYPE_CTA_BACK;
                trackingData[TRACKING_PAGE_TYPE_KEY] = getTrackingPageType(this.$route.name);

                this.dispatchChannelEvent({
                    message: new eventMessage(CHANNEL_EVENT_TRACKING, trackingData)
                });

                this.$router.replace(this.mainDashboardView);
            }
        }
    };
</script>

<style scoped>
    .close_button {
        width: 8vmin;
        position: absolute;
        top: 1px;
        left: 1px;
        cursor: pointer;
        user-select: none;
        /* box-shadow: 0 0 2px 0px rgba(0,0,0,0.2); */
    }
</style>



// WEBPACK FOOTER //
// src/components/TheBackButton.vue