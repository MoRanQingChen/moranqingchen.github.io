<template>
    <div class="cta-component"
        v-if="ctaEnabled"
        v-bind:style="ctaComponentCss"
    >
        <div v-on:click="clickCta(CTA_FAVORITE,true)" v-if="favoriteCtaEnabled && rightSide" v-bind:class="ctaButtonClass" v-bind:style="ctaButtonCss" v-bind:title="ctaAltTextEnabled ? uiText(FAVORITE_CTA_ALT_TEXT) : null">
            <img v-bind:src="favoriteState?uiImage(CMS_FAVORITE_ON_ICON):uiImage(CMS_FAVORITE_OFF_ICON)">
        </div>
        <div v-on:click="clickCta(CTA_ADJUST,true)" v-if="adjustCtaEnabled && rightSide" v-bind:class="ctaButtonClass" v-bind:style="ctaButtonCss" v-bind:title="ctaAltTextEnabled ? uiText(ADJUST_CTA_ALT_TEXT) : null">
            <img v-bind:src="uiImage(CMS_ADJUST_ICON)">
        </div>
        <div v-on:click="clickCta(CTA_BEFORE_AFTER,true)" v-if="beforeAfterCtaEnabled && rightSide" v-bind:class="ctaButtonClass" v-bind:style="ctaButtonCss" v-bind:title="ctaAltTextEnabled ? uiText(BEFORE_AFTER_CTA_ALT_TEXT) : null">
            <img v-bind:src="beforeafterState?uiImage(CMS_COMPARE_ON_ICON):uiImage(CMS_COMPARE_OFF_ICON)">
        </div>
        <div v-on:click="clickCta(CTA_QUAD_COMPARE,true)" v-if="quadCtaEnabled && rightSide" v-bind:class="ctaButtonClass" v-bind:style="ctaButtonCss" v-bind:title="ctaAltTextEnabled ? uiText(QUAD_COMPARE_CTA_ALT_TEXT) : null">
            <img v-bind:src="uiImage(CMS_QUAD_COMPARE_ICON)">
        </div>
        <div v-on:click="clickCta(CTA_UNDO,false)" v-if="undoCtaEnabled && rightSide" v-bind:class="ctaButtonClass" v-bind:style="ctaButtonCss" v-bind:title="ctaAltTextEnabled ? uiText(UNDO_CTA_ALT_TEXT) : null">
            <img v-bind:src="uiImage(CMS_UNDO_ICON)">
        </div>
        <div v-on:click="clickCta(CTA_SHARE,true)" v-if="shareCtaEnabled && rightSide" v-bind:class="ctaButtonClass" v-bind:style="ctaButtonCss" v-bind:title="ctaAltTextEnabled ? uiText(SHARE_CTA_ALT_TEXT) : null">
            <img v-bind:src="shareState?uiImage(CMS_SHARE_ON_ICON):uiImage(CMS_SHARE_OFF_ICON)">
        </div>
        <div v-on:click="clickCta(CTA_TUTORIAL_NEXT,false)" v-if="tutorialNextEnabled && rightSide" 
            class="cta_button" 
            v-bind:style="ctaButtonCss" v-bind:title="ctaAltTextEnabled ? uiText(TUTORIAL_NEXT_CTA_ALT_TEXT) : null">
            <img v-bind:src="uiImage(CMS_TUTORIAL_NEXT_ICON)">
        </div>
        
        <div v-on:click="clickCta(CTA_TUTORIAL_PREV,true)" v-if="tutorialPrevEnabled && leftSide" 
            class="cta_button" 
            v-bind:style="ctaButtonCss" v-bind:title="ctaAltTextEnabled ? uiText(TUTORIAL_PREV_CTA_ALT_TEXT) : null">
            <img v-bind:src="uiImage(CMS_TUTORIAL_PREV_ICON)">
        </div>

    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';
    import { MODULE_MAKEUP, MODULE_HAIR, MODULE_BROWSTYLE, MODE_LIVE, MODE_PHOTO, MODULE_TUTORIAL,
            VIEW_PHOTO_DASHBOARD, VIEW_LIVE_DASHBOARD, VIEW_ADJUST, VIEW_QUAD_COMPARE, VIEW_SHARE, VIEW_FAVORITE,
            COMPONENT_CTA_BUTTONS, EVENT_START_SHARE, EVENT_START_QUAD, EVENT_START_FAVORITE,
            CHANNEL_EVENT_UNDO, CHANNEL_EVENT_TRACKING,
            CTA_ADJUST, CTA_BEFORE_AFTER, CTA_QUAD_COMPARE, CTA_UNDO, CTA_SHARE, CTA_FAVORITE,
            TRACKING_TYPE_KEY, TRACKING_ACTION_TYPE_KEY, TRACKING_PAGE_TYPE_KEY, TRACKING_ADJUST_TYPE_KEY,
            CMS_ADJUST_ICON, CMS_COMPARE_ON_ICON, CMS_COMPARE_OFF_ICON, CMS_QUAD_COMPARE_ICON,
            CMS_UNDO_ICON, CMS_SHARE_ON_ICON, CMS_SHARE_OFF_ICON, CMS_FAVORITE_ON_ICON, CMS_FAVORITE_OFF_ICON,
            UI_OPTION_ICON_TYPE, UI_OPTION_ADJUST_CTA_ENABLED, UI_OPTION_QUAD_CTA_ENABLED,
            UI_OPTION_UNDO_CTA_ENABLED, UI_OPTION_FAVORITE_CTA_ENABLED, UI_OPTION_CTA_COMPONENT_CSS, 
            UI_OPTION_CTA_BUTTON_CSS,
            BEFORE_AFTER_CTA_ALT_TEXT, ADJUST_CTA_ALT_TEXT, QUAD_COMPARE_CTA_ALT_TEXT,
            UNDO_CTA_ALT_TEXT, SHARE_CTA_ALT_TEXT, FAVORITE_CTA_ALT_TEXT,
            UI_OPTION_CTA_ALT_TEXT_ENABLED, 
            ICON_TYPE_SMALL, ICON_TYPE_FULL,
            TUTORIAL_PREV_CTA_ALT_TEXT, TUTORIAL_NEXT_CTA_ALT_TEXT, 
            CTA_TUTORIAL_PREV, CTA_TUTORIAL_NEXT,
            CMS_TUTORIAL_PREV_ICON, CMS_TUTORIAL_NEXT_ICON,
            EVENT_TUTORIAL_NEXT, EVENT_TUTORIAL_PREV } from '../utils/constants.js';

    import eventMessage from '../utils/eventMessage.js';
    import merge from 'deepmerge';
    import { getCtaTrackingType, getCtaTrackingActionType, getTrackingPageType, getCtaTrackingAdjustType } from '../utils/trackingHelpers.js';

    export default {
        name: COMPONENT_CTA_BUTTONS,
        data() {
            return {
                FAVORITE_CTA_ALT_TEXT,
                BEFORE_AFTER_CTA_ALT_TEXT,
                ADJUST_CTA_ALT_TEXT,
                QUAD_COMPARE_CTA_ALT_TEXT,
                UNDO_CTA_ALT_TEXT,
                SHARE_CTA_ALT_TEXT,
                CTA_ADJUST,
                CTA_BEFORE_AFTER,
                CTA_QUAD_COMPARE,
                CTA_UNDO,
                CTA_SHARE,
                CTA_FAVORITE,
                CMS_ADJUST_ICON,
                CMS_COMPARE_ON_ICON,
                CMS_COMPARE_OFF_ICON,
                CMS_QUAD_COMPARE_ICON,
                CMS_UNDO_ICON,
                CMS_SHARE_ON_ICON,
                CMS_SHARE_OFF_ICON,
                CMS_FAVORITE_ON_ICON,
                CMS_FAVORITE_OFF_ICON,
                TUTORIAL_NEXT_CTA_ALT_TEXT, 
                CTA_TUTORIAL_NEXT,
                CMS_TUTORIAL_NEXT_ICON,
                TUTORIAL_PREV_CTA_ALT_TEXT, 
                CTA_TUTORIAL_PREV,
                CMS_TUTORIAL_PREV_ICON
            };
        },
        props: [
            'side'
        ],
        computed: {
            ...mapGetters({
                uiText: 'uiText',
                uiImage: 'uiImage',
                ctaState: 'ctaState',
                selectedMode: 'selectedMode',
                validLookId: 'validLookId',
                getAdjustStepsArr: 'getAdjustStepsArr',
                uiOption: 'uiOption',
                moduleMode: 'moduleMode',
                tutorialStep: 'tutorialStep',
                tutorialMaxStep: 'tutorialMaxStep',
                photoModuleCoordsPresetted: 'photoModuleCoordsPresetted',
            }),
            beforeafterState() {
                return this.ctaState===CTA_BEFORE_AFTER;
            },
            shareState() {
                return this.ctaState===CTA_SHARE;
            },
            favoriteState() {
                return this.ctaState===CTA_FAVORITE;
            },
            mainDashboardView() {
                if(this.selectedMode === MODE_LIVE) {
                    return VIEW_LIVE_DASHBOARD;
                } else if(this.selectedMode === MODE_PHOTO) {
                    return VIEW_PHOTO_DASHBOARD;
                }
            },
            ctaEnabled() {
                return this.validLookId;
            },
            adjustCtaEnabled() {
                return this.hideInQuadView && 
                    !this.photoModuleCoordsPresetted && (
                    this.moduleMode === MODULE_MAKEUP ||
                    this.moduleMode === MODULE_TUTORIAL ) &&
                    this.selectedMode === MODE_PHOTO &&
                    this.uiOption(UI_OPTION_ADJUST_CTA_ENABLED);
            },
            favoriteCtaEnabled() {
                return this.hideInQuadView &&
                    this.uiOption(UI_OPTION_FAVORITE_CTA_ENABLED);
            },
            ctaAltTextEnabled() {
                return this.uiOption(UI_OPTION_CTA_ALT_TEXT_ENABLED);
            },
            beforeAfterCtaEnabled() {
                return (this.hideInQuadView);
            },
            hideInQuadView() {
                return this.$route.name !== VIEW_QUAD_COMPARE && !this.isQuadShareView;
            },
            quadCtaEnabled() {
                return this.moduleMode !== MODULE_BROWSTYLE && 
                        this.moduleMode !== MODULE_TUTORIAL &&
                        this.hideInQuadView && 
                        this.uiOption(UI_OPTION_QUAD_CTA_ENABLED);
            },
            undoCtaEnabled() {
                return this.hideInQuadView && this.uiOption(UI_OPTION_UNDO_CTA_ENABLED);
            },
            tutorialCtaEnabled() {
                return this.moduleMode === MODULE_TUTORIAL;
            },
            tutorialPrevEnabled() {
                return (this.tutorialCtaEnabled && this.tutorialStep > 0);
            },
            tutorialNextEnabled() {
                return (this.tutorialCtaEnabled && this.tutorialStep < this.tutorialMaxStep);
            },
            rightSide() {
                return this.side === "RIGHT";
            },
            leftSide() {
                return this.side === "LEFT";
            },
            shareCtaEnabled() {
                if(this.tutorialCtaEnabled && this.tutorialNextEnabled) {
                    return false;
                } else {
                    return true;
                }
            },
            isQuadShareView() {
                return this.$route.name === VIEW_SHARE && this.$route.query.quad === true;
            },
            ctaButtonClass() {
                switch(this.uiOption(UI_OPTION_ICON_TYPE)) {
                    case ICON_TYPE_FULL:
                        return 'cta_button_full';
                    case ICON_TYPE_SMALL:
                    default:
                        return 'cta_button';
                }
            },
            ctaComponentCss() {
                if(this.rightSide) {
                    return merge( { 'right': '0%' }, this.uiOption(UI_OPTION_CTA_COMPONENT_CSS) );
                } else {
                    return merge( { 'left': '0%' }, this.uiOption(UI_OPTION_CTA_COMPONENT_CSS) );
                }
            },
            ctaButtonCss() {
                return this.uiOption(UI_OPTION_CTA_BUTTON_CSS);
            }
        },
        methods: {
            ...mapActions({
                setCtaState : 'setCtaState',
                setAdjustState : 'setAdjustState',
                dispatchChannelEvent: 'dispatchChannelEvent'
            }),
            clickCta(cta,toggle) {
                let trackingData = {};
                trackingData[TRACKING_TYPE_KEY] = getCtaTrackingType(cta);
                trackingData[TRACKING_PAGE_TYPE_KEY] = getTrackingPageType(this.$route.name);
                if(this.ctaState===cta && toggle) {
                    trackingData[TRACKING_ACTION_TYPE_KEY] = getCtaTrackingActionType(false);

                    this.setCtaState({
                        cta: null
                    });

                    if(this.isQuadShareView) {
                        this.$router.replace(VIEW_QUAD_COMPARE);
                    } else {
                        this.$router.replace(this.mainDashboardView);
                    }
                } else {
                    trackingData[TRACKING_ACTION_TYPE_KEY] = getCtaTrackingActionType(true);

                    switch (cta) {
                        case CTA_ADJUST:
                            trackingData[TRACKING_ADJUST_TYPE_KEY] = getCtaTrackingAdjustType(this.$store.getters.category, this.$store.getters.getAdjustFeaturesArr);
                            this.setAdjustState({
                                adjustState: this.getAdjustStepsArr[0]
                            });
                            this.$router.replace(VIEW_ADJUST);
                            break;
                        case CTA_SHARE:
                            this.$emit(EVENT_START_SHARE, VIEW_SHARE);
                            break;
                        case CTA_QUAD_COMPARE:
                            if(this.moduleMode === MODULE_HAIR && this.selectedMode === MODE_LIVE) {
                                this.$emit(EVENT_START_QUAD, VIEW_QUAD_COMPARE);
                            } else {
                                this.$router.replace(VIEW_QUAD_COMPARE);
                            }
                            break;
                        case CTA_UNDO:
                            // handle undo internally here
                            this.$store.dispatch({
                                type: 'undoLookHistory'
                            }).then(() => {
                                this.dispatchChannelEvent({
                                    message: new eventMessage(CHANNEL_EVENT_UNDO, {upc: this.$store.getters.selectedLookId})
                                });
                            }).catch(() => {});
                            break;
                        case CTA_FAVORITE:
                            this.$emit(EVENT_START_FAVORITE, VIEW_FAVORITE);
                            break;
                        case CTA_BEFORE_AFTER:
                            this.$router.replace({ path: this.mainDashboardView, query: { beforeAfter: true } });
                            break;
                        case CTA_TUTORIAL_NEXT:
                            this.$emit(EVENT_TUTORIAL_NEXT);
                            break;
                        case CTA_TUTORIAL_PREV:
                            this.$emit(EVENT_TUTORIAL_PREV);
                            break;
                        default:
                            this.$router.replace(this.mainDashboardView);
                            break;
                    }
                }
                this.dispatchChannelEvent({
                    message: new eventMessage(CHANNEL_EVENT_TRACKING, trackingData)
                });
            }
        }
    };
</script>

<style scoped>
    .cta-component {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        position: absolute;
        bottom: 0%;
        z-index: 100;
    }
    .cta_button {
        border-radius: 50%;
        background: white;
        box-shadow: 0 0 2px 0px rgba(0,0,0,0.2);
    }
    .cta_button, .cta_button_full {
        width: 10vmin;
        height: 10vmin;
        margin: 3vmin 3vmin 3vmin 3vmin;
        position: relative;
        cursor: pointer;
    }
    .cta_button > img {
        max-height: 40%;
        max-width: 60%;
    }
    .cta_button_full > img {
        max-width: 100%;
        max-height: 100%;
    }
    .cta_button > img, .cta_button_full > img {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        user-select: none;
    }
</style>



// WEBPACK FOOTER //
// src/components/TheCtaButtons.vue