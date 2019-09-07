<template>
    <div>
        <component v-bind:is="COMPONENT_SIM_PHOTO"
            v-bind:imageSrc="shareImageUriOrig"
            class="simulation_photo"></component>
        <component v-bind:is="COMPONENT_SHARE_POPUP"></component>
        <component v-bind:is="COMPONENT_CTA_BUTTONS"
            side="RIGHT"
            v-on="ctaCustomEvents"></component>
        <component v-bind:is="COMPONENT_CLOSE_BUTTON"></component>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import SimulationPhoto from '../components/TheSimulationPhoto.vue';
    import CloseButton from '../components/TheCloseButton.vue';
    import CtaButtons from '../components/TheCtaButtons.vue';
    import SharePopup from '../components/SharePopup.vue';
    import eventMessage from '../utils/eventMessage.js';
    import cropToBox from '../utils/cropToBox.js'
    import { VIEW_SHARE, VIEW_FAVORITE,
            COMPONENT_SIM_PHOTO, COMPONENT_CTA_BUTTONS,
            COMPONENT_CLOSE_BUTTON, COMPONENT_SHARE_POPUP,
            CHANNEL_EVENT_SEND_IMAGE_DATA, CHANNEL_EVENT_HIDE_SHARE_UI, CHANNEL_EVENT_DISPLAY_SHADE_OVERLAY,
            EVENT_START_SHARE, EVENT_START_FAVORITE,
            SEND_IMAGE_DATA_IMG_TYPE_SINGLE, SEND_IMAGE_DATA_IMG_TYPE_QUAD, 
            SEND_IMAGE_DATA_TAG_STAR, SEND_IMAGE_DATA_TAG_SHARE, 
            CTA_SHARE, CTA_FAVORITE, UI_OPTION_CLIENT_MANAGE_SHARING } from '../utils/constants.js';

    export default {
        name: VIEW_SHARE,   // this view is shared with VIEW_FAVORITE
        components: {
            SimulationPhoto,
            CtaButtons,
            CloseButton,
            SharePopup
        },
        data() {
            return {
                COMPONENT_SIM_PHOTO,
                COMPONENT_CTA_BUTTONS,
                COMPONENT_CLOSE_BUTTON,
                COMPONENT_SHARE_POPUP,
                ctaCustomEvents: {
                    [EVENT_START_SHARE]: this.switchView,
                    [EVENT_START_FAVORITE]: this.switchView,
                },
            };
        },
        computed: {
            ...mapGetters({
                shareImageUri: 'shareImageUri',
                shareImageUriOrig: 'shareImageUriOrig',
                uiOption: 'uiOption',
                selectedLookId: 'selectedLookId'
            }),
            eventTag() {
                return this.$route.name===VIEW_FAVORITE? SEND_IMAGE_DATA_TAG_STAR : SEND_IMAGE_DATA_TAG_SHARE;
            },
            ctaState() {
                return this.$route.name===VIEW_FAVORITE? CTA_FAVORITE:CTA_SHARE;
            },
            isQuadShareView() {
                return this.$route.name === VIEW_SHARE && this.$route.query.quad === true;
            },
        },
        methods: {
            ...mapActions({
                dispatchChannelEvent: 'dispatchChannelEvent',
                setCtaState: 'setCtaState',
            }),
            switchView(view) {
                this.$router.replace(view);
            },
        },
        beforeRouteEnter (to, from, next) {
            // do not have access to 'this', use callback of next() instead
            next( vm => {
                if(vm.ctaState == CTA_FAVORITE || vm.uiOption(UI_OPTION_CLIENT_MANAGE_SHARING)) {
                    cropToBox(vm.shareImageUri, 
                        {
                            targetWidth: 527,
                            targetHeight: 527
                        },
                        vm.$route.query.quad    
                    ).then((croppedImageUri) => {
                        if(vm.isQuadShareView) {
                            vm.dispatchChannelEvent({
                                message: new eventMessage(
                                    CHANNEL_EVENT_SEND_IMAGE_DATA, {
                                        img: croppedImageUri,
                                        imgType: SEND_IMAGE_DATA_IMG_TYPE_QUAD, 
                                        tag: vm.eventTag
                                    })
                            });
                        } else {
                            vm.dispatchChannelEvent({
                                message: new eventMessage(
                                    CHANNEL_EVENT_SEND_IMAGE_DATA, {
                                        img: croppedImageUri,
                                        imgType: SEND_IMAGE_DATA_IMG_TYPE_SINGLE,
                                        upc: vm.selectedLookId, 
                                        tag: vm.eventTag
                                    })
                            });
                        }
                    });
                }
                vm.setCtaState({
                    cta: vm.ctaState
                });
            });
        },
        beforeRouteLeave (to, from, next) {
            if(this.ctaState == CTA_FAVORITE || this.uiOption(UI_OPTION_CLIENT_MANAGE_SHARING)) {
                this.dispatchChannelEvent({
                    message: new eventMessage(CHANNEL_EVENT_HIDE_SHARE_UI)
                });
            }
            next();
        },
        mounted () {
            this.dispatchChannelEvent({
                message: new eventMessage(
                    CHANNEL_EVENT_DISPLAY_SHADE_OVERLAY, {
                        show: true,
                        showShade: false
                    })
            });
        }
    };
</script>

<style scoped>
    .simulation_photo {
        width: 100vw;
        height: 100vh;
    }
</style>



// WEBPACK FOOTER //
// src/views/ShareView.vue