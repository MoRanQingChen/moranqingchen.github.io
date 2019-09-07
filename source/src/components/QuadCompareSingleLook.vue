<template>
    <div>
        <div v-bind:id="currSingleLookId" class="look_info_names" v-bind:style="{ display : showLookName }">
            <span class="look_shade_prod" v-bind:style="quadProdShadeNameCss" v-html="lookInfoNames"></span>
        </div>
        <div v-bind:id="canvasInfo.containerId" class="single_look_container" v-bind:style="{ height : canvasContainerHeight }"></div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { singleLookMounted, singleLookIdWatcher, singleLookBeforeDestroy,
            positionPhoto, positionLive } from '../services/singleLook.js';
    import initLibModule from '../services/initLibModule.js';
    import { COMPONENT_SINGLE_LOOK, CATEGORY_LOOK,
            LOOK_INFO_LOOK_NAME, LOOK_INFO_PROD_NAME, LOOK_INFO_SHADE_NAME,
            UI_OPTION_QUAD_PROD_SHADE_NAME_COLOR, UI_OPTION_QUAD_REVERSE_ORDER, 
            UI_OPTION_QUAD_PROD_SHADE_NAME_CSS, CATEGORY_CUSTOMLOOK } from '../utils/constants.js';

    export default {
        name: COMPONENT_SINGLE_LOOK,
        mounted: singleLookMounted,
        beforeDestroy: singleLookBeforeDestroy,
        props: [
            'singleLookInd'
        ],
        computed: {
            ...mapGetters({
                lookHistory: 'lookHistory',
                getLookInfo: 'getLookInfo',
                language: 'language',
                category: 'category',
                uiOption: 'uiOption',
            }),
            lookInfoNames() {
                if(this.category === CATEGORY_LOOK) {
                    return this.currLookName;
                } else if(!this.currShadeName || !this.currProdName) {
                    // one of them is missing
                    return this.currShadeName || this.currProdName;
                } else {
                    return this.currShadeName + '<br>' + this.currProdName;
                }
            },
            canvasInfo() {
                return {
                    containerId: 'single_look_container_'+this.singleLookInd,
                    canvasId: 'single_look_canv_'+this.singleLookInd,
                    canvasClass: 'single_look_canv_'+this.singleLookInd,
                };
            },
            currLookId() {
                if(this.uiOption(UI_OPTION_QUAD_REVERSE_ORDER)) {
                    return this.lookHistory.slice(-4)[this.singleLookInd];
                } else {
                    return this.lookHistory.slice(-4).reverse()[this.singleLookInd];
                }
            },
            currLookInfo() {
                return this.getLookInfo(this.currLookId);
            },
            currSingleLookId() {
                return 'single_look_id_'+this.singleLookInd;
            },
            currLookName() {
                return (this.currLookInfo[LOOK_INFO_LOOK_NAME] || {})[this.language] || '';
            },
            currShadeName() {
                return this.currLookInfo[LOOK_INFO_SHADE_NAME] || '';
            },
            currProdName() {
                return this.currLookInfo[LOOK_INFO_PROD_NAME] || '';
            },
            quadProdShadeNameCss() {
                let quadProdShadeNameCssObj = this.uiOption(UI_OPTION_QUAD_PROD_SHADE_NAME_CSS);
                quadProdShadeNameCssObj.color = (this.uiOption(UI_OPTION_QUAD_PROD_SHADE_NAME_COLOR) || quadProdShadeNameCssObj.color);
                return quadProdShadeNameCssObj;
            },
            showLookName() {
                if(this.category === CATEGORY_CUSTOMLOOK) {
                    return 'none';
                } else {
                    return 'block';
                }
            },
            canvasContainerHeight() {
                if(this.category === CATEGORY_CUSTOMLOOK) {
                    return '100%';
                } else {
                    return '85%';
                }
            }
        },
        methods: {
            initLibModule,
            positionPhoto,
            positionLive,
        },
        watch: {
            'lookHistory.length': {
                handler: singleLookIdWatcher,
                deep: true,
            },
        },
    };
</script>

<style scoped>
    .single_look_container {
        width: 100%;
        overflow: hidden;
        user-select: none;
        position:relative;
    }
    .look_info_names {
        width: 100%;
        height: 15%;
        font-size: 2vmin;
        line-height: 1.5em;
        letter-spacing: 0.15em;
        text-align: center;
    }
    .look_shade_prod {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
        display: inline-block;
        color: black;
    }
</style>



// WEBPACK FOOTER //
// src/components/QuadCompareSingleLook.vue