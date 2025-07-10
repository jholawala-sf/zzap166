'use strict';

const base = module.superModule;

const collections = require('*/cartridge/scripts/util/collections');

const BREAKPOINTS = { lg: 1440, md: 1140, sm: 720, xs: 540 };

/**
 * Parses the render parameters
 * @param {string} renderParametersJson A json string
 * @returns {Object} Returns the render parameters.
 */
function parseRenderParameters(renderParametersJson) {
    var renderParameters = {};
    if (renderParametersJson) {
        try {
            renderParameters = JSON.parse(renderParametersJson);
        } catch (e) {
            require('dw/system/Logger').error('Unable to parse renderParameters: ' + renderParametersJson);
        }
    }
    return renderParameters;
}

module.exports = {
    getPageMetaData: base.getPageMetaData,
    getRegionModelRegistry: base.getRegionModelRegistry,
    isInEditMode: base.isInEditMode,
    safeCSSClass: base.safeCSSClass,
    /**
     * Assembles the page meta data.
     *
     * @param {Object} context The context of the page
     * @returns {string} ISML path to decorator template
     */
    determineDecorator: function (context) {
        var renderParameters = parseRenderParameters(context.renderParameters);
        var decorator;

        // determine decorator
        if (renderParameters.decorator) {
            // overridden on runtime
            decorator = renderParameters.decorator;
        } else {
            // provided by pagedesigner
            decorator = 'common/layout/page';
        }
        return decorator;
    },
    /**
     * Helper to convert hex to rgb
     * @param {string} hex Color hex code
     * @returns {Object} Returns an object representing the color in rgb
     */
    hexToRgb: function (hex) {
        const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        const hexToConvert = hex.replace(shorthandRegex, function (m, r, g, b) {
            return r + r + g + g + b + b;
        });

        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexToConvert);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    },
    /**
     * Retrieves the classes for a layout
     * @param {string} layout The selected layout
     * @returns {string} The layout classes
     */
    getLayoutPosition: function (layout) {
        let layoutPosition = '';

        switch (layout) {
            case 'Top Left':
                layoutPosition = 'justify-content-start align-items-start';
                break;
            case 'Top Center':
                layoutPosition = 'justify-content-center align-items-start';
                break;
            case 'Top Right':
                layoutPosition = 'justify-content-end align-items-start';
                break;
            case 'Middle Left':
                layoutPosition = 'justify-content-start align-items-center';
                break;
            case 'Middle Center':
                layoutPosition = 'justify-content-center align-items-center';
                break;
            case 'Middle Right':
                layoutPosition = 'justify-content-end align-items-center';
                break;
            case 'Bottom Left':
                layoutPosition = 'justify-content-start align-items-end';
                break;
            case 'Bottom Center':
                layoutPosition = 'justify-content-center align-items-end';
                break;
            case 'Bottom Right':
                layoutPosition = 'justify-content-end align-items-end';
                break;
            default:
                layoutPosition = '';
        }

        return layoutPosition;
    },
    getAlignment: function (alignment) {
        if (alignment === 'Right') {
            return 'text-right';
        } else if (alignment === 'Center') {
            return 'text-center';
        }

        return 'text-left';
    },
    /**
     * Helper for building the containers's classes
     * @param {Object} content The content options
     * @returns {string} The container's classes
     */
    getContainerClasses: function (content) {
        const classes = ['d-flex', 'flex-grow-1'];

        if (!content.isFullWidth) {
            classes.push('container');
        }

        return classes.join(' ');
    },
    /**
     * Helper for building the component's classes
     * @param {Object} content The content options
     * @returns {string} The component's classes
     */
    getComponentClasses: function (content) {
        const classes = [];

        if (content.wrapColumns) {
            classes.push('flex-wrap');
        }

        if (content.hideGutters) {
            classes.push('no-gutters');
        }

        if (content.alignment) {
            Object.keys(BREAKPOINTS).forEach(function (key) {
                if (key === 'xs') {
                    classes.push('flex-' + content.alignment[key].direction);
                    classes.push('justify-content-' + content.alignment[key].horizontal);
                    classes.push('align-items-' + content.alignment[key].vertical);
                } else {
                    classes.push('flex-' + key + '-' + content.alignment[key].direction);
                    classes.push('justify-content-' + key + '-' + content.alignment[key].horizontal);
                    classes.push('align-items-' + key + '-' + content.alignment[key].vertical);
                }
            });
        }

        if (content.spacing) {
            Object.keys(BREAKPOINTS).forEach(function (key) {
                if (content.spacing[key]) {
                    if (key === 'xs') {
                        classes.push('mt-' + content.spacing[key].margin.top);
                        classes.push('mr-' + content.spacing[key].margin.right);
                        classes.push('mb-' + content.spacing[key].margin.bottom);
                        classes.push('ml-' + content.spacing[key].margin.left);

                        classes.push('pt-' + content.spacing[key].padding.top);
                        classes.push('pr-' + content.spacing[key].padding.right);
                        classes.push('pb-' + content.spacing[key].padding.bottom);
                        classes.push('pl-' + content.spacing[key].padding.left);
                    } else {
                        classes.push('mt-' + key + '-' + content.spacing[key].margin.top);
                        classes.push('mr-' + key + '-' + content.spacing[key].margin.right);
                        classes.push('mb-' + key + '-' + content.spacing[key].margin.bottom);
                        classes.push('ml-' + key + '-' + content.spacing[key].margin.left);

                        classes.push('pt-' + key + '-' + content.spacing[key].padding.top);
                        classes.push('pr-' + key + '-' + content.spacing[key].padding.right);
                        classes.push('pb-' + key + '-' + content.spacing[key].padding.bottom);
                        classes.push('pl-' + key + '-' + content.spacing[key].padding.left);
                    }
                }
            });
        }

        return classes.join(' ');
    },
    /**
     * Helper for building the component's styles
     * @param {Object} content The content options
     * @returns {string} The component's styles
     */
    getComponentStyles: function (content) {
        const styles = [];

        if (content.backgroundColor) {
            styles.push('background-color:' + content.backgroundColor.color);
        }

        if (content.border) {
            if (content.border.activeBorder === 'all') {
                const border = content.border.borders.all;
                styles.push('border: ' + border.width + 'px ' + border.style + ' ' + border.color);
            } else {
                const borderTop = content.border.borders.top;
                const borderRight = content.border.borders.right;
                const borderBottom = content.border.borders.bottom;
                const borderLeft = content.border.borders.left;

                styles.push('border-top: ' + borderTop.width + 'px ' + borderTop.style + ' ' + borderTop.color);
                styles.push('border-right: ' + borderRight.width + 'px ' + borderRight.style + ' ' + borderRight.color);
                styles.push('border-bottom: ' + borderBottom.width + 'px ' + borderBottom.style + ' ' + borderBottom.color);
                styles.push('border-left: ' + borderLeft.width + 'px ' + borderLeft.style + ' ' + borderLeft.color);
            }
        }

        return styles.join(';');
    },
    /**
     * Helper for determing the column size
     * @param {Object} column The column
     * @returns {string} The component's size class
     */
    getColumnClasses: function (column) {
        const classes = ['layout-column'];

        Object.keys(BREAKPOINTS).forEach(function (key) {
            if (column[key] === 'none') {
                if (key === 'xs') {
                    classes.push('d-none');
                } else {
                    classes.push('d-' + key + '-none');
                }
            } else {
                // eslint-disable-next-line no-lonely-if
                if (key === 'xs') {
                    classes.push('col-' + column[key]);
                    classes.push('d-flex');
                } else {
                    classes.push('col-' + key + '-' + column[key]);
                    classes.push('d-' + key + '-flex');
                }
            }
        });

        return classes.join(' ');
    },
    /**
     * Helper for generating the carousel configuration
     * @param {Object} breakpointConfig The component breakpoint configuration
     * @returns {string} The carousel's configuration
     */
    getCarouselConfig: function (breakpointConfig) {
        let config = {
            rows: 0,
            responsive: []
        };

        Object.keys(BREAKPOINTS).forEach(function (key) {
            const breakpoint = {
                breakpoint: BREAKPOINTS[key],
                settings: {}
            };

            collections.forEach(breakpointConfig[key].keySet(), function (prop) {
                if (key === 'lg') {
                    config[prop] = breakpointConfig[key][prop];
                } else {
                    breakpoint.settings[prop] = breakpointConfig[key][prop];
                }
            });

            if (key !== 'lg') {
                config.responsive.push(breakpoint);
            }
        });

        return JSON.stringify(config);
    },
    /**
     * Helper function for assigning render params to the model
     * @param {Object} model The object passed to the rendering template
     * @param {Object} context The context of the page
     */
    decorateModel: function (model, context) {
        const renderParameters = context.getRenderParameters();

        if (renderParameters) {
            const parsedParameters = JSON.parse(renderParameters);
            Object.keys(parsedParameters).forEach(function (key) {
                model[key] = parsedParameters[key]; // eslint-disable-line no-param-reassign
            });
        }

        if (!model.CurrentPageMetaData) {
            model.CurrentPageMetaData = { // eslint-disable-line no-param-reassign
                title: context.page.pageTitle,
                description: context.page.pageDescription,
                keywords: context.page.pageKeywords
            };
        }
    }
};
