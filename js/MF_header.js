!function(_) {
    function e(T) {
        if (E[T])
            return E[T].exports;
        var t = E[T] = {
            i: T,
            l: !1,
            exports: {}
        };
        return _[T].call(t.exports, t, t.exports, e),
        t.l = !0,
        t.exports
    }
    var E = {};
    e.m = _,
    e.c = E,
    e.d = function(_, E, T) {
        e.o(_, E) || Object.defineProperty(_, E, {
            configurable: !1,
            enumerable: !0,
            get: T
        })
    }
    ,
    e.n = function(_) {
        var E = _ && _.__esModule ? function() {
            return _.default
        }
        : function() {
            return _
        }
        ;
        return e.d(E, "a", E),
        E
    }
    ,
    e.o = function(_, e) {
        return Object.prototype.hasOwnProperty.call(_, e)
    }
    ,
    e.p = "",
    e(e.s = 1)
}([function(_, e, E) {
    "use strict";
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var T = (e.WEBPACK_CMS_LIBRARY_URL_DOMAIN = "192.168.100.7:8000",
    e.WEBPACK_CMS_API_ENV = "production",
    e.WEBPACK_CMS_API_PREFIX = "//modiface-cms.lorealchina.com/lorealcmsapi-linux/",
    e.WEBPACK_CMS_API_PREFIX_V2 = "//modiface-cms.lorealchina.com/index.php/api/v2/",
    e.WEBPACK_CMS_API_PREFIX_V3 = "///modiface-cms.lorealchina.com/index.php/api/v3/",
    e.WEBPACK_CMS_API_PREFIX_V3_1 = "//modiface-cms.lorealchina.com/index.php/api/v3.1/",
    e.WEBPACK_WEB_SERVICE_PREFIX = "//a0.modiface.com/lorealwebconsultation-web/api/prod/",
    e.WEBPACK_LASH_IMG_PREFIX = "https://8e1abe4449e8c8b52e67-803e13595e2f1638020d1ded4b94768a.ssl.cf2.rackcdn.com/cms/lash_image/",
    e.WEBPACK_TRACKER_LICENCE_KEY = "6F9A5FF037AE53A7AAB66CDF6FC1087CF8A5EA5F74DA098E81E0823BD5E76891347274A09C662B9D478575D08C69F2FFD514BADA9C4F755847D166EACB4E0621",
    e.MODULE_HAIR = "hair",
    e.MODULE_MAKEUP = "makeup",
    e.MODULE_BROWSTYLE = "browstyle",
    e.MODULE_TUTORIAL = "tutorial",
    e.MODE_PHOTO = "upload",
    e.MODE_LIVE = "live",
    e.VIEW_PHOTO_DASHBOARD = "photo-dashboard-view",
    e.VIEW_LIVE_DASHBOARD = "live-dashboard-view",
    e.VIEW_ADJUST = "adjust-view",
    e.VIEW_SHARE = "share-view",
    e.VIEW_FAVORITE = "favorite-view",
    e.VIEW_QUAD_COMPARE = "quad-compare-view",
    e.VIEW_APP_LOADING = "app-loading-view",
    e.COMPONENT_ADJUST_PANEL = "AdjustPanel",
    e.COMPONENT_ADJUST_PANEL_CTA = "AdjustPanelCta",
    e.COMPONENT_ADJUST_PANEL_INSTR = "AdjustPanelInstruction",
    e.COMPONENT_ADJUST_PANEL_PTS = "AdjustPanelPoints",
    e.COMPONENT_APP_LOAD = "AppLoading",
    e.COMPONENT_LIVE = "LiveComponent",
    e.COMPONENT_PHOTO = "PhotoComponent",
    e.COMPONENT_SINGLE_LOOK = "SingleLookComponent",
    e.COMPONENT_SHARE_POPUP = "SharePopup",
    e.COMPONENT_CAPTURE_OVERLAY = "TakePhotoOverlayComponent",
    e.COMPONENT_BACK_BUTTON = "BackButton",
    e.COMPONENT_CLOSE_BUTTON = "CloseButton",
    e.COMPONENT_CTA_BUTTONS = "CtaButtons",
    e.COMPONENT_SIM_PHOTO = "SimulationPhoto",
    e.COMPONENT_SLIDER = "SliderComponent",
    e.COMPONENT_DEFAULT_GIF_LOADER = "GifLoader",
    e.COMPONENT_IOS_DOWNLOAD_POPUP = "IosDownloadPopup",
    e.COMPONENT_CUSTOM_LOADER_LOREAL_PARIS_V3 = "LoaderLorealparisV3",
    e.EVENT_MOUTH_CHECKBOX = "mouthCheckboxChange",
    e.EVENT_SLIDE = "slide",
    e.EVENT_START_SHARE = "startShare",
    e.EVENT_START_QUAD = "startQuad",
    e.EVENT_START_FAVORITE = "startFavorite",
    e.EVENT_QUEUE_RENDER = "queueSingleLookRender",
    e.EVENT_REPORT_INFO = "reportSingleLookInfo",
    e.EVENT_TUTORIAL_NEXT = "tutorialNext",
    e.EVENT_TUTORIAL_PREV = "tutorialPrev",
    e.CHANNEL_EVENT_FRAME_READY = "frame_ready",
    e.CHANNEL_EVENT_UNDO = "undo",
    e.CHANNEL_EVENT_CHILD_EXIT = "exit",
    e.CHANNEL_EVENT_ERROR = "error",
    e.CHANNEL_EVENT_TRACKING = "event_tracking",
    e.CHANNEL_EVENT_SEND_IMAGE_DATA = "send_image_data",
    e.CHANNEL_EVENT_HIDE_SHARE_UI = "hide_client_share_ui",
    e.CHANNEL_EVENT_HAIR_COLOR = "hair_color_detected",
    e.CHANNEL_EVENT_DISPLAY_SHADE_OVERLAY = "display_shade_overlay",
    e.CHANNEL_EVENT_UI_DATA_LOADED = "ui_data_loaded",
    e.CHANNEL_EVENT_MODE_CHANGE = "mode_change",
    e.CHANNEL_EVENT_FRAME_PARAMS = "set_frame_params",
    e.CHANNEL_EVENT_UPC_CHANGE = "upc_change",
    e.CHANNEL_EVENT_LOOK_CHANGE = "look_id_change",
    e.CHANNEL_EVENT_CUSTOM_LOOK_CHANGE = "custom_look_change",
    e.CHANNEL_EVENT_PARENT_EXIT = "exit",
    e.CHANNEL_EVENT_TUTORIAL_LOADED = "tutorial_loaded",
    e.CHANNEL_EVENT_TUTORIAL_SET_STEP = "tutorial_set_step",
    e.CHANNEL_EVENT_SHOW_FOR_YOU_LOADER = "show_for_you_loader",
    e.UPC_CHANGE_EVENT_TYPE_HOVER = "hover",
    e.UPC_CHANGE_EVENT_TYPE_CLICK = "click",
    e.SEND_IMAGE_DATA_IMG_TYPE_SINGLE = "single",
    e.SEND_IMAGE_DATA_IMG_TYPE_QUAD = "quad",
    e.SEND_IMAGE_DATA_TAG_STAR = "star",
    e.SEND_IMAGE_DATA_TAG_SHARE = "share",
    e.CTA_BEFORE_AFTER = "cta_beforeafter",
    e.CTA_ADJUST = "cta_adjust",
    e.CTA_QUAD_COMPARE = "cta_quad_compare",
    e.CTA_UNDO = "cta_undo",
    e.CTA_SHARE = "cta_share",
    e.CTA_FAVORITE = "cta_favorite",
    e.CTA_TUTORIAL_NEXT = "cta_tutorial_next",
    e.CTA_TUTORIAL_PREV = "cta_tutorial_prev",
    e.FEATURE_LIPS = "lips",
    e.FEATURE_EYES = "eyes",
    e.FEATURE_BROWS = "brows",
    e.ADJUST_LIPS = "adjustTitleLips",
    e.ADJUST_LEFT_EYE = "adjustTitleLeftEye",
    e.ADJUST_RIGHT_EYE = "adjustTitleRightEye",
    e.ADJUST_LEFT_BROW = "adjustTitleLeftBrow",
    e.ADJUST_RIGHT_BROW = "adjustTitleRightBrow",
    e.ADJUST_MOUTH_OPEN = "adjustTextMouthOpened",
    e.ADJUST_MOUTH_CLOSE = "adjustTextMouthClosed",
    e.ADJUST_RESET = "adjustButtonResetDots",
    e.ADJUST_SAVE = "adjustButtonSave",
    e.ADJUST_CANCEL = "adjustButtonCancel",
    e.BEFORE_AFTER_CTA_ALT_TEXT = "beforeAfterAltText",
    e.ADJUST_CTA_ALT_TEXT = "adjustCtaAltText",
    e.QUAD_COMPARE_CTA_ALT_TEXT = "quadCompareCtaAltText",
    e.UNDO_CTA_ALT_TEXT = "undoCtaAltText",
    e.SHARE_CTA_ALT_TEXT = "shareCtaAltText",
    e.FAVORITE_CTA_ALT_TEXT = "favoriteCtaAltText",
    e.TUTORIAL_NEXT_CTA_ALT_TEXT = "tutorialNextCtaAltText",
    e.TUTORIAL_PREV_CTA_ALT_TEXT = "tutorialPrevCtaAltText",
    e.IOS_DOWNLOAD_POPUP_INST_TEXT = "iosDownloadPopupInstText",
    e.COORDS_FACEBOX = "facebox",
    e.COORDS_LEFT_EYE = "leye",
    e.COORDS_RIGHT_EYE = "reye",
    e.COORDS_LEFT_BROW = "lbrow",
    e.COORDS_RIGHT_BROW = "rbrow",
    e.COORDS_LEFT_BROW_EXTENDED = "lbrow_extended",
    e.COORDS_RIGHT_BROW_EXTENDED = "rbrow_extended",
    e.COORDS_INNER_LIP = "innerlip",
    e.COORDS_OUTER_LIP = "outerlip",
    e.COORDS_OUTER_LIP_EXTENDED = "outerlip_extended",
    e.COORDS_BOTH_LIPS = "bothlips",
    e.COORDS_MOUTH_OPEN = "mouthopen",
    e.COORDS_NOSE = "nose",
    e.LOOK_INFO_LOOK_NAME = "look_name",
    e.LOOK_INFO_PROD_NAME = "prod_name",
    e.LOOK_INFO_SHADE_NAME = "shade_name",
    e.LOOK_INFO_SHARE_URL = "share_url",
    e.LOOK_INFO_UPC_PARAMS = "upc_params",
    e.LOOK_STEP_CATEGORY = "category",
    e.LOOK_STEP_UPC = "upc",
    e.LOOK_STEP_COLOR_ID = "color_id",
    e.LOOK_STEP_PLACEMENT = "placement",
    e.LOOK_STEP_ANIMATION_ID = "animation_id",
    e.LOOK_STEP_MASK_IMAGE = "mask_image",
    e.LOOK_STEP_MASK_TIMESTAMP = "mask_timestamp",
    e.ERROR_DIMENSION = "large_dimension",
    e.ERROR_FILESIZE = "large_file",
    e.ERROR_FILETYPE = "incompatible_file",
    e.ERROR_NO_FACE = "no_face",
    e.ERROR_NO_HAIR = "no_hair",
    e.ERROR_WEBCAM = "webcam_unavailable",
    e.ERROR_UPC = "upc_unavailable",
    e.ERROR_LOOK = "look_unavailable",
    e.ERROR_CUSTOM_LOOK = "invalid_custom_look",
    e.ERROR_DETAIL_CUSTOM_LOOK_INVALID_PRODUCT = "invalid_product",
    e.ERROR_DETAIL_CUSTOM_LOOK_INVALID_PLACEMENT = "invalid_placement",
    e.ERROR_DETAIL_CUSTOM_LOOK_EMPTY_LOOK = "empty_look",
    e.ERROR_FACE_TOO_SMALL = "face_too_small",
    e.HAIRCOLOR_FAMILY_BLACK_DARK_BROWN = "Black / Dark Brown",
    e.HAIRCOLOR_FAMILY_LIGHT_BLONDE_LIGHT_GREY = "Light Blonde / Light Grey",
    e.HAIRCOLOR_FAMILY_COLORFUL_OTHER = "Colorful/Other",
    e.HAIRCOLOR_FAMILY_RED_ORANGEY_RED_AUBURN = "Red / Orangey Red / Auburn",
    e.HAIRCOLOR_FAMILY_BROWN = "Brown",
    e.HAIRCOLOR_FAMILY_BLONDE = "Blonde",
    e.CATEGORY_LOOK = "look",
    e.CATEGORY_PALETTE = "palette",
    e.CATEGORY_LIPCOLOR = "lipcolor",
    e.CATEGORY_FOUNDATION = "foundation",
    e.CATEGORY_EYESHADOW = "eyeshadow",
    e.CATEGORY_BLUSH = "blush",
    e.CATEGORY_HIGHLIGHT = "highlight",
    e.CATEGORY_CONTOUR = "contour",
    e.CATEGORY_CONCEALER = "concealer",
    e.CATEGORY_EYELINER = "eyeliner",
    e.CATEGORY_LIPLINER = "lipliner",
    e.CATEGORY_MASCARA = "mascara",
    e.CATEGORY_BROW = "brow",
    e.CATEGORY_HAIR = "haircolor",
    e.CATEGORY_CUSTOMLOOK = "customlook",
    e.CATEGORY_BROWSTYLE = "browstyle",
    e.CATEGORY_TUTORIAL = "tutorial",
    e.SHARE_BUTTON = "shareButton",
    e.SHARE_LABEL = "shareLabel",
    e.SHARE_COPY = "shareCopy",
    e.SHARE_TITLE = "title",
    e.SHARE_BODY = "body",
    e.SHARE_FILENAME = "fileName",
    e.SHARE_TEXT = "text",
    e.SHARE_APPEND_PROD_SHADE = "appendShadeName",
    e.SHARE_FACEBOOK = "facebook",
    e.SHARE_TWITTER = "twitter",
    e.SHARE_PINTEREST = "pinterest",
    e.SHARE_DOWNLOAD = "download",
    e.VIEW_LANDING = "landing-view",
    e.VIEW_ERROR_POPUP = "error-popup-view",
    e.COMPONENT_APP_TRYON = "AppTryon",
    e.TEXT_ERROR_MESSAGE = "errorMessage",
    e.TEXT_UPC_WARNING = "upcWarning",
    e.CMS_ADJUST_ICON = "adjustIcon",
    e.CMS_BACK_ICON = "backIcon",
    e.CMS_CLOSE_ICON = "closeIcon",
    e.CMS_CLOSE_ICON_BLACK = "closeIconBlack",
    e.CMS_COMPARE_ON_ICON = "compareOnIcon",
    e.CMS_COMPARE_OFF_ICON = "compareOffIcon",
    e.CMS_QUAD_COMPARE_ICON = "quadCompareIcon",
    e.CMS_UNDO_ICON = "undoIcon",
    e.CMS_SHARE_ON_ICON = "shareOnIcon",
    e.CMS_SHARE_OFF_ICON = "shareOffIcon",
    e.CMS_FAVORITE_ON_ICON = "favoriteOnIcon",
    e.CMS_FAVORITE_OFF_ICON = "favoriteOffIcon",
    e.CMS_ADJUST_RESET_ICON = "adjustResetIcon",
    e.CMS_ADJUST_SAVE_ICON = "adjustSaveIcon",
    e.CMS_SHARE_FACEBOOK_ICON = "shareFacebookIcon",
    e.CMS_SHARE_TWITTER_ICON = "shareTwitterIcon",
    e.CMS_SHARE_PINTEREST_ICON = "sharePinterestIcon",
    e.CMS_SHARE_DOWNLOAD_ICON = "shareDownloadIcon",
    e.CMS_TUTORIAL_PREV_ICON = "tutorialPrevIcon",
    e.CMS_TUTORIAL_NEXT_ICON = "tutorialNextIcon",
    e.CMS_SLIDER_KNOB = "sliderKnob",
    e.CMS_GIF_LOADER = "gifLoader",
    e.CMS_LOADER_BG_IMAGE = "loaderBgImage",
    e.CMS_LOGO_IMAGE = "shareBannerLogo",
    e.CMS_INTERMEDIATE_LANDING_CONTAINER_BG_IMAGE = "intermediateLandingContainerBgImage",
    e.CMS_INTERMEDIATE_LANDING_PRIVACY_POLICY_CHECKBOX_ON = "privacyPolicyCheckboxOn",
    e.CMS_INTERMEDIATE_LANDING_PRIVACY_POLICY_CHECKBOX_OFF = "privacyPolicyCheckboxOff",
    e.CMS_ADJUST_CANCEL_ICON = "adjustCancelIcon",
    e.UI_OPTION_CTA_ALT_TEXT_ENABLED = "ctaAltTextEnabled",
    e.UI_OPTION_ICON_TYPE = "iconType",
    e.UI_OPTION_FAVORITE_CTA_ENABLED = "favoriteCtaEnabled",
    e.UI_OPTION_ADJUST_CTA_ENABLED = "adjustCtaEnabled",
    e.UI_OPTION_QUAD_CTA_ENABLED = "quadCtaEnabled",
    e.UI_OPTION_UNDO_CTA_ENABLED = "undoCtaEnabled",
    e.UI_OPTION_COMPARE_SLIDER_BG_COLOR = "compareSliderBgColor",
    e.UI_OPTION_SHARE_CONTAINER_BG_COLOR = "shareContainerBgColor",
    e.UI_OPTION_LOADER_BG_IMAGE_ENABLED = "loaderBgImageEnabled",
    e.UI_OPTION_LOADER_BG_COLOR = "loaderBgColor",
    e.UI_OPTION_ADJUST_PANEL_GRADIENT_FROM_COLOR = "adjustInstructionGradientFromColor",
    e.UI_OPTION_ADJUST_PANEL_GRADIENT_TO_COLOR = "adjustInstructionGradientToColor",
    e.UI_OPTION_ADJUST_MASK_COLOR = "adjustMaskColor",
    e.UI_OPTION_ADJUST_CTA_TEXT_COLOR = "adjustCtaTextColor",
    e.UI_OPTION_QUAD_PROD_SHADE_NAME_COLOR = "quadProdShadeNameColor",
    e.UI_OPTION_QUAD_REVERSE_ORDER = "quadReverseLookOrder",
    e.UI_OPTION_QUAD_NUMBER = "quadNumberLooks",
    e.UI_OPTION_DISPLAY_ADJUST_ICON = "displayAdjustIcon",
    e.UI_OPTION_DISPLAY_ADJUST_CTA_BORDER = "displayAdjustCtaBorder",
    e.UI_OPTION_CLIENT_MANAGE_SHARING = "clientManageSharing",
    e.UI_OPTION_LOGO_BG_COLOR = "shareBannerBgColor",
    e.UI_OPTION_CAPTURE_COUNTDOWN = "shareCaptureCount",
    e.UI_OPTION_INTERMEDIATE_LANDING_BG_COLOR = "intermediateLandingBgColor",
    e.UI_OPTION_GLOBAL_FONT_SIZE = "globalFontSize",
    e.UI_OPTION_CLOSE_BUTTON_CSS = "closeButtonCss",
    e.UI_OPTION_CTA_COMPONENT_CSS = "ctaComponentCss",
    e.UI_OPTION_CTA_BUTTON_CSS = "ctaButtonCss",
    e.UI_OPTION_SHARE_CONTAINER_CSS = "shareContainerCss",
    e.UI_OPTION_SHARE_BUTTON_CSS = "shareButtonCss",
    e.UI_OPTION_COMPARE_SLIDER_CSS = "compareSliderCss",
    e.UI_OPTION_COMPARE_SLIDER_KNOB_CSS = "compareSliderKnobCss",
    e.UI_OPTION_CLOSE_CONTAINER_CSS = "closeContainerCss",
    e.UI_OPTION_CUSTOM_LOADER_COMPONENT = "customLoaderComponent",
    e.UI_OPTION_CUSTOM_LOADER_PARAMS = "customLoaderParams",
    e.UI_OPTION_QUAD_PROD_SHADE_NAME_CSS = "quadProdShadeNameCss",
    e.UI_OPTION_ENABLE_SHARE_CTA = "enableShareCta",
    e.UI_OPTION_BACK_BUTTON_CSS = "backButtonCss",
    e.UI_OPTION_SHARE_NO_UPLOAD = "shareNoUpload",
    e.UI_OPTION_INTENSITY_SLIDER_CSS = "intensitySliderBgCss",
    e.UI_OPTION_INTENSITY_SLIDER_BOB_CSS = "intensitySliderBobCss",
    e.UI_OPTION_INTENSITY_SLIDER_ENABLED = "intensitySliderEnabled",
    e.UI_OPTION_MODEL_TRYON_ENABLED = "modelTryonEnabled",
    e.UI_OPTION_RENDERED_LIVE_CONTAINER_CSS = "renderedLiveContainerCss",
    e.UI_OPTION_PHOTO_TRY_ON_ZOOM_RATIO = "photoTryOnZoomRatio",
    e.UI_OPTION_SHARE_TO_DOWNLOAD_DIRECTLY = "shareToDownloadDirectly",
    e.UI_OPTION_FORCE_OPEN_MOUTH = "forceOpenMouth",
    e.UI_OPTION_REJECT_SMALL_FACE = "rejectSmallFace",
    e.UI_OPTION_USE_SAME_ADJUST_CTA_STYLE = "useSameAdjustCtaStyle",
    e.UI_OPTION_ADJUST_CTA_CSS = "adjustCtaCss",
    e.UI_OPTION_IOS_DOWNLOAD_POPUP_USE_BLACK_THEME = "iosDownloadPopupCloseButtonUseBlackTheme",
    e.UI_OPTION_INTERMEDIATE_LANDING_CLOSE_BUTTON_USE_BLACK = "intermediateLandingCloseButtonUseBlack",
    e.UI_OPTION_INTERMEDIATE_LANDING_PAGE_CSS = "intermediateLandingPageCss",
    e.UI_OPTION_INTERMEDIATE_LANDING_TITLE_CSS = "intermediateLandingTitleCss",
    e.UI_OPTION_INTERMEDIATE_LANDING_SUBTITLE_CSS = "intermediateLandingSubtitleCss",
    e.UI_OPTION_INTERMEDIATE_LANDING_LIVE_BUTTON_CSS = "intermediateLandingLiveButtonCss",
    e.UI_OPTION_INTERMEDIATE_LANDING_LIVE_ICON_CSS = "intermediateLandingLiveIconCss",
    e.UI_OPTION_INTERMEDIATE_LANDING_LIVE_TEXT_CSS = "intermediateLandingLiveTextCss",
    e.UI_OPTION_INTERMEDIATE_LANDING_PHOTO_BUTTON_CSS = "intermediateLandingPhotoButtonCss",
    e.UI_OPTION_INTERMEDIATE_LANDING_PHOTO_ICON_CSS = "intermediateLandingPhotoIconCss",
    e.UI_OPTION_INTERMEDIATE_LANDING_PHOTO_TEXT_CSS = "intermediateLandingPhotoTextCss",
    e.UI_OPTION_INTERMEDIATE_LANDING_CLOSE_BUTTON_CSS = "intermediateLandingCloseButtonCss",
    e.UI_OPTION_INTERMEDIATE_LANDING_CONTAINER_BG_IMAGE_ENABLED = "intermediateLandingContainerBgImageEnabled",
    e.UI_OPTION_INTERMEDIATE_LANDING_PRIVACY_POLICY_ENABLED = "intermediateLandingPrivacyPolicyEnabled",
    e.UI_OPTION_INTERMEDIATE_ERROR_PAGE_CSS = "intermediateErrorPageCss",
    e.UI_OPTION_INTERMEDIATE_ERROR_TITLE_CSS = "intermediateErrorTitleCss",
    e.UI_OPTION_INTERMEDIATE_ERROR_SUBTITLE_CSS = "intermediateErrorSubtitleCss",
    e.UI_OPTION_INTERMEDIATE_ERROR_LIVE_BUTTON_CSS = "intermediateErrorLiveButtonCss",
    e.UI_OPTION_INTERMEDIATE_ERROR_LIVE_ICON_CSS = "intermediateErrorLiveIconCss",
    e.UI_OPTION_INTERMEDIATE_ERROR_LIVE_TEXT_CSS = "intermediateErrorLiveTextCss",
    e.UI_OPTION_INTERMEDIATE_ERROR_PHOTO_BUTTON_CSS = "intermediateErrorPhotoButtonCss",
    e.UI_OPTION_INTERMEDIATE_ERROR_PHOTO_ICON_CSS = "intermediateErrorPhotoIconCss",
    e.UI_OPTION_INTERMEDIATE_ERROR_PHOTO_TEXT_CSS = "intermediateErrorPhotoTextCss",
    e.UI_OPTION_INTERMEDIATE_LANDING_CONTAINER_CSS = "intermediateLandingContainerCss",
    e.ICON_TYPE_SMALL = "small",
    e.ICON_TYPE_FULL = "full",
    e.TRACKING_TYPE_KEY = "trackingType",
    e.TRACKING_ACTION_TYPE_KEY = "actionType",
    e.TRACKING_PAGE_TYPE_KEY = "pageType",
    e.TRACKING_SOCIAL_NETWORK_KEY = "socialNetwork",
    e.TRACKING_SOCIAL_ACTION_KEY = "socialAction",
    e.TRACKING_SOCIAL_TARGET_KEY = "socialTarget",
    e.TRACKING_SHARE_IMAGE_TYPE_KEY = "shareImageType",
    e.TRACKING_ERROR_TYPE_KEY = "errorType",
    e.TRACKING_ADJUST_TYPE_KEY = "adjustType",
    e.TRACKING_LOOK_NAME_KEY = "lookName",
    e.TRACKING_LOOK_TYPE_KEY = "lookType",
    e.TRACKING_TYPE_CTA_ADJUST = "adjustCta",
    e.TRACKING_TYPE_CTA_SHARE = "shareCta",
    e.TRACKING_TYPE_CTA_QUAD_COMPARE = "quadCta",
    e.TRACKING_TYPE_CTA_UNDO = "undoCta",
    e.TRACKING_TYPE_CTA_BEFORE_AFTER = "compareCta",
    e.TRACKING_TYPE_CTA_ADD_TO_FAVORITES = "addToFavoritesCta",
    e.TRACKING_TYPE_CTA_BACK = "backCta",
    e.TRACKING_TYPE_CTA_ADJUST_RESET = "adjustResetDotsCta",
    e.TRACKING_TYPE_CTA_ADJUST_CONTINUE = "adjustContinueCta",
    e.TRACKING_TYPE_CTA_ADJUST_SAVE = "adjustSaveCta",
    e.TRACKING_TYPE_SHARE_SOCIAL_NETWORK = "shareTo",
    e.TRACKING_TYPE_SHARE_DOWNLOAD = "shareDownload",
    e.TRACKING_TYPE_CTA_LIVE_CAMERA = "liveCameraCta",
    e.TRACKING_TYPE_CTA_UPLOAD_PHOTO = "uploadPhotoCta",
    e.TRACKING_TYPE_CTA_CLOSE_ERROR = "closeErrorCta",
    e.TRACKING_TYPE_PARENT_LIVE_CAMERA = "liveCameraParent",
    e.TRACKING_TYPE_PARENT_UPLOAD_PHOTO = "uploadPhotoParent",
    e.TRACKING_TYPE_ERROR_EVENT = "errorEvent",
    e.TRACKING_TYPE_CTA_EXIT = "exitCta",
    e.TRACKING_TYPE_LOOK_SELECT_LOOK = "selectLook",
    e.TRACKING_TYPE_LOOK_SELECT_LOOK_TYPE = "selectLookType",
    e.TRACKING_ACTION_TYPE_OPEN = "open",
    e.TRACKING_ACTION_TYPE_CLOSE = "close",
    e.TRACKING_ERROR_TYPE_ERROR_DIMENSION = "errorLargeImage")
      , t = e.TRACKING_ERROR_TYPE_ERROR_FILESIZE = "errorLargeFile"
      , a = e.TRACKING_ERROR_TYPE_ERROR_FILETYPE = "errorImageType"
      , A = e.TRACKING_ERROR_TYPE_ERROR_NO_FACE = "errorNoFace"
      , r = e.TRACKING_ERROR_TYPE_ERROR_NO_HAIR = "errorNoHair"
      , O = e.TRACKING_ERROR_TYPE_ERROR_WEBCAM = "errorNoCamera"
      , o = e.TRACKING_ERROR_TYPE_ERROR_UPC = "errorShadeUnavailable"
      , R = e.TRACKING_ERROR_TYPE_ERROR_LOOK = "errorLookUnavailable"
      , N = e.TRACKING_ERROR_TYPE_ERROR_FACE_TOO_SMALL = "errorFaceTooSmall";
    e.TRACKING_PAGE_TYPE_VIEW_PHOTO_DASHBOARD = "main",
    e.TRACKING_PAGE_TYPE_VIEW_LIVE_DASHBOARD = "main",
    e.TRACKING_PAGE_TYPE_VIEW_ADJUST = "adjust",
    e.TRACKING_PAGE_TYPE_VIEW_SHARED = "share",
    e.TRACKING_PAGE_TYPE_VIEW_QUAD_COMPARED = "quad",
    e.TRACKING_PAGE_TYPE_VIEW_INTERMEDIATE_LANDING = "tryItOn",
    e.TRACKING_PAGE_TYPE_VIEW_INTERMEDIATE_ERROR_DIMENSION = T,
    e.TRACKING_PAGE_TYPE_VIEW_INTERMEDIATE_ERROR_FILESIZE = t,
    e.TRACKING_PAGE_TYPE_VIEW_INTERMEDIATE_ERROR_FILETYPE = a,
    e.TRACKING_PAGE_TYPE_VIEW_INTERMEDIATE_ERROR_NO_FACE = A,
    e.TRACKING_PAGE_TYPE_VIEW_INTERMEDIATE_ERROR_NO_HAIR = r,
    e.TRACKING_PAGE_TYPE_VIEW_INTERMEDIATE_ERROR_WEBCAM = O,
    e.TRACKING_PAGE_TYPE_VIEW_INTERMEDIATE_ERROR_UPC = o,
    e.TRACKING_PAGE_TYPE_VIEW_INTERMEDIATE_ERROR_LOOK = R,
    e.TRACKING_PAGE_TYPE_VIEW_INTERMEDIATE_ERROR_FACE_TOO_SMALL = N,
    e.TRACKING_SOCIAL_NETWORK_FACEBOOK = "Facebook",
    e.TRACKING_SOCIAL_NETWORK_TWITTER = "Twitter",
    e.TRACKING_SOCIAL_NETWORK_PINTEREST = "Pinterest",
    e.TRACKING_SOCIAL_ACTION_DEFAULT = "share",
    e.TRACKING_SOCIAL_ACTION_SHARE = "Share",
    e.TRACKING_SOCIAL_ACTION_TWEET = "Tweet",
    e.TRACKING_SHARE_IMAGE_TYPE_QUAD = "quad",
    e.TRACKING_SHARE_IMAGE_TYPE_SINGLE = "single",
    e.TRACKING_TYPE_UNKNOWN = "unknown",
    e.TRACKING_ACTION_TYPE_UNKNOWN = "unknown",
    e.TRACKING_PAGE_TYPE_UNKNOWN = "unknown",
    e.TRACKING_ERROR_TYPE_UNKNOWN = "unknown",
    e.TRACKING_SOCIAL_NETWORK_UNKNOWN = "unknown",
    e.TRACKING_TYPE_HAIR_COLOR_DETECTED = "hairColorDetected",
    e.TRACKING_HAIR_COLOR_FAMILY = "colorFamily"
}
, function(_, e, E) {
    "use strict";
    function T(_) {
        return _ && _.__esModule ? _ : {
            default: _
        }
    }
    var t = E(2)
      , a = T(t)
      , A = E(4)
      , r = T(A)
      , O = E(0);
    window.MF_CHANNEL_PARENT = {
        rm_callback: null,
        iframe_url_protocol: "https:",
        iframe_url_domain: "192.168.100.7:8000",
        iframe_url_path: "/release/",
        sdkEnvironment: "production",
        sdkVersion: "0.14.0",
        useStandardTaggingPlan: !1,
        dataLayerName: "dataLayer",
        iframeCategory: "",
        events: {},
        preprocessEvents: {},
        send: function(_, e) {
            return MF_CHANNEL_PARENT.postMessage(_, e)
        },
        postMessage: function(_, e) {
            var E = MF_CHANNEL_PARENT.getFrameIdByName(e);
            if (-1 != E) {
                var T = MF_CHANNEL_PARENT.iframeArray[E].frame.contentWindow;
                T && T.postMessage(_, location.href)
            }
        },
        getFrameIdByName: function(_) {
            for (var e = 0; e < MF_CHANNEL_PARENT.iframeArray.length; e += 1) {
                if (MF_CHANNEL_PARENT.iframeArray[e].frameName == _)
                    return e
            }
            return -1
        },
        receiveMessage: function(_, e, E) {
            _ && (this.rm_callback && this.receiveMessage(),
            this.rm_callback = function(E) {
                //临时
                if ("string" == typeof e && E.origin !== e )
                    return !1;
                _(E)
            }
            ),
            window[_ ? "addEventListener" : "removeEventListener"]("message", MF_CHANNEL_PARENT.rm_callback, !1)
        },
        listen: function(_, e) {
            MF_CHANNEL_PARENT.events[_] = e
        },
        preprocessChildEvent: function(_, e) {
            _ in this.preprocessEvents && "function" == typeof this.preprocessEvents[_] && this.preprocessEvents[_](e)
        },
        fireEvent: function(_, e) {
            this.preprocessChildEvent(_, e),
            this.events[_] && "function" == typeof this.events[_] && this.events[_](e)
        },
        parseMessage: function(_) {
            _ = _.data,
            this.fireEvent(_.event, _.data)
        },
        checkOrigin: function(_) {
            //本地验证
            // if (new RegExp(/localhost(:|$)+/).test(_))
                return !0;
            // switch (_) {
            // case "https://a0.modiface.com":
            // case "http://a0dev.modiface.com":
            // case "http://mfefacetracker-dev.modiface.com":
            // case "https://mfefacetracker-dev.modiface.com":
            // case "http://ecommerce.modiface.com":
            // case "https://ecommerce.modiface.com":
            // case "http://loreal-webconsultation-dev.modiface.com":
            // case "https://loreal-webconsultation-dev.modiface.com":
            // case "http://loreal-webconsultation.modiface.com":
            // case "https://loreal-webconsultation.modiface.com":
            // case "http://loreal-webconsultation-eu.modiface.com":
            // case "https://loreal-webconsultation-eu.modiface.com":
            // case "http://192.168.100.7:8000":
            // case "http://192.168.100.7:8000":
            // case "https://modiface-vto-dev.lorealchina.com":
            // case "http://modiface-vto-dev.lorealchina.com":
            //     return !0;
            // default:
            //     return !1
            // }
        },
        init: function() {
            this.detectDevice()
        },
        getIframePath: function() {
            return this.iframe_url_protocol + "//" + this.iframe_url_domain + this.iframe_url_path
        },
        getIframeUrl: function(_) {
            var e = this.getIframePath();
            return e += "/" == e.substr(e.length - 1) ? "" : "/",
            "staging" == this.sdkEnvironment || "production" == this.sdkEnvironment ? void 0 !== _ && "" != _ ? (_ != this.sdkVersion && console.log("[Warning] MF_header.js: supplied sdkVersion (" + _ + ") does not match with version of MF_header.js (" + this.sdkVersion + "). It's recommended to use matching sdkVersion as MF_header.js version"),
            e += _ + "/") : e += this.sdkVersion + "/" : void 0 !== _ && "" != _ && console.log("[Warning] MF_header.js: supplied sdkVersion will be ignored since current environment is " + this.sdkEnvironment),
            e + "index.html"
        },
        addFrame: function(_) {
            var e = _.frameName
              , E = document.getElementById(_.divId)
              , T = MF_CHANNEL_PARENT.getFrameIdByName(e);
            if (T > -1)
                var t = MF_CHANNEL_PARENT.iframeArray[T].frame;
            else
                var t = document.createElement("iframe");
            t.setAttribute("scrolling", "no"),
            t.setAttribute("allowtransparency", "true"),
            t.setAttribute("allowusermedia", "true"),
            t.setAttribute("allow", "camera"),
            "frameAttributes"in _ ? ("frameborder"in _.frameAttributes && t.setAttribute("frameborder", _.frameAttributes.frameborder),
            "title"in _.frameAttributes && t.setAttribute("title", _.frameAttributes.title)) : t.setAttribute("frameborder", "0"),
            void 0 === e ? e = "" : t.setAttribute("id", e),
            t.style.zIndex = "zIndex"in _ ? _.zIndex : "",
            t.style.position = "relative",
            t.style.width = "100%",
            t.style.height = "100%",
            "category"in _ && (MF_CHANNEL_PARENT.toolCategory = _.category),
            void 0 === _.shareUrl && (_.shareUrl = document.location.href),
            void 0 !== _.useStandardTaggingPlan && (MF_CHANNEL_PARENT.useStandardTaggingPlan = _.useStandardTaggingPlan),
            MF_CHANNEL_PARENT.useStandardTaggingPlan && (void 0 !== _.dataLayerName && (MF_CHANNEL_PARENT.dataLayerName = _.dataLayerName),
            MF_CHANNEL_PARENT.preprocessEvents.event_tracking = a.default);
            // var A = MF_CHANNEL_PARENT.getIframeUrl(_.sdkVersion);
            var A='./com';
            A += "?scache=" + Math.random(),
            A += "&host=" + encodeURIComponent(document.location.host),
            A += "&protocol=" + encodeURIComponent(document.location.protocol),
            A += _.publisherId ? "&publisherId=" + encodeURIComponent(_.publisherId) : "",
            A += "&category=" + _.category,
            t.onload = function() {
                MF_CHANNEL_PARENT.postMessage({
                    event: "set_frame_params",
                    data: _
                }, _.frameName)
            }
            ,
            t.setAttribute("src", A),
            console.log(A);
            try {
                E.appendChild(t),
                -1 == T && MF_CHANNEL_PARENT.iframeArray.push({
                    frame: t,
                    ready: 0,
                    node: E,
                    frameName: e,
                    category: _.category,
                    pending_message: []
                })
            } catch (_) {}
        },
        removeFrame: function(_) {
            var e = _.frameName
              , E = MF_CHANNEL_PARENT.getFrameIdByName(e);
            if (-1 == E)
                return void console.log(e + " cannot be found.");
            var T = MF_CHANNEL_PARENT.iframeArray[E].frame;
            try {
                T.parentNode.removeChild(T),
                MF_CHANNEL_PARENT.iframeArray.splice(E, 1)
            } catch (_) {}
        },
        addEvent: function(_, e, E) {
            null != _ && void 0 !== _ && (_.addEventListener ? _.addEventListener(e, E) : _.attachEvent ? _.attachEvent("on" + e, E) : _["on" + e] = E)
        },
        detectDevice: function() {
            var _ = navigator.userAgent.toLowerCase();
            -1 != _.indexOf("iphone") || -1 != _.indexOf("ipod") ? this.deviceMode = "mobile" : -1 != _.indexOf("ipad") ? this.deviceMode = "tablet" : -1 != _.indexOf("android") ? -1 != _.indexOf("mobile") ? this.deviceMode = "mobile" : this.deviceMode = "tablet" : -1 != _.indexOf("windows phone") || -1 != _.indexOf("iemobile") ? this.deviceMode = "mobile" : -1 != _.indexOf("blackberry") ? this.deviceMode = "mobile" : -1 != _.indexOf("opera mini") ? this.deviceMode = "mobile" : this.deviceMode = "desktop"
        },
        setTestMode: function(_, e, E) {
            void 0 !== _ && (MF_CHANNEL_PARENT.iframe_url_domain = _),
            void 0 !== e && (MF_CHANNEL_PARENT.iframe_url_path = e),
            void 0 !== E && (MF_CHANNEL_PARENT.iframe_url_protocol = E)
        },
        getModelImg: function(_, e, E, T) {
            var t = this;
            return new Promise(function(a, A) {
                if (void 0 === T && A("undefined publisherId"),
                "" === T && A("empty publisherId"),
                "382b58aaa1aa08c5790bb22d39b51765" === T)
                    return void A("model image not available");
                if (void 0 === _ && A("undefined modelId"),
                void 0 === e && A("undefined upc"),
                (void 0 === E || "large" !== E && "medium" !== E && "small" !== E && "tiny" !== E) && (E = "large"),
                "staging" == t.sdkEnvironment || "production" == t.sdkEnvironment)
                    if ("http" === document.location.protocol)
                        var r = "http://84aab60653861d654e06-803e13595e2f1638020d1ded4b94768a.r62.cf2.rackcdn.com";
                    else
                        var r = "https://8e1abe4449e8c8b52e67-803e13595e2f1638020d1ded4b94768a.ssl.cf2.rackcdn.com";
                else
                    var r = "http://www40.modiface.com/loreal-webconsultation/modelImg";
                var O = r + "/" + T + "/mfmodel";
                O += "-" + _,
                O += "-" + e;
                var o = O + "-small.jpg"
                  , R = O + "-tiny.jpg"
                  , N = O + "-" + E + ".jpg"
                  , n = document.createElement("img");
                n.onload = function() {
                    a(N)
                }
                ,
                n.onerror = function() {
                    var _ = document.createElement("img");
                    _.onload = function() {
                        a(N)
                    }
                    ,
                    _.onerror = function() {
                        A("model image not available")
                    }
                    ,
                    _.src = R
                }
                ,
                n.src = o
            }
            )
        },
        getLooks: function(_, e, E) {
            return new Promise(function(T, t) {
                void 0 === _ && t("undefined publisherId"),
                "" === _ && t("empty publisherId"),
                void 0 === e && (e = ""),
                void 0 === E && (E = ""),
                (0,
                r.default)({
                    url: O.WEBPACK_CMS_API_PREFIX_V2 + "look/getLooksSimple",
                    method: "POST",
                    data: {
                        cmsEnvironment: O.WEBPACK_CMS_API_ENV,
                        platform: "web",
                        brandHashId: _,
                        countryCode: e,
                        language: E,
                        service: "web"
                    }
                }).then(function(_) {
                    var e = JSON.parse(_);
                    "status"in e ? "success" == e.status && "data"in e ? T(e.data) : t("error" == e.status ? "parsing error" : "status error") : t("status error")
                }, function() {
                    t("request error")
                })
            }
            )
        },
        standardEventTracker: function(_) {
            MF_CHANNEL_PARENT.useStandardTaggingPlan && (0,
            a.default)(_)
        },
        deviceMode: "desktop",
        iframeArray: [],
        publisherid: "",
        modelupc: []
    },
    MF_CHANNEL_PARENT.addEvent(window, "load", function() {
        MF_CHANNEL_PARENT.init()
    }),
    MF_CHANNEL_PARENT.receiveMessage(MF_CHANNEL_PARENT.parseMessage.bind(MF_CHANNEL_PARENT), MF_CHANNEL_PARENT.checkOrigin),
    console.log("Modiface Web Consultation\nenvironment: production\nMF_header.js version: 0.14.0"),
    "function" == typeof window.initModiface ? window.initModiface() : console.log("Warning (MF_header.js): Please define window.initModiface function for asynchronous loading of MF_header.js")
}
, function(_, e, E) {
    "use strict";
    function T(_) {
        var e = "dataLayer";
        "" !== MF_CHANNEL_PARENT.dataLayerName && (e = MF_CHANNEL_PARENT.dataLayerName),
        window[e] = window[e] || [],
        window[e].push(_)
    }
    function t() {
        if ("" === MF_CHANNEL_PARENT.toolCategory)
            return "make-up";
        switch (MF_CHANNEL_PARENT.toolCategory) {
        case "haircolor":
            return "hair-color";
        case "nails":
            return "nails";
        default:
            return "make-up"
        }
    }
    function a(_, e) {
        T({
            event: "uaevent",
            ecommerce: "undefined",
            eventCategory: "virtual try on::modiface::" + t(),
            eventAction: _,
            eventLabel: e
        })
    }
    function A(_, e, E) {
        T({
            event: "socialInt",
            ecommerce: "undefined",
            socialNetwork: _,
            socialAction: e,
            socialTarget: E
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.default = function(_) {
        switch (_[r.TRACKING_TYPE_KEY]) {
        case r.TRACKING_TYPE_CTA_ADJUST:
            a("select", "center makeup on::" + _[r.TRACKING_ADJUST_TYPE_KEY]);
            break;
        case r.TRACKING_TYPE_CTA_SHARE:
            a("select", "social share");
            break;
        case r.TRACKING_TYPE_CTA_QUAD_COMPARE:
            a("select", "show tiles");
            break;
        case r.TRACKING_TYPE_CTA_UNDO:
            a("select", "undo");
            break;
        case r.TRACKING_TYPE_CTA_BEFORE_AFTER:
            a("select", "makeup slider");
            break;
        case r.TRACKING_TYPE_CTA_ADD_TO_FAVORITES:
            a("select", "add to favorites");
            break;
        case r.TRACKING_TYPE_CTA_ADJUST_RESET:
            a("select", "reset dots");
            break;
        case r.TRACKING_TYPE_CTA_ADJUST_CONTINUE:
        case r.TRACKING_TYPE_CTA_ADJUST_SAVE:
            a("select", "save dots");
            break;
        case r.TRACKING_TYPE_SHARE_SOCIAL_NETWORK:
            A(_[r.TRACKING_SOCIAL_NETWORK_KEY], (0,
            O.getSocialActionPerSocialNetwork)(_[r.TRACKING_SOCIAL_NETWORK_KEY]), _[r.TRACKING_SOCIAL_TARGET_KEY]);
            break;
        case r.TRACKING_TYPE_SHARE_DOWNLOAD:
            a("download", "your photo");
            break;
        case r.TRACKING_TYPE_CTA_CLOSE_ERROR:
            a("error", "close");
            break;
        case r.TRACKING_TYPE_PARENT_LIVE_CAMERA:
            a("live camera", "take a photo");
            break;
        case r.TRACKING_TYPE_PARENT_UPLOAD_PHOTO:
            a("select", "upload a photo");
            break;
        case r.TRACKING_TYPE_ERROR_EVENT:
            a("error", _[r.TRACKING_ERROR_TYPE_KEY]);
            break;
        case r.TRACKING_TYPE_CTA_EXIT:
            a("exit", "exit");
            break;
        case r.TRACKING_TYPE_LOOK_SELECT_LOOK:
            a("select::individual look", _[r.TRACKING_LOOK_NAME_KEY]);
            break;
        case r.TRACKING_TYPE_LOOK_SELECT_LOOK_TYPE:
            a("select::dropdown::look type", _[r.TRACKING_LOOK_TYPE_KEY]);
            break;
        case r.TRACKING_TYPE_HAIR_COLOR_DETECTED:
            a("hair color detected", _[r.TRACKING_HAIR_COLOR_FAMILY]);
            break;
        case r.TRACKING_TYPE_CTA_LIVE_CAMERA:
            a("select", "live camera");
            break;
        case r.TRACKING_TYPE_CTA_UPLOAD_PHOTO:
            a("select", "upload a photo");
            break;
        case r.TRACKING_TYPE_CTA_BACK:
        default:
            return
        }
    }
    ;
    var r = E(0)
      , O = E(3)
}
, function(_, e, E) {
    "use strict";
    function T(_) {
        switch (_) {
        case s.CTA_ADJUST:
            return s.TRACKING_TYPE_CTA_ADJUST;
        case s.CTA_SHARE:
            return s.TRACKING_TYPE_CTA_SHARE;
        case s.CTA_QUAD_COMPARE:
            return s.TRACKING_TYPE_CTA_QUAD_COMPARE;
        case s.CTA_UNDO:
            return s.TRACKING_TYPE_CTA_UNDO;
        case s.CTA_BEFORE_AFTER:
            return s.TRACKING_TYPE_CTA_BEFORE_AFTER;
        case s.CTA_FAVORITE:
            return s.TRACKING_TYPE_CTA_ADD_TO_FAVORITES;
        default:
            return s.TRACKING_TYPE_UNKNOWN
        }
    }
    function t(_) {
        switch (_) {
        case !0:
            return s.TRACKING_ACTION_TYPE_OPEN;
        case !1:
            return s.TRACKING_ACTION_TYPE_CLOSE;
        default:
            return s.TRACKING_ACTION_TYPE_UNKNOWN
        }
    }
    function a(_, e) {
        for (var E = _.toLowerCase(), T = 0; T < e.length; T++)
            E += "::" + e[T].toLowerCase();
        return E
    }
    function A(_) {
        switch (_) {
        case s.VIEW_PHOTO_DASHBOARD:
            return s.TRACKING_PAGE_TYPE_VIEW_PHOTO_DASHBOARD;
        case s.VIEW_LIVE_DASHBOARD:
            return s.TRACKING_PAGE_TYPE_VIEW_LIVE_DASHBOARD;
        case s.VIEW_ADJUST:
            return s.TRACKING_PAGE_TYPE_VIEW_ADJUST;
        case s.VIEW_SHARE:
            return s.TRACKING_PAGE_TYPE_VIEW_SHARED;
        case s.VIEW_QUAD_COMPARE:
            return s.TRACKING_PAGE_TYPE_VIEW_QUAD_COMPARED;
        default:
            return s.TRACKING_PAGE_TYPE_UNKNOWN
        }
    }
    function r(_) {
        switch (_) {
        case s.SHARE_FACEBOOK:
            return s.TRACKING_SOCIAL_NETWORK_FACEBOOK;
        case s.SHARE_TWITTER:
            return s.TRACKING_SOCIAL_NETWORK_TWITTER;
        case s.SHARE_PINTEREST:
            return s.TRACKING_SOCIAL_NETWORK_PINTEREST;
        default:
            return s.TRACKING_SOCIAL_NETWORK_UNKNOWN
        }
    }
    function O() {
        return s.TRACKING_SOCIAL_ACTION_DEFAULT
    }
    function o(_) {
        switch (_) {
        case s.SHARE_FACEBOOK:
            return "https://www.facebook.com/";
        case s.SHARE_TWITTER:
            return "https://twitter.com/";
        case s.SHARE_PINTEREST:
            return "https://www.pinterest.com/";
        default:
            return s.TRACKING_SOCIAL_NETWORK_UNKNOWN
        }
    }
    function R(_) {
        switch (_) {
        case s.TRACKING_SOCIAL_NETWORK_FACEBOOK:
            return s.TRACKING_SOCIAL_ACTION_SHARE;
        case s.TRACKING_SOCIAL_NETWORK_TWITTER:
            return s.TRACKING_SOCIAL_ACTION_TWEET;
        case s.TRACKING_SOCIAL_NETWORK_PINTEREST:
        default:
            return s.TRACKING_SOCIAL_ACTION_SHARE
        }
    }
    function N(_) {
        return void 0 !== _.quad && !0 === _.quad ? s.TRACKING_SHARE_IMAGE_TYPE_QUAD : s.TRACKING_SHARE_IMAGE_TYPE_SINGLE
    }
    function n(_) {
        switch (_) {
        case s.MODE_LIVE:
            return s.TRACKING_TYPE_CTA_LIVE_CAMERA;
        case s.MODE_PHOTO:
            return s.TRACKING_TYPE_CTA_UPLOAD_PHOTO;
        default:
            return s.TRACKING_TYPE_UNKNOWN
        }
    }
    function I(_, e) {
        switch (_) {
        case s.VIEW_LANDING:
            return s.TRACKING_PAGE_TYPE_VIEW_INTERMEDIATE_LANDING;
        case s.VIEW_ERROR_POPUP:
            switch (e) {
            case s.ERROR_DIMENSION:
                return s.TRACKING_PAGE_TYPE_VIEW_INTERMEDIATE_ERROR_DIMENSION;
            case s.ERROR_FILESIZE:
                return s.TRACKING_PAGE_TYPE_VIEW_INTERMEDIATE_ERROR_FILESIZE;
            case s.ERROR_FILETYPE:
                return s.TRACKING_PAGE_TYPE_VIEW_INTERMEDIATE_ERROR_FILETYPE;
            case s.ERROR_NO_FACE:
                return s.TRACKING_PAGE_TYPE_VIEW_INTERMEDIATE_ERROR_NO_FACE;
            case s.ERROR_NO_HAIR:
                return s.TRACKING_PAGE_TYPE_VIEW_INTERMEDIATE_ERROR_NO_HAIR;
            case s.ERROR_WEBCAM:
                return s.TRACKING_PAGE_TYPE_VIEW_INTERMEDIATE_ERROR_WEBCAM;
            case s.ERROR_UPC:
                return s.TRACKING_PAGE_TYPE_VIEW_INTERMEDIATE_ERROR_UPC;
            case s.ERROR_LOOK:
                return s.TRACKING_PAGE_TYPE_VIEW_INTERMEDIATE_ERROR_LOOK;
            case s.ERROR_FACE_TOO_SMALL:
                return s.TRACKING_PAGE_TYPE_VIEW_INTERMEDIATE_ERROR_FACE_TOO_SMALL;
            default:
                return s.TRACKING_PAGE_TYPE_UNKNOWN
            }
        default:
            return s.TRACKING_PAGE_TYPE_UNKNOWN
        }
    }
    function C(_) {
        switch (_) {
        case s.MODE_LIVE:
            return s.TRACKING_TYPE_PARENT_LIVE_CAMERA;
        case s.MODE_PHOTO:
            return s.TRACKING_TYPE_PARENT_UPLOAD_PHOTO;
        default:
            return s.TRACKING_TYPE_UNKNOWN
        }
    }
    function i(_) {
        switch (_) {
        case s.ERROR_DIMENSION:
            return s.TRACKING_ERROR_TYPE_ERROR_DIMENSION;
        case s.ERROR_FILESIZE:
            return s.TRACKING_ERROR_TYPE_ERROR_FILESIZE;
        case s.ERROR_FILETYPE:
            return s.TRACKING_ERROR_TYPE_ERROR_FILETYPE;
        case s.ERROR_NO_FACE:
            return s.TRACKING_ERROR_TYPE_ERROR_NO_FACE;
        case s.ERROR_NO_HAIR:
            return s.TRACKING_ERROR_TYPE_ERROR_NO_HAIR;
        case s.ERROR_WEBCAM:
            return s.TRACKING_ERROR_TYPE_ERROR_WEBCAM;
        case s.ERROR_UPC:
            return s.TRACKING_ERROR_TYPE_ERROR_UPC;
        case s.ERROR_LOOK:
            return s.TRACKING_ERROR_TYPE_ERROR_LOOK;
        case s.ERROR_FACE_TOO_SMALL:
            return s.TRACKING_ERROR_TYPE_ERROR_FACE_TOO_SMALL;
        default:
            return s.TRACKING_ERROR_TYPE_UNKNOWN
        }
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.getErrorEventTrackingErrorType = e.getParentModeChangeTrackingType = e.getIntermediateTrackingPageType = e.getIntermediateTrackingType = e.getShareImageType = e.getSocialActionPerSocialNetwork = e.getSocialTarget = e.getSocialAction = e.getSocialNetwork = e.getTrackingPageType = e.getCtaTrackingAdjustType = e.getCtaTrackingActionType = e.getCtaTrackingType = void 0;
    var s = E(0);
    e.getCtaTrackingType = T,
    e.getCtaTrackingActionType = t,
    e.getCtaTrackingAdjustType = a,
    e.getTrackingPageType = A,
    e.getSocialNetwork = r,
    e.getSocialAction = O,
    e.getSocialTarget = o,
    e.getSocialActionPerSocialNetwork = R,
    e.getShareImageType = N,
    e.getIntermediateTrackingType = n,
    e.getIntermediateTrackingPageType = I,
    e.getParentModeChangeTrackingType = C,
    e.getErrorEventTrackingErrorType = i
}
, function(_, e, E) {
    "use strict";
    function T(_, e) {
        var E = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {}
          , T = null
          , a = "";
        return "POST" === e ? (T = new FormData,
        Object.keys(E).forEach(function(_) {
            return T.append(_, E[_])
        })) : a = (0,
        t.queryStr)(E),
        fetch(_ + a, {
            method: e,
            body: T
        }).then(function(_) {
            if (_.ok)
                return _.text();
            throw new Error(_.statusText)
        })
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    });
    var t = E(5)
      , a = function _(e) {
        var E = e.url
          , t = e.method
          , a = e.data
          , A = void 0 === a ? {} : a
          , r = e.n
          , O = void 0 === r ? 5 : r;
        return T(E, t, A).catch(function(e) {
            if (O <= 1)
                throw e;
            return _({
                url: E,
                method: t,
                data: A,
                n: O - 1
            })
        })
    };
    e.default = a
}
, function(_, e, E) {
    "use strict";
    function T(_) {
        var e = "?" + Object.keys(_).map(function(e) {
            return encodeURIComponent(e) + "=" + encodeURIComponent(_[e])
        }).join("&").replace(/%20/g, "+");
        return "?" === e ? "" : e
    }
    function t(_, e) {
        return _ + T(e)
    }
    Object.defineProperty(e, "__esModule", {
        value: !0
    }),
    e.queryStr = T,
    e.default = t
}
]);
//# sourceMappingURL=MF_header.js.map
