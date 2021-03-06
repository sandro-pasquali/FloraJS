/*global exports, document */
/**
 * Creates a new InputMenu object.
 * An Input Menu lists key strokes and other input available
 * for the user to interact with the system.
 *
 * @constructor
 *
 * @param {Object} [opt_options] Options.
 * @param {string} [opt_options.position = 'top left'] A text representation
 *    of the menu's location. Possible values are 'top left', 'top center', 'top right',
 *    'bottom left', 'bottom center', 'bottom right', 'center'.
 * @param {number} [opt_options.opacity = 0.75] The menu's opacity.
 * @param {number} [opt_options.color = [255, 255, 255]] The menu's color.
 * @param {string} [opt_options.borderWidth = '1px'] The menu's border width.
 * @param {string} [opt_options.borderStyle = 'solid'] The menu's border style.
 * @param {Array|string} [opt_options.borderColor = 0.75] The menu's border color.
 */
function InputMenu(opt_options) {

  'use strict';

  var me = this, options = opt_options || {};

  // if a world is not passed, use the first world in the universe
  this.world = options.world || exports.universe.first();
  this.position = options.position || 'top left';
  this.opacity = options.opacity === 0 ? 0 : options.opacity || 0.75;
  this.color = options.color || [255, 255, 255];
  this.borderWidth = options.borderWidth || '1px';
  this.borderStyle = options.borderStyle || 'solid';
  this.borderColor = options.borderColor || [204, 204, 204];
  this.colorMode = options.colorMode || 'rgb';

  if (exports.System.supportedFeatures.touch) {
    this.text =  exports.config.touchMap.stats + '-finger tap = stats | ' +
        exports.config.touchMap.pause + '-finger tap = pause | ' +
        exports.config.touchMap.reset + '-finger tap = reset';
  } else {
    this.text = '\'' + String.fromCharCode(exports.config.keyMap.pause).toLowerCase() + '\' = pause | ' +
      '\'' + String.fromCharCode(exports.config.keyMap.reset).toLowerCase() + '\' = reset | ' +
      '\'' + String.fromCharCode(exports.config.keyMap.stats).toLowerCase() + '\' = stats';
  }

  /**
   * Holds a reference to the caption's DOM elements.
   * @private
   */
  this._el = document.createElement('div');
  this._el.id = 'inputMenu';
  this._el.className = 'inputMenu ' + this.position;
  this._el.style.opacity = this.opacity;
  this._el.style.color = this.colorMode + '(' + this.color[0] + ', ' + this.color[1] +
        ', ' + this.color[2] + ')';
  this._el.style.borderWidth = this.borderWidth;
  this._el.style.borderStyle = this.borderStyle;
  if (typeof this.borderColor === 'string') {
    this._el.style.borderColor = this.borderColor;
  } else {
    this._el.style.borderColor = this.colorMode + '(' + this.borderColor[0] + ', ' + this.borderColor[1] +
        ', ' + this.borderColor[2] + ')';
  }
  this._el.appendChild(document.createTextNode(this.text));
  if (document.getElementById('inputMenu')) {
    document.getElementById('inputMenu').parentNode.removeChild(document.getElementById('inputMenu'));
  }

  if (exports.System.supportedFeatures.touch) {
    exports.Utils.addEvent(this._el, 'touchstart', function() {
      me.destroy();
    });
  } else {
    exports.Utils.addEvent(this._el, 'mouseup', function() {
      me.destroy();
    });
  }

  this.world.el.appendChild(this._el);
}

InputMenu.prototype.name = 'InputMenu';

/**
 * Removes the menu's DOM element.
 */
InputMenu.prototype.destroy = function() {

  'use strict';

  this._el.parentNode.removeChild(this._el);
};

exports.InputMenu = InputMenu;