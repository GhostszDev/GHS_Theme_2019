/*!
  * Bootstrap v4.3.1 (https://getbootstrap.com/)
  * Copyright 2011-2019 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery'], factory) :
  (global = global || self, factory(global.bootstrap = {}, global.jQuery));
}(this, function (exports, $) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var TRANSITION_END = 'transitionend';
  var MAX_UID = 1000000;
  var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

  function toType(obj) {
    return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: TRANSITION_END,
      delegateType: TRANSITION_END,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }

        return undefined; // eslint-disable-line no-undefined
      }
    };
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;
    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });
    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);
    return this;
  }

  function setTransitionEndSupport() {
    $.fn.emulateTransitionEnd = transitionEndEmulator;
    $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
  }
  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */


  var Util = {
    TRANSITION_END: 'bsTransitionEnd',
    getUID: function getUID(prefix) {
      do {
        // eslint-disable-next-line no-bitwise
        prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
      } while (document.getElementById(prefix));

      return prefix;
    },
    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector || selector === '#') {
        var hrefAttr = element.getAttribute('href');
        selector = hrefAttr && hrefAttr !== '#' ? hrefAttr.trim() : '';
      }

      try {
        return document.querySelector(selector) ? selector : null;
      } catch (err) {
        return null;
      }
    },
    getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
      if (!element) {
        return 0;
      } // Get transition-duration of the element


      var transitionDuration = $(element).css('transition-duration');
      var transitionDelay = $(element).css('transition-delay');
      var floatTransitionDuration = parseFloat(transitionDuration);
      var floatTransitionDelay = parseFloat(transitionDelay); // Return 0 if element or transition duration is not found

      if (!floatTransitionDuration && !floatTransitionDelay) {
        return 0;
      } // If multiple durations are defined, take the first


      transitionDuration = transitionDuration.split(',')[0];
      transitionDelay = transitionDelay.split(',')[0];
      return (parseFloat(transitionDuration) + parseFloat(transitionDelay)) * MILLISECONDS_MULTIPLIER;
    },
    reflow: function reflow(element) {
      return element.offsetHeight;
    },
    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(TRANSITION_END);
    },
    // TODO: Remove in v5
    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(TRANSITION_END);
    },
    isElement: function isElement(obj) {
      return (obj[0] || obj).nodeType;
    },
    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = value && Util.isElement(value) ? 'element' : toType(value);

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
          }
        }
      }
    },
    findShadowRoot: function findShadowRoot(element) {
      if (!document.documentElement.attachShadow) {
        return null;
      } // Can find the shadow root otherwise it'll return the document


      if (typeof element.getRootNode === 'function') {
        var root = element.getRootNode();
        return root instanceof ShadowRoot ? root : null;
      }

      if (element instanceof ShadowRoot) {
        return element;
      } // when we don't find a shadow root


      if (!element.parentNode) {
        return null;
      }

      return Util.findShadowRoot(element.parentNode);
    }
  };
  setTransitionEndSupport();

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.3.1';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = "." + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };
  var Event = {
    CLOSE: "close" + EVENT_KEY,
    CLOSED: "closed" + EVENT_KEY,
    CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
  };
  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    SHOW: 'show'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Alert =
  /*#__PURE__*/
  function () {
    function Alert(element) {
      this._element = element;
    } // Getters


    var _proto = Alert.prototype;

    // Public
    _proto.close = function close(element) {
      var rootElement = this._element;

      if (element) {
        rootElement = this._getRootElement(element);
      }

      var customEvent = this._triggerCloseEvent(rootElement);

      if (customEvent.isDefaultPrevented()) {
        return;
      }

      this._removeElement(rootElement);
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY);
      this._element = null;
    } // Private
    ;

    _proto._getRootElement = function _getRootElement(element) {
      var selector = Util.getSelectorFromElement(element);
      var parent = false;

      if (selector) {
        parent = document.querySelector(selector);
      }

      if (!parent) {
        parent = $(element).closest("." + ClassName.ALERT)[0];
      }

      return parent;
    };

    _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
      var closeEvent = $.Event(Event.CLOSE);
      $(element).trigger(closeEvent);
      return closeEvent;
    };

    _proto._removeElement = function _removeElement(element) {
      var _this = this;

      $(element).removeClass(ClassName.SHOW);

      if (!$(element).hasClass(ClassName.FADE)) {
        this._destroyElement(element);

        return;
      }

      var transitionDuration = Util.getTransitionDurationFromElement(element);
      $(element).one(Util.TRANSITION_END, function (event) {
        return _this._destroyElement(element, event);
      }).emulateTransitionEnd(transitionDuration);
    };

    _proto._destroyElement = function _destroyElement(element) {
      $(element).detach().trigger(Event.CLOSED).remove();
    } // Static
    ;

    Alert._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY);

        if (!data) {
          data = new Alert(this);
          $element.data(DATA_KEY, data);
        }

        if (config === 'close') {
          data[config](this);
        }
      });
    };

    Alert._handleDismiss = function _handleDismiss(alertInstance) {
      return function (event) {
        if (event) {
          event.preventDefault();
        }

        alertInstance.close(this);
      };
    };

    _createClass(Alert, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;

  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$1 = 'button';
  var VERSION$1 = '4.3.1';
  var DATA_KEY$1 = 'bs.button';
  var EVENT_KEY$1 = "." + DATA_KEY$1;
  var DATA_API_KEY$1 = '.data-api';
  var JQUERY_NO_CONFLICT$1 = $.fn[NAME$1];
  var ClassName$1 = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };
  var Selector$1 = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input:not([type="hidden"])',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };
  var Event$1 = {
    CLICK_DATA_API: "click" + EVENT_KEY$1 + DATA_API_KEY$1,
    FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY$1 + DATA_API_KEY$1 + " " + ("blur" + EVENT_KEY$1 + DATA_API_KEY$1)
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Button =
  /*#__PURE__*/
  function () {
    function Button(element) {
      this._element = element;
    } // Getters


    var _proto = Button.prototype;

    // Public
    _proto.toggle = function toggle() {
      var triggerChangeEvent = true;
      var addAriaPressed = true;
      var rootElement = $(this._element).closest(Selector$1.DATA_TOGGLE)[0];

      if (rootElement) {
        var input = this._element.querySelector(Selector$1.INPUT);

        if (input) {
          if (input.type === 'radio') {
            if (input.checked && this._element.classList.contains(ClassName$1.ACTIVE)) {
              triggerChangeEvent = false;
            } else {
              var activeElement = rootElement.querySelector(Selector$1.ACTIVE);

              if (activeElement) {
                $(activeElement).removeClass(ClassName$1.ACTIVE);
              }
            }
          }

          if (triggerChangeEvent) {
            if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
              return;
            }

            input.checked = !this._element.classList.contains(ClassName$1.ACTIVE);
            $(input).trigger('change');
          }

          input.focus();
          addAriaPressed = false;
        }
      }

      if (addAriaPressed) {
        this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName$1.ACTIVE));
      }

      if (triggerChangeEvent) {
        $(this._element).toggleClass(ClassName$1.ACTIVE);
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$1);
      this._element = null;
    } // Static
    ;

    Button._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$1);

        if (!data) {
          data = new Button(this);
          $(this).data(DATA_KEY$1, data);
        }

        if (config === 'toggle') {
          data[config]();
        }
      });
    };

    _createClass(Button, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$1;
      }
    }]);

    return Button;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$1.CLICK_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();
    var button = event.target;

    if (!$(button).hasClass(ClassName$1.BUTTON)) {
      button = $(button).closest(Selector$1.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event$1.FOCUS_BLUR_DATA_API, Selector$1.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector$1.BUTTON)[0];
    $(button).toggleClass(ClassName$1.FOCUS, /^focus(in)?$/.test(event.type));
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$1] = Button._jQueryInterface;
  $.fn[NAME$1].Constructor = Button;

  $.fn[NAME$1].noConflict = function () {
    $.fn[NAME$1] = JQUERY_NO_CONFLICT$1;
    return Button._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$2 = 'carousel';
  var VERSION$2 = '4.3.1';
  var DATA_KEY$2 = 'bs.carousel';
  var EVENT_KEY$2 = "." + DATA_KEY$2;
  var DATA_API_KEY$2 = '.data-api';
  var JQUERY_NO_CONFLICT$2 = $.fn[NAME$2];
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

  var SWIPE_THRESHOLD = 40;
  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true,
    touch: true
  };
  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean',
    touch: 'boolean'
  };
  var Direction = {
    NEXT: 'next',
    PREV: 'prev',
    LEFT: 'left',
    RIGHT: 'right'
  };
  var Event$2 = {
    SLIDE: "slide" + EVENT_KEY$2,
    SLID: "slid" + EVENT_KEY$2,
    KEYDOWN: "keydown" + EVENT_KEY$2,
    MOUSEENTER: "mouseenter" + EVENT_KEY$2,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$2,
    TOUCHSTART: "touchstart" + EVENT_KEY$2,
    TOUCHMOVE: "touchmove" + EVENT_KEY$2,
    TOUCHEND: "touchend" + EVENT_KEY$2,
    POINTERDOWN: "pointerdown" + EVENT_KEY$2,
    POINTERUP: "pointerup" + EVENT_KEY$2,
    DRAG_START: "dragstart" + EVENT_KEY$2,
    LOAD_DATA_API: "load" + EVENT_KEY$2 + DATA_API_KEY$2,
    CLICK_DATA_API: "click" + EVENT_KEY$2 + DATA_API_KEY$2
  };
  var ClassName$2 = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'carousel-item-right',
    LEFT: 'carousel-item-left',
    NEXT: 'carousel-item-next',
    PREV: 'carousel-item-prev',
    ITEM: 'carousel-item',
    POINTER_EVENT: 'pointer-event'
  };
  var Selector$2 = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    ITEM_IMG: '.carousel-item img',
    NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };
  var PointerType = {
    TOUCH: 'touch',
    PEN: 'pen'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Carousel =
  /*#__PURE__*/
  function () {
    function Carousel(element, config) {
      this._items = null;
      this._interval = null;
      this._activeElement = null;
      this._isPaused = false;
      this._isSliding = false;
      this.touchTimeout = null;
      this.touchStartX = 0;
      this.touchDeltaX = 0;
      this._config = this._getConfig(config);
      this._element = element;
      this._indicatorsElement = this._element.querySelector(Selector$2.INDICATORS);
      this._touchSupported = 'ontouchstart' in document.documentElement || navigator.maxTouchPoints > 0;
      this._pointerEvent = Boolean(window.PointerEvent || window.MSPointerEvent);

      this._addEventListeners();
    } // Getters


    var _proto = Carousel.prototype;

    // Public
    _proto.next = function next() {
      if (!this._isSliding) {
        this._slide(Direction.NEXT);
      }
    };

    _proto.nextWhenVisible = function nextWhenVisible() {
      // Don't call next when the page isn't visible
      // or the carousel or its parent isn't visible
      if (!document.hidden && $(this._element).is(':visible') && $(this._element).css('visibility') !== 'hidden') {
        this.next();
      }
    };

    _proto.prev = function prev() {
      if (!this._isSliding) {
        this._slide(Direction.PREV);
      }
    };

    _proto.pause = function pause(event) {
      if (!event) {
        this._isPaused = true;
      }

      if (this._element.querySelector(Selector$2.NEXT_PREV)) {
        Util.triggerTransitionEnd(this._element);
        this.cycle(true);
      }

      clearInterval(this._interval);
      this._interval = null;
    };

    _proto.cycle = function cycle(event) {
      if (!event) {
        this._isPaused = false;
      }

      if (this._interval) {
        clearInterval(this._interval);
        this._interval = null;
      }

      if (this._config.interval && !this._isPaused) {
        this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
      }
    };

    _proto.to = function to(index) {
      var _this = this;

      this._activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

      var activeIndex = this._getItemIndex(this._activeElement);

      if (index > this._items.length - 1 || index < 0) {
        return;
      }

      if (this._isSliding) {
        $(this._element).one(Event$2.SLID, function () {
          return _this.to(index);
        });
        return;
      }

      if (activeIndex === index) {
        this.pause();
        this.cycle();
        return;
      }

      var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

      this._slide(direction, this._items[index]);
    };

    _proto.dispose = function dispose() {
      $(this._element).off(EVENT_KEY$2);
      $.removeData(this._element, DATA_KEY$2);
      this._items = null;
      this._config = null;
      this._element = null;
      this._interval = null;
      this._isPaused = null;
      this._isSliding = null;
      this._activeElement = null;
      this._indicatorsElement = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default, config);
      Util.typeCheckConfig(NAME$2, config, DefaultType);
      return config;
    };

    _proto._handleSwipe = function _handleSwipe() {
      var absDeltax = Math.abs(this.touchDeltaX);

      if (absDeltax <= SWIPE_THRESHOLD) {
        return;
      }

      var direction = absDeltax / this.touchDeltaX; // swipe left

      if (direction > 0) {
        this.prev();
      } // swipe right


      if (direction < 0) {
        this.next();
      }
    };

    _proto._addEventListeners = function _addEventListeners() {
      var _this2 = this;

      if (this._config.keyboard) {
        $(this._element).on(Event$2.KEYDOWN, function (event) {
          return _this2._keydown(event);
        });
      }

      if (this._config.pause === 'hover') {
        $(this._element).on(Event$2.MOUSEENTER, function (event) {
          return _this2.pause(event);
        }).on(Event$2.MOUSELEAVE, function (event) {
          return _this2.cycle(event);
        });
      }

      if (this._config.touch) {
        this._addTouchEventListeners();
      }
    };

    _proto._addTouchEventListeners = function _addTouchEventListeners() {
      var _this3 = this;

      if (!this._touchSupported) {
        return;
      }

      var start = function start(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchStartX = event.originalEvent.clientX;
        } else if (!_this3._pointerEvent) {
          _this3.touchStartX = event.originalEvent.touches[0].clientX;
        }
      };

      var move = function move(event) {
        // ensure swiping with one touch and not pinching
        if (event.originalEvent.touches && event.originalEvent.touches.length > 1) {
          _this3.touchDeltaX = 0;
        } else {
          _this3.touchDeltaX = event.originalEvent.touches[0].clientX - _this3.touchStartX;
        }
      };

      var end = function end(event) {
        if (_this3._pointerEvent && PointerType[event.originalEvent.pointerType.toUpperCase()]) {
          _this3.touchDeltaX = event.originalEvent.clientX - _this3.touchStartX;
        }

        _this3._handleSwipe();

        if (_this3._config.pause === 'hover') {
          // If it's a touch-enabled device, mouseenter/leave are fired as
          // part of the mouse compatibility events on first tap - the carousel
          // would stop cycling until user tapped out of it;
          // here, we listen for touchend, explicitly pause the carousel
          // (as if it's the second time we tap on it, mouseenter compat event
          // is NOT fired) and after a timeout (to allow for mouse compatibility
          // events to fire) we explicitly restart cycling
          _this3.pause();

          if (_this3.touchTimeout) {
            clearTimeout(_this3.touchTimeout);
          }

          _this3.touchTimeout = setTimeout(function (event) {
            return _this3.cycle(event);
          }, TOUCHEVENT_COMPAT_WAIT + _this3._config.interval);
        }
      };

      $(this._element.querySelectorAll(Selector$2.ITEM_IMG)).on(Event$2.DRAG_START, function (e) {
        return e.preventDefault();
      });

      if (this._pointerEvent) {
        $(this._element).on(Event$2.POINTERDOWN, function (event) {
          return start(event);
        });
        $(this._element).on(Event$2.POINTERUP, function (event) {
          return end(event);
        });

        this._element.classList.add(ClassName$2.POINTER_EVENT);
      } else {
        $(this._element).on(Event$2.TOUCHSTART, function (event) {
          return start(event);
        });
        $(this._element).on(Event$2.TOUCHMOVE, function (event) {
          return move(event);
        });
        $(this._element).on(Event$2.TOUCHEND, function (event) {
          return end(event);
        });
      }
    };

    _proto._keydown = function _keydown(event) {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.which) {
        case ARROW_LEFT_KEYCODE:
          event.preventDefault();
          this.prev();
          break;

        case ARROW_RIGHT_KEYCODE:
          event.preventDefault();
          this.next();
          break;

        default:
      }
    };

    _proto._getItemIndex = function _getItemIndex(element) {
      this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector$2.ITEM)) : [];
      return this._items.indexOf(element);
    };

    _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
      var isNextDirection = direction === Direction.NEXT;
      var isPrevDirection = direction === Direction.PREV;

      var activeIndex = this._getItemIndex(activeElement);

      var lastItemIndex = this._items.length - 1;
      var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

      if (isGoingToWrap && !this._config.wrap) {
        return activeElement;
      }

      var delta = direction === Direction.PREV ? -1 : 1;
      var itemIndex = (activeIndex + delta) % this._items.length;
      return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
    };

    _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
      var targetIndex = this._getItemIndex(relatedTarget);

      var fromIndex = this._getItemIndex(this._element.querySelector(Selector$2.ACTIVE_ITEM));

      var slideEvent = $.Event(Event$2.SLIDE, {
        relatedTarget: relatedTarget,
        direction: eventDirectionName,
        from: fromIndex,
        to: targetIndex
      });
      $(this._element).trigger(slideEvent);
      return slideEvent;
    };

    _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
      if (this._indicatorsElement) {
        var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector$2.ACTIVE));
        $(indicators).removeClass(ClassName$2.ACTIVE);

        var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

        if (nextIndicator) {
          $(nextIndicator).addClass(ClassName$2.ACTIVE);
        }
      }
    };

    _proto._slide = function _slide(direction, element) {
      var _this4 = this;

      var activeElement = this._element.querySelector(Selector$2.ACTIVE_ITEM);

      var activeElementIndex = this._getItemIndex(activeElement);

      var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

      var nextElementIndex = this._getItemIndex(nextElement);

      var isCycling = Boolean(this._interval);
      var directionalClassName;
      var orderClassName;
      var eventDirectionName;

      if (direction === Direction.NEXT) {
        directionalClassName = ClassName$2.LEFT;
        orderClassName = ClassName$2.NEXT;
        eventDirectionName = Direction.LEFT;
      } else {
        directionalClassName = ClassName$2.RIGHT;
        orderClassName = ClassName$2.PREV;
        eventDirectionName = Direction.RIGHT;
      }

      if (nextElement && $(nextElement).hasClass(ClassName$2.ACTIVE)) {
        this._isSliding = false;
        return;
      }

      var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

      if (slideEvent.isDefaultPrevented()) {
        return;
      }

      if (!activeElement || !nextElement) {
        // Some weirdness is happening, so we bail
        return;
      }

      this._isSliding = true;

      if (isCycling) {
        this.pause();
      }

      this._setActiveIndicatorElement(nextElement);

      var slidEvent = $.Event(Event$2.SLID, {
        relatedTarget: nextElement,
        direction: eventDirectionName,
        from: activeElementIndex,
        to: nextElementIndex
      });

      if ($(this._element).hasClass(ClassName$2.SLIDE)) {
        $(nextElement).addClass(orderClassName);
        Util.reflow(nextElement);
        $(activeElement).addClass(directionalClassName);
        $(nextElement).addClass(directionalClassName);
        var nextElementInterval = parseInt(nextElement.getAttribute('data-interval'), 10);

        if (nextElementInterval) {
          this._config.defaultInterval = this._config.defaultInterval || this._config.interval;
          this._config.interval = nextElementInterval;
        } else {
          this._config.interval = this._config.defaultInterval || this._config.interval;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
        $(activeElement).one(Util.TRANSITION_END, function () {
          $(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName$2.ACTIVE);
          $(activeElement).removeClass(ClassName$2.ACTIVE + " " + orderClassName + " " + directionalClassName);
          _this4._isSliding = false;
          setTimeout(function () {
            return $(_this4._element).trigger(slidEvent);
          }, 0);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        $(activeElement).removeClass(ClassName$2.ACTIVE);
        $(nextElement).addClass(ClassName$2.ACTIVE);
        this._isSliding = false;
        $(this._element).trigger(slidEvent);
      }

      if (isCycling) {
        this.cycle();
      }
    } // Static
    ;

    Carousel._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$2);

        var _config = _objectSpread({}, Default, $(this).data());

        if (typeof config === 'object') {
          _config = _objectSpread({}, _config, config);
        }

        var action = typeof config === 'string' ? config : _config.slide;

        if (!data) {
          data = new Carousel(this, _config);
          $(this).data(DATA_KEY$2, data);
        }

        if (typeof config === 'number') {
          data.to(config);
        } else if (typeof action === 'string') {
          if (typeof data[action] === 'undefined') {
            throw new TypeError("No method named \"" + action + "\"");
          }

          data[action]();
        } else if (_config.interval && _config.ride) {
          data.pause();
          data.cycle();
        }
      });
    };

    Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
      var selector = Util.getSelectorFromElement(this);

      if (!selector) {
        return;
      }

      var target = $(selector)[0];

      if (!target || !$(target).hasClass(ClassName$2.CAROUSEL)) {
        return;
      }

      var config = _objectSpread({}, $(target).data(), $(this).data());

      var slideIndex = this.getAttribute('data-slide-to');

      if (slideIndex) {
        config.interval = false;
      }

      Carousel._jQueryInterface.call($(target), config);

      if (slideIndex) {
        $(target).data(DATA_KEY$2).to(slideIndex);
      }

      event.preventDefault();
    };

    _createClass(Carousel, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$2;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$2.CLICK_DATA_API, Selector$2.DATA_SLIDE, Carousel._dataApiClickHandler);
  $(window).on(Event$2.LOAD_DATA_API, function () {
    var carousels = [].slice.call(document.querySelectorAll(Selector$2.DATA_RIDE));

    for (var i = 0, len = carousels.length; i < len; i++) {
      var $carousel = $(carousels[i]);

      Carousel._jQueryInterface.call($carousel, $carousel.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$2] = Carousel._jQueryInterface;
  $.fn[NAME$2].Constructor = Carousel;

  $.fn[NAME$2].noConflict = function () {
    $.fn[NAME$2] = JQUERY_NO_CONFLICT$2;
    return Carousel._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$3 = 'collapse';
  var VERSION$3 = '4.3.1';
  var DATA_KEY$3 = 'bs.collapse';
  var EVENT_KEY$3 = "." + DATA_KEY$3;
  var DATA_API_KEY$3 = '.data-api';
  var JQUERY_NO_CONFLICT$3 = $.fn[NAME$3];
  var Default$1 = {
    toggle: true,
    parent: ''
  };
  var DefaultType$1 = {
    toggle: 'boolean',
    parent: '(string|element)'
  };
  var Event$3 = {
    SHOW: "show" + EVENT_KEY$3,
    SHOWN: "shown" + EVENT_KEY$3,
    HIDE: "hide" + EVENT_KEY$3,
    HIDDEN: "hidden" + EVENT_KEY$3,
    CLICK_DATA_API: "click" + EVENT_KEY$3 + DATA_API_KEY$3
  };
  var ClassName$3 = {
    SHOW: 'show',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };
  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };
  var Selector$3 = {
    ACTIVES: '.show, .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Collapse =
  /*#__PURE__*/
  function () {
    function Collapse(element, config) {
      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = [].slice.call(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
      var toggleList = [].slice.call(document.querySelectorAll(Selector$3.DATA_TOGGLE));

      for (var i = 0, len = toggleList.length; i < len; i++) {
        var elem = toggleList[i];
        var selector = Util.getSelectorFromElement(elem);
        var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
          return foundElem === element;
        });

        if (selector !== null && filterElement.length > 0) {
          this._selector = selector;

          this._triggerArray.push(elem);
        }
      }

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    } // Getters


    var _proto = Collapse.prototype;

    // Public
    _proto.toggle = function toggle() {
      if ($(this._element).hasClass(ClassName$3.SHOW)) {
        this.hide();
      } else {
        this.show();
      }
    };

    _proto.show = function show() {
      var _this = this;

      if (this._isTransitioning || $(this._element).hasClass(ClassName$3.SHOW)) {
        return;
      }

      var actives;
      var activesData;

      if (this._parent) {
        actives = [].slice.call(this._parent.querySelectorAll(Selector$3.ACTIVES)).filter(function (elem) {
          if (typeof _this._config.parent === 'string') {
            return elem.getAttribute('data-parent') === _this._config.parent;
          }

          return elem.classList.contains(ClassName$3.COLLAPSE);
        });

        if (actives.length === 0) {
          actives = null;
        }
      }

      if (actives) {
        activesData = $(actives).not(this._selector).data(DATA_KEY$3);

        if (activesData && activesData._isTransitioning) {
          return;
        }
      }

      var startEvent = $.Event(Event$3.SHOW);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      if (actives) {
        Collapse._jQueryInterface.call($(actives).not(this._selector), 'hide');

        if (!activesData) {
          $(actives).data(DATA_KEY$3, null);
        }
      }

      var dimension = this._getDimension();

      $(this._element).removeClass(ClassName$3.COLLAPSE).addClass(ClassName$3.COLLAPSING);
      this._element.style[dimension] = 0;

      if (this._triggerArray.length) {
        $(this._triggerArray).removeClass(ClassName$3.COLLAPSED).attr('aria-expanded', true);
      }

      this.setTransitioning(true);

      var complete = function complete() {
        $(_this._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).addClass(ClassName$3.SHOW);
        _this._element.style[dimension] = '';

        _this.setTransitioning(false);

        $(_this._element).trigger(Event$3.SHOWN);
      };

      var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
      var scrollSize = "scroll" + capitalizedDimension;
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      this._element.style[dimension] = this._element[scrollSize] + "px";
    };

    _proto.hide = function hide() {
      var _this2 = this;

      if (this._isTransitioning || !$(this._element).hasClass(ClassName$3.SHOW)) {
        return;
      }

      var startEvent = $.Event(Event$3.HIDE);
      $(this._element).trigger(startEvent);

      if (startEvent.isDefaultPrevented()) {
        return;
      }

      var dimension = this._getDimension();

      this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
      Util.reflow(this._element);
      $(this._element).addClass(ClassName$3.COLLAPSING).removeClass(ClassName$3.COLLAPSE).removeClass(ClassName$3.SHOW);
      var triggerArrayLength = this._triggerArray.length;

      if (triggerArrayLength > 0) {
        for (var i = 0; i < triggerArrayLength; i++) {
          var trigger = this._triggerArray[i];
          var selector = Util.getSelectorFromElement(trigger);

          if (selector !== null) {
            var $elem = $([].slice.call(document.querySelectorAll(selector)));

            if (!$elem.hasClass(ClassName$3.SHOW)) {
              $(trigger).addClass(ClassName$3.COLLAPSED).attr('aria-expanded', false);
            }
          }
        }
      }

      this.setTransitioning(true);

      var complete = function complete() {
        _this2.setTransitioning(false);

        $(_this2._element).removeClass(ClassName$3.COLLAPSING).addClass(ClassName$3.COLLAPSE).trigger(Event$3.HIDDEN);
      };

      this._element.style[dimension] = '';
      var transitionDuration = Util.getTransitionDurationFromElement(this._element);
      $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
    };

    _proto.setTransitioning = function setTransitioning(isTransitioning) {
      this._isTransitioning = isTransitioning;
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$3);
      this._config = null;
      this._parent = null;
      this._element = null;
      this._triggerArray = null;
      this._isTransitioning = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$1, config);
      config.toggle = Boolean(config.toggle); // Coerce string values

      Util.typeCheckConfig(NAME$3, config, DefaultType$1);
      return config;
    };

    _proto._getDimension = function _getDimension() {
      var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
      return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
    };

    _proto._getParent = function _getParent() {
      var _this3 = this;

      var parent;

      if (Util.isElement(this._config.parent)) {
        parent = this._config.parent; // It's a jQuery object

        if (typeof this._config.parent.jquery !== 'undefined') {
          parent = this._config.parent[0];
        }
      } else {
        parent = document.querySelector(this._config.parent);
      }

      var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
      var children = [].slice.call(parent.querySelectorAll(selector));
      $(children).each(function (i, element) {
        _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
      });
      return parent;
    };

    _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
      var isOpen = $(element).hasClass(ClassName$3.SHOW);

      if (triggerArray.length) {
        $(triggerArray).toggleClass(ClassName$3.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
      }
    } // Static
    ;

    Collapse._getTargetFromElement = function _getTargetFromElement(element) {
      var selector = Util.getSelectorFromElement(element);
      return selector ? document.querySelector(selector) : null;
    };

    Collapse._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY$3);

        var _config = _objectSpread({}, Default$1, $this.data(), typeof config === 'object' && config ? config : {});

        if (!data && _config.toggle && /show|hide/.test(config)) {
          _config.toggle = false;
        }

        if (!data) {
          data = new Collapse(this, _config);
          $this.data(DATA_KEY$3, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Collapse, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$3;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$1;
      }
    }]);

    return Collapse;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$3.CLICK_DATA_API, Selector$3.DATA_TOGGLE, function (event) {
    // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
    if (event.currentTarget.tagName === 'A') {
      event.preventDefault();
    }

    var $trigger = $(this);
    var selector = Util.getSelectorFromElement(this);
    var selectors = [].slice.call(document.querySelectorAll(selector));
    $(selectors).each(function () {
      var $target = $(this);
      var data = $target.data(DATA_KEY$3);
      var config = data ? 'toggle' : $trigger.data();

      Collapse._jQueryInterface.call($target, config);
    });
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$3] = Collapse._jQueryInterface;
  $.fn[NAME$3].Constructor = Collapse;

  $.fn[NAME$3].noConflict = function () {
    $.fn[NAME$3] = JQUERY_NO_CONFLICT$3;
    return Collapse._jQueryInterface;
  };

  /**!
   * @fileOverview Kickass library to create and place poppers near their reference elements.
   * @version 1.14.7
   * @license
   * Copyright (c) 2016 Federico Zivolo and contributors
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy
   * of this software and associated documentation files (the "Software"), to deal
   * in the Software without restriction, including without limitation the rights
   * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
   * copies of the Software, and to permit persons to whom the Software is
   * furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all
   * copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
   */
  var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';

  var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
  var timeoutDuration = 0;
  for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
    if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
      timeoutDuration = 1;
      break;
    }
  }

  function microtaskDebounce(fn) {
    var called = false;
    return function () {
      if (called) {
        return;
      }
      called = true;
      window.Promise.resolve().then(function () {
        called = false;
        fn();
      });
    };
  }

  function taskDebounce(fn) {
    var scheduled = false;
    return function () {
      if (!scheduled) {
        scheduled = true;
        setTimeout(function () {
          scheduled = false;
          fn();
        }, timeoutDuration);
      }
    };
  }

  var supportsMicroTasks = isBrowser && window.Promise;

  /**
  * Create a debounced version of a method, that's asynchronously deferred
  * but called in the minimum time possible.
  *
  * @method
  * @memberof Popper.Utils
  * @argument {Function} fn
  * @returns {Function}
  */
  var debounce = supportsMicroTasks ? microtaskDebounce : taskDebounce;

  /**
   * Check if the given variable is a function
   * @method
   * @memberof Popper.Utils
   * @argument {Any} functionToCheck - variable to check
   * @returns {Boolean} answer to: is a function?
   */
  function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
  }

  /**
   * Get CSS computed property of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Eement} element
   * @argument {String} property
   */
  function getStyleComputedProperty(element, property) {
    if (element.nodeType !== 1) {
      return [];
    }
    // NOTE: 1 DOM access here
    var window = element.ownerDocument.defaultView;
    var css = window.getComputedStyle(element, null);
    return property ? css[property] : css;
  }

  /**
   * Returns the parentNode or the host of the element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} parent
   */
  function getParentNode(element) {
    if (element.nodeName === 'HTML') {
      return element;
    }
    return element.parentNode || element.host;
  }

  /**
   * Returns the scrolling parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} scroll parent
   */
  function getScrollParent(element) {
    // Return body, `getScroll` will take care to get the correct `scrollTop` from it
    if (!element) {
      return document.body;
    }

    switch (element.nodeName) {
      case 'HTML':
      case 'BODY':
        return element.ownerDocument.body;
      case '#document':
        return element.body;
    }

    // Firefox want us to check `-x` and `-y` variations as well

    var _getStyleComputedProp = getStyleComputedProperty(element),
        overflow = _getStyleComputedProp.overflow,
        overflowX = _getStyleComputedProp.overflowX,
        overflowY = _getStyleComputedProp.overflowY;

    if (/(auto|scroll|overlay)/.test(overflow + overflowY + overflowX)) {
      return element;
    }

    return getScrollParent(getParentNode(element));
  }

  var isIE11 = isBrowser && !!(window.MSInputMethodContext && document.documentMode);
  var isIE10 = isBrowser && /MSIE 10/.test(navigator.userAgent);

  /**
   * Determines if the browser is Internet Explorer
   * @method
   * @memberof Popper.Utils
   * @param {Number} version to check
   * @returns {Boolean} isIE
   */
  function isIE(version) {
    if (version === 11) {
      return isIE11;
    }
    if (version === 10) {
      return isIE10;
    }
    return isIE11 || isIE10;
  }

  /**
   * Returns the offset parent of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} offset parent
   */
  function getOffsetParent(element) {
    if (!element) {
      return document.documentElement;
    }

    var noOffsetParent = isIE(10) ? document.body : null;

    // NOTE: 1 DOM access here
    var offsetParent = element.offsetParent || null;
    // Skip hidden elements which don't have an offsetParent
    while (offsetParent === noOffsetParent && element.nextElementSibling) {
      offsetParent = (element = element.nextElementSibling).offsetParent;
    }

    var nodeName = offsetParent && offsetParent.nodeName;

    if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
      return element ? element.ownerDocument.documentElement : document.documentElement;
    }

    // .offsetParent will return the closest TH, TD or TABLE in case
    // no offsetParent is present, I hate this job...
    if (['TH', 'TD', 'TABLE'].indexOf(offsetParent.nodeName) !== -1 && getStyleComputedProperty(offsetParent, 'position') === 'static') {
      return getOffsetParent(offsetParent);
    }

    return offsetParent;
  }

  function isOffsetContainer(element) {
    var nodeName = element.nodeName;

    if (nodeName === 'BODY') {
      return false;
    }
    return nodeName === 'HTML' || getOffsetParent(element.firstElementChild) === element;
  }

  /**
   * Finds the root node (document, shadowDOM root) of the given element
   * @method
   * @memberof Popper.Utils
   * @argument {Element} node
   * @returns {Element} root node
   */
  function getRoot(node) {
    if (node.parentNode !== null) {
      return getRoot(node.parentNode);
    }

    return node;
  }

  /**
   * Finds the offset parent common to the two provided nodes
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element1
   * @argument {Element} element2
   * @returns {Element} common offset parent
   */
  function findCommonOffsetParent(element1, element2) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
      return document.documentElement;
    }

    // Here we make sure to give as "start" the element that comes first in the DOM
    var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
    var start = order ? element1 : element2;
    var end = order ? element2 : element1;

    // Get common ancestor container
    var range = document.createRange();
    range.setStart(start, 0);
    range.setEnd(end, 0);
    var commonAncestorContainer = range.commonAncestorContainer;

    // Both nodes are inside #document

    if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
      if (isOffsetContainer(commonAncestorContainer)) {
        return commonAncestorContainer;
      }

      return getOffsetParent(commonAncestorContainer);
    }

    // one of the nodes is inside shadowDOM, find which one
    var element1root = getRoot(element1);
    if (element1root.host) {
      return findCommonOffsetParent(element1root.host, element2);
    } else {
      return findCommonOffsetParent(element1, getRoot(element2).host);
    }
  }

  /**
   * Gets the scroll value of the given element in the given side (top and left)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {String} side `top` or `left`
   * @returns {number} amount of scrolled pixels
   */
  function getScroll(element) {
    var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';

    var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
    var nodeName = element.nodeName;

    if (nodeName === 'BODY' || nodeName === 'HTML') {
      var html = element.ownerDocument.documentElement;
      var scrollingElement = element.ownerDocument.scrollingElement || html;
      return scrollingElement[upperSide];
    }

    return element[upperSide];
  }

  /*
   * Sum or subtract the element scroll values (left and top) from a given rect object
   * @method
   * @memberof Popper.Utils
   * @param {Object} rect - Rect object you want to change
   * @param {HTMLElement} element - The element from the function reads the scroll values
   * @param {Boolean} subtract - set to true if you want to subtract the scroll values
   * @return {Object} rect - The modifier rect object
   */
  function includeScroll(rect, element) {
    var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var scrollTop = getScroll(element, 'top');
    var scrollLeft = getScroll(element, 'left');
    var modifier = subtract ? -1 : 1;
    rect.top += scrollTop * modifier;
    rect.bottom += scrollTop * modifier;
    rect.left += scrollLeft * modifier;
    rect.right += scrollLeft * modifier;
    return rect;
  }

  /*
   * Helper to detect borders of a given element
   * @method
   * @memberof Popper.Utils
   * @param {CSSStyleDeclaration} styles
   * Result of `getStyleComputedProperty` on the given element
   * @param {String} axis - `x` or `y`
   * @return {number} borders - The borders size of the given axis
   */

  function getBordersSize(styles, axis) {
    var sideA = axis === 'x' ? 'Left' : 'Top';
    var sideB = sideA === 'Left' ? 'Right' : 'Bottom';

    return parseFloat(styles['border' + sideA + 'Width'], 10) + parseFloat(styles['border' + sideB + 'Width'], 10);
  }

  function getSize(axis, body, html, computedStyle) {
    return Math.max(body['offset' + axis], body['scroll' + axis], html['client' + axis], html['offset' + axis], html['scroll' + axis], isIE(10) ? parseInt(html['offset' + axis]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')]) + parseInt(computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')]) : 0);
  }

  function getWindowSizes(document) {
    var body = document.body;
    var html = document.documentElement;
    var computedStyle = isIE(10) && getComputedStyle(html);

    return {
      height: getSize('Height', body, html, computedStyle),
      width: getSize('Width', body, html, computedStyle)
    };
  }

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();





  var defineProperty = function (obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  };

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  /**
   * Given element offsets, generate an output similar to getBoundingClientRect
   * @method
   * @memberof Popper.Utils
   * @argument {Object} offsets
   * @returns {Object} ClientRect like output
   */
  function getClientRect(offsets) {
    return _extends({}, offsets, {
      right: offsets.left + offsets.width,
      bottom: offsets.top + offsets.height
    });
  }

  /**
   * Get bounding client rect of given element
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} element
   * @return {Object} client rect
   */
  function getBoundingClientRect(element) {
    var rect = {};

    // IE10 10 FIX: Please, don't ask, the element isn't
    // considered in DOM in some circumstances...
    // This isn't reproducible in IE10 compatibility mode of IE11
    try {
      if (isIE(10)) {
        rect = element.getBoundingClientRect();
        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        rect.top += scrollTop;
        rect.left += scrollLeft;
        rect.bottom += scrollTop;
        rect.right += scrollLeft;
      } else {
        rect = element.getBoundingClientRect();
      }
    } catch (e) {}

    var result = {
      left: rect.left,
      top: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    };

    // subtract scrollbar size from sizes
    var sizes = element.nodeName === 'HTML' ? getWindowSizes(element.ownerDocument) : {};
    var width = sizes.width || element.clientWidth || result.right - result.left;
    var height = sizes.height || element.clientHeight || result.bottom - result.top;

    var horizScrollbar = element.offsetWidth - width;
    var vertScrollbar = element.offsetHeight - height;

    // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
    // we make this check conditional for performance reasons
    if (horizScrollbar || vertScrollbar) {
      var styles = getStyleComputedProperty(element);
      horizScrollbar -= getBordersSize(styles, 'x');
      vertScrollbar -= getBordersSize(styles, 'y');

      result.width -= horizScrollbar;
      result.height -= vertScrollbar;
    }

    return getClientRect(result);
  }

  function getOffsetRectRelativeToArbitraryNode(children, parent) {
    var fixedPosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    var isIE10 = isIE(10);
    var isHTML = parent.nodeName === 'HTML';
    var childrenRect = getBoundingClientRect(children);
    var parentRect = getBoundingClientRect(parent);
    var scrollParent = getScrollParent(children);

    var styles = getStyleComputedProperty(parent);
    var borderTopWidth = parseFloat(styles.borderTopWidth, 10);
    var borderLeftWidth = parseFloat(styles.borderLeftWidth, 10);

    // In cases where the parent is fixed, we must ignore negative scroll in offset calc
    if (fixedPosition && isHTML) {
      parentRect.top = Math.max(parentRect.top, 0);
      parentRect.left = Math.max(parentRect.left, 0);
    }
    var offsets = getClientRect({
      top: childrenRect.top - parentRect.top - borderTopWidth,
      left: childrenRect.left - parentRect.left - borderLeftWidth,
      width: childrenRect.width,
      height: childrenRect.height
    });
    offsets.marginTop = 0;
    offsets.marginLeft = 0;

    // Subtract margins of documentElement in case it's being used as parent
    // we do this only on HTML because it's the only element that behaves
    // differently when margins are applied to it. The margins are included in
    // the box of the documentElement, in the other cases not.
    if (!isIE10 && isHTML) {
      var marginTop = parseFloat(styles.marginTop, 10);
      var marginLeft = parseFloat(styles.marginLeft, 10);

      offsets.top -= borderTopWidth - marginTop;
      offsets.bottom -= borderTopWidth - marginTop;
      offsets.left -= borderLeftWidth - marginLeft;
      offsets.right -= borderLeftWidth - marginLeft;

      // Attach marginTop and marginLeft because in some circumstances we may need them
      offsets.marginTop = marginTop;
      offsets.marginLeft = marginLeft;
    }

    if (isIE10 && !fixedPosition ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
      offsets = includeScroll(offsets, parent);
    }

    return offsets;
  }

  function getViewportOffsetRectRelativeToArtbitraryNode(element) {
    var excludeScroll = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var html = element.ownerDocument.documentElement;
    var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
    var width = Math.max(html.clientWidth, window.innerWidth || 0);
    var height = Math.max(html.clientHeight, window.innerHeight || 0);

    var scrollTop = !excludeScroll ? getScroll(html) : 0;
    var scrollLeft = !excludeScroll ? getScroll(html, 'left') : 0;

    var offset = {
      top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
      left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
      width: width,
      height: height
    };

    return getClientRect(offset);
  }

  /**
   * Check if the given element is fixed or is inside a fixed parent
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @argument {Element} customContainer
   * @returns {Boolean} answer to "isFixed?"
   */
  function isFixed(element) {
    var nodeName = element.nodeName;
    if (nodeName === 'BODY' || nodeName === 'HTML') {
      return false;
    }
    if (getStyleComputedProperty(element, 'position') === 'fixed') {
      return true;
    }
    var parentNode = getParentNode(element);
    if (!parentNode) {
      return false;
    }
    return isFixed(parentNode);
  }

  /**
   * Finds the first parent of an element that has a transformed property defined
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Element} first transformed parent or documentElement
   */

  function getFixedPositionOffsetParent(element) {
    // This check is needed to avoid errors in case one of the elements isn't defined for any reason
    if (!element || !element.parentElement || isIE()) {
      return document.documentElement;
    }
    var el = element.parentElement;
    while (el && getStyleComputedProperty(el, 'transform') === 'none') {
      el = el.parentElement;
    }
    return el || document.documentElement;
  }

  /**
   * Computed the boundaries limits and return them
   * @method
   * @memberof Popper.Utils
   * @param {HTMLElement} popper
   * @param {HTMLElement} reference
   * @param {number} padding
   * @param {HTMLElement} boundariesElement - Element used to define the boundaries
   * @param {Boolean} fixedPosition - Is in fixed position mode
   * @returns {Object} Coordinates of the boundaries
   */
  function getBoundaries(popper, reference, padding, boundariesElement) {
    var fixedPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

    // NOTE: 1 DOM access here

    var boundaries = { top: 0, left: 0 };
    var offsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);

    // Handle viewport case
    if (boundariesElement === 'viewport') {
      boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent, fixedPosition);
    } else {
      // Handle other cases based on DOM element used as boundaries
      var boundariesNode = void 0;
      if (boundariesElement === 'scrollParent') {
        boundariesNode = getScrollParent(getParentNode(reference));
        if (boundariesNode.nodeName === 'BODY') {
          boundariesNode = popper.ownerDocument.documentElement;
        }
      } else if (boundariesElement === 'window') {
        boundariesNode = popper.ownerDocument.documentElement;
      } else {
        boundariesNode = boundariesElement;
      }

      var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent, fixedPosition);

      // In case of HTML, we need a different computation
      if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
        var _getWindowSizes = getWindowSizes(popper.ownerDocument),
            height = _getWindowSizes.height,
            width = _getWindowSizes.width;

        boundaries.top += offsets.top - offsets.marginTop;
        boundaries.bottom = height + offsets.top;
        boundaries.left += offsets.left - offsets.marginLeft;
        boundaries.right = width + offsets.left;
      } else {
        // for all the other DOM elements, this one is good
        boundaries = offsets;
      }
    }

    // Add paddings
    padding = padding || 0;
    var isPaddingNumber = typeof padding === 'number';
    boundaries.left += isPaddingNumber ? padding : padding.left || 0;
    boundaries.top += isPaddingNumber ? padding : padding.top || 0;
    boundaries.right -= isPaddingNumber ? padding : padding.right || 0;
    boundaries.bottom -= isPaddingNumber ? padding : padding.bottom || 0;

    return boundaries;
  }

  function getArea(_ref) {
    var width = _ref.width,
        height = _ref.height;

    return width * height;
  }

  /**
   * Utility used to transform the `auto` placement to the placement with more
   * available space.
   * @method
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
    var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

    if (placement.indexOf('auto') === -1) {
      return placement;
    }

    var boundaries = getBoundaries(popper, reference, padding, boundariesElement);

    var rects = {
      top: {
        width: boundaries.width,
        height: refRect.top - boundaries.top
      },
      right: {
        width: boundaries.right - refRect.right,
        height: boundaries.height
      },
      bottom: {
        width: boundaries.width,
        height: boundaries.bottom - refRect.bottom
      },
      left: {
        width: refRect.left - boundaries.left,
        height: boundaries.height
      }
    };

    var sortedAreas = Object.keys(rects).map(function (key) {
      return _extends({
        key: key
      }, rects[key], {
        area: getArea(rects[key])
      });
    }).sort(function (a, b) {
      return b.area - a.area;
    });

    var filteredAreas = sortedAreas.filter(function (_ref2) {
      var width = _ref2.width,
          height = _ref2.height;
      return width >= popper.clientWidth && height >= popper.clientHeight;
    });

    var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;

    var variation = placement.split('-')[1];

    return computedPlacement + (variation ? '-' + variation : '');
  }

  /**
   * Get offsets to the reference element
   * @method
   * @memberof Popper.Utils
   * @param {Object} state
   * @param {Element} popper - the popper element
   * @param {Element} reference - the reference element (the popper will be relative to this)
   * @param {Element} fixedPosition - is in fixed position mode
   * @returns {Object} An object containing the offsets which will be applied to the popper
   */
  function getReferenceOffsets(state, popper, reference) {
    var fixedPosition = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

    var commonOffsetParent = fixedPosition ? getFixedPositionOffsetParent(popper) : findCommonOffsetParent(popper, reference);
    return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent, fixedPosition);
  }

  /**
   * Get the outer sizes of the given element (offset size + margins)
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element
   * @returns {Object} object containing width and height properties
   */
  function getOuterSizes(element) {
    var window = element.ownerDocument.defaultView;
    var styles = window.getComputedStyle(element);
    var x = parseFloat(styles.marginTop || 0) + parseFloat(styles.marginBottom || 0);
    var y = parseFloat(styles.marginLeft || 0) + parseFloat(styles.marginRight || 0);
    var result = {
      width: element.offsetWidth + y,
      height: element.offsetHeight + x
    };
    return result;
  }

  /**
   * Get the opposite placement of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement
   * @returns {String} flipped placement
   */
  function getOppositePlacement(placement) {
    var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
    return placement.replace(/left|right|bottom|top/g, function (matched) {
      return hash[matched];
    });
  }

  /**
   * Get offsets to the popper
   * @method
   * @memberof Popper.Utils
   * @param {Object} position - CSS position the Popper will get applied
   * @param {HTMLElement} popper - the popper element
   * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
   * @param {String} placement - one of the valid placement options
   * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
   */
  function getPopperOffsets(popper, referenceOffsets, placement) {
    placement = placement.split('-')[0];

    // Get popper node sizes
    var popperRect = getOuterSizes(popper);

    // Add position, width and height to our offsets object
    var popperOffsets = {
      width: popperRect.width,
      height: popperRect.height
    };

    // depending by the popper placement we have to compute its offsets slightly differently
    var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
    var mainSide = isHoriz ? 'top' : 'left';
    var secondarySide = isHoriz ? 'left' : 'top';
    var measurement = isHoriz ? 'height' : 'width';
    var secondaryMeasurement = !isHoriz ? 'height' : 'width';

    popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
    if (placement === secondarySide) {
      popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
    } else {
      popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
    }

    return popperOffsets;
  }

  /**
   * Mimics the `find` method of Array
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function find(arr, check) {
    // use native find if supported
    if (Array.prototype.find) {
      return arr.find(check);
    }

    // use `filter` to obtain the same behavior of `find`
    return arr.filter(check)[0];
  }

  /**
   * Return the index of the matching object
   * @method
   * @memberof Popper.Utils
   * @argument {Array} arr
   * @argument prop
   * @argument value
   * @returns index or -1
   */
  function findIndex(arr, prop, value) {
    // use native findIndex if supported
    if (Array.prototype.findIndex) {
      return arr.findIndex(function (cur) {
        return cur[prop] === value;
      });
    }

    // use `find` + `indexOf` if `findIndex` isn't supported
    var match = find(arr, function (obj) {
      return obj[prop] === value;
    });
    return arr.indexOf(match);
  }

  /**
   * Loop trough the list of modifiers and run them in order,
   * each of them will then edit the data object.
   * @method
   * @memberof Popper.Utils
   * @param {dataObject} data
   * @param {Array} modifiers
   * @param {String} ends - Optional modifier name used as stopper
   * @returns {dataObject}
   */
  function runModifiers(modifiers, data, ends) {
    var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));

    modifiersToRun.forEach(function (modifier) {
      if (modifier['function']) {
        // eslint-disable-line dot-notation
        console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
      }
      var fn = modifier['function'] || modifier.fn; // eslint-disable-line dot-notation
      if (modifier.enabled && isFunction(fn)) {
        // Add properties to offsets to make them a complete clientRect object
        // we do this before each modifier to make sure the previous one doesn't
        // mess with these values
        data.offsets.popper = getClientRect(data.offsets.popper);
        data.offsets.reference = getClientRect(data.offsets.reference);

        data = fn(data, modifier);
      }
    });

    return data;
  }

  /**
   * Updates the position of the popper, computing the new offsets and applying
   * the new style.<br />
   * Prefer `scheduleUpdate` over `update` because of performance reasons.
   * @method
   * @memberof Popper
   */
  function update() {
    // if popper is destroyed, don't perform any further update
    if (this.state.isDestroyed) {
      return;
    }

    var data = {
      instance: this,
      styles: {},
      arrowStyles: {},
      attributes: {},
      flipped: false,
      offsets: {}
    };

    // compute reference element offsets
    data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference, this.options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);

    // store the computed placement inside `originalPlacement`
    data.originalPlacement = data.placement;

    data.positionFixed = this.options.positionFixed;

    // compute the popper offsets
    data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);

    data.offsets.popper.position = this.options.positionFixed ? 'fixed' : 'absolute';

    // run the modifiers
    data = runModifiers(this.modifiers, data);

    // the first `update` will call `onCreate` callback
    // the other ones will call `onUpdate` callback
    if (!this.state.isCreated) {
      this.state.isCreated = true;
      this.options.onCreate(data);
    } else {
      this.options.onUpdate(data);
    }
  }

  /**
   * Helper used to know if the given modifier is enabled.
   * @method
   * @memberof Popper.Utils
   * @returns {Boolean}
   */
  function isModifierEnabled(modifiers, modifierName) {
    return modifiers.some(function (_ref) {
      var name = _ref.name,
          enabled = _ref.enabled;
      return enabled && name === modifierName;
    });
  }

  /**
   * Get the prefixed supported property name
   * @method
   * @memberof Popper.Utils
   * @argument {String} property (camelCase)
   * @returns {String} prefixed property (camelCase or PascalCase, depending on the vendor prefix)
   */
  function getSupportedPropertyName(property) {
    var prefixes = [false, 'ms', 'Webkit', 'Moz', 'O'];
    var upperProp = property.charAt(0).toUpperCase() + property.slice(1);

    for (var i = 0; i < prefixes.length; i++) {
      var prefix = prefixes[i];
      var toCheck = prefix ? '' + prefix + upperProp : property;
      if (typeof document.body.style[toCheck] !== 'undefined') {
        return toCheck;
      }
    }
    return null;
  }

  /**
   * Destroys the popper.
   * @method
   * @memberof Popper
   */
  function destroy() {
    this.state.isDestroyed = true;

    // touch DOM only if `applyStyle` modifier is enabled
    if (isModifierEnabled(this.modifiers, 'applyStyle')) {
      this.popper.removeAttribute('x-placement');
      this.popper.style.position = '';
      this.popper.style.top = '';
      this.popper.style.left = '';
      this.popper.style.right = '';
      this.popper.style.bottom = '';
      this.popper.style.willChange = '';
      this.popper.style[getSupportedPropertyName('transform')] = '';
    }

    this.disableEventListeners();

    // remove the popper if user explicity asked for the deletion on destroy
    // do not use `remove` because IE11 doesn't support it
    if (this.options.removeOnDestroy) {
      this.popper.parentNode.removeChild(this.popper);
    }
    return this;
  }

  /**
   * Get the window associated with the element
   * @argument {Element} element
   * @returns {Window}
   */
  function getWindow(element) {
    var ownerDocument = element.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView : window;
  }

  function attachToScrollParents(scrollParent, event, callback, scrollParents) {
    var isBody = scrollParent.nodeName === 'BODY';
    var target = isBody ? scrollParent.ownerDocument.defaultView : scrollParent;
    target.addEventListener(event, callback, { passive: true });

    if (!isBody) {
      attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
    }
    scrollParents.push(target);
  }

  /**
   * Setup needed event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function setupEventListeners(reference, options, state, updateBound) {
    // Resize event listener on window
    state.updateBound = updateBound;
    getWindow(reference).addEventListener('resize', state.updateBound, { passive: true });

    // Scroll event listener on scroll parents
    var scrollElement = getScrollParent(reference);
    attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
    state.scrollElement = scrollElement;
    state.eventsEnabled = true;

    return state;
  }

  /**
   * It will add resize/scroll events and start recalculating
   * position of the popper element when they are triggered.
   * @method
   * @memberof Popper
   */
  function enableEventListeners() {
    if (!this.state.eventsEnabled) {
      this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
    }
  }

  /**
   * Remove event listeners used to update the popper position
   * @method
   * @memberof Popper.Utils
   * @private
   */
  function removeEventListeners(reference, state) {
    // Remove resize event listener on window
    getWindow(reference).removeEventListener('resize', state.updateBound);

    // Remove scroll event listener on scroll parents
    state.scrollParents.forEach(function (target) {
      target.removeEventListener('scroll', state.updateBound);
    });

    // Reset state
    state.updateBound = null;
    state.scrollParents = [];
    state.scrollElement = null;
    state.eventsEnabled = false;
    return state;
  }

  /**
   * It will remove resize/scroll events and won't recalculate popper position
   * when they are triggered. It also won't trigger `onUpdate` callback anymore,
   * unless you call `update` method manually.
   * @method
   * @memberof Popper
   */
  function disableEventListeners() {
    if (this.state.eventsEnabled) {
      cancelAnimationFrame(this.scheduleUpdate);
      this.state = removeEventListeners(this.reference, this.state);
    }
  }

  /**
   * Tells if a given input is a number
   * @method
   * @memberof Popper.Utils
   * @param {*} input to check
   * @return {Boolean}
   */
  function isNumeric(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
  }

  /**
   * Set the style to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the style to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setStyles(element, styles) {
    Object.keys(styles).forEach(function (prop) {
      var unit = '';
      // add unit if the value is numeric and is one of the following
      if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
        unit = 'px';
      }
      element.style[prop] = styles[prop] + unit;
    });
  }

  /**
   * Set the attributes to the given popper
   * @method
   * @memberof Popper.Utils
   * @argument {Element} element - Element to apply the attributes to
   * @argument {Object} styles
   * Object with a list of properties and values which will be applied to the element
   */
  function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(function (prop) {
      var value = attributes[prop];
      if (value !== false) {
        element.setAttribute(prop, attributes[prop]);
      } else {
        element.removeAttribute(prop);
      }
    });
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} data.styles - List of style properties - values to apply to popper element
   * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The same data object
   */
  function applyStyle(data) {
    // any property present in `data.styles` will be applied to the popper,
    // in this way we can make the 3rd party modifiers add custom styles to it
    // Be aware, modifiers could override the properties defined in the previous
    // lines of this modifier!
    setStyles(data.instance.popper, data.styles);

    // any property present in `data.attributes` will be applied to the popper,
    // they will be set as HTML attributes of the element
    setAttributes(data.instance.popper, data.attributes);

    // if arrowElement is defined and arrowStyles has some properties
    if (data.arrowElement && Object.keys(data.arrowStyles).length) {
      setStyles(data.arrowElement, data.arrowStyles);
    }

    return data;
  }

  /**
   * Set the x-placement attribute before everything else because it could be used
   * to add margins to the popper margins needs to be calculated to get the
   * correct popper offsets.
   * @method
   * @memberof Popper.modifiers
   * @param {HTMLElement} reference - The reference element used to position the popper
   * @param {HTMLElement} popper - The HTML element used as popper
   * @param {Object} options - Popper.js options
   */
  function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
    // compute reference element offsets
    var referenceOffsets = getReferenceOffsets(state, popper, reference, options.positionFixed);

    // compute auto placement, store placement inside the data object,
    // modifiers will be able to edit `placement` if needed
    // and refer to originalPlacement to know the original value
    var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);

    popper.setAttribute('x-placement', placement);

    // Apply `position` to popper before anything else because
    // without the position applied we can't guarantee correct computations
    setStyles(popper, { position: options.positionFixed ? 'fixed' : 'absolute' });

    return options;
  }

  /**
   * @function
   * @memberof Popper.Utils
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Boolean} shouldRound - If the offsets should be rounded at all
   * @returns {Object} The popper's position offsets rounded
   *
   * The tale of pixel-perfect positioning. It's still not 100% perfect, but as
   * good as it can be within reason.
   * Discussion here: https://github.com/FezVrasta/popper.js/pull/715
   *
   * Low DPI screens cause a popper to be blurry if not using full pixels (Safari
   * as well on High DPI screens).
   *
   * Firefox prefers no rounding for positioning and does not have blurriness on
   * high DPI screens.
   *
   * Only horizontal placement and left/right values need to be considered.
   */
  function getRoundedOffsets(data, shouldRound) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;
    var round = Math.round,
        floor = Math.floor;

    var noRound = function noRound(v) {
      return v;
    };

    var referenceWidth = round(reference.width);
    var popperWidth = round(popper.width);

    var isVertical = ['left', 'right'].indexOf(data.placement) !== -1;
    var isVariation = data.placement.indexOf('-') !== -1;
    var sameWidthParity = referenceWidth % 2 === popperWidth % 2;
    var bothOddWidth = referenceWidth % 2 === 1 && popperWidth % 2 === 1;

    var horizontalToInteger = !shouldRound ? noRound : isVertical || isVariation || sameWidthParity ? round : floor;
    var verticalToInteger = !shouldRound ? noRound : round;

    return {
      left: horizontalToInteger(bothOddWidth && !isVariation && shouldRound ? popper.left - 1 : popper.left),
      top: verticalToInteger(popper.top),
      bottom: verticalToInteger(popper.bottom),
      right: horizontalToInteger(popper.right)
    };
  }

  var isFirefox = isBrowser && /Firefox/i.test(navigator.userAgent);

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function computeStyle(data, options) {
    var x = options.x,
        y = options.y;
    var popper = data.offsets.popper;

    // Remove this legacy support in Popper.js v2

    var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'applyStyle';
    }).gpuAcceleration;
    if (legacyGpuAccelerationOption !== undefined) {
      console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
    }
    var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;

    var offsetParent = getOffsetParent(data.instance.popper);
    var offsetParentRect = getBoundingClientRect(offsetParent);

    // Styles
    var styles = {
      position: popper.position
    };

    var offsets = getRoundedOffsets(data, window.devicePixelRatio < 2 || !isFirefox);

    var sideA = x === 'bottom' ? 'top' : 'bottom';
    var sideB = y === 'right' ? 'left' : 'right';

    // if gpuAcceleration is set to `true` and transform is supported,
    //  we use `translate3d` to apply the position to the popper we
    // automatically use the supported prefixed version if needed
    var prefixedProperty = getSupportedPropertyName('transform');

    // now, let's make a step back and look at this code closely (wtf?)
    // If the content of the popper grows once it's been positioned, it
    // may happen that the popper gets misplaced because of the new content
    // overflowing its reference element
    // To avoid this problem, we provide two options (x and y), which allow
    // the consumer to define the offset origin.
    // If we position a popper on top of a reference element, we can set
    // `x` to `top` to make the popper grow towards its top instead of
    // its bottom.
    var left = void 0,
        top = void 0;
    if (sideA === 'bottom') {
      // when offsetParent is <html> the positioning is relative to the bottom of the screen (excluding the scrollbar)
      // and not the bottom of the html element
      if (offsetParent.nodeName === 'HTML') {
        top = -offsetParent.clientHeight + offsets.bottom;
      } else {
        top = -offsetParentRect.height + offsets.bottom;
      }
    } else {
      top = offsets.top;
    }
    if (sideB === 'right') {
      if (offsetParent.nodeName === 'HTML') {
        left = -offsetParent.clientWidth + offsets.right;
      } else {
        left = -offsetParentRect.width + offsets.right;
      }
    } else {
      left = offsets.left;
    }
    if (gpuAcceleration && prefixedProperty) {
      styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
      styles[sideA] = 0;
      styles[sideB] = 0;
      styles.willChange = 'transform';
    } else {
      // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
      var invertTop = sideA === 'bottom' ? -1 : 1;
      var invertLeft = sideB === 'right' ? -1 : 1;
      styles[sideA] = top * invertTop;
      styles[sideB] = left * invertLeft;
      styles.willChange = sideA + ', ' + sideB;
    }

    // Attributes
    var attributes = {
      'x-placement': data.placement
    };

    // Update `data` attributes, styles and arrowStyles
    data.attributes = _extends({}, attributes, data.attributes);
    data.styles = _extends({}, styles, data.styles);
    data.arrowStyles = _extends({}, data.offsets.arrow, data.arrowStyles);

    return data;
  }

  /**
   * Helper used to know if the given modifier depends from another one.<br />
   * It checks if the needed modifier is listed and enabled.
   * @method
   * @memberof Popper.Utils
   * @param {Array} modifiers - list of modifiers
   * @param {String} requestingName - name of requesting modifier
   * @param {String} requestedName - name of requested modifier
   * @returns {Boolean}
   */
  function isModifierRequired(modifiers, requestingName, requestedName) {
    var requesting = find(modifiers, function (_ref) {
      var name = _ref.name;
      return name === requestingName;
    });

    var isRequired = !!requesting && modifiers.some(function (modifier) {
      return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
    });

    if (!isRequired) {
      var _requesting = '`' + requestingName + '`';
      var requested = '`' + requestedName + '`';
      console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
    }
    return isRequired;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function arrow(data, options) {
    var _data$offsets$arrow;

    // arrow depends on keepTogether in order to work
    if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
      return data;
    }

    var arrowElement = options.element;

    // if arrowElement is a string, suppose it's a CSS selector
    if (typeof arrowElement === 'string') {
      arrowElement = data.instance.popper.querySelector(arrowElement);

      // if arrowElement is not found, don't run the modifier
      if (!arrowElement) {
        return data;
      }
    } else {
      // if the arrowElement isn't a query selector we must check that the
      // provided DOM node is child of its popper node
      if (!data.instance.popper.contains(arrowElement)) {
        console.warn('WARNING: `arrow.element` must be child of its popper element!');
        return data;
      }
    }

    var placement = data.placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isVertical = ['left', 'right'].indexOf(placement) !== -1;

    var len = isVertical ? 'height' : 'width';
    var sideCapitalized = isVertical ? 'Top' : 'Left';
    var side = sideCapitalized.toLowerCase();
    var altSide = isVertical ? 'left' : 'top';
    var opSide = isVertical ? 'bottom' : 'right';
    var arrowElementSize = getOuterSizes(arrowElement)[len];

    //
    // extends keepTogether behavior making sure the popper and its
    // reference have enough pixels in conjunction
    //

    // top/left side
    if (reference[opSide] - arrowElementSize < popper[side]) {
      data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
    }
    // bottom/right side
    if (reference[side] + arrowElementSize > popper[opSide]) {
      data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
    }
    data.offsets.popper = getClientRect(data.offsets.popper);

    // compute center of the popper
    var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;

    // Compute the sideValue using the updated popper offsets
    // take popper margin in account because we don't have this info available
    var css = getStyleComputedProperty(data.instance.popper);
    var popperMarginSide = parseFloat(css['margin' + sideCapitalized], 10);
    var popperBorderSide = parseFloat(css['border' + sideCapitalized + 'Width'], 10);
    var sideValue = center - data.offsets.popper[side] - popperMarginSide - popperBorderSide;

    // prevent arrowElement from being placed not contiguously to its popper
    sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);

    data.arrowElement = arrowElement;
    data.offsets.arrow = (_data$offsets$arrow = {}, defineProperty(_data$offsets$arrow, side, Math.round(sideValue)), defineProperty(_data$offsets$arrow, altSide, ''), _data$offsets$arrow);

    return data;
  }

  /**
   * Get the opposite placement variation of the given one
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement variation
   * @returns {String} flipped placement variation
   */
  function getOppositeVariation(variation) {
    if (variation === 'end') {
      return 'start';
    } else if (variation === 'start') {
      return 'end';
    }
    return variation;
  }

  /**
   * List of accepted placements to use as values of the `placement` option.<br />
   * Valid placements are:
   * - `auto`
   * - `top`
   * - `right`
   * - `bottom`
   * - `left`
   *
   * Each placement can have a variation from this list:
   * - `-start`
   * - `-end`
   *
   * Variations are interpreted easily if you think of them as the left to right
   * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
   * is right.<br />
   * Vertically (`left` and `right`), `start` is top and `end` is bottom.
   *
   * Some valid examples are:
   * - `top-end` (on top of reference, right aligned)
   * - `right-start` (on right of reference, top aligned)
   * - `bottom` (on bottom, centered)
   * - `auto-end` (on the side with more space available, alignment depends by placement)
   *
   * @static
   * @type {Array}
   * @enum {String}
   * @readonly
   * @method placements
   * @memberof Popper
   */
  var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];

  // Get rid of `auto` `auto-start` and `auto-end`
  var validPlacements = placements.slice(3);

  /**
   * Given an initial placement, returns all the subsequent placements
   * clockwise (or counter-clockwise).
   *
   * @method
   * @memberof Popper.Utils
   * @argument {String} placement - A valid placement (it accepts variations)
   * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
   * @returns {Array} placements including their variations
   */
  function clockwise(placement) {
    var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var index = validPlacements.indexOf(placement);
    var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
    return counter ? arr.reverse() : arr;
  }

  var BEHAVIORS = {
    FLIP: 'flip',
    CLOCKWISE: 'clockwise',
    COUNTERCLOCKWISE: 'counterclockwise'
  };

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function flip(data, options) {
    // if `inner` modifier is enabled, we can't use the `flip` modifier
    if (isModifierEnabled(data.instance.modifiers, 'inner')) {
      return data;
    }

    if (data.flipped && data.placement === data.originalPlacement) {
      // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
      return data;
    }

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement, data.positionFixed);

    var placement = data.placement.split('-')[0];
    var placementOpposite = getOppositePlacement(placement);
    var variation = data.placement.split('-')[1] || '';

    var flipOrder = [];

    switch (options.behavior) {
      case BEHAVIORS.FLIP:
        flipOrder = [placement, placementOpposite];
        break;
      case BEHAVIORS.CLOCKWISE:
        flipOrder = clockwise(placement);
        break;
      case BEHAVIORS.COUNTERCLOCKWISE:
        flipOrder = clockwise(placement, true);
        break;
      default:
        flipOrder = options.behavior;
    }

    flipOrder.forEach(function (step, index) {
      if (placement !== step || flipOrder.length === index + 1) {
        return data;
      }

      placement = data.placement.split('-')[0];
      placementOpposite = getOppositePlacement(placement);

      var popperOffsets = data.offsets.popper;
      var refOffsets = data.offsets.reference;

      // using floor because the reference offsets may contain decimals we are not going to consider here
      var floor = Math.floor;
      var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);

      var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
      var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
      var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
      var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);

      var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;

      // flip the variation if required
      var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
      var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);

      if (overlapsRef || overflowsBoundaries || flippedVariation) {
        // this boolean to detect any flip loop
        data.flipped = true;

        if (overlapsRef || overflowsBoundaries) {
          placement = flipOrder[index + 1];
        }

        if (flippedVariation) {
          variation = getOppositeVariation(variation);
        }

        data.placement = placement + (variation ? '-' + variation : '');

        // this object contains `position`, we want to preserve it along with
        // any additional property we may add in the future
        data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));

        data = runModifiers(data.instance.modifiers, data, 'flip');
      }
    });
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function keepTogether(data) {
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var placement = data.placement.split('-')[0];
    var floor = Math.floor;
    var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
    var side = isVertical ? 'right' : 'bottom';
    var opSide = isVertical ? 'left' : 'top';
    var measurement = isVertical ? 'width' : 'height';

    if (popper[side] < floor(reference[opSide])) {
      data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
    }
    if (popper[opSide] > floor(reference[side])) {
      data.offsets.popper[opSide] = floor(reference[side]);
    }

    return data;
  }

  /**
   * Converts a string containing value + unit into a px value number
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} str - Value + unit string
   * @argument {String} measurement - `height` or `width`
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @returns {Number|String}
   * Value in pixels, or original string if no values were extracted
   */
  function toValue(str, measurement, popperOffsets, referenceOffsets) {
    // separate value from unit
    var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
    var value = +split[1];
    var unit = split[2];

    // If it's not a number it's an operator, I guess
    if (!value) {
      return str;
    }

    if (unit.indexOf('%') === 0) {
      var element = void 0;
      switch (unit) {
        case '%p':
          element = popperOffsets;
          break;
        case '%':
        case '%r':
        default:
          element = referenceOffsets;
      }

      var rect = getClientRect(element);
      return rect[measurement] / 100 * value;
    } else if (unit === 'vh' || unit === 'vw') {
      // if is a vh or vw, we calculate the size based on the viewport
      var size = void 0;
      if (unit === 'vh') {
        size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
      } else {
        size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
      }
      return size / 100 * value;
    } else {
      // if is an explicit pixel unit, we get rid of the unit and keep the value
      // if is an implicit unit, it's px, and we return just the value
      return value;
    }
  }

  /**
   * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
   * @function
   * @memberof {modifiers~offset}
   * @private
   * @argument {String} offset
   * @argument {Object} popperOffsets
   * @argument {Object} referenceOffsets
   * @argument {String} basePlacement
   * @returns {Array} a two cells array with x and y offsets in numbers
   */
  function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
    var offsets = [0, 0];

    // Use height if placement is left or right and index is 0 otherwise use width
    // in this way the first offset will use an axis and the second one
    // will use the other one
    var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;

    // Split the offset string to obtain a list of values and operands
    // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
    var fragments = offset.split(/(\+|\-)/).map(function (frag) {
      return frag.trim();
    });

    // Detect if the offset string contains a pair of values or a single one
    // they could be separated by comma or space
    var divider = fragments.indexOf(find(fragments, function (frag) {
      return frag.search(/,|\s/) !== -1;
    }));

    if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
      console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
    }

    // If divider is found, we divide the list of values and operands to divide
    // them by ofset X and Y.
    var splitRegex = /\s*,\s*|\s+/;
    var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];

    // Convert the values with units to absolute pixels to allow our computations
    ops = ops.map(function (op, index) {
      // Most of the units rely on the orientation of the popper
      var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
      var mergeWithPrevious = false;
      return op
      // This aggregates any `+` or `-` sign that aren't considered operators
      // e.g.: 10 + +5 => [10, +, +5]
      .reduce(function (a, b) {
        if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
          a[a.length - 1] = b;
          mergeWithPrevious = true;
          return a;
        } else if (mergeWithPrevious) {
          a[a.length - 1] += b;
          mergeWithPrevious = false;
          return a;
        } else {
          return a.concat(b);
        }
      }, [])
      // Here we convert the string values into number values (in px)
      .map(function (str) {
        return toValue(str, measurement, popperOffsets, referenceOffsets);
      });
    });

    // Loop trough the offsets arrays and execute the operations
    ops.forEach(function (op, index) {
      op.forEach(function (frag, index2) {
        if (isNumeric(frag)) {
          offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
        }
      });
    });
    return offsets;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @argument {Number|String} options.offset=0
   * The offset value as described in the modifier description
   * @returns {Object} The data object, properly modified
   */
  function offset(data, _ref) {
    var offset = _ref.offset;
    var placement = data.placement,
        _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var basePlacement = placement.split('-')[0];

    var offsets = void 0;
    if (isNumeric(+offset)) {
      offsets = [+offset, 0];
    } else {
      offsets = parseOffset(offset, popper, reference, basePlacement);
    }

    if (basePlacement === 'left') {
      popper.top += offsets[0];
      popper.left -= offsets[1];
    } else if (basePlacement === 'right') {
      popper.top += offsets[0];
      popper.left += offsets[1];
    } else if (basePlacement === 'top') {
      popper.left += offsets[0];
      popper.top -= offsets[1];
    } else if (basePlacement === 'bottom') {
      popper.left += offsets[0];
      popper.top += offsets[1];
    }

    data.popper = popper;
    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function preventOverflow(data, options) {
    var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);

    // If offsetParent is the reference element, we really want to
    // go one step up and use the next offsetParent as reference to
    // avoid to make this modifier completely useless and look like broken
    if (data.instance.reference === boundariesElement) {
      boundariesElement = getOffsetParent(boundariesElement);
    }

    // NOTE: DOM access here
    // resets the popper's position so that the document size can be calculated excluding
    // the size of the popper element itself
    var transformProp = getSupportedPropertyName('transform');
    var popperStyles = data.instance.popper.style; // assignment to help minification
    var top = popperStyles.top,
        left = popperStyles.left,
        transform = popperStyles[transformProp];

    popperStyles.top = '';
    popperStyles.left = '';
    popperStyles[transformProp] = '';

    var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement, data.positionFixed);

    // NOTE: DOM access here
    // restores the original style properties after the offsets have been computed
    popperStyles.top = top;
    popperStyles.left = left;
    popperStyles[transformProp] = transform;

    options.boundaries = boundaries;

    var order = options.priority;
    var popper = data.offsets.popper;

    var check = {
      primary: function primary(placement) {
        var value = popper[placement];
        if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
          value = Math.max(popper[placement], boundaries[placement]);
        }
        return defineProperty({}, placement, value);
      },
      secondary: function secondary(placement) {
        var mainSide = placement === 'right' ? 'left' : 'top';
        var value = popper[mainSide];
        if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
          value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
        }
        return defineProperty({}, mainSide, value);
      }
    };

    order.forEach(function (placement) {
      var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
      popper = _extends({}, popper, check[side](placement));
    });

    data.offsets.popper = popper;

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function shift(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var shiftvariation = placement.split('-')[1];

    // if shift shiftvariation is specified, run the modifier
    if (shiftvariation) {
      var _data$offsets = data.offsets,
          reference = _data$offsets.reference,
          popper = _data$offsets.popper;

      var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
      var side = isVertical ? 'left' : 'top';
      var measurement = isVertical ? 'width' : 'height';

      var shiftOffsets = {
        start: defineProperty({}, side, reference[side]),
        end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
      };

      data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by update method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function hide(data) {
    if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
      return data;
    }

    var refRect = data.offsets.reference;
    var bound = find(data.instance.modifiers, function (modifier) {
      return modifier.name === 'preventOverflow';
    }).boundaries;

    if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === true) {
        return data;
      }

      data.hide = true;
      data.attributes['x-out-of-boundaries'] = '';
    } else {
      // Avoid unnecessary DOM access if visibility hasn't changed
      if (data.hide === false) {
        return data;
      }

      data.hide = false;
      data.attributes['x-out-of-boundaries'] = false;
    }

    return data;
  }

  /**
   * @function
   * @memberof Modifiers
   * @argument {Object} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {Object} The data object, properly modified
   */
  function inner(data) {
    var placement = data.placement;
    var basePlacement = placement.split('-')[0];
    var _data$offsets = data.offsets,
        popper = _data$offsets.popper,
        reference = _data$offsets.reference;

    var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;

    var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;

    popper[isHoriz ? 'left' : 'top'] = reference[basePlacement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);

    data.placement = getOppositePlacement(placement);
    data.offsets.popper = getClientRect(popper);

    return data;
  }

  /**
   * Modifier function, each modifier can have a function of this type assigned
   * to its `fn` property.<br />
   * These functions will be called on each update, this means that you must
   * make sure they are performant enough to avoid performance bottlenecks.
   *
   * @function ModifierFn
   * @argument {dataObject} data - The data object generated by `update` method
   * @argument {Object} options - Modifiers configuration and options
   * @returns {dataObject} The data object, properly modified
   */

  /**
   * Modifiers are plugins used to alter the behavior of your poppers.<br />
   * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
   * needed by the library.
   *
   * Usually you don't want to override the `order`, `fn` and `onLoad` props.
   * All the other properties are configurations that could be tweaked.
   * @namespace modifiers
   */
  var modifiers = {
    /**
     * Modifier used to shift the popper on the start or end of its reference
     * element.<br />
     * It will read the variation of the `placement` property.<br />
     * It can be one either `-end` or `-start`.
     * @memberof modifiers
     * @inner
     */
    shift: {
      /** @prop {number} order=100 - Index used to define the order of execution */
      order: 100,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: shift
    },

    /**
     * The `offset` modifier can shift your popper on both its axis.
     *
     * It accepts the following units:
     * - `px` or unit-less, interpreted as pixels
     * - `%` or `%r`, percentage relative to the length of the reference element
     * - `%p`, percentage relative to the length of the popper element
     * - `vw`, CSS viewport width unit
     * - `vh`, CSS viewport height unit
     *
     * For length is intended the main axis relative to the placement of the popper.<br />
     * This means that if the placement is `top` or `bottom`, the length will be the
     * `width`. In case of `left` or `right`, it will be the `height`.
     *
     * You can provide a single value (as `Number` or `String`), or a pair of values
     * as `String` divided by a comma or one (or more) white spaces.<br />
     * The latter is a deprecated method because it leads to confusion and will be
     * removed in v2.<br />
     * Additionally, it accepts additions and subtractions between different units.
     * Note that multiplications and divisions aren't supported.
     *
     * Valid examples are:
     * ```
     * 10
     * '10%'
     * '10, 10'
     * '10%, 10'
     * '10 + 10%'
     * '10 - 5vh + 3%'
     * '-10px + 5vh, 5px - 6%'
     * ```
     * > **NB**: If you desire to apply offsets to your poppers in a way that may make them overlap
     * > with their reference element, unfortunately, you will have to disable the `flip` modifier.
     * > You can read more on this at this [issue](https://github.com/FezVrasta/popper.js/issues/373).
     *
     * @memberof modifiers
     * @inner
     */
    offset: {
      /** @prop {number} order=200 - Index used to define the order of execution */
      order: 200,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: offset,
      /** @prop {Number|String} offset=0
       * The offset value as described in the modifier description
       */
      offset: 0
    },

    /**
     * Modifier used to prevent the popper from being positioned outside the boundary.
     *
     * A scenario exists where the reference itself is not within the boundaries.<br />
     * We can say it has "escaped the boundaries" — or just "escaped".<br />
     * In this case we need to decide whether the popper should either:
     *
     * - detach from the reference and remain "trapped" in the boundaries, or
     * - if it should ignore the boundary and "escape with its reference"
     *
     * When `escapeWithReference` is set to`true` and reference is completely
     * outside its boundaries, the popper will overflow (or completely leave)
     * the boundaries in order to remain attached to the edge of the reference.
     *
     * @memberof modifiers
     * @inner
     */
    preventOverflow: {
      /** @prop {number} order=300 - Index used to define the order of execution */
      order: 300,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: preventOverflow,
      /**
       * @prop {Array} [priority=['left','right','top','bottom']]
       * Popper will try to prevent overflow following these priorities by default,
       * then, it could overflow on the left and on top of the `boundariesElement`
       */
      priority: ['left', 'right', 'top', 'bottom'],
      /**
       * @prop {number} padding=5
       * Amount of pixel used to define a minimum distance between the boundaries
       * and the popper. This makes sure the popper always has a little padding
       * between the edges of its container
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='scrollParent'
       * Boundaries used by the modifier. Can be `scrollParent`, `window`,
       * `viewport` or any DOM element.
       */
      boundariesElement: 'scrollParent'
    },

    /**
     * Modifier used to make sure the reference and its popper stay near each other
     * without leaving any gap between the two. Especially useful when the arrow is
     * enabled and you want to ensure that it points to its reference element.
     * It cares only about the first axis. You can still have poppers with margin
     * between the popper and its reference element.
     * @memberof modifiers
     * @inner
     */
    keepTogether: {
      /** @prop {number} order=400 - Index used to define the order of execution */
      order: 400,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: keepTogether
    },

    /**
     * This modifier is used to move the `arrowElement` of the popper to make
     * sure it is positioned between the reference element and its popper element.
     * It will read the outer size of the `arrowElement` node to detect how many
     * pixels of conjunction are needed.
     *
     * It has no effect if no `arrowElement` is provided.
     * @memberof modifiers
     * @inner
     */
    arrow: {
      /** @prop {number} order=500 - Index used to define the order of execution */
      order: 500,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: arrow,
      /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
      element: '[x-arrow]'
    },

    /**
     * Modifier used to flip the popper's placement when it starts to overlap its
     * reference element.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     *
     * **NOTE:** this modifier will interrupt the current update cycle and will
     * restart it if it detects the need to flip the placement.
     * @memberof modifiers
     * @inner
     */
    flip: {
      /** @prop {number} order=600 - Index used to define the order of execution */
      order: 600,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: flip,
      /**
       * @prop {String|Array} behavior='flip'
       * The behavior used to change the popper's placement. It can be one of
       * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
       * placements (with optional variations)
       */
      behavior: 'flip',
      /**
       * @prop {number} padding=5
       * The popper will flip if it hits the edges of the `boundariesElement`
       */
      padding: 5,
      /**
       * @prop {String|HTMLElement} boundariesElement='viewport'
       * The element which will define the boundaries of the popper position.
       * The popper will never be placed outside of the defined boundaries
       * (except if `keepTogether` is enabled)
       */
      boundariesElement: 'viewport'
    },

    /**
     * Modifier used to make the popper flow toward the inner of the reference element.
     * By default, when this modifier is disabled, the popper will be placed outside
     * the reference element.
     * @memberof modifiers
     * @inner
     */
    inner: {
      /** @prop {number} order=700 - Index used to define the order of execution */
      order: 700,
      /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
      enabled: false,
      /** @prop {ModifierFn} */
      fn: inner
    },

    /**
     * Modifier used to hide the popper when its reference element is outside of the
     * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
     * be used to hide with a CSS selector the popper when its reference is
     * out of boundaries.
     *
     * Requires the `preventOverflow` modifier before it in order to work.
     * @memberof modifiers
     * @inner
     */
    hide: {
      /** @prop {number} order=800 - Index used to define the order of execution */
      order: 800,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: hide
    },

    /**
     * Computes the style that will be applied to the popper element to gets
     * properly positioned.
     *
     * Note that this modifier will not touch the DOM, it just prepares the styles
     * so that `applyStyle` modifier can apply it. This separation is useful
     * in case you need to replace `applyStyle` with a custom implementation.
     *
     * This modifier has `850` as `order` value to maintain backward compatibility
     * with previous versions of Popper.js. Expect the modifiers ordering method
     * to change in future major versions of the library.
     *
     * @memberof modifiers
     * @inner
     */
    computeStyle: {
      /** @prop {number} order=850 - Index used to define the order of execution */
      order: 850,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: computeStyle,
      /**
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: true,
      /**
       * @prop {string} [x='bottom']
       * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
       * Change this if your popper should grow in a direction different from `bottom`
       */
      x: 'bottom',
      /**
       * @prop {string} [x='left']
       * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
       * Change this if your popper should grow in a direction different from `right`
       */
      y: 'right'
    },

    /**
     * Applies the computed styles to the popper element.
     *
     * All the DOM manipulations are limited to this modifier. This is useful in case
     * you want to integrate Popper.js inside a framework or view library and you
     * want to delegate all the DOM manipulations to it.
     *
     * Note that if you disable this modifier, you must make sure the popper element
     * has its position set to `absolute` before Popper.js can do its work!
     *
     * Just disable this modifier and define your own to achieve the desired effect.
     *
     * @memberof modifiers
     * @inner
     */
    applyStyle: {
      /** @prop {number} order=900 - Index used to define the order of execution */
      order: 900,
      /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
      enabled: true,
      /** @prop {ModifierFn} */
      fn: applyStyle,
      /** @prop {Function} */
      onLoad: applyStyleOnLoad,
      /**
       * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
       * @prop {Boolean} gpuAcceleration=true
       * If true, it uses the CSS 3D transformation to position the popper.
       * Otherwise, it will use the `top` and `left` properties
       */
      gpuAcceleration: undefined
    }
  };

  /**
   * The `dataObject` is an object containing all the information used by Popper.js.
   * This object is passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
   * @name dataObject
   * @property {Object} data.instance The Popper.js instance
   * @property {String} data.placement Placement applied to popper
   * @property {String} data.originalPlacement Placement originally defined on init
   * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
   * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper
   * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
   * @property {Object} data.styles Any CSS property defined here will be applied to the popper. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.arrowStyles Any CSS property defined here will be applied to the popper arrow. It expects the JavaScript nomenclature (eg. `marginBottom`)
   * @property {Object} data.boundaries Offsets of the popper boundaries
   * @property {Object} data.offsets The measurements of popper, reference and arrow elements
   * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
   * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
   */

  /**
   * Default options provided to Popper.js constructor.<br />
   * These can be overridden using the `options` argument of Popper.js.<br />
   * To override an option, simply pass an object with the same
   * structure of the `options` object, as the 3rd argument. For example:
   * ```
   * new Popper(ref, pop, {
   *   modifiers: {
   *     preventOverflow: { enabled: false }
   *   }
   * })
   * ```
   * @type {Object}
   * @static
   * @memberof Popper
   */
  var Defaults = {
    /**
     * Popper's placement.
     * @prop {Popper.placements} placement='bottom'
     */
    placement: 'bottom',

    /**
     * Set this to true if you want popper to position it self in 'fixed' mode
     * @prop {Boolean} positionFixed=false
     */
    positionFixed: false,

    /**
     * Whether events (resize, scroll) are initially enabled.
     * @prop {Boolean} eventsEnabled=true
     */
    eventsEnabled: true,

    /**
     * Set to true if you want to automatically remove the popper when
     * you call the `destroy` method.
     * @prop {Boolean} removeOnDestroy=false
     */
    removeOnDestroy: false,

    /**
     * Callback called when the popper is created.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onCreate}
     */
    onCreate: function onCreate() {},

    /**
     * Callback called when the popper is updated. This callback is not called
     * on the initialization/creation of the popper, but only on subsequent
     * updates.<br />
     * By default, it is set to no-op.<br />
     * Access Popper.js instance with `data.instance`.
     * @prop {onUpdate}
     */
    onUpdate: function onUpdate() {},

    /**
     * List of modifiers used to modify the offsets before they are applied to the popper.
     * They provide most of the functionalities of Popper.js.
     * @prop {modifiers}
     */
    modifiers: modifiers
  };

  /**
   * @callback onCreate
   * @param {dataObject} data
   */

  /**
   * @callback onUpdate
   * @param {dataObject} data
   */

  // Utils
  // Methods
  var Popper = function () {
    /**
     * Creates a new Popper.js instance.
     * @class Popper
     * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
     * @param {HTMLElement} popper - The HTML element used as the popper
     * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
     * @return {Object} instance - The generated Popper.js instance
     */
    function Popper(reference, popper) {
      var _this = this;

      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      classCallCheck(this, Popper);

      this.scheduleUpdate = function () {
        return requestAnimationFrame(_this.update);
      };

      // make update() debounced, so that it only runs at most once-per-tick
      this.update = debounce(this.update.bind(this));

      // with {} we create a new object with the options inside it
      this.options = _extends({}, Popper.Defaults, options);

      // init state
      this.state = {
        isDestroyed: false,
        isCreated: false,
        scrollParents: []
      };

      // get reference and popper elements (allow jQuery wrappers)
      this.reference = reference && reference.jquery ? reference[0] : reference;
      this.popper = popper && popper.jquery ? popper[0] : popper;

      // Deep merge modifiers options
      this.options.modifiers = {};
      Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
        _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
      });

      // Refactoring modifiers' list (Object => Array)
      this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
        return _extends({
          name: name
        }, _this.options.modifiers[name]);
      })
      // sort the modifiers by order
      .sort(function (a, b) {
        return a.order - b.order;
      });

      // modifiers have the ability to execute arbitrary code when Popper.js get inited
      // such code is executed in the same order of its modifier
      // they could add new properties to their options configuration
      // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
      this.modifiers.forEach(function (modifierOptions) {
        if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
          modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
        }
      });

      // fire the first update to position the popper in the right place
      this.update();

      var eventsEnabled = this.options.eventsEnabled;
      if (eventsEnabled) {
        // setup event listeners, they will take care of update the position in specific situations
        this.enableEventListeners();
      }

      this.state.eventsEnabled = eventsEnabled;
    }

    // We can't use class properties because they don't get listed in the
    // class prototype and break stuff like Sinon stubs


    createClass(Popper, [{
      key: 'update',
      value: function update$$1() {
        return update.call(this);
      }
    }, {
      key: 'destroy',
      value: function destroy$$1() {
        return destroy.call(this);
      }
    }, {
      key: 'enableEventListeners',
      value: function enableEventListeners$$1() {
        return enableEventListeners.call(this);
      }
    }, {
      key: 'disableEventListeners',
      value: function disableEventListeners$$1() {
        return disableEventListeners.call(this);
      }

      /**
       * Schedules an update. It will run on the next UI update available.
       * @method scheduleUpdate
       * @memberof Popper
       */


      /**
       * Collection of utilities useful when writing custom modifiers.
       * Starting from version 1.7, this method is available only if you
       * include `popper-utils.js` before `popper.js`.
       *
       * **DEPRECATION**: This way to access PopperUtils is deprecated
       * and will be removed in v2! Use the PopperUtils module directly instead.
       * Due to the high instability of the methods contained in Utils, we can't
       * guarantee them to follow semver. Use them at your own risk!
       * @static
       * @private
       * @type {Object}
       * @deprecated since version 1.8
       * @member Utils
       * @memberof Popper
       */

    }]);
    return Popper;
  }();

  /**
   * The `referenceObject` is an object that provides an interface compatible with Popper.js
   * and lets you use it as replacement of a real DOM node.<br />
   * You can use this method to position a popper relatively to a set of coordinates
   * in case you don't have a DOM node to use as reference.
   *
   * ```
   * new Popper(referenceObject, popperNode);
   * ```
   *
   * NB: This feature isn't supported in Internet Explorer 10.
   * @name referenceObject
   * @property {Function} data.getBoundingClientRect
   * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
   * @property {number} data.clientWidth
   * An ES6 getter that will return the width of the virtual reference element.
   * @property {number} data.clientHeight
   * An ES6 getter that will return the height of the virtual reference element.
   */


  Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
  Popper.placements = placements;
  Popper.Defaults = Defaults;

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$4 = 'dropdown';
  var VERSION$4 = '4.3.1';
  var DATA_KEY$4 = 'bs.dropdown';
  var EVENT_KEY$4 = "." + DATA_KEY$4;
  var DATA_API_KEY$4 = '.data-api';
  var JQUERY_NO_CONFLICT$4 = $.fn[NAME$4];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

  var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
  var Event$4 = {
    HIDE: "hide" + EVENT_KEY$4,
    HIDDEN: "hidden" + EVENT_KEY$4,
    SHOW: "show" + EVENT_KEY$4,
    SHOWN: "shown" + EVENT_KEY$4,
    CLICK: "click" + EVENT_KEY$4,
    CLICK_DATA_API: "click" + EVENT_KEY$4 + DATA_API_KEY$4,
    KEYDOWN_DATA_API: "keydown" + EVENT_KEY$4 + DATA_API_KEY$4,
    KEYUP_DATA_API: "keyup" + EVENT_KEY$4 + DATA_API_KEY$4
  };
  var ClassName$4 = {
    DISABLED: 'disabled',
    SHOW: 'show',
    DROPUP: 'dropup',
    DROPRIGHT: 'dropright',
    DROPLEFT: 'dropleft',
    MENURIGHT: 'dropdown-menu-right',
    MENULEFT: 'dropdown-menu-left',
    POSITION_STATIC: 'position-static'
  };
  var Selector$4 = {
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    MENU: '.dropdown-menu',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
  };
  var AttachmentMap = {
    TOP: 'top-start',
    TOPEND: 'top-end',
    BOTTOM: 'bottom-start',
    BOTTOMEND: 'bottom-end',
    RIGHT: 'right-start',
    RIGHTEND: 'right-end',
    LEFT: 'left-start',
    LEFTEND: 'left-end'
  };
  var Default$2 = {
    offset: 0,
    flip: true,
    boundary: 'scrollParent',
    reference: 'toggle',
    display: 'dynamic'
  };
  var DefaultType$2 = {
    offset: '(number|string|function)',
    flip: 'boolean',
    boundary: '(string|element)',
    reference: '(string|element)',
    display: 'string'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Dropdown =
  /*#__PURE__*/
  function () {
    function Dropdown(element, config) {
      this._element = element;
      this._popper = null;
      this._config = this._getConfig(config);
      this._menu = this._getMenuElement();
      this._inNavbar = this._detectNavbar();

      this._addEventListeners();
    } // Getters


    var _proto = Dropdown.prototype;

    // Public
    _proto.toggle = function toggle() {
      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this._element);

      var isActive = $(this._menu).hasClass(ClassName$4.SHOW);

      Dropdown._clearMenus();

      if (isActive) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event$4.SHOW, relatedTarget);
      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      } // Disable totally Popper.js for Dropdown in Navbar


      if (!this._inNavbar) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap\'s dropdowns require Popper.js (https://popper.js.org/)');
        }

        var referenceElement = this._element;

        if (this._config.reference === 'parent') {
          referenceElement = parent;
        } else if (Util.isElement(this._config.reference)) {
          referenceElement = this._config.reference; // Check if it's jQuery element

          if (typeof this._config.reference.jquery !== 'undefined') {
            referenceElement = this._config.reference[0];
          }
        } // If boundary is not `scrollParent`, then set position to `static`
        // to allow the menu to "escape" the scroll parent's boundaries
        // https://github.com/twbs/bootstrap/issues/24251


        if (this._config.boundary !== 'scrollParent') {
          $(parent).addClass(ClassName$4.POSITION_STATIC);
        }

        this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
      } // If this is a touch-enabled device we add extra
      // empty mouseover listeners to the body's immediate children;
      // only needed because of broken event delegation on iOS
      // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


      if ('ontouchstart' in document.documentElement && $(parent).closest(Selector$4.NAVBAR_NAV).length === 0) {
        $(document.body).children().on('mouseover', null, $.noop);
      }

      this._element.focus();

      this._element.setAttribute('aria-expanded', true);

      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
    };

    _proto.show = function show() {
      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || $(this._menu).hasClass(ClassName$4.SHOW)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var showEvent = $.Event(Event$4.SHOW, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $(parent).trigger(showEvent);

      if (showEvent.isDefaultPrevented()) {
        return;
      }

      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.SHOWN, relatedTarget));
    };

    _proto.hide = function hide() {
      if (this._element.disabled || $(this._element).hasClass(ClassName$4.DISABLED) || !$(this._menu).hasClass(ClassName$4.SHOW)) {
        return;
      }

      var relatedTarget = {
        relatedTarget: this._element
      };
      var hideEvent = $.Event(Event$4.HIDE, relatedTarget);

      var parent = Dropdown._getParentFromElement(this._element);

      $(parent).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(this._menu).toggleClass(ClassName$4.SHOW);
      $(parent).toggleClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$4);
      $(this._element).off(EVENT_KEY$4);
      this._element = null;
      this._menu = null;

      if (this._popper !== null) {
        this._popper.destroy();

        this._popper = null;
      }
    };

    _proto.update = function update() {
      this._inNavbar = this._detectNavbar();

      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Private
    ;

    _proto._addEventListeners = function _addEventListeners() {
      var _this = this;

      $(this._element).on(Event$4.CLICK, function (event) {
        event.preventDefault();
        event.stopPropagation();

        _this.toggle();
      });
    };

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, this.constructor.Default, $(this._element).data(), config);
      Util.typeCheckConfig(NAME$4, config, this.constructor.DefaultType);
      return config;
    };

    _proto._getMenuElement = function _getMenuElement() {
      if (!this._menu) {
        var parent = Dropdown._getParentFromElement(this._element);

        if (parent) {
          this._menu = parent.querySelector(Selector$4.MENU);
        }
      }

      return this._menu;
    };

    _proto._getPlacement = function _getPlacement() {
      var $parentDropdown = $(this._element.parentNode);
      var placement = AttachmentMap.BOTTOM; // Handle dropup

      if ($parentDropdown.hasClass(ClassName$4.DROPUP)) {
        placement = AttachmentMap.TOP;

        if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
          placement = AttachmentMap.TOPEND;
        }
      } else if ($parentDropdown.hasClass(ClassName$4.DROPRIGHT)) {
        placement = AttachmentMap.RIGHT;
      } else if ($parentDropdown.hasClass(ClassName$4.DROPLEFT)) {
        placement = AttachmentMap.LEFT;
      } else if ($(this._menu).hasClass(ClassName$4.MENURIGHT)) {
        placement = AttachmentMap.BOTTOMEND;
      }

      return placement;
    };

    _proto._detectNavbar = function _detectNavbar() {
      return $(this._element).closest('.navbar').length > 0;
    };

    _proto._getOffset = function _getOffset() {
      var _this2 = this;

      var offset = {};

      if (typeof this._config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets, _this2._element) || {});
          return data;
        };
      } else {
        offset.offset = this._config.offset;
      }

      return offset;
    };

    _proto._getPopperConfig = function _getPopperConfig() {
      var popperConfig = {
        placement: this._getPlacement(),
        modifiers: {
          offset: this._getOffset(),
          flip: {
            enabled: this._config.flip
          },
          preventOverflow: {
            boundariesElement: this._config.boundary
          }
        } // Disable Popper.js if we have a static display

      };

      if (this._config.display === 'static') {
        popperConfig.modifiers.applyStyle = {
          enabled: false
        };
      }

      return popperConfig;
    } // Static
    ;

    Dropdown._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$4);

        var _config = typeof config === 'object' ? config : null;

        if (!data) {
          data = new Dropdown(this, _config);
          $(this).data(DATA_KEY$4, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    Dropdown._clearMenus = function _clearMenus(event) {
      if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
        return;
      }

      var toggles = [].slice.call(document.querySelectorAll(Selector$4.DATA_TOGGLE));

      for (var i = 0, len = toggles.length; i < len; i++) {
        var parent = Dropdown._getParentFromElement(toggles[i]);

        var context = $(toggles[i]).data(DATA_KEY$4);
        var relatedTarget = {
          relatedTarget: toggles[i]
        };

        if (event && event.type === 'click') {
          relatedTarget.clickEvent = event;
        }

        if (!context) {
          continue;
        }

        var dropdownMenu = context._menu;

        if (!$(parent).hasClass(ClassName$4.SHOW)) {
          continue;
        }

        if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $.contains(parent, event.target)) {
          continue;
        }

        var hideEvent = $.Event(Event$4.HIDE, relatedTarget);
        $(parent).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          continue;
        } // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support


        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().off('mouseover', null, $.noop);
        }

        toggles[i].setAttribute('aria-expanded', 'false');
        $(dropdownMenu).removeClass(ClassName$4.SHOW);
        $(parent).removeClass(ClassName$4.SHOW).trigger($.Event(Event$4.HIDDEN, relatedTarget));
      }
    };

    Dropdown._getParentFromElement = function _getParentFromElement(element) {
      var parent;
      var selector = Util.getSelectorFromElement(element);

      if (selector) {
        parent = document.querySelector(selector);
      }

      return parent || element.parentNode;
    } // eslint-disable-next-line complexity
    ;

    Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
      // If not input/textarea:
      //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
      // If input/textarea:
      //  - If space key => not a dropdown command
      //  - If key is other than escape
      //    - If key is not up or down => not a dropdown command
      //    - If trigger inside the menu => not a dropdown command
      if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $(event.target).closest(Selector$4.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (this.disabled || $(this).hasClass(ClassName$4.DISABLED)) {
        return;
      }

      var parent = Dropdown._getParentFromElement(this);

      var isActive = $(parent).hasClass(ClassName$4.SHOW);

      if (!isActive || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
        if (event.which === ESCAPE_KEYCODE) {
          var toggle = parent.querySelector(Selector$4.DATA_TOGGLE);
          $(toggle).trigger('focus');
        }

        $(this).trigger('click');
        return;
      }

      var items = [].slice.call(parent.querySelectorAll(Selector$4.VISIBLE_ITEMS));

      if (items.length === 0) {
        return;
      }

      var index = items.indexOf(event.target);

      if (event.which === ARROW_UP_KEYCODE && index > 0) {
        // Up
        index--;
      }

      if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
        // Down
        index++;
      }

      if (index < 0) {
        index = 0;
      }

      items[index].focus();
    };

    _createClass(Dropdown, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$4;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$2;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$2;
      }
    }]);

    return Dropdown;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$4.KEYDOWN_DATA_API, Selector$4.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event$4.KEYDOWN_DATA_API, Selector$4.MENU, Dropdown._dataApiKeydownHandler).on(Event$4.CLICK_DATA_API + " " + Event$4.KEYUP_DATA_API, Dropdown._clearMenus).on(Event$4.CLICK_DATA_API, Selector$4.DATA_TOGGLE, function (event) {
    event.preventDefault();
    event.stopPropagation();

    Dropdown._jQueryInterface.call($(this), 'toggle');
  }).on(Event$4.CLICK_DATA_API, Selector$4.FORM_CHILD, function (e) {
    e.stopPropagation();
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$4] = Dropdown._jQueryInterface;
  $.fn[NAME$4].Constructor = Dropdown;

  $.fn[NAME$4].noConflict = function () {
    $.fn[NAME$4] = JQUERY_NO_CONFLICT$4;
    return Dropdown._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$5 = 'modal';
  var VERSION$5 = '4.3.1';
  var DATA_KEY$5 = 'bs.modal';
  var EVENT_KEY$5 = "." + DATA_KEY$5;
  var DATA_API_KEY$5 = '.data-api';
  var JQUERY_NO_CONFLICT$5 = $.fn[NAME$5];
  var ESCAPE_KEYCODE$1 = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default$3 = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };
  var DefaultType$3 = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };
  var Event$5 = {
    HIDE: "hide" + EVENT_KEY$5,
    HIDDEN: "hidden" + EVENT_KEY$5,
    SHOW: "show" + EVENT_KEY$5,
    SHOWN: "shown" + EVENT_KEY$5,
    FOCUSIN: "focusin" + EVENT_KEY$5,
    RESIZE: "resize" + EVENT_KEY$5,
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$5,
    KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY$5,
    MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY$5,
    MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY$5,
    CLICK_DATA_API: "click" + EVENT_KEY$5 + DATA_API_KEY$5
  };
  var ClassName$5 = {
    SCROLLABLE: 'modal-dialog-scrollable',
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$5 = {
    DIALOG: '.modal-dialog',
    MODAL_BODY: '.modal-body',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
    STICKY_CONTENT: '.sticky-top'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Modal =
  /*#__PURE__*/
  function () {
    function Modal(element, config) {
      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = element.querySelector(Selector$5.DIALOG);
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._isTransitioning = false;
      this._scrollbarWidth = 0;
    } // Getters


    var _proto = Modal.prototype;

    // Public
    _proto.toggle = function toggle(relatedTarget) {
      return this._isShown ? this.hide() : this.show(relatedTarget);
    };

    _proto.show = function show(relatedTarget) {
      var _this = this;

      if (this._isShown || this._isTransitioning) {
        return;
      }

      if ($(this._element).hasClass(ClassName$5.FADE)) {
        this._isTransitioning = true;
      }

      var showEvent = $.Event(Event$5.SHOW, {
        relatedTarget: relatedTarget
      });
      $(this._element).trigger(showEvent);

      if (this._isShown || showEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = true;

      this._checkScrollbar();

      this._setScrollbar();

      this._adjustDialog();

      this._setEscapeEvent();

      this._setResizeEvent();

      $(this._element).on(Event$5.CLICK_DISMISS, Selector$5.DATA_DISMISS, function (event) {
        return _this.hide(event);
      });
      $(this._dialog).on(Event$5.MOUSEDOWN_DISMISS, function () {
        $(_this._element).one(Event$5.MOUSEUP_DISMISS, function (event) {
          if ($(event.target).is(_this._element)) {
            _this._ignoreBackdropClick = true;
          }
        });
      });

      this._showBackdrop(function () {
        return _this._showElement(relatedTarget);
      });
    };

    _proto.hide = function hide(event) {
      var _this2 = this;

      if (event) {
        event.preventDefault();
      }

      if (!this._isShown || this._isTransitioning) {
        return;
      }

      var hideEvent = $.Event(Event$5.HIDE);
      $(this._element).trigger(hideEvent);

      if (!this._isShown || hideEvent.isDefaultPrevented()) {
        return;
      }

      this._isShown = false;
      var transition = $(this._element).hasClass(ClassName$5.FADE);

      if (transition) {
        this._isTransitioning = true;
      }

      this._setEscapeEvent();

      this._setResizeEvent();

      $(document).off(Event$5.FOCUSIN);
      $(this._element).removeClass(ClassName$5.SHOW);
      $(this._element).off(Event$5.CLICK_DISMISS);
      $(this._dialog).off(Event$5.MOUSEDOWN_DISMISS);

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, function (event) {
          return _this2._hideModal(event);
        }).emulateTransitionEnd(transitionDuration);
      } else {
        this._hideModal();
      }
    };

    _proto.dispose = function dispose() {
      [window, this._element, this._dialog].forEach(function (htmlElement) {
        return $(htmlElement).off(EVENT_KEY$5);
      });
      /**
       * `document` has 2 events `Event.FOCUSIN` and `Event.CLICK_DATA_API`
       * Do not move `document` in `htmlElements` array
       * It will remove `Event.CLICK_DATA_API` event that should remain
       */

      $(document).off(Event$5.FOCUSIN);
      $.removeData(this._element, DATA_KEY$5);
      this._config = null;
      this._element = null;
      this._dialog = null;
      this._backdrop = null;
      this._isShown = null;
      this._isBodyOverflowing = null;
      this._ignoreBackdropClick = null;
      this._isTransitioning = null;
      this._scrollbarWidth = null;
    };

    _proto.handleUpdate = function handleUpdate() {
      this._adjustDialog();
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$3, config);
      Util.typeCheckConfig(NAME$5, config, DefaultType$3);
      return config;
    };

    _proto._showElement = function _showElement(relatedTarget) {
      var _this3 = this;

      var transition = $(this._element).hasClass(ClassName$5.FADE);

      if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
        // Don't move modal's DOM position
        document.body.appendChild(this._element);
      }

      this._element.style.display = 'block';

      this._element.removeAttribute('aria-hidden');

      this._element.setAttribute('aria-modal', true);

      if ($(this._dialog).hasClass(ClassName$5.SCROLLABLE)) {
        this._dialog.querySelector(Selector$5.MODAL_BODY).scrollTop = 0;
      } else {
        this._element.scrollTop = 0;
      }

      if (transition) {
        Util.reflow(this._element);
      }

      $(this._element).addClass(ClassName$5.SHOW);

      if (this._config.focus) {
        this._enforceFocus();
      }

      var shownEvent = $.Event(Event$5.SHOWN, {
        relatedTarget: relatedTarget
      });

      var transitionComplete = function transitionComplete() {
        if (_this3._config.focus) {
          _this3._element.focus();
        }

        _this3._isTransitioning = false;
        $(_this3._element).trigger(shownEvent);
      };

      if (transition) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._dialog);
        $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
      } else {
        transitionComplete();
      }
    };

    _proto._enforceFocus = function _enforceFocus() {
      var _this4 = this;

      $(document).off(Event$5.FOCUSIN) // Guard against infinite focus loop
      .on(Event$5.FOCUSIN, function (event) {
        if (document !== event.target && _this4._element !== event.target && $(_this4._element).has(event.target).length === 0) {
          _this4._element.focus();
        }
      });
    };

    _proto._setEscapeEvent = function _setEscapeEvent() {
      var _this5 = this;

      if (this._isShown && this._config.keyboard) {
        $(this._element).on(Event$5.KEYDOWN_DISMISS, function (event) {
          if (event.which === ESCAPE_KEYCODE$1) {
            event.preventDefault();

            _this5.hide();
          }
        });
      } else if (!this._isShown) {
        $(this._element).off(Event$5.KEYDOWN_DISMISS);
      }
    };

    _proto._setResizeEvent = function _setResizeEvent() {
      var _this6 = this;

      if (this._isShown) {
        $(window).on(Event$5.RESIZE, function (event) {
          return _this6.handleUpdate(event);
        });
      } else {
        $(window).off(Event$5.RESIZE);
      }
    };

    _proto._hideModal = function _hideModal() {
      var _this7 = this;

      this._element.style.display = 'none';

      this._element.setAttribute('aria-hidden', true);

      this._element.removeAttribute('aria-modal');

      this._isTransitioning = false;

      this._showBackdrop(function () {
        $(document.body).removeClass(ClassName$5.OPEN);

        _this7._resetAdjustments();

        _this7._resetScrollbar();

        $(_this7._element).trigger(Event$5.HIDDEN);
      });
    };

    _proto._removeBackdrop = function _removeBackdrop() {
      if (this._backdrop) {
        $(this._backdrop).remove();
        this._backdrop = null;
      }
    };

    _proto._showBackdrop = function _showBackdrop(callback) {
      var _this8 = this;

      var animate = $(this._element).hasClass(ClassName$5.FADE) ? ClassName$5.FADE : '';

      if (this._isShown && this._config.backdrop) {
        this._backdrop = document.createElement('div');
        this._backdrop.className = ClassName$5.BACKDROP;

        if (animate) {
          this._backdrop.classList.add(animate);
        }

        $(this._backdrop).appendTo(document.body);
        $(this._element).on(Event$5.CLICK_DISMISS, function (event) {
          if (_this8._ignoreBackdropClick) {
            _this8._ignoreBackdropClick = false;
            return;
          }

          if (event.target !== event.currentTarget) {
            return;
          }

          if (_this8._config.backdrop === 'static') {
            _this8._element.focus();
          } else {
            _this8.hide();
          }
        });

        if (animate) {
          Util.reflow(this._backdrop);
        }

        $(this._backdrop).addClass(ClassName$5.SHOW);

        if (!callback) {
          return;
        }

        if (!animate) {
          callback();
          return;
        }

        var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
        $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
      } else if (!this._isShown && this._backdrop) {
        $(this._backdrop).removeClass(ClassName$5.SHOW);

        var callbackRemove = function callbackRemove() {
          _this8._removeBackdrop();

          if (callback) {
            callback();
          }
        };

        if ($(this._element).hasClass(ClassName$5.FADE)) {
          var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

          $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
        } else {
          callbackRemove();
        }
      } else if (callback) {
        callback();
      }
    } // ----------------------------------------------------------------------
    // the following methods are used to handle overflowing modals
    // todo (fat): these should probably be refactored out of modal.js
    // ----------------------------------------------------------------------
    ;

    _proto._adjustDialog = function _adjustDialog() {
      var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

      if (!this._isBodyOverflowing && isModalOverflowing) {
        this._element.style.paddingLeft = this._scrollbarWidth + "px";
      }

      if (this._isBodyOverflowing && !isModalOverflowing) {
        this._element.style.paddingRight = this._scrollbarWidth + "px";
      }
    };

    _proto._resetAdjustments = function _resetAdjustments() {
      this._element.style.paddingLeft = '';
      this._element.style.paddingRight = '';
    };

    _proto._checkScrollbar = function _checkScrollbar() {
      var rect = document.body.getBoundingClientRect();
      this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
      this._scrollbarWidth = this._getScrollbarWidth();
    };

    _proto._setScrollbar = function _setScrollbar() {
      var _this9 = this;

      if (this._isBodyOverflowing) {
        // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
        //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
        var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
        var stickyContent = [].slice.call(document.querySelectorAll(Selector$5.STICKY_CONTENT)); // Adjust fixed content padding

        $(fixedContent).each(function (index, element) {
          var actualPadding = element.style.paddingRight;
          var calculatedPadding = $(element).css('padding-right');
          $(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
        }); // Adjust sticky content margin

        $(stickyContent).each(function (index, element) {
          var actualMargin = element.style.marginRight;
          var calculatedMargin = $(element).css('margin-right');
          $(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
        }); // Adjust body padding

        var actualPadding = document.body.style.paddingRight;
        var calculatedPadding = $(document.body).css('padding-right');
        $(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
      }

      $(document.body).addClass(ClassName$5.OPEN);
    };

    _proto._resetScrollbar = function _resetScrollbar() {
      // Restore fixed content padding
      var fixedContent = [].slice.call(document.querySelectorAll(Selector$5.FIXED_CONTENT));
      $(fixedContent).each(function (index, element) {
        var padding = $(element).data('padding-right');
        $(element).removeData('padding-right');
        element.style.paddingRight = padding ? padding : '';
      }); // Restore sticky content

      var elements = [].slice.call(document.querySelectorAll("" + Selector$5.STICKY_CONTENT));
      $(elements).each(function (index, element) {
        var margin = $(element).data('margin-right');

        if (typeof margin !== 'undefined') {
          $(element).css('margin-right', margin).removeData('margin-right');
        }
      }); // Restore body padding

      var padding = $(document.body).data('padding-right');
      $(document.body).removeData('padding-right');
      document.body.style.paddingRight = padding ? padding : '';
    };

    _proto._getScrollbarWidth = function _getScrollbarWidth() {
      // thx d.walsh
      var scrollDiv = document.createElement('div');
      scrollDiv.className = ClassName$5.SCROLLBAR_MEASURER;
      document.body.appendChild(scrollDiv);
      var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
      document.body.removeChild(scrollDiv);
      return scrollbarWidth;
    } // Static
    ;

    Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$5);

        var _config = _objectSpread({}, Default$3, $(this).data(), typeof config === 'object' && config ? config : {});

        if (!data) {
          data = new Modal(this, _config);
          $(this).data(DATA_KEY$5, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](relatedTarget);
        } else if (_config.show) {
          data.show(relatedTarget);
        }
      });
    };

    _createClass(Modal, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$5;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$3;
      }
    }]);

    return Modal;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$5.CLICK_DATA_API, Selector$5.DATA_TOGGLE, function (event) {
    var _this10 = this;

    var target;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = document.querySelector(selector);
    }

    var config = $(target).data(DATA_KEY$5) ? 'toggle' : _objectSpread({}, $(target).data(), $(this).data());

    if (this.tagName === 'A' || this.tagName === 'AREA') {
      event.preventDefault();
    }

    var $target = $(target).one(Event$5.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // Only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event$5.HIDDEN, function () {
        if ($(_this10).is(':visible')) {
          _this10.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$5] = Modal._jQueryInterface;
  $.fn[NAME$5].Constructor = Modal;

  $.fn[NAME$5].noConflict = function () {
    $.fn[NAME$5] = JQUERY_NO_CONFLICT$5;
    return Modal._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): tools/sanitizer.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */
  var uriAttrs = ['background', 'cite', 'href', 'itemtype', 'longdesc', 'poster', 'src', 'xlink:href'];
  var ARIA_ATTRIBUTE_PATTERN = /^aria-[\w-]*$/i;
  var DefaultWhitelist = {
    // Global attributes allowed on any supplied element below.
    '*': ['class', 'dir', 'id', 'lang', 'role', ARIA_ATTRIBUTE_PATTERN],
    a: ['target', 'href', 'title', 'rel'],
    area: [],
    b: [],
    br: [],
    col: [],
    code: [],
    div: [],
    em: [],
    hr: [],
    h1: [],
    h2: [],
    h3: [],
    h4: [],
    h5: [],
    h6: [],
    i: [],
    img: ['src', 'alt', 'title', 'width', 'height'],
    li: [],
    ol: [],
    p: [],
    pre: [],
    s: [],
    small: [],
    span: [],
    sub: [],
    sup: [],
    strong: [],
    u: [],
    ul: []
    /**
     * A pattern that recognizes a commonly useful subset of URLs that are safe.
     *
     * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
     */

  };
  var SAFE_URL_PATTERN = /^(?:(?:https?|mailto|ftp|tel|file):|[^&:/?#]*(?:[/?#]|$))/gi;
  /**
   * A pattern that matches safe data URLs. Only matches image, video and audio types.
   *
   * Shoutout to Angular 7 https://github.com/angular/angular/blob/7.2.4/packages/core/src/sanitization/url_sanitizer.ts
   */

  var DATA_URL_PATTERN = /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+/]+=*$/i;

  function allowedAttribute(attr, allowedAttributeList) {
    var attrName = attr.nodeName.toLowerCase();

    if (allowedAttributeList.indexOf(attrName) !== -1) {
      if (uriAttrs.indexOf(attrName) !== -1) {
        return Boolean(attr.nodeValue.match(SAFE_URL_PATTERN) || attr.nodeValue.match(DATA_URL_PATTERN));
      }

      return true;
    }

    var regExp = allowedAttributeList.filter(function (attrRegex) {
      return attrRegex instanceof RegExp;
    }); // Check if a regular expression validates the attribute.

    for (var i = 0, l = regExp.length; i < l; i++) {
      if (attrName.match(regExp[i])) {
        return true;
      }
    }

    return false;
  }

  function sanitizeHtml(unsafeHtml, whiteList, sanitizeFn) {
    if (unsafeHtml.length === 0) {
      return unsafeHtml;
    }

    if (sanitizeFn && typeof sanitizeFn === 'function') {
      return sanitizeFn(unsafeHtml);
    }

    var domParser = new window.DOMParser();
    var createdDocument = domParser.parseFromString(unsafeHtml, 'text/html');
    var whitelistKeys = Object.keys(whiteList);
    var elements = [].slice.call(createdDocument.body.querySelectorAll('*'));

    var _loop = function _loop(i, len) {
      var el = elements[i];
      var elName = el.nodeName.toLowerCase();

      if (whitelistKeys.indexOf(el.nodeName.toLowerCase()) === -1) {
        el.parentNode.removeChild(el);
        return "continue";
      }

      var attributeList = [].slice.call(el.attributes);
      var whitelistedAttributes = [].concat(whiteList['*'] || [], whiteList[elName] || []);
      attributeList.forEach(function (attr) {
        if (!allowedAttribute(attr, whitelistedAttributes)) {
          el.removeAttribute(attr.nodeName);
        }
      });
    };

    for (var i = 0, len = elements.length; i < len; i++) {
      var _ret = _loop(i, len);

      if (_ret === "continue") continue;
    }

    return createdDocument.body.innerHTML;
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$6 = 'tooltip';
  var VERSION$6 = '4.3.1';
  var DATA_KEY$6 = 'bs.tooltip';
  var EVENT_KEY$6 = "." + DATA_KEY$6;
  var JQUERY_NO_CONFLICT$6 = $.fn[NAME$6];
  var CLASS_PREFIX = 'bs-tooltip';
  var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
  var DISALLOWED_ATTRIBUTES = ['sanitize', 'whiteList', 'sanitizeFn'];
  var DefaultType$4 = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: '(number|string|function)',
    container: '(string|element|boolean)',
    fallbackPlacement: '(string|array)',
    boundary: '(string|element)',
    sanitize: 'boolean',
    sanitizeFn: '(null|function)',
    whiteList: 'object'
  };
  var AttachmentMap$1 = {
    AUTO: 'auto',
    TOP: 'top',
    RIGHT: 'right',
    BOTTOM: 'bottom',
    LEFT: 'left'
  };
  var Default$4 = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: 0,
    container: false,
    fallbackPlacement: 'flip',
    boundary: 'scrollParent',
    sanitize: true,
    sanitizeFn: null,
    whiteList: DefaultWhitelist
  };
  var HoverState = {
    SHOW: 'show',
    OUT: 'out'
  };
  var Event$6 = {
    HIDE: "hide" + EVENT_KEY$6,
    HIDDEN: "hidden" + EVENT_KEY$6,
    SHOW: "show" + EVENT_KEY$6,
    SHOWN: "shown" + EVENT_KEY$6,
    INSERTED: "inserted" + EVENT_KEY$6,
    CLICK: "click" + EVENT_KEY$6,
    FOCUSIN: "focusin" + EVENT_KEY$6,
    FOCUSOUT: "focusout" + EVENT_KEY$6,
    MOUSEENTER: "mouseenter" + EVENT_KEY$6,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$6
  };
  var ClassName$6 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$6 = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner',
    ARROW: '.arrow'
  };
  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tooltip =
  /*#__PURE__*/
  function () {
    function Tooltip(element, config) {
      /**
       * Check for Popper dependency
       * Popper - https://popper.js.org
       */
      if (typeof Popper === 'undefined') {
        throw new TypeError('Bootstrap\'s tooltips require Popper.js (https://popper.js.org/)');
      } // private


      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._popper = null; // Protected

      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    } // Getters


    var _proto = Tooltip.prototype;

    // Public
    _proto.enable = function enable() {
      this._isEnabled = true;
    };

    _proto.disable = function disable() {
      this._isEnabled = false;
    };

    _proto.toggleEnabled = function toggleEnabled() {
      this._isEnabled = !this._isEnabled;
    };

    _proto.toggle = function toggle(event) {
      if (!this._isEnabled) {
        return;
      }

      if (event) {
        var dataKey = this.constructor.DATA_KEY;
        var context = $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        context._activeTrigger.click = !context._activeTrigger.click;

        if (context._isWithActiveTrigger()) {
          context._enter(null, context);
        } else {
          context._leave(null, context);
        }
      } else {
        if ($(this.getTipElement()).hasClass(ClassName$6.SHOW)) {
          this._leave(null, this);

          return;
        }

        this._enter(null, this);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      $.removeData(this.element, this.constructor.DATA_KEY);
      $(this.element).off(this.constructor.EVENT_KEY);
      $(this.element).closest('.modal').off('hide.bs.modal');

      if (this.tip) {
        $(this.tip).remove();
      }

      this._isEnabled = null;
      this._timeout = null;
      this._hoverState = null;
      this._activeTrigger = null;

      if (this._popper !== null) {
        this._popper.destroy();
      }

      this._popper = null;
      this.element = null;
      this.config = null;
      this.tip = null;
    };

    _proto.show = function show() {
      var _this = this;

      if ($(this.element).css('display') === 'none') {
        throw new Error('Please use show on visible elements');
      }

      var showEvent = $.Event(this.constructor.Event.SHOW);

      if (this.isWithContent() && this._isEnabled) {
        $(this.element).trigger(showEvent);
        var shadowRoot = Util.findShadowRoot(this.element);
        var isInTheDom = $.contains(shadowRoot !== null ? shadowRoot : this.element.ownerDocument.documentElement, this.element);

        if (showEvent.isDefaultPrevented() || !isInTheDom) {
          return;
        }

        var tip = this.getTipElement();
        var tipId = Util.getUID(this.constructor.NAME);
        tip.setAttribute('id', tipId);
        this.element.setAttribute('aria-describedby', tipId);
        this.setContent();

        if (this.config.animation) {
          $(tip).addClass(ClassName$6.FADE);
        }

        var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

        var attachment = this._getAttachment(placement);

        this.addAttachmentClass(attachment);

        var container = this._getContainer();

        $(tip).data(this.constructor.DATA_KEY, this);

        if (!$.contains(this.element.ownerDocument.documentElement, this.tip)) {
          $(tip).appendTo(container);
        }

        $(this.element).trigger(this.constructor.Event.INSERTED);
        this._popper = new Popper(this.element, tip, {
          placement: attachment,
          modifiers: {
            offset: this._getOffset(),
            flip: {
              behavior: this.config.fallbackPlacement
            },
            arrow: {
              element: Selector$6.ARROW
            },
            preventOverflow: {
              boundariesElement: this.config.boundary
            }
          },
          onCreate: function onCreate(data) {
            if (data.originalPlacement !== data.placement) {
              _this._handlePopperPlacementChange(data);
            }
          },
          onUpdate: function onUpdate(data) {
            return _this._handlePopperPlacementChange(data);
          }
        });
        $(tip).addClass(ClassName$6.SHOW); // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

        if ('ontouchstart' in document.documentElement) {
          $(document.body).children().on('mouseover', null, $.noop);
        }

        var complete = function complete() {
          if (_this.config.animation) {
            _this._fixTransition();
          }

          var prevHoverState = _this._hoverState;
          _this._hoverState = null;
          $(_this.element).trigger(_this.constructor.Event.SHOWN);

          if (prevHoverState === HoverState.OUT) {
            _this._leave(null, _this);
          }
        };

        if ($(this.tip).hasClass(ClassName$6.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
          $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      }
    };

    _proto.hide = function hide(callback) {
      var _this2 = this;

      var tip = this.getTipElement();
      var hideEvent = $.Event(this.constructor.Event.HIDE);

      var complete = function complete() {
        if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
          tip.parentNode.removeChild(tip);
        }

        _this2._cleanTipClass();

        _this2.element.removeAttribute('aria-describedby');

        $(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

        if (_this2._popper !== null) {
          _this2._popper.destroy();
        }

        if (callback) {
          callback();
        }
      };

      $(this.element).trigger(hideEvent);

      if (hideEvent.isDefaultPrevented()) {
        return;
      }

      $(tip).removeClass(ClassName$6.SHOW); // If this is a touch-enabled device we remove the extra
      // empty mouseover listeners we added for iOS support

      if ('ontouchstart' in document.documentElement) {
        $(document.body).children().off('mouseover', null, $.noop);
      }

      this._activeTrigger[Trigger.CLICK] = false;
      this._activeTrigger[Trigger.FOCUS] = false;
      this._activeTrigger[Trigger.HOVER] = false;

      if ($(this.tip).hasClass(ClassName$6.FADE)) {
        var transitionDuration = Util.getTransitionDurationFromElement(tip);
        $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }

      this._hoverState = '';
    };

    _proto.update = function update() {
      if (this._popper !== null) {
        this._popper.scheduleUpdate();
      }
    } // Protected
    ;

    _proto.isWithContent = function isWithContent() {
      return Boolean(this.getTitle());
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var tip = this.getTipElement();
      this.setElementContent($(tip.querySelectorAll(Selector$6.TOOLTIP_INNER)), this.getTitle());
      $(tip).removeClass(ClassName$6.FADE + " " + ClassName$6.SHOW);
    };

    _proto.setElementContent = function setElementContent($element, content) {
      if (typeof content === 'object' && (content.nodeType || content.jquery)) {
        // Content is a DOM node or a jQuery
        if (this.config.html) {
          if (!$(content).parent().is($element)) {
            $element.empty().append(content);
          }
        } else {
          $element.text($(content).text());
        }

        return;
      }

      if (this.config.html) {
        if (this.config.sanitize) {
          content = sanitizeHtml(content, this.config.whiteList, this.config.sanitizeFn);
        }

        $element.html(content);
      } else {
        $element.text(content);
      }
    };

    _proto.getTitle = function getTitle() {
      var title = this.element.getAttribute('data-original-title');

      if (!title) {
        title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
      }

      return title;
    } // Private
    ;

    _proto._getOffset = function _getOffset() {
      var _this3 = this;

      var offset = {};

      if (typeof this.config.offset === 'function') {
        offset.fn = function (data) {
          data.offsets = _objectSpread({}, data.offsets, _this3.config.offset(data.offsets, _this3.element) || {});
          return data;
        };
      } else {
        offset.offset = this.config.offset;
      }

      return offset;
    };

    _proto._getContainer = function _getContainer() {
      if (this.config.container === false) {
        return document.body;
      }

      if (Util.isElement(this.config.container)) {
        return $(this.config.container);
      }

      return $(document).find(this.config.container);
    };

    _proto._getAttachment = function _getAttachment(placement) {
      return AttachmentMap$1[placement.toUpperCase()];
    };

    _proto._setListeners = function _setListeners() {
      var _this4 = this;

      var triggers = this.config.trigger.split(' ');
      triggers.forEach(function (trigger) {
        if (trigger === 'click') {
          $(_this4.element).on(_this4.constructor.Event.CLICK, _this4.config.selector, function (event) {
            return _this4.toggle(event);
          });
        } else if (trigger !== Trigger.MANUAL) {
          var eventIn = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSEENTER : _this4.constructor.Event.FOCUSIN;
          var eventOut = trigger === Trigger.HOVER ? _this4.constructor.Event.MOUSELEAVE : _this4.constructor.Event.FOCUSOUT;
          $(_this4.element).on(eventIn, _this4.config.selector, function (event) {
            return _this4._enter(event);
          }).on(eventOut, _this4.config.selector, function (event) {
            return _this4._leave(event);
          });
        }
      });
      $(this.element).closest('.modal').on('hide.bs.modal', function () {
        if (_this4.element) {
          _this4.hide();
        }
      });

      if (this.config.selector) {
        this.config = _objectSpread({}, this.config, {
          trigger: 'manual',
          selector: ''
        });
      } else {
        this._fixTitle();
      }
    };

    _proto._fixTitle = function _fixTitle() {
      var titleType = typeof this.element.getAttribute('data-original-title');

      if (this.element.getAttribute('title') || titleType !== 'string') {
        this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
        this.element.setAttribute('title', '');
      }
    };

    _proto._enter = function _enter(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
      }

      if ($(context.getTipElement()).hasClass(ClassName$6.SHOW) || context._hoverState === HoverState.SHOW) {
        context._hoverState = HoverState.SHOW;
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.SHOW;

      if (!context.config.delay || !context.config.delay.show) {
        context.show();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.SHOW) {
          context.show();
        }
      }, context.config.delay.show);
    };

    _proto._leave = function _leave(event, context) {
      var dataKey = this.constructor.DATA_KEY;
      context = context || $(event.currentTarget).data(dataKey);

      if (!context) {
        context = new this.constructor(event.currentTarget, this._getDelegateConfig());
        $(event.currentTarget).data(dataKey, context);
      }

      if (event) {
        context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
      }

      if (context._isWithActiveTrigger()) {
        return;
      }

      clearTimeout(context._timeout);
      context._hoverState = HoverState.OUT;

      if (!context.config.delay || !context.config.delay.hide) {
        context.hide();
        return;
      }

      context._timeout = setTimeout(function () {
        if (context._hoverState === HoverState.OUT) {
          context.hide();
        }
      }, context.config.delay.hide);
    };

    _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
      for (var trigger in this._activeTrigger) {
        if (this._activeTrigger[trigger]) {
          return true;
        }
      }

      return false;
    };

    _proto._getConfig = function _getConfig(config) {
      var dataAttributes = $(this.element).data();
      Object.keys(dataAttributes).forEach(function (dataAttr) {
        if (DISALLOWED_ATTRIBUTES.indexOf(dataAttr) !== -1) {
          delete dataAttributes[dataAttr];
        }
      });
      config = _objectSpread({}, this.constructor.Default, dataAttributes, typeof config === 'object' && config ? config : {});

      if (typeof config.delay === 'number') {
        config.delay = {
          show: config.delay,
          hide: config.delay
        };
      }

      if (typeof config.title === 'number') {
        config.title = config.title.toString();
      }

      if (typeof config.content === 'number') {
        config.content = config.content.toString();
      }

      Util.typeCheckConfig(NAME$6, config, this.constructor.DefaultType);

      if (config.sanitize) {
        config.template = sanitizeHtml(config.template, config.whiteList, config.sanitizeFn);
      }

      return config;
    };

    _proto._getDelegateConfig = function _getDelegateConfig() {
      var config = {};

      if (this.config) {
        for (var key in this.config) {
          if (this.constructor.Default[key] !== this.config[key]) {
            config[key] = this.config[key];
          }
        }
      }

      return config;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

      if (tabClass !== null && tabClass.length) {
        $tip.removeClass(tabClass.join(''));
      }
    };

    _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
      var popperInstance = popperData.instance;
      this.tip = popperInstance.popper;

      this._cleanTipClass();

      this.addAttachmentClass(this._getAttachment(popperData.placement));
    };

    _proto._fixTransition = function _fixTransition() {
      var tip = this.getTipElement();
      var initConfigAnimation = this.config.animation;

      if (tip.getAttribute('x-placement') !== null) {
        return;
      }

      $(tip).removeClass(ClassName$6.FADE);
      this.config.animation = false;
      this.hide();
      this.show();
      this.config.animation = initConfigAnimation;
    } // Static
    ;

    Tooltip._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$6);

        var _config = typeof config === 'object' && config;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Tooltip(this, _config);
          $(this).data(DATA_KEY$6, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tooltip, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$6;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$4;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$6;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$6;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$6;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$6;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$4;
      }
    }]);

    return Tooltip;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$6] = Tooltip._jQueryInterface;
  $.fn[NAME$6].Constructor = Tooltip;

  $.fn[NAME$6].noConflict = function () {
    $.fn[NAME$6] = JQUERY_NO_CONFLICT$6;
    return Tooltip._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$7 = 'popover';
  var VERSION$7 = '4.3.1';
  var DATA_KEY$7 = 'bs.popover';
  var EVENT_KEY$7 = "." + DATA_KEY$7;
  var JQUERY_NO_CONFLICT$7 = $.fn[NAME$7];
  var CLASS_PREFIX$1 = 'bs-popover';
  var BSCLS_PREFIX_REGEX$1 = new RegExp("(^|\\s)" + CLASS_PREFIX$1 + "\\S+", 'g');

  var Default$5 = _objectSpread({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
  });

  var DefaultType$5 = _objectSpread({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName$7 = {
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$7 = {
    TITLE: '.popover-header',
    CONTENT: '.popover-body'
  };
  var Event$7 = {
    HIDE: "hide" + EVENT_KEY$7,
    HIDDEN: "hidden" + EVENT_KEY$7,
    SHOW: "show" + EVENT_KEY$7,
    SHOWN: "shown" + EVENT_KEY$7,
    INSERTED: "inserted" + EVENT_KEY$7,
    CLICK: "click" + EVENT_KEY$7,
    FOCUSIN: "focusin" + EVENT_KEY$7,
    FOCUSOUT: "focusout" + EVENT_KEY$7,
    MOUSEENTER: "mouseenter" + EVENT_KEY$7,
    MOUSELEAVE: "mouseleave" + EVENT_KEY$7
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Popover =
  /*#__PURE__*/
  function (_Tooltip) {
    _inheritsLoose(Popover, _Tooltip);

    function Popover() {
      return _Tooltip.apply(this, arguments) || this;
    }

    var _proto = Popover.prototype;

    // Overrides
    _proto.isWithContent = function isWithContent() {
      return this.getTitle() || this._getContent();
    };

    _proto.addAttachmentClass = function addAttachmentClass(attachment) {
      $(this.getTipElement()).addClass(CLASS_PREFIX$1 + "-" + attachment);
    };

    _proto.getTipElement = function getTipElement() {
      this.tip = this.tip || $(this.config.template)[0];
      return this.tip;
    };

    _proto.setContent = function setContent() {
      var $tip = $(this.getTipElement()); // We use append for html objects to maintain js events

      this.setElementContent($tip.find(Selector$7.TITLE), this.getTitle());

      var content = this._getContent();

      if (typeof content === 'function') {
        content = content.call(this.element);
      }

      this.setElementContent($tip.find(Selector$7.CONTENT), content);
      $tip.removeClass(ClassName$7.FADE + " " + ClassName$7.SHOW);
    } // Private
    ;

    _proto._getContent = function _getContent() {
      return this.element.getAttribute('data-content') || this.config.content;
    };

    _proto._cleanTipClass = function _cleanTipClass() {
      var $tip = $(this.getTipElement());
      var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX$1);

      if (tabClass !== null && tabClass.length > 0) {
        $tip.removeClass(tabClass.join(''));
      }
    } // Static
    ;

    Popover._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$7);

        var _config = typeof config === 'object' ? config : null;

        if (!data && /dispose|hide/.test(config)) {
          return;
        }

        if (!data) {
          data = new Popover(this, _config);
          $(this).data(DATA_KEY$7, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Popover, null, [{
      key: "VERSION",
      // Getters
      get: function get() {
        return VERSION$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$5;
      }
    }, {
      key: "NAME",
      get: function get() {
        return NAME$7;
      }
    }, {
      key: "DATA_KEY",
      get: function get() {
        return DATA_KEY$7;
      }
    }, {
      key: "Event",
      get: function get() {
        return Event$7;
      }
    }, {
      key: "EVENT_KEY",
      get: function get() {
        return EVENT_KEY$7;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$5;
      }
    }]);

    return Popover;
  }(Tooltip);
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$7] = Popover._jQueryInterface;
  $.fn[NAME$7].Constructor = Popover;

  $.fn[NAME$7].noConflict = function () {
    $.fn[NAME$7] = JQUERY_NO_CONFLICT$7;
    return Popover._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$8 = 'scrollspy';
  var VERSION$8 = '4.3.1';
  var DATA_KEY$8 = 'bs.scrollspy';
  var EVENT_KEY$8 = "." + DATA_KEY$8;
  var DATA_API_KEY$6 = '.data-api';
  var JQUERY_NO_CONFLICT$8 = $.fn[NAME$8];
  var Default$6 = {
    offset: 10,
    method: 'auto',
    target: ''
  };
  var DefaultType$6 = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };
  var Event$8 = {
    ACTIVATE: "activate" + EVENT_KEY$8,
    SCROLL: "scroll" + EVENT_KEY$8,
    LOAD_DATA_API: "load" + EVENT_KEY$8 + DATA_API_KEY$6
  };
  var ClassName$8 = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active'
  };
  var Selector$8 = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    NAV_LIST_GROUP: '.nav, .list-group',
    NAV_LINKS: '.nav-link',
    NAV_ITEMS: '.nav-item',
    LIST_ITEMS: '.list-group-item',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };
  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var ScrollSpy =
  /*#__PURE__*/
  function () {
    function ScrollSpy(element, config) {
      var _this = this;

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + " " + Selector$8.NAV_LINKS + "," + (this._config.target + " " + Selector$8.LIST_ITEMS + ",") + (this._config.target + " " + Selector$8.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;
      $(this._scrollElement).on(Event$8.SCROLL, function (event) {
        return _this._process(event);
      });
      this.refresh();

      this._process();
    } // Getters


    var _proto = ScrollSpy.prototype;

    // Public
    _proto.refresh = function refresh() {
      var _this2 = this;

      var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
      var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
      var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
      this._offsets = [];
      this._targets = [];
      this._scrollHeight = this._getScrollHeight();
      var targets = [].slice.call(document.querySelectorAll(this._selector));
      targets.map(function (element) {
        var target;
        var targetSelector = Util.getSelectorFromElement(element);

        if (targetSelector) {
          target = document.querySelector(targetSelector);
        }

        if (target) {
          var targetBCR = target.getBoundingClientRect();

          if (targetBCR.width || targetBCR.height) {
            // TODO (fat): remove sketch reliance on jQuery position/offset
            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
          }
        }

        return null;
      }).filter(function (item) {
        return item;
      }).sort(function (a, b) {
        return a[0] - b[0];
      }).forEach(function (item) {
        _this2._offsets.push(item[0]);

        _this2._targets.push(item[1]);
      });
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$8);
      $(this._scrollElement).off(EVENT_KEY$8);
      this._element = null;
      this._scrollElement = null;
      this._config = null;
      this._selector = null;
      this._offsets = null;
      this._targets = null;
      this._activeTarget = null;
      this._scrollHeight = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$6, typeof config === 'object' && config ? config : {});

      if (typeof config.target !== 'string') {
        var id = $(config.target).attr('id');

        if (!id) {
          id = Util.getUID(NAME$8);
          $(config.target).attr('id', id);
        }

        config.target = "#" + id;
      }

      Util.typeCheckConfig(NAME$8, config, DefaultType$6);
      return config;
    };

    _proto._getScrollTop = function _getScrollTop() {
      return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
    };

    _proto._getScrollHeight = function _getScrollHeight() {
      return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
    };

    _proto._getOffsetHeight = function _getOffsetHeight() {
      return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
    };

    _proto._process = function _process() {
      var scrollTop = this._getScrollTop() + this._config.offset;

      var scrollHeight = this._getScrollHeight();

      var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

      if (this._scrollHeight !== scrollHeight) {
        this.refresh();
      }

      if (scrollTop >= maxScroll) {
        var target = this._targets[this._targets.length - 1];

        if (this._activeTarget !== target) {
          this._activate(target);
        }

        return;
      }

      if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
        this._activeTarget = null;

        this._clear();

        return;
      }

      var offsetLength = this._offsets.length;

      for (var i = offsetLength; i--;) {
        var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

        if (isActiveTarget) {
          this._activate(this._targets[i]);
        }
      }
    };

    _proto._activate = function _activate(target) {
      this._activeTarget = target;

      this._clear();

      var queries = this._selector.split(',').map(function (selector) {
        return selector + "[data-target=\"" + target + "\"]," + selector + "[href=\"" + target + "\"]";
      });

      var $link = $([].slice.call(document.querySelectorAll(queries.join(','))));

      if ($link.hasClass(ClassName$8.DROPDOWN_ITEM)) {
        $link.closest(Selector$8.DROPDOWN).find(Selector$8.DROPDOWN_TOGGLE).addClass(ClassName$8.ACTIVE);
        $link.addClass(ClassName$8.ACTIVE);
      } else {
        // Set triggered link as active
        $link.addClass(ClassName$8.ACTIVE); // Set triggered links parents as active
        // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

        $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_LINKS + ", " + Selector$8.LIST_ITEMS).addClass(ClassName$8.ACTIVE); // Handle special case when .nav-link is inside .nav-item

        $link.parents(Selector$8.NAV_LIST_GROUP).prev(Selector$8.NAV_ITEMS).children(Selector$8.NAV_LINKS).addClass(ClassName$8.ACTIVE);
      }

      $(this._scrollElement).trigger(Event$8.ACTIVATE, {
        relatedTarget: target
      });
    };

    _proto._clear = function _clear() {
      [].slice.call(document.querySelectorAll(this._selector)).filter(function (node) {
        return node.classList.contains(ClassName$8.ACTIVE);
      }).forEach(function (node) {
        return node.classList.remove(ClassName$8.ACTIVE);
      });
    } // Static
    ;

    ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var data = $(this).data(DATA_KEY$8);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new ScrollSpy(this, _config);
          $(this).data(DATA_KEY$8, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(ScrollSpy, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$8;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$6;
      }
    }]);

    return ScrollSpy;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(window).on(Event$8.LOAD_DATA_API, function () {
    var scrollSpys = [].slice.call(document.querySelectorAll(Selector$8.DATA_SPY));
    var scrollSpysLength = scrollSpys.length;

    for (var i = scrollSpysLength; i--;) {
      var $spy = $(scrollSpys[i]);

      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$8] = ScrollSpy._jQueryInterface;
  $.fn[NAME$8].Constructor = ScrollSpy;

  $.fn[NAME$8].noConflict = function () {
    $.fn[NAME$8] = JQUERY_NO_CONFLICT$8;
    return ScrollSpy._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$9 = 'tab';
  var VERSION$9 = '4.3.1';
  var DATA_KEY$9 = 'bs.tab';
  var EVENT_KEY$9 = "." + DATA_KEY$9;
  var DATA_API_KEY$7 = '.data-api';
  var JQUERY_NO_CONFLICT$9 = $.fn[NAME$9];
  var Event$9 = {
    HIDE: "hide" + EVENT_KEY$9,
    HIDDEN: "hidden" + EVENT_KEY$9,
    SHOW: "show" + EVENT_KEY$9,
    SHOWN: "shown" + EVENT_KEY$9,
    CLICK_DATA_API: "click" + EVENT_KEY$9 + DATA_API_KEY$7
  };
  var ClassName$9 = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    DISABLED: 'disabled',
    FADE: 'fade',
    SHOW: 'show'
  };
  var Selector$9 = {
    DROPDOWN: '.dropdown',
    NAV_LIST_GROUP: '.nav, .list-group',
    ACTIVE: '.active',
    ACTIVE_UL: '> li > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Tab =
  /*#__PURE__*/
  function () {
    function Tab(element) {
      this._element = element;
    } // Getters


    var _proto = Tab.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName$9.ACTIVE) || $(this._element).hasClass(ClassName$9.DISABLED)) {
        return;
      }

      var target;
      var previous;
      var listElement = $(this._element).closest(Selector$9.NAV_LIST_GROUP)[0];
      var selector = Util.getSelectorFromElement(this._element);

      if (listElement) {
        var itemSelector = listElement.nodeName === 'UL' || listElement.nodeName === 'OL' ? Selector$9.ACTIVE_UL : Selector$9.ACTIVE;
        previous = $.makeArray($(listElement).find(itemSelector));
        previous = previous[previous.length - 1];
      }

      var hideEvent = $.Event(Event$9.HIDE, {
        relatedTarget: this._element
      });
      var showEvent = $.Event(Event$9.SHOW, {
        relatedTarget: previous
      });

      if (previous) {
        $(previous).trigger(hideEvent);
      }

      $(this._element).trigger(showEvent);

      if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
        return;
      }

      if (selector) {
        target = document.querySelector(selector);
      }

      this._activate(this._element, listElement);

      var complete = function complete() {
        var hiddenEvent = $.Event(Event$9.HIDDEN, {
          relatedTarget: _this._element
        });
        var shownEvent = $.Event(Event$9.SHOWN, {
          relatedTarget: previous
        });
        $(previous).trigger(hiddenEvent);
        $(_this._element).trigger(shownEvent);
      };

      if (target) {
        this._activate(target, target.parentNode, complete);
      } else {
        complete();
      }
    };

    _proto.dispose = function dispose() {
      $.removeData(this._element, DATA_KEY$9);
      this._element = null;
    } // Private
    ;

    _proto._activate = function _activate(element, container, callback) {
      var _this2 = this;

      var activeElements = container && (container.nodeName === 'UL' || container.nodeName === 'OL') ? $(container).find(Selector$9.ACTIVE_UL) : $(container).children(Selector$9.ACTIVE);
      var active = activeElements[0];
      var isTransitioning = callback && active && $(active).hasClass(ClassName$9.FADE);

      var complete = function complete() {
        return _this2._transitionComplete(element, active, callback);
      };

      if (active && isTransitioning) {
        var transitionDuration = Util.getTransitionDurationFromElement(active);
        $(active).removeClass(ClassName$9.SHOW).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto._transitionComplete = function _transitionComplete(element, active, callback) {
      if (active) {
        $(active).removeClass(ClassName$9.ACTIVE);
        var dropdownChild = $(active.parentNode).find(Selector$9.DROPDOWN_ACTIVE_CHILD)[0];

        if (dropdownChild) {
          $(dropdownChild).removeClass(ClassName$9.ACTIVE);
        }

        if (active.getAttribute('role') === 'tab') {
          active.setAttribute('aria-selected', false);
        }
      }

      $(element).addClass(ClassName$9.ACTIVE);

      if (element.getAttribute('role') === 'tab') {
        element.setAttribute('aria-selected', true);
      }

      Util.reflow(element);

      if (element.classList.contains(ClassName$9.FADE)) {
        element.classList.add(ClassName$9.SHOW);
      }

      if (element.parentNode && $(element.parentNode).hasClass(ClassName$9.DROPDOWN_MENU)) {
        var dropdownElement = $(element).closest(Selector$9.DROPDOWN)[0];

        if (dropdownElement) {
          var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector$9.DROPDOWN_TOGGLE));
          $(dropdownToggleList).addClass(ClassName$9.ACTIVE);
        }

        element.setAttribute('aria-expanded', true);
      }

      if (callback) {
        callback();
      }
    } // Static
    ;

    Tab._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $this = $(this);
        var data = $this.data(DATA_KEY$9);

        if (!data) {
          data = new Tab(this);
          $this.data(DATA_KEY$9, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config]();
        }
      });
    };

    _createClass(Tab, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$9;
      }
    }]);

    return Tab;
  }();
  /**
   * ------------------------------------------------------------------------
   * Data Api implementation
   * ------------------------------------------------------------------------
   */


  $(document).on(Event$9.CLICK_DATA_API, Selector$9.DATA_TOGGLE, function (event) {
    event.preventDefault();

    Tab._jQueryInterface.call($(this), 'show');
  });
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME$9] = Tab._jQueryInterface;
  $.fn[NAME$9].Constructor = Tab;

  $.fn[NAME$9].noConflict = function () {
    $.fn[NAME$9] = JQUERY_NO_CONFLICT$9;
    return Tab._jQueryInterface;
  };

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME$a = 'toast';
  var VERSION$a = '4.3.1';
  var DATA_KEY$a = 'bs.toast';
  var EVENT_KEY$a = "." + DATA_KEY$a;
  var JQUERY_NO_CONFLICT$a = $.fn[NAME$a];
  var Event$a = {
    CLICK_DISMISS: "click.dismiss" + EVENT_KEY$a,
    HIDE: "hide" + EVENT_KEY$a,
    HIDDEN: "hidden" + EVENT_KEY$a,
    SHOW: "show" + EVENT_KEY$a,
    SHOWN: "shown" + EVENT_KEY$a
  };
  var ClassName$a = {
    FADE: 'fade',
    HIDE: 'hide',
    SHOW: 'show',
    SHOWING: 'showing'
  };
  var DefaultType$7 = {
    animation: 'boolean',
    autohide: 'boolean',
    delay: 'number'
  };
  var Default$7 = {
    animation: true,
    autohide: true,
    delay: 500
  };
  var Selector$a = {
    DATA_DISMISS: '[data-dismiss="toast"]'
    /**
     * ------------------------------------------------------------------------
     * Class Definition
     * ------------------------------------------------------------------------
     */

  };

  var Toast =
  /*#__PURE__*/
  function () {
    function Toast(element, config) {
      this._element = element;
      this._config = this._getConfig(config);
      this._timeout = null;

      this._setListeners();
    } // Getters


    var _proto = Toast.prototype;

    // Public
    _proto.show = function show() {
      var _this = this;

      $(this._element).trigger(Event$a.SHOW);

      if (this._config.animation) {
        this._element.classList.add(ClassName$a.FADE);
      }

      var complete = function complete() {
        _this._element.classList.remove(ClassName$a.SHOWING);

        _this._element.classList.add(ClassName$a.SHOW);

        $(_this._element).trigger(Event$a.SHOWN);

        if (_this._config.autohide) {
          _this.hide();
        }
      };

      this._element.classList.remove(ClassName$a.HIDE);

      this._element.classList.add(ClassName$a.SHOWING);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    };

    _proto.hide = function hide(withoutTimeout) {
      var _this2 = this;

      if (!this._element.classList.contains(ClassName$a.SHOW)) {
        return;
      }

      $(this._element).trigger(Event$a.HIDE);

      if (withoutTimeout) {
        this._close();
      } else {
        this._timeout = setTimeout(function () {
          _this2._close();
        }, this._config.delay);
      }
    };

    _proto.dispose = function dispose() {
      clearTimeout(this._timeout);
      this._timeout = null;

      if (this._element.classList.contains(ClassName$a.SHOW)) {
        this._element.classList.remove(ClassName$a.SHOW);
      }

      $(this._element).off(Event$a.CLICK_DISMISS);
      $.removeData(this._element, DATA_KEY$a);
      this._element = null;
      this._config = null;
    } // Private
    ;

    _proto._getConfig = function _getConfig(config) {
      config = _objectSpread({}, Default$7, $(this._element).data(), typeof config === 'object' && config ? config : {});
      Util.typeCheckConfig(NAME$a, config, this.constructor.DefaultType);
      return config;
    };

    _proto._setListeners = function _setListeners() {
      var _this3 = this;

      $(this._element).on(Event$a.CLICK_DISMISS, Selector$a.DATA_DISMISS, function () {
        return _this3.hide(true);
      });
    };

    _proto._close = function _close() {
      var _this4 = this;

      var complete = function complete() {
        _this4._element.classList.add(ClassName$a.HIDE);

        $(_this4._element).trigger(Event$a.HIDDEN);
      };

      this._element.classList.remove(ClassName$a.SHOW);

      if (this._config.animation) {
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      } else {
        complete();
      }
    } // Static
    ;

    Toast._jQueryInterface = function _jQueryInterface(config) {
      return this.each(function () {
        var $element = $(this);
        var data = $element.data(DATA_KEY$a);

        var _config = typeof config === 'object' && config;

        if (!data) {
          data = new Toast(this, _config);
          $element.data(DATA_KEY$a, data);
        }

        if (typeof config === 'string') {
          if (typeof data[config] === 'undefined') {
            throw new TypeError("No method named \"" + config + "\"");
          }

          data[config](this);
        }
      });
    };

    _createClass(Toast, null, [{
      key: "VERSION",
      get: function get() {
        return VERSION$a;
      }
    }, {
      key: "DefaultType",
      get: function get() {
        return DefaultType$7;
      }
    }, {
      key: "Default",
      get: function get() {
        return Default$7;
      }
    }]);

    return Toast;
  }();
  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */


  $.fn[NAME$a] = Toast._jQueryInterface;
  $.fn[NAME$a].Constructor = Toast;

  $.fn[NAME$a].noConflict = function () {
    $.fn[NAME$a] = JQUERY_NO_CONFLICT$a;
    return Toast._jQueryInterface;
  };

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.3.1): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  (function () {
    if (typeof $ === 'undefined') {
      throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
    }

    var version = $.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
      throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
    }
  })();

  exports.Util = Util;
  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Toast = Toast;
  exports.Tooltip = Tooltip;

  Object.defineProperty(exports, '__esModule', { value: true });

}));


var set_social = function(){

    var data = {
        'action': 'ghs_set_social',
        'post_type': 'POST',
        'facebook': jQuery('.ghs-set-social-facebook').val(),
        'twitter': jQuery('.ghs-set-social-twitter').val(),
        'tumblr': jQuery('.ghs-set-social-tumblr').val(),
        'instagram': jQuery('.ghs-set-social-instagram').val(),
        'youtube': jQuery('.ghs-set-social-youtube').val(),
        'snapchat': jQuery('.ghs-set-social-snapchat').val(),
    };

    jQuery.post(ajaxurl, data, function (response) {
        console.log(response);
        if(response.success){
            jQuery('.ghs_admin_alert').css('display','block').addClass('ghs_success');
        }else{
            jQuery('.ghs_admin_alert').css('display','block').addClass('ghs_error');
        }
    }, 'json');

};

var get_social = function(){

    var data = {
        'action': 'ghs_get_social',
        'post_type': 'POST',
        'name': ''
    };

    jQuery.post(ajaxurl, data, function (response) {

        if(response.success){
            jQuery('.ghs-set-social-facebook').val(response.social[0].FaceBookName);
        }
    }, 'json');

};

var set_hero_settings = function () {

    var hbi,
        file = jQuery('.ghs-hero-banner-img')[0].files[0];

    if(file){
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            hbi = e.target.result;

            var data = {
                'action': 'ghs_set_hero_settings',
                'post_type': 'POST',
                'hero-banner-img': hbi,
            };

            jQuery.post(ajaxurl, data, function (response) {

                if(response.success){
                    jQuery('.ghs_admin_alert').css('display','block').addClass('ghs_success');
                }else{
                    jQuery('.ghs_admin_alert').css('display','block').addClass('ghs_error');
                }
            }, 'json');
        };
    }

};

var get_hero_settings = function () {

    var data = {
        'action': 'ghs_get_hero_settings',
        'post_type': 'POST',
        'name': ''
    };

    jQuery.post(ajaxurl, data, function (response) {

        if(response.success){
            if(jQuery('.ghs_hero_preview').length > 0) {
                jQuery('.ghs_hero_preview').css({
                    "display" : "block",
                    "background-image" : "url('"+response.hero_banner_img+"')",
                    "background-size" : "100%",
                    "background-position" : "center"
                });
            }

            if(jQuery('.ghs_hero_banner').length > 0){
                jQuery('.ghs_hero_banner').css({
                    "display" : "block",
                    "background-image" : "url('"+response.hero_banner_img+"')",
                    "background-size" : "100%",
                    "background-position" : "center"
                });
            }
        }
    }, 'json');

};

if(document.URL.indexOf("page=ghs-theme-settings") !== -1) {
    //found
    get_social();
}

if(document.URL.indexOf("page=ghs_theme_settings_hps") !== -1) {
    //found
    get_hero_settings();
}




jQuery(document).ready(function () {

    var init = function(){

        if(jQuery('#wpadminbar').length > 0){
            var wpadminHeight = jQuery('#wpadminbar').outerHeight(true);
            jQuery('nav').css('margin-top', wpadminHeight);
            jQuery('.ghs-content').css('margin-top', jQuery('nav').outerHeight(true)-18);
        } else {
            jQuery('.ghs-content').css('margin-top', jQuery('nav').outerHeight(true)+18);
        }

        if(jQuery('.ghs_hero_banner').length > 0){
            get_hero_settings();
        }

    };

    init();
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2pzL3NyYy91dGlsLmpzIiwiLi4vLi4vanMvc3JjL2FsZXJ0LmpzIiwiLi4vLi4vanMvc3JjL2J1dHRvbi5qcyIsIi4uLy4uL2pzL3NyYy9jYXJvdXNlbC5qcyIsIi4uLy4uL2pzL3NyYy9jb2xsYXBzZS5qcyIsIi4uLy4uL25vZGVfbW9kdWxlcy9wb3BwZXIuanMvZGlzdC9lc20vcG9wcGVyLmpzIiwiLi4vLi4vanMvc3JjL2Ryb3Bkb3duLmpzIiwiLi4vLi4vanMvc3JjL21vZGFsLmpzIiwiLi4vLi4vanMvc3JjL3Rvb2xzL3Nhbml0aXplci5qcyIsIi4uLy4uL2pzL3NyYy90b29sdGlwLmpzIiwiLi4vLi4vanMvc3JjL3BvcG92ZXIuanMiLCIuLi8uLi9qcy9zcmMvc2Nyb2xsc3B5LmpzIiwiLi4vLi4vanMvc3JjL3RhYi5qcyIsIi4uLy4uL2pzL3NyYy90b2FzdC5qcyIsIi4uLy4uL2pzL3NyYy9pbmRleC5qcyIsIm1haW4uanMiXSwibmFtZXMiOlsiVFJBTlNJVElPTl9FTkQiLCJNQVhfVUlEIiwiTUlMTElTRUNPTkRTX01VTFRJUExJRVIiLCJ0b1R5cGUiLCJvYmoiLCJ0b1N0cmluZyIsImNhbGwiLCJtYXRjaCIsInRvTG93ZXJDYXNlIiwiZ2V0U3BlY2lhbFRyYW5zaXRpb25FbmRFdmVudCIsImJpbmRUeXBlIiwiZGVsZWdhdGVUeXBlIiwiaGFuZGxlIiwiZXZlbnQiLCIkIiwidGFyZ2V0IiwiaXMiLCJoYW5kbGVPYmoiLCJoYW5kbGVyIiwiYXBwbHkiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJ0cmFuc2l0aW9uRW5kRW11bGF0b3IiLCJkdXJhdGlvbiIsImNhbGxlZCIsIm9uZSIsIlV0aWwiLCJzZXRUaW1lb3V0IiwidHJpZ2dlclRyYW5zaXRpb25FbmQiLCJzZXRUcmFuc2l0aW9uRW5kU3VwcG9ydCIsImZuIiwiZW11bGF0ZVRyYW5zaXRpb25FbmQiLCJzcGVjaWFsIiwiZ2V0VUlEIiwicHJlZml4IiwiTWF0aCIsInJhbmRvbSIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJnZXRTZWxlY3RvckZyb21FbGVtZW50IiwiZWxlbWVudCIsInNlbGVjdG9yIiwiZ2V0QXR0cmlidXRlIiwiaHJlZkF0dHIiLCJ0cmltIiwicXVlcnlTZWxlY3RvciIsImVyciIsImdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50IiwidHJhbnNpdGlvbkR1cmF0aW9uIiwiY3NzIiwidHJhbnNpdGlvbkRlbGF5IiwiZmxvYXRUcmFuc2l0aW9uRHVyYXRpb24iLCJwYXJzZUZsb2F0IiwiZmxvYXRUcmFuc2l0aW9uRGVsYXkiLCJzcGxpdCIsInJlZmxvdyIsIm9mZnNldEhlaWdodCIsInRyaWdnZXIiLCJzdXBwb3J0c1RyYW5zaXRpb25FbmQiLCJCb29sZWFuIiwiaXNFbGVtZW50Iiwibm9kZVR5cGUiLCJ0eXBlQ2hlY2tDb25maWciLCJjb21wb25lbnROYW1lIiwiY29uZmlnIiwiY29uZmlnVHlwZXMiLCJwcm9wZXJ0eSIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiZXhwZWN0ZWRUeXBlcyIsInZhbHVlIiwidmFsdWVUeXBlIiwiUmVnRXhwIiwidGVzdCIsIkVycm9yIiwidG9VcHBlckNhc2UiLCJmaW5kU2hhZG93Um9vdCIsImRvY3VtZW50RWxlbWVudCIsImF0dGFjaFNoYWRvdyIsImdldFJvb3ROb2RlIiwicm9vdCIsIlNoYWRvd1Jvb3QiLCJwYXJlbnROb2RlIiwiTkFNRSIsIlZFUlNJT04iLCJEQVRBX0tFWSIsIkVWRU5UX0tFWSIsIkRBVEFfQVBJX0tFWSIsIkpRVUVSWV9OT19DT05GTElDVCIsIlNlbGVjdG9yIiwiRElTTUlTUyIsIkV2ZW50IiwiQ0xPU0UiLCJDTE9TRUQiLCJDTElDS19EQVRBX0FQSSIsIkNsYXNzTmFtZSIsIkFMRVJUIiwiRkFERSIsIlNIT1ciLCJBbGVydCIsIl9lbGVtZW50IiwiY2xvc2UiLCJyb290RWxlbWVudCIsIl9nZXRSb290RWxlbWVudCIsImN1c3RvbUV2ZW50IiwiX3RyaWdnZXJDbG9zZUV2ZW50IiwiaXNEZWZhdWx0UHJldmVudGVkIiwiX3JlbW92ZUVsZW1lbnQiLCJkaXNwb3NlIiwicmVtb3ZlRGF0YSIsInBhcmVudCIsImNsb3Nlc3QiLCJjbG9zZUV2ZW50IiwicmVtb3ZlQ2xhc3MiLCJoYXNDbGFzcyIsIl9kZXN0cm95RWxlbWVudCIsImRldGFjaCIsInJlbW92ZSIsIl9qUXVlcnlJbnRlcmZhY2UiLCJlYWNoIiwiJGVsZW1lbnQiLCJkYXRhIiwiX2hhbmRsZURpc21pc3MiLCJhbGVydEluc3RhbmNlIiwicHJldmVudERlZmF1bHQiLCJvbiIsIkNvbnN0cnVjdG9yIiwibm9Db25mbGljdCIsIkFDVElWRSIsIkJVVFRPTiIsIkZPQ1VTIiwiREFUQV9UT0dHTEVfQ0FSUk9UIiwiREFUQV9UT0dHTEUiLCJJTlBVVCIsIkZPQ1VTX0JMVVJfREFUQV9BUEkiLCJCdXR0b24iLCJ0b2dnbGUiLCJ0cmlnZ2VyQ2hhbmdlRXZlbnQiLCJhZGRBcmlhUHJlc3NlZCIsImlucHV0IiwidHlwZSIsImNoZWNrZWQiLCJjbGFzc0xpc3QiLCJjb250YWlucyIsImFjdGl2ZUVsZW1lbnQiLCJoYXNBdHRyaWJ1dGUiLCJmb2N1cyIsInNldEF0dHJpYnV0ZSIsInRvZ2dsZUNsYXNzIiwiYnV0dG9uIiwiQVJST1dfTEVGVF9LRVlDT0RFIiwiQVJST1dfUklHSFRfS0VZQ09ERSIsIlRPVUNIRVZFTlRfQ09NUEFUX1dBSVQiLCJTV0lQRV9USFJFU0hPTEQiLCJEZWZhdWx0IiwiaW50ZXJ2YWwiLCJrZXlib2FyZCIsInNsaWRlIiwicGF1c2UiLCJ3cmFwIiwidG91Y2giLCJEZWZhdWx0VHlwZSIsIkRpcmVjdGlvbiIsIk5FWFQiLCJQUkVWIiwiTEVGVCIsIlJJR0hUIiwiU0xJREUiLCJTTElEIiwiS0VZRE9XTiIsIk1PVVNFRU5URVIiLCJNT1VTRUxFQVZFIiwiVE9VQ0hTVEFSVCIsIlRPVUNITU9WRSIsIlRPVUNIRU5EIiwiUE9JTlRFUkRPV04iLCJQT0lOVEVSVVAiLCJEUkFHX1NUQVJUIiwiTE9BRF9EQVRBX0FQSSIsIkNBUk9VU0VMIiwiSVRFTSIsIlBPSU5URVJfRVZFTlQiLCJBQ1RJVkVfSVRFTSIsIklURU1fSU1HIiwiTkVYVF9QUkVWIiwiSU5ESUNBVE9SUyIsIkRBVEFfU0xJREUiLCJEQVRBX1JJREUiLCJQb2ludGVyVHlwZSIsIlRPVUNIIiwiUEVOIiwiQ2Fyb3VzZWwiLCJfaXRlbXMiLCJfaW50ZXJ2YWwiLCJfYWN0aXZlRWxlbWVudCIsIl9pc1BhdXNlZCIsIl9pc1NsaWRpbmciLCJ0b3VjaFRpbWVvdXQiLCJ0b3VjaFN0YXJ0WCIsInRvdWNoRGVsdGFYIiwiX2NvbmZpZyIsIl9nZXRDb25maWciLCJfaW5kaWNhdG9yc0VsZW1lbnQiLCJfdG91Y2hTdXBwb3J0ZWQiLCJuYXZpZ2F0b3IiLCJtYXhUb3VjaFBvaW50cyIsIl9wb2ludGVyRXZlbnQiLCJ3aW5kb3ciLCJQb2ludGVyRXZlbnQiLCJNU1BvaW50ZXJFdmVudCIsIl9hZGRFdmVudExpc3RlbmVycyIsIm5leHQiLCJfc2xpZGUiLCJuZXh0V2hlblZpc2libGUiLCJoaWRkZW4iLCJwcmV2IiwiY3ljbGUiLCJjbGVhckludGVydmFsIiwic2V0SW50ZXJ2YWwiLCJ2aXNpYmlsaXR5U3RhdGUiLCJiaW5kIiwidG8iLCJpbmRleCIsImFjdGl2ZUluZGV4IiwiX2dldEl0ZW1JbmRleCIsImxlbmd0aCIsImRpcmVjdGlvbiIsIm9mZiIsIl9oYW5kbGVTd2lwZSIsImFic0RlbHRheCIsImFicyIsIl9rZXlkb3duIiwiX2FkZFRvdWNoRXZlbnRMaXN0ZW5lcnMiLCJzdGFydCIsIm9yaWdpbmFsRXZlbnQiLCJwb2ludGVyVHlwZSIsImNsaWVudFgiLCJ0b3VjaGVzIiwibW92ZSIsImVuZCIsImNsZWFyVGltZW91dCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlIiwiYWRkIiwidGFnTmFtZSIsIndoaWNoIiwic2xpY2UiLCJpbmRleE9mIiwiX2dldEl0ZW1CeURpcmVjdGlvbiIsImlzTmV4dERpcmVjdGlvbiIsImlzUHJldkRpcmVjdGlvbiIsImxhc3RJdGVtSW5kZXgiLCJpc0dvaW5nVG9XcmFwIiwiZGVsdGEiLCJpdGVtSW5kZXgiLCJfdHJpZ2dlclNsaWRlRXZlbnQiLCJyZWxhdGVkVGFyZ2V0IiwiZXZlbnREaXJlY3Rpb25OYW1lIiwidGFyZ2V0SW5kZXgiLCJmcm9tSW5kZXgiLCJzbGlkZUV2ZW50IiwiZnJvbSIsIl9zZXRBY3RpdmVJbmRpY2F0b3JFbGVtZW50IiwiaW5kaWNhdG9ycyIsIm5leHRJbmRpY2F0b3IiLCJjaGlsZHJlbiIsImFkZENsYXNzIiwiYWN0aXZlRWxlbWVudEluZGV4IiwibmV4dEVsZW1lbnQiLCJuZXh0RWxlbWVudEluZGV4IiwiaXNDeWNsaW5nIiwiZGlyZWN0aW9uYWxDbGFzc05hbWUiLCJvcmRlckNsYXNzTmFtZSIsInNsaWRFdmVudCIsIm5leHRFbGVtZW50SW50ZXJ2YWwiLCJwYXJzZUludCIsImRlZmF1bHRJbnRlcnZhbCIsImFjdGlvbiIsIlR5cGVFcnJvciIsInJpZGUiLCJfZGF0YUFwaUNsaWNrSGFuZGxlciIsInNsaWRlSW5kZXgiLCJjYXJvdXNlbHMiLCJpIiwibGVuIiwiJGNhcm91c2VsIiwiU0hPV04iLCJISURFIiwiSElEREVOIiwiQ09MTEFQU0UiLCJDT0xMQVBTSU5HIiwiQ09MTEFQU0VEIiwiRGltZW5zaW9uIiwiV0lEVEgiLCJIRUlHSFQiLCJBQ1RJVkVTIiwiQ29sbGFwc2UiLCJfaXNUcmFuc2l0aW9uaW5nIiwiX3RyaWdnZXJBcnJheSIsImlkIiwidG9nZ2xlTGlzdCIsImVsZW0iLCJmaWx0ZXJFbGVtZW50IiwiZmlsdGVyIiwiZm91bmRFbGVtIiwiX3NlbGVjdG9yIiwicHVzaCIsIl9wYXJlbnQiLCJfZ2V0UGFyZW50IiwiX2FkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyIsImhpZGUiLCJzaG93IiwiYWN0aXZlcyIsImFjdGl2ZXNEYXRhIiwibm90Iiwic3RhcnRFdmVudCIsImRpbWVuc2lvbiIsIl9nZXREaW1lbnNpb24iLCJzdHlsZSIsImF0dHIiLCJzZXRUcmFuc2l0aW9uaW5nIiwiY29tcGxldGUiLCJjYXBpdGFsaXplZERpbWVuc2lvbiIsInNjcm9sbFNpemUiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ0cmlnZ2VyQXJyYXlMZW5ndGgiLCIkZWxlbSIsImlzVHJhbnNpdGlvbmluZyIsImhhc1dpZHRoIiwianF1ZXJ5IiwiX2dldFRhcmdldEZyb21FbGVtZW50IiwidHJpZ2dlckFycmF5IiwiaXNPcGVuIiwiJHRoaXMiLCJjdXJyZW50VGFyZ2V0IiwiJHRyaWdnZXIiLCJzZWxlY3RvcnMiLCIkdGFyZ2V0IiwiRVNDQVBFX0tFWUNPREUiLCJTUEFDRV9LRVlDT0RFIiwiVEFCX0tFWUNPREUiLCJBUlJPV19VUF9LRVlDT0RFIiwiQVJST1dfRE9XTl9LRVlDT0RFIiwiUklHSFRfTU9VU0VfQlVUVE9OX1dISUNIIiwiUkVHRVhQX0tFWURPV04iLCJDTElDSyIsIktFWURPV05fREFUQV9BUEkiLCJLRVlVUF9EQVRBX0FQSSIsIkRJU0FCTEVEIiwiRFJPUFVQIiwiRFJPUFJJR0hUIiwiRFJPUExFRlQiLCJNRU5VUklHSFQiLCJNRU5VTEVGVCIsIlBPU0lUSU9OX1NUQVRJQyIsIkZPUk1fQ0hJTEQiLCJNRU5VIiwiTkFWQkFSX05BViIsIlZJU0lCTEVfSVRFTVMiLCJBdHRhY2htZW50TWFwIiwiVE9QIiwiVE9QRU5EIiwiQk9UVE9NIiwiQk9UVE9NRU5EIiwiUklHSFRFTkQiLCJMRUZURU5EIiwib2Zmc2V0IiwiZmxpcCIsImJvdW5kYXJ5IiwicmVmZXJlbmNlIiwiZGlzcGxheSIsIkRyb3Bkb3duIiwiX3BvcHBlciIsIl9tZW51IiwiX2dldE1lbnVFbGVtZW50IiwiX2luTmF2YmFyIiwiX2RldGVjdE5hdmJhciIsImRpc2FibGVkIiwiX2dldFBhcmVudEZyb21FbGVtZW50IiwiaXNBY3RpdmUiLCJfY2xlYXJNZW51cyIsInNob3dFdmVudCIsIlBvcHBlciIsInJlZmVyZW5jZUVsZW1lbnQiLCJfZ2V0UG9wcGVyQ29uZmlnIiwiYm9keSIsIm5vb3AiLCJoaWRlRXZlbnQiLCJkZXN0cm95IiwidXBkYXRlIiwic2NoZWR1bGVVcGRhdGUiLCJzdG9wUHJvcGFnYXRpb24iLCJjb25zdHJ1Y3RvciIsIl9nZXRQbGFjZW1lbnQiLCIkcGFyZW50RHJvcGRvd24iLCJwbGFjZW1lbnQiLCJfZ2V0T2Zmc2V0Iiwib2Zmc2V0cyIsInBvcHBlckNvbmZpZyIsIm1vZGlmaWVycyIsImVuYWJsZWQiLCJwcmV2ZW50T3ZlcmZsb3ciLCJib3VuZGFyaWVzRWxlbWVudCIsImFwcGx5U3R5bGUiLCJ0b2dnbGVzIiwiY29udGV4dCIsImNsaWNrRXZlbnQiLCJkcm9wZG93bk1lbnUiLCJfZGF0YUFwaUtleWRvd25IYW5kbGVyIiwiaXRlbXMiLCJiYWNrZHJvcCIsIkZPQ1VTSU4iLCJSRVNJWkUiLCJDTElDS19ESVNNSVNTIiwiS0VZRE9XTl9ESVNNSVNTIiwiTU9VU0VVUF9ESVNNSVNTIiwiTU9VU0VET1dOX0RJU01JU1MiLCJTQ1JPTExBQkxFIiwiU0NST0xMQkFSX01FQVNVUkVSIiwiQkFDS0RST1AiLCJPUEVOIiwiRElBTE9HIiwiTU9EQUxfQk9EWSIsIkRBVEFfRElTTUlTUyIsIkZJWEVEX0NPTlRFTlQiLCJTVElDS1lfQ09OVEVOVCIsIk1vZGFsIiwiX2RpYWxvZyIsIl9iYWNrZHJvcCIsIl9pc1Nob3duIiwiX2lzQm9keU92ZXJmbG93aW5nIiwiX2lnbm9yZUJhY2tkcm9wQ2xpY2siLCJfc2Nyb2xsYmFyV2lkdGgiLCJfY2hlY2tTY3JvbGxiYXIiLCJfc2V0U2Nyb2xsYmFyIiwiX2FkanVzdERpYWxvZyIsIl9zZXRFc2NhcGVFdmVudCIsIl9zZXRSZXNpemVFdmVudCIsIl9zaG93QmFja2Ryb3AiLCJfc2hvd0VsZW1lbnQiLCJ0cmFuc2l0aW9uIiwiX2hpZGVNb2RhbCIsImZvckVhY2giLCJodG1sRWxlbWVudCIsImhhbmRsZVVwZGF0ZSIsIk5vZGUiLCJFTEVNRU5UX05PREUiLCJhcHBlbmRDaGlsZCIsInJlbW92ZUF0dHJpYnV0ZSIsInNjcm9sbFRvcCIsIl9lbmZvcmNlRm9jdXMiLCJzaG93bkV2ZW50IiwidHJhbnNpdGlvbkNvbXBsZXRlIiwiaGFzIiwiX3Jlc2V0QWRqdXN0bWVudHMiLCJfcmVzZXRTY3JvbGxiYXIiLCJfcmVtb3ZlQmFja2Ryb3AiLCJjYWxsYmFjayIsImFuaW1hdGUiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwiYXBwZW5kVG8iLCJiYWNrZHJvcFRyYW5zaXRpb25EdXJhdGlvbiIsImNhbGxiYWNrUmVtb3ZlIiwiaXNNb2RhbE92ZXJmbG93aW5nIiwic2Nyb2xsSGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwicGFkZGluZ0xlZnQiLCJwYWRkaW5nUmlnaHQiLCJyZWN0IiwibGVmdCIsInJpZ2h0IiwiaW5uZXJXaWR0aCIsIl9nZXRTY3JvbGxiYXJXaWR0aCIsImZpeGVkQ29udGVudCIsInN0aWNreUNvbnRlbnQiLCJhY3R1YWxQYWRkaW5nIiwiY2FsY3VsYXRlZFBhZGRpbmciLCJhY3R1YWxNYXJnaW4iLCJtYXJnaW5SaWdodCIsImNhbGN1bGF0ZWRNYXJnaW4iLCJwYWRkaW5nIiwiZWxlbWVudHMiLCJtYXJnaW4iLCJzY3JvbGxEaXYiLCJzY3JvbGxiYXJXaWR0aCIsIndpZHRoIiwiY2xpZW50V2lkdGgiLCJyZW1vdmVDaGlsZCIsInVyaUF0dHJzIiwiQVJJQV9BVFRSSUJVVEVfUEFUVEVSTiIsIkRlZmF1bHRXaGl0ZWxpc3QiLCJhIiwiYXJlYSIsImIiLCJiciIsImNvbCIsImNvZGUiLCJkaXYiLCJlbSIsImhyIiwiaDEiLCJoMiIsImgzIiwiaDQiLCJoNSIsImg2IiwiaW1nIiwibGkiLCJvbCIsInAiLCJwcmUiLCJzIiwic21hbGwiLCJzcGFuIiwic3ViIiwic3VwIiwic3Ryb25nIiwidSIsInVsIiwiU0FGRV9VUkxfUEFUVEVSTiIsIkRBVEFfVVJMX1BBVFRFUk4iLCJhbGxvd2VkQXR0cmlidXRlIiwiYWxsb3dlZEF0dHJpYnV0ZUxpc3QiLCJhdHRyTmFtZSIsIm5vZGVOYW1lIiwibm9kZVZhbHVlIiwicmVnRXhwIiwiYXR0clJlZ2V4IiwibCIsInNhbml0aXplSHRtbCIsInVuc2FmZUh0bWwiLCJ3aGl0ZUxpc3QiLCJzYW5pdGl6ZUZuIiwiZG9tUGFyc2VyIiwiRE9NUGFyc2VyIiwiY3JlYXRlZERvY3VtZW50IiwicGFyc2VGcm9tU3RyaW5nIiwid2hpdGVsaXN0S2V5cyIsImtleXMiLCJlbCIsImVsTmFtZSIsImF0dHJpYnV0ZUxpc3QiLCJhdHRyaWJ1dGVzIiwid2hpdGVsaXN0ZWRBdHRyaWJ1dGVzIiwiY29uY2F0IiwiaW5uZXJIVE1MIiwiQ0xBU1NfUFJFRklYIiwiQlNDTFNfUFJFRklYX1JFR0VYIiwiRElTQUxMT1dFRF9BVFRSSUJVVEVTIiwiYW5pbWF0aW9uIiwidGVtcGxhdGUiLCJ0aXRsZSIsImRlbGF5IiwiaHRtbCIsImNvbnRhaW5lciIsImZhbGxiYWNrUGxhY2VtZW50Iiwic2FuaXRpemUiLCJBVVRPIiwiSG92ZXJTdGF0ZSIsIk9VVCIsIklOU0VSVEVEIiwiRk9DVVNPVVQiLCJUT09MVElQIiwiVE9PTFRJUF9JTk5FUiIsIkFSUk9XIiwiVHJpZ2dlciIsIkhPVkVSIiwiTUFOVUFMIiwiVG9vbHRpcCIsIl9pc0VuYWJsZWQiLCJfdGltZW91dCIsIl9ob3ZlclN0YXRlIiwiX2FjdGl2ZVRyaWdnZXIiLCJ0aXAiLCJfc2V0TGlzdGVuZXJzIiwiZW5hYmxlIiwiZGlzYWJsZSIsInRvZ2dsZUVuYWJsZWQiLCJkYXRhS2V5IiwiX2dldERlbGVnYXRlQ29uZmlnIiwiY2xpY2siLCJfaXNXaXRoQWN0aXZlVHJpZ2dlciIsIl9lbnRlciIsIl9sZWF2ZSIsImdldFRpcEVsZW1lbnQiLCJpc1dpdGhDb250ZW50Iiwic2hhZG93Um9vdCIsImlzSW5UaGVEb20iLCJvd25lckRvY3VtZW50IiwidGlwSWQiLCJzZXRDb250ZW50IiwiYXR0YWNobWVudCIsIl9nZXRBdHRhY2htZW50IiwiYWRkQXR0YWNobWVudENsYXNzIiwiX2dldENvbnRhaW5lciIsImJlaGF2aW9yIiwiYXJyb3ciLCJvbkNyZWF0ZSIsIm9yaWdpbmFsUGxhY2VtZW50IiwiX2hhbmRsZVBvcHBlclBsYWNlbWVudENoYW5nZSIsIm9uVXBkYXRlIiwiX2ZpeFRyYW5zaXRpb24iLCJwcmV2SG92ZXJTdGF0ZSIsIl9jbGVhblRpcENsYXNzIiwiZ2V0VGl0bGUiLCJzZXRFbGVtZW50Q29udGVudCIsImNvbnRlbnQiLCJlbXB0eSIsImFwcGVuZCIsInRleHQiLCJmaW5kIiwidHJpZ2dlcnMiLCJldmVudEluIiwiZXZlbnRPdXQiLCJfZml4VGl0bGUiLCJ0aXRsZVR5cGUiLCJkYXRhQXR0cmlidXRlcyIsImRhdGFBdHRyIiwia2V5IiwiJHRpcCIsInRhYkNsYXNzIiwiam9pbiIsInBvcHBlckRhdGEiLCJwb3BwZXJJbnN0YW5jZSIsImluc3RhbmNlIiwicG9wcGVyIiwiaW5pdENvbmZpZ0FuaW1hdGlvbiIsIlRJVExFIiwiQ09OVEVOVCIsIlBvcG92ZXIiLCJfZ2V0Q29udGVudCIsIm1ldGhvZCIsIkFDVElWQVRFIiwiU0NST0xMIiwiRFJPUERPV05fSVRFTSIsIkRST1BET1dOX01FTlUiLCJEQVRBX1NQWSIsIk5BVl9MSVNUX0dST1VQIiwiTkFWX0xJTktTIiwiTkFWX0lURU1TIiwiTElTVF9JVEVNUyIsIkRST1BET1dOIiwiRFJPUERPV05fSVRFTVMiLCJEUk9QRE9XTl9UT0dHTEUiLCJPZmZzZXRNZXRob2QiLCJPRkZTRVQiLCJQT1NJVElPTiIsIlNjcm9sbFNweSIsIl9zY3JvbGxFbGVtZW50IiwiX29mZnNldHMiLCJfdGFyZ2V0cyIsIl9hY3RpdmVUYXJnZXQiLCJfc2Nyb2xsSGVpZ2h0IiwiX3Byb2Nlc3MiLCJyZWZyZXNoIiwiYXV0b01ldGhvZCIsIm9mZnNldE1ldGhvZCIsIm9mZnNldEJhc2UiLCJfZ2V0U2Nyb2xsVG9wIiwiX2dldFNjcm9sbEhlaWdodCIsInRhcmdldHMiLCJtYXAiLCJ0YXJnZXRTZWxlY3RvciIsInRhcmdldEJDUiIsImhlaWdodCIsInRvcCIsIml0ZW0iLCJzb3J0IiwicGFnZVlPZmZzZXQiLCJtYXgiLCJfZ2V0T2Zmc2V0SGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJtYXhTY3JvbGwiLCJfYWN0aXZhdGUiLCJfY2xlYXIiLCJvZmZzZXRMZW5ndGgiLCJpc0FjdGl2ZVRhcmdldCIsInF1ZXJpZXMiLCIkbGluayIsInBhcmVudHMiLCJub2RlIiwic2Nyb2xsU3B5cyIsInNjcm9sbFNweXNMZW5ndGgiLCIkc3B5IiwiQUNUSVZFX1VMIiwiRFJPUERPV05fQUNUSVZFX0NISUxEIiwiVGFiIiwicHJldmlvdXMiLCJsaXN0RWxlbWVudCIsIml0ZW1TZWxlY3RvciIsIm1ha2VBcnJheSIsImhpZGRlbkV2ZW50IiwiYWN0aXZlRWxlbWVudHMiLCJhY3RpdmUiLCJfdHJhbnNpdGlvbkNvbXBsZXRlIiwiZHJvcGRvd25DaGlsZCIsImRyb3Bkb3duRWxlbWVudCIsImRyb3Bkb3duVG9nZ2xlTGlzdCIsIlNIT1dJTkciLCJhdXRvaGlkZSIsIlRvYXN0Iiwid2l0aG91dFRpbWVvdXQiLCJfY2xvc2UiLCJ2ZXJzaW9uIiwibWluTWFqb3IiLCJsdE1ham9yIiwibWluTWlub3IiLCJtaW5QYXRjaCIsIm1heE1ham9yIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUFBQTs7Ozs7O0FBT0EsRUFFQTs7Ozs7O0VBTUEsSUFBTUEsY0FBYyxHQUFHLGVBQXZCO0VBQ0EsSUFBTUMsT0FBTyxHQUFHLE9BQWhCO0VBQ0EsSUFBTUMsdUJBQXVCLEdBQUcsSUFBaEM7O0VBR0EsU0FBU0MsTUFBVCxDQUFnQkMsR0FBaEIsRUFBcUI7RUFDbkIsU0FBTyxHQUFHQyxRQUFILENBQVlDLElBQVosQ0FBaUJGLEdBQWpCLEVBQXNCRyxLQUF0QixDQUE0QixhQUE1QixFQUEyQyxDQUEzQyxFQUE4Q0MsV0FBOUMsRUFBUDtFQUNEOztFQUVELFNBQVNDLDRCQUFULEdBQXdDO0VBQ3RDLFNBQU87RUFDTEMsSUFBQUEsUUFBUSxFQUFFVixjQURMO0VBRUxXLElBQUFBLFlBQVksRUFBRVgsY0FGVDtFQUdMWSxJQUFBQSxNQUhLLGtCQUdF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LENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztFQUNsRSxHQUFHO0VBQ0gsQ0FBQzs7RUFFRDtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBLFNBQVMsU0FBUyxDQUFDLENBQUMsRUFBRTtFQUN0QixFQUFFLE9BQU8sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDMUQsQ0FBQzs7RUFFRDtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0EsU0FBUyxTQUFTLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRTtFQUNwQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsSUFBSSxFQUFFO0VBQzlDLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDO0VBQ2xCO0VBQ0EsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO0VBQy9HLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQztFQUNsQixLQUFLO0VBQ0wsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7RUFDOUMsR0FBRyxDQUFDLENBQUM7RUFDTCxDQUFDOztFQUVEO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQSxTQUFTLGFBQWEsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFO0VBQzVDLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxJ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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4zLjEpOiB1dGlsLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBQcml2YXRlIFRyYW5zaXRpb25FbmQgSGVscGVyc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY29uc3QgVFJBTlNJVElPTl9FTkQgPSAndHJhbnNpdGlvbmVuZCdcbmNvbnN0IE1BWF9VSUQgPSAxMDAwMDAwXG5jb25zdCBNSUxMSVNFQ09ORFNfTVVMVElQTElFUiA9IDEwMDBcblxuLy8gU2hvdXRvdXQgQW5ndXNDcm9sbCAoaHR0cHM6Ly9nb28uZ2wvcHh3UUdwKVxuZnVuY3Rpb24gdG9UeXBlKG9iaikge1xuICByZXR1cm4ge30udG9TdHJpbmcuY2FsbChvYmopLm1hdGNoKC9cXHMoW2Etel0rKS9pKVsxXS50b0xvd2VyQ2FzZSgpXG59XG5cbmZ1bmN0aW9uIGdldFNwZWNpYWxUcmFuc2l0aW9uRW5kRXZlbnQoKSB7XG4gIHJldHVybiB7XG4gICAgYmluZFR5cGU6IFRSQU5TSVRJT05fRU5ELFxuICAgIGRlbGVnYXRlVHlwZTogVFJBTlNJVElPTl9FTkQsXG4gICAgaGFuZGxlKGV2ZW50KSB7XG4gICAgICBpZiAoJChldmVudC50YXJnZXQpLmlzKHRoaXMpKSB7XG4gICAgICAgIHJldHVybiBldmVudC5oYW5kbGVPYmouaGFuZGxlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcHJlZmVyLXJlc3QtcGFyYW1zXG4gICAgICB9XG4gICAgICByZXR1cm4gdW5kZWZpbmVkIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZpbmVkXG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHRyYW5zaXRpb25FbmRFbXVsYXRvcihkdXJhdGlvbikge1xuICBsZXQgY2FsbGVkID0gZmFsc2VcblxuICAkKHRoaXMpLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCAoKSA9PiB7XG4gICAgY2FsbGVkID0gdHJ1ZVxuICB9KVxuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmICghY2FsbGVkKSB7XG4gICAgICBVdGlsLnRyaWdnZXJUcmFuc2l0aW9uRW5kKHRoaXMpXG4gICAgfVxuICB9LCBkdXJhdGlvbilcblxuICByZXR1cm4gdGhpc1xufVxuXG5mdW5jdGlvbiBzZXRUcmFuc2l0aW9uRW5kU3VwcG9ydCgpIHtcbiAgJC5mbi5lbXVsYXRlVHJhbnNpdGlvbkVuZCA9IHRyYW5zaXRpb25FbmRFbXVsYXRvclxuICAkLmV2ZW50LnNwZWNpYWxbVXRpbC5UUkFOU0lUSU9OX0VORF0gPSBnZXRTcGVjaWFsVHJhbnNpdGlvbkVuZEV2ZW50KClcbn1cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogUHVibGljIFV0aWwgQXBpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IFV0aWwgPSB7XG5cbiAgVFJBTlNJVElPTl9FTkQ6ICdic1RyYW5zaXRpb25FbmQnLFxuXG4gIGdldFVJRChwcmVmaXgpIHtcbiAgICBkbyB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYml0d2lzZVxuICAgICAgcHJlZml4ICs9IH5+KE1hdGgucmFuZG9tKCkgKiBNQVhfVUlEKSAvLyBcIn5+XCIgYWN0cyBsaWtlIGEgZmFzdGVyIE1hdGguZmxvb3IoKSBoZXJlXG4gICAgfSB3aGlsZSAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJlZml4KSlcbiAgICByZXR1cm4gcHJlZml4XG4gIH0sXG5cbiAgZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtZW50KSB7XG4gICAgbGV0IHNlbGVjdG9yID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JylcblxuICAgIGlmICghc2VsZWN0b3IgfHwgc2VsZWN0b3IgPT09ICcjJykge1xuICAgICAgY29uc3QgaHJlZkF0dHIgPSBlbGVtZW50LmdldEF0dHJpYnV0ZSgnaHJlZicpXG4gICAgICBzZWxlY3RvciA9IGhyZWZBdHRyICYmIGhyZWZBdHRyICE9PSAnIycgPyBocmVmQXR0ci50cmltKCkgOiAnJ1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcikgPyBzZWxlY3RvciA6IG51bGxcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9LFxuXG4gIGdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KGVsZW1lbnQpIHtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHJldHVybiAwXG4gICAgfVxuXG4gICAgLy8gR2V0IHRyYW5zaXRpb24tZHVyYXRpb24gb2YgdGhlIGVsZW1lbnRcbiAgICBsZXQgdHJhbnNpdGlvbkR1cmF0aW9uID0gJChlbGVtZW50KS5jc3MoJ3RyYW5zaXRpb24tZHVyYXRpb24nKVxuICAgIGxldCB0cmFuc2l0aW9uRGVsYXkgPSAkKGVsZW1lbnQpLmNzcygndHJhbnNpdGlvbi1kZWxheScpXG5cbiAgICBjb25zdCBmbG9hdFRyYW5zaXRpb25EdXJhdGlvbiA9IHBhcnNlRmxvYXQodHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIGNvbnN0IGZsb2F0VHJhbnNpdGlvbkRlbGF5ID0gcGFyc2VGbG9hdCh0cmFuc2l0aW9uRGVsYXkpXG5cbiAgICAvLyBSZXR1cm4gMCBpZiBlbGVtZW50IG9yIHRyYW5zaXRpb24gZHVyYXRpb24gaXMgbm90IGZvdW5kXG4gICAgaWYgKCFmbG9hdFRyYW5zaXRpb25EdXJhdGlvbiAmJiAhZmxvYXRUcmFuc2l0aW9uRGVsYXkpIHtcbiAgICAgIHJldHVybiAwXG4gICAgfVxuXG4gICAgLy8gSWYgbXVsdGlwbGUgZHVyYXRpb25zIGFyZSBkZWZpbmVkLCB0YWtlIHRoZSBmaXJzdFxuICAgIHRyYW5zaXRpb25EdXJhdGlvbiA9IHRyYW5zaXRpb25EdXJhdGlvbi5zcGxpdCgnLCcpWzBdXG4gICAgdHJhbnNpdGlvbkRlbGF5ID0gdHJhbnNpdGlvbkRlbGF5LnNwbGl0KCcsJylbMF1cblxuICAgIHJldHVybiAocGFyc2VGbG9hdCh0cmFuc2l0aW9uRHVyYXRpb24pICsgcGFyc2VGbG9hdCh0cmFuc2l0aW9uRGVsYXkpKSAqIE1JTExJU0VDT05EU19NVUxUSVBMSUVSXG4gIH0sXG5cbiAgcmVmbG93KGVsZW1lbnQpIHtcbiAgICByZXR1cm4gZWxlbWVudC5vZmZzZXRIZWlnaHRcbiAgfSxcblxuICB0cmlnZ2VyVHJhbnNpdGlvbkVuZChlbGVtZW50KSB7XG4gICAgJChlbGVtZW50KS50cmlnZ2VyKFRSQU5TSVRJT05fRU5EKVxuICB9LFxuXG4gIC8vIFRPRE86IFJlbW92ZSBpbiB2NVxuICBzdXBwb3J0c1RyYW5zaXRpb25FbmQoKSB7XG4gICAgcmV0dXJuIEJvb2xlYW4oVFJBTlNJVElPTl9FTkQpXG4gIH0sXG5cbiAgaXNFbGVtZW50KG9iaikge1xuICAgIHJldHVybiAob2JqWzBdIHx8IG9iaikubm9kZVR5cGVcbiAgfSxcblxuICB0eXBlQ2hlY2tDb25maWcoY29tcG9uZW50TmFtZSwgY29uZmlnLCBjb25maWdUeXBlcykge1xuICAgIGZvciAoY29uc3QgcHJvcGVydHkgaW4gY29uZmlnVHlwZXMpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29uZmlnVHlwZXMsIHByb3BlcnR5KSkge1xuICAgICAgICBjb25zdCBleHBlY3RlZFR5cGVzID0gY29uZmlnVHlwZXNbcHJvcGVydHldXG4gICAgICAgIGNvbnN0IHZhbHVlICAgICAgICAgPSBjb25maWdbcHJvcGVydHldXG4gICAgICAgIGNvbnN0IHZhbHVlVHlwZSAgICAgPSB2YWx1ZSAmJiBVdGlsLmlzRWxlbWVudCh2YWx1ZSlcbiAgICAgICAgICA/ICdlbGVtZW50JyA6IHRvVHlwZSh2YWx1ZSlcblxuICAgICAgICBpZiAoIW5ldyBSZWdFeHAoZXhwZWN0ZWRUeXBlcykudGVzdCh2YWx1ZVR5cGUpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYCR7Y29tcG9uZW50TmFtZS50b1VwcGVyQ2FzZSgpfTogYCArXG4gICAgICAgICAgICBgT3B0aW9uIFwiJHtwcm9wZXJ0eX1cIiBwcm92aWRlZCB0eXBlIFwiJHt2YWx1ZVR5cGV9XCIgYCArXG4gICAgICAgICAgICBgYnV0IGV4cGVjdGVkIHR5cGUgXCIke2V4cGVjdGVkVHlwZXN9XCIuYClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBmaW5kU2hhZG93Um9vdChlbGVtZW50KSB7XG4gICAgaWYgKCFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYXR0YWNoU2hhZG93KSB7XG4gICAgICByZXR1cm4gbnVsbFxuICAgIH1cblxuICAgIC8vIENhbiBmaW5kIHRoZSBzaGFkb3cgcm9vdCBvdGhlcndpc2UgaXQnbGwgcmV0dXJuIHRoZSBkb2N1bWVudFxuICAgIGlmICh0eXBlb2YgZWxlbWVudC5nZXRSb290Tm9kZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3Qgcm9vdCA9IGVsZW1lbnQuZ2V0Um9vdE5vZGUoKVxuICAgICAgcmV0dXJuIHJvb3QgaW5zdGFuY2VvZiBTaGFkb3dSb290ID8gcm9vdCA6IG51bGxcbiAgICB9XG5cbiAgICBpZiAoZWxlbWVudCBpbnN0YW5jZW9mIFNoYWRvd1Jvb3QpIHtcbiAgICAgIHJldHVybiBlbGVtZW50XG4gICAgfVxuXG4gICAgLy8gd2hlbiB3ZSBkb24ndCBmaW5kIGEgc2hhZG93IHJvb3RcbiAgICBpZiAoIWVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG5cbiAgICByZXR1cm4gVXRpbC5maW5kU2hhZG93Um9vdChlbGVtZW50LnBhcmVudE5vZGUpXG4gIH1cbn1cblxuc2V0VHJhbnNpdGlvbkVuZFN1cHBvcnQoKVxuXG5leHBvcnQgZGVmYXVsdCBVdGlsXG4iLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgKHY0LjMuMSk6IGFsZXJ0LmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb25zdGFudHNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IE5BTUUgICAgICAgICAgICAgICAgPSAnYWxlcnQnXG5jb25zdCBWRVJTSU9OICAgICAgICAgICAgID0gJzQuMy4xJ1xuY29uc3QgREFUQV9LRVkgICAgICAgICAgICA9ICdicy5hbGVydCdcbmNvbnN0IEVWRU5UX0tFWSAgICAgICAgICAgPSBgLiR7REFUQV9LRVl9YFxuY29uc3QgREFUQV9BUElfS0VZICAgICAgICA9ICcuZGF0YS1hcGknXG5jb25zdCBKUVVFUllfTk9fQ09ORkxJQ1QgID0gJC5mbltOQU1FXVxuXG5jb25zdCBTZWxlY3RvciA9IHtcbiAgRElTTUlTUyA6ICdbZGF0YS1kaXNtaXNzPVwiYWxlcnRcIl0nXG59XG5cbmNvbnN0IEV2ZW50ID0ge1xuICBDTE9TRSAgICAgICAgICA6IGBjbG9zZSR7RVZFTlRfS0VZfWAsXG4gIENMT1NFRCAgICAgICAgIDogYGNsb3NlZCR7RVZFTlRfS0VZfWAsXG4gIENMSUNLX0RBVEFfQVBJIDogYGNsaWNrJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YFxufVxuXG5jb25zdCBDbGFzc05hbWUgPSB7XG4gIEFMRVJUIDogJ2FsZXJ0JyxcbiAgRkFERSAgOiAnZmFkZScsXG4gIFNIT1cgIDogJ3Nob3cnXG59XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDbGFzcyBEZWZpbml0aW9uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jbGFzcyBBbGVydCB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudFxuICB9XG5cbiAgLy8gR2V0dGVyc1xuXG4gIHN0YXRpYyBnZXQgVkVSU0lPTigpIHtcbiAgICByZXR1cm4gVkVSU0lPTlxuICB9XG5cbiAgLy8gUHVibGljXG5cbiAgY2xvc2UoZWxlbWVudCkge1xuICAgIGxldCByb290RWxlbWVudCA9IHRoaXMuX2VsZW1lbnRcbiAgICBpZiAoZWxlbWVudCkge1xuICAgICAgcm9vdEVsZW1lbnQgPSB0aGlzLl9nZXRSb290RWxlbWVudChlbGVtZW50KVxuICAgIH1cblxuICAgIGNvbnN0IGN1c3RvbUV2ZW50ID0gdGhpcy5fdHJpZ2dlckNsb3NlRXZlbnQocm9vdEVsZW1lbnQpXG5cbiAgICBpZiAoY3VzdG9tRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuX3JlbW92ZUVsZW1lbnQocm9vdEVsZW1lbnQpXG4gIH1cblxuICBkaXNwb3NlKCkge1xuICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSlcbiAgICB0aGlzLl9lbGVtZW50ID0gbnVsbFxuICB9XG5cbiAgLy8gUHJpdmF0ZVxuXG4gIF9nZXRSb290RWxlbWVudChlbGVtZW50KSB7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSBVdGlsLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQoZWxlbWVudClcbiAgICBsZXQgcGFyZW50ICAgICA9IGZhbHNlXG5cbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgIHBhcmVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG4gICAgfVxuXG4gICAgaWYgKCFwYXJlbnQpIHtcbiAgICAgIHBhcmVudCA9ICQoZWxlbWVudCkuY2xvc2VzdChgLiR7Q2xhc3NOYW1lLkFMRVJUfWApWzBdXG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcmVudFxuICB9XG5cbiAgX3RyaWdnZXJDbG9zZUV2ZW50KGVsZW1lbnQpIHtcbiAgICBjb25zdCBjbG9zZUV2ZW50ID0gJC5FdmVudChFdmVudC5DTE9TRSlcblxuICAgICQoZWxlbWVudCkudHJpZ2dlcihjbG9zZUV2ZW50KVxuICAgIHJldHVybiBjbG9zZUV2ZW50XG4gIH1cblxuICBfcmVtb3ZlRWxlbWVudChlbGVtZW50KSB7XG4gICAgJChlbGVtZW50KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuU0hPVylcblxuICAgIGlmICghJChlbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcbiAgICAgIHRoaXMuX2Rlc3Ryb3lFbGVtZW50KGVsZW1lbnQpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCB0cmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KGVsZW1lbnQpXG5cbiAgICAkKGVsZW1lbnQpXG4gICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIChldmVudCkgPT4gdGhpcy5fZGVzdHJveUVsZW1lbnQoZWxlbWVudCwgZXZlbnQpKVxuICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKHRyYW5zaXRpb25EdXJhdGlvbilcbiAgfVxuXG4gIF9kZXN0cm95RWxlbWVudChlbGVtZW50KSB7XG4gICAgJChlbGVtZW50KVxuICAgICAgLmRldGFjaCgpXG4gICAgICAudHJpZ2dlcihFdmVudC5DTE9TRUQpXG4gICAgICAucmVtb3ZlKClcbiAgfVxuXG4gIC8vIFN0YXRpY1xuXG4gIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgJGVsZW1lbnQgPSAkKHRoaXMpXG4gICAgICBsZXQgZGF0YSAgICAgICA9ICRlbGVtZW50LmRhdGEoREFUQV9LRVkpXG5cbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICBkYXRhID0gbmV3IEFsZXJ0KHRoaXMpXG4gICAgICAgICRlbGVtZW50LmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICB9XG5cbiAgICAgIGlmIChjb25maWcgPT09ICdjbG9zZScpIHtcbiAgICAgICAgZGF0YVtjb25maWddKHRoaXMpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIHN0YXRpYyBfaGFuZGxlRGlzbWlzcyhhbGVydEluc3RhbmNlKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgIH1cblxuICAgICAgYWxlcnRJbnN0YW5jZS5jbG9zZSh0aGlzKVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbiQoZG9jdW1lbnQpLm9uKFxuICBFdmVudC5DTElDS19EQVRBX0FQSSxcbiAgU2VsZWN0b3IuRElTTUlTUyxcbiAgQWxlcnQuX2hhbmRsZURpc21pc3MobmV3IEFsZXJ0KCkpXG4pXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBqUXVlcnlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbiQuZm5bTkFNRV0gICAgICAgICAgICAgPSBBbGVydC5falF1ZXJ5SW50ZXJmYWNlXG4kLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gQWxlcnRcbiQuZm5bTkFNRV0ubm9Db25mbGljdCAgPSAoKSA9PiB7XG4gICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgcmV0dXJuIEFsZXJ0Ll9qUXVlcnlJbnRlcmZhY2Vcbn1cblxuZXhwb3J0IGRlZmF1bHQgQWxlcnRcbiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuMy4xKTogYnV0dG9uLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb25zdGFudHNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IE5BTUUgICAgICAgICAgICAgICAgPSAnYnV0dG9uJ1xuY29uc3QgVkVSU0lPTiAgICAgICAgICAgICA9ICc0LjMuMSdcbmNvbnN0IERBVEFfS0VZICAgICAgICAgICAgPSAnYnMuYnV0dG9uJ1xuY29uc3QgRVZFTlRfS0VZICAgICAgICAgICA9IGAuJHtEQVRBX0tFWX1gXG5jb25zdCBEQVRBX0FQSV9LRVkgICAgICAgID0gJy5kYXRhLWFwaSdcbmNvbnN0IEpRVUVSWV9OT19DT05GTElDVCAgPSAkLmZuW05BTUVdXG5cbmNvbnN0IENsYXNzTmFtZSA9IHtcbiAgQUNUSVZFIDogJ2FjdGl2ZScsXG4gIEJVVFRPTiA6ICdidG4nLFxuICBGT0NVUyAgOiAnZm9jdXMnXG59XG5cbmNvbnN0IFNlbGVjdG9yID0ge1xuICBEQVRBX1RPR0dMRV9DQVJST1QgOiAnW2RhdGEtdG9nZ2xlXj1cImJ1dHRvblwiXScsXG4gIERBVEFfVE9HR0xFICAgICAgICA6ICdbZGF0YS10b2dnbGU9XCJidXR0b25zXCJdJyxcbiAgSU5QVVQgICAgICAgICAgICAgIDogJ2lucHV0Om5vdChbdHlwZT1cImhpZGRlblwiXSknLFxuICBBQ1RJVkUgICAgICAgICAgICAgOiAnLmFjdGl2ZScsXG4gIEJVVFRPTiAgICAgICAgICAgICA6ICcuYnRuJ1xufVxuXG5jb25zdCBFdmVudCA9IHtcbiAgQ0xJQ0tfREFUQV9BUEkgICAgICA6IGBjbGljayR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWAsXG4gIEZPQ1VTX0JMVVJfREFUQV9BUEkgOiBgZm9jdXMke0VWRU5UX0tFWX0ke0RBVEFfQVBJX0tFWX0gYCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGBibHVyJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YFxufVxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2xhc3MgRGVmaW5pdGlvblxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY2xhc3MgQnV0dG9uIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50XG4gIH1cblxuICAvLyBHZXR0ZXJzXG5cbiAgc3RhdGljIGdldCBWRVJTSU9OKCkge1xuICAgIHJldHVybiBWRVJTSU9OXG4gIH1cblxuICAvLyBQdWJsaWNcblxuICB0b2dnbGUoKSB7XG4gICAgbGV0IHRyaWdnZXJDaGFuZ2VFdmVudCA9IHRydWVcbiAgICBsZXQgYWRkQXJpYVByZXNzZWQgPSB0cnVlXG4gICAgY29uc3Qgcm9vdEVsZW1lbnQgPSAkKHRoaXMuX2VsZW1lbnQpLmNsb3Nlc3QoXG4gICAgICBTZWxlY3Rvci5EQVRBX1RPR0dMRVxuICAgIClbMF1cblxuICAgIGlmIChyb290RWxlbWVudCkge1xuICAgICAgY29uc3QgaW5wdXQgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuSU5QVVQpXG5cbiAgICAgIGlmIChpbnB1dCkge1xuICAgICAgICBpZiAoaW5wdXQudHlwZSA9PT0gJ3JhZGlvJykge1xuICAgICAgICAgIGlmIChpbnB1dC5jaGVja2VkICYmXG4gICAgICAgICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhDbGFzc05hbWUuQUNUSVZFKSkge1xuICAgICAgICAgICAgdHJpZ2dlckNoYW5nZUV2ZW50ID0gZmFsc2VcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc3QgYWN0aXZlRWxlbWVudCA9IHJvb3RFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuQUNUSVZFKVxuXG4gICAgICAgICAgICBpZiAoYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAkKGFjdGl2ZUVsZW1lbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRyaWdnZXJDaGFuZ2VFdmVudCkge1xuICAgICAgICAgIGlmIChpbnB1dC5oYXNBdHRyaWJ1dGUoJ2Rpc2FibGVkJykgfHxcbiAgICAgICAgICAgIHJvb3RFbGVtZW50Lmhhc0F0dHJpYnV0ZSgnZGlzYWJsZWQnKSB8fFxuICAgICAgICAgICAgaW5wdXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdkaXNhYmxlZCcpIHx8XG4gICAgICAgICAgICByb290RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoJ2Rpc2FibGVkJykpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgICBpbnB1dC5jaGVja2VkID0gIXRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKENsYXNzTmFtZS5BQ1RJVkUpXG4gICAgICAgICAgJChpbnB1dCkudHJpZ2dlcignY2hhbmdlJylcbiAgICAgICAgfVxuXG4gICAgICAgIGlucHV0LmZvY3VzKClcbiAgICAgICAgYWRkQXJpYVByZXNzZWQgPSBmYWxzZVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhZGRBcmlhUHJlc3NlZCkge1xuICAgICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcsXG4gICAgICAgICF0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhDbGFzc05hbWUuQUNUSVZFKSlcbiAgICB9XG5cbiAgICBpZiAodHJpZ2dlckNoYW5nZUV2ZW50KSB7XG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLnRvZ2dsZUNsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG4gICAgfVxuICB9XG5cbiAgZGlzcG9zZSgpIHtcbiAgICAkLnJlbW92ZURhdGEodGhpcy5fZWxlbWVudCwgREFUQV9LRVkpXG4gICAgdGhpcy5fZWxlbWVudCA9IG51bGxcbiAgfVxuXG4gIC8vIFN0YXRpY1xuXG4gIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGRhdGEgPSAkKHRoaXMpLmRhdGEoREFUQV9LRVkpXG5cbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICBkYXRhID0gbmV3IEJ1dHRvbih0aGlzKVxuICAgICAgICAkKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICB9XG5cbiAgICAgIGlmIChjb25maWcgPT09ICd0b2dnbGUnKSB7XG4gICAgICAgIGRhdGFbY29uZmlnXSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbiQoZG9jdW1lbnQpXG4gIC5vbihFdmVudC5DTElDS19EQVRBX0FQSSwgU2VsZWN0b3IuREFUQV9UT0dHTEVfQ0FSUk9ULCAoZXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICBsZXQgYnV0dG9uID0gZXZlbnQudGFyZ2V0XG5cbiAgICBpZiAoISQoYnV0dG9uKS5oYXNDbGFzcyhDbGFzc05hbWUuQlVUVE9OKSkge1xuICAgICAgYnV0dG9uID0gJChidXR0b24pLmNsb3Nlc3QoU2VsZWN0b3IuQlVUVE9OKVxuICAgIH1cblxuICAgIEJ1dHRvbi5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJChidXR0b24pLCAndG9nZ2xlJylcbiAgfSlcbiAgLm9uKEV2ZW50LkZPQ1VTX0JMVVJfREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfVE9HR0xFX0NBUlJPVCwgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gJChldmVudC50YXJnZXQpLmNsb3Nlc3QoU2VsZWN0b3IuQlVUVE9OKVswXVxuICAgICQoYnV0dG9uKS50b2dnbGVDbGFzcyhDbGFzc05hbWUuRk9DVVMsIC9eZm9jdXMoaW4pPyQvLnRlc3QoZXZlbnQudHlwZSkpXG4gIH0pXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBqUXVlcnlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbiQuZm5bTkFNRV0gPSBCdXR0b24uX2pRdWVyeUludGVyZmFjZVxuJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IEJ1dHRvblxuJC5mbltOQU1FXS5ub0NvbmZsaWN0ID0gKCkgPT4ge1xuICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUXG4gIHJldHVybiBCdXR0b24uX2pRdWVyeUludGVyZmFjZVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdXR0b25cbiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuMy4xKTogY2Fyb3VzZWwuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCdcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvbnN0YW50c1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY29uc3QgTkFNRSAgICAgICAgICAgICAgICAgICA9ICdjYXJvdXNlbCdcbmNvbnN0IFZFUlNJT04gICAgICAgICAgICAgICAgPSAnNC4zLjEnXG5jb25zdCBEQVRBX0tFWSAgICAgICAgICAgICAgID0gJ2JzLmNhcm91c2VsJ1xuY29uc3QgRVZFTlRfS0VZICAgICAgICAgICAgICA9IGAuJHtEQVRBX0tFWX1gXG5jb25zdCBEQVRBX0FQSV9LRVkgICAgICAgICAgID0gJy5kYXRhLWFwaSdcbmNvbnN0IEpRVUVSWV9OT19DT05GTElDVCAgICAgPSAkLmZuW05BTUVdXG5jb25zdCBBUlJPV19MRUZUX0tFWUNPREUgICAgID0gMzcgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgbGVmdCBhcnJvdyBrZXlcbmNvbnN0IEFSUk9XX1JJR0hUX0tFWUNPREUgICAgPSAzOSAvLyBLZXlib2FyZEV2ZW50LndoaWNoIHZhbHVlIGZvciByaWdodCBhcnJvdyBrZXlcbmNvbnN0IFRPVUNIRVZFTlRfQ09NUEFUX1dBSVQgPSA1MDAgLy8gVGltZSBmb3IgbW91c2UgY29tcGF0IGV2ZW50cyB0byBmaXJlIGFmdGVyIHRvdWNoXG5jb25zdCBTV0lQRV9USFJFU0hPTEQgICAgICAgID0gNDBcblxuY29uc3QgRGVmYXVsdCA9IHtcbiAgaW50ZXJ2YWwgOiA1MDAwLFxuICBrZXlib2FyZCA6IHRydWUsXG4gIHNsaWRlICAgIDogZmFsc2UsXG4gIHBhdXNlICAgIDogJ2hvdmVyJyxcbiAgd3JhcCAgICAgOiB0cnVlLFxuICB0b3VjaCAgICA6IHRydWVcbn1cblxuY29uc3QgRGVmYXVsdFR5cGUgPSB7XG4gIGludGVydmFsIDogJyhudW1iZXJ8Ym9vbGVhbiknLFxuICBrZXlib2FyZCA6ICdib29sZWFuJyxcbiAgc2xpZGUgICAgOiAnKGJvb2xlYW58c3RyaW5nKScsXG4gIHBhdXNlICAgIDogJyhzdHJpbmd8Ym9vbGVhbiknLFxuICB3cmFwICAgICA6ICdib29sZWFuJyxcbiAgdG91Y2ggICAgOiAnYm9vbGVhbidcbn1cblxuY29uc3QgRGlyZWN0aW9uID0ge1xuICBORVhUICAgICA6ICduZXh0JyxcbiAgUFJFViAgICAgOiAncHJldicsXG4gIExFRlQgICAgIDogJ2xlZnQnLFxuICBSSUdIVCAgICA6ICdyaWdodCdcbn1cblxuY29uc3QgRXZlbnQgPSB7XG4gIFNMSURFICAgICAgICAgIDogYHNsaWRlJHtFVkVOVF9LRVl9YCxcbiAgU0xJRCAgICAgICAgICAgOiBgc2xpZCR7RVZFTlRfS0VZfWAsXG4gIEtFWURPV04gICAgICAgIDogYGtleWRvd24ke0VWRU5UX0tFWX1gLFxuICBNT1VTRUVOVEVSICAgICA6IGBtb3VzZWVudGVyJHtFVkVOVF9LRVl9YCxcbiAgTU9VU0VMRUFWRSAgICAgOiBgbW91c2VsZWF2ZSR7RVZFTlRfS0VZfWAsXG4gIFRPVUNIU1RBUlQgICAgIDogYHRvdWNoc3RhcnQke0VWRU5UX0tFWX1gLFxuICBUT1VDSE1PVkUgICAgICA6IGB0b3VjaG1vdmUke0VWRU5UX0tFWX1gLFxuICBUT1VDSEVORCAgICAgICA6IGB0b3VjaGVuZCR7RVZFTlRfS0VZfWAsXG4gIFBPSU5URVJET1dOICAgIDogYHBvaW50ZXJkb3duJHtFVkVOVF9LRVl9YCxcbiAgUE9JTlRFUlVQICAgICAgOiBgcG9pbnRlcnVwJHtFVkVOVF9LRVl9YCxcbiAgRFJBR19TVEFSVCAgICAgOiBgZHJhZ3N0YXJ0JHtFVkVOVF9LRVl9YCxcbiAgTE9BRF9EQVRBX0FQSSAgOiBgbG9hZCR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWAsXG4gIENMSUNLX0RBVEFfQVBJIDogYGNsaWNrJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YFxufVxuXG5jb25zdCBDbGFzc05hbWUgPSB7XG4gIENBUk9VU0VMICAgICAgOiAnY2Fyb3VzZWwnLFxuICBBQ1RJVkUgICAgICAgIDogJ2FjdGl2ZScsXG4gIFNMSURFICAgICAgICAgOiAnc2xpZGUnLFxuICBSSUdIVCAgICAgICAgIDogJ2Nhcm91c2VsLWl0ZW0tcmlnaHQnLFxuICBMRUZUICAgICAgICAgIDogJ2Nhcm91c2VsLWl0ZW0tbGVmdCcsXG4gIE5FWFQgICAgICAgICAgOiAnY2Fyb3VzZWwtaXRlbS1uZXh0JyxcbiAgUFJFViAgICAgICAgICA6ICdjYXJvdXNlbC1pdGVtLXByZXYnLFxuICBJVEVNICAgICAgICAgIDogJ2Nhcm91c2VsLWl0ZW0nLFxuICBQT0lOVEVSX0VWRU5UIDogJ3BvaW50ZXItZXZlbnQnXG59XG5cbmNvbnN0IFNlbGVjdG9yID0ge1xuICBBQ1RJVkUgICAgICA6ICcuYWN0aXZlJyxcbiAgQUNUSVZFX0lURU0gOiAnLmFjdGl2ZS5jYXJvdXNlbC1pdGVtJyxcbiAgSVRFTSAgICAgICAgOiAnLmNhcm91c2VsLWl0ZW0nLFxuICBJVEVNX0lNRyAgICA6ICcuY2Fyb3VzZWwtaXRlbSBpbWcnLFxuICBORVhUX1BSRVYgICA6ICcuY2Fyb3VzZWwtaXRlbS1uZXh0LCAuY2Fyb3VzZWwtaXRlbS1wcmV2JyxcbiAgSU5ESUNBVE9SUyAgOiAnLmNhcm91c2VsLWluZGljYXRvcnMnLFxuICBEQVRBX1NMSURFICA6ICdbZGF0YS1zbGlkZV0sIFtkYXRhLXNsaWRlLXRvXScsXG4gIERBVEFfUklERSAgIDogJ1tkYXRhLXJpZGU9XCJjYXJvdXNlbFwiXSdcbn1cblxuY29uc3QgUG9pbnRlclR5cGUgPSB7XG4gIFRPVUNIIDogJ3RvdWNoJyxcbiAgUEVOICAgOiAncGVuJ1xufVxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2xhc3MgRGVmaW5pdGlvblxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cbmNsYXNzIENhcm91c2VsIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgdGhpcy5faXRlbXMgICAgICAgICA9IG51bGxcbiAgICB0aGlzLl9pbnRlcnZhbCAgICAgID0gbnVsbFxuICAgIHRoaXMuX2FjdGl2ZUVsZW1lbnQgPSBudWxsXG4gICAgdGhpcy5faXNQYXVzZWQgICAgICA9IGZhbHNlXG4gICAgdGhpcy5faXNTbGlkaW5nICAgICA9IGZhbHNlXG4gICAgdGhpcy50b3VjaFRpbWVvdXQgICA9IG51bGxcbiAgICB0aGlzLnRvdWNoU3RhcnRYICAgID0gMFxuICAgIHRoaXMudG91Y2hEZWx0YVggICAgPSAwXG5cbiAgICB0aGlzLl9jb25maWcgICAgICAgICAgICA9IHRoaXMuX2dldENvbmZpZyhjb25maWcpXG4gICAgdGhpcy5fZWxlbWVudCAgICAgICAgICAgPSBlbGVtZW50XG4gICAgdGhpcy5faW5kaWNhdG9yc0VsZW1lbnQgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuSU5ESUNBVE9SUylcbiAgICB0aGlzLl90b3VjaFN1cHBvcnRlZCAgICA9ICdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fCBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwXG4gICAgdGhpcy5fcG9pbnRlckV2ZW50ICAgICAgPSBCb29sZWFuKHdpbmRvdy5Qb2ludGVyRXZlbnQgfHwgd2luZG93Lk1TUG9pbnRlckV2ZW50KVxuXG4gICAgdGhpcy5fYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICB9XG5cbiAgLy8gR2V0dGVyc1xuXG4gIHN0YXRpYyBnZXQgVkVSU0lPTigpIHtcbiAgICByZXR1cm4gVkVSU0lPTlxuICB9XG5cbiAgc3RhdGljIGdldCBEZWZhdWx0KCkge1xuICAgIHJldHVybiBEZWZhdWx0XG4gIH1cblxuICAvLyBQdWJsaWNcblxuICBuZXh0KCkge1xuICAgIGlmICghdGhpcy5faXNTbGlkaW5nKSB7XG4gICAgICB0aGlzLl9zbGlkZShEaXJlY3Rpb24uTkVYVClcbiAgICB9XG4gIH1cblxuICBuZXh0V2hlblZpc2libGUoKSB7XG4gICAgLy8gRG9uJ3QgY2FsbCBuZXh0IHdoZW4gdGhlIHBhZ2UgaXNuJ3QgdmlzaWJsZVxuICAgIC8vIG9yIHRoZSBjYXJvdXNlbCBvciBpdHMgcGFyZW50IGlzbid0IHZpc2libGVcbiAgICBpZiAoIWRvY3VtZW50LmhpZGRlbiAmJlxuICAgICAgKCQodGhpcy5fZWxlbWVudCkuaXMoJzp2aXNpYmxlJykgJiYgJCh0aGlzLl9lbGVtZW50KS5jc3MoJ3Zpc2liaWxpdHknKSAhPT0gJ2hpZGRlbicpKSB7XG4gICAgICB0aGlzLm5leHQoKVxuICAgIH1cbiAgfVxuXG4gIHByZXYoKSB7XG4gICAgaWYgKCF0aGlzLl9pc1NsaWRpbmcpIHtcbiAgICAgIHRoaXMuX3NsaWRlKERpcmVjdGlvbi5QUkVWKVxuICAgIH1cbiAgfVxuXG4gIHBhdXNlKGV2ZW50KSB7XG4gICAgaWYgKCFldmVudCkge1xuICAgICAgdGhpcy5faXNQYXVzZWQgPSB0cnVlXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihTZWxlY3Rvci5ORVhUX1BSRVYpKSB7XG4gICAgICBVdGlsLnRyaWdnZXJUcmFuc2l0aW9uRW5kKHRoaXMuX2VsZW1lbnQpXG4gICAgICB0aGlzLmN5Y2xlKHRydWUpXG4gICAgfVxuXG4gICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbClcbiAgICB0aGlzLl9pbnRlcnZhbCA9IG51bGxcbiAgfVxuXG4gIGN5Y2xlKGV2ZW50KSB7XG4gICAgaWYgKCFldmVudCkge1xuICAgICAgdGhpcy5faXNQYXVzZWQgPSBmYWxzZVxuICAgIH1cblxuICAgIGlmICh0aGlzLl9pbnRlcnZhbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLl9pbnRlcnZhbClcbiAgICAgIHRoaXMuX2ludGVydmFsID0gbnVsbFxuICAgIH1cblxuICAgIGlmICh0aGlzLl9jb25maWcuaW50ZXJ2YWwgJiYgIXRoaXMuX2lzUGF1c2VkKSB7XG4gICAgICB0aGlzLl9pbnRlcnZhbCA9IHNldEludGVydmFsKFxuICAgICAgICAoZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID8gdGhpcy5uZXh0V2hlblZpc2libGUgOiB0aGlzLm5leHQpLmJpbmQodGhpcyksXG4gICAgICAgIHRoaXMuX2NvbmZpZy5pbnRlcnZhbFxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIHRvKGluZGV4KSB7XG4gICAgdGhpcy5fYWN0aXZlRWxlbWVudCA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihTZWxlY3Rvci5BQ1RJVkVfSVRFTSlcblxuICAgIGNvbnN0IGFjdGl2ZUluZGV4ID0gdGhpcy5fZ2V0SXRlbUluZGV4KHRoaXMuX2FjdGl2ZUVsZW1lbnQpXG5cbiAgICBpZiAoaW5kZXggPiB0aGlzLl9pdGVtcy5sZW5ndGggLSAxIHx8IGluZGV4IDwgMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKHRoaXMuX2lzU2xpZGluZykge1xuICAgICAgJCh0aGlzLl9lbGVtZW50KS5vbmUoRXZlbnQuU0xJRCwgKCkgPT4gdGhpcy50byhpbmRleCkpXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoYWN0aXZlSW5kZXggPT09IGluZGV4KSB7XG4gICAgICB0aGlzLnBhdXNlKClcbiAgICAgIHRoaXMuY3ljbGUoKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgZGlyZWN0aW9uID0gaW5kZXggPiBhY3RpdmVJbmRleFxuICAgICAgPyBEaXJlY3Rpb24uTkVYVFxuICAgICAgOiBEaXJlY3Rpb24uUFJFVlxuXG4gICAgdGhpcy5fc2xpZGUoZGlyZWN0aW9uLCB0aGlzLl9pdGVtc1tpbmRleF0pXG4gIH1cblxuICBkaXNwb3NlKCkge1xuICAgICQodGhpcy5fZWxlbWVudCkub2ZmKEVWRU5UX0tFWSlcbiAgICAkLnJlbW92ZURhdGEodGhpcy5fZWxlbWVudCwgREFUQV9LRVkpXG5cbiAgICB0aGlzLl9pdGVtcyAgICAgICAgICAgICA9IG51bGxcbiAgICB0aGlzLl9jb25maWcgICAgICAgICAgICA9IG51bGxcbiAgICB0aGlzLl9lbGVtZW50ICAgICAgICAgICA9IG51bGxcbiAgICB0aGlzLl9pbnRlcnZhbCAgICAgICAgICA9IG51bGxcbiAgICB0aGlzLl9pc1BhdXNlZCAgICAgICAgICA9IG51bGxcbiAgICB0aGlzLl9pc1NsaWRpbmcgICAgICAgICA9IG51bGxcbiAgICB0aGlzLl9hY3RpdmVFbGVtZW50ICAgICA9IG51bGxcbiAgICB0aGlzLl9pbmRpY2F0b3JzRWxlbWVudCA9IG51bGxcbiAgfVxuXG4gIC8vIFByaXZhdGVcblxuICBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIC4uLkRlZmF1bHQsXG4gICAgICAuLi5jb25maWdcbiAgICB9XG4gICAgVXRpbC50eXBlQ2hlY2tDb25maWcoTkFNRSwgY29uZmlnLCBEZWZhdWx0VHlwZSlcbiAgICByZXR1cm4gY29uZmlnXG4gIH1cblxuICBfaGFuZGxlU3dpcGUoKSB7XG4gICAgY29uc3QgYWJzRGVsdGF4ID0gTWF0aC5hYnModGhpcy50b3VjaERlbHRhWClcblxuICAgIGlmIChhYnNEZWx0YXggPD0gU1dJUEVfVEhSRVNIT0xEKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBkaXJlY3Rpb24gPSBhYnNEZWx0YXggLyB0aGlzLnRvdWNoRGVsdGFYXG5cbiAgICAvLyBzd2lwZSBsZWZ0XG4gICAgaWYgKGRpcmVjdGlvbiA+IDApIHtcbiAgICAgIHRoaXMucHJldigpXG4gICAgfVxuXG4gICAgLy8gc3dpcGUgcmlnaHRcbiAgICBpZiAoZGlyZWN0aW9uIDwgMCkge1xuICAgICAgdGhpcy5uZXh0KClcbiAgICB9XG4gIH1cblxuICBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKHRoaXMuX2NvbmZpZy5rZXlib2FyZCkge1xuICAgICAgJCh0aGlzLl9lbGVtZW50KVxuICAgICAgICAub24oRXZlbnQuS0VZRE9XTiwgKGV2ZW50KSA9PiB0aGlzLl9rZXlkb3duKGV2ZW50KSlcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY29uZmlnLnBhdXNlID09PSAnaG92ZXInKSB7XG4gICAgICAkKHRoaXMuX2VsZW1lbnQpXG4gICAgICAgIC5vbihFdmVudC5NT1VTRUVOVEVSLCAoZXZlbnQpID0+IHRoaXMucGF1c2UoZXZlbnQpKVxuICAgICAgICAub24oRXZlbnQuTU9VU0VMRUFWRSwgKGV2ZW50KSA9PiB0aGlzLmN5Y2xlKGV2ZW50KSlcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY29uZmlnLnRvdWNoKSB7XG4gICAgICB0aGlzLl9hZGRUb3VjaEV2ZW50TGlzdGVuZXJzKClcbiAgICB9XG4gIH1cblxuICBfYWRkVG91Y2hFdmVudExpc3RlbmVycygpIHtcbiAgICBpZiAoIXRoaXMuX3RvdWNoU3VwcG9ydGVkKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBzdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX3BvaW50ZXJFdmVudCAmJiBQb2ludGVyVHlwZVtldmVudC5vcmlnaW5hbEV2ZW50LnBvaW50ZXJUeXBlLnRvVXBwZXJDYXNlKCldKSB7XG4gICAgICAgIHRoaXMudG91Y2hTdGFydFggPSBldmVudC5vcmlnaW5hbEV2ZW50LmNsaWVudFhcbiAgICAgIH0gZWxzZSBpZiAoIXRoaXMuX3BvaW50ZXJFdmVudCkge1xuICAgICAgICB0aGlzLnRvdWNoU3RhcnRYID0gZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdLmNsaWVudFhcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBtb3ZlID0gKGV2ZW50KSA9PiB7XG4gICAgICAvLyBlbnN1cmUgc3dpcGluZyB3aXRoIG9uZSB0b3VjaCBhbmQgbm90IHBpbmNoaW5nXG4gICAgICBpZiAoZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzICYmIGV2ZW50Lm9yaWdpbmFsRXZlbnQudG91Y2hlcy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHRoaXMudG91Y2hEZWx0YVggPSAwXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRvdWNoRGVsdGFYID0gZXZlbnQub3JpZ2luYWxFdmVudC50b3VjaGVzWzBdLmNsaWVudFggLSB0aGlzLnRvdWNoU3RhcnRYXG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgZW5kID0gKGV2ZW50KSA9PiB7XG4gICAgICBpZiAodGhpcy5fcG9pbnRlckV2ZW50ICYmIFBvaW50ZXJUeXBlW2V2ZW50Lm9yaWdpbmFsRXZlbnQucG9pbnRlclR5cGUudG9VcHBlckNhc2UoKV0pIHtcbiAgICAgICAgdGhpcy50b3VjaERlbHRhWCA9IGV2ZW50Lm9yaWdpbmFsRXZlbnQuY2xpZW50WCAtIHRoaXMudG91Y2hTdGFydFhcbiAgICAgIH1cblxuICAgICAgdGhpcy5faGFuZGxlU3dpcGUoKVxuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5wYXVzZSA9PT0gJ2hvdmVyJykge1xuICAgICAgICAvLyBJZiBpdCdzIGEgdG91Y2gtZW5hYmxlZCBkZXZpY2UsIG1vdXNlZW50ZXIvbGVhdmUgYXJlIGZpcmVkIGFzXG4gICAgICAgIC8vIHBhcnQgb2YgdGhlIG1vdXNlIGNvbXBhdGliaWxpdHkgZXZlbnRzIG9uIGZpcnN0IHRhcCAtIHRoZSBjYXJvdXNlbFxuICAgICAgICAvLyB3b3VsZCBzdG9wIGN5Y2xpbmcgdW50aWwgdXNlciB0YXBwZWQgb3V0IG9mIGl0O1xuICAgICAgICAvLyBoZXJlLCB3ZSBsaXN0ZW4gZm9yIHRvdWNoZW5kLCBleHBsaWNpdGx5IHBhdXNlIHRoZSBjYXJvdXNlbFxuICAgICAgICAvLyAoYXMgaWYgaXQncyB0aGUgc2Vjb25kIHRpbWUgd2UgdGFwIG9uIGl0LCBtb3VzZWVudGVyIGNvbXBhdCBldmVudFxuICAgICAgICAvLyBpcyBOT1QgZmlyZWQpIGFuZCBhZnRlciBhIHRpbWVvdXQgKHRvIGFsbG93IGZvciBtb3VzZSBjb21wYXRpYmlsaXR5XG4gICAgICAgIC8vIGV2ZW50cyB0byBmaXJlKSB3ZSBleHBsaWNpdGx5IHJlc3RhcnQgY3ljbGluZ1xuXG4gICAgICAgIHRoaXMucGF1c2UoKVxuICAgICAgICBpZiAodGhpcy50b3VjaFRpbWVvdXQpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy50b3VjaFRpbWVvdXQpXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50b3VjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KChldmVudCkgPT4gdGhpcy5jeWNsZShldmVudCksIFRPVUNIRVZFTlRfQ09NUEFUX1dBSVQgKyB0aGlzLl9jb25maWcuaW50ZXJ2YWwpXG4gICAgICB9XG4gICAgfVxuXG4gICAgJCh0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuSVRFTV9JTUcpKS5vbihFdmVudC5EUkFHX1NUQVJULCAoZSkgPT4gZS5wcmV2ZW50RGVmYXVsdCgpKVxuICAgIGlmICh0aGlzLl9wb2ludGVyRXZlbnQpIHtcbiAgICAgICQodGhpcy5fZWxlbWVudCkub24oRXZlbnQuUE9JTlRFUkRPV04sIChldmVudCkgPT4gc3RhcnQoZXZlbnQpKVxuICAgICAgJCh0aGlzLl9lbGVtZW50KS5vbihFdmVudC5QT0lOVEVSVVAsIChldmVudCkgPT4gZW5kKGV2ZW50KSlcblxuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuYWRkKENsYXNzTmFtZS5QT0lOVEVSX0VWRU5UKVxuICAgIH0gZWxzZSB7XG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLm9uKEV2ZW50LlRPVUNIU1RBUlQsIChldmVudCkgPT4gc3RhcnQoZXZlbnQpKVxuICAgICAgJCh0aGlzLl9lbGVtZW50KS5vbihFdmVudC5UT1VDSE1PVkUsIChldmVudCkgPT4gbW92ZShldmVudCkpXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLm9uKEV2ZW50LlRPVUNIRU5ELCAoZXZlbnQpID0+IGVuZChldmVudCkpXG4gICAgfVxuICB9XG5cbiAgX2tleWRvd24oZXZlbnQpIHtcbiAgICBpZiAoL2lucHV0fHRleHRhcmVhL2kudGVzdChldmVudC50YXJnZXQudGFnTmFtZSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcbiAgICAgIGNhc2UgQVJST1dfTEVGVF9LRVlDT0RFOlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgIHRoaXMucHJldigpXG4gICAgICAgIGJyZWFrXG4gICAgICBjYXNlIEFSUk9XX1JJR0hUX0tFWUNPREU6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgdGhpcy5uZXh0KClcbiAgICAgICAgYnJlYWtcbiAgICAgIGRlZmF1bHQ6XG4gICAgfVxuICB9XG5cbiAgX2dldEl0ZW1JbmRleChlbGVtZW50KSB7XG4gICAgdGhpcy5faXRlbXMgPSBlbGVtZW50ICYmIGVsZW1lbnQucGFyZW50Tm9kZVxuICAgICAgPyBbXS5zbGljZS5jYWxsKGVsZW1lbnQucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLklURU0pKVxuICAgICAgOiBbXVxuICAgIHJldHVybiB0aGlzLl9pdGVtcy5pbmRleE9mKGVsZW1lbnQpXG4gIH1cblxuICBfZ2V0SXRlbUJ5RGlyZWN0aW9uKGRpcmVjdGlvbiwgYWN0aXZlRWxlbWVudCkge1xuICAgIGNvbnN0IGlzTmV4dERpcmVjdGlvbiA9IGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLk5FWFRcbiAgICBjb25zdCBpc1ByZXZEaXJlY3Rpb24gPSBkaXJlY3Rpb24gPT09IERpcmVjdGlvbi5QUkVWXG4gICAgY29uc3QgYWN0aXZlSW5kZXggICAgID0gdGhpcy5fZ2V0SXRlbUluZGV4KGFjdGl2ZUVsZW1lbnQpXG4gICAgY29uc3QgbGFzdEl0ZW1JbmRleCAgID0gdGhpcy5faXRlbXMubGVuZ3RoIC0gMVxuICAgIGNvbnN0IGlzR29pbmdUb1dyYXAgICA9IGlzUHJldkRpcmVjdGlvbiAmJiBhY3RpdmVJbmRleCA9PT0gMCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlzTmV4dERpcmVjdGlvbiAmJiBhY3RpdmVJbmRleCA9PT0gbGFzdEl0ZW1JbmRleFxuXG4gICAgaWYgKGlzR29pbmdUb1dyYXAgJiYgIXRoaXMuX2NvbmZpZy53cmFwKSB7XG4gICAgICByZXR1cm4gYWN0aXZlRWxlbWVudFxuICAgIH1cblxuICAgIGNvbnN0IGRlbHRhICAgICA9IGRpcmVjdGlvbiA9PT0gRGlyZWN0aW9uLlBSRVYgPyAtMSA6IDFcbiAgICBjb25zdCBpdGVtSW5kZXggPSAoYWN0aXZlSW5kZXggKyBkZWx0YSkgJSB0aGlzLl9pdGVtcy5sZW5ndGhcblxuICAgIHJldHVybiBpdGVtSW5kZXggPT09IC0xXG4gICAgICA/IHRoaXMuX2l0ZW1zW3RoaXMuX2l0ZW1zLmxlbmd0aCAtIDFdIDogdGhpcy5faXRlbXNbaXRlbUluZGV4XVxuICB9XG5cbiAgX3RyaWdnZXJTbGlkZUV2ZW50KHJlbGF0ZWRUYXJnZXQsIGV2ZW50RGlyZWN0aW9uTmFtZSkge1xuICAgIGNvbnN0IHRhcmdldEluZGV4ID0gdGhpcy5fZ2V0SXRlbUluZGV4KHJlbGF0ZWRUYXJnZXQpXG4gICAgY29uc3QgZnJvbUluZGV4ID0gdGhpcy5fZ2V0SXRlbUluZGV4KHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihTZWxlY3Rvci5BQ1RJVkVfSVRFTSkpXG4gICAgY29uc3Qgc2xpZGVFdmVudCA9ICQuRXZlbnQoRXZlbnQuU0xJREUsIHtcbiAgICAgIHJlbGF0ZWRUYXJnZXQsXG4gICAgICBkaXJlY3Rpb246IGV2ZW50RGlyZWN0aW9uTmFtZSxcbiAgICAgIGZyb206IGZyb21JbmRleCxcbiAgICAgIHRvOiB0YXJnZXRJbmRleFxuICAgIH0pXG5cbiAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc2xpZGVFdmVudClcblxuICAgIHJldHVybiBzbGlkZUV2ZW50XG4gIH1cblxuICBfc2V0QWN0aXZlSW5kaWNhdG9yRWxlbWVudChlbGVtZW50KSB7XG4gICAgaWYgKHRoaXMuX2luZGljYXRvcnNFbGVtZW50KSB7XG4gICAgICBjb25zdCBpbmRpY2F0b3JzID0gW10uc2xpY2UuY2FsbCh0aGlzLl9pbmRpY2F0b3JzRWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLkFDVElWRSkpXG4gICAgICAkKGluZGljYXRvcnMpXG4gICAgICAgIC5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQUNUSVZFKVxuXG4gICAgICBjb25zdCBuZXh0SW5kaWNhdG9yID0gdGhpcy5faW5kaWNhdG9yc0VsZW1lbnQuY2hpbGRyZW5bXG4gICAgICAgIHRoaXMuX2dldEl0ZW1JbmRleChlbGVtZW50KVxuICAgICAgXVxuXG4gICAgICBpZiAobmV4dEluZGljYXRvcikge1xuICAgICAgICAkKG5leHRJbmRpY2F0b3IpLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgX3NsaWRlKGRpcmVjdGlvbiwgZWxlbWVudCkge1xuICAgIGNvbnN0IGFjdGl2ZUVsZW1lbnQgPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuQUNUSVZFX0lURU0pXG4gICAgY29uc3QgYWN0aXZlRWxlbWVudEluZGV4ID0gdGhpcy5fZ2V0SXRlbUluZGV4KGFjdGl2ZUVsZW1lbnQpXG4gICAgY29uc3QgbmV4dEVsZW1lbnQgICA9IGVsZW1lbnQgfHwgYWN0aXZlRWxlbWVudCAmJlxuICAgICAgdGhpcy5fZ2V0SXRlbUJ5RGlyZWN0aW9uKGRpcmVjdGlvbiwgYWN0aXZlRWxlbWVudClcbiAgICBjb25zdCBuZXh0RWxlbWVudEluZGV4ID0gdGhpcy5fZ2V0SXRlbUluZGV4KG5leHRFbGVtZW50KVxuICAgIGNvbnN0IGlzQ3ljbGluZyA9IEJvb2xlYW4odGhpcy5faW50ZXJ2YWwpXG5cbiAgICBsZXQgZGlyZWN0aW9uYWxDbGFzc05hbWVcbiAgICBsZXQgb3JkZXJDbGFzc05hbWVcbiAgICBsZXQgZXZlbnREaXJlY3Rpb25OYW1lXG5cbiAgICBpZiAoZGlyZWN0aW9uID09PSBEaXJlY3Rpb24uTkVYVCkge1xuICAgICAgZGlyZWN0aW9uYWxDbGFzc05hbWUgPSBDbGFzc05hbWUuTEVGVFxuICAgICAgb3JkZXJDbGFzc05hbWUgPSBDbGFzc05hbWUuTkVYVFxuICAgICAgZXZlbnREaXJlY3Rpb25OYW1lID0gRGlyZWN0aW9uLkxFRlRcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0aW9uYWxDbGFzc05hbWUgPSBDbGFzc05hbWUuUklHSFRcbiAgICAgIG9yZGVyQ2xhc3NOYW1lID0gQ2xhc3NOYW1lLlBSRVZcbiAgICAgIGV2ZW50RGlyZWN0aW9uTmFtZSA9IERpcmVjdGlvbi5SSUdIVFxuICAgIH1cblxuICAgIGlmIChuZXh0RWxlbWVudCAmJiAkKG5leHRFbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuQUNUSVZFKSkge1xuICAgICAgdGhpcy5faXNTbGlkaW5nID0gZmFsc2VcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHNsaWRlRXZlbnQgPSB0aGlzLl90cmlnZ2VyU2xpZGVFdmVudChuZXh0RWxlbWVudCwgZXZlbnREaXJlY3Rpb25OYW1lKVxuICAgIGlmIChzbGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAoIWFjdGl2ZUVsZW1lbnQgfHwgIW5leHRFbGVtZW50KSB7XG4gICAgICAvLyBTb21lIHdlaXJkbmVzcyBpcyBoYXBwZW5pbmcsIHNvIHdlIGJhaWxcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuX2lzU2xpZGluZyA9IHRydWVcblxuICAgIGlmIChpc0N5Y2xpbmcpIHtcbiAgICAgIHRoaXMucGF1c2UoKVxuICAgIH1cblxuICAgIHRoaXMuX3NldEFjdGl2ZUluZGljYXRvckVsZW1lbnQobmV4dEVsZW1lbnQpXG5cbiAgICBjb25zdCBzbGlkRXZlbnQgPSAkLkV2ZW50KEV2ZW50LlNMSUQsIHtcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6IG5leHRFbGVtZW50LFxuICAgICAgZGlyZWN0aW9uOiBldmVudERpcmVjdGlvbk5hbWUsXG4gICAgICBmcm9tOiBhY3RpdmVFbGVtZW50SW5kZXgsXG4gICAgICB0bzogbmV4dEVsZW1lbnRJbmRleFxuICAgIH0pXG5cbiAgICBpZiAoJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuU0xJREUpKSB7XG4gICAgICAkKG5leHRFbGVtZW50KS5hZGRDbGFzcyhvcmRlckNsYXNzTmFtZSlcblxuICAgICAgVXRpbC5yZWZsb3cobmV4dEVsZW1lbnQpXG5cbiAgICAgICQoYWN0aXZlRWxlbWVudCkuYWRkQ2xhc3MoZGlyZWN0aW9uYWxDbGFzc05hbWUpXG4gICAgICAkKG5leHRFbGVtZW50KS5hZGRDbGFzcyhkaXJlY3Rpb25hbENsYXNzTmFtZSlcblxuICAgICAgY29uc3QgbmV4dEVsZW1lbnRJbnRlcnZhbCA9IHBhcnNlSW50KG5leHRFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1pbnRlcnZhbCcpLCAxMClcbiAgICAgIGlmIChuZXh0RWxlbWVudEludGVydmFsKSB7XG4gICAgICAgIHRoaXMuX2NvbmZpZy5kZWZhdWx0SW50ZXJ2YWwgPSB0aGlzLl9jb25maWcuZGVmYXVsdEludGVydmFsIHx8IHRoaXMuX2NvbmZpZy5pbnRlcnZhbFxuICAgICAgICB0aGlzLl9jb25maWcuaW50ZXJ2YWwgPSBuZXh0RWxlbWVudEludGVydmFsXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9jb25maWcuaW50ZXJ2YWwgPSB0aGlzLl9jb25maWcuZGVmYXVsdEludGVydmFsIHx8IHRoaXMuX2NvbmZpZy5pbnRlcnZhbFxuICAgICAgfVxuXG4gICAgICBjb25zdCB0cmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KGFjdGl2ZUVsZW1lbnQpXG5cbiAgICAgICQoYWN0aXZlRWxlbWVudClcbiAgICAgICAgLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCAoKSA9PiB7XG4gICAgICAgICAgJChuZXh0RWxlbWVudClcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhgJHtkaXJlY3Rpb25hbENsYXNzTmFtZX0gJHtvcmRlckNsYXNzTmFtZX1gKVxuICAgICAgICAgICAgLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG5cbiAgICAgICAgICAkKGFjdGl2ZUVsZW1lbnQpLnJlbW92ZUNsYXNzKGAke0NsYXNzTmFtZS5BQ1RJVkV9ICR7b3JkZXJDbGFzc05hbWV9ICR7ZGlyZWN0aW9uYWxDbGFzc05hbWV9YClcblxuICAgICAgICAgIHRoaXMuX2lzU2xpZGluZyA9IGZhbHNlXG5cbiAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+ICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihzbGlkRXZlbnQpLCAwKVxuICAgICAgICB9KVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQodHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH0gZWxzZSB7XG4gICAgICAkKGFjdGl2ZUVsZW1lbnQpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG4gICAgICAkKG5leHRFbGVtZW50KS5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKVxuXG4gICAgICB0aGlzLl9pc1NsaWRpbmcgPSBmYWxzZVxuICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHNsaWRFdmVudClcbiAgICB9XG5cbiAgICBpZiAoaXNDeWNsaW5nKSB7XG4gICAgICB0aGlzLmN5Y2xlKClcbiAgICB9XG4gIH1cblxuICAvLyBTdGF0aWNcblxuICBzdGF0aWMgX2pRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBkYXRhID0gJCh0aGlzKS5kYXRhKERBVEFfS0VZKVxuICAgICAgbGV0IF9jb25maWcgPSB7XG4gICAgICAgIC4uLkRlZmF1bHQsXG4gICAgICAgIC4uLiQodGhpcykuZGF0YSgpXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0Jykge1xuICAgICAgICBfY29uZmlnID0ge1xuICAgICAgICAgIC4uLl9jb25maWcsXG4gICAgICAgICAgLi4uY29uZmlnXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgYWN0aW9uID0gdHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycgPyBjb25maWcgOiBfY29uZmlnLnNsaWRlXG5cbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICBkYXRhID0gbmV3IENhcm91c2VsKHRoaXMsIF9jb25maWcpXG4gICAgICAgICQodGhpcykuZGF0YShEQVRBX0tFWSwgZGF0YSlcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdudW1iZXInKSB7XG4gICAgICAgIGRhdGEudG8oY29uZmlnKVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgYWN0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGFbYWN0aW9uXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2FjdGlvbn1cImApXG4gICAgICAgIH1cbiAgICAgICAgZGF0YVthY3Rpb25dKClcbiAgICAgIH0gZWxzZSBpZiAoX2NvbmZpZy5pbnRlcnZhbCAmJiBfY29uZmlnLnJpZGUpIHtcbiAgICAgICAgZGF0YS5wYXVzZSgpXG4gICAgICAgIGRhdGEuY3ljbGUoKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBzdGF0aWMgX2RhdGFBcGlDbGlja0hhbmRsZXIoZXZlbnQpIHtcbiAgICBjb25zdCBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudCh0aGlzKVxuXG4gICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgdGFyZ2V0ID0gJChzZWxlY3RvcilbMF1cblxuICAgIGlmICghdGFyZ2V0IHx8ICEkKHRhcmdldCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkNBUk9VU0VMKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgLi4uJCh0YXJnZXQpLmRhdGEoKSxcbiAgICAgIC4uLiQodGhpcykuZGF0YSgpXG4gICAgfVxuICAgIGNvbnN0IHNsaWRlSW5kZXggPSB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1zbGlkZS10bycpXG5cbiAgICBpZiAoc2xpZGVJbmRleCkge1xuICAgICAgY29uZmlnLmludGVydmFsID0gZmFsc2VcbiAgICB9XG5cbiAgICBDYXJvdXNlbC5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJCh0YXJnZXQpLCBjb25maWcpXG5cbiAgICBpZiAoc2xpZGVJbmRleCkge1xuICAgICAgJCh0YXJnZXQpLmRhdGEoREFUQV9LRVkpLnRvKHNsaWRlSW5kZXgpXG4gICAgfVxuXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICB9XG59XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBEYXRhIEFwaSBpbXBsZW1lbnRhdGlvblxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJChkb2N1bWVudClcbiAgLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1NMSURFLCBDYXJvdXNlbC5fZGF0YUFwaUNsaWNrSGFuZGxlcilcblxuJCh3aW5kb3cpLm9uKEV2ZW50LkxPQURfREFUQV9BUEksICgpID0+IHtcbiAgY29uc3QgY2Fyb3VzZWxzID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLkRBVEFfUklERSkpXG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjYXJvdXNlbHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCAkY2Fyb3VzZWwgPSAkKGNhcm91c2Vsc1tpXSlcbiAgICBDYXJvdXNlbC5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJGNhcm91c2VsLCAkY2Fyb3VzZWwuZGF0YSgpKVxuICB9XG59KVxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogalF1ZXJ5XG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4kLmZuW05BTUVdID0gQ2Fyb3VzZWwuX2pRdWVyeUludGVyZmFjZVxuJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IENhcm91c2VsXG4kLmZuW05BTUVdLm5vQ29uZmxpY3QgPSAoKSA9PiB7XG4gICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgcmV0dXJuIENhcm91c2VsLl9qUXVlcnlJbnRlcmZhY2Vcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2Fyb3VzZWxcbiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuMy4xKTogY29sbGFwc2UuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCdcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvbnN0YW50c1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY29uc3QgTkFNRSAgICAgICAgICAgICAgICA9ICdjb2xsYXBzZSdcbmNvbnN0IFZFUlNJT04gICAgICAgICAgICAgPSAnNC4zLjEnXG5jb25zdCBEQVRBX0tFWSAgICAgICAgICAgID0gJ2JzLmNvbGxhcHNlJ1xuY29uc3QgRVZFTlRfS0VZICAgICAgICAgICA9IGAuJHtEQVRBX0tFWX1gXG5jb25zdCBEQVRBX0FQSV9LRVkgICAgICAgID0gJy5kYXRhLWFwaSdcbmNvbnN0IEpRVUVSWV9OT19DT05GTElDVCAgPSAkLmZuW05BTUVdXG5cbmNvbnN0IERlZmF1bHQgPSB7XG4gIHRvZ2dsZSA6IHRydWUsXG4gIHBhcmVudCA6ICcnXG59XG5cbmNvbnN0IERlZmF1bHRUeXBlID0ge1xuICB0b2dnbGUgOiAnYm9vbGVhbicsXG4gIHBhcmVudCA6ICcoc3RyaW5nfGVsZW1lbnQpJ1xufVxuXG5jb25zdCBFdmVudCA9IHtcbiAgU0hPVyAgICAgICAgICAgOiBgc2hvdyR7RVZFTlRfS0VZfWAsXG4gIFNIT1dOICAgICAgICAgIDogYHNob3duJHtFVkVOVF9LRVl9YCxcbiAgSElERSAgICAgICAgICAgOiBgaGlkZSR7RVZFTlRfS0VZfWAsXG4gIEhJRERFTiAgICAgICAgIDogYGhpZGRlbiR7RVZFTlRfS0VZfWAsXG4gIENMSUNLX0RBVEFfQVBJIDogYGNsaWNrJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YFxufVxuXG5jb25zdCBDbGFzc05hbWUgPSB7XG4gIFNIT1cgICAgICAgOiAnc2hvdycsXG4gIENPTExBUFNFICAgOiAnY29sbGFwc2UnLFxuICBDT0xMQVBTSU5HIDogJ2NvbGxhcHNpbmcnLFxuICBDT0xMQVBTRUQgIDogJ2NvbGxhcHNlZCdcbn1cblxuY29uc3QgRGltZW5zaW9uID0ge1xuICBXSURUSCAgOiAnd2lkdGgnLFxuICBIRUlHSFQgOiAnaGVpZ2h0J1xufVxuXG5jb25zdCBTZWxlY3RvciA9IHtcbiAgQUNUSVZFUyAgICAgOiAnLnNob3csIC5jb2xsYXBzaW5nJyxcbiAgREFUQV9UT0dHTEUgOiAnW2RhdGEtdG9nZ2xlPVwiY29sbGFwc2VcIl0nXG59XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDbGFzcyBEZWZpbml0aW9uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jbGFzcyBDb2xsYXBzZSB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbmZpZykge1xuICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IGZhbHNlXG4gICAgdGhpcy5fZWxlbWVudCAgICAgICAgID0gZWxlbWVudFxuICAgIHRoaXMuX2NvbmZpZyAgICAgICAgICA9IHRoaXMuX2dldENvbmZpZyhjb25maWcpXG4gICAgdGhpcy5fdHJpZ2dlckFycmF5ICAgID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgYFtkYXRhLXRvZ2dsZT1cImNvbGxhcHNlXCJdW2hyZWY9XCIjJHtlbGVtZW50LmlkfVwiXSxgICtcbiAgICAgIGBbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXVtkYXRhLXRhcmdldD1cIiMke2VsZW1lbnQuaWR9XCJdYFxuICAgICkpXG5cbiAgICBjb25zdCB0b2dnbGVMaXN0ID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLkRBVEFfVE9HR0xFKSlcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdG9nZ2xlTGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY29uc3QgZWxlbSA9IHRvZ2dsZUxpc3RbaV1cbiAgICAgIGNvbnN0IHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KGVsZW0pXG4gICAgICBjb25zdCBmaWx0ZXJFbGVtZW50ID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSlcbiAgICAgICAgLmZpbHRlcigoZm91bmRFbGVtKSA9PiBmb3VuZEVsZW0gPT09IGVsZW1lbnQpXG5cbiAgICAgIGlmIChzZWxlY3RvciAhPT0gbnVsbCAmJiBmaWx0ZXJFbGVtZW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0b3IgPSBzZWxlY3RvclxuICAgICAgICB0aGlzLl90cmlnZ2VyQXJyYXkucHVzaChlbGVtKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX3BhcmVudCA9IHRoaXMuX2NvbmZpZy5wYXJlbnQgPyB0aGlzLl9nZXRQYXJlbnQoKSA6IG51bGxcblxuICAgIGlmICghdGhpcy5fY29uZmlnLnBhcmVudCkge1xuICAgICAgdGhpcy5fYWRkQXJpYUFuZENvbGxhcHNlZENsYXNzKHRoaXMuX2VsZW1lbnQsIHRoaXMuX3RyaWdnZXJBcnJheSlcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fY29uZmlnLnRvZ2dsZSkge1xuICAgICAgdGhpcy50b2dnbGUoKVxuICAgIH1cbiAgfVxuXG4gIC8vIEdldHRlcnNcblxuICBzdGF0aWMgZ2V0IFZFUlNJT04oKSB7XG4gICAgcmV0dXJuIFZFUlNJT05cbiAgfVxuXG4gIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFxuICB9XG5cbiAgLy8gUHVibGljXG5cbiAgdG9nZ2xlKCkge1xuICAgIGlmICgkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKSkge1xuICAgICAgdGhpcy5oaWRlKClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zaG93KClcbiAgICB9XG4gIH1cblxuICBzaG93KCkge1xuICAgIGlmICh0aGlzLl9pc1RyYW5zaXRpb25pbmcgfHxcbiAgICAgICQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBsZXQgYWN0aXZlc1xuICAgIGxldCBhY3RpdmVzRGF0YVxuXG4gICAgaWYgKHRoaXMuX3BhcmVudCkge1xuICAgICAgYWN0aXZlcyA9IFtdLnNsaWNlLmNhbGwodGhpcy5fcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuQUNUSVZFUykpXG4gICAgICAgIC5maWx0ZXIoKGVsZW0pID0+IHtcbiAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2NvbmZpZy5wYXJlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm4gZWxlbS5nZXRBdHRyaWJ1dGUoJ2RhdGEtcGFyZW50JykgPT09IHRoaXMuX2NvbmZpZy5wYXJlbnRcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoQ2xhc3NOYW1lLkNPTExBUFNFKVxuICAgICAgICB9KVxuXG4gICAgICBpZiAoYWN0aXZlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgYWN0aXZlcyA9IG51bGxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYWN0aXZlcykge1xuICAgICAgYWN0aXZlc0RhdGEgPSAkKGFjdGl2ZXMpLm5vdCh0aGlzLl9zZWxlY3RvcikuZGF0YShEQVRBX0tFWSlcbiAgICAgIGlmIChhY3RpdmVzRGF0YSAmJiBhY3RpdmVzRGF0YS5faXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHN0YXJ0RXZlbnQgPSAkLkV2ZW50KEV2ZW50LlNIT1cpXG4gICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHN0YXJ0RXZlbnQpXG4gICAgaWYgKHN0YXJ0RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChhY3RpdmVzKSB7XG4gICAgICBDb2xsYXBzZS5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJChhY3RpdmVzKS5ub3QodGhpcy5fc2VsZWN0b3IpLCAnaGlkZScpXG4gICAgICBpZiAoIWFjdGl2ZXNEYXRhKSB7XG4gICAgICAgICQoYWN0aXZlcykuZGF0YShEQVRBX0tFWSwgbnVsbClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkaW1lbnNpb24gPSB0aGlzLl9nZXREaW1lbnNpb24oKVxuXG4gICAgJCh0aGlzLl9lbGVtZW50KVxuICAgICAgLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTRSlcbiAgICAgIC5hZGRDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0lORylcblxuICAgIHRoaXMuX2VsZW1lbnQuc3R5bGVbZGltZW5zaW9uXSA9IDBcblxuICAgIGlmICh0aGlzLl90cmlnZ2VyQXJyYXkubGVuZ3RoKSB7XG4gICAgICAkKHRoaXMuX3RyaWdnZXJBcnJheSlcbiAgICAgICAgLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTRUQpXG4gICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSlcbiAgICB9XG5cbiAgICB0aGlzLnNldFRyYW5zaXRpb25pbmcodHJ1ZSlcblxuICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgJCh0aGlzLl9lbGVtZW50KVxuICAgICAgICAucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNJTkcpXG4gICAgICAgIC5hZGRDbGFzcyhDbGFzc05hbWUuQ09MTEFQU0UpXG4gICAgICAgIC5hZGRDbGFzcyhDbGFzc05hbWUuU0hPVylcblxuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gJydcblxuICAgICAgdGhpcy5zZXRUcmFuc2l0aW9uaW5nKGZhbHNlKVxuXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoRXZlbnQuU0hPV04pXG4gICAgfVxuXG4gICAgY29uc3QgY2FwaXRhbGl6ZWREaW1lbnNpb24gPSBkaW1lbnNpb25bMF0udG9VcHBlckNhc2UoKSArIGRpbWVuc2lvbi5zbGljZSgxKVxuICAgIGNvbnN0IHNjcm9sbFNpemUgPSBgc2Nyb2xsJHtjYXBpdGFsaXplZERpbWVuc2lvbn1gXG4gICAgY29uc3QgdHJhbnNpdGlvbkR1cmF0aW9uID0gVXRpbC5nZXRUcmFuc2l0aW9uRHVyYXRpb25Gcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KVxuXG4gICAgJCh0aGlzLl9lbGVtZW50KVxuICAgICAgLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjb21wbGV0ZSlcbiAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRHVyYXRpb24pXG5cbiAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSBgJHt0aGlzLl9lbGVtZW50W3Njcm9sbFNpemVdfXB4YFxuICB9XG5cbiAgaGlkZSgpIHtcbiAgICBpZiAodGhpcy5faXNUcmFuc2l0aW9uaW5nIHx8XG4gICAgICAhJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVykpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHN0YXJ0RXZlbnQgPSAkLkV2ZW50KEV2ZW50LkhJREUpXG4gICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKHN0YXJ0RXZlbnQpXG4gICAgaWYgKHN0YXJ0RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGRpbWVuc2lvbiA9IHRoaXMuX2dldERpbWVuc2lvbigpXG5cbiAgICB0aGlzLl9lbGVtZW50LnN0eWxlW2RpbWVuc2lvbl0gPSBgJHt0aGlzLl9lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW2RpbWVuc2lvbl19cHhgXG5cbiAgICBVdGlsLnJlZmxvdyh0aGlzLl9lbGVtZW50KVxuXG4gICAgJCh0aGlzLl9lbGVtZW50KVxuICAgICAgLmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTSU5HKVxuICAgICAgLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTRSlcbiAgICAgIC5yZW1vdmVDbGFzcyhDbGFzc05hbWUuU0hPVylcblxuICAgIGNvbnN0IHRyaWdnZXJBcnJheUxlbmd0aCA9IHRoaXMuX3RyaWdnZXJBcnJheS5sZW5ndGhcbiAgICBpZiAodHJpZ2dlckFycmF5TGVuZ3RoID4gMCkge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0cmlnZ2VyQXJyYXlMZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCB0cmlnZ2VyID0gdGhpcy5fdHJpZ2dlckFycmF5W2ldXG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gVXRpbC5nZXRTZWxlY3RvckZyb21FbGVtZW50KHRyaWdnZXIpXG5cbiAgICAgICAgaWYgKHNlbGVjdG9yICE9PSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgJGVsZW0gPSAkKFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikpKVxuICAgICAgICAgIGlmICghJGVsZW0uaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICAgICAgICAkKHRyaWdnZXIpLmFkZENsYXNzKENsYXNzTmFtZS5DT0xMQVBTRUQpXG4gICAgICAgICAgICAgIC5hdHRyKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5zZXRUcmFuc2l0aW9uaW5nKHRydWUpXG5cbiAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHtcbiAgICAgIHRoaXMuc2V0VHJhbnNpdGlvbmluZyhmYWxzZSlcbiAgICAgICQodGhpcy5fZWxlbWVudClcbiAgICAgICAgLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5DT0xMQVBTSU5HKVxuICAgICAgICAuYWRkQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFKVxuICAgICAgICAudHJpZ2dlcihFdmVudC5ISURERU4pXG4gICAgfVxuXG4gICAgdGhpcy5fZWxlbWVudC5zdHlsZVtkaW1lbnNpb25dID0gJydcbiAgICBjb25zdCB0cmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpXG5cbiAgICAkKHRoaXMuX2VsZW1lbnQpXG4gICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNvbXBsZXRlKVxuICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKHRyYW5zaXRpb25EdXJhdGlvbilcbiAgfVxuXG4gIHNldFRyYW5zaXRpb25pbmcoaXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gaXNUcmFuc2l0aW9uaW5nXG4gIH1cblxuICBkaXNwb3NlKCkge1xuICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSlcblxuICAgIHRoaXMuX2NvbmZpZyAgICAgICAgICA9IG51bGxcbiAgICB0aGlzLl9wYXJlbnQgICAgICAgICAgPSBudWxsXG4gICAgdGhpcy5fZWxlbWVudCAgICAgICAgID0gbnVsbFxuICAgIHRoaXMuX3RyaWdnZXJBcnJheSAgICA9IG51bGxcbiAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSBudWxsXG4gIH1cblxuICAvLyBQcml2YXRlXG5cbiAgX2dldENvbmZpZyhjb25maWcpIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAuLi5EZWZhdWx0LFxuICAgICAgLi4uY29uZmlnXG4gICAgfVxuICAgIGNvbmZpZy50b2dnbGUgPSBCb29sZWFuKGNvbmZpZy50b2dnbGUpIC8vIENvZXJjZSBzdHJpbmcgdmFsdWVzXG4gICAgVXRpbC50eXBlQ2hlY2tDb25maWcoTkFNRSwgY29uZmlnLCBEZWZhdWx0VHlwZSlcbiAgICByZXR1cm4gY29uZmlnXG4gIH1cblxuICBfZ2V0RGltZW5zaW9uKCkge1xuICAgIGNvbnN0IGhhc1dpZHRoID0gJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhEaW1lbnNpb24uV0lEVEgpXG4gICAgcmV0dXJuIGhhc1dpZHRoID8gRGltZW5zaW9uLldJRFRIIDogRGltZW5zaW9uLkhFSUdIVFxuICB9XG5cbiAgX2dldFBhcmVudCgpIHtcbiAgICBsZXQgcGFyZW50XG5cbiAgICBpZiAoVXRpbC5pc0VsZW1lbnQodGhpcy5fY29uZmlnLnBhcmVudCkpIHtcbiAgICAgIHBhcmVudCA9IHRoaXMuX2NvbmZpZy5wYXJlbnRcblxuICAgICAgLy8gSXQncyBhIGpRdWVyeSBvYmplY3RcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5fY29uZmlnLnBhcmVudC5qcXVlcnkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHBhcmVudCA9IHRoaXMuX2NvbmZpZy5wYXJlbnRbMF1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcGFyZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLl9jb25maWcucGFyZW50KVxuICAgIH1cblxuICAgIGNvbnN0IHNlbGVjdG9yID1cbiAgICAgIGBbZGF0YS10b2dnbGU9XCJjb2xsYXBzZVwiXVtkYXRhLXBhcmVudD1cIiR7dGhpcy5fY29uZmlnLnBhcmVudH1cIl1gXG5cbiAgICBjb25zdCBjaGlsZHJlbiA9IFtdLnNsaWNlLmNhbGwocGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxuICAgICQoY2hpbGRyZW4pLmVhY2goKGksIGVsZW1lbnQpID0+IHtcbiAgICAgIHRoaXMuX2FkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyhcbiAgICAgICAgQ29sbGFwc2UuX2dldFRhcmdldEZyb21FbGVtZW50KGVsZW1lbnQpLFxuICAgICAgICBbZWxlbWVudF1cbiAgICAgIClcbiAgICB9KVxuXG4gICAgcmV0dXJuIHBhcmVudFxuICB9XG5cbiAgX2FkZEFyaWFBbmRDb2xsYXBzZWRDbGFzcyhlbGVtZW50LCB0cmlnZ2VyQXJyYXkpIHtcbiAgICBjb25zdCBpc09wZW4gPSAkKGVsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKVxuXG4gICAgaWYgKHRyaWdnZXJBcnJheS5sZW5ndGgpIHtcbiAgICAgICQodHJpZ2dlckFycmF5KVxuICAgICAgICAudG9nZ2xlQ2xhc3MoQ2xhc3NOYW1lLkNPTExBUFNFRCwgIWlzT3BlbilcbiAgICAgICAgLmF0dHIoJ2FyaWEtZXhwYW5kZWQnLCBpc09wZW4pXG4gICAgfVxuICB9XG5cbiAgLy8gU3RhdGljXG5cbiAgc3RhdGljIF9nZXRUYXJnZXRGcm9tRWxlbWVudChlbGVtZW50KSB7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSBVdGlsLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQoZWxlbWVudClcbiAgICByZXR1cm4gc2VsZWN0b3IgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKSA6IG51bGxcbiAgfVxuXG4gIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgJHRoaXMgICA9ICQodGhpcylcbiAgICAgIGxldCBkYXRhICAgICAgPSAkdGhpcy5kYXRhKERBVEFfS0VZKVxuICAgICAgY29uc3QgX2NvbmZpZyA9IHtcbiAgICAgICAgLi4uRGVmYXVsdCxcbiAgICAgICAgLi4uJHRoaXMuZGF0YSgpLFxuICAgICAgICAuLi50eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWcgPyBjb25maWcgOiB7fVxuICAgICAgfVxuXG4gICAgICBpZiAoIWRhdGEgJiYgX2NvbmZpZy50b2dnbGUgJiYgL3Nob3d8aGlkZS8udGVzdChjb25maWcpKSB7XG4gICAgICAgIF9jb25maWcudG9nZ2xlID0gZmFsc2VcbiAgICAgIH1cblxuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBuZXcgQ29sbGFwc2UodGhpcywgX2NvbmZpZylcbiAgICAgICAgJHRoaXMuZGF0YShEQVRBX0tFWSwgZGF0YSlcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YVtjb25maWddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYClcbiAgICAgICAgfVxuICAgICAgICBkYXRhW2NvbmZpZ10oKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4kKGRvY3VtZW50KS5vbihFdmVudC5DTElDS19EQVRBX0FQSSwgU2VsZWN0b3IuREFUQV9UT0dHTEUsIGZ1bmN0aW9uIChldmVudCkge1xuICAvLyBwcmV2ZW50RGVmYXVsdCBvbmx5IGZvciA8YT4gZWxlbWVudHMgKHdoaWNoIGNoYW5nZSB0aGUgVVJMKSBub3QgaW5zaWRlIHRoZSBjb2xsYXBzaWJsZSBlbGVtZW50XG4gIGlmIChldmVudC5jdXJyZW50VGFyZ2V0LnRhZ05hbWUgPT09ICdBJykge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgfVxuXG4gIGNvbnN0ICR0cmlnZ2VyID0gJCh0aGlzKVxuICBjb25zdCBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudCh0aGlzKVxuICBjb25zdCBzZWxlY3RvcnMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKVxuXG4gICQoc2VsZWN0b3JzKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCAkdGFyZ2V0ID0gJCh0aGlzKVxuICAgIGNvbnN0IGRhdGEgICAgPSAkdGFyZ2V0LmRhdGEoREFUQV9LRVkpXG4gICAgY29uc3QgY29uZmlnICA9IGRhdGEgPyAndG9nZ2xlJyA6ICR0cmlnZ2VyLmRhdGEoKVxuICAgIENvbGxhcHNlLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkdGFyZ2V0LCBjb25maWcpXG4gIH0pXG59KVxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogalF1ZXJ5XG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4kLmZuW05BTUVdID0gQ29sbGFwc2UuX2pRdWVyeUludGVyZmFjZVxuJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IENvbGxhcHNlXG4kLmZuW05BTUVdLm5vQ29uZmxpY3QgPSAoKSA9PiB7XG4gICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgcmV0dXJuIENvbGxhcHNlLl9qUXVlcnlJbnRlcmZhY2Vcbn1cblxuZXhwb3J0IGRlZmF1bHQgQ29sbGFwc2VcbiIsIi8qKiFcbiAqIEBmaWxlT3ZlcnZpZXcgS2lja2FzcyBsaWJyYXJ5IHRvIGNyZWF0ZSBhbmQgcGxhY2UgcG9wcGVycyBuZWFyIHRoZWlyIHJlZmVyZW5jZSBlbGVtZW50cy5cbiAqIEB2ZXJzaW9uIDEuMTQuN1xuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxNiBGZWRlcmljbyBaaXZvbG8gYW5kIGNvbnRyaWJ1dG9yc1xuICpcbiAqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbiAqIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbiAqIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbiAqIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbiAqIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuICogZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbiAqXG4gKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcbiAqIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4gKlxuICogVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuICogSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gKiBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcbiAqIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcbiAqIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gKiBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuICogU09GVFdBUkUuXG4gKi9cbnZhciBpc0Jyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xuXG52YXIgbG9uZ2VyVGltZW91dEJyb3dzZXJzID0gWydFZGdlJywgJ1RyaWRlbnQnLCAnRmlyZWZveCddO1xudmFyIHRpbWVvdXREdXJhdGlvbiA9IDA7XG5mb3IgKHZhciBpID0gMDsgaSA8IGxvbmdlclRpbWVvdXRCcm93c2Vycy5sZW5ndGg7IGkgKz0gMSkge1xuICBpZiAoaXNCcm93c2VyICYmIG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZihsb25nZXJUaW1lb3V0QnJvd3NlcnNbaV0pID49IDApIHtcbiAgICB0aW1lb3V0RHVyYXRpb24gPSAxO1xuICAgIGJyZWFrO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1pY3JvdGFza0RlYm91bmNlKGZuKSB7XG4gIHZhciBjYWxsZWQgPSBmYWxzZTtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoY2FsbGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNhbGxlZCA9IHRydWU7XG4gICAgd2luZG93LlByb21pc2UucmVzb2x2ZSgpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgY2FsbGVkID0gZmFsc2U7XG4gICAgICBmbigpO1xuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0YXNrRGVib3VuY2UoZm4pIHtcbiAgdmFyIHNjaGVkdWxlZCA9IGZhbHNlO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIGlmICghc2NoZWR1bGVkKSB7XG4gICAgICBzY2hlZHVsZWQgPSB0cnVlO1xuICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNjaGVkdWxlZCA9IGZhbHNlO1xuICAgICAgICBmbigpO1xuICAgICAgfSwgdGltZW91dER1cmF0aW9uKTtcbiAgICB9XG4gIH07XG59XG5cbnZhciBzdXBwb3J0c01pY3JvVGFza3MgPSBpc0Jyb3dzZXIgJiYgd2luZG93LlByb21pc2U7XG5cbi8qKlxuKiBDcmVhdGUgYSBkZWJvdW5jZWQgdmVyc2lvbiBvZiBhIG1ldGhvZCwgdGhhdCdzIGFzeW5jaHJvbm91c2x5IGRlZmVycmVkXG4qIGJ1dCBjYWxsZWQgaW4gdGhlIG1pbmltdW0gdGltZSBwb3NzaWJsZS5cbipcbiogQG1ldGhvZFxuKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4qIEBhcmd1bWVudCB7RnVuY3Rpb259IGZuXG4qIEByZXR1cm5zIHtGdW5jdGlvbn1cbiovXG52YXIgZGVib3VuY2UgPSBzdXBwb3J0c01pY3JvVGFza3MgPyBtaWNyb3Rhc2tEZWJvdW5jZSA6IHRhc2tEZWJvdW5jZTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgZ2l2ZW4gdmFyaWFibGUgaXMgYSBmdW5jdGlvblxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtBbnl9IGZ1bmN0aW9uVG9DaGVjayAtIHZhcmlhYmxlIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gYW5zd2VyIHRvOiBpcyBhIGZ1bmN0aW9uP1xuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKGZ1bmN0aW9uVG9DaGVjaykge1xuICB2YXIgZ2V0VHlwZSA9IHt9O1xuICByZXR1cm4gZnVuY3Rpb25Ub0NoZWNrICYmIGdldFR5cGUudG9TdHJpbmcuY2FsbChmdW5jdGlvblRvQ2hlY2spID09PSAnW29iamVjdCBGdW5jdGlvbl0nO1xufVxuXG4vKipcbiAqIEdldCBDU1MgY29tcHV0ZWQgcHJvcGVydHkgb2YgdGhlIGdpdmVuIGVsZW1lbnRcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7RWVtZW50fSBlbGVtZW50XG4gKiBAYXJndW1lbnQge1N0cmluZ30gcHJvcGVydHlcbiAqL1xuZnVuY3Rpb24gZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5KGVsZW1lbnQsIHByb3BlcnR5KSB7XG4gIGlmIChlbGVtZW50Lm5vZGVUeXBlICE9PSAxKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG4gIC8vIE5PVEU6IDEgRE9NIGFjY2VzcyBoZXJlXG4gIHZhciB3aW5kb3cgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XG4gIHZhciBjc3MgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKTtcbiAgcmV0dXJuIHByb3BlcnR5ID8gY3NzW3Byb3BlcnR5XSA6IGNzcztcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBwYXJlbnROb2RlIG9yIHRoZSBob3N0IG9mIHRoZSBlbGVtZW50XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtFbGVtZW50fSBwYXJlbnRcbiAqL1xuZnVuY3Rpb24gZ2V0UGFyZW50Tm9kZShlbGVtZW50KSB7XG4gIGlmIChlbGVtZW50Lm5vZGVOYW1lID09PSAnSFRNTCcpIHtcbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfVxuICByZXR1cm4gZWxlbWVudC5wYXJlbnROb2RlIHx8IGVsZW1lbnQuaG9zdDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBzY3JvbGxpbmcgcGFyZW50IG9mIHRoZSBnaXZlbiBlbGVtZW50XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtFbGVtZW50fSBzY3JvbGwgcGFyZW50XG4gKi9cbmZ1bmN0aW9uIGdldFNjcm9sbFBhcmVudChlbGVtZW50KSB7XG4gIC8vIFJldHVybiBib2R5LCBgZ2V0U2Nyb2xsYCB3aWxsIHRha2UgY2FyZSB0byBnZXQgdGhlIGNvcnJlY3QgYHNjcm9sbFRvcGAgZnJvbSBpdFxuICBpZiAoIWVsZW1lbnQpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuYm9keTtcbiAgfVxuXG4gIHN3aXRjaCAoZWxlbWVudC5ub2RlTmFtZSkge1xuICAgIGNhc2UgJ0hUTUwnOlxuICAgIGNhc2UgJ0JPRFknOlxuICAgICAgcmV0dXJuIGVsZW1lbnQub3duZXJEb2N1bWVudC5ib2R5O1xuICAgIGNhc2UgJyNkb2N1bWVudCc6XG4gICAgICByZXR1cm4gZWxlbWVudC5ib2R5O1xuICB9XG5cbiAgLy8gRmlyZWZveCB3YW50IHVzIHRvIGNoZWNrIGAteGAgYW5kIGAteWAgdmFyaWF0aW9ucyBhcyB3ZWxsXG5cbiAgdmFyIF9nZXRTdHlsZUNvbXB1dGVkUHJvcCA9IGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eShlbGVtZW50KSxcbiAgICAgIG92ZXJmbG93ID0gX2dldFN0eWxlQ29tcHV0ZWRQcm9wLm92ZXJmbG93LFxuICAgICAgb3ZlcmZsb3dYID0gX2dldFN0eWxlQ29tcHV0ZWRQcm9wLm92ZXJmbG93WCxcbiAgICAgIG92ZXJmbG93WSA9IF9nZXRTdHlsZUNvbXB1dGVkUHJvcC5vdmVyZmxvd1k7XG5cbiAgaWYgKC8oYXV0b3xzY3JvbGx8b3ZlcmxheSkvLnRlc3Qob3ZlcmZsb3cgKyBvdmVyZmxvd1kgKyBvdmVyZmxvd1gpKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH1cblxuICByZXR1cm4gZ2V0U2Nyb2xsUGFyZW50KGdldFBhcmVudE5vZGUoZWxlbWVudCkpO1xufVxuXG52YXIgaXNJRTExID0gaXNCcm93c2VyICYmICEhKHdpbmRvdy5NU0lucHV0TWV0aG9kQ29udGV4dCAmJiBkb2N1bWVudC5kb2N1bWVudE1vZGUpO1xudmFyIGlzSUUxMCA9IGlzQnJvd3NlciAmJiAvTVNJRSAxMC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBicm93c2VyIGlzIEludGVybmV0IEV4cGxvcmVyXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcGFyYW0ge051bWJlcn0gdmVyc2lvbiB0byBjaGVja1xuICogQHJldHVybnMge0Jvb2xlYW59IGlzSUVcbiAqL1xuZnVuY3Rpb24gaXNJRSh2ZXJzaW9uKSB7XG4gIGlmICh2ZXJzaW9uID09PSAxMSkge1xuICAgIHJldHVybiBpc0lFMTE7XG4gIH1cbiAgaWYgKHZlcnNpb24gPT09IDEwKSB7XG4gICAgcmV0dXJuIGlzSUUxMDtcbiAgfVxuICByZXR1cm4gaXNJRTExIHx8IGlzSUUxMDtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBvZmZzZXQgcGFyZW50IG9mIHRoZSBnaXZlbiBlbGVtZW50XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEByZXR1cm5zIHtFbGVtZW50fSBvZmZzZXQgcGFyZW50XG4gKi9cbmZ1bmN0aW9uIGdldE9mZnNldFBhcmVudChlbGVtZW50KSB7XG4gIGlmICghZWxlbWVudCkge1xuICAgIHJldHVybiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIH1cblxuICB2YXIgbm9PZmZzZXRQYXJlbnQgPSBpc0lFKDEwKSA/IGRvY3VtZW50LmJvZHkgOiBudWxsO1xuXG4gIC8vIE5PVEU6IDEgRE9NIGFjY2VzcyBoZXJlXG4gIHZhciBvZmZzZXRQYXJlbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudCB8fCBudWxsO1xuICAvLyBTa2lwIGhpZGRlbiBlbGVtZW50cyB3aGljaCBkb24ndCBoYXZlIGFuIG9mZnNldFBhcmVudFxuICB3aGlsZSAob2Zmc2V0UGFyZW50ID09PSBub09mZnNldFBhcmVudCAmJiBlbGVtZW50Lm5leHRFbGVtZW50U2libGluZykge1xuICAgIG9mZnNldFBhcmVudCA9IChlbGVtZW50ID0gZWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcpLm9mZnNldFBhcmVudDtcbiAgfVxuXG4gIHZhciBub2RlTmFtZSA9IG9mZnNldFBhcmVudCAmJiBvZmZzZXRQYXJlbnQubm9kZU5hbWU7XG5cbiAgaWYgKCFub2RlTmFtZSB8fCBub2RlTmFtZSA9PT0gJ0JPRFknIHx8IG5vZGVOYW1lID09PSAnSFRNTCcpIHtcbiAgICByZXR1cm4gZWxlbWVudCA/IGVsZW1lbnQub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIH1cblxuICAvLyAub2Zmc2V0UGFyZW50IHdpbGwgcmV0dXJuIHRoZSBjbG9zZXN0IFRILCBURCBvciBUQUJMRSBpbiBjYXNlXG4gIC8vIG5vIG9mZnNldFBhcmVudCBpcyBwcmVzZW50LCBJIGhhdGUgdGhpcyBqb2IuLi5cbiAgaWYgKFsnVEgnLCAnVEQnLCAnVEFCTEUnXS5pbmRleE9mKG9mZnNldFBhcmVudC5ub2RlTmFtZSkgIT09IC0xICYmIGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eShvZmZzZXRQYXJlbnQsICdwb3NpdGlvbicpID09PSAnc3RhdGljJykge1xuICAgIHJldHVybiBnZXRPZmZzZXRQYXJlbnQob2Zmc2V0UGFyZW50KTtcbiAgfVxuXG4gIHJldHVybiBvZmZzZXRQYXJlbnQ7XG59XG5cbmZ1bmN0aW9uIGlzT2Zmc2V0Q29udGFpbmVyKGVsZW1lbnQpIHtcbiAgdmFyIG5vZGVOYW1lID0gZWxlbWVudC5ub2RlTmFtZTtcblxuICBpZiAobm9kZU5hbWUgPT09ICdCT0RZJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gbm9kZU5hbWUgPT09ICdIVE1MJyB8fCBnZXRPZmZzZXRQYXJlbnQoZWxlbWVudC5maXJzdEVsZW1lbnRDaGlsZCkgPT09IGVsZW1lbnQ7XG59XG5cbi8qKlxuICogRmluZHMgdGhlIHJvb3Qgbm9kZSAoZG9jdW1lbnQsIHNoYWRvd0RPTSByb290KSBvZiB0aGUgZ2l2ZW4gZWxlbWVudFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBub2RlXG4gKiBAcmV0dXJucyB7RWxlbWVudH0gcm9vdCBub2RlXG4gKi9cbmZ1bmN0aW9uIGdldFJvb3Qobm9kZSkge1xuICBpZiAobm9kZS5wYXJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgcmV0dXJuIGdldFJvb3Qobm9kZS5wYXJlbnROb2RlKTtcbiAgfVxuXG4gIHJldHVybiBub2RlO1xufVxuXG4vKipcbiAqIEZpbmRzIHRoZSBvZmZzZXQgcGFyZW50IGNvbW1vbiB0byB0aGUgdHdvIHByb3ZpZGVkIG5vZGVzXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnQxXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnQyXG4gKiBAcmV0dXJucyB7RWxlbWVudH0gY29tbW9uIG9mZnNldCBwYXJlbnRcbiAqL1xuZnVuY3Rpb24gZmluZENvbW1vbk9mZnNldFBhcmVudChlbGVtZW50MSwgZWxlbWVudDIpIHtcbiAgLy8gVGhpcyBjaGVjayBpcyBuZWVkZWQgdG8gYXZvaWQgZXJyb3JzIGluIGNhc2Ugb25lIG9mIHRoZSBlbGVtZW50cyBpc24ndCBkZWZpbmVkIGZvciBhbnkgcmVhc29uXG4gIGlmICghZWxlbWVudDEgfHwgIWVsZW1lbnQxLm5vZGVUeXBlIHx8ICFlbGVtZW50MiB8fCAhZWxlbWVudDIubm9kZVR5cGUpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICB9XG5cbiAgLy8gSGVyZSB3ZSBtYWtlIHN1cmUgdG8gZ2l2ZSBhcyBcInN0YXJ0XCIgdGhlIGVsZW1lbnQgdGhhdCBjb21lcyBmaXJzdCBpbiB0aGUgRE9NXG4gIHZhciBvcmRlciA9IGVsZW1lbnQxLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKGVsZW1lbnQyKSAmIE5vZGUuRE9DVU1FTlRfUE9TSVRJT05fRk9MTE9XSU5HO1xuICB2YXIgc3RhcnQgPSBvcmRlciA/IGVsZW1lbnQxIDogZWxlbWVudDI7XG4gIHZhciBlbmQgPSBvcmRlciA/IGVsZW1lbnQyIDogZWxlbWVudDE7XG5cbiAgLy8gR2V0IGNvbW1vbiBhbmNlc3RvciBjb250YWluZXJcbiAgdmFyIHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgcmFuZ2Uuc2V0U3RhcnQoc3RhcnQsIDApO1xuICByYW5nZS5zZXRFbmQoZW5kLCAwKTtcbiAgdmFyIGNvbW1vbkFuY2VzdG9yQ29udGFpbmVyID0gcmFuZ2UuY29tbW9uQW5jZXN0b3JDb250YWluZXI7XG5cbiAgLy8gQm90aCBub2RlcyBhcmUgaW5zaWRlICNkb2N1bWVudFxuXG4gIGlmIChlbGVtZW50MSAhPT0gY29tbW9uQW5jZXN0b3JDb250YWluZXIgJiYgZWxlbWVudDIgIT09IGNvbW1vbkFuY2VzdG9yQ29udGFpbmVyIHx8IHN0YXJ0LmNvbnRhaW5zKGVuZCkpIHtcbiAgICBpZiAoaXNPZmZzZXRDb250YWluZXIoY29tbW9uQW5jZXN0b3JDb250YWluZXIpKSB7XG4gICAgICByZXR1cm4gY29tbW9uQW5jZXN0b3JDb250YWluZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdldE9mZnNldFBhcmVudChjb21tb25BbmNlc3RvckNvbnRhaW5lcik7XG4gIH1cblxuICAvLyBvbmUgb2YgdGhlIG5vZGVzIGlzIGluc2lkZSBzaGFkb3dET00sIGZpbmQgd2hpY2ggb25lXG4gIHZhciBlbGVtZW50MXJvb3QgPSBnZXRSb290KGVsZW1lbnQxKTtcbiAgaWYgKGVsZW1lbnQxcm9vdC5ob3N0KSB7XG4gICAgcmV0dXJuIGZpbmRDb21tb25PZmZzZXRQYXJlbnQoZWxlbWVudDFyb290Lmhvc3QsIGVsZW1lbnQyKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmluZENvbW1vbk9mZnNldFBhcmVudChlbGVtZW50MSwgZ2V0Um9vdChlbGVtZW50MikuaG9zdCk7XG4gIH1cbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBzY3JvbGwgdmFsdWUgb2YgdGhlIGdpdmVuIGVsZW1lbnQgaW4gdGhlIGdpdmVuIHNpZGUgKHRvcCBhbmQgbGVmdClcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7RWxlbWVudH0gZWxlbWVudFxuICogQGFyZ3VtZW50IHtTdHJpbmd9IHNpZGUgYHRvcGAgb3IgYGxlZnRgXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBhbW91bnQgb2Ygc2Nyb2xsZWQgcGl4ZWxzXG4gKi9cbmZ1bmN0aW9uIGdldFNjcm9sbChlbGVtZW50KSB7XG4gIHZhciBzaWRlID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAndG9wJztcblxuICB2YXIgdXBwZXJTaWRlID0gc2lkZSA9PT0gJ3RvcCcgPyAnc2Nyb2xsVG9wJyA6ICdzY3JvbGxMZWZ0JztcbiAgdmFyIG5vZGVOYW1lID0gZWxlbWVudC5ub2RlTmFtZTtcblxuICBpZiAobm9kZU5hbWUgPT09ICdCT0RZJyB8fCBub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgdmFyIGh0bWwgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIHZhciBzY3JvbGxpbmdFbGVtZW50ID0gZWxlbWVudC5vd25lckRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQgfHwgaHRtbDtcbiAgICByZXR1cm4gc2Nyb2xsaW5nRWxlbWVudFt1cHBlclNpZGVdO1xuICB9XG5cbiAgcmV0dXJuIGVsZW1lbnRbdXBwZXJTaWRlXTtcbn1cblxuLypcbiAqIFN1bSBvciBzdWJ0cmFjdCB0aGUgZWxlbWVudCBzY3JvbGwgdmFsdWVzIChsZWZ0IGFuZCB0b3ApIGZyb20gYSBnaXZlbiByZWN0IG9iamVjdFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtPYmplY3R9IHJlY3QgLSBSZWN0IG9iamVjdCB5b3Ugd2FudCB0byBjaGFuZ2VcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsZW1lbnQgLSBUaGUgZWxlbWVudCBmcm9tIHRoZSBmdW5jdGlvbiByZWFkcyB0aGUgc2Nyb2xsIHZhbHVlc1xuICogQHBhcmFtIHtCb29sZWFufSBzdWJ0cmFjdCAtIHNldCB0byB0cnVlIGlmIHlvdSB3YW50IHRvIHN1YnRyYWN0IHRoZSBzY3JvbGwgdmFsdWVzXG4gKiBAcmV0dXJuIHtPYmplY3R9IHJlY3QgLSBUaGUgbW9kaWZpZXIgcmVjdCBvYmplY3RcbiAqL1xuZnVuY3Rpb24gaW5jbHVkZVNjcm9sbChyZWN0LCBlbGVtZW50KSB7XG4gIHZhciBzdWJ0cmFjdCA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG5cbiAgdmFyIHNjcm9sbFRvcCA9IGdldFNjcm9sbChlbGVtZW50LCAndG9wJyk7XG4gIHZhciBzY3JvbGxMZWZ0ID0gZ2V0U2Nyb2xsKGVsZW1lbnQsICdsZWZ0Jyk7XG4gIHZhciBtb2RpZmllciA9IHN1YnRyYWN0ID8gLTEgOiAxO1xuICByZWN0LnRvcCArPSBzY3JvbGxUb3AgKiBtb2RpZmllcjtcbiAgcmVjdC5ib3R0b20gKz0gc2Nyb2xsVG9wICogbW9kaWZpZXI7XG4gIHJlY3QubGVmdCArPSBzY3JvbGxMZWZ0ICogbW9kaWZpZXI7XG4gIHJlY3QucmlnaHQgKz0gc2Nyb2xsTGVmdCAqIG1vZGlmaWVyO1xuICByZXR1cm4gcmVjdDtcbn1cblxuLypcbiAqIEhlbHBlciB0byBkZXRlY3QgYm9yZGVycyBvZiBhIGdpdmVuIGVsZW1lbnRcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7Q1NTU3R5bGVEZWNsYXJhdGlvbn0gc3R5bGVzXG4gKiBSZXN1bHQgb2YgYGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eWAgb24gdGhlIGdpdmVuIGVsZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBheGlzIC0gYHhgIG9yIGB5YFxuICogQHJldHVybiB7bnVtYmVyfSBib3JkZXJzIC0gVGhlIGJvcmRlcnMgc2l6ZSBvZiB0aGUgZ2l2ZW4gYXhpc1xuICovXG5cbmZ1bmN0aW9uIGdldEJvcmRlcnNTaXplKHN0eWxlcywgYXhpcykge1xuICB2YXIgc2lkZUEgPSBheGlzID09PSAneCcgPyAnTGVmdCcgOiAnVG9wJztcbiAgdmFyIHNpZGVCID0gc2lkZUEgPT09ICdMZWZ0JyA/ICdSaWdodCcgOiAnQm90dG9tJztcblxuICByZXR1cm4gcGFyc2VGbG9hdChzdHlsZXNbJ2JvcmRlcicgKyBzaWRlQSArICdXaWR0aCddLCAxMCkgKyBwYXJzZUZsb2F0KHN0eWxlc1snYm9yZGVyJyArIHNpZGVCICsgJ1dpZHRoJ10sIDEwKTtcbn1cblxuZnVuY3Rpb24gZ2V0U2l6ZShheGlzLCBib2R5LCBodG1sLCBjb21wdXRlZFN0eWxlKSB7XG4gIHJldHVybiBNYXRoLm1heChib2R5WydvZmZzZXQnICsgYXhpc10sIGJvZHlbJ3Njcm9sbCcgKyBheGlzXSwgaHRtbFsnY2xpZW50JyArIGF4aXNdLCBodG1sWydvZmZzZXQnICsgYXhpc10sIGh0bWxbJ3Njcm9sbCcgKyBheGlzXSwgaXNJRSgxMCkgPyBwYXJzZUludChodG1sWydvZmZzZXQnICsgYXhpc10pICsgcGFyc2VJbnQoY29tcHV0ZWRTdHlsZVsnbWFyZ2luJyArIChheGlzID09PSAnSGVpZ2h0JyA/ICdUb3AnIDogJ0xlZnQnKV0pICsgcGFyc2VJbnQoY29tcHV0ZWRTdHlsZVsnbWFyZ2luJyArIChheGlzID09PSAnSGVpZ2h0JyA/ICdCb3R0b20nIDogJ1JpZ2h0JyldKSA6IDApO1xufVxuXG5mdW5jdGlvbiBnZXRXaW5kb3dTaXplcyhkb2N1bWVudCkge1xuICB2YXIgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gIHZhciBodG1sID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICB2YXIgY29tcHV0ZWRTdHlsZSA9IGlzSUUoMTApICYmIGdldENvbXB1dGVkU3R5bGUoaHRtbCk7XG5cbiAgcmV0dXJuIHtcbiAgICBoZWlnaHQ6IGdldFNpemUoJ0hlaWdodCcsIGJvZHksIGh0bWwsIGNvbXB1dGVkU3R5bGUpLFxuICAgIHdpZHRoOiBnZXRTaXplKCdXaWR0aCcsIGJvZHksIGh0bWwsIGNvbXB1dGVkU3R5bGUpXG4gIH07XG59XG5cbnZhciBjbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59O1xuXG52YXIgY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7XG5cblxuXG5cblxudmFyIGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59O1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTtcblxuLyoqXG4gKiBHaXZlbiBlbGVtZW50IG9mZnNldHMsIGdlbmVyYXRlIGFuIG91dHB1dCBzaW1pbGFyIHRvIGdldEJvdW5kaW5nQ2xpZW50UmVjdFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IG9mZnNldHNcbiAqIEByZXR1cm5zIHtPYmplY3R9IENsaWVudFJlY3QgbGlrZSBvdXRwdXRcbiAqL1xuZnVuY3Rpb24gZ2V0Q2xpZW50UmVjdChvZmZzZXRzKSB7XG4gIHJldHVybiBfZXh0ZW5kcyh7fSwgb2Zmc2V0cywge1xuICAgIHJpZ2h0OiBvZmZzZXRzLmxlZnQgKyBvZmZzZXRzLndpZHRoLFxuICAgIGJvdHRvbTogb2Zmc2V0cy50b3AgKyBvZmZzZXRzLmhlaWdodFxuICB9KTtcbn1cblxuLyoqXG4gKiBHZXQgYm91bmRpbmcgY2xpZW50IHJlY3Qgb2YgZ2l2ZW4gZWxlbWVudFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbWVudFxuICogQHJldHVybiB7T2JqZWN0fSBjbGllbnQgcmVjdFxuICovXG5mdW5jdGlvbiBnZXRCb3VuZGluZ0NsaWVudFJlY3QoZWxlbWVudCkge1xuICB2YXIgcmVjdCA9IHt9O1xuXG4gIC8vIElFMTAgMTAgRklYOiBQbGVhc2UsIGRvbid0IGFzaywgdGhlIGVsZW1lbnQgaXNuJ3RcbiAgLy8gY29uc2lkZXJlZCBpbiBET00gaW4gc29tZSBjaXJjdW1zdGFuY2VzLi4uXG4gIC8vIFRoaXMgaXNuJ3QgcmVwcm9kdWNpYmxlIGluIElFMTAgY29tcGF0aWJpbGl0eSBtb2RlIG9mIElFMTFcbiAgdHJ5IHtcbiAgICBpZiAoaXNJRSgxMCkpIHtcbiAgICAgIHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IGdldFNjcm9sbChlbGVtZW50LCAndG9wJyk7XG4gICAgICB2YXIgc2Nyb2xsTGVmdCA9IGdldFNjcm9sbChlbGVtZW50LCAnbGVmdCcpO1xuICAgICAgcmVjdC50b3AgKz0gc2Nyb2xsVG9wO1xuICAgICAgcmVjdC5sZWZ0ICs9IHNjcm9sbExlZnQ7XG4gICAgICByZWN0LmJvdHRvbSArPSBzY3JvbGxUb3A7XG4gICAgICByZWN0LnJpZ2h0ICs9IHNjcm9sbExlZnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlY3QgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge31cblxuICB2YXIgcmVzdWx0ID0ge1xuICAgIGxlZnQ6IHJlY3QubGVmdCxcbiAgICB0b3A6IHJlY3QudG9wLFxuICAgIHdpZHRoOiByZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0LFxuICAgIGhlaWdodDogcmVjdC5ib3R0b20gLSByZWN0LnRvcFxuICB9O1xuXG4gIC8vIHN1YnRyYWN0IHNjcm9sbGJhciBzaXplIGZyb20gc2l6ZXNcbiAgdmFyIHNpemVzID0gZWxlbWVudC5ub2RlTmFtZSA9PT0gJ0hUTUwnID8gZ2V0V2luZG93U2l6ZXMoZWxlbWVudC5vd25lckRvY3VtZW50KSA6IHt9O1xuICB2YXIgd2lkdGggPSBzaXplcy53aWR0aCB8fCBlbGVtZW50LmNsaWVudFdpZHRoIHx8IHJlc3VsdC5yaWdodCAtIHJlc3VsdC5sZWZ0O1xuICB2YXIgaGVpZ2h0ID0gc2l6ZXMuaGVpZ2h0IHx8IGVsZW1lbnQuY2xpZW50SGVpZ2h0IHx8IHJlc3VsdC5ib3R0b20gLSByZXN1bHQudG9wO1xuXG4gIHZhciBob3JpelNjcm9sbGJhciA9IGVsZW1lbnQub2Zmc2V0V2lkdGggLSB3aWR0aDtcbiAgdmFyIHZlcnRTY3JvbGxiYXIgPSBlbGVtZW50Lm9mZnNldEhlaWdodCAtIGhlaWdodDtcblxuICAvLyBpZiBhbiBoeXBvdGhldGljYWwgc2Nyb2xsYmFyIGlzIGRldGVjdGVkLCB3ZSBtdXN0IGJlIHN1cmUgaXQncyBub3QgYSBgYm9yZGVyYFxuICAvLyB3ZSBtYWtlIHRoaXMgY2hlY2sgY29uZGl0aW9uYWwgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnNcbiAgaWYgKGhvcml6U2Nyb2xsYmFyIHx8IHZlcnRTY3JvbGxiYXIpIHtcbiAgICB2YXIgc3R5bGVzID0gZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5KGVsZW1lbnQpO1xuICAgIGhvcml6U2Nyb2xsYmFyIC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ3gnKTtcbiAgICB2ZXJ0U2Nyb2xsYmFyIC09IGdldEJvcmRlcnNTaXplKHN0eWxlcywgJ3knKTtcblxuICAgIHJlc3VsdC53aWR0aCAtPSBob3JpelNjcm9sbGJhcjtcbiAgICByZXN1bHQuaGVpZ2h0IC09IHZlcnRTY3JvbGxiYXI7XG4gIH1cblxuICByZXR1cm4gZ2V0Q2xpZW50UmVjdChyZXN1bHQpO1xufVxuXG5mdW5jdGlvbiBnZXRPZmZzZXRSZWN0UmVsYXRpdmVUb0FyYml0cmFyeU5vZGUoY2hpbGRyZW4sIHBhcmVudCkge1xuICB2YXIgZml4ZWRQb3NpdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogZmFsc2U7XG5cbiAgdmFyIGlzSUUxMCA9IGlzSUUoMTApO1xuICB2YXIgaXNIVE1MID0gcGFyZW50Lm5vZGVOYW1lID09PSAnSFRNTCc7XG4gIHZhciBjaGlsZHJlblJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3QoY2hpbGRyZW4pO1xuICB2YXIgcGFyZW50UmVjdCA9IGdldEJvdW5kaW5nQ2xpZW50UmVjdChwYXJlbnQpO1xuICB2YXIgc2Nyb2xsUGFyZW50ID0gZ2V0U2Nyb2xsUGFyZW50KGNoaWxkcmVuKTtcblxuICB2YXIgc3R5bGVzID0gZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5KHBhcmVudCk7XG4gIHZhciBib3JkZXJUb3BXaWR0aCA9IHBhcnNlRmxvYXQoc3R5bGVzLmJvcmRlclRvcFdpZHRoLCAxMCk7XG4gIHZhciBib3JkZXJMZWZ0V2lkdGggPSBwYXJzZUZsb2F0KHN0eWxlcy5ib3JkZXJMZWZ0V2lkdGgsIDEwKTtcblxuICAvLyBJbiBjYXNlcyB3aGVyZSB0aGUgcGFyZW50IGlzIGZpeGVkLCB3ZSBtdXN0IGlnbm9yZSBuZWdhdGl2ZSBzY3JvbGwgaW4gb2Zmc2V0IGNhbGNcbiAgaWYgKGZpeGVkUG9zaXRpb24gJiYgaXNIVE1MKSB7XG4gICAgcGFyZW50UmVjdC50b3AgPSBNYXRoLm1heChwYXJlbnRSZWN0LnRvcCwgMCk7XG4gICAgcGFyZW50UmVjdC5sZWZ0ID0gTWF0aC5tYXgocGFyZW50UmVjdC5sZWZ0LCAwKTtcbiAgfVxuICB2YXIgb2Zmc2V0cyA9IGdldENsaWVudFJlY3Qoe1xuICAgIHRvcDogY2hpbGRyZW5SZWN0LnRvcCAtIHBhcmVudFJlY3QudG9wIC0gYm9yZGVyVG9wV2lkdGgsXG4gICAgbGVmdDogY2hpbGRyZW5SZWN0LmxlZnQgLSBwYXJlbnRSZWN0LmxlZnQgLSBib3JkZXJMZWZ0V2lkdGgsXG4gICAgd2lkdGg6IGNoaWxkcmVuUmVjdC53aWR0aCxcbiAgICBoZWlnaHQ6IGNoaWxkcmVuUmVjdC5oZWlnaHRcbiAgfSk7XG4gIG9mZnNldHMubWFyZ2luVG9wID0gMDtcbiAgb2Zmc2V0cy5tYXJnaW5MZWZ0ID0gMDtcblxuICAvLyBTdWJ0cmFjdCBtYXJnaW5zIG9mIGRvY3VtZW50RWxlbWVudCBpbiBjYXNlIGl0J3MgYmVpbmcgdXNlZCBhcyBwYXJlbnRcbiAgLy8gd2UgZG8gdGhpcyBvbmx5IG9uIEhUTUwgYmVjYXVzZSBpdCdzIHRoZSBvbmx5IGVsZW1lbnQgdGhhdCBiZWhhdmVzXG4gIC8vIGRpZmZlcmVudGx5IHdoZW4gbWFyZ2lucyBhcmUgYXBwbGllZCB0byBpdC4gVGhlIG1hcmdpbnMgYXJlIGluY2x1ZGVkIGluXG4gIC8vIHRoZSBib3ggb2YgdGhlIGRvY3VtZW50RWxlbWVudCwgaW4gdGhlIG90aGVyIGNhc2VzIG5vdC5cbiAgaWYgKCFpc0lFMTAgJiYgaXNIVE1MKSB7XG4gICAgdmFyIG1hcmdpblRvcCA9IHBhcnNlRmxvYXQoc3R5bGVzLm1hcmdpblRvcCwgMTApO1xuICAgIHZhciBtYXJnaW5MZWZ0ID0gcGFyc2VGbG9hdChzdHlsZXMubWFyZ2luTGVmdCwgMTApO1xuXG4gICAgb2Zmc2V0cy50b3AgLT0gYm9yZGVyVG9wV2lkdGggLSBtYXJnaW5Ub3A7XG4gICAgb2Zmc2V0cy5ib3R0b20gLT0gYm9yZGVyVG9wV2lkdGggLSBtYXJnaW5Ub3A7XG4gICAgb2Zmc2V0cy5sZWZ0IC09IGJvcmRlckxlZnRXaWR0aCAtIG1hcmdpbkxlZnQ7XG4gICAgb2Zmc2V0cy5yaWdodCAtPSBib3JkZXJMZWZ0V2lkdGggLSBtYXJnaW5MZWZ0O1xuXG4gICAgLy8gQXR0YWNoIG1hcmdpblRvcCBhbmQgbWFyZ2luTGVmdCBiZWNhdXNlIGluIHNvbWUgY2lyY3Vtc3RhbmNlcyB3ZSBtYXkgbmVlZCB0aGVtXG4gICAgb2Zmc2V0cy5tYXJnaW5Ub3AgPSBtYXJnaW5Ub3A7XG4gICAgb2Zmc2V0cy5tYXJnaW5MZWZ0ID0gbWFyZ2luTGVmdDtcbiAgfVxuXG4gIGlmIChpc0lFMTAgJiYgIWZpeGVkUG9zaXRpb24gPyBwYXJlbnQuY29udGFpbnMoc2Nyb2xsUGFyZW50KSA6IHBhcmVudCA9PT0gc2Nyb2xsUGFyZW50ICYmIHNjcm9sbFBhcmVudC5ub2RlTmFtZSAhPT0gJ0JPRFknKSB7XG4gICAgb2Zmc2V0cyA9IGluY2x1ZGVTY3JvbGwob2Zmc2V0cywgcGFyZW50KTtcbiAgfVxuXG4gIHJldHVybiBvZmZzZXRzO1xufVxuXG5mdW5jdGlvbiBnZXRWaWV3cG9ydE9mZnNldFJlY3RSZWxhdGl2ZVRvQXJ0Yml0cmFyeU5vZGUoZWxlbWVudCkge1xuICB2YXIgZXhjbHVkZVNjcm9sbCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZmFsc2U7XG5cbiAgdmFyIGh0bWwgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICB2YXIgcmVsYXRpdmVPZmZzZXQgPSBnZXRPZmZzZXRSZWN0UmVsYXRpdmVUb0FyYml0cmFyeU5vZGUoZWxlbWVudCwgaHRtbCk7XG4gIHZhciB3aWR0aCA9IE1hdGgubWF4KGh0bWwuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoIHx8IDApO1xuICB2YXIgaGVpZ2h0ID0gTWF0aC5tYXgoaHRtbC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKTtcblxuICB2YXIgc2Nyb2xsVG9wID0gIWV4Y2x1ZGVTY3JvbGwgPyBnZXRTY3JvbGwoaHRtbCkgOiAwO1xuICB2YXIgc2Nyb2xsTGVmdCA9ICFleGNsdWRlU2Nyb2xsID8gZ2V0U2Nyb2xsKGh0bWwsICdsZWZ0JykgOiAwO1xuXG4gIHZhciBvZmZzZXQgPSB7XG4gICAgdG9wOiBzY3JvbGxUb3AgLSByZWxhdGl2ZU9mZnNldC50b3AgKyByZWxhdGl2ZU9mZnNldC5tYXJnaW5Ub3AsXG4gICAgbGVmdDogc2Nyb2xsTGVmdCAtIHJlbGF0aXZlT2Zmc2V0LmxlZnQgKyByZWxhdGl2ZU9mZnNldC5tYXJnaW5MZWZ0LFxuICAgIHdpZHRoOiB3aWR0aCxcbiAgICBoZWlnaHQ6IGhlaWdodFxuICB9O1xuXG4gIHJldHVybiBnZXRDbGllbnRSZWN0KG9mZnNldCk7XG59XG5cbi8qKlxuICogQ2hlY2sgaWYgdGhlIGdpdmVuIGVsZW1lbnQgaXMgZml4ZWQgb3IgaXMgaW5zaWRlIGEgZml4ZWQgcGFyZW50XG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnRcbiAqIEBhcmd1bWVudCB7RWxlbWVudH0gY3VzdG9tQ29udGFpbmVyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gYW5zd2VyIHRvIFwiaXNGaXhlZD9cIlxuICovXG5mdW5jdGlvbiBpc0ZpeGVkKGVsZW1lbnQpIHtcbiAgdmFyIG5vZGVOYW1lID0gZWxlbWVudC5ub2RlTmFtZTtcbiAgaWYgKG5vZGVOYW1lID09PSAnQk9EWScgfHwgbm9kZU5hbWUgPT09ICdIVE1MJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoZ2V0U3R5bGVDb21wdXRlZFByb3BlcnR5KGVsZW1lbnQsICdwb3NpdGlvbicpID09PSAnZml4ZWQnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIHBhcmVudE5vZGUgPSBnZXRQYXJlbnROb2RlKGVsZW1lbnQpO1xuICBpZiAoIXBhcmVudE5vZGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGlzRml4ZWQocGFyZW50Tm9kZSk7XG59XG5cbi8qKlxuICogRmluZHMgdGhlIGZpcnN0IHBhcmVudCBvZiBhbiBlbGVtZW50IHRoYXQgaGFzIGEgdHJhbnNmb3JtZWQgcHJvcGVydHkgZGVmaW5lZFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJucyB7RWxlbWVudH0gZmlyc3QgdHJhbnNmb3JtZWQgcGFyZW50IG9yIGRvY3VtZW50RWxlbWVudFxuICovXG5cbmZ1bmN0aW9uIGdldEZpeGVkUG9zaXRpb25PZmZzZXRQYXJlbnQoZWxlbWVudCkge1xuICAvLyBUaGlzIGNoZWNrIGlzIG5lZWRlZCB0byBhdm9pZCBlcnJvcnMgaW4gY2FzZSBvbmUgb2YgdGhlIGVsZW1lbnRzIGlzbid0IGRlZmluZWQgZm9yIGFueSByZWFzb25cbiAgaWYgKCFlbGVtZW50IHx8ICFlbGVtZW50LnBhcmVudEVsZW1lbnQgfHwgaXNJRSgpKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfVxuICB2YXIgZWwgPSBlbGVtZW50LnBhcmVudEVsZW1lbnQ7XG4gIHdoaWxlIChlbCAmJiBnZXRTdHlsZUNvbXB1dGVkUHJvcGVydHkoZWwsICd0cmFuc2Zvcm0nKSA9PT0gJ25vbmUnKSB7XG4gICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50O1xuICB9XG4gIHJldHVybiBlbCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG59XG5cbi8qKlxuICogQ29tcHV0ZWQgdGhlIGJvdW5kYXJpZXMgbGltaXRzIGFuZCByZXR1cm4gdGhlbVxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcG9wcGVyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByZWZlcmVuY2VcbiAqIEBwYXJhbSB7bnVtYmVyfSBwYWRkaW5nXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBib3VuZGFyaWVzRWxlbWVudCAtIEVsZW1lbnQgdXNlZCB0byBkZWZpbmUgdGhlIGJvdW5kYXJpZXNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gZml4ZWRQb3NpdGlvbiAtIElzIGluIGZpeGVkIHBvc2l0aW9uIG1vZGVcbiAqIEByZXR1cm5zIHtPYmplY3R9IENvb3JkaW5hdGVzIG9mIHRoZSBib3VuZGFyaWVzXG4gKi9cbmZ1bmN0aW9uIGdldEJvdW5kYXJpZXMocG9wcGVyLCByZWZlcmVuY2UsIHBhZGRpbmcsIGJvdW5kYXJpZXNFbGVtZW50KSB7XG4gIHZhciBmaXhlZFBvc2l0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDQgJiYgYXJndW1lbnRzWzRdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbNF0gOiBmYWxzZTtcblxuICAvLyBOT1RFOiAxIERPTSBhY2Nlc3MgaGVyZVxuXG4gIHZhciBib3VuZGFyaWVzID0geyB0b3A6IDAsIGxlZnQ6IDAgfTtcbiAgdmFyIG9mZnNldFBhcmVudCA9IGZpeGVkUG9zaXRpb24gPyBnZXRGaXhlZFBvc2l0aW9uT2Zmc2V0UGFyZW50KHBvcHBlcikgOiBmaW5kQ29tbW9uT2Zmc2V0UGFyZW50KHBvcHBlciwgcmVmZXJlbmNlKTtcblxuICAvLyBIYW5kbGUgdmlld3BvcnQgY2FzZVxuICBpZiAoYm91bmRhcmllc0VsZW1lbnQgPT09ICd2aWV3cG9ydCcpIHtcbiAgICBib3VuZGFyaWVzID0gZ2V0Vmlld3BvcnRPZmZzZXRSZWN0UmVsYXRpdmVUb0FydGJpdHJhcnlOb2RlKG9mZnNldFBhcmVudCwgZml4ZWRQb3NpdGlvbik7XG4gIH0gZWxzZSB7XG4gICAgLy8gSGFuZGxlIG90aGVyIGNhc2VzIGJhc2VkIG9uIERPTSBlbGVtZW50IHVzZWQgYXMgYm91bmRhcmllc1xuICAgIHZhciBib3VuZGFyaWVzTm9kZSA9IHZvaWQgMDtcbiAgICBpZiAoYm91bmRhcmllc0VsZW1lbnQgPT09ICdzY3JvbGxQYXJlbnQnKSB7XG4gICAgICBib3VuZGFyaWVzTm9kZSA9IGdldFNjcm9sbFBhcmVudChnZXRQYXJlbnROb2RlKHJlZmVyZW5jZSkpO1xuICAgICAgaWYgKGJvdW5kYXJpZXNOb2RlLm5vZGVOYW1lID09PSAnQk9EWScpIHtcbiAgICAgICAgYm91bmRhcmllc05vZGUgPSBwb3BwZXIub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChib3VuZGFyaWVzRWxlbWVudCA9PT0gJ3dpbmRvdycpIHtcbiAgICAgIGJvdW5kYXJpZXNOb2RlID0gcG9wcGVyLm93bmVyRG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBib3VuZGFyaWVzTm9kZSA9IGJvdW5kYXJpZXNFbGVtZW50O1xuICAgIH1cblxuICAgIHZhciBvZmZzZXRzID0gZ2V0T2Zmc2V0UmVjdFJlbGF0aXZlVG9BcmJpdHJhcnlOb2RlKGJvdW5kYXJpZXNOb2RlLCBvZmZzZXRQYXJlbnQsIGZpeGVkUG9zaXRpb24pO1xuXG4gICAgLy8gSW4gY2FzZSBvZiBIVE1MLCB3ZSBuZWVkIGEgZGlmZmVyZW50IGNvbXB1dGF0aW9uXG4gICAgaWYgKGJvdW5kYXJpZXNOb2RlLm5vZGVOYW1lID09PSAnSFRNTCcgJiYgIWlzRml4ZWQob2Zmc2V0UGFyZW50KSkge1xuICAgICAgdmFyIF9nZXRXaW5kb3dTaXplcyA9IGdldFdpbmRvd1NpemVzKHBvcHBlci5vd25lckRvY3VtZW50KSxcbiAgICAgICAgICBoZWlnaHQgPSBfZ2V0V2luZG93U2l6ZXMuaGVpZ2h0LFxuICAgICAgICAgIHdpZHRoID0gX2dldFdpbmRvd1NpemVzLndpZHRoO1xuXG4gICAgICBib3VuZGFyaWVzLnRvcCArPSBvZmZzZXRzLnRvcCAtIG9mZnNldHMubWFyZ2luVG9wO1xuICAgICAgYm91bmRhcmllcy5ib3R0b20gPSBoZWlnaHQgKyBvZmZzZXRzLnRvcDtcbiAgICAgIGJvdW5kYXJpZXMubGVmdCArPSBvZmZzZXRzLmxlZnQgLSBvZmZzZXRzLm1hcmdpbkxlZnQ7XG4gICAgICBib3VuZGFyaWVzLnJpZ2h0ID0gd2lkdGggKyBvZmZzZXRzLmxlZnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGZvciBhbGwgdGhlIG90aGVyIERPTSBlbGVtZW50cywgdGhpcyBvbmUgaXMgZ29vZFxuICAgICAgYm91bmRhcmllcyA9IG9mZnNldHM7XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIHBhZGRpbmdzXG4gIHBhZGRpbmcgPSBwYWRkaW5nIHx8IDA7XG4gIHZhciBpc1BhZGRpbmdOdW1iZXIgPSB0eXBlb2YgcGFkZGluZyA9PT0gJ251bWJlcic7XG4gIGJvdW5kYXJpZXMubGVmdCArPSBpc1BhZGRpbmdOdW1iZXIgPyBwYWRkaW5nIDogcGFkZGluZy5sZWZ0IHx8IDA7XG4gIGJvdW5kYXJpZXMudG9wICs9IGlzUGFkZGluZ051bWJlciA/IHBhZGRpbmcgOiBwYWRkaW5nLnRvcCB8fCAwO1xuICBib3VuZGFyaWVzLnJpZ2h0IC09IGlzUGFkZGluZ051bWJlciA/IHBhZGRpbmcgOiBwYWRkaW5nLnJpZ2h0IHx8IDA7XG4gIGJvdW5kYXJpZXMuYm90dG9tIC09IGlzUGFkZGluZ051bWJlciA/IHBhZGRpbmcgOiBwYWRkaW5nLmJvdHRvbSB8fCAwO1xuXG4gIHJldHVybiBib3VuZGFyaWVzO1xufVxuXG5mdW5jdGlvbiBnZXRBcmVhKF9yZWYpIHtcbiAgdmFyIHdpZHRoID0gX3JlZi53aWR0aCxcbiAgICAgIGhlaWdodCA9IF9yZWYuaGVpZ2h0O1xuXG4gIHJldHVybiB3aWR0aCAqIGhlaWdodDtcbn1cblxuLyoqXG4gKiBVdGlsaXR5IHVzZWQgdG8gdHJhbnNmb3JtIHRoZSBgYXV0b2AgcGxhY2VtZW50IHRvIHRoZSBwbGFjZW1lbnQgd2l0aCBtb3JlXG4gKiBhdmFpbGFibGUgc3BhY2UuXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgdXBkYXRlIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIGRhdGEgb2JqZWN0LCBwcm9wZXJseSBtb2RpZmllZFxuICovXG5mdW5jdGlvbiBjb21wdXRlQXV0b1BsYWNlbWVudChwbGFjZW1lbnQsIHJlZlJlY3QsIHBvcHBlciwgcmVmZXJlbmNlLCBib3VuZGFyaWVzRWxlbWVudCkge1xuICB2YXIgcGFkZGluZyA9IGFyZ3VtZW50cy5sZW5ndGggPiA1ICYmIGFyZ3VtZW50c1s1XSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzVdIDogMDtcblxuICBpZiAocGxhY2VtZW50LmluZGV4T2YoJ2F1dG8nKSA9PT0gLTEpIHtcbiAgICByZXR1cm4gcGxhY2VtZW50O1xuICB9XG5cbiAgdmFyIGJvdW5kYXJpZXMgPSBnZXRCb3VuZGFyaWVzKHBvcHBlciwgcmVmZXJlbmNlLCBwYWRkaW5nLCBib3VuZGFyaWVzRWxlbWVudCk7XG5cbiAgdmFyIHJlY3RzID0ge1xuICAgIHRvcDoge1xuICAgICAgd2lkdGg6IGJvdW5kYXJpZXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHJlZlJlY3QudG9wIC0gYm91bmRhcmllcy50b3BcbiAgICB9LFxuICAgIHJpZ2h0OiB7XG4gICAgICB3aWR0aDogYm91bmRhcmllcy5yaWdodCAtIHJlZlJlY3QucmlnaHQsXG4gICAgICBoZWlnaHQ6IGJvdW5kYXJpZXMuaGVpZ2h0XG4gICAgfSxcbiAgICBib3R0b206IHtcbiAgICAgIHdpZHRoOiBib3VuZGFyaWVzLndpZHRoLFxuICAgICAgaGVpZ2h0OiBib3VuZGFyaWVzLmJvdHRvbSAtIHJlZlJlY3QuYm90dG9tXG4gICAgfSxcbiAgICBsZWZ0OiB7XG4gICAgICB3aWR0aDogcmVmUmVjdC5sZWZ0IC0gYm91bmRhcmllcy5sZWZ0LFxuICAgICAgaGVpZ2h0OiBib3VuZGFyaWVzLmhlaWdodFxuICAgIH1cbiAgfTtcblxuICB2YXIgc29ydGVkQXJlYXMgPSBPYmplY3Qua2V5cyhyZWN0cykubWFwKGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gX2V4dGVuZHMoe1xuICAgICAga2V5OiBrZXlcbiAgICB9LCByZWN0c1trZXldLCB7XG4gICAgICBhcmVhOiBnZXRBcmVhKHJlY3RzW2tleV0pXG4gICAgfSk7XG4gIH0pLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICByZXR1cm4gYi5hcmVhIC0gYS5hcmVhO1xuICB9KTtcblxuICB2YXIgZmlsdGVyZWRBcmVhcyA9IHNvcnRlZEFyZWFzLmZpbHRlcihmdW5jdGlvbiAoX3JlZjIpIHtcbiAgICB2YXIgd2lkdGggPSBfcmVmMi53aWR0aCxcbiAgICAgICAgaGVpZ2h0ID0gX3JlZjIuaGVpZ2h0O1xuICAgIHJldHVybiB3aWR0aCA+PSBwb3BwZXIuY2xpZW50V2lkdGggJiYgaGVpZ2h0ID49IHBvcHBlci5jbGllbnRIZWlnaHQ7XG4gIH0pO1xuXG4gIHZhciBjb21wdXRlZFBsYWNlbWVudCA9IGZpbHRlcmVkQXJlYXMubGVuZ3RoID4gMCA/IGZpbHRlcmVkQXJlYXNbMF0ua2V5IDogc29ydGVkQXJlYXNbMF0ua2V5O1xuXG4gIHZhciB2YXJpYXRpb24gPSBwbGFjZW1lbnQuc3BsaXQoJy0nKVsxXTtcblxuICByZXR1cm4gY29tcHV0ZWRQbGFjZW1lbnQgKyAodmFyaWF0aW9uID8gJy0nICsgdmFyaWF0aW9uIDogJycpO1xufVxuXG4vKipcbiAqIEdldCBvZmZzZXRzIHRvIHRoZSByZWZlcmVuY2UgZWxlbWVudFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtPYmplY3R9IHN0YXRlXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHBvcHBlciAtIHRoZSBwb3BwZXIgZWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50fSByZWZlcmVuY2UgLSB0aGUgcmVmZXJlbmNlIGVsZW1lbnQgKHRoZSBwb3BwZXIgd2lsbCBiZSByZWxhdGl2ZSB0byB0aGlzKVxuICogQHBhcmFtIHtFbGVtZW50fSBmaXhlZFBvc2l0aW9uIC0gaXMgaW4gZml4ZWQgcG9zaXRpb24gbW9kZVxuICogQHJldHVybnMge09iamVjdH0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9mZnNldHMgd2hpY2ggd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXJcbiAqL1xuZnVuY3Rpb24gZ2V0UmVmZXJlbmNlT2Zmc2V0cyhzdGF0ZSwgcG9wcGVyLCByZWZlcmVuY2UpIHtcbiAgdmFyIGZpeGVkUG9zaXRpb24gPSBhcmd1bWVudHMubGVuZ3RoID4gMyAmJiBhcmd1bWVudHNbM10gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1szXSA6IG51bGw7XG5cbiAgdmFyIGNvbW1vbk9mZnNldFBhcmVudCA9IGZpeGVkUG9zaXRpb24gPyBnZXRGaXhlZFBvc2l0aW9uT2Zmc2V0UGFyZW50KHBvcHBlcikgOiBmaW5kQ29tbW9uT2Zmc2V0UGFyZW50KHBvcHBlciwgcmVmZXJlbmNlKTtcbiAgcmV0dXJuIGdldE9mZnNldFJlY3RSZWxhdGl2ZVRvQXJiaXRyYXJ5Tm9kZShyZWZlcmVuY2UsIGNvbW1vbk9mZnNldFBhcmVudCwgZml4ZWRQb3NpdGlvbik7XG59XG5cbi8qKlxuICogR2V0IHRoZSBvdXRlciBzaXplcyBvZiB0aGUgZ2l2ZW4gZWxlbWVudCAob2Zmc2V0IHNpemUgKyBtYXJnaW5zKVxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBvYmplY3QgY29udGFpbmluZyB3aWR0aCBhbmQgaGVpZ2h0IHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gZ2V0T3V0ZXJTaXplcyhlbGVtZW50KSB7XG4gIHZhciB3aW5kb3cgPSBlbGVtZW50Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXc7XG4gIHZhciBzdHlsZXMgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcbiAgdmFyIHggPSBwYXJzZUZsb2F0KHN0eWxlcy5tYXJnaW5Ub3AgfHwgMCkgKyBwYXJzZUZsb2F0KHN0eWxlcy5tYXJnaW5Cb3R0b20gfHwgMCk7XG4gIHZhciB5ID0gcGFyc2VGbG9hdChzdHlsZXMubWFyZ2luTGVmdCB8fCAwKSArIHBhcnNlRmxvYXQoc3R5bGVzLm1hcmdpblJpZ2h0IHx8IDApO1xuICB2YXIgcmVzdWx0ID0ge1xuICAgIHdpZHRoOiBlbGVtZW50Lm9mZnNldFdpZHRoICsgeSxcbiAgICBoZWlnaHQ6IGVsZW1lbnQub2Zmc2V0SGVpZ2h0ICsgeFxuICB9O1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEdldCB0aGUgb3Bwb3NpdGUgcGxhY2VtZW50IG9mIHRoZSBnaXZlbiBvbmVcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7U3RyaW5nfSBwbGFjZW1lbnRcbiAqIEByZXR1cm5zIHtTdHJpbmd9IGZsaXBwZWQgcGxhY2VtZW50XG4gKi9cbmZ1bmN0aW9uIGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCkge1xuICB2YXIgaGFzaCA9IHsgbGVmdDogJ3JpZ2h0JywgcmlnaHQ6ICdsZWZ0JywgYm90dG9tOiAndG9wJywgdG9wOiAnYm90dG9tJyB9O1xuICByZXR1cm4gcGxhY2VtZW50LnJlcGxhY2UoL2xlZnR8cmlnaHR8Ym90dG9tfHRvcC9nLCBmdW5jdGlvbiAobWF0Y2hlZCkge1xuICAgIHJldHVybiBoYXNoW21hdGNoZWRdO1xuICB9KTtcbn1cblxuLyoqXG4gKiBHZXQgb2Zmc2V0cyB0byB0aGUgcG9wcGVyXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcGFyYW0ge09iamVjdH0gcG9zaXRpb24gLSBDU1MgcG9zaXRpb24gdGhlIFBvcHBlciB3aWxsIGdldCBhcHBsaWVkXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwb3BwZXIgLSB0aGUgcG9wcGVyIGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSByZWZlcmVuY2VPZmZzZXRzIC0gdGhlIHJlZmVyZW5jZSBvZmZzZXRzICh0aGUgcG9wcGVyIHdpbGwgYmUgcmVsYXRpdmUgdG8gdGhpcylcbiAqIEBwYXJhbSB7U3RyaW5nfSBwbGFjZW1lbnQgLSBvbmUgb2YgdGhlIHZhbGlkIHBsYWNlbWVudCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBwb3BwZXJPZmZzZXRzIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9mZnNldHMgd2hpY2ggd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXJcbiAqL1xuZnVuY3Rpb24gZ2V0UG9wcGVyT2Zmc2V0cyhwb3BwZXIsIHJlZmVyZW5jZU9mZnNldHMsIHBsYWNlbWVudCkge1xuICBwbGFjZW1lbnQgPSBwbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcblxuICAvLyBHZXQgcG9wcGVyIG5vZGUgc2l6ZXNcbiAgdmFyIHBvcHBlclJlY3QgPSBnZXRPdXRlclNpemVzKHBvcHBlcik7XG5cbiAgLy8gQWRkIHBvc2l0aW9uLCB3aWR0aCBhbmQgaGVpZ2h0IHRvIG91ciBvZmZzZXRzIG9iamVjdFxuICB2YXIgcG9wcGVyT2Zmc2V0cyA9IHtcbiAgICB3aWR0aDogcG9wcGVyUmVjdC53aWR0aCxcbiAgICBoZWlnaHQ6IHBvcHBlclJlY3QuaGVpZ2h0XG4gIH07XG5cbiAgLy8gZGVwZW5kaW5nIGJ5IHRoZSBwb3BwZXIgcGxhY2VtZW50IHdlIGhhdmUgdG8gY29tcHV0ZSBpdHMgb2Zmc2V0cyBzbGlnaHRseSBkaWZmZXJlbnRseVxuICB2YXIgaXNIb3JpeiA9IFsncmlnaHQnLCAnbGVmdCddLmluZGV4T2YocGxhY2VtZW50KSAhPT0gLTE7XG4gIHZhciBtYWluU2lkZSA9IGlzSG9yaXogPyAndG9wJyA6ICdsZWZ0JztcbiAgdmFyIHNlY29uZGFyeVNpZGUgPSBpc0hvcml6ID8gJ2xlZnQnIDogJ3RvcCc7XG4gIHZhciBtZWFzdXJlbWVudCA9IGlzSG9yaXogPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gIHZhciBzZWNvbmRhcnlNZWFzdXJlbWVudCA9ICFpc0hvcml6ID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuXG4gIHBvcHBlck9mZnNldHNbbWFpblNpZGVdID0gcmVmZXJlbmNlT2Zmc2V0c1ttYWluU2lkZV0gKyByZWZlcmVuY2VPZmZzZXRzW21lYXN1cmVtZW50XSAvIDIgLSBwb3BwZXJSZWN0W21lYXN1cmVtZW50XSAvIDI7XG4gIGlmIChwbGFjZW1lbnQgPT09IHNlY29uZGFyeVNpZGUpIHtcbiAgICBwb3BwZXJPZmZzZXRzW3NlY29uZGFyeVNpZGVdID0gcmVmZXJlbmNlT2Zmc2V0c1tzZWNvbmRhcnlTaWRlXSAtIHBvcHBlclJlY3Rbc2Vjb25kYXJ5TWVhc3VyZW1lbnRdO1xuICB9IGVsc2Uge1xuICAgIHBvcHBlck9mZnNldHNbc2Vjb25kYXJ5U2lkZV0gPSByZWZlcmVuY2VPZmZzZXRzW2dldE9wcG9zaXRlUGxhY2VtZW50KHNlY29uZGFyeVNpZGUpXTtcbiAgfVxuXG4gIHJldHVybiBwb3BwZXJPZmZzZXRzO1xufVxuXG4vKipcbiAqIE1pbWljcyB0aGUgYGZpbmRgIG1ldGhvZCBvZiBBcnJheVxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtBcnJheX0gYXJyXG4gKiBAYXJndW1lbnQgcHJvcFxuICogQGFyZ3VtZW50IHZhbHVlXG4gKiBAcmV0dXJucyBpbmRleCBvciAtMVxuICovXG5mdW5jdGlvbiBmaW5kKGFyciwgY2hlY2spIHtcbiAgLy8gdXNlIG5hdGl2ZSBmaW5kIGlmIHN1cHBvcnRlZFxuICBpZiAoQXJyYXkucHJvdG90eXBlLmZpbmQpIHtcbiAgICByZXR1cm4gYXJyLmZpbmQoY2hlY2spO1xuICB9XG5cbiAgLy8gdXNlIGBmaWx0ZXJgIHRvIG9idGFpbiB0aGUgc2FtZSBiZWhhdmlvciBvZiBgZmluZGBcbiAgcmV0dXJuIGFyci5maWx0ZXIoY2hlY2spWzBdO1xufVxuXG4vKipcbiAqIFJldHVybiB0aGUgaW5kZXggb2YgdGhlIG1hdGNoaW5nIG9iamVjdFxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtBcnJheX0gYXJyXG4gKiBAYXJndW1lbnQgcHJvcFxuICogQGFyZ3VtZW50IHZhbHVlXG4gKiBAcmV0dXJucyBpbmRleCBvciAtMVxuICovXG5mdW5jdGlvbiBmaW5kSW5kZXgoYXJyLCBwcm9wLCB2YWx1ZSkge1xuICAvLyB1c2UgbmF0aXZlIGZpbmRJbmRleCBpZiBzdXBwb3J0ZWRcbiAgaWYgKEFycmF5LnByb3RvdHlwZS5maW5kSW5kZXgpIHtcbiAgICByZXR1cm4gYXJyLmZpbmRJbmRleChmdW5jdGlvbiAoY3VyKSB7XG4gICAgICByZXR1cm4gY3VyW3Byb3BdID09PSB2YWx1ZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHVzZSBgZmluZGAgKyBgaW5kZXhPZmAgaWYgYGZpbmRJbmRleGAgaXNuJ3Qgc3VwcG9ydGVkXG4gIHZhciBtYXRjaCA9IGZpbmQoYXJyLCBmdW5jdGlvbiAob2JqKSB7XG4gICAgcmV0dXJuIG9ialtwcm9wXSA9PT0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gYXJyLmluZGV4T2YobWF0Y2gpO1xufVxuXG4vKipcbiAqIExvb3AgdHJvdWdoIHRoZSBsaXN0IG9mIG1vZGlmaWVycyBhbmQgcnVuIHRoZW0gaW4gb3JkZXIsXG4gKiBlYWNoIG9mIHRoZW0gd2lsbCB0aGVuIGVkaXQgdGhlIGRhdGEgb2JqZWN0LlxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQHBhcmFtIHtkYXRhT2JqZWN0fSBkYXRhXG4gKiBAcGFyYW0ge0FycmF5fSBtb2RpZmllcnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBlbmRzIC0gT3B0aW9uYWwgbW9kaWZpZXIgbmFtZSB1c2VkIGFzIHN0b3BwZXJcbiAqIEByZXR1cm5zIHtkYXRhT2JqZWN0fVxuICovXG5mdW5jdGlvbiBydW5Nb2RpZmllcnMobW9kaWZpZXJzLCBkYXRhLCBlbmRzKSB7XG4gIHZhciBtb2RpZmllcnNUb1J1biA9IGVuZHMgPT09IHVuZGVmaW5lZCA/IG1vZGlmaWVycyA6IG1vZGlmaWVycy5zbGljZSgwLCBmaW5kSW5kZXgobW9kaWZpZXJzLCAnbmFtZScsIGVuZHMpKTtcblxuICBtb2RpZmllcnNUb1J1bi5mb3JFYWNoKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgIGlmIChtb2RpZmllclsnZnVuY3Rpb24nXSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbGluZSBkb3Qtbm90YXRpb25cbiAgICAgIGNvbnNvbGUud2FybignYG1vZGlmaWVyLmZ1bmN0aW9uYCBpcyBkZXByZWNhdGVkLCB1c2UgYG1vZGlmaWVyLmZuYCEnKTtcbiAgICB9XG4gICAgdmFyIGZuID0gbW9kaWZpZXJbJ2Z1bmN0aW9uJ10gfHwgbW9kaWZpZXIuZm47IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZG90LW5vdGF0aW9uXG4gICAgaWYgKG1vZGlmaWVyLmVuYWJsZWQgJiYgaXNGdW5jdGlvbihmbikpIHtcbiAgICAgIC8vIEFkZCBwcm9wZXJ0aWVzIHRvIG9mZnNldHMgdG8gbWFrZSB0aGVtIGEgY29tcGxldGUgY2xpZW50UmVjdCBvYmplY3RcbiAgICAgIC8vIHdlIGRvIHRoaXMgYmVmb3JlIGVhY2ggbW9kaWZpZXIgdG8gbWFrZSBzdXJlIHRoZSBwcmV2aW91cyBvbmUgZG9lc24ndFxuICAgICAgLy8gbWVzcyB3aXRoIHRoZXNlIHZhbHVlc1xuICAgICAgZGF0YS5vZmZzZXRzLnBvcHBlciA9IGdldENsaWVudFJlY3QoZGF0YS5vZmZzZXRzLnBvcHBlcik7XG4gICAgICBkYXRhLm9mZnNldHMucmVmZXJlbmNlID0gZ2V0Q2xpZW50UmVjdChkYXRhLm9mZnNldHMucmVmZXJlbmNlKTtcblxuICAgICAgZGF0YSA9IGZuKGRhdGEsIG1vZGlmaWVyKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIFVwZGF0ZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBwb3BwZXIsIGNvbXB1dGluZyB0aGUgbmV3IG9mZnNldHMgYW5kIGFwcGx5aW5nXG4gKiB0aGUgbmV3IHN0eWxlLjxiciAvPlxuICogUHJlZmVyIGBzY2hlZHVsZVVwZGF0ZWAgb3ZlciBgdXBkYXRlYCBiZWNhdXNlIG9mIHBlcmZvcm1hbmNlIHJlYXNvbnMuXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgLy8gaWYgcG9wcGVyIGlzIGRlc3Ryb3llZCwgZG9uJ3QgcGVyZm9ybSBhbnkgZnVydGhlciB1cGRhdGVcbiAgaWYgKHRoaXMuc3RhdGUuaXNEZXN0cm95ZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgZGF0YSA9IHtcbiAgICBpbnN0YW5jZTogdGhpcyxcbiAgICBzdHlsZXM6IHt9LFxuICAgIGFycm93U3R5bGVzOiB7fSxcbiAgICBhdHRyaWJ1dGVzOiB7fSxcbiAgICBmbGlwcGVkOiBmYWxzZSxcbiAgICBvZmZzZXRzOiB7fVxuICB9O1xuXG4gIC8vIGNvbXB1dGUgcmVmZXJlbmNlIGVsZW1lbnQgb2Zmc2V0c1xuICBkYXRhLm9mZnNldHMucmVmZXJlbmNlID0gZ2V0UmVmZXJlbmNlT2Zmc2V0cyh0aGlzLnN0YXRlLCB0aGlzLnBvcHBlciwgdGhpcy5yZWZlcmVuY2UsIHRoaXMub3B0aW9ucy5wb3NpdGlvbkZpeGVkKTtcblxuICAvLyBjb21wdXRlIGF1dG8gcGxhY2VtZW50LCBzdG9yZSBwbGFjZW1lbnQgaW5zaWRlIHRoZSBkYXRhIG9iamVjdCxcbiAgLy8gbW9kaWZpZXJzIHdpbGwgYmUgYWJsZSB0byBlZGl0IGBwbGFjZW1lbnRgIGlmIG5lZWRlZFxuICAvLyBhbmQgcmVmZXIgdG8gb3JpZ2luYWxQbGFjZW1lbnQgdG8ga25vdyB0aGUgb3JpZ2luYWwgdmFsdWVcbiAgZGF0YS5wbGFjZW1lbnQgPSBjb21wdXRlQXV0b1BsYWNlbWVudCh0aGlzLm9wdGlvbnMucGxhY2VtZW50LCBkYXRhLm9mZnNldHMucmVmZXJlbmNlLCB0aGlzLnBvcHBlciwgdGhpcy5yZWZlcmVuY2UsIHRoaXMub3B0aW9ucy5tb2RpZmllcnMuZmxpcC5ib3VuZGFyaWVzRWxlbWVudCwgdGhpcy5vcHRpb25zLm1vZGlmaWVycy5mbGlwLnBhZGRpbmcpO1xuXG4gIC8vIHN0b3JlIHRoZSBjb21wdXRlZCBwbGFjZW1lbnQgaW5zaWRlIGBvcmlnaW5hbFBsYWNlbWVudGBcbiAgZGF0YS5vcmlnaW5hbFBsYWNlbWVudCA9IGRhdGEucGxhY2VtZW50O1xuXG4gIGRhdGEucG9zaXRpb25GaXhlZCA9IHRoaXMub3B0aW9ucy5wb3NpdGlvbkZpeGVkO1xuXG4gIC8vIGNvbXB1dGUgdGhlIHBvcHBlciBvZmZzZXRzXG4gIGRhdGEub2Zmc2V0cy5wb3BwZXIgPSBnZXRQb3BwZXJPZmZzZXRzKHRoaXMucG9wcGVyLCBkYXRhLm9mZnNldHMucmVmZXJlbmNlLCBkYXRhLnBsYWNlbWVudCk7XG5cbiAgZGF0YS5vZmZzZXRzLnBvcHBlci5wb3NpdGlvbiA9IHRoaXMub3B0aW9ucy5wb3NpdGlvbkZpeGVkID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZSc7XG5cbiAgLy8gcnVuIHRoZSBtb2RpZmllcnNcbiAgZGF0YSA9IHJ1bk1vZGlmaWVycyh0aGlzLm1vZGlmaWVycywgZGF0YSk7XG5cbiAgLy8gdGhlIGZpcnN0IGB1cGRhdGVgIHdpbGwgY2FsbCBgb25DcmVhdGVgIGNhbGxiYWNrXG4gIC8vIHRoZSBvdGhlciBvbmVzIHdpbGwgY2FsbCBgb25VcGRhdGVgIGNhbGxiYWNrXG4gIGlmICghdGhpcy5zdGF0ZS5pc0NyZWF0ZWQpIHtcbiAgICB0aGlzLnN0YXRlLmlzQ3JlYXRlZCA9IHRydWU7XG4gICAgdGhpcy5vcHRpb25zLm9uQ3JlYXRlKGRhdGEpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMub3B0aW9ucy5vblVwZGF0ZShkYXRhKTtcbiAgfVxufVxuXG4vKipcbiAqIEhlbHBlciB1c2VkIHRvIGtub3cgaWYgdGhlIGdpdmVuIG1vZGlmaWVyIGlzIGVuYWJsZWQuXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNNb2RpZmllckVuYWJsZWQobW9kaWZpZXJzLCBtb2RpZmllck5hbWUpIHtcbiAgcmV0dXJuIG1vZGlmaWVycy5zb21lKGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIG5hbWUgPSBfcmVmLm5hbWUsXG4gICAgICAgIGVuYWJsZWQgPSBfcmVmLmVuYWJsZWQ7XG4gICAgcmV0dXJuIGVuYWJsZWQgJiYgbmFtZSA9PT0gbW9kaWZpZXJOYW1lO1xuICB9KTtcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHByZWZpeGVkIHN1cHBvcnRlZCBwcm9wZXJ0eSBuYW1lXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge1N0cmluZ30gcHJvcGVydHkgKGNhbWVsQ2FzZSlcbiAqIEByZXR1cm5zIHtTdHJpbmd9IHByZWZpeGVkIHByb3BlcnR5IChjYW1lbENhc2Ugb3IgUGFzY2FsQ2FzZSwgZGVwZW5kaW5nIG9uIHRoZSB2ZW5kb3IgcHJlZml4KVxuICovXG5mdW5jdGlvbiBnZXRTdXBwb3J0ZWRQcm9wZXJ0eU5hbWUocHJvcGVydHkpIHtcbiAgdmFyIHByZWZpeGVzID0gW2ZhbHNlLCAnbXMnLCAnV2Via2l0JywgJ01veicsICdPJ107XG4gIHZhciB1cHBlclByb3AgPSBwcm9wZXJ0eS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHByb3BlcnR5LnNsaWNlKDEpO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJlZml4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcHJlZml4ID0gcHJlZml4ZXNbaV07XG4gICAgdmFyIHRvQ2hlY2sgPSBwcmVmaXggPyAnJyArIHByZWZpeCArIHVwcGVyUHJvcCA6IHByb3BlcnR5O1xuICAgIGlmICh0eXBlb2YgZG9jdW1lbnQuYm9keS5zdHlsZVt0b0NoZWNrXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB0b0NoZWNrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBEZXN0cm95cyB0aGUgcG9wcGVyLlxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlclxuICovXG5mdW5jdGlvbiBkZXN0cm95KCkge1xuICB0aGlzLnN0YXRlLmlzRGVzdHJveWVkID0gdHJ1ZTtcblxuICAvLyB0b3VjaCBET00gb25seSBpZiBgYXBwbHlTdHlsZWAgbW9kaWZpZXIgaXMgZW5hYmxlZFxuICBpZiAoaXNNb2RpZmllckVuYWJsZWQodGhpcy5tb2RpZmllcnMsICdhcHBseVN0eWxlJykpIHtcbiAgICB0aGlzLnBvcHBlci5yZW1vdmVBdHRyaWJ1dGUoJ3gtcGxhY2VtZW50Jyk7XG4gICAgdGhpcy5wb3BwZXIuc3R5bGUucG9zaXRpb24gPSAnJztcbiAgICB0aGlzLnBvcHBlci5zdHlsZS50b3AgPSAnJztcbiAgICB0aGlzLnBvcHBlci5zdHlsZS5sZWZ0ID0gJyc7XG4gICAgdGhpcy5wb3BwZXIuc3R5bGUucmlnaHQgPSAnJztcbiAgICB0aGlzLnBvcHBlci5zdHlsZS5ib3R0b20gPSAnJztcbiAgICB0aGlzLnBvcHBlci5zdHlsZS53aWxsQ2hhbmdlID0gJyc7XG4gICAgdGhpcy5wb3BwZXIuc3R5bGVbZ2V0U3VwcG9ydGVkUHJvcGVydHlOYW1lKCd0cmFuc2Zvcm0nKV0gPSAnJztcbiAgfVxuXG4gIHRoaXMuZGlzYWJsZUV2ZW50TGlzdGVuZXJzKCk7XG5cbiAgLy8gcmVtb3ZlIHRoZSBwb3BwZXIgaWYgdXNlciBleHBsaWNpdHkgYXNrZWQgZm9yIHRoZSBkZWxldGlvbiBvbiBkZXN0cm95XG4gIC8vIGRvIG5vdCB1c2UgYHJlbW92ZWAgYmVjYXVzZSBJRTExIGRvZXNuJ3Qgc3VwcG9ydCBpdFxuICBpZiAodGhpcy5vcHRpb25zLnJlbW92ZU9uRGVzdHJveSkge1xuICAgIHRoaXMucG9wcGVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5wb3BwZXIpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG4vKipcbiAqIEdldCB0aGUgd2luZG93IGFzc29jaWF0ZWQgd2l0aCB0aGUgZWxlbWVudFxuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50XG4gKiBAcmV0dXJucyB7V2luZG93fVxuICovXG5mdW5jdGlvbiBnZXRXaW5kb3coZWxlbWVudCkge1xuICB2YXIgb3duZXJEb2N1bWVudCA9IGVsZW1lbnQub3duZXJEb2N1bWVudDtcbiAgcmV0dXJuIG93bmVyRG9jdW1lbnQgPyBvd25lckRvY3VtZW50LmRlZmF1bHRWaWV3IDogd2luZG93O1xufVxuXG5mdW5jdGlvbiBhdHRhY2hUb1Njcm9sbFBhcmVudHMoc2Nyb2xsUGFyZW50LCBldmVudCwgY2FsbGJhY2ssIHNjcm9sbFBhcmVudHMpIHtcbiAgdmFyIGlzQm9keSA9IHNjcm9sbFBhcmVudC5ub2RlTmFtZSA9PT0gJ0JPRFknO1xuICB2YXIgdGFyZ2V0ID0gaXNCb2R5ID8gc2Nyb2xsUGFyZW50Lm93bmVyRG9jdW1lbnQuZGVmYXVsdFZpZXcgOiBzY3JvbGxQYXJlbnQ7XG4gIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBjYWxsYmFjaywgeyBwYXNzaXZlOiB0cnVlIH0pO1xuXG4gIGlmICghaXNCb2R5KSB7XG4gICAgYXR0YWNoVG9TY3JvbGxQYXJlbnRzKGdldFNjcm9sbFBhcmVudCh0YXJnZXQucGFyZW50Tm9kZSksIGV2ZW50LCBjYWxsYmFjaywgc2Nyb2xsUGFyZW50cyk7XG4gIH1cbiAgc2Nyb2xsUGFyZW50cy5wdXNoKHRhcmdldCk7XG59XG5cbi8qKlxuICogU2V0dXAgbmVlZGVkIGV2ZW50IGxpc3RlbmVycyB1c2VkIHRvIHVwZGF0ZSB0aGUgcG9wcGVyIHBvc2l0aW9uXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBzZXR1cEV2ZW50TGlzdGVuZXJzKHJlZmVyZW5jZSwgb3B0aW9ucywgc3RhdGUsIHVwZGF0ZUJvdW5kKSB7XG4gIC8vIFJlc2l6ZSBldmVudCBsaXN0ZW5lciBvbiB3aW5kb3dcbiAgc3RhdGUudXBkYXRlQm91bmQgPSB1cGRhdGVCb3VuZDtcbiAgZ2V0V2luZG93KHJlZmVyZW5jZSkuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgc3RhdGUudXBkYXRlQm91bmQsIHsgcGFzc2l2ZTogdHJ1ZSB9KTtcblxuICAvLyBTY3JvbGwgZXZlbnQgbGlzdGVuZXIgb24gc2Nyb2xsIHBhcmVudHNcbiAgdmFyIHNjcm9sbEVsZW1lbnQgPSBnZXRTY3JvbGxQYXJlbnQocmVmZXJlbmNlKTtcbiAgYXR0YWNoVG9TY3JvbGxQYXJlbnRzKHNjcm9sbEVsZW1lbnQsICdzY3JvbGwnLCBzdGF0ZS51cGRhdGVCb3VuZCwgc3RhdGUuc2Nyb2xsUGFyZW50cyk7XG4gIHN0YXRlLnNjcm9sbEVsZW1lbnQgPSBzY3JvbGxFbGVtZW50O1xuICBzdGF0ZS5ldmVudHNFbmFibGVkID0gdHJ1ZTtcblxuICByZXR1cm4gc3RhdGU7XG59XG5cbi8qKlxuICogSXQgd2lsbCBhZGQgcmVzaXplL3Njcm9sbCBldmVudHMgYW5kIHN0YXJ0IHJlY2FsY3VsYXRpbmdcbiAqIHBvc2l0aW9uIG9mIHRoZSBwb3BwZXIgZWxlbWVudCB3aGVuIHRoZXkgYXJlIHRyaWdnZXJlZC5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXJcbiAqL1xuZnVuY3Rpb24gZW5hYmxlRXZlbnRMaXN0ZW5lcnMoKSB7XG4gIGlmICghdGhpcy5zdGF0ZS5ldmVudHNFbmFibGVkKSB7XG4gICAgdGhpcy5zdGF0ZSA9IHNldHVwRXZlbnRMaXN0ZW5lcnModGhpcy5yZWZlcmVuY2UsIHRoaXMub3B0aW9ucywgdGhpcy5zdGF0ZSwgdGhpcy5zY2hlZHVsZVVwZGF0ZSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmUgZXZlbnQgbGlzdGVuZXJzIHVzZWQgdG8gdXBkYXRlIHRoZSBwb3BwZXIgcG9zaXRpb25cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXJzKHJlZmVyZW5jZSwgc3RhdGUpIHtcbiAgLy8gUmVtb3ZlIHJlc2l6ZSBldmVudCBsaXN0ZW5lciBvbiB3aW5kb3dcbiAgZ2V0V2luZG93KHJlZmVyZW5jZSkucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgc3RhdGUudXBkYXRlQm91bmQpO1xuXG4gIC8vIFJlbW92ZSBzY3JvbGwgZXZlbnQgbGlzdGVuZXIgb24gc2Nyb2xsIHBhcmVudHNcbiAgc3RhdGUuc2Nyb2xsUGFyZW50cy5mb3JFYWNoKGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgc3RhdGUudXBkYXRlQm91bmQpO1xuICB9KTtcblxuICAvLyBSZXNldCBzdGF0ZVxuICBzdGF0ZS51cGRhdGVCb3VuZCA9IG51bGw7XG4gIHN0YXRlLnNjcm9sbFBhcmVudHMgPSBbXTtcbiAgc3RhdGUuc2Nyb2xsRWxlbWVudCA9IG51bGw7XG4gIHN0YXRlLmV2ZW50c0VuYWJsZWQgPSBmYWxzZTtcbiAgcmV0dXJuIHN0YXRlO1xufVxuXG4vKipcbiAqIEl0IHdpbGwgcmVtb3ZlIHJlc2l6ZS9zY3JvbGwgZXZlbnRzIGFuZCB3b24ndCByZWNhbGN1bGF0ZSBwb3BwZXIgcG9zaXRpb25cbiAqIHdoZW4gdGhleSBhcmUgdHJpZ2dlcmVkLiBJdCBhbHNvIHdvbid0IHRyaWdnZXIgYG9uVXBkYXRlYCBjYWxsYmFjayBhbnltb3JlLFxuICogdW5sZXNzIHlvdSBjYWxsIGB1cGRhdGVgIG1ldGhvZCBtYW51YWxseS5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXJcbiAqL1xuZnVuY3Rpb24gZGlzYWJsZUV2ZW50TGlzdGVuZXJzKCkge1xuICBpZiAodGhpcy5zdGF0ZS5ldmVudHNFbmFibGVkKSB7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5zY2hlZHVsZVVwZGF0ZSk7XG4gICAgdGhpcy5zdGF0ZSA9IHJlbW92ZUV2ZW50TGlzdGVuZXJzKHRoaXMucmVmZXJlbmNlLCB0aGlzLnN0YXRlKTtcbiAgfVxufVxuXG4vKipcbiAqIFRlbGxzIGlmIGEgZ2l2ZW4gaW5wdXQgaXMgYSBudW1iZXJcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBwYXJhbSB7Kn0gaW5wdXQgdG8gY2hlY2tcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzTnVtZXJpYyhuKSB7XG4gIHJldHVybiBuICE9PSAnJyAmJiAhaXNOYU4ocGFyc2VGbG9hdChuKSkgJiYgaXNGaW5pdGUobik7XG59XG5cbi8qKlxuICogU2V0IHRoZSBzdHlsZSB0byB0aGUgZ2l2ZW4gcG9wcGVyXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge0VsZW1lbnR9IGVsZW1lbnQgLSBFbGVtZW50IHRvIGFwcGx5IHRoZSBzdHlsZSB0b1xuICogQGFyZ3VtZW50IHtPYmplY3R9IHN0eWxlc1xuICogT2JqZWN0IHdpdGggYSBsaXN0IG9mIHByb3BlcnRpZXMgYW5kIHZhbHVlcyB3aGljaCB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gc2V0U3R5bGVzKGVsZW1lbnQsIHN0eWxlcykge1xuICBPYmplY3Qua2V5cyhzdHlsZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICB2YXIgdW5pdCA9ICcnO1xuICAgIC8vIGFkZCB1bml0IGlmIHRoZSB2YWx1ZSBpcyBudW1lcmljIGFuZCBpcyBvbmUgb2YgdGhlIGZvbGxvd2luZ1xuICAgIGlmIChbJ3dpZHRoJywgJ2hlaWdodCcsICd0b3AnLCAncmlnaHQnLCAnYm90dG9tJywgJ2xlZnQnXS5pbmRleE9mKHByb3ApICE9PSAtMSAmJiBpc051bWVyaWMoc3R5bGVzW3Byb3BdKSkge1xuICAgICAgdW5pdCA9ICdweCc7XG4gICAgfVxuICAgIGVsZW1lbnQuc3R5bGVbcHJvcF0gPSBzdHlsZXNbcHJvcF0gKyB1bml0O1xuICB9KTtcbn1cblxuLyoqXG4gKiBTZXQgdGhlIGF0dHJpYnV0ZXMgdG8gdGhlIGdpdmVuIHBvcHBlclxuICogQG1ldGhvZFxuICogQG1lbWJlcm9mIFBvcHBlci5VdGlsc1xuICogQGFyZ3VtZW50IHtFbGVtZW50fSBlbGVtZW50IC0gRWxlbWVudCB0byBhcHBseSB0aGUgYXR0cmlidXRlcyB0b1xuICogQGFyZ3VtZW50IHtPYmplY3R9IHN0eWxlc1xuICogT2JqZWN0IHdpdGggYSBsaXN0IG9mIHByb3BlcnRpZXMgYW5kIHZhbHVlcyB3aGljaCB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlcyhlbGVtZW50LCBhdHRyaWJ1dGVzKSB7XG4gIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3ApIHtcbiAgICB2YXIgdmFsdWUgPSBhdHRyaWJ1dGVzW3Byb3BdO1xuICAgIGlmICh2YWx1ZSAhPT0gZmFsc2UpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKHByb3AsIGF0dHJpYnV0ZXNbcHJvcF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShwcm9wKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIE1vZGlmaWVyc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IGB1cGRhdGVgIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEuc3R5bGVzIC0gTGlzdCBvZiBzdHlsZSBwcm9wZXJ0aWVzIC0gdmFsdWVzIHRvIGFwcGx5IHRvIHBvcHBlciBlbGVtZW50XG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YS5hdHRyaWJ1dGVzIC0gTGlzdCBvZiBhdHRyaWJ1dGUgcHJvcGVydGllcyAtIHZhbHVlcyB0byBhcHBseSB0byBwb3BwZXIgZWxlbWVudFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIHNhbWUgZGF0YSBvYmplY3RcbiAqL1xuZnVuY3Rpb24gYXBwbHlTdHlsZShkYXRhKSB7XG4gIC8vIGFueSBwcm9wZXJ0eSBwcmVzZW50IGluIGBkYXRhLnN0eWxlc2Agd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIsXG4gIC8vIGluIHRoaXMgd2F5IHdlIGNhbiBtYWtlIHRoZSAzcmQgcGFydHkgbW9kaWZpZXJzIGFkZCBjdXN0b20gc3R5bGVzIHRvIGl0XG4gIC8vIEJlIGF3YXJlLCBtb2RpZmllcnMgY291bGQgb3ZlcnJpZGUgdGhlIHByb3BlcnRpZXMgZGVmaW5lZCBpbiB0aGUgcHJldmlvdXNcbiAgLy8gbGluZXMgb2YgdGhpcyBtb2RpZmllciFcbiAgc2V0U3R5bGVzKGRhdGEuaW5zdGFuY2UucG9wcGVyLCBkYXRhLnN0eWxlcyk7XG5cbiAgLy8gYW55IHByb3BlcnR5IHByZXNlbnQgaW4gYGRhdGEuYXR0cmlidXRlc2Agd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIsXG4gIC8vIHRoZXkgd2lsbCBiZSBzZXQgYXMgSFRNTCBhdHRyaWJ1dGVzIG9mIHRoZSBlbGVtZW50XG4gIHNldEF0dHJpYnV0ZXMoZGF0YS5pbnN0YW5jZS5wb3BwZXIsIGRhdGEuYXR0cmlidXRlcyk7XG5cbiAgLy8gaWYgYXJyb3dFbGVtZW50IGlzIGRlZmluZWQgYW5kIGFycm93U3R5bGVzIGhhcyBzb21lIHByb3BlcnRpZXNcbiAgaWYgKGRhdGEuYXJyb3dFbGVtZW50ICYmIE9iamVjdC5rZXlzKGRhdGEuYXJyb3dTdHlsZXMpLmxlbmd0aCkge1xuICAgIHNldFN0eWxlcyhkYXRhLmFycm93RWxlbWVudCwgZGF0YS5hcnJvd1N0eWxlcyk7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBTZXQgdGhlIHgtcGxhY2VtZW50IGF0dHJpYnV0ZSBiZWZvcmUgZXZlcnl0aGluZyBlbHNlIGJlY2F1c2UgaXQgY291bGQgYmUgdXNlZFxuICogdG8gYWRkIG1hcmdpbnMgdG8gdGhlIHBvcHBlciBtYXJnaW5zIG5lZWRzIHRvIGJlIGNhbGN1bGF0ZWQgdG8gZ2V0IHRoZVxuICogY29ycmVjdCBwb3BwZXIgb2Zmc2V0cy5cbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIubW9kaWZpZXJzXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSByZWZlcmVuY2UgLSBUaGUgcmVmZXJlbmNlIGVsZW1lbnQgdXNlZCB0byBwb3NpdGlvbiB0aGUgcG9wcGVyXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwb3BwZXIgLSBUaGUgSFRNTCBlbGVtZW50IHVzZWQgYXMgcG9wcGVyXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFBvcHBlci5qcyBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGFwcGx5U3R5bGVPbkxvYWQocmVmZXJlbmNlLCBwb3BwZXIsIG9wdGlvbnMsIG1vZGlmaWVyT3B0aW9ucywgc3RhdGUpIHtcbiAgLy8gY29tcHV0ZSByZWZlcmVuY2UgZWxlbWVudCBvZmZzZXRzXG4gIHZhciByZWZlcmVuY2VPZmZzZXRzID0gZ2V0UmVmZXJlbmNlT2Zmc2V0cyhzdGF0ZSwgcG9wcGVyLCByZWZlcmVuY2UsIG9wdGlvbnMucG9zaXRpb25GaXhlZCk7XG5cbiAgLy8gY29tcHV0ZSBhdXRvIHBsYWNlbWVudCwgc3RvcmUgcGxhY2VtZW50IGluc2lkZSB0aGUgZGF0YSBvYmplY3QsXG4gIC8vIG1vZGlmaWVycyB3aWxsIGJlIGFibGUgdG8gZWRpdCBgcGxhY2VtZW50YCBpZiBuZWVkZWRcbiAgLy8gYW5kIHJlZmVyIHRvIG9yaWdpbmFsUGxhY2VtZW50IHRvIGtub3cgdGhlIG9yaWdpbmFsIHZhbHVlXG4gIHZhciBwbGFjZW1lbnQgPSBjb21wdXRlQXV0b1BsYWNlbWVudChvcHRpb25zLnBsYWNlbWVudCwgcmVmZXJlbmNlT2Zmc2V0cywgcG9wcGVyLCByZWZlcmVuY2UsIG9wdGlvbnMubW9kaWZpZXJzLmZsaXAuYm91bmRhcmllc0VsZW1lbnQsIG9wdGlvbnMubW9kaWZpZXJzLmZsaXAucGFkZGluZyk7XG5cbiAgcG9wcGVyLnNldEF0dHJpYnV0ZSgneC1wbGFjZW1lbnQnLCBwbGFjZW1lbnQpO1xuXG4gIC8vIEFwcGx5IGBwb3NpdGlvbmAgdG8gcG9wcGVyIGJlZm9yZSBhbnl0aGluZyBlbHNlIGJlY2F1c2VcbiAgLy8gd2l0aG91dCB0aGUgcG9zaXRpb24gYXBwbGllZCB3ZSBjYW4ndCBndWFyYW50ZWUgY29ycmVjdCBjb21wdXRhdGlvbnNcbiAgc2V0U3R5bGVzKHBvcHBlciwgeyBwb3NpdGlvbjogb3B0aW9ucy5wb3NpdGlvbkZpeGVkID8gJ2ZpeGVkJyA6ICdhYnNvbHV0ZScgfSk7XG5cbiAgcmV0dXJuIG9wdGlvbnM7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgYHVwZGF0ZWAgbWV0aG9kXG4gKiBAYXJndW1lbnQge0Jvb2xlYW59IHNob3VsZFJvdW5kIC0gSWYgdGhlIG9mZnNldHMgc2hvdWxkIGJlIHJvdW5kZWQgYXQgYWxsXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcG9wcGVyJ3MgcG9zaXRpb24gb2Zmc2V0cyByb3VuZGVkXG4gKlxuICogVGhlIHRhbGUgb2YgcGl4ZWwtcGVyZmVjdCBwb3NpdGlvbmluZy4gSXQncyBzdGlsbCBub3QgMTAwJSBwZXJmZWN0LCBidXQgYXNcbiAqIGdvb2QgYXMgaXQgY2FuIGJlIHdpdGhpbiByZWFzb24uXG4gKiBEaXNjdXNzaW9uIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9GZXpWcmFzdGEvcG9wcGVyLmpzL3B1bGwvNzE1XG4gKlxuICogTG93IERQSSBzY3JlZW5zIGNhdXNlIGEgcG9wcGVyIHRvIGJlIGJsdXJyeSBpZiBub3QgdXNpbmcgZnVsbCBwaXhlbHMgKFNhZmFyaVxuICogYXMgd2VsbCBvbiBIaWdoIERQSSBzY3JlZW5zKS5cbiAqXG4gKiBGaXJlZm94IHByZWZlcnMgbm8gcm91bmRpbmcgZm9yIHBvc2l0aW9uaW5nIGFuZCBkb2VzIG5vdCBoYXZlIGJsdXJyaW5lc3Mgb25cbiAqIGhpZ2ggRFBJIHNjcmVlbnMuXG4gKlxuICogT25seSBob3Jpem9udGFsIHBsYWNlbWVudCBhbmQgbGVmdC9yaWdodCB2YWx1ZXMgbmVlZCB0byBiZSBjb25zaWRlcmVkLlxuICovXG5mdW5jdGlvbiBnZXRSb3VuZGVkT2Zmc2V0cyhkYXRhLCBzaG91bGRSb3VuZCkge1xuICB2YXIgX2RhdGEkb2Zmc2V0cyA9IGRhdGEub2Zmc2V0cyxcbiAgICAgIHBvcHBlciA9IF9kYXRhJG9mZnNldHMucG9wcGVyLFxuICAgICAgcmVmZXJlbmNlID0gX2RhdGEkb2Zmc2V0cy5yZWZlcmVuY2U7XG4gIHZhciByb3VuZCA9IE1hdGgucm91bmQsXG4gICAgICBmbG9vciA9IE1hdGguZmxvb3I7XG5cbiAgdmFyIG5vUm91bmQgPSBmdW5jdGlvbiBub1JvdW5kKHYpIHtcbiAgICByZXR1cm4gdjtcbiAgfTtcblxuICB2YXIgcmVmZXJlbmNlV2lkdGggPSByb3VuZChyZWZlcmVuY2Uud2lkdGgpO1xuICB2YXIgcG9wcGVyV2lkdGggPSByb3VuZChwb3BwZXIud2lkdGgpO1xuXG4gIHZhciBpc1ZlcnRpY2FsID0gWydsZWZ0JywgJ3JpZ2h0J10uaW5kZXhPZihkYXRhLnBsYWNlbWVudCkgIT09IC0xO1xuICB2YXIgaXNWYXJpYXRpb24gPSBkYXRhLnBsYWNlbWVudC5pbmRleE9mKCctJykgIT09IC0xO1xuICB2YXIgc2FtZVdpZHRoUGFyaXR5ID0gcmVmZXJlbmNlV2lkdGggJSAyID09PSBwb3BwZXJXaWR0aCAlIDI7XG4gIHZhciBib3RoT2RkV2lkdGggPSByZWZlcmVuY2VXaWR0aCAlIDIgPT09IDEgJiYgcG9wcGVyV2lkdGggJSAyID09PSAxO1xuXG4gIHZhciBob3Jpem9udGFsVG9JbnRlZ2VyID0gIXNob3VsZFJvdW5kID8gbm9Sb3VuZCA6IGlzVmVydGljYWwgfHwgaXNWYXJpYXRpb24gfHwgc2FtZVdpZHRoUGFyaXR5ID8gcm91bmQgOiBmbG9vcjtcbiAgdmFyIHZlcnRpY2FsVG9JbnRlZ2VyID0gIXNob3VsZFJvdW5kID8gbm9Sb3VuZCA6IHJvdW5kO1xuXG4gIHJldHVybiB7XG4gICAgbGVmdDogaG9yaXpvbnRhbFRvSW50ZWdlcihib3RoT2RkV2lkdGggJiYgIWlzVmFyaWF0aW9uICYmIHNob3VsZFJvdW5kID8gcG9wcGVyLmxlZnQgLSAxIDogcG9wcGVyLmxlZnQpLFxuICAgIHRvcDogdmVydGljYWxUb0ludGVnZXIocG9wcGVyLnRvcCksXG4gICAgYm90dG9tOiB2ZXJ0aWNhbFRvSW50ZWdlcihwb3BwZXIuYm90dG9tKSxcbiAgICByaWdodDogaG9yaXpvbnRhbFRvSW50ZWdlcihwb3BwZXIucmlnaHQpXG4gIH07XG59XG5cbnZhciBpc0ZpcmVmb3ggPSBpc0Jyb3dzZXIgJiYgL0ZpcmVmb3gvaS50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpO1xuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIE1vZGlmaWVyc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IGB1cGRhdGVgIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIGRhdGEgb2JqZWN0LCBwcm9wZXJseSBtb2RpZmllZFxuICovXG5mdW5jdGlvbiBjb21wdXRlU3R5bGUoZGF0YSwgb3B0aW9ucykge1xuICB2YXIgeCA9IG9wdGlvbnMueCxcbiAgICAgIHkgPSBvcHRpb25zLnk7XG4gIHZhciBwb3BwZXIgPSBkYXRhLm9mZnNldHMucG9wcGVyO1xuXG4gIC8vIFJlbW92ZSB0aGlzIGxlZ2FjeSBzdXBwb3J0IGluIFBvcHBlci5qcyB2MlxuXG4gIHZhciBsZWdhY3lHcHVBY2NlbGVyYXRpb25PcHRpb24gPSBmaW5kKGRhdGEuaW5zdGFuY2UubW9kaWZpZXJzLCBmdW5jdGlvbiAobW9kaWZpZXIpIHtcbiAgICByZXR1cm4gbW9kaWZpZXIubmFtZSA9PT0gJ2FwcGx5U3R5bGUnO1xuICB9KS5ncHVBY2NlbGVyYXRpb247XG4gIGlmIChsZWdhY3lHcHVBY2NlbGVyYXRpb25PcHRpb24gIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnNvbGUud2FybignV0FSTklORzogYGdwdUFjY2VsZXJhdGlvbmAgb3B0aW9uIG1vdmVkIHRvIGBjb21wdXRlU3R5bGVgIG1vZGlmaWVyIGFuZCB3aWxsIG5vdCBiZSBzdXBwb3J0ZWQgaW4gZnV0dXJlIHZlcnNpb25zIG9mIFBvcHBlci5qcyEnKTtcbiAgfVxuICB2YXIgZ3B1QWNjZWxlcmF0aW9uID0gbGVnYWN5R3B1QWNjZWxlcmF0aW9uT3B0aW9uICE9PSB1bmRlZmluZWQgPyBsZWdhY3lHcHVBY2NlbGVyYXRpb25PcHRpb24gOiBvcHRpb25zLmdwdUFjY2VsZXJhdGlvbjtcblxuICB2YXIgb2Zmc2V0UGFyZW50ID0gZ2V0T2Zmc2V0UGFyZW50KGRhdGEuaW5zdGFuY2UucG9wcGVyKTtcbiAgdmFyIG9mZnNldFBhcmVudFJlY3QgPSBnZXRCb3VuZGluZ0NsaWVudFJlY3Qob2Zmc2V0UGFyZW50KTtcblxuICAvLyBTdHlsZXNcbiAgdmFyIHN0eWxlcyA9IHtcbiAgICBwb3NpdGlvbjogcG9wcGVyLnBvc2l0aW9uXG4gIH07XG5cbiAgdmFyIG9mZnNldHMgPSBnZXRSb3VuZGVkT2Zmc2V0cyhkYXRhLCB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA8IDIgfHwgIWlzRmlyZWZveCk7XG5cbiAgdmFyIHNpZGVBID0geCA9PT0gJ2JvdHRvbScgPyAndG9wJyA6ICdib3R0b20nO1xuICB2YXIgc2lkZUIgPSB5ID09PSAncmlnaHQnID8gJ2xlZnQnIDogJ3JpZ2h0JztcblxuICAvLyBpZiBncHVBY2NlbGVyYXRpb24gaXMgc2V0IHRvIGB0cnVlYCBhbmQgdHJhbnNmb3JtIGlzIHN1cHBvcnRlZCxcbiAgLy8gIHdlIHVzZSBgdHJhbnNsYXRlM2RgIHRvIGFwcGx5IHRoZSBwb3NpdGlvbiB0byB0aGUgcG9wcGVyIHdlXG4gIC8vIGF1dG9tYXRpY2FsbHkgdXNlIHRoZSBzdXBwb3J0ZWQgcHJlZml4ZWQgdmVyc2lvbiBpZiBuZWVkZWRcbiAgdmFyIHByZWZpeGVkUHJvcGVydHkgPSBnZXRTdXBwb3J0ZWRQcm9wZXJ0eU5hbWUoJ3RyYW5zZm9ybScpO1xuXG4gIC8vIG5vdywgbGV0J3MgbWFrZSBhIHN0ZXAgYmFjayBhbmQgbG9vayBhdCB0aGlzIGNvZGUgY2xvc2VseSAod3RmPylcbiAgLy8gSWYgdGhlIGNvbnRlbnQgb2YgdGhlIHBvcHBlciBncm93cyBvbmNlIGl0J3MgYmVlbiBwb3NpdGlvbmVkLCBpdFxuICAvLyBtYXkgaGFwcGVuIHRoYXQgdGhlIHBvcHBlciBnZXRzIG1pc3BsYWNlZCBiZWNhdXNlIG9mIHRoZSBuZXcgY29udGVudFxuICAvLyBvdmVyZmxvd2luZyBpdHMgcmVmZXJlbmNlIGVsZW1lbnRcbiAgLy8gVG8gYXZvaWQgdGhpcyBwcm9ibGVtLCB3ZSBwcm92aWRlIHR3byBvcHRpb25zICh4IGFuZCB5KSwgd2hpY2ggYWxsb3dcbiAgLy8gdGhlIGNvbnN1bWVyIHRvIGRlZmluZSB0aGUgb2Zmc2V0IG9yaWdpbi5cbiAgLy8gSWYgd2UgcG9zaXRpb24gYSBwb3BwZXIgb24gdG9wIG9mIGEgcmVmZXJlbmNlIGVsZW1lbnQsIHdlIGNhbiBzZXRcbiAgLy8gYHhgIHRvIGB0b3BgIHRvIG1ha2UgdGhlIHBvcHBlciBncm93IHRvd2FyZHMgaXRzIHRvcCBpbnN0ZWFkIG9mXG4gIC8vIGl0cyBib3R0b20uXG4gIHZhciBsZWZ0ID0gdm9pZCAwLFxuICAgICAgdG9wID0gdm9pZCAwO1xuICBpZiAoc2lkZUEgPT09ICdib3R0b20nKSB7XG4gICAgLy8gd2hlbiBvZmZzZXRQYXJlbnQgaXMgPGh0bWw+IHRoZSBwb3NpdGlvbmluZyBpcyByZWxhdGl2ZSB0byB0aGUgYm90dG9tIG9mIHRoZSBzY3JlZW4gKGV4Y2x1ZGluZyB0aGUgc2Nyb2xsYmFyKVxuICAgIC8vIGFuZCBub3QgdGhlIGJvdHRvbSBvZiB0aGUgaHRtbCBlbGVtZW50XG4gICAgaWYgKG9mZnNldFBhcmVudC5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICB0b3AgPSAtb2Zmc2V0UGFyZW50LmNsaWVudEhlaWdodCArIG9mZnNldHMuYm90dG9tO1xuICAgIH0gZWxzZSB7XG4gICAgICB0b3AgPSAtb2Zmc2V0UGFyZW50UmVjdC5oZWlnaHQgKyBvZmZzZXRzLmJvdHRvbTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdG9wID0gb2Zmc2V0cy50b3A7XG4gIH1cbiAgaWYgKHNpZGVCID09PSAncmlnaHQnKSB7XG4gICAgaWYgKG9mZnNldFBhcmVudC5ub2RlTmFtZSA9PT0gJ0hUTUwnKSB7XG4gICAgICBsZWZ0ID0gLW9mZnNldFBhcmVudC5jbGllbnRXaWR0aCArIG9mZnNldHMucmlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlZnQgPSAtb2Zmc2V0UGFyZW50UmVjdC53aWR0aCArIG9mZnNldHMucmlnaHQ7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGxlZnQgPSBvZmZzZXRzLmxlZnQ7XG4gIH1cbiAgaWYgKGdwdUFjY2VsZXJhdGlvbiAmJiBwcmVmaXhlZFByb3BlcnR5KSB7XG4gICAgc3R5bGVzW3ByZWZpeGVkUHJvcGVydHldID0gJ3RyYW5zbGF0ZTNkKCcgKyBsZWZ0ICsgJ3B4LCAnICsgdG9wICsgJ3B4LCAwKSc7XG4gICAgc3R5bGVzW3NpZGVBXSA9IDA7XG4gICAgc3R5bGVzW3NpZGVCXSA9IDA7XG4gICAgc3R5bGVzLndpbGxDaGFuZ2UgPSAndHJhbnNmb3JtJztcbiAgfSBlbHNlIHtcbiAgICAvLyBvdGh3ZXJpc2UsIHdlIHVzZSB0aGUgc3RhbmRhcmQgYHRvcGAsIGBsZWZ0YCwgYGJvdHRvbWAgYW5kIGByaWdodGAgcHJvcGVydGllc1xuICAgIHZhciBpbnZlcnRUb3AgPSBzaWRlQSA9PT0gJ2JvdHRvbScgPyAtMSA6IDE7XG4gICAgdmFyIGludmVydExlZnQgPSBzaWRlQiA9PT0gJ3JpZ2h0JyA/IC0xIDogMTtcbiAgICBzdHlsZXNbc2lkZUFdID0gdG9wICogaW52ZXJ0VG9wO1xuICAgIHN0eWxlc1tzaWRlQl0gPSBsZWZ0ICogaW52ZXJ0TGVmdDtcbiAgICBzdHlsZXMud2lsbENoYW5nZSA9IHNpZGVBICsgJywgJyArIHNpZGVCO1xuICB9XG5cbiAgLy8gQXR0cmlidXRlc1xuICB2YXIgYXR0cmlidXRlcyA9IHtcbiAgICAneC1wbGFjZW1lbnQnOiBkYXRhLnBsYWNlbWVudFxuICB9O1xuXG4gIC8vIFVwZGF0ZSBgZGF0YWAgYXR0cmlidXRlcywgc3R5bGVzIGFuZCBhcnJvd1N0eWxlc1xuICBkYXRhLmF0dHJpYnV0ZXMgPSBfZXh0ZW5kcyh7fSwgYXR0cmlidXRlcywgZGF0YS5hdHRyaWJ1dGVzKTtcbiAgZGF0YS5zdHlsZXMgPSBfZXh0ZW5kcyh7fSwgc3R5bGVzLCBkYXRhLnN0eWxlcyk7XG4gIGRhdGEuYXJyb3dTdHlsZXMgPSBfZXh0ZW5kcyh7fSwgZGF0YS5vZmZzZXRzLmFycm93LCBkYXRhLmFycm93U3R5bGVzKTtcblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBIZWxwZXIgdXNlZCB0byBrbm93IGlmIHRoZSBnaXZlbiBtb2RpZmllciBkZXBlbmRzIGZyb20gYW5vdGhlciBvbmUuPGJyIC8+XG4gKiBJdCBjaGVja3MgaWYgdGhlIG5lZWRlZCBtb2RpZmllciBpcyBsaXN0ZWQgYW5kIGVuYWJsZWQuXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAcGFyYW0ge0FycmF5fSBtb2RpZmllcnMgLSBsaXN0IG9mIG1vZGlmaWVyc1xuICogQHBhcmFtIHtTdHJpbmd9IHJlcXVlc3RpbmdOYW1lIC0gbmFtZSBvZiByZXF1ZXN0aW5nIG1vZGlmaWVyXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVxdWVzdGVkTmFtZSAtIG5hbWUgb2YgcmVxdWVzdGVkIG1vZGlmaWVyXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNNb2RpZmllclJlcXVpcmVkKG1vZGlmaWVycywgcmVxdWVzdGluZ05hbWUsIHJlcXVlc3RlZE5hbWUpIHtcbiAgdmFyIHJlcXVlc3RpbmcgPSBmaW5kKG1vZGlmaWVycywgZnVuY3Rpb24gKF9yZWYpIHtcbiAgICB2YXIgbmFtZSA9IF9yZWYubmFtZTtcbiAgICByZXR1cm4gbmFtZSA9PT0gcmVxdWVzdGluZ05hbWU7XG4gIH0pO1xuXG4gIHZhciBpc1JlcXVpcmVkID0gISFyZXF1ZXN0aW5nICYmIG1vZGlmaWVycy5zb21lKGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgIHJldHVybiBtb2RpZmllci5uYW1lID09PSByZXF1ZXN0ZWROYW1lICYmIG1vZGlmaWVyLmVuYWJsZWQgJiYgbW9kaWZpZXIub3JkZXIgPCByZXF1ZXN0aW5nLm9yZGVyO1xuICB9KTtcblxuICBpZiAoIWlzUmVxdWlyZWQpIHtcbiAgICB2YXIgX3JlcXVlc3RpbmcgPSAnYCcgKyByZXF1ZXN0aW5nTmFtZSArICdgJztcbiAgICB2YXIgcmVxdWVzdGVkID0gJ2AnICsgcmVxdWVzdGVkTmFtZSArICdgJztcbiAgICBjb25zb2xlLndhcm4ocmVxdWVzdGVkICsgJyBtb2RpZmllciBpcyByZXF1aXJlZCBieSAnICsgX3JlcXVlc3RpbmcgKyAnIG1vZGlmaWVyIGluIG9yZGVyIHRvIHdvcmssIGJlIHN1cmUgdG8gaW5jbHVkZSBpdCBiZWZvcmUgJyArIF9yZXF1ZXN0aW5nICsgJyEnKTtcbiAgfVxuICByZXR1cm4gaXNSZXF1aXJlZDtcbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSB1cGRhdGUgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIGFycm93KGRhdGEsIG9wdGlvbnMpIHtcbiAgdmFyIF9kYXRhJG9mZnNldHMkYXJyb3c7XG5cbiAgLy8gYXJyb3cgZGVwZW5kcyBvbiBrZWVwVG9nZXRoZXIgaW4gb3JkZXIgdG8gd29ya1xuICBpZiAoIWlzTW9kaWZpZXJSZXF1aXJlZChkYXRhLmluc3RhbmNlLm1vZGlmaWVycywgJ2Fycm93JywgJ2tlZXBUb2dldGhlcicpKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICB2YXIgYXJyb3dFbGVtZW50ID0gb3B0aW9ucy5lbGVtZW50O1xuXG4gIC8vIGlmIGFycm93RWxlbWVudCBpcyBhIHN0cmluZywgc3VwcG9zZSBpdCdzIGEgQ1NTIHNlbGVjdG9yXG4gIGlmICh0eXBlb2YgYXJyb3dFbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgIGFycm93RWxlbWVudCA9IGRhdGEuaW5zdGFuY2UucG9wcGVyLnF1ZXJ5U2VsZWN0b3IoYXJyb3dFbGVtZW50KTtcblxuICAgIC8vIGlmIGFycm93RWxlbWVudCBpcyBub3QgZm91bmQsIGRvbid0IHJ1biB0aGUgbW9kaWZpZXJcbiAgICBpZiAoIWFycm93RWxlbWVudCkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGlmIHRoZSBhcnJvd0VsZW1lbnQgaXNuJ3QgYSBxdWVyeSBzZWxlY3RvciB3ZSBtdXN0IGNoZWNrIHRoYXQgdGhlXG4gICAgLy8gcHJvdmlkZWQgRE9NIG5vZGUgaXMgY2hpbGQgb2YgaXRzIHBvcHBlciBub2RlXG4gICAgaWYgKCFkYXRhLmluc3RhbmNlLnBvcHBlci5jb250YWlucyhhcnJvd0VsZW1lbnQpKSB7XG4gICAgICBjb25zb2xlLndhcm4oJ1dBUk5JTkc6IGBhcnJvdy5lbGVtZW50YCBtdXN0IGJlIGNoaWxkIG9mIGl0cyBwb3BwZXIgZWxlbWVudCEnKTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cbiAgfVxuXG4gIHZhciBwbGFjZW1lbnQgPSBkYXRhLnBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xuICB2YXIgX2RhdGEkb2Zmc2V0cyA9IGRhdGEub2Zmc2V0cyxcbiAgICAgIHBvcHBlciA9IF9kYXRhJG9mZnNldHMucG9wcGVyLFxuICAgICAgcmVmZXJlbmNlID0gX2RhdGEkb2Zmc2V0cy5yZWZlcmVuY2U7XG5cbiAgdmFyIGlzVmVydGljYWwgPSBbJ2xlZnQnLCAncmlnaHQnXS5pbmRleE9mKHBsYWNlbWVudCkgIT09IC0xO1xuXG4gIHZhciBsZW4gPSBpc1ZlcnRpY2FsID8gJ2hlaWdodCcgOiAnd2lkdGgnO1xuICB2YXIgc2lkZUNhcGl0YWxpemVkID0gaXNWZXJ0aWNhbCA/ICdUb3AnIDogJ0xlZnQnO1xuICB2YXIgc2lkZSA9IHNpZGVDYXBpdGFsaXplZC50b0xvd2VyQ2FzZSgpO1xuICB2YXIgYWx0U2lkZSA9IGlzVmVydGljYWwgPyAnbGVmdCcgOiAndG9wJztcbiAgdmFyIG9wU2lkZSA9IGlzVmVydGljYWwgPyAnYm90dG9tJyA6ICdyaWdodCc7XG4gIHZhciBhcnJvd0VsZW1lbnRTaXplID0gZ2V0T3V0ZXJTaXplcyhhcnJvd0VsZW1lbnQpW2xlbl07XG5cbiAgLy9cbiAgLy8gZXh0ZW5kcyBrZWVwVG9nZXRoZXIgYmVoYXZpb3IgbWFraW5nIHN1cmUgdGhlIHBvcHBlciBhbmQgaXRzXG4gIC8vIHJlZmVyZW5jZSBoYXZlIGVub3VnaCBwaXhlbHMgaW4gY29uanVuY3Rpb25cbiAgLy9cblxuICAvLyB0b3AvbGVmdCBzaWRlXG4gIGlmIChyZWZlcmVuY2Vbb3BTaWRlXSAtIGFycm93RWxlbWVudFNpemUgPCBwb3BwZXJbc2lkZV0pIHtcbiAgICBkYXRhLm9mZnNldHMucG9wcGVyW3NpZGVdIC09IHBvcHBlcltzaWRlXSAtIChyZWZlcmVuY2Vbb3BTaWRlXSAtIGFycm93RWxlbWVudFNpemUpO1xuICB9XG4gIC8vIGJvdHRvbS9yaWdodCBzaWRlXG4gIGlmIChyZWZlcmVuY2Vbc2lkZV0gKyBhcnJvd0VsZW1lbnRTaXplID4gcG9wcGVyW29wU2lkZV0pIHtcbiAgICBkYXRhLm9mZnNldHMucG9wcGVyW3NpZGVdICs9IHJlZmVyZW5jZVtzaWRlXSArIGFycm93RWxlbWVudFNpemUgLSBwb3BwZXJbb3BTaWRlXTtcbiAgfVxuICBkYXRhLm9mZnNldHMucG9wcGVyID0gZ2V0Q2xpZW50UmVjdChkYXRhLm9mZnNldHMucG9wcGVyKTtcblxuICAvLyBjb21wdXRlIGNlbnRlciBvZiB0aGUgcG9wcGVyXG4gIHZhciBjZW50ZXIgPSByZWZlcmVuY2Vbc2lkZV0gKyByZWZlcmVuY2VbbGVuXSAvIDIgLSBhcnJvd0VsZW1lbnRTaXplIC8gMjtcblxuICAvLyBDb21wdXRlIHRoZSBzaWRlVmFsdWUgdXNpbmcgdGhlIHVwZGF0ZWQgcG9wcGVyIG9mZnNldHNcbiAgLy8gdGFrZSBwb3BwZXIgbWFyZ2luIGluIGFjY291bnQgYmVjYXVzZSB3ZSBkb24ndCBoYXZlIHRoaXMgaW5mbyBhdmFpbGFibGVcbiAgdmFyIGNzcyA9IGdldFN0eWxlQ29tcHV0ZWRQcm9wZXJ0eShkYXRhLmluc3RhbmNlLnBvcHBlcik7XG4gIHZhciBwb3BwZXJNYXJnaW5TaWRlID0gcGFyc2VGbG9hdChjc3NbJ21hcmdpbicgKyBzaWRlQ2FwaXRhbGl6ZWRdLCAxMCk7XG4gIHZhciBwb3BwZXJCb3JkZXJTaWRlID0gcGFyc2VGbG9hdChjc3NbJ2JvcmRlcicgKyBzaWRlQ2FwaXRhbGl6ZWQgKyAnV2lkdGgnXSwgMTApO1xuICB2YXIgc2lkZVZhbHVlID0gY2VudGVyIC0gZGF0YS5vZmZzZXRzLnBvcHBlcltzaWRlXSAtIHBvcHBlck1hcmdpblNpZGUgLSBwb3BwZXJCb3JkZXJTaWRlO1xuXG4gIC8vIHByZXZlbnQgYXJyb3dFbGVtZW50IGZyb20gYmVpbmcgcGxhY2VkIG5vdCBjb250aWd1b3VzbHkgdG8gaXRzIHBvcHBlclxuICBzaWRlVmFsdWUgPSBNYXRoLm1heChNYXRoLm1pbihwb3BwZXJbbGVuXSAtIGFycm93RWxlbWVudFNpemUsIHNpZGVWYWx1ZSksIDApO1xuXG4gIGRhdGEuYXJyb3dFbGVtZW50ID0gYXJyb3dFbGVtZW50O1xuICBkYXRhLm9mZnNldHMuYXJyb3cgPSAoX2RhdGEkb2Zmc2V0cyRhcnJvdyA9IHt9LCBkZWZpbmVQcm9wZXJ0eShfZGF0YSRvZmZzZXRzJGFycm93LCBzaWRlLCBNYXRoLnJvdW5kKHNpZGVWYWx1ZSkpLCBkZWZpbmVQcm9wZXJ0eShfZGF0YSRvZmZzZXRzJGFycm93LCBhbHRTaWRlLCAnJyksIF9kYXRhJG9mZnNldHMkYXJyb3cpO1xuXG4gIHJldHVybiBkYXRhO1xufVxuXG4vKipcbiAqIEdldCB0aGUgb3Bwb3NpdGUgcGxhY2VtZW50IHZhcmlhdGlvbiBvZiB0aGUgZ2l2ZW4gb25lXG4gKiBAbWV0aG9kXG4gKiBAbWVtYmVyb2YgUG9wcGVyLlV0aWxzXG4gKiBAYXJndW1lbnQge1N0cmluZ30gcGxhY2VtZW50IHZhcmlhdGlvblxuICogQHJldHVybnMge1N0cmluZ30gZmxpcHBlZCBwbGFjZW1lbnQgdmFyaWF0aW9uXG4gKi9cbmZ1bmN0aW9uIGdldE9wcG9zaXRlVmFyaWF0aW9uKHZhcmlhdGlvbikge1xuICBpZiAodmFyaWF0aW9uID09PSAnZW5kJykge1xuICAgIHJldHVybiAnc3RhcnQnO1xuICB9IGVsc2UgaWYgKHZhcmlhdGlvbiA9PT0gJ3N0YXJ0Jykge1xuICAgIHJldHVybiAnZW5kJztcbiAgfVxuICByZXR1cm4gdmFyaWF0aW9uO1xufVxuXG4vKipcbiAqIExpc3Qgb2YgYWNjZXB0ZWQgcGxhY2VtZW50cyB0byB1c2UgYXMgdmFsdWVzIG9mIHRoZSBgcGxhY2VtZW50YCBvcHRpb24uPGJyIC8+XG4gKiBWYWxpZCBwbGFjZW1lbnRzIGFyZTpcbiAqIC0gYGF1dG9gXG4gKiAtIGB0b3BgXG4gKiAtIGByaWdodGBcbiAqIC0gYGJvdHRvbWBcbiAqIC0gYGxlZnRgXG4gKlxuICogRWFjaCBwbGFjZW1lbnQgY2FuIGhhdmUgYSB2YXJpYXRpb24gZnJvbSB0aGlzIGxpc3Q6XG4gKiAtIGAtc3RhcnRgXG4gKiAtIGAtZW5kYFxuICpcbiAqIFZhcmlhdGlvbnMgYXJlIGludGVycHJldGVkIGVhc2lseSBpZiB5b3UgdGhpbmsgb2YgdGhlbSBhcyB0aGUgbGVmdCB0byByaWdodFxuICogd3JpdHRlbiBsYW5ndWFnZXMuIEhvcml6b250YWxseSAoYHRvcGAgYW5kIGBib3R0b21gKSwgYHN0YXJ0YCBpcyBsZWZ0IGFuZCBgZW5kYFxuICogaXMgcmlnaHQuPGJyIC8+XG4gKiBWZXJ0aWNhbGx5IChgbGVmdGAgYW5kIGByaWdodGApLCBgc3RhcnRgIGlzIHRvcCBhbmQgYGVuZGAgaXMgYm90dG9tLlxuICpcbiAqIFNvbWUgdmFsaWQgZXhhbXBsZXMgYXJlOlxuICogLSBgdG9wLWVuZGAgKG9uIHRvcCBvZiByZWZlcmVuY2UsIHJpZ2h0IGFsaWduZWQpXG4gKiAtIGByaWdodC1zdGFydGAgKG9uIHJpZ2h0IG9mIHJlZmVyZW5jZSwgdG9wIGFsaWduZWQpXG4gKiAtIGBib3R0b21gIChvbiBib3R0b20sIGNlbnRlcmVkKVxuICogLSBgYXV0by1lbmRgIChvbiB0aGUgc2lkZSB3aXRoIG1vcmUgc3BhY2UgYXZhaWxhYmxlLCBhbGlnbm1lbnQgZGVwZW5kcyBieSBwbGFjZW1lbnQpXG4gKlxuICogQHN0YXRpY1xuICogQHR5cGUge0FycmF5fVxuICogQGVudW0ge1N0cmluZ31cbiAqIEByZWFkb25seVxuICogQG1ldGhvZCBwbGFjZW1lbnRzXG4gKiBAbWVtYmVyb2YgUG9wcGVyXG4gKi9cbnZhciBwbGFjZW1lbnRzID0gWydhdXRvLXN0YXJ0JywgJ2F1dG8nLCAnYXV0by1lbmQnLCAndG9wLXN0YXJ0JywgJ3RvcCcsICd0b3AtZW5kJywgJ3JpZ2h0LXN0YXJ0JywgJ3JpZ2h0JywgJ3JpZ2h0LWVuZCcsICdib3R0b20tZW5kJywgJ2JvdHRvbScsICdib3R0b20tc3RhcnQnLCAnbGVmdC1lbmQnLCAnbGVmdCcsICdsZWZ0LXN0YXJ0J107XG5cbi8vIEdldCByaWQgb2YgYGF1dG9gIGBhdXRvLXN0YXJ0YCBhbmQgYGF1dG8tZW5kYFxudmFyIHZhbGlkUGxhY2VtZW50cyA9IHBsYWNlbWVudHMuc2xpY2UoMyk7XG5cbi8qKlxuICogR2l2ZW4gYW4gaW5pdGlhbCBwbGFjZW1lbnQsIHJldHVybnMgYWxsIHRoZSBzdWJzZXF1ZW50IHBsYWNlbWVudHNcbiAqIGNsb2Nrd2lzZSAob3IgY291bnRlci1jbG9ja3dpc2UpLlxuICpcbiAqIEBtZXRob2RcbiAqIEBtZW1iZXJvZiBQb3BwZXIuVXRpbHNcbiAqIEBhcmd1bWVudCB7U3RyaW5nfSBwbGFjZW1lbnQgLSBBIHZhbGlkIHBsYWNlbWVudCAoaXQgYWNjZXB0cyB2YXJpYXRpb25zKVxuICogQGFyZ3VtZW50IHtCb29sZWFufSBjb3VudGVyIC0gU2V0IHRvIHRydWUgdG8gd2FsayB0aGUgcGxhY2VtZW50cyBjb3VudGVyY2xvY2t3aXNlXG4gKiBAcmV0dXJucyB7QXJyYXl9IHBsYWNlbWVudHMgaW5jbHVkaW5nIHRoZWlyIHZhcmlhdGlvbnNcbiAqL1xuZnVuY3Rpb24gY2xvY2t3aXNlKHBsYWNlbWVudCkge1xuICB2YXIgY291bnRlciA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogZmFsc2U7XG5cbiAgdmFyIGluZGV4ID0gdmFsaWRQbGFjZW1lbnRzLmluZGV4T2YocGxhY2VtZW50KTtcbiAgdmFyIGFyciA9IHZhbGlkUGxhY2VtZW50cy5zbGljZShpbmRleCArIDEpLmNvbmNhdCh2YWxpZFBsYWNlbWVudHMuc2xpY2UoMCwgaW5kZXgpKTtcbiAgcmV0dXJuIGNvdW50ZXIgPyBhcnIucmV2ZXJzZSgpIDogYXJyO1xufVxuXG52YXIgQkVIQVZJT1JTID0ge1xuICBGTElQOiAnZmxpcCcsXG4gIENMT0NLV0lTRTogJ2Nsb2Nrd2lzZScsXG4gIENPVU5URVJDTE9DS1dJU0U6ICdjb3VudGVyY2xvY2t3aXNlJ1xufTtcblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSB1cGRhdGUgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIGZsaXAoZGF0YSwgb3B0aW9ucykge1xuICAvLyBpZiBgaW5uZXJgIG1vZGlmaWVyIGlzIGVuYWJsZWQsIHdlIGNhbid0IHVzZSB0aGUgYGZsaXBgIG1vZGlmaWVyXG4gIGlmIChpc01vZGlmaWVyRW5hYmxlZChkYXRhLmluc3RhbmNlLm1vZGlmaWVycywgJ2lubmVyJykpIHtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGlmIChkYXRhLmZsaXBwZWQgJiYgZGF0YS5wbGFjZW1lbnQgPT09IGRhdGEub3JpZ2luYWxQbGFjZW1lbnQpIHtcbiAgICAvLyBzZWVtcyBsaWtlIGZsaXAgaXMgdHJ5aW5nIHRvIGxvb3AsIHByb2JhYmx5IHRoZXJlJ3Mgbm90IGVub3VnaCBzcGFjZSBvbiBhbnkgb2YgdGhlIGZsaXBwYWJsZSBzaWRlc1xuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgdmFyIGJvdW5kYXJpZXMgPSBnZXRCb3VuZGFyaWVzKGRhdGEuaW5zdGFuY2UucG9wcGVyLCBkYXRhLmluc3RhbmNlLnJlZmVyZW5jZSwgb3B0aW9ucy5wYWRkaW5nLCBvcHRpb25zLmJvdW5kYXJpZXNFbGVtZW50LCBkYXRhLnBvc2l0aW9uRml4ZWQpO1xuXG4gIHZhciBwbGFjZW1lbnQgPSBkYXRhLnBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xuICB2YXIgcGxhY2VtZW50T3Bwb3NpdGUgPSBnZXRPcHBvc2l0ZVBsYWNlbWVudChwbGFjZW1lbnQpO1xuICB2YXIgdmFyaWF0aW9uID0gZGF0YS5wbGFjZW1lbnQuc3BsaXQoJy0nKVsxXSB8fCAnJztcblxuICB2YXIgZmxpcE9yZGVyID0gW107XG5cbiAgc3dpdGNoIChvcHRpb25zLmJlaGF2aW9yKSB7XG4gICAgY2FzZSBCRUhBVklPUlMuRkxJUDpcbiAgICAgIGZsaXBPcmRlciA9IFtwbGFjZW1lbnQsIHBsYWNlbWVudE9wcG9zaXRlXTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQkVIQVZJT1JTLkNMT0NLV0lTRTpcbiAgICAgIGZsaXBPcmRlciA9IGNsb2Nrd2lzZShwbGFjZW1lbnQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBCRUhBVklPUlMuQ09VTlRFUkNMT0NLV0lTRTpcbiAgICAgIGZsaXBPcmRlciA9IGNsb2Nrd2lzZShwbGFjZW1lbnQsIHRydWUpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIGZsaXBPcmRlciA9IG9wdGlvbnMuYmVoYXZpb3I7XG4gIH1cblxuICBmbGlwT3JkZXIuZm9yRWFjaChmdW5jdGlvbiAoc3RlcCwgaW5kZXgpIHtcbiAgICBpZiAocGxhY2VtZW50ICE9PSBzdGVwIHx8IGZsaXBPcmRlci5sZW5ndGggPT09IGluZGV4ICsgMSkge1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgcGxhY2VtZW50ID0gZGF0YS5wbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcbiAgICBwbGFjZW1lbnRPcHBvc2l0ZSA9IGdldE9wcG9zaXRlUGxhY2VtZW50KHBsYWNlbWVudCk7XG5cbiAgICB2YXIgcG9wcGVyT2Zmc2V0cyA9IGRhdGEub2Zmc2V0cy5wb3BwZXI7XG4gICAgdmFyIHJlZk9mZnNldHMgPSBkYXRhLm9mZnNldHMucmVmZXJlbmNlO1xuXG4gICAgLy8gdXNpbmcgZmxvb3IgYmVjYXVzZSB0aGUgcmVmZXJlbmNlIG9mZnNldHMgbWF5IGNvbnRhaW4gZGVjaW1hbHMgd2UgYXJlIG5vdCBnb2luZyB0byBjb25zaWRlciBoZXJlXG4gICAgdmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbiAgICB2YXIgb3ZlcmxhcHNSZWYgPSBwbGFjZW1lbnQgPT09ICdsZWZ0JyAmJiBmbG9vcihwb3BwZXJPZmZzZXRzLnJpZ2h0KSA+IGZsb29yKHJlZk9mZnNldHMubGVmdCkgfHwgcGxhY2VtZW50ID09PSAncmlnaHQnICYmIGZsb29yKHBvcHBlck9mZnNldHMubGVmdCkgPCBmbG9vcihyZWZPZmZzZXRzLnJpZ2h0KSB8fCBwbGFjZW1lbnQgPT09ICd0b3AnICYmIGZsb29yKHBvcHBlck9mZnNldHMuYm90dG9tKSA+IGZsb29yKHJlZk9mZnNldHMudG9wKSB8fCBwbGFjZW1lbnQgPT09ICdib3R0b20nICYmIGZsb29yKHBvcHBlck9mZnNldHMudG9wKSA8IGZsb29yKHJlZk9mZnNldHMuYm90dG9tKTtcblxuICAgIHZhciBvdmVyZmxvd3NMZWZ0ID0gZmxvb3IocG9wcGVyT2Zmc2V0cy5sZWZ0KSA8IGZsb29yKGJvdW5kYXJpZXMubGVmdCk7XG4gICAgdmFyIG92ZXJmbG93c1JpZ2h0ID0gZmxvb3IocG9wcGVyT2Zmc2V0cy5yaWdodCkgPiBmbG9vcihib3VuZGFyaWVzLnJpZ2h0KTtcbiAgICB2YXIgb3ZlcmZsb3dzVG9wID0gZmxvb3IocG9wcGVyT2Zmc2V0cy50b3ApIDwgZmxvb3IoYm91bmRhcmllcy50b3ApO1xuICAgIHZhciBvdmVyZmxvd3NCb3R0b20gPSBmbG9vcihwb3BwZXJPZmZzZXRzLmJvdHRvbSkgPiBmbG9vcihib3VuZGFyaWVzLmJvdHRvbSk7XG5cbiAgICB2YXIgb3ZlcmZsb3dzQm91bmRhcmllcyA9IHBsYWNlbWVudCA9PT0gJ2xlZnQnICYmIG92ZXJmbG93c0xlZnQgfHwgcGxhY2VtZW50ID09PSAncmlnaHQnICYmIG92ZXJmbG93c1JpZ2h0IHx8IHBsYWNlbWVudCA9PT0gJ3RvcCcgJiYgb3ZlcmZsb3dzVG9wIHx8IHBsYWNlbWVudCA9PT0gJ2JvdHRvbScgJiYgb3ZlcmZsb3dzQm90dG9tO1xuXG4gICAgLy8gZmxpcCB0aGUgdmFyaWF0aW9uIGlmIHJlcXVpcmVkXG4gICAgdmFyIGlzVmVydGljYWwgPSBbJ3RvcCcsICdib3R0b20nXS5pbmRleE9mKHBsYWNlbWVudCkgIT09IC0xO1xuICAgIHZhciBmbGlwcGVkVmFyaWF0aW9uID0gISFvcHRpb25zLmZsaXBWYXJpYXRpb25zICYmIChpc1ZlcnRpY2FsICYmIHZhcmlhdGlvbiA9PT0gJ3N0YXJ0JyAmJiBvdmVyZmxvd3NMZWZ0IHx8IGlzVmVydGljYWwgJiYgdmFyaWF0aW9uID09PSAnZW5kJyAmJiBvdmVyZmxvd3NSaWdodCB8fCAhaXNWZXJ0aWNhbCAmJiB2YXJpYXRpb24gPT09ICdzdGFydCcgJiYgb3ZlcmZsb3dzVG9wIHx8ICFpc1ZlcnRpY2FsICYmIHZhcmlhdGlvbiA9PT0gJ2VuZCcgJiYgb3ZlcmZsb3dzQm90dG9tKTtcblxuICAgIGlmIChvdmVybGFwc1JlZiB8fCBvdmVyZmxvd3NCb3VuZGFyaWVzIHx8IGZsaXBwZWRWYXJpYXRpb24pIHtcbiAgICAgIC8vIHRoaXMgYm9vbGVhbiB0byBkZXRlY3QgYW55IGZsaXAgbG9vcFxuICAgICAgZGF0YS5mbGlwcGVkID0gdHJ1ZTtcblxuICAgICAgaWYgKG92ZXJsYXBzUmVmIHx8IG92ZXJmbG93c0JvdW5kYXJpZXMpIHtcbiAgICAgICAgcGxhY2VtZW50ID0gZmxpcE9yZGVyW2luZGV4ICsgMV07XG4gICAgICB9XG5cbiAgICAgIGlmIChmbGlwcGVkVmFyaWF0aW9uKSB7XG4gICAgICAgIHZhcmlhdGlvbiA9IGdldE9wcG9zaXRlVmFyaWF0aW9uKHZhcmlhdGlvbik7XG4gICAgICB9XG5cbiAgICAgIGRhdGEucGxhY2VtZW50ID0gcGxhY2VtZW50ICsgKHZhcmlhdGlvbiA/ICctJyArIHZhcmlhdGlvbiA6ICcnKTtcblxuICAgICAgLy8gdGhpcyBvYmplY3QgY29udGFpbnMgYHBvc2l0aW9uYCwgd2Ugd2FudCB0byBwcmVzZXJ2ZSBpdCBhbG9uZyB3aXRoXG4gICAgICAvLyBhbnkgYWRkaXRpb25hbCBwcm9wZXJ0eSB3ZSBtYXkgYWRkIGluIHRoZSBmdXR1cmVcbiAgICAgIGRhdGEub2Zmc2V0cy5wb3BwZXIgPSBfZXh0ZW5kcyh7fSwgZGF0YS5vZmZzZXRzLnBvcHBlciwgZ2V0UG9wcGVyT2Zmc2V0cyhkYXRhLmluc3RhbmNlLnBvcHBlciwgZGF0YS5vZmZzZXRzLnJlZmVyZW5jZSwgZGF0YS5wbGFjZW1lbnQpKTtcblxuICAgICAgZGF0YSA9IHJ1bk1vZGlmaWVycyhkYXRhLmluc3RhbmNlLm1vZGlmaWVycywgZGF0YSwgJ2ZsaXAnKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSB1cGRhdGUgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIGtlZXBUb2dldGhlcihkYXRhKSB7XG4gIHZhciBfZGF0YSRvZmZzZXRzID0gZGF0YS5vZmZzZXRzLFxuICAgICAgcG9wcGVyID0gX2RhdGEkb2Zmc2V0cy5wb3BwZXIsXG4gICAgICByZWZlcmVuY2UgPSBfZGF0YSRvZmZzZXRzLnJlZmVyZW5jZTtcblxuICB2YXIgcGxhY2VtZW50ID0gZGF0YS5wbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcbiAgdmFyIGZsb29yID0gTWF0aC5mbG9vcjtcbiAgdmFyIGlzVmVydGljYWwgPSBbJ3RvcCcsICdib3R0b20nXS5pbmRleE9mKHBsYWNlbWVudCkgIT09IC0xO1xuICB2YXIgc2lkZSA9IGlzVmVydGljYWwgPyAncmlnaHQnIDogJ2JvdHRvbSc7XG4gIHZhciBvcFNpZGUgPSBpc1ZlcnRpY2FsID8gJ2xlZnQnIDogJ3RvcCc7XG4gIHZhciBtZWFzdXJlbWVudCA9IGlzVmVydGljYWwgPyAnd2lkdGgnIDogJ2hlaWdodCc7XG5cbiAgaWYgKHBvcHBlcltzaWRlXSA8IGZsb29yKHJlZmVyZW5jZVtvcFNpZGVdKSkge1xuICAgIGRhdGEub2Zmc2V0cy5wb3BwZXJbb3BTaWRlXSA9IGZsb29yKHJlZmVyZW5jZVtvcFNpZGVdKSAtIHBvcHBlclttZWFzdXJlbWVudF07XG4gIH1cbiAgaWYgKHBvcHBlcltvcFNpZGVdID4gZmxvb3IocmVmZXJlbmNlW3NpZGVdKSkge1xuICAgIGRhdGEub2Zmc2V0cy5wb3BwZXJbb3BTaWRlXSA9IGZsb29yKHJlZmVyZW5jZVtzaWRlXSk7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhIHN0cmluZyBjb250YWluaW5nIHZhbHVlICsgdW5pdCBpbnRvIGEgcHggdmFsdWUgbnVtYmVyXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiB7bW9kaWZpZXJzfm9mZnNldH1cbiAqIEBwcml2YXRlXG4gKiBAYXJndW1lbnQge1N0cmluZ30gc3RyIC0gVmFsdWUgKyB1bml0IHN0cmluZ1xuICogQGFyZ3VtZW50IHtTdHJpbmd9IG1lYXN1cmVtZW50IC0gYGhlaWdodGAgb3IgYHdpZHRoYFxuICogQGFyZ3VtZW50IHtPYmplY3R9IHBvcHBlck9mZnNldHNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSByZWZlcmVuY2VPZmZzZXRzXG4gKiBAcmV0dXJucyB7TnVtYmVyfFN0cmluZ31cbiAqIFZhbHVlIGluIHBpeGVscywgb3Igb3JpZ2luYWwgc3RyaW5nIGlmIG5vIHZhbHVlcyB3ZXJlIGV4dHJhY3RlZFxuICovXG5mdW5jdGlvbiB0b1ZhbHVlKHN0ciwgbWVhc3VyZW1lbnQsIHBvcHBlck9mZnNldHMsIHJlZmVyZW5jZU9mZnNldHMpIHtcbiAgLy8gc2VwYXJhdGUgdmFsdWUgZnJvbSB1bml0XG4gIHZhciBzcGxpdCA9IHN0ci5tYXRjaCgvKCg/OlxcLXxcXCspP1xcZCpcXC4/XFxkKikoLiopLyk7XG4gIHZhciB2YWx1ZSA9ICtzcGxpdFsxXTtcbiAgdmFyIHVuaXQgPSBzcGxpdFsyXTtcblxuICAvLyBJZiBpdCdzIG5vdCBhIG51bWJlciBpdCdzIGFuIG9wZXJhdG9yLCBJIGd1ZXNzXG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gc3RyO1xuICB9XG5cbiAgaWYgKHVuaXQuaW5kZXhPZignJScpID09PSAwKSB7XG4gICAgdmFyIGVsZW1lbnQgPSB2b2lkIDA7XG4gICAgc3dpdGNoICh1bml0KSB7XG4gICAgICBjYXNlICclcCc6XG4gICAgICAgIGVsZW1lbnQgPSBwb3BwZXJPZmZzZXRzO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJyUnOlxuICAgICAgY2FzZSAnJXInOlxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgZWxlbWVudCA9IHJlZmVyZW5jZU9mZnNldHM7XG4gICAgfVxuXG4gICAgdmFyIHJlY3QgPSBnZXRDbGllbnRSZWN0KGVsZW1lbnQpO1xuICAgIHJldHVybiByZWN0W21lYXN1cmVtZW50XSAvIDEwMCAqIHZhbHVlO1xuICB9IGVsc2UgaWYgKHVuaXQgPT09ICd2aCcgfHwgdW5pdCA9PT0gJ3Z3Jykge1xuICAgIC8vIGlmIGlzIGEgdmggb3IgdncsIHdlIGNhbGN1bGF0ZSB0aGUgc2l6ZSBiYXNlZCBvbiB0aGUgdmlld3BvcnRcbiAgICB2YXIgc2l6ZSA9IHZvaWQgMDtcbiAgICBpZiAodW5pdCA9PT0gJ3ZoJykge1xuICAgICAgc2l6ZSA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2l6ZSA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCk7XG4gICAgfVxuICAgIHJldHVybiBzaXplIC8gMTAwICogdmFsdWU7XG4gIH0gZWxzZSB7XG4gICAgLy8gaWYgaXMgYW4gZXhwbGljaXQgcGl4ZWwgdW5pdCwgd2UgZ2V0IHJpZCBvZiB0aGUgdW5pdCBhbmQga2VlcCB0aGUgdmFsdWVcbiAgICAvLyBpZiBpcyBhbiBpbXBsaWNpdCB1bml0LCBpdCdzIHB4LCBhbmQgd2UgcmV0dXJuIGp1c3QgdGhlIHZhbHVlXG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG59XG5cbi8qKlxuICogUGFyc2UgYW4gYG9mZnNldGAgc3RyaW5nIHRvIGV4dHJhcG9sYXRlIGB4YCBhbmQgYHlgIG51bWVyaWMgb2Zmc2V0cy5cbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIHttb2RpZmllcnN+b2Zmc2V0fVxuICogQHByaXZhdGVcbiAqIEBhcmd1bWVudCB7U3RyaW5nfSBvZmZzZXRcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBwb3BwZXJPZmZzZXRzXG4gKiBAYXJndW1lbnQge09iamVjdH0gcmVmZXJlbmNlT2Zmc2V0c1xuICogQGFyZ3VtZW50IHtTdHJpbmd9IGJhc2VQbGFjZW1lbnRcbiAqIEByZXR1cm5zIHtBcnJheX0gYSB0d28gY2VsbHMgYXJyYXkgd2l0aCB4IGFuZCB5IG9mZnNldHMgaW4gbnVtYmVyc1xuICovXG5mdW5jdGlvbiBwYXJzZU9mZnNldChvZmZzZXQsIHBvcHBlck9mZnNldHMsIHJlZmVyZW5jZU9mZnNldHMsIGJhc2VQbGFjZW1lbnQpIHtcbiAgdmFyIG9mZnNldHMgPSBbMCwgMF07XG5cbiAgLy8gVXNlIGhlaWdodCBpZiBwbGFjZW1lbnQgaXMgbGVmdCBvciByaWdodCBhbmQgaW5kZXggaXMgMCBvdGhlcndpc2UgdXNlIHdpZHRoXG4gIC8vIGluIHRoaXMgd2F5IHRoZSBmaXJzdCBvZmZzZXQgd2lsbCB1c2UgYW4gYXhpcyBhbmQgdGhlIHNlY29uZCBvbmVcbiAgLy8gd2lsbCB1c2UgdGhlIG90aGVyIG9uZVxuICB2YXIgdXNlSGVpZ2h0ID0gWydyaWdodCcsICdsZWZ0J10uaW5kZXhPZihiYXNlUGxhY2VtZW50KSAhPT0gLTE7XG5cbiAgLy8gU3BsaXQgdGhlIG9mZnNldCBzdHJpbmcgdG8gb2J0YWluIGEgbGlzdCBvZiB2YWx1ZXMgYW5kIG9wZXJhbmRzXG4gIC8vIFRoZSByZWdleCBhZGRyZXNzZXMgdmFsdWVzIHdpdGggdGhlIHBsdXMgb3IgbWludXMgc2lnbiBpbiBmcm9udCAoKzEwLCAtMjAsIGV0YylcbiAgdmFyIGZyYWdtZW50cyA9IG9mZnNldC5zcGxpdCgvKFxcK3xcXC0pLykubWFwKGZ1bmN0aW9uIChmcmFnKSB7XG4gICAgcmV0dXJuIGZyYWcudHJpbSgpO1xuICB9KTtcblxuICAvLyBEZXRlY3QgaWYgdGhlIG9mZnNldCBzdHJpbmcgY29udGFpbnMgYSBwYWlyIG9mIHZhbHVlcyBvciBhIHNpbmdsZSBvbmVcbiAgLy8gdGhleSBjb3VsZCBiZSBzZXBhcmF0ZWQgYnkgY29tbWEgb3Igc3BhY2VcbiAgdmFyIGRpdmlkZXIgPSBmcmFnbWVudHMuaW5kZXhPZihmaW5kKGZyYWdtZW50cywgZnVuY3Rpb24gKGZyYWcpIHtcbiAgICByZXR1cm4gZnJhZy5zZWFyY2goLyx8XFxzLykgIT09IC0xO1xuICB9KSk7XG5cbiAgaWYgKGZyYWdtZW50c1tkaXZpZGVyXSAmJiBmcmFnbWVudHNbZGl2aWRlcl0uaW5kZXhPZignLCcpID09PSAtMSkge1xuICAgIGNvbnNvbGUud2FybignT2Zmc2V0cyBzZXBhcmF0ZWQgYnkgd2hpdGUgc3BhY2UocykgYXJlIGRlcHJlY2F0ZWQsIHVzZSBhIGNvbW1hICgsKSBpbnN0ZWFkLicpO1xuICB9XG5cbiAgLy8gSWYgZGl2aWRlciBpcyBmb3VuZCwgd2UgZGl2aWRlIHRoZSBsaXN0IG9mIHZhbHVlcyBhbmQgb3BlcmFuZHMgdG8gZGl2aWRlXG4gIC8vIHRoZW0gYnkgb2ZzZXQgWCBhbmQgWS5cbiAgdmFyIHNwbGl0UmVnZXggPSAvXFxzKixcXHMqfFxccysvO1xuICB2YXIgb3BzID0gZGl2aWRlciAhPT0gLTEgPyBbZnJhZ21lbnRzLnNsaWNlKDAsIGRpdmlkZXIpLmNvbmNhdChbZnJhZ21lbnRzW2RpdmlkZXJdLnNwbGl0KHNwbGl0UmVnZXgpWzBdXSksIFtmcmFnbWVudHNbZGl2aWRlcl0uc3BsaXQoc3BsaXRSZWdleClbMV1dLmNvbmNhdChmcmFnbWVudHMuc2xpY2UoZGl2aWRlciArIDEpKV0gOiBbZnJhZ21lbnRzXTtcblxuICAvLyBDb252ZXJ0IHRoZSB2YWx1ZXMgd2l0aCB1bml0cyB0byBhYnNvbHV0ZSBwaXhlbHMgdG8gYWxsb3cgb3VyIGNvbXB1dGF0aW9uc1xuICBvcHMgPSBvcHMubWFwKGZ1bmN0aW9uIChvcCwgaW5kZXgpIHtcbiAgICAvLyBNb3N0IG9mIHRoZSB1bml0cyByZWx5IG9uIHRoZSBvcmllbnRhdGlvbiBvZiB0aGUgcG9wcGVyXG4gICAgdmFyIG1lYXN1cmVtZW50ID0gKGluZGV4ID09PSAxID8gIXVzZUhlaWdodCA6IHVzZUhlaWdodCkgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gICAgdmFyIG1lcmdlV2l0aFByZXZpb3VzID0gZmFsc2U7XG4gICAgcmV0dXJuIG9wXG4gICAgLy8gVGhpcyBhZ2dyZWdhdGVzIGFueSBgK2Agb3IgYC1gIHNpZ24gdGhhdCBhcmVuJ3QgY29uc2lkZXJlZCBvcGVyYXRvcnNcbiAgICAvLyBlLmcuOiAxMCArICs1ID0+IFsxMCwgKywgKzVdXG4gICAgLnJlZHVjZShmdW5jdGlvbiAoYSwgYikge1xuICAgICAgaWYgKGFbYS5sZW5ndGggLSAxXSA9PT0gJycgJiYgWycrJywgJy0nXS5pbmRleE9mKGIpICE9PSAtMSkge1xuICAgICAgICBhW2EubGVuZ3RoIC0gMV0gPSBiO1xuICAgICAgICBtZXJnZVdpdGhQcmV2aW91cyA9IHRydWU7XG4gICAgICAgIHJldHVybiBhO1xuICAgICAgfSBlbHNlIGlmIChtZXJnZVdpdGhQcmV2aW91cykge1xuICAgICAgICBhW2EubGVuZ3RoIC0gMV0gKz0gYjtcbiAgICAgICAgbWVyZ2VXaXRoUHJldmlvdXMgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gYS5jb25jYXQoYik7XG4gICAgICB9XG4gICAgfSwgW10pXG4gICAgLy8gSGVyZSB3ZSBjb252ZXJ0IHRoZSBzdHJpbmcgdmFsdWVzIGludG8gbnVtYmVyIHZhbHVlcyAoaW4gcHgpXG4gICAgLm1hcChmdW5jdGlvbiAoc3RyKSB7XG4gICAgICByZXR1cm4gdG9WYWx1ZShzdHIsIG1lYXN1cmVtZW50LCBwb3BwZXJPZmZzZXRzLCByZWZlcmVuY2VPZmZzZXRzKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gTG9vcCB0cm91Z2ggdGhlIG9mZnNldHMgYXJyYXlzIGFuZCBleGVjdXRlIHRoZSBvcGVyYXRpb25zXG4gIG9wcy5mb3JFYWNoKGZ1bmN0aW9uIChvcCwgaW5kZXgpIHtcbiAgICBvcC5mb3JFYWNoKGZ1bmN0aW9uIChmcmFnLCBpbmRleDIpIHtcbiAgICAgIGlmIChpc051bWVyaWMoZnJhZykpIHtcbiAgICAgICAgb2Zmc2V0c1tpbmRleF0gKz0gZnJhZyAqIChvcFtpbmRleDIgLSAxXSA9PT0gJy0nID8gLTEgOiAxKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIHJldHVybiBvZmZzZXRzO1xufVxuXG4vKipcbiAqIEBmdW5jdGlvblxuICogQG1lbWJlcm9mIE1vZGlmaWVyc1xuICogQGFyZ3VtZW50IHtPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IHVwZGF0ZSBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEBhcmd1bWVudCB7TnVtYmVyfFN0cmluZ30gb3B0aW9ucy5vZmZzZXQ9MFxuICogVGhlIG9mZnNldCB2YWx1ZSBhcyBkZXNjcmliZWQgaW4gdGhlIG1vZGlmaWVyIGRlc2NyaXB0aW9uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIG9mZnNldChkYXRhLCBfcmVmKSB7XG4gIHZhciBvZmZzZXQgPSBfcmVmLm9mZnNldDtcbiAgdmFyIHBsYWNlbWVudCA9IGRhdGEucGxhY2VtZW50LFxuICAgICAgX2RhdGEkb2Zmc2V0cyA9IGRhdGEub2Zmc2V0cyxcbiAgICAgIHBvcHBlciA9IF9kYXRhJG9mZnNldHMucG9wcGVyLFxuICAgICAgcmVmZXJlbmNlID0gX2RhdGEkb2Zmc2V0cy5yZWZlcmVuY2U7XG5cbiAgdmFyIGJhc2VQbGFjZW1lbnQgPSBwbGFjZW1lbnQuc3BsaXQoJy0nKVswXTtcblxuICB2YXIgb2Zmc2V0cyA9IHZvaWQgMDtcbiAgaWYgKGlzTnVtZXJpYygrb2Zmc2V0KSkge1xuICAgIG9mZnNldHMgPSBbK29mZnNldCwgMF07XG4gIH0gZWxzZSB7XG4gICAgb2Zmc2V0cyA9IHBhcnNlT2Zmc2V0KG9mZnNldCwgcG9wcGVyLCByZWZlcmVuY2UsIGJhc2VQbGFjZW1lbnQpO1xuICB9XG5cbiAgaWYgKGJhc2VQbGFjZW1lbnQgPT09ICdsZWZ0Jykge1xuICAgIHBvcHBlci50b3AgKz0gb2Zmc2V0c1swXTtcbiAgICBwb3BwZXIubGVmdCAtPSBvZmZzZXRzWzFdO1xuICB9IGVsc2UgaWYgKGJhc2VQbGFjZW1lbnQgPT09ICdyaWdodCcpIHtcbiAgICBwb3BwZXIudG9wICs9IG9mZnNldHNbMF07XG4gICAgcG9wcGVyLmxlZnQgKz0gb2Zmc2V0c1sxXTtcbiAgfSBlbHNlIGlmIChiYXNlUGxhY2VtZW50ID09PSAndG9wJykge1xuICAgIHBvcHBlci5sZWZ0ICs9IG9mZnNldHNbMF07XG4gICAgcG9wcGVyLnRvcCAtPSBvZmZzZXRzWzFdO1xuICB9IGVsc2UgaWYgKGJhc2VQbGFjZW1lbnQgPT09ICdib3R0b20nKSB7XG4gICAgcG9wcGVyLmxlZnQgKz0gb2Zmc2V0c1swXTtcbiAgICBwb3BwZXIudG9wICs9IG9mZnNldHNbMV07XG4gIH1cblxuICBkYXRhLnBvcHBlciA9IHBvcHBlcjtcbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgYHVwZGF0ZWAgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIHByZXZlbnRPdmVyZmxvdyhkYXRhLCBvcHRpb25zKSB7XG4gIHZhciBib3VuZGFyaWVzRWxlbWVudCA9IG9wdGlvbnMuYm91bmRhcmllc0VsZW1lbnQgfHwgZ2V0T2Zmc2V0UGFyZW50KGRhdGEuaW5zdGFuY2UucG9wcGVyKTtcblxuICAvLyBJZiBvZmZzZXRQYXJlbnQgaXMgdGhlIHJlZmVyZW5jZSBlbGVtZW50LCB3ZSByZWFsbHkgd2FudCB0b1xuICAvLyBnbyBvbmUgc3RlcCB1cCBhbmQgdXNlIHRoZSBuZXh0IG9mZnNldFBhcmVudCBhcyByZWZlcmVuY2UgdG9cbiAgLy8gYXZvaWQgdG8gbWFrZSB0aGlzIG1vZGlmaWVyIGNvbXBsZXRlbHkgdXNlbGVzcyBhbmQgbG9vayBsaWtlIGJyb2tlblxuICBpZiAoZGF0YS5pbnN0YW5jZS5yZWZlcmVuY2UgPT09IGJvdW5kYXJpZXNFbGVtZW50KSB7XG4gICAgYm91bmRhcmllc0VsZW1lbnQgPSBnZXRPZmZzZXRQYXJlbnQoYm91bmRhcmllc0VsZW1lbnQpO1xuICB9XG5cbiAgLy8gTk9URTogRE9NIGFjY2VzcyBoZXJlXG4gIC8vIHJlc2V0cyB0aGUgcG9wcGVyJ3MgcG9zaXRpb24gc28gdGhhdCB0aGUgZG9jdW1lbnQgc2l6ZSBjYW4gYmUgY2FsY3VsYXRlZCBleGNsdWRpbmdcbiAgLy8gdGhlIHNpemUgb2YgdGhlIHBvcHBlciBlbGVtZW50IGl0c2VsZlxuICB2YXIgdHJhbnNmb3JtUHJvcCA9IGdldFN1cHBvcnRlZFByb3BlcnR5TmFtZSgndHJhbnNmb3JtJyk7XG4gIHZhciBwb3BwZXJTdHlsZXMgPSBkYXRhLmluc3RhbmNlLnBvcHBlci5zdHlsZTsgLy8gYXNzaWdubWVudCB0byBoZWxwIG1pbmlmaWNhdGlvblxuICB2YXIgdG9wID0gcG9wcGVyU3R5bGVzLnRvcCxcbiAgICAgIGxlZnQgPSBwb3BwZXJTdHlsZXMubGVmdCxcbiAgICAgIHRyYW5zZm9ybSA9IHBvcHBlclN0eWxlc1t0cmFuc2Zvcm1Qcm9wXTtcblxuICBwb3BwZXJTdHlsZXMudG9wID0gJyc7XG4gIHBvcHBlclN0eWxlcy5sZWZ0ID0gJyc7XG4gIHBvcHBlclN0eWxlc1t0cmFuc2Zvcm1Qcm9wXSA9ICcnO1xuXG4gIHZhciBib3VuZGFyaWVzID0gZ2V0Qm91bmRhcmllcyhkYXRhLmluc3RhbmNlLnBvcHBlciwgZGF0YS5pbnN0YW5jZS5yZWZlcmVuY2UsIG9wdGlvbnMucGFkZGluZywgYm91bmRhcmllc0VsZW1lbnQsIGRhdGEucG9zaXRpb25GaXhlZCk7XG5cbiAgLy8gTk9URTogRE9NIGFjY2VzcyBoZXJlXG4gIC8vIHJlc3RvcmVzIHRoZSBvcmlnaW5hbCBzdHlsZSBwcm9wZXJ0aWVzIGFmdGVyIHRoZSBvZmZzZXRzIGhhdmUgYmVlbiBjb21wdXRlZFxuICBwb3BwZXJTdHlsZXMudG9wID0gdG9wO1xuICBwb3BwZXJTdHlsZXMubGVmdCA9IGxlZnQ7XG4gIHBvcHBlclN0eWxlc1t0cmFuc2Zvcm1Qcm9wXSA9IHRyYW5zZm9ybTtcblxuICBvcHRpb25zLmJvdW5kYXJpZXMgPSBib3VuZGFyaWVzO1xuXG4gIHZhciBvcmRlciA9IG9wdGlvbnMucHJpb3JpdHk7XG4gIHZhciBwb3BwZXIgPSBkYXRhLm9mZnNldHMucG9wcGVyO1xuXG4gIHZhciBjaGVjayA9IHtcbiAgICBwcmltYXJ5OiBmdW5jdGlvbiBwcmltYXJ5KHBsYWNlbWVudCkge1xuICAgICAgdmFyIHZhbHVlID0gcG9wcGVyW3BsYWNlbWVudF07XG4gICAgICBpZiAocG9wcGVyW3BsYWNlbWVudF0gPCBib3VuZGFyaWVzW3BsYWNlbWVudF0gJiYgIW9wdGlvbnMuZXNjYXBlV2l0aFJlZmVyZW5jZSkge1xuICAgICAgICB2YWx1ZSA9IE1hdGgubWF4KHBvcHBlcltwbGFjZW1lbnRdLCBib3VuZGFyaWVzW3BsYWNlbWVudF0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRlZmluZVByb3BlcnR5KHt9LCBwbGFjZW1lbnQsIHZhbHVlKTtcbiAgICB9LFxuICAgIHNlY29uZGFyeTogZnVuY3Rpb24gc2Vjb25kYXJ5KHBsYWNlbWVudCkge1xuICAgICAgdmFyIG1haW5TaWRlID0gcGxhY2VtZW50ID09PSAncmlnaHQnID8gJ2xlZnQnIDogJ3RvcCc7XG4gICAgICB2YXIgdmFsdWUgPSBwb3BwZXJbbWFpblNpZGVdO1xuICAgICAgaWYgKHBvcHBlcltwbGFjZW1lbnRdID4gYm91bmRhcmllc1twbGFjZW1lbnRdICYmICFvcHRpb25zLmVzY2FwZVdpdGhSZWZlcmVuY2UpIHtcbiAgICAgICAgdmFsdWUgPSBNYXRoLm1pbihwb3BwZXJbbWFpblNpZGVdLCBib3VuZGFyaWVzW3BsYWNlbWVudF0gLSAocGxhY2VtZW50ID09PSAncmlnaHQnID8gcG9wcGVyLndpZHRoIDogcG9wcGVyLmhlaWdodCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRlZmluZVByb3BlcnR5KHt9LCBtYWluU2lkZSwgdmFsdWUpO1xuICAgIH1cbiAgfTtcblxuICBvcmRlci5mb3JFYWNoKGZ1bmN0aW9uIChwbGFjZW1lbnQpIHtcbiAgICB2YXIgc2lkZSA9IFsnbGVmdCcsICd0b3AnXS5pbmRleE9mKHBsYWNlbWVudCkgIT09IC0xID8gJ3ByaW1hcnknIDogJ3NlY29uZGFyeSc7XG4gICAgcG9wcGVyID0gX2V4dGVuZHMoe30sIHBvcHBlciwgY2hlY2tbc2lkZV0ocGxhY2VtZW50KSk7XG4gIH0pO1xuXG4gIGRhdGEub2Zmc2V0cy5wb3BwZXIgPSBwb3BwZXI7XG5cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgYHVwZGF0ZWAgbWV0aG9kXG4gKiBAYXJndW1lbnQge09iamVjdH0gb3B0aW9ucyAtIE1vZGlmaWVycyBjb25maWd1cmF0aW9uIGFuZCBvcHRpb25zXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgZGF0YSBvYmplY3QsIHByb3Blcmx5IG1vZGlmaWVkXG4gKi9cbmZ1bmN0aW9uIHNoaWZ0KGRhdGEpIHtcbiAgdmFyIHBsYWNlbWVudCA9IGRhdGEucGxhY2VtZW50O1xuICB2YXIgYmFzZVBsYWNlbWVudCA9IHBsYWNlbWVudC5zcGxpdCgnLScpWzBdO1xuICB2YXIgc2hpZnR2YXJpYXRpb24gPSBwbGFjZW1lbnQuc3BsaXQoJy0nKVsxXTtcblxuICAvLyBpZiBzaGlmdCBzaGlmdHZhcmlhdGlvbiBpcyBzcGVjaWZpZWQsIHJ1biB0aGUgbW9kaWZpZXJcbiAgaWYgKHNoaWZ0dmFyaWF0aW9uKSB7XG4gICAgdmFyIF9kYXRhJG9mZnNldHMgPSBkYXRhLm9mZnNldHMsXG4gICAgICAgIHJlZmVyZW5jZSA9IF9kYXRhJG9mZnNldHMucmVmZXJlbmNlLFxuICAgICAgICBwb3BwZXIgPSBfZGF0YSRvZmZzZXRzLnBvcHBlcjtcblxuICAgIHZhciBpc1ZlcnRpY2FsID0gWydib3R0b20nLCAndG9wJ10uaW5kZXhPZihiYXNlUGxhY2VtZW50KSAhPT0gLTE7XG4gICAgdmFyIHNpZGUgPSBpc1ZlcnRpY2FsID8gJ2xlZnQnIDogJ3RvcCc7XG4gICAgdmFyIG1lYXN1cmVtZW50ID0gaXNWZXJ0aWNhbCA/ICd3aWR0aCcgOiAnaGVpZ2h0JztcblxuICAgIHZhciBzaGlmdE9mZnNldHMgPSB7XG4gICAgICBzdGFydDogZGVmaW5lUHJvcGVydHkoe30sIHNpZGUsIHJlZmVyZW5jZVtzaWRlXSksXG4gICAgICBlbmQ6IGRlZmluZVByb3BlcnR5KHt9LCBzaWRlLCByZWZlcmVuY2Vbc2lkZV0gKyByZWZlcmVuY2VbbWVhc3VyZW1lbnRdIC0gcG9wcGVyW21lYXN1cmVtZW50XSlcbiAgICB9O1xuXG4gICAgZGF0YS5vZmZzZXRzLnBvcHBlciA9IF9leHRlbmRzKHt9LCBwb3BwZXIsIHNoaWZ0T2Zmc2V0c1tzaGlmdHZhcmlhdGlvbl0pO1xuICB9XG5cbiAgcmV0dXJuIGRhdGE7XG59XG5cbi8qKlxuICogQGZ1bmN0aW9uXG4gKiBAbWVtYmVyb2YgTW9kaWZpZXJzXG4gKiBAYXJndW1lbnQge09iamVjdH0gZGF0YSAtIFRoZSBkYXRhIG9iamVjdCBnZW5lcmF0ZWQgYnkgdXBkYXRlIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge09iamVjdH0gVGhlIGRhdGEgb2JqZWN0LCBwcm9wZXJseSBtb2RpZmllZFxuICovXG5mdW5jdGlvbiBoaWRlKGRhdGEpIHtcbiAgaWYgKCFpc01vZGlmaWVyUmVxdWlyZWQoZGF0YS5pbnN0YW5jZS5tb2RpZmllcnMsICdoaWRlJywgJ3ByZXZlbnRPdmVyZmxvdycpKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICB2YXIgcmVmUmVjdCA9IGRhdGEub2Zmc2V0cy5yZWZlcmVuY2U7XG4gIHZhciBib3VuZCA9IGZpbmQoZGF0YS5pbnN0YW5jZS5tb2RpZmllcnMsIGZ1bmN0aW9uIChtb2RpZmllcikge1xuICAgIHJldHVybiBtb2RpZmllci5uYW1lID09PSAncHJldmVudE92ZXJmbG93JztcbiAgfSkuYm91bmRhcmllcztcblxuICBpZiAocmVmUmVjdC5ib3R0b20gPCBib3VuZC50b3AgfHwgcmVmUmVjdC5sZWZ0ID4gYm91bmQucmlnaHQgfHwgcmVmUmVjdC50b3AgPiBib3VuZC5ib3R0b20gfHwgcmVmUmVjdC5yaWdodCA8IGJvdW5kLmxlZnQpIHtcbiAgICAvLyBBdm9pZCB1bm5lY2Vzc2FyeSBET00gYWNjZXNzIGlmIHZpc2liaWxpdHkgaGFzbid0IGNoYW5nZWRcbiAgICBpZiAoZGF0YS5oaWRlID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG5cbiAgICBkYXRhLmhpZGUgPSB0cnVlO1xuICAgIGRhdGEuYXR0cmlidXRlc1sneC1vdXQtb2YtYm91bmRhcmllcyddID0gJyc7XG4gIH0gZWxzZSB7XG4gICAgLy8gQXZvaWQgdW5uZWNlc3NhcnkgRE9NIGFjY2VzcyBpZiB2aXNpYmlsaXR5IGhhc24ndCBjaGFuZ2VkXG4gICAgaWYgKGRhdGEuaGlkZSA9PT0gZmFsc2UpIHtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH1cblxuICAgIGRhdGEuaGlkZSA9IGZhbHNlO1xuICAgIGRhdGEuYXR0cmlidXRlc1sneC1vdXQtb2YtYm91bmRhcmllcyddID0gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBAZnVuY3Rpb25cbiAqIEBtZW1iZXJvZiBNb2RpZmllcnNcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBkYXRhIC0gVGhlIGRhdGEgb2JqZWN0IGdlbmVyYXRlZCBieSBgdXBkYXRlYCBtZXRob2RcbiAqIEBhcmd1bWVudCB7T2JqZWN0fSBvcHRpb25zIC0gTW9kaWZpZXJzIGNvbmZpZ3VyYXRpb24gYW5kIG9wdGlvbnNcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuZnVuY3Rpb24gaW5uZXIoZGF0YSkge1xuICB2YXIgcGxhY2VtZW50ID0gZGF0YS5wbGFjZW1lbnQ7XG4gIHZhciBiYXNlUGxhY2VtZW50ID0gcGxhY2VtZW50LnNwbGl0KCctJylbMF07XG4gIHZhciBfZGF0YSRvZmZzZXRzID0gZGF0YS5vZmZzZXRzLFxuICAgICAgcG9wcGVyID0gX2RhdGEkb2Zmc2V0cy5wb3BwZXIsXG4gICAgICByZWZlcmVuY2UgPSBfZGF0YSRvZmZzZXRzLnJlZmVyZW5jZTtcblxuICB2YXIgaXNIb3JpeiA9IFsnbGVmdCcsICdyaWdodCddLmluZGV4T2YoYmFzZVBsYWNlbWVudCkgIT09IC0xO1xuXG4gIHZhciBzdWJ0cmFjdExlbmd0aCA9IFsndG9wJywgJ2xlZnQnXS5pbmRleE9mKGJhc2VQbGFjZW1lbnQpID09PSAtMTtcblxuICBwb3BwZXJbaXNIb3JpeiA/ICdsZWZ0JyA6ICd0b3AnXSA9IHJlZmVyZW5jZVtiYXNlUGxhY2VtZW50XSAtIChzdWJ0cmFjdExlbmd0aCA/IHBvcHBlcltpc0hvcml6ID8gJ3dpZHRoJyA6ICdoZWlnaHQnXSA6IDApO1xuXG4gIGRhdGEucGxhY2VtZW50ID0gZ2V0T3Bwb3NpdGVQbGFjZW1lbnQocGxhY2VtZW50KTtcbiAgZGF0YS5vZmZzZXRzLnBvcHBlciA9IGdldENsaWVudFJlY3QocG9wcGVyKTtcblxuICByZXR1cm4gZGF0YTtcbn1cblxuLyoqXG4gKiBNb2RpZmllciBmdW5jdGlvbiwgZWFjaCBtb2RpZmllciBjYW4gaGF2ZSBhIGZ1bmN0aW9uIG9mIHRoaXMgdHlwZSBhc3NpZ25lZFxuICogdG8gaXRzIGBmbmAgcHJvcGVydHkuPGJyIC8+XG4gKiBUaGVzZSBmdW5jdGlvbnMgd2lsbCBiZSBjYWxsZWQgb24gZWFjaCB1cGRhdGUsIHRoaXMgbWVhbnMgdGhhdCB5b3UgbXVzdFxuICogbWFrZSBzdXJlIHRoZXkgYXJlIHBlcmZvcm1hbnQgZW5vdWdoIHRvIGF2b2lkIHBlcmZvcm1hbmNlIGJvdHRsZW5lY2tzLlxuICpcbiAqIEBmdW5jdGlvbiBNb2RpZmllckZuXG4gKiBAYXJndW1lbnQge2RhdGFPYmplY3R9IGRhdGEgLSBUaGUgZGF0YSBvYmplY3QgZ2VuZXJhdGVkIGJ5IGB1cGRhdGVgIG1ldGhvZFxuICogQGFyZ3VtZW50IHtPYmplY3R9IG9wdGlvbnMgLSBNb2RpZmllcnMgY29uZmlndXJhdGlvbiBhbmQgb3B0aW9uc1xuICogQHJldHVybnMge2RhdGFPYmplY3R9IFRoZSBkYXRhIG9iamVjdCwgcHJvcGVybHkgbW9kaWZpZWRcbiAqL1xuXG4vKipcbiAqIE1vZGlmaWVycyBhcmUgcGx1Z2lucyB1c2VkIHRvIGFsdGVyIHRoZSBiZWhhdmlvciBvZiB5b3VyIHBvcHBlcnMuPGJyIC8+XG4gKiBQb3BwZXIuanMgdXNlcyBhIHNldCBvZiA5IG1vZGlmaWVycyB0byBwcm92aWRlIGFsbCB0aGUgYmFzaWMgZnVuY3Rpb25hbGl0aWVzXG4gKiBuZWVkZWQgYnkgdGhlIGxpYnJhcnkuXG4gKlxuICogVXN1YWxseSB5b3UgZG9uJ3Qgd2FudCB0byBvdmVycmlkZSB0aGUgYG9yZGVyYCwgYGZuYCBhbmQgYG9uTG9hZGAgcHJvcHMuXG4gKiBBbGwgdGhlIG90aGVyIHByb3BlcnRpZXMgYXJlIGNvbmZpZ3VyYXRpb25zIHRoYXQgY291bGQgYmUgdHdlYWtlZC5cbiAqIEBuYW1lc3BhY2UgbW9kaWZpZXJzXG4gKi9cbnZhciBtb2RpZmllcnMgPSB7XG4gIC8qKlxuICAgKiBNb2RpZmllciB1c2VkIHRvIHNoaWZ0IHRoZSBwb3BwZXIgb24gdGhlIHN0YXJ0IG9yIGVuZCBvZiBpdHMgcmVmZXJlbmNlXG4gICAqIGVsZW1lbnQuPGJyIC8+XG4gICAqIEl0IHdpbGwgcmVhZCB0aGUgdmFyaWF0aW9uIG9mIHRoZSBgcGxhY2VtZW50YCBwcm9wZXJ0eS48YnIgLz5cbiAgICogSXQgY2FuIGJlIG9uZSBlaXRoZXIgYC1lbmRgIG9yIGAtc3RhcnRgLlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgc2hpZnQ6IHtcbiAgICAvKiogQHByb3Age251bWJlcn0gb3JkZXI9MTAwIC0gSW5kZXggdXNlZCB0byBkZWZpbmUgdGhlIG9yZGVyIG9mIGV4ZWN1dGlvbiAqL1xuICAgIG9yZGVyOiAxMDAsXG4gICAgLyoqIEBwcm9wIHtCb29sZWFufSBlbmFibGVkPXRydWUgLSBXaGV0aGVyIHRoZSBtb2RpZmllciBpcyBlbmFibGVkIG9yIG5vdCAqL1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgLyoqIEBwcm9wIHtNb2RpZmllckZufSAqL1xuICAgIGZuOiBzaGlmdFxuICB9LFxuXG4gIC8qKlxuICAgKiBUaGUgYG9mZnNldGAgbW9kaWZpZXIgY2FuIHNoaWZ0IHlvdXIgcG9wcGVyIG9uIGJvdGggaXRzIGF4aXMuXG4gICAqXG4gICAqIEl0IGFjY2VwdHMgdGhlIGZvbGxvd2luZyB1bml0czpcbiAgICogLSBgcHhgIG9yIHVuaXQtbGVzcywgaW50ZXJwcmV0ZWQgYXMgcGl4ZWxzXG4gICAqIC0gYCVgIG9yIGAlcmAsIHBlcmNlbnRhZ2UgcmVsYXRpdmUgdG8gdGhlIGxlbmd0aCBvZiB0aGUgcmVmZXJlbmNlIGVsZW1lbnRcbiAgICogLSBgJXBgLCBwZXJjZW50YWdlIHJlbGF0aXZlIHRvIHRoZSBsZW5ndGggb2YgdGhlIHBvcHBlciBlbGVtZW50XG4gICAqIC0gYHZ3YCwgQ1NTIHZpZXdwb3J0IHdpZHRoIHVuaXRcbiAgICogLSBgdmhgLCBDU1Mgdmlld3BvcnQgaGVpZ2h0IHVuaXRcbiAgICpcbiAgICogRm9yIGxlbmd0aCBpcyBpbnRlbmRlZCB0aGUgbWFpbiBheGlzIHJlbGF0aXZlIHRvIHRoZSBwbGFjZW1lbnQgb2YgdGhlIHBvcHBlci48YnIgLz5cbiAgICogVGhpcyBtZWFucyB0aGF0IGlmIHRoZSBwbGFjZW1lbnQgaXMgYHRvcGAgb3IgYGJvdHRvbWAsIHRoZSBsZW5ndGggd2lsbCBiZSB0aGVcbiAgICogYHdpZHRoYC4gSW4gY2FzZSBvZiBgbGVmdGAgb3IgYHJpZ2h0YCwgaXQgd2lsbCBiZSB0aGUgYGhlaWdodGAuXG4gICAqXG4gICAqIFlvdSBjYW4gcHJvdmlkZSBhIHNpbmdsZSB2YWx1ZSAoYXMgYE51bWJlcmAgb3IgYFN0cmluZ2ApLCBvciBhIHBhaXIgb2YgdmFsdWVzXG4gICAqIGFzIGBTdHJpbmdgIGRpdmlkZWQgYnkgYSBjb21tYSBvciBvbmUgKG9yIG1vcmUpIHdoaXRlIHNwYWNlcy48YnIgLz5cbiAgICogVGhlIGxhdHRlciBpcyBhIGRlcHJlY2F0ZWQgbWV0aG9kIGJlY2F1c2UgaXQgbGVhZHMgdG8gY29uZnVzaW9uIGFuZCB3aWxsIGJlXG4gICAqIHJlbW92ZWQgaW4gdjIuPGJyIC8+XG4gICAqIEFkZGl0aW9uYWxseSwgaXQgYWNjZXB0cyBhZGRpdGlvbnMgYW5kIHN1YnRyYWN0aW9ucyBiZXR3ZWVuIGRpZmZlcmVudCB1bml0cy5cbiAgICogTm90ZSB0aGF0IG11bHRpcGxpY2F0aW9ucyBhbmQgZGl2aXNpb25zIGFyZW4ndCBzdXBwb3J0ZWQuXG4gICAqXG4gICAqIFZhbGlkIGV4YW1wbGVzIGFyZTpcbiAgICogYGBgXG4gICAqIDEwXG4gICAqICcxMCUnXG4gICAqICcxMCwgMTAnXG4gICAqICcxMCUsIDEwJ1xuICAgKiAnMTAgKyAxMCUnXG4gICAqICcxMCAtIDV2aCArIDMlJ1xuICAgKiAnLTEwcHggKyA1dmgsIDVweCAtIDYlJ1xuICAgKiBgYGBcbiAgICogPiAqKk5CKio6IElmIHlvdSBkZXNpcmUgdG8gYXBwbHkgb2Zmc2V0cyB0byB5b3VyIHBvcHBlcnMgaW4gYSB3YXkgdGhhdCBtYXkgbWFrZSB0aGVtIG92ZXJsYXBcbiAgICogPiB3aXRoIHRoZWlyIHJlZmVyZW5jZSBlbGVtZW50LCB1bmZvcnR1bmF0ZWx5LCB5b3Ugd2lsbCBoYXZlIHRvIGRpc2FibGUgdGhlIGBmbGlwYCBtb2RpZmllci5cbiAgICogPiBZb3UgY2FuIHJlYWQgbW9yZSBvbiB0aGlzIGF0IHRoaXMgW2lzc3VlXShodHRwczovL2dpdGh1Yi5jb20vRmV6VnJhc3RhL3BvcHBlci5qcy9pc3N1ZXMvMzczKS5cbiAgICpcbiAgICogQG1lbWJlcm9mIG1vZGlmaWVyc1xuICAgKiBAaW5uZXJcbiAgICovXG4gIG9mZnNldDoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj0yMDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDIwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IG9mZnNldCxcbiAgICAvKiogQHByb3Age051bWJlcnxTdHJpbmd9IG9mZnNldD0wXG4gICAgICogVGhlIG9mZnNldCB2YWx1ZSBhcyBkZXNjcmliZWQgaW4gdGhlIG1vZGlmaWVyIGRlc2NyaXB0aW9uXG4gICAgICovXG4gICAgb2Zmc2V0OiAwXG4gIH0sXG5cbiAgLyoqXG4gICAqIE1vZGlmaWVyIHVzZWQgdG8gcHJldmVudCB0aGUgcG9wcGVyIGZyb20gYmVpbmcgcG9zaXRpb25lZCBvdXRzaWRlIHRoZSBib3VuZGFyeS5cbiAgICpcbiAgICogQSBzY2VuYXJpbyBleGlzdHMgd2hlcmUgdGhlIHJlZmVyZW5jZSBpdHNlbGYgaXMgbm90IHdpdGhpbiB0aGUgYm91bmRhcmllcy48YnIgLz5cbiAgICogV2UgY2FuIHNheSBpdCBoYXMgXCJlc2NhcGVkIHRoZSBib3VuZGFyaWVzXCIg4oCUIG9yIGp1c3QgXCJlc2NhcGVkXCIuPGJyIC8+XG4gICAqIEluIHRoaXMgY2FzZSB3ZSBuZWVkIHRvIGRlY2lkZSB3aGV0aGVyIHRoZSBwb3BwZXIgc2hvdWxkIGVpdGhlcjpcbiAgICpcbiAgICogLSBkZXRhY2ggZnJvbSB0aGUgcmVmZXJlbmNlIGFuZCByZW1haW4gXCJ0cmFwcGVkXCIgaW4gdGhlIGJvdW5kYXJpZXMsIG9yXG4gICAqIC0gaWYgaXQgc2hvdWxkIGlnbm9yZSB0aGUgYm91bmRhcnkgYW5kIFwiZXNjYXBlIHdpdGggaXRzIHJlZmVyZW5jZVwiXG4gICAqXG4gICAqIFdoZW4gYGVzY2FwZVdpdGhSZWZlcmVuY2VgIGlzIHNldCB0b2B0cnVlYCBhbmQgcmVmZXJlbmNlIGlzIGNvbXBsZXRlbHlcbiAgICogb3V0c2lkZSBpdHMgYm91bmRhcmllcywgdGhlIHBvcHBlciB3aWxsIG92ZXJmbG93IChvciBjb21wbGV0ZWx5IGxlYXZlKVxuICAgKiB0aGUgYm91bmRhcmllcyBpbiBvcmRlciB0byByZW1haW4gYXR0YWNoZWQgdG8gdGhlIGVkZ2Ugb2YgdGhlIHJlZmVyZW5jZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIG1vZGlmaWVyc1xuICAgKiBAaW5uZXJcbiAgICovXG4gIHByZXZlbnRPdmVyZmxvdzoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj0zMDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDMwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IHByZXZlbnRPdmVyZmxvdyxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7QXJyYXl9IFtwcmlvcml0eT1bJ2xlZnQnLCdyaWdodCcsJ3RvcCcsJ2JvdHRvbSddXVxuICAgICAqIFBvcHBlciB3aWxsIHRyeSB0byBwcmV2ZW50IG92ZXJmbG93IGZvbGxvd2luZyB0aGVzZSBwcmlvcml0aWVzIGJ5IGRlZmF1bHQsXG4gICAgICogdGhlbiwgaXQgY291bGQgb3ZlcmZsb3cgb24gdGhlIGxlZnQgYW5kIG9uIHRvcCBvZiB0aGUgYGJvdW5kYXJpZXNFbGVtZW50YFxuICAgICAqL1xuICAgIHByaW9yaXR5OiBbJ2xlZnQnLCAncmlnaHQnLCAndG9wJywgJ2JvdHRvbSddLFxuICAgIC8qKlxuICAgICAqIEBwcm9wIHtudW1iZXJ9IHBhZGRpbmc9NVxuICAgICAqIEFtb3VudCBvZiBwaXhlbCB1c2VkIHRvIGRlZmluZSBhIG1pbmltdW0gZGlzdGFuY2UgYmV0d2VlbiB0aGUgYm91bmRhcmllc1xuICAgICAqIGFuZCB0aGUgcG9wcGVyLiBUaGlzIG1ha2VzIHN1cmUgdGhlIHBvcHBlciBhbHdheXMgaGFzIGEgbGl0dGxlIHBhZGRpbmdcbiAgICAgKiBiZXR3ZWVuIHRoZSBlZGdlcyBvZiBpdHMgY29udGFpbmVyXG4gICAgICovXG4gICAgcGFkZGluZzogNSxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7U3RyaW5nfEhUTUxFbGVtZW50fSBib3VuZGFyaWVzRWxlbWVudD0nc2Nyb2xsUGFyZW50J1xuICAgICAqIEJvdW5kYXJpZXMgdXNlZCBieSB0aGUgbW9kaWZpZXIuIENhbiBiZSBgc2Nyb2xsUGFyZW50YCwgYHdpbmRvd2AsXG4gICAgICogYHZpZXdwb3J0YCBvciBhbnkgRE9NIGVsZW1lbnQuXG4gICAgICovXG4gICAgYm91bmRhcmllc0VsZW1lbnQ6ICdzY3JvbGxQYXJlbnQnXG4gIH0sXG5cbiAgLyoqXG4gICAqIE1vZGlmaWVyIHVzZWQgdG8gbWFrZSBzdXJlIHRoZSByZWZlcmVuY2UgYW5kIGl0cyBwb3BwZXIgc3RheSBuZWFyIGVhY2ggb3RoZXJcbiAgICogd2l0aG91dCBsZWF2aW5nIGFueSBnYXAgYmV0d2VlbiB0aGUgdHdvLiBFc3BlY2lhbGx5IHVzZWZ1bCB3aGVuIHRoZSBhcnJvdyBpc1xuICAgKiBlbmFibGVkIGFuZCB5b3Ugd2FudCB0byBlbnN1cmUgdGhhdCBpdCBwb2ludHMgdG8gaXRzIHJlZmVyZW5jZSBlbGVtZW50LlxuICAgKiBJdCBjYXJlcyBvbmx5IGFib3V0IHRoZSBmaXJzdCBheGlzLiBZb3UgY2FuIHN0aWxsIGhhdmUgcG9wcGVycyB3aXRoIG1hcmdpblxuICAgKiBiZXR3ZWVuIHRoZSBwb3BwZXIgYW5kIGl0cyByZWZlcmVuY2UgZWxlbWVudC5cbiAgICogQG1lbWJlcm9mIG1vZGlmaWVyc1xuICAgKiBAaW5uZXJcbiAgICovXG4gIGtlZXBUb2dldGhlcjoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj00MDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDQwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IGtlZXBUb2dldGhlclxuICB9LFxuXG4gIC8qKlxuICAgKiBUaGlzIG1vZGlmaWVyIGlzIHVzZWQgdG8gbW92ZSB0aGUgYGFycm93RWxlbWVudGAgb2YgdGhlIHBvcHBlciB0byBtYWtlXG4gICAqIHN1cmUgaXQgaXMgcG9zaXRpb25lZCBiZXR3ZWVuIHRoZSByZWZlcmVuY2UgZWxlbWVudCBhbmQgaXRzIHBvcHBlciBlbGVtZW50LlxuICAgKiBJdCB3aWxsIHJlYWQgdGhlIG91dGVyIHNpemUgb2YgdGhlIGBhcnJvd0VsZW1lbnRgIG5vZGUgdG8gZGV0ZWN0IGhvdyBtYW55XG4gICAqIHBpeGVscyBvZiBjb25qdW5jdGlvbiBhcmUgbmVlZGVkLlxuICAgKlxuICAgKiBJdCBoYXMgbm8gZWZmZWN0IGlmIG5vIGBhcnJvd0VsZW1lbnRgIGlzIHByb3ZpZGVkLlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgYXJyb3c6IHtcbiAgICAvKiogQHByb3Age251bWJlcn0gb3JkZXI9NTAwIC0gSW5kZXggdXNlZCB0byBkZWZpbmUgdGhlIG9yZGVyIG9mIGV4ZWN1dGlvbiAqL1xuICAgIG9yZGVyOiA1MDAsXG4gICAgLyoqIEBwcm9wIHtCb29sZWFufSBlbmFibGVkPXRydWUgLSBXaGV0aGVyIHRoZSBtb2RpZmllciBpcyBlbmFibGVkIG9yIG5vdCAqL1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgLyoqIEBwcm9wIHtNb2RpZmllckZufSAqL1xuICAgIGZuOiBhcnJvdyxcbiAgICAvKiogQHByb3Age1N0cmluZ3xIVE1MRWxlbWVudH0gZWxlbWVudD0nW3gtYXJyb3ddJyAtIFNlbGVjdG9yIG9yIG5vZGUgdXNlZCBhcyBhcnJvdyAqL1xuICAgIGVsZW1lbnQ6ICdbeC1hcnJvd10nXG4gIH0sXG5cbiAgLyoqXG4gICAqIE1vZGlmaWVyIHVzZWQgdG8gZmxpcCB0aGUgcG9wcGVyJ3MgcGxhY2VtZW50IHdoZW4gaXQgc3RhcnRzIHRvIG92ZXJsYXAgaXRzXG4gICAqIHJlZmVyZW5jZSBlbGVtZW50LlxuICAgKlxuICAgKiBSZXF1aXJlcyB0aGUgYHByZXZlbnRPdmVyZmxvd2AgbW9kaWZpZXIgYmVmb3JlIGl0IGluIG9yZGVyIHRvIHdvcmsuXG4gICAqXG4gICAqICoqTk9URToqKiB0aGlzIG1vZGlmaWVyIHdpbGwgaW50ZXJydXB0IHRoZSBjdXJyZW50IHVwZGF0ZSBjeWNsZSBhbmQgd2lsbFxuICAgKiByZXN0YXJ0IGl0IGlmIGl0IGRldGVjdHMgdGhlIG5lZWQgdG8gZmxpcCB0aGUgcGxhY2VtZW50LlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgZmxpcDoge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj02MDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDYwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IGZsaXAsXG4gICAgLyoqXG4gICAgICogQHByb3Age1N0cmluZ3xBcnJheX0gYmVoYXZpb3I9J2ZsaXAnXG4gICAgICogVGhlIGJlaGF2aW9yIHVzZWQgdG8gY2hhbmdlIHRoZSBwb3BwZXIncyBwbGFjZW1lbnQuIEl0IGNhbiBiZSBvbmUgb2ZcbiAgICAgKiBgZmxpcGAsIGBjbG9ja3dpc2VgLCBgY291bnRlcmNsb2Nrd2lzZWAgb3IgYW4gYXJyYXkgd2l0aCBhIGxpc3Qgb2YgdmFsaWRcbiAgICAgKiBwbGFjZW1lbnRzICh3aXRoIG9wdGlvbmFsIHZhcmlhdGlvbnMpXG4gICAgICovXG4gICAgYmVoYXZpb3I6ICdmbGlwJyxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7bnVtYmVyfSBwYWRkaW5nPTVcbiAgICAgKiBUaGUgcG9wcGVyIHdpbGwgZmxpcCBpZiBpdCBoaXRzIHRoZSBlZGdlcyBvZiB0aGUgYGJvdW5kYXJpZXNFbGVtZW50YFxuICAgICAqL1xuICAgIHBhZGRpbmc6IDUsXG4gICAgLyoqXG4gICAgICogQHByb3Age1N0cmluZ3xIVE1MRWxlbWVudH0gYm91bmRhcmllc0VsZW1lbnQ9J3ZpZXdwb3J0J1xuICAgICAqIFRoZSBlbGVtZW50IHdoaWNoIHdpbGwgZGVmaW5lIHRoZSBib3VuZGFyaWVzIG9mIHRoZSBwb3BwZXIgcG9zaXRpb24uXG4gICAgICogVGhlIHBvcHBlciB3aWxsIG5ldmVyIGJlIHBsYWNlZCBvdXRzaWRlIG9mIHRoZSBkZWZpbmVkIGJvdW5kYXJpZXNcbiAgICAgKiAoZXhjZXB0IGlmIGBrZWVwVG9nZXRoZXJgIGlzIGVuYWJsZWQpXG4gICAgICovXG4gICAgYm91bmRhcmllc0VsZW1lbnQ6ICd2aWV3cG9ydCdcbiAgfSxcblxuICAvKipcbiAgICogTW9kaWZpZXIgdXNlZCB0byBtYWtlIHRoZSBwb3BwZXIgZmxvdyB0b3dhcmQgdGhlIGlubmVyIG9mIHRoZSByZWZlcmVuY2UgZWxlbWVudC5cbiAgICogQnkgZGVmYXVsdCwgd2hlbiB0aGlzIG1vZGlmaWVyIGlzIGRpc2FibGVkLCB0aGUgcG9wcGVyIHdpbGwgYmUgcGxhY2VkIG91dHNpZGVcbiAgICogdGhlIHJlZmVyZW5jZSBlbGVtZW50LlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgaW5uZXI6IHtcbiAgICAvKiogQHByb3Age251bWJlcn0gb3JkZXI9NzAwIC0gSW5kZXggdXNlZCB0byBkZWZpbmUgdGhlIG9yZGVyIG9mIGV4ZWN1dGlvbiAqL1xuICAgIG9yZGVyOiA3MDAsXG4gICAgLyoqIEBwcm9wIHtCb29sZWFufSBlbmFibGVkPWZhbHNlIC0gV2hldGhlciB0aGUgbW9kaWZpZXIgaXMgZW5hYmxlZCBvciBub3QgKi9cbiAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IGlubmVyXG4gIH0sXG5cbiAgLyoqXG4gICAqIE1vZGlmaWVyIHVzZWQgdG8gaGlkZSB0aGUgcG9wcGVyIHdoZW4gaXRzIHJlZmVyZW5jZSBlbGVtZW50IGlzIG91dHNpZGUgb2YgdGhlXG4gICAqIHBvcHBlciBib3VuZGFyaWVzLiBJdCB3aWxsIHNldCBhIGB4LW91dC1vZi1ib3VuZGFyaWVzYCBhdHRyaWJ1dGUgd2hpY2ggY2FuXG4gICAqIGJlIHVzZWQgdG8gaGlkZSB3aXRoIGEgQ1NTIHNlbGVjdG9yIHRoZSBwb3BwZXIgd2hlbiBpdHMgcmVmZXJlbmNlIGlzXG4gICAqIG91dCBvZiBib3VuZGFyaWVzLlxuICAgKlxuICAgKiBSZXF1aXJlcyB0aGUgYHByZXZlbnRPdmVyZmxvd2AgbW9kaWZpZXIgYmVmb3JlIGl0IGluIG9yZGVyIHRvIHdvcmsuXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBoaWRlOiB7XG4gICAgLyoqIEBwcm9wIHtudW1iZXJ9IG9yZGVyPTgwMCAtIEluZGV4IHVzZWQgdG8gZGVmaW5lIHRoZSBvcmRlciBvZiBleGVjdXRpb24gKi9cbiAgICBvcmRlcjogODAwLFxuICAgIC8qKiBAcHJvcCB7Qm9vbGVhbn0gZW5hYmxlZD10cnVlIC0gV2hldGhlciB0aGUgbW9kaWZpZXIgaXMgZW5hYmxlZCBvciBub3QgKi9cbiAgICBlbmFibGVkOiB0cnVlLFxuICAgIC8qKiBAcHJvcCB7TW9kaWZpZXJGbn0gKi9cbiAgICBmbjogaGlkZVxuICB9LFxuXG4gIC8qKlxuICAgKiBDb21wdXRlcyB0aGUgc3R5bGUgdGhhdCB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIHBvcHBlciBlbGVtZW50IHRvIGdldHNcbiAgICogcHJvcGVybHkgcG9zaXRpb25lZC5cbiAgICpcbiAgICogTm90ZSB0aGF0IHRoaXMgbW9kaWZpZXIgd2lsbCBub3QgdG91Y2ggdGhlIERPTSwgaXQganVzdCBwcmVwYXJlcyB0aGUgc3R5bGVzXG4gICAqIHNvIHRoYXQgYGFwcGx5U3R5bGVgIG1vZGlmaWVyIGNhbiBhcHBseSBpdC4gVGhpcyBzZXBhcmF0aW9uIGlzIHVzZWZ1bFxuICAgKiBpbiBjYXNlIHlvdSBuZWVkIHRvIHJlcGxhY2UgYGFwcGx5U3R5bGVgIHdpdGggYSBjdXN0b20gaW1wbGVtZW50YXRpb24uXG4gICAqXG4gICAqIFRoaXMgbW9kaWZpZXIgaGFzIGA4NTBgIGFzIGBvcmRlcmAgdmFsdWUgdG8gbWFpbnRhaW4gYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICAgKiB3aXRoIHByZXZpb3VzIHZlcnNpb25zIG9mIFBvcHBlci5qcy4gRXhwZWN0IHRoZSBtb2RpZmllcnMgb3JkZXJpbmcgbWV0aG9kXG4gICAqIHRvIGNoYW5nZSBpbiBmdXR1cmUgbWFqb3IgdmVyc2lvbnMgb2YgdGhlIGxpYnJhcnkuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBtb2RpZmllcnNcbiAgICogQGlubmVyXG4gICAqL1xuICBjb21wdXRlU3R5bGU6IHtcbiAgICAvKiogQHByb3Age251bWJlcn0gb3JkZXI9ODUwIC0gSW5kZXggdXNlZCB0byBkZWZpbmUgdGhlIG9yZGVyIG9mIGV4ZWN1dGlvbiAqL1xuICAgIG9yZGVyOiA4NTAsXG4gICAgLyoqIEBwcm9wIHtCb29sZWFufSBlbmFibGVkPXRydWUgLSBXaGV0aGVyIHRoZSBtb2RpZmllciBpcyBlbmFibGVkIG9yIG5vdCAqL1xuICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgLyoqIEBwcm9wIHtNb2RpZmllckZufSAqL1xuICAgIGZuOiBjb21wdXRlU3R5bGUsXG4gICAgLyoqXG4gICAgICogQHByb3Age0Jvb2xlYW59IGdwdUFjY2VsZXJhdGlvbj10cnVlXG4gICAgICogSWYgdHJ1ZSwgaXQgdXNlcyB0aGUgQ1NTIDNEIHRyYW5zZm9ybWF0aW9uIHRvIHBvc2l0aW9uIHRoZSBwb3BwZXIuXG4gICAgICogT3RoZXJ3aXNlLCBpdCB3aWxsIHVzZSB0aGUgYHRvcGAgYW5kIGBsZWZ0YCBwcm9wZXJ0aWVzXG4gICAgICovXG4gICAgZ3B1QWNjZWxlcmF0aW9uOiB0cnVlLFxuICAgIC8qKlxuICAgICAqIEBwcm9wIHtzdHJpbmd9IFt4PSdib3R0b20nXVxuICAgICAqIFdoZXJlIHRvIGFuY2hvciB0aGUgWCBheGlzIChgYm90dG9tYCBvciBgdG9wYCkuIEFLQSBYIG9mZnNldCBvcmlnaW4uXG4gICAgICogQ2hhbmdlIHRoaXMgaWYgeW91ciBwb3BwZXIgc2hvdWxkIGdyb3cgaW4gYSBkaXJlY3Rpb24gZGlmZmVyZW50IGZyb20gYGJvdHRvbWBcbiAgICAgKi9cbiAgICB4OiAnYm90dG9tJyxcbiAgICAvKipcbiAgICAgKiBAcHJvcCB7c3RyaW5nfSBbeD0nbGVmdCddXG4gICAgICogV2hlcmUgdG8gYW5jaG9yIHRoZSBZIGF4aXMgKGBsZWZ0YCBvciBgcmlnaHRgKS4gQUtBIFkgb2Zmc2V0IG9yaWdpbi5cbiAgICAgKiBDaGFuZ2UgdGhpcyBpZiB5b3VyIHBvcHBlciBzaG91bGQgZ3JvdyBpbiBhIGRpcmVjdGlvbiBkaWZmZXJlbnQgZnJvbSBgcmlnaHRgXG4gICAgICovXG4gICAgeTogJ3JpZ2h0J1xuICB9LFxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIHRoZSBjb21wdXRlZCBzdHlsZXMgdG8gdGhlIHBvcHBlciBlbGVtZW50LlxuICAgKlxuICAgKiBBbGwgdGhlIERPTSBtYW5pcHVsYXRpb25zIGFyZSBsaW1pdGVkIHRvIHRoaXMgbW9kaWZpZXIuIFRoaXMgaXMgdXNlZnVsIGluIGNhc2VcbiAgICogeW91IHdhbnQgdG8gaW50ZWdyYXRlIFBvcHBlci5qcyBpbnNpZGUgYSBmcmFtZXdvcmsgb3IgdmlldyBsaWJyYXJ5IGFuZCB5b3VcbiAgICogd2FudCB0byBkZWxlZ2F0ZSBhbGwgdGhlIERPTSBtYW5pcHVsYXRpb25zIHRvIGl0LlxuICAgKlxuICAgKiBOb3RlIHRoYXQgaWYgeW91IGRpc2FibGUgdGhpcyBtb2RpZmllciwgeW91IG11c3QgbWFrZSBzdXJlIHRoZSBwb3BwZXIgZWxlbWVudFxuICAgKiBoYXMgaXRzIHBvc2l0aW9uIHNldCB0byBgYWJzb2x1dGVgIGJlZm9yZSBQb3BwZXIuanMgY2FuIGRvIGl0cyB3b3JrIVxuICAgKlxuICAgKiBKdXN0IGRpc2FibGUgdGhpcyBtb2RpZmllciBhbmQgZGVmaW5lIHlvdXIgb3duIHRvIGFjaGlldmUgdGhlIGRlc2lyZWQgZWZmZWN0LlxuICAgKlxuICAgKiBAbWVtYmVyb2YgbW9kaWZpZXJzXG4gICAqIEBpbm5lclxuICAgKi9cbiAgYXBwbHlTdHlsZToge1xuICAgIC8qKiBAcHJvcCB7bnVtYmVyfSBvcmRlcj05MDAgLSBJbmRleCB1c2VkIHRvIGRlZmluZSB0aGUgb3JkZXIgb2YgZXhlY3V0aW9uICovXG4gICAgb3JkZXI6IDkwMCxcbiAgICAvKiogQHByb3Age0Jvb2xlYW59IGVuYWJsZWQ9dHJ1ZSAtIFdoZXRoZXIgdGhlIG1vZGlmaWVyIGlzIGVuYWJsZWQgb3Igbm90ICovXG4gICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAvKiogQHByb3Age01vZGlmaWVyRm59ICovXG4gICAgZm46IGFwcGx5U3R5bGUsXG4gICAgLyoqIEBwcm9wIHtGdW5jdGlvbn0gKi9cbiAgICBvbkxvYWQ6IGFwcGx5U3R5bGVPbkxvYWQsXG4gICAgLyoqXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiAxLjEwLjAsIHRoZSBwcm9wZXJ0eSBtb3ZlZCB0byBgY29tcHV0ZVN0eWxlYCBtb2RpZmllclxuICAgICAqIEBwcm9wIHtCb29sZWFufSBncHVBY2NlbGVyYXRpb249dHJ1ZVxuICAgICAqIElmIHRydWUsIGl0IHVzZXMgdGhlIENTUyAzRCB0cmFuc2Zvcm1hdGlvbiB0byBwb3NpdGlvbiB0aGUgcG9wcGVyLlxuICAgICAqIE90aGVyd2lzZSwgaXQgd2lsbCB1c2UgdGhlIGB0b3BgIGFuZCBgbGVmdGAgcHJvcGVydGllc1xuICAgICAqL1xuICAgIGdwdUFjY2VsZXJhdGlvbjogdW5kZWZpbmVkXG4gIH1cbn07XG5cbi8qKlxuICogVGhlIGBkYXRhT2JqZWN0YCBpcyBhbiBvYmplY3QgY29udGFpbmluZyBhbGwgdGhlIGluZm9ybWF0aW9uIHVzZWQgYnkgUG9wcGVyLmpzLlxuICogVGhpcyBvYmplY3QgaXMgcGFzc2VkIHRvIG1vZGlmaWVycyBhbmQgdG8gdGhlIGBvbkNyZWF0ZWAgYW5kIGBvblVwZGF0ZWAgY2FsbGJhY2tzLlxuICogQG5hbWUgZGF0YU9iamVjdFxuICogQHByb3BlcnR5IHtPYmplY3R9IGRhdGEuaW5zdGFuY2UgVGhlIFBvcHBlci5qcyBpbnN0YW5jZVxuICogQHByb3BlcnR5IHtTdHJpbmd9IGRhdGEucGxhY2VtZW50IFBsYWNlbWVudCBhcHBsaWVkIHRvIHBvcHBlclxuICogQHByb3BlcnR5IHtTdHJpbmd9IGRhdGEub3JpZ2luYWxQbGFjZW1lbnQgUGxhY2VtZW50IG9yaWdpbmFsbHkgZGVmaW5lZCBvbiBpbml0XG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGRhdGEuZmxpcHBlZCBUcnVlIGlmIHBvcHBlciBoYXMgYmVlbiBmbGlwcGVkIGJ5IGZsaXAgbW9kaWZpZXJcbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZGF0YS5oaWRlIFRydWUgaWYgdGhlIHJlZmVyZW5jZSBlbGVtZW50IGlzIG91dCBvZiBib3VuZGFyaWVzLCB1c2VmdWwgdG8ga25vdyB3aGVuIHRvIGhpZGUgdGhlIHBvcHBlclxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gZGF0YS5hcnJvd0VsZW1lbnQgTm9kZSB1c2VkIGFzIGFycm93IGJ5IGFycm93IG1vZGlmaWVyXG4gKiBAcHJvcGVydHkge09iamVjdH0gZGF0YS5zdHlsZXMgQW55IENTUyBwcm9wZXJ0eSBkZWZpbmVkIGhlcmUgd2lsbCBiZSBhcHBsaWVkIHRvIHRoZSBwb3BwZXIuIEl0IGV4cGVjdHMgdGhlIEphdmFTY3JpcHQgbm9tZW5jbGF0dXJlIChlZy4gYG1hcmdpbkJvdHRvbWApXG4gKiBAcHJvcGVydHkge09iamVjdH0gZGF0YS5hcnJvd1N0eWxlcyBBbnkgQ1NTIHByb3BlcnR5IGRlZmluZWQgaGVyZSB3aWxsIGJlIGFwcGxpZWQgdG8gdGhlIHBvcHBlciBhcnJvdy4gSXQgZXhwZWN0cyB0aGUgSmF2YVNjcmlwdCBub21lbmNsYXR1cmUgKGVnLiBgbWFyZ2luQm90dG9tYClcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBkYXRhLmJvdW5kYXJpZXMgT2Zmc2V0cyBvZiB0aGUgcG9wcGVyIGJvdW5kYXJpZXNcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBkYXRhLm9mZnNldHMgVGhlIG1lYXN1cmVtZW50cyBvZiBwb3BwZXIsIHJlZmVyZW5jZSBhbmQgYXJyb3cgZWxlbWVudHNcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBkYXRhLm9mZnNldHMucG9wcGVyIGB0b3BgLCBgbGVmdGAsIGB3aWR0aGAsIGBoZWlnaHRgIHZhbHVlc1xuICogQHByb3BlcnR5IHtPYmplY3R9IGRhdGEub2Zmc2V0cy5yZWZlcmVuY2UgYHRvcGAsIGBsZWZ0YCwgYHdpZHRoYCwgYGhlaWdodGAgdmFsdWVzXG4gKiBAcHJvcGVydHkge09iamVjdH0gZGF0YS5vZmZzZXRzLmFycm93XSBgdG9wYCBhbmQgYGxlZnRgIG9mZnNldHMsIG9ubHkgb25lIG9mIHRoZW0gd2lsbCBiZSBkaWZmZXJlbnQgZnJvbSAwXG4gKi9cblxuLyoqXG4gKiBEZWZhdWx0IG9wdGlvbnMgcHJvdmlkZWQgdG8gUG9wcGVyLmpzIGNvbnN0cnVjdG9yLjxiciAvPlxuICogVGhlc2UgY2FuIGJlIG92ZXJyaWRkZW4gdXNpbmcgdGhlIGBvcHRpb25zYCBhcmd1bWVudCBvZiBQb3BwZXIuanMuPGJyIC8+XG4gKiBUbyBvdmVycmlkZSBhbiBvcHRpb24sIHNpbXBseSBwYXNzIGFuIG9iamVjdCB3aXRoIHRoZSBzYW1lXG4gKiBzdHJ1Y3R1cmUgb2YgdGhlIGBvcHRpb25zYCBvYmplY3QsIGFzIHRoZSAzcmQgYXJndW1lbnQuIEZvciBleGFtcGxlOlxuICogYGBgXG4gKiBuZXcgUG9wcGVyKHJlZiwgcG9wLCB7XG4gKiAgIG1vZGlmaWVyczoge1xuICogICAgIHByZXZlbnRPdmVyZmxvdzogeyBlbmFibGVkOiBmYWxzZSB9XG4gKiAgIH1cbiAqIH0pXG4gKiBgYGBcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyb2YgUG9wcGVyXG4gKi9cbnZhciBEZWZhdWx0cyA9IHtcbiAgLyoqXG4gICAqIFBvcHBlcidzIHBsYWNlbWVudC5cbiAgICogQHByb3Age1BvcHBlci5wbGFjZW1lbnRzfSBwbGFjZW1lbnQ9J2JvdHRvbSdcbiAgICovXG4gIHBsYWNlbWVudDogJ2JvdHRvbScsXG5cbiAgLyoqXG4gICAqIFNldCB0aGlzIHRvIHRydWUgaWYgeW91IHdhbnQgcG9wcGVyIHRvIHBvc2l0aW9uIGl0IHNlbGYgaW4gJ2ZpeGVkJyBtb2RlXG4gICAqIEBwcm9wIHtCb29sZWFufSBwb3NpdGlvbkZpeGVkPWZhbHNlXG4gICAqL1xuICBwb3NpdGlvbkZpeGVkOiBmYWxzZSxcblxuICAvKipcbiAgICogV2hldGhlciBldmVudHMgKHJlc2l6ZSwgc2Nyb2xsKSBhcmUgaW5pdGlhbGx5IGVuYWJsZWQuXG4gICAqIEBwcm9wIHtCb29sZWFufSBldmVudHNFbmFibGVkPXRydWVcbiAgICovXG4gIGV2ZW50c0VuYWJsZWQ6IHRydWUsXG5cbiAgLyoqXG4gICAqIFNldCB0byB0cnVlIGlmIHlvdSB3YW50IHRvIGF1dG9tYXRpY2FsbHkgcmVtb3ZlIHRoZSBwb3BwZXIgd2hlblxuICAgKiB5b3UgY2FsbCB0aGUgYGRlc3Ryb3lgIG1ldGhvZC5cbiAgICogQHByb3Age0Jvb2xlYW59IHJlbW92ZU9uRGVzdHJveT1mYWxzZVxuICAgKi9cbiAgcmVtb3ZlT25EZXN0cm95OiBmYWxzZSxcblxuICAvKipcbiAgICogQ2FsbGJhY2sgY2FsbGVkIHdoZW4gdGhlIHBvcHBlciBpcyBjcmVhdGVkLjxiciAvPlxuICAgKiBCeSBkZWZhdWx0LCBpdCBpcyBzZXQgdG8gbm8tb3AuPGJyIC8+XG4gICAqIEFjY2VzcyBQb3BwZXIuanMgaW5zdGFuY2Ugd2l0aCBgZGF0YS5pbnN0YW5jZWAuXG4gICAqIEBwcm9wIHtvbkNyZWF0ZX1cbiAgICovXG4gIG9uQ3JlYXRlOiBmdW5jdGlvbiBvbkNyZWF0ZSgpIHt9LFxuXG4gIC8qKlxuICAgKiBDYWxsYmFjayBjYWxsZWQgd2hlbiB0aGUgcG9wcGVyIGlzIHVwZGF0ZWQuIFRoaXMgY2FsbGJhY2sgaXMgbm90IGNhbGxlZFxuICAgKiBvbiB0aGUgaW5pdGlhbGl6YXRpb24vY3JlYXRpb24gb2YgdGhlIHBvcHBlciwgYnV0IG9ubHkgb24gc3Vic2VxdWVudFxuICAgKiB1cGRhdGVzLjxiciAvPlxuICAgKiBCeSBkZWZhdWx0LCBpdCBpcyBzZXQgdG8gbm8tb3AuPGJyIC8+XG4gICAqIEFjY2VzcyBQb3BwZXIuanMgaW5zdGFuY2Ugd2l0aCBgZGF0YS5pbnN0YW5jZWAuXG4gICAqIEBwcm9wIHtvblVwZGF0ZX1cbiAgICovXG4gIG9uVXBkYXRlOiBmdW5jdGlvbiBvblVwZGF0ZSgpIHt9LFxuXG4gIC8qKlxuICAgKiBMaXN0IG9mIG1vZGlmaWVycyB1c2VkIHRvIG1vZGlmeSB0aGUgb2Zmc2V0cyBiZWZvcmUgdGhleSBhcmUgYXBwbGllZCB0byB0aGUgcG9wcGVyLlxuICAgKiBUaGV5IHByb3ZpZGUgbW9zdCBvZiB0aGUgZnVuY3Rpb25hbGl0aWVzIG9mIFBvcHBlci5qcy5cbiAgICogQHByb3Age21vZGlmaWVyc31cbiAgICovXG4gIG1vZGlmaWVyczogbW9kaWZpZXJzXG59O1xuXG4vKipcbiAqIEBjYWxsYmFjayBvbkNyZWF0ZVxuICogQHBhcmFtIHtkYXRhT2JqZWN0fSBkYXRhXG4gKi9cblxuLyoqXG4gKiBAY2FsbGJhY2sgb25VcGRhdGVcbiAqIEBwYXJhbSB7ZGF0YU9iamVjdH0gZGF0YVxuICovXG5cbi8vIFV0aWxzXG4vLyBNZXRob2RzXG52YXIgUG9wcGVyID0gZnVuY3Rpb24gKCkge1xuICAvKipcbiAgICogQ3JlYXRlcyBhIG5ldyBQb3BwZXIuanMgaW5zdGFuY2UuXG4gICAqIEBjbGFzcyBQb3BwZXJcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudHxyZWZlcmVuY2VPYmplY3R9IHJlZmVyZW5jZSAtIFRoZSByZWZlcmVuY2UgZWxlbWVudCB1c2VkIHRvIHBvc2l0aW9uIHRoZSBwb3BwZXJcbiAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcG9wcGVyIC0gVGhlIEhUTUwgZWxlbWVudCB1c2VkIGFzIHRoZSBwb3BwZXJcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBZb3VyIGN1c3RvbSBvcHRpb25zIHRvIG92ZXJyaWRlIHRoZSBvbmVzIGRlZmluZWQgaW4gW0RlZmF1bHRzXSgjZGVmYXVsdHMpXG4gICAqIEByZXR1cm4ge09iamVjdH0gaW5zdGFuY2UgLSBUaGUgZ2VuZXJhdGVkIFBvcHBlci5qcyBpbnN0YW5jZVxuICAgKi9cbiAgZnVuY3Rpb24gUG9wcGVyKHJlZmVyZW5jZSwgcG9wcGVyKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiB7fTtcbiAgICBjbGFzc0NhbGxDaGVjayh0aGlzLCBQb3BwZXIpO1xuXG4gICAgdGhpcy5zY2hlZHVsZVVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoX3RoaXMudXBkYXRlKTtcbiAgICB9O1xuXG4gICAgLy8gbWFrZSB1cGRhdGUoKSBkZWJvdW5jZWQsIHNvIHRoYXQgaXQgb25seSBydW5zIGF0IG1vc3Qgb25jZS1wZXItdGlja1xuICAgIHRoaXMudXBkYXRlID0gZGVib3VuY2UodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG5cbiAgICAvLyB3aXRoIHt9IHdlIGNyZWF0ZSBhIG5ldyBvYmplY3Qgd2l0aCB0aGUgb3B0aW9ucyBpbnNpZGUgaXRcbiAgICB0aGlzLm9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgUG9wcGVyLkRlZmF1bHRzLCBvcHRpb25zKTtcblxuICAgIC8vIGluaXQgc3RhdGVcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNEZXN0cm95ZWQ6IGZhbHNlLFxuICAgICAgaXNDcmVhdGVkOiBmYWxzZSxcbiAgICAgIHNjcm9sbFBhcmVudHM6IFtdXG4gICAgfTtcblxuICAgIC8vIGdldCByZWZlcmVuY2UgYW5kIHBvcHBlciBlbGVtZW50cyAoYWxsb3cgalF1ZXJ5IHdyYXBwZXJzKVxuICAgIHRoaXMucmVmZXJlbmNlID0gcmVmZXJlbmNlICYmIHJlZmVyZW5jZS5qcXVlcnkgPyByZWZlcmVuY2VbMF0gOiByZWZlcmVuY2U7XG4gICAgdGhpcy5wb3BwZXIgPSBwb3BwZXIgJiYgcG9wcGVyLmpxdWVyeSA/IHBvcHBlclswXSA6IHBvcHBlcjtcblxuICAgIC8vIERlZXAgbWVyZ2UgbW9kaWZpZXJzIG9wdGlvbnNcbiAgICB0aGlzLm9wdGlvbnMubW9kaWZpZXJzID0ge307XG4gICAgT2JqZWN0LmtleXMoX2V4dGVuZHMoe30sIFBvcHBlci5EZWZhdWx0cy5tb2RpZmllcnMsIG9wdGlvbnMubW9kaWZpZXJzKSkuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgX3RoaXMub3B0aW9ucy5tb2RpZmllcnNbbmFtZV0gPSBfZXh0ZW5kcyh7fSwgUG9wcGVyLkRlZmF1bHRzLm1vZGlmaWVyc1tuYW1lXSB8fCB7fSwgb3B0aW9ucy5tb2RpZmllcnMgPyBvcHRpb25zLm1vZGlmaWVyc1tuYW1lXSA6IHt9KTtcbiAgICB9KTtcblxuICAgIC8vIFJlZmFjdG9yaW5nIG1vZGlmaWVycycgbGlzdCAoT2JqZWN0ID0+IEFycmF5KVxuICAgIHRoaXMubW9kaWZpZXJzID0gT2JqZWN0LmtleXModGhpcy5vcHRpb25zLm1vZGlmaWVycykubWFwKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICByZXR1cm4gX2V4dGVuZHMoe1xuICAgICAgICBuYW1lOiBuYW1lXG4gICAgICB9LCBfdGhpcy5vcHRpb25zLm1vZGlmaWVyc1tuYW1lXSk7XG4gICAgfSlcbiAgICAvLyBzb3J0IHRoZSBtb2RpZmllcnMgYnkgb3JkZXJcbiAgICAuc29ydChmdW5jdGlvbiAoYSwgYikge1xuICAgICAgcmV0dXJuIGEub3JkZXIgLSBiLm9yZGVyO1xuICAgIH0pO1xuXG4gICAgLy8gbW9kaWZpZXJzIGhhdmUgdGhlIGFiaWxpdHkgdG8gZXhlY3V0ZSBhcmJpdHJhcnkgY29kZSB3aGVuIFBvcHBlci5qcyBnZXQgaW5pdGVkXG4gICAgLy8gc3VjaCBjb2RlIGlzIGV4ZWN1dGVkIGluIHRoZSBzYW1lIG9yZGVyIG9mIGl0cyBtb2RpZmllclxuICAgIC8vIHRoZXkgY291bGQgYWRkIG5ldyBwcm9wZXJ0aWVzIHRvIHRoZWlyIG9wdGlvbnMgY29uZmlndXJhdGlvblxuICAgIC8vIEJFIEFXQVJFOiBkb24ndCBhZGQgb3B0aW9ucyB0byBgb3B0aW9ucy5tb2RpZmllcnMubmFtZWAgYnV0IHRvIGBtb2RpZmllck9wdGlvbnNgIVxuICAgIHRoaXMubW9kaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKG1vZGlmaWVyT3B0aW9ucykge1xuICAgICAgaWYgKG1vZGlmaWVyT3B0aW9ucy5lbmFibGVkICYmIGlzRnVuY3Rpb24obW9kaWZpZXJPcHRpb25zLm9uTG9hZCkpIHtcbiAgICAgICAgbW9kaWZpZXJPcHRpb25zLm9uTG9hZChfdGhpcy5yZWZlcmVuY2UsIF90aGlzLnBvcHBlciwgX3RoaXMub3B0aW9ucywgbW9kaWZpZXJPcHRpb25zLCBfdGhpcy5zdGF0ZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBmaXJlIHRoZSBmaXJzdCB1cGRhdGUgdG8gcG9zaXRpb24gdGhlIHBvcHBlciBpbiB0aGUgcmlnaHQgcGxhY2VcbiAgICB0aGlzLnVwZGF0ZSgpO1xuXG4gICAgdmFyIGV2ZW50c0VuYWJsZWQgPSB0aGlzLm9wdGlvbnMuZXZlbnRzRW5hYmxlZDtcbiAgICBpZiAoZXZlbnRzRW5hYmxlZCkge1xuICAgICAgLy8gc2V0dXAgZXZlbnQgbGlzdGVuZXJzLCB0aGV5IHdpbGwgdGFrZSBjYXJlIG9mIHVwZGF0ZSB0aGUgcG9zaXRpb24gaW4gc3BlY2lmaWMgc2l0dWF0aW9uc1xuICAgICAgdGhpcy5lbmFibGVFdmVudExpc3RlbmVycygpO1xuICAgIH1cblxuICAgIHRoaXMuc3RhdGUuZXZlbnRzRW5hYmxlZCA9IGV2ZW50c0VuYWJsZWQ7XG4gIH1cblxuICAvLyBXZSBjYW4ndCB1c2UgY2xhc3MgcHJvcGVydGllcyBiZWNhdXNlIHRoZXkgZG9uJ3QgZ2V0IGxpc3RlZCBpbiB0aGVcbiAgLy8gY2xhc3MgcHJvdG90eXBlIGFuZCBicmVhayBzdHVmZiBsaWtlIFNpbm9uIHN0dWJzXG5cblxuICBjcmVhdGVDbGFzcyhQb3BwZXIsIFt7XG4gICAga2V5OiAndXBkYXRlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gdXBkYXRlJCQxKCkge1xuICAgICAgcmV0dXJuIHVwZGF0ZS5jYWxsKHRoaXMpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2Rlc3Ryb3knLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkZXN0cm95JCQxKCkge1xuICAgICAgcmV0dXJuIGRlc3Ryb3kuY2FsbCh0aGlzKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdlbmFibGVFdmVudExpc3RlbmVycycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVuYWJsZUV2ZW50TGlzdGVuZXJzJCQxKCkge1xuICAgICAgcmV0dXJuIGVuYWJsZUV2ZW50TGlzdGVuZXJzLmNhbGwodGhpcyk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZGlzYWJsZUV2ZW50TGlzdGVuZXJzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGlzYWJsZUV2ZW50TGlzdGVuZXJzJCQxKCkge1xuICAgICAgcmV0dXJuIGRpc2FibGVFdmVudExpc3RlbmVycy5jYWxsKHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNjaGVkdWxlcyBhbiB1cGRhdGUuIEl0IHdpbGwgcnVuIG9uIHRoZSBuZXh0IFVJIHVwZGF0ZSBhdmFpbGFibGUuXG4gICAgICogQG1ldGhvZCBzY2hlZHVsZVVwZGF0ZVxuICAgICAqIEBtZW1iZXJvZiBQb3BwZXJcbiAgICAgKi9cblxuXG4gICAgLyoqXG4gICAgICogQ29sbGVjdGlvbiBvZiB1dGlsaXRpZXMgdXNlZnVsIHdoZW4gd3JpdGluZyBjdXN0b20gbW9kaWZpZXJzLlxuICAgICAqIFN0YXJ0aW5nIGZyb20gdmVyc2lvbiAxLjcsIHRoaXMgbWV0aG9kIGlzIGF2YWlsYWJsZSBvbmx5IGlmIHlvdVxuICAgICAqIGluY2x1ZGUgYHBvcHBlci11dGlscy5qc2AgYmVmb3JlIGBwb3BwZXIuanNgLlxuICAgICAqXG4gICAgICogKipERVBSRUNBVElPTioqOiBUaGlzIHdheSB0byBhY2Nlc3MgUG9wcGVyVXRpbHMgaXMgZGVwcmVjYXRlZFxuICAgICAqIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gdjIhIFVzZSB0aGUgUG9wcGVyVXRpbHMgbW9kdWxlIGRpcmVjdGx5IGluc3RlYWQuXG4gICAgICogRHVlIHRvIHRoZSBoaWdoIGluc3RhYmlsaXR5IG9mIHRoZSBtZXRob2RzIGNvbnRhaW5lZCBpbiBVdGlscywgd2UgY2FuJ3RcbiAgICAgKiBndWFyYW50ZWUgdGhlbSB0byBmb2xsb3cgc2VtdmVyLiBVc2UgdGhlbSBhdCB5b3VyIG93biByaXNrIVxuICAgICAqIEBzdGF0aWNcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEB0eXBlIHtPYmplY3R9XG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdmVyc2lvbiAxLjhcbiAgICAgKiBAbWVtYmVyIFV0aWxzXG4gICAgICogQG1lbWJlcm9mIFBvcHBlclxuICAgICAqL1xuXG4gIH1dKTtcbiAgcmV0dXJuIFBvcHBlcjtcbn0oKTtcblxuLyoqXG4gKiBUaGUgYHJlZmVyZW5jZU9iamVjdGAgaXMgYW4gb2JqZWN0IHRoYXQgcHJvdmlkZXMgYW4gaW50ZXJmYWNlIGNvbXBhdGlibGUgd2l0aCBQb3BwZXIuanNcbiAqIGFuZCBsZXRzIHlvdSB1c2UgaXQgYXMgcmVwbGFjZW1lbnQgb2YgYSByZWFsIERPTSBub2RlLjxiciAvPlxuICogWW91IGNhbiB1c2UgdGhpcyBtZXRob2QgdG8gcG9zaXRpb24gYSBwb3BwZXIgcmVsYXRpdmVseSB0byBhIHNldCBvZiBjb29yZGluYXRlc1xuICogaW4gY2FzZSB5b3UgZG9uJ3QgaGF2ZSBhIERPTSBub2RlIHRvIHVzZSBhcyByZWZlcmVuY2UuXG4gKlxuICogYGBgXG4gKiBuZXcgUG9wcGVyKHJlZmVyZW5jZU9iamVjdCwgcG9wcGVyTm9kZSk7XG4gKiBgYGBcbiAqXG4gKiBOQjogVGhpcyBmZWF0dXJlIGlzbid0IHN1cHBvcnRlZCBpbiBJbnRlcm5ldCBFeHBsb3JlciAxMC5cbiAqIEBuYW1lIHJlZmVyZW5jZU9iamVjdFxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gZGF0YS5nZXRCb3VuZGluZ0NsaWVudFJlY3RcbiAqIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgc2V0IG9mIGNvb3JkaW5hdGVzIGNvbXBhdGlibGUgd2l0aCB0aGUgbmF0aXZlIGBnZXRCb3VuZGluZ0NsaWVudFJlY3RgIG1ldGhvZC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkYXRhLmNsaWVudFdpZHRoXG4gKiBBbiBFUzYgZ2V0dGVyIHRoYXQgd2lsbCByZXR1cm4gdGhlIHdpZHRoIG9mIHRoZSB2aXJ0dWFsIHJlZmVyZW5jZSBlbGVtZW50LlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGRhdGEuY2xpZW50SGVpZ2h0XG4gKiBBbiBFUzYgZ2V0dGVyIHRoYXQgd2lsbCByZXR1cm4gdGhlIGhlaWdodCBvZiB0aGUgdmlydHVhbCByZWZlcmVuY2UgZWxlbWVudC5cbiAqL1xuXG5cblBvcHBlci5VdGlscyA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IGdsb2JhbCkuUG9wcGVyVXRpbHM7XG5Qb3BwZXIucGxhY2VtZW50cyA9IHBsYWNlbWVudHM7XG5Qb3BwZXIuRGVmYXVsdHMgPSBEZWZhdWx0cztcblxuZXhwb3J0IGRlZmF1bHQgUG9wcGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cG9wcGVyLmpzLm1hcFxuIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4zLjEpOiBkcm9wZG93bi5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IFBvcHBlciBmcm9tICdwb3BwZXIuanMnXG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb25zdGFudHNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IE5BTUUgICAgICAgICAgICAgICAgICAgICA9ICdkcm9wZG93bidcbmNvbnN0IFZFUlNJT04gICAgICAgICAgICAgICAgICA9ICc0LjMuMSdcbmNvbnN0IERBVEFfS0VZICAgICAgICAgICAgICAgICA9ICdicy5kcm9wZG93bidcbmNvbnN0IEVWRU5UX0tFWSAgICAgICAgICAgICAgICA9IGAuJHtEQVRBX0tFWX1gXG5jb25zdCBEQVRBX0FQSV9LRVkgICAgICAgICAgICAgPSAnLmRhdGEtYXBpJ1xuY29uc3QgSlFVRVJZX05PX0NPTkZMSUNUICAgICAgID0gJC5mbltOQU1FXVxuY29uc3QgRVNDQVBFX0tFWUNPREUgICAgICAgICAgID0gMjcgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgRXNjYXBlIChFc2MpIGtleVxuY29uc3QgU1BBQ0VfS0VZQ09ERSAgICAgICAgICAgID0gMzIgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3Igc3BhY2Uga2V5XG5jb25zdCBUQUJfS0VZQ09ERSAgICAgICAgICAgICAgPSA5IC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIHRhYiBrZXlcbmNvbnN0IEFSUk9XX1VQX0tFWUNPREUgICAgICAgICA9IDM4IC8vIEtleWJvYXJkRXZlbnQud2hpY2ggdmFsdWUgZm9yIHVwIGFycm93IGtleVxuY29uc3QgQVJST1dfRE9XTl9LRVlDT0RFICAgICAgID0gNDAgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgZG93biBhcnJvdyBrZXlcbmNvbnN0IFJJR0hUX01PVVNFX0JVVFRPTl9XSElDSCA9IDMgLy8gTW91c2VFdmVudC53aGljaCB2YWx1ZSBmb3IgdGhlIHJpZ2h0IGJ1dHRvbiAoYXNzdW1pbmcgYSByaWdodC1oYW5kZWQgbW91c2UpXG5jb25zdCBSRUdFWFBfS0VZRE9XTiAgICAgICAgICAgPSBuZXcgUmVnRXhwKGAke0FSUk9XX1VQX0tFWUNPREV9fCR7QVJST1dfRE9XTl9LRVlDT0RFfXwke0VTQ0FQRV9LRVlDT0RFfWApXG5cbmNvbnN0IEV2ZW50ID0ge1xuICBISURFICAgICAgICAgICAgIDogYGhpZGUke0VWRU5UX0tFWX1gLFxuICBISURERU4gICAgICAgICAgIDogYGhpZGRlbiR7RVZFTlRfS0VZfWAsXG4gIFNIT1cgICAgICAgICAgICAgOiBgc2hvdyR7RVZFTlRfS0VZfWAsXG4gIFNIT1dOICAgICAgICAgICAgOiBgc2hvd24ke0VWRU5UX0tFWX1gLFxuICBDTElDSyAgICAgICAgICAgIDogYGNsaWNrJHtFVkVOVF9LRVl9YCxcbiAgQ0xJQ0tfREFUQV9BUEkgICA6IGBjbGljayR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWAsXG4gIEtFWURPV05fREFUQV9BUEkgOiBga2V5ZG93biR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWAsXG4gIEtFWVVQX0RBVEFfQVBJICAgOiBga2V5dXAke0VWRU5UX0tFWX0ke0RBVEFfQVBJX0tFWX1gXG59XG5cbmNvbnN0IENsYXNzTmFtZSA9IHtcbiAgRElTQUJMRUQgICAgICAgIDogJ2Rpc2FibGVkJyxcbiAgU0hPVyAgICAgICAgICAgIDogJ3Nob3cnLFxuICBEUk9QVVAgICAgICAgICAgOiAnZHJvcHVwJyxcbiAgRFJPUFJJR0hUICAgICAgIDogJ2Ryb3ByaWdodCcsXG4gIERST1BMRUZUICAgICAgICA6ICdkcm9wbGVmdCcsXG4gIE1FTlVSSUdIVCAgICAgICA6ICdkcm9wZG93bi1tZW51LXJpZ2h0JyxcbiAgTUVOVUxFRlQgICAgICAgIDogJ2Ryb3Bkb3duLW1lbnUtbGVmdCcsXG4gIFBPU0lUSU9OX1NUQVRJQyA6ICdwb3NpdGlvbi1zdGF0aWMnXG59XG5cbmNvbnN0IFNlbGVjdG9yID0ge1xuICBEQVRBX1RPR0dMRSAgIDogJ1tkYXRhLXRvZ2dsZT1cImRyb3Bkb3duXCJdJyxcbiAgRk9STV9DSElMRCAgICA6ICcuZHJvcGRvd24gZm9ybScsXG4gIE1FTlUgICAgICAgICAgOiAnLmRyb3Bkb3duLW1lbnUnLFxuICBOQVZCQVJfTkFWICAgIDogJy5uYXZiYXItbmF2JyxcbiAgVklTSUJMRV9JVEVNUyA6ICcuZHJvcGRvd24tbWVudSAuZHJvcGRvd24taXRlbTpub3QoLmRpc2FibGVkKTpub3QoOmRpc2FibGVkKSdcbn1cblxuY29uc3QgQXR0YWNobWVudE1hcCA9IHtcbiAgVE9QICAgICAgIDogJ3RvcC1zdGFydCcsXG4gIFRPUEVORCAgICA6ICd0b3AtZW5kJyxcbiAgQk9UVE9NICAgIDogJ2JvdHRvbS1zdGFydCcsXG4gIEJPVFRPTUVORCA6ICdib3R0b20tZW5kJyxcbiAgUklHSFQgICAgIDogJ3JpZ2h0LXN0YXJ0JyxcbiAgUklHSFRFTkQgIDogJ3JpZ2h0LWVuZCcsXG4gIExFRlQgICAgICA6ICdsZWZ0LXN0YXJ0JyxcbiAgTEVGVEVORCAgIDogJ2xlZnQtZW5kJ1xufVxuXG5jb25zdCBEZWZhdWx0ID0ge1xuICBvZmZzZXQgICAgOiAwLFxuICBmbGlwICAgICAgOiB0cnVlLFxuICBib3VuZGFyeSAgOiAnc2Nyb2xsUGFyZW50JyxcbiAgcmVmZXJlbmNlIDogJ3RvZ2dsZScsXG4gIGRpc3BsYXkgICA6ICdkeW5hbWljJ1xufVxuXG5jb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgb2Zmc2V0ICAgIDogJyhudW1iZXJ8c3RyaW5nfGZ1bmN0aW9uKScsXG4gIGZsaXAgICAgICA6ICdib29sZWFuJyxcbiAgYm91bmRhcnkgIDogJyhzdHJpbmd8ZWxlbWVudCknLFxuICByZWZlcmVuY2UgOiAnKHN0cmluZ3xlbGVtZW50KScsXG4gIGRpc3BsYXkgICA6ICdzdHJpbmcnXG59XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDbGFzcyBEZWZpbml0aW9uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jbGFzcyBEcm9wZG93biB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbmZpZykge1xuICAgIHRoaXMuX2VsZW1lbnQgID0gZWxlbWVudFxuICAgIHRoaXMuX3BvcHBlciAgID0gbnVsbFxuICAgIHRoaXMuX2NvbmZpZyAgID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZylcbiAgICB0aGlzLl9tZW51ICAgICA9IHRoaXMuX2dldE1lbnVFbGVtZW50KClcbiAgICB0aGlzLl9pbk5hdmJhciA9IHRoaXMuX2RldGVjdE5hdmJhcigpXG5cbiAgICB0aGlzLl9hZGRFdmVudExpc3RlbmVycygpXG4gIH1cblxuICAvLyBHZXR0ZXJzXG5cbiAgc3RhdGljIGdldCBWRVJTSU9OKCkge1xuICAgIHJldHVybiBWRVJTSU9OXG4gIH1cblxuICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgcmV0dXJuIERlZmF1bHRcbiAgfVxuXG4gIHN0YXRpYyBnZXQgRGVmYXVsdFR5cGUoKSB7XG4gICAgcmV0dXJuIERlZmF1bHRUeXBlXG4gIH1cblxuICAvLyBQdWJsaWNcblxuICB0b2dnbGUoKSB7XG4gICAgaWYgKHRoaXMuX2VsZW1lbnQuZGlzYWJsZWQgfHwgJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRElTQUJMRUQpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCBwYXJlbnQgICA9IERyb3Bkb3duLl9nZXRQYXJlbnRGcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KVxuICAgIGNvbnN0IGlzQWN0aXZlID0gJCh0aGlzLl9tZW51KS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVylcblxuICAgIERyb3Bkb3duLl9jbGVhck1lbnVzKClcblxuICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgcmVsYXRlZFRhcmdldCA9IHtcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6IHRoaXMuX2VsZW1lbnRcbiAgICB9XG4gICAgY29uc3Qgc2hvd0V2ZW50ID0gJC5FdmVudChFdmVudC5TSE9XLCByZWxhdGVkVGFyZ2V0KVxuXG4gICAgJChwYXJlbnQpLnRyaWdnZXIoc2hvd0V2ZW50KVxuXG4gICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgLy8gRGlzYWJsZSB0b3RhbGx5IFBvcHBlci5qcyBmb3IgRHJvcGRvd24gaW4gTmF2YmFyXG4gICAgaWYgKCF0aGlzLl9pbk5hdmJhcikge1xuICAgICAgLyoqXG4gICAgICAgKiBDaGVjayBmb3IgUG9wcGVyIGRlcGVuZGVuY3lcbiAgICAgICAqIFBvcHBlciAtIGh0dHBzOi8vcG9wcGVyLmpzLm9yZ1xuICAgICAgICovXG4gICAgICBpZiAodHlwZW9mIFBvcHBlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9vdHN0cmFwXFwncyBkcm9wZG93bnMgcmVxdWlyZSBQb3BwZXIuanMgKGh0dHBzOi8vcG9wcGVyLmpzLm9yZy8pJylcbiAgICAgIH1cblxuICAgICAgbGV0IHJlZmVyZW5jZUVsZW1lbnQgPSB0aGlzLl9lbGVtZW50XG5cbiAgICAgIGlmICh0aGlzLl9jb25maWcucmVmZXJlbmNlID09PSAncGFyZW50Jykge1xuICAgICAgICByZWZlcmVuY2VFbGVtZW50ID0gcGFyZW50XG4gICAgICB9IGVsc2UgaWYgKFV0aWwuaXNFbGVtZW50KHRoaXMuX2NvbmZpZy5yZWZlcmVuY2UpKSB7XG4gICAgICAgIHJlZmVyZW5jZUVsZW1lbnQgPSB0aGlzLl9jb25maWcucmVmZXJlbmNlXG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgaXQncyBqUXVlcnkgZWxlbWVudFxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2NvbmZpZy5yZWZlcmVuY2UuanF1ZXJ5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHJlZmVyZW5jZUVsZW1lbnQgPSB0aGlzLl9jb25maWcucmVmZXJlbmNlWzBdXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gSWYgYm91bmRhcnkgaXMgbm90IGBzY3JvbGxQYXJlbnRgLCB0aGVuIHNldCBwb3NpdGlvbiB0byBgc3RhdGljYFxuICAgICAgLy8gdG8gYWxsb3cgdGhlIG1lbnUgdG8gXCJlc2NhcGVcIiB0aGUgc2Nyb2xsIHBhcmVudCdzIGJvdW5kYXJpZXNcbiAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9pc3N1ZXMvMjQyNTFcbiAgICAgIGlmICh0aGlzLl9jb25maWcuYm91bmRhcnkgIT09ICdzY3JvbGxQYXJlbnQnKSB7XG4gICAgICAgICQocGFyZW50KS5hZGRDbGFzcyhDbGFzc05hbWUuUE9TSVRJT05fU1RBVElDKVxuICAgICAgfVxuICAgICAgdGhpcy5fcG9wcGVyID0gbmV3IFBvcHBlcihyZWZlcmVuY2VFbGVtZW50LCB0aGlzLl9tZW51LCB0aGlzLl9nZXRQb3BwZXJDb25maWcoKSlcbiAgICB9XG5cbiAgICAvLyBJZiB0aGlzIGlzIGEgdG91Y2gtZW5hYmxlZCBkZXZpY2Ugd2UgYWRkIGV4dHJhXG4gICAgLy8gZW1wdHkgbW91c2VvdmVyIGxpc3RlbmVycyB0byB0aGUgYm9keSdzIGltbWVkaWF0ZSBjaGlsZHJlbjtcbiAgICAvLyBvbmx5IG5lZWRlZCBiZWNhdXNlIG9mIGJyb2tlbiBldmVudCBkZWxlZ2F0aW9uIG9uIGlPU1xuICAgIC8vIGh0dHBzOi8vd3d3LnF1aXJrc21vZGUub3JnL2Jsb2cvYXJjaGl2ZXMvMjAxNC8wMi9tb3VzZV9ldmVudF9idWIuaHRtbFxuICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiZcbiAgICAgICAgJChwYXJlbnQpLmNsb3Nlc3QoU2VsZWN0b3IuTkFWQkFSX05BVikubGVuZ3RoID09PSAwKSB7XG4gICAgICAkKGRvY3VtZW50LmJvZHkpLmNoaWxkcmVuKCkub24oJ21vdXNlb3ZlcicsIG51bGwsICQubm9vcClcbiAgICB9XG5cbiAgICB0aGlzLl9lbGVtZW50LmZvY3VzKClcbiAgICB0aGlzLl9lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHRydWUpXG5cbiAgICAkKHRoaXMuX21lbnUpLnRvZ2dsZUNsYXNzKENsYXNzTmFtZS5TSE9XKVxuICAgICQocGFyZW50KVxuICAgICAgLnRvZ2dsZUNsYXNzKENsYXNzTmFtZS5TSE9XKVxuICAgICAgLnRyaWdnZXIoJC5FdmVudChFdmVudC5TSE9XTiwgcmVsYXRlZFRhcmdldCkpXG4gIH1cblxuICBzaG93KCkge1xuICAgIGlmICh0aGlzLl9lbGVtZW50LmRpc2FibGVkIHx8ICQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkRJU0FCTEVEKSB8fCAkKHRoaXMuX21lbnUpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgcmVsYXRlZFRhcmdldCA9IHtcbiAgICAgIHJlbGF0ZWRUYXJnZXQ6IHRoaXMuX2VsZW1lbnRcbiAgICB9XG4gICAgY29uc3Qgc2hvd0V2ZW50ID0gJC5FdmVudChFdmVudC5TSE9XLCByZWxhdGVkVGFyZ2V0KVxuICAgIGNvbnN0IHBhcmVudCA9IERyb3Bkb3duLl9nZXRQYXJlbnRGcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KVxuXG4gICAgJChwYXJlbnQpLnRyaWdnZXIoc2hvd0V2ZW50KVxuXG4gICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgJCh0aGlzLl9tZW51KS50b2dnbGVDbGFzcyhDbGFzc05hbWUuU0hPVylcbiAgICAkKHBhcmVudClcbiAgICAgIC50b2dnbGVDbGFzcyhDbGFzc05hbWUuU0hPVylcbiAgICAgIC50cmlnZ2VyKCQuRXZlbnQoRXZlbnQuU0hPV04sIHJlbGF0ZWRUYXJnZXQpKVxuICB9XG5cbiAgaGlkZSgpIHtcbiAgICBpZiAodGhpcy5fZWxlbWVudC5kaXNhYmxlZCB8fCAkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5ESVNBQkxFRCkgfHwgISQodGhpcy5fbWVudSkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCByZWxhdGVkVGFyZ2V0ID0ge1xuICAgICAgcmVsYXRlZFRhcmdldDogdGhpcy5fZWxlbWVudFxuICAgIH1cbiAgICBjb25zdCBoaWRlRXZlbnQgPSAkLkV2ZW50KEV2ZW50LkhJREUsIHJlbGF0ZWRUYXJnZXQpXG4gICAgY29uc3QgcGFyZW50ID0gRHJvcGRvd24uX2dldFBhcmVudEZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpXG5cbiAgICAkKHBhcmVudCkudHJpZ2dlcihoaWRlRXZlbnQpXG5cbiAgICBpZiAoaGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAkKHRoaXMuX21lbnUpLnRvZ2dsZUNsYXNzKENsYXNzTmFtZS5TSE9XKVxuICAgICQocGFyZW50KVxuICAgICAgLnRvZ2dsZUNsYXNzKENsYXNzTmFtZS5TSE9XKVxuICAgICAgLnRyaWdnZXIoJC5FdmVudChFdmVudC5ISURERU4sIHJlbGF0ZWRUYXJnZXQpKVxuICB9XG5cbiAgZGlzcG9zZSgpIHtcbiAgICAkLnJlbW92ZURhdGEodGhpcy5fZWxlbWVudCwgREFUQV9LRVkpXG4gICAgJCh0aGlzLl9lbGVtZW50KS5vZmYoRVZFTlRfS0VZKVxuICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsXG4gICAgdGhpcy5fbWVudSA9IG51bGxcbiAgICBpZiAodGhpcy5fcG9wcGVyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9wb3BwZXIuZGVzdHJveSgpXG4gICAgICB0aGlzLl9wb3BwZXIgPSBudWxsXG4gICAgfVxuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIHRoaXMuX2luTmF2YmFyID0gdGhpcy5fZGV0ZWN0TmF2YmFyKClcbiAgICBpZiAodGhpcy5fcG9wcGVyICE9PSBudWxsKSB7XG4gICAgICB0aGlzLl9wb3BwZXIuc2NoZWR1bGVVcGRhdGUoKVxuICAgIH1cbiAgfVxuXG4gIC8vIFByaXZhdGVcblxuICBfYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgJCh0aGlzLl9lbGVtZW50KS5vbihFdmVudC5DTElDSywgKGV2ZW50KSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxuICAgICAgdGhpcy50b2dnbGUoKVxuICAgIH0pXG4gIH1cblxuICBfZ2V0Q29uZmlnKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IHtcbiAgICAgIC4uLnRoaXMuY29uc3RydWN0b3IuRGVmYXVsdCxcbiAgICAgIC4uLiQodGhpcy5fZWxlbWVudCkuZGF0YSgpLFxuICAgICAgLi4uY29uZmlnXG4gICAgfVxuXG4gICAgVXRpbC50eXBlQ2hlY2tDb25maWcoXG4gICAgICBOQU1FLFxuICAgICAgY29uZmlnLFxuICAgICAgdGhpcy5jb25zdHJ1Y3Rvci5EZWZhdWx0VHlwZVxuICAgIClcblxuICAgIHJldHVybiBjb25maWdcbiAgfVxuXG4gIF9nZXRNZW51RWxlbWVudCgpIHtcbiAgICBpZiAoIXRoaXMuX21lbnUpIHtcbiAgICAgIGNvbnN0IHBhcmVudCA9IERyb3Bkb3duLl9nZXRQYXJlbnRGcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KVxuXG4gICAgICBpZiAocGFyZW50KSB7XG4gICAgICAgIHRoaXMuX21lbnUgPSBwYXJlbnQucXVlcnlTZWxlY3RvcihTZWxlY3Rvci5NRU5VKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fbWVudVxuICB9XG5cbiAgX2dldFBsYWNlbWVudCgpIHtcbiAgICBjb25zdCAkcGFyZW50RHJvcGRvd24gPSAkKHRoaXMuX2VsZW1lbnQucGFyZW50Tm9kZSlcbiAgICBsZXQgcGxhY2VtZW50ID0gQXR0YWNobWVudE1hcC5CT1RUT01cblxuICAgIC8vIEhhbmRsZSBkcm9wdXBcbiAgICBpZiAoJHBhcmVudERyb3Bkb3duLmhhc0NsYXNzKENsYXNzTmFtZS5EUk9QVVApKSB7XG4gICAgICBwbGFjZW1lbnQgPSBBdHRhY2htZW50TWFwLlRPUFxuICAgICAgaWYgKCQodGhpcy5fbWVudSkuaGFzQ2xhc3MoQ2xhc3NOYW1lLk1FTlVSSUdIVCkpIHtcbiAgICAgICAgcGxhY2VtZW50ID0gQXR0YWNobWVudE1hcC5UT1BFTkRcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCRwYXJlbnREcm9wZG93bi5oYXNDbGFzcyhDbGFzc05hbWUuRFJPUFJJR0hUKSkge1xuICAgICAgcGxhY2VtZW50ID0gQXR0YWNobWVudE1hcC5SSUdIVFxuICAgIH0gZWxzZSBpZiAoJHBhcmVudERyb3Bkb3duLmhhc0NsYXNzKENsYXNzTmFtZS5EUk9QTEVGVCkpIHtcbiAgICAgIHBsYWNlbWVudCA9IEF0dGFjaG1lbnRNYXAuTEVGVFxuICAgIH0gZWxzZSBpZiAoJCh0aGlzLl9tZW51KS5oYXNDbGFzcyhDbGFzc05hbWUuTUVOVVJJR0hUKSkge1xuICAgICAgcGxhY2VtZW50ID0gQXR0YWNobWVudE1hcC5CT1RUT01FTkRcbiAgICB9XG4gICAgcmV0dXJuIHBsYWNlbWVudFxuICB9XG5cbiAgX2RldGVjdE5hdmJhcigpIHtcbiAgICByZXR1cm4gJCh0aGlzLl9lbGVtZW50KS5jbG9zZXN0KCcubmF2YmFyJykubGVuZ3RoID4gMFxuICB9XG5cbiAgX2dldE9mZnNldCgpIHtcbiAgICBjb25zdCBvZmZzZXQgPSB7fVxuXG4gICAgaWYgKHR5cGVvZiB0aGlzLl9jb25maWcub2Zmc2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvZmZzZXQuZm4gPSAoZGF0YSkgPT4ge1xuICAgICAgICBkYXRhLm9mZnNldHMgPSB7XG4gICAgICAgICAgLi4uZGF0YS5vZmZzZXRzLFxuICAgICAgICAgIC4uLnRoaXMuX2NvbmZpZy5vZmZzZXQoZGF0YS5vZmZzZXRzLCB0aGlzLl9lbGVtZW50KSB8fCB7fVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRhdGFcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgb2Zmc2V0Lm9mZnNldCA9IHRoaXMuX2NvbmZpZy5vZmZzZXRcbiAgICB9XG5cbiAgICByZXR1cm4gb2Zmc2V0XG4gIH1cblxuICBfZ2V0UG9wcGVyQ29uZmlnKCkge1xuICAgIGNvbnN0IHBvcHBlckNvbmZpZyA9IHtcbiAgICAgIHBsYWNlbWVudDogdGhpcy5fZ2V0UGxhY2VtZW50KCksXG4gICAgICBtb2RpZmllcnM6IHtcbiAgICAgICAgb2Zmc2V0OiB0aGlzLl9nZXRPZmZzZXQoKSxcbiAgICAgICAgZmxpcDoge1xuICAgICAgICAgIGVuYWJsZWQ6IHRoaXMuX2NvbmZpZy5mbGlwXG4gICAgICAgIH0sXG4gICAgICAgIHByZXZlbnRPdmVyZmxvdzoge1xuICAgICAgICAgIGJvdW5kYXJpZXNFbGVtZW50OiB0aGlzLl9jb25maWcuYm91bmRhcnlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIERpc2FibGUgUG9wcGVyLmpzIGlmIHdlIGhhdmUgYSBzdGF0aWMgZGlzcGxheVxuICAgIGlmICh0aGlzLl9jb25maWcuZGlzcGxheSA9PT0gJ3N0YXRpYycpIHtcbiAgICAgIHBvcHBlckNvbmZpZy5tb2RpZmllcnMuYXBwbHlTdHlsZSA9IHtcbiAgICAgICAgZW5hYmxlZDogZmFsc2VcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcG9wcGVyQ29uZmlnXG4gIH1cblxuICAvLyBTdGF0aWNcblxuICBzdGF0aWMgX2pRdWVyeUludGVyZmFjZShjb25maWcpIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBkYXRhID0gJCh0aGlzKS5kYXRhKERBVEFfS0VZKVxuICAgICAgY29uc3QgX2NvbmZpZyA9IHR5cGVvZiBjb25maWcgPT09ICdvYmplY3QnID8gY29uZmlnIDogbnVsbFxuXG4gICAgICBpZiAoIWRhdGEpIHtcbiAgICAgICAgZGF0YSA9IG5ldyBEcm9wZG93bih0aGlzLCBfY29uZmlnKVxuICAgICAgICAkKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApXG4gICAgICAgIH1cbiAgICAgICAgZGF0YVtjb25maWddKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgc3RhdGljIF9jbGVhck1lbnVzKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50ICYmIChldmVudC53aGljaCA9PT0gUklHSFRfTU9VU0VfQlVUVE9OX1dISUNIIHx8XG4gICAgICBldmVudC50eXBlID09PSAna2V5dXAnICYmIGV2ZW50LndoaWNoICE9PSBUQUJfS0VZQ09ERSkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHRvZ2dsZXMgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuREFUQV9UT0dHTEUpKVxuXG4gICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHRvZ2dsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNvbnN0IHBhcmVudCA9IERyb3Bkb3duLl9nZXRQYXJlbnRGcm9tRWxlbWVudCh0b2dnbGVzW2ldKVxuICAgICAgY29uc3QgY29udGV4dCA9ICQodG9nZ2xlc1tpXSkuZGF0YShEQVRBX0tFWSlcbiAgICAgIGNvbnN0IHJlbGF0ZWRUYXJnZXQgPSB7XG4gICAgICAgIHJlbGF0ZWRUYXJnZXQ6IHRvZ2dsZXNbaV1cbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50ICYmIGV2ZW50LnR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgICAgcmVsYXRlZFRhcmdldC5jbGlja0V2ZW50ID0gZXZlbnRcbiAgICAgIH1cblxuICAgICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRyb3Bkb3duTWVudSA9IGNvbnRleHQuX21lbnVcbiAgICAgIGlmICghJChwYXJlbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5TSE9XKSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQgJiYgKGV2ZW50LnR5cGUgPT09ICdjbGljaycgJiZcbiAgICAgICAgICAvaW5wdXR8dGV4dGFyZWEvaS50ZXN0KGV2ZW50LnRhcmdldC50YWdOYW1lKSB8fCBldmVudC50eXBlID09PSAna2V5dXAnICYmIGV2ZW50LndoaWNoID09PSBUQUJfS0VZQ09ERSkgJiZcbiAgICAgICAgICAkLmNvbnRhaW5zKHBhcmVudCwgZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICBjb25zdCBoaWRlRXZlbnQgPSAkLkV2ZW50KEV2ZW50LkhJREUsIHJlbGF0ZWRUYXJnZXQpXG4gICAgICAkKHBhcmVudCkudHJpZ2dlcihoaWRlRXZlbnQpXG4gICAgICBpZiAoaGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIElmIHRoaXMgaXMgYSB0b3VjaC1lbmFibGVkIGRldmljZSB3ZSByZW1vdmUgdGhlIGV4dHJhXG4gICAgICAvLyBlbXB0eSBtb3VzZW92ZXIgbGlzdGVuZXJzIHdlIGFkZGVkIGZvciBpT1Mgc3VwcG9ydFxuICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICAkKGRvY3VtZW50LmJvZHkpLmNoaWxkcmVuKCkub2ZmKCdtb3VzZW92ZXInLCBudWxsLCAkLm5vb3ApXG4gICAgICB9XG5cbiAgICAgIHRvZ2dsZXNbaV0uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJylcblxuICAgICAgJChkcm9wZG93bk1lbnUpLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKVxuICAgICAgJChwYXJlbnQpXG4gICAgICAgIC5yZW1vdmVDbGFzcyhDbGFzc05hbWUuU0hPVylcbiAgICAgICAgLnRyaWdnZXIoJC5FdmVudChFdmVudC5ISURERU4sIHJlbGF0ZWRUYXJnZXQpKVxuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBfZ2V0UGFyZW50RnJvbUVsZW1lbnQoZWxlbWVudCkge1xuICAgIGxldCBwYXJlbnRcbiAgICBjb25zdCBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudChlbGVtZW50KVxuXG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICBwYXJlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuICAgIH1cblxuICAgIHJldHVybiBwYXJlbnQgfHwgZWxlbWVudC5wYXJlbnROb2RlXG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29tcGxleGl0eVxuICBzdGF0aWMgX2RhdGFBcGlLZXlkb3duSGFuZGxlcihldmVudCkge1xuICAgIC8vIElmIG5vdCBpbnB1dC90ZXh0YXJlYTpcbiAgICAvLyAgLSBBbmQgbm90IGEga2V5IGluIFJFR0VYUF9LRVlET1dOID0+IG5vdCBhIGRyb3Bkb3duIGNvbW1hbmRcbiAgICAvLyBJZiBpbnB1dC90ZXh0YXJlYTpcbiAgICAvLyAgLSBJZiBzcGFjZSBrZXkgPT4gbm90IGEgZHJvcGRvd24gY29tbWFuZFxuICAgIC8vICAtIElmIGtleSBpcyBvdGhlciB0aGFuIGVzY2FwZVxuICAgIC8vICAgIC0gSWYga2V5IGlzIG5vdCB1cCBvciBkb3duID0+IG5vdCBhIGRyb3Bkb3duIGNvbW1hbmRcbiAgICAvLyAgICAtIElmIHRyaWdnZXIgaW5zaWRlIHRoZSBtZW51ID0+IG5vdCBhIGRyb3Bkb3duIGNvbW1hbmRcbiAgICBpZiAoL2lucHV0fHRleHRhcmVhL2kudGVzdChldmVudC50YXJnZXQudGFnTmFtZSlcbiAgICAgID8gZXZlbnQud2hpY2ggPT09IFNQQUNFX0tFWUNPREUgfHwgZXZlbnQud2hpY2ggIT09IEVTQ0FQRV9LRVlDT0RFICYmXG4gICAgICAoZXZlbnQud2hpY2ggIT09IEFSUk9XX0RPV05fS0VZQ09ERSAmJiBldmVudC53aGljaCAhPT0gQVJST1dfVVBfS0VZQ09ERSB8fFxuICAgICAgICAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdChTZWxlY3Rvci5NRU5VKS5sZW5ndGgpIDogIVJFR0VYUF9LRVlET1dOLnRlc3QoZXZlbnQud2hpY2gpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcblxuICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICQodGhpcykuaGFzQ2xhc3MoQ2xhc3NOYW1lLkRJU0FCTEVEKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgcGFyZW50ICAgPSBEcm9wZG93bi5fZ2V0UGFyZW50RnJvbUVsZW1lbnQodGhpcylcbiAgICBjb25zdCBpc0FjdGl2ZSA9ICQocGFyZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVylcblxuICAgIGlmICghaXNBY3RpdmUgfHwgaXNBY3RpdmUgJiYgKGV2ZW50LndoaWNoID09PSBFU0NBUEVfS0VZQ09ERSB8fCBldmVudC53aGljaCA9PT0gU1BBQ0VfS0VZQ09ERSkpIHtcbiAgICAgIGlmIChldmVudC53aGljaCA9PT0gRVNDQVBFX0tFWUNPREUpIHtcbiAgICAgICAgY29uc3QgdG9nZ2xlID0gcGFyZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuREFUQV9UT0dHTEUpXG4gICAgICAgICQodG9nZ2xlKS50cmlnZ2VyKCdmb2N1cycpXG4gICAgICB9XG5cbiAgICAgICQodGhpcykudHJpZ2dlcignY2xpY2snKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29uc3QgaXRlbXMgPSBbXS5zbGljZS5jYWxsKHBhcmVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLlZJU0lCTEVfSVRFTVMpKVxuXG4gICAgaWYgKGl0ZW1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbGV0IGluZGV4ID0gaXRlbXMuaW5kZXhPZihldmVudC50YXJnZXQpXG5cbiAgICBpZiAoZXZlbnQud2hpY2ggPT09IEFSUk9XX1VQX0tFWUNPREUgJiYgaW5kZXggPiAwKSB7IC8vIFVwXG4gICAgICBpbmRleC0tXG4gICAgfVxuXG4gICAgaWYgKGV2ZW50LndoaWNoID09PSBBUlJPV19ET1dOX0tFWUNPREUgJiYgaW5kZXggPCBpdGVtcy5sZW5ndGggLSAxKSB7IC8vIERvd25cbiAgICAgIGluZGV4KytcbiAgICB9XG5cbiAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICBpbmRleCA9IDBcbiAgICB9XG5cbiAgICBpdGVtc1tpbmRleF0uZm9jdXMoKVxuICB9XG59XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBEYXRhIEFwaSBpbXBsZW1lbnRhdGlvblxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJChkb2N1bWVudClcbiAgLm9uKEV2ZW50LktFWURPV05fREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfVE9HR0xFLCBEcm9wZG93bi5fZGF0YUFwaUtleWRvd25IYW5kbGVyKVxuICAub24oRXZlbnQuS0VZRE9XTl9EQVRBX0FQSSwgU2VsZWN0b3IuTUVOVSwgRHJvcGRvd24uX2RhdGFBcGlLZXlkb3duSGFuZGxlcilcbiAgLm9uKGAke0V2ZW50LkNMSUNLX0RBVEFfQVBJfSAke0V2ZW50LktFWVVQX0RBVEFfQVBJfWAsIERyb3Bkb3duLl9jbGVhck1lbnVzKVxuICAub24oRXZlbnQuQ0xJQ0tfREFUQV9BUEksIFNlbGVjdG9yLkRBVEFfVE9HR0xFLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICBEcm9wZG93bi5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJCh0aGlzKSwgJ3RvZ2dsZScpXG4gIH0pXG4gIC5vbihFdmVudC5DTElDS19EQVRBX0FQSSwgU2VsZWN0b3IuRk9STV9DSElMRCwgKGUpID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gIH0pXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBqUXVlcnlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbiQuZm5bTkFNRV0gPSBEcm9wZG93bi5falF1ZXJ5SW50ZXJmYWNlXG4kLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gRHJvcGRvd25cbiQuZm5bTkFNRV0ubm9Db25mbGljdCA9ICgpID0+IHtcbiAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVFxuICByZXR1cm4gRHJvcGRvd24uX2pRdWVyeUludGVyZmFjZVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IERyb3Bkb3duXG4iLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgKHY0LjMuMSk6IG1vZGFsLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb25zdGFudHNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IE5BTUUgICAgICAgICAgICAgICA9ICdtb2RhbCdcbmNvbnN0IFZFUlNJT04gICAgICAgICAgICA9ICc0LjMuMSdcbmNvbnN0IERBVEFfS0VZICAgICAgICAgICA9ICdicy5tb2RhbCdcbmNvbnN0IEVWRU5UX0tFWSAgICAgICAgICA9IGAuJHtEQVRBX0tFWX1gXG5jb25zdCBEQVRBX0FQSV9LRVkgICAgICAgPSAnLmRhdGEtYXBpJ1xuY29uc3QgSlFVRVJZX05PX0NPTkZMSUNUID0gJC5mbltOQU1FXVxuY29uc3QgRVNDQVBFX0tFWUNPREUgICAgID0gMjcgLy8gS2V5Ym9hcmRFdmVudC53aGljaCB2YWx1ZSBmb3IgRXNjYXBlIChFc2MpIGtleVxuXG5jb25zdCBEZWZhdWx0ID0ge1xuICBiYWNrZHJvcCA6IHRydWUsXG4gIGtleWJvYXJkIDogdHJ1ZSxcbiAgZm9jdXMgICAgOiB0cnVlLFxuICBzaG93ICAgICA6IHRydWVcbn1cblxuY29uc3QgRGVmYXVsdFR5cGUgPSB7XG4gIGJhY2tkcm9wIDogJyhib29sZWFufHN0cmluZyknLFxuICBrZXlib2FyZCA6ICdib29sZWFuJyxcbiAgZm9jdXMgICAgOiAnYm9vbGVhbicsXG4gIHNob3cgICAgIDogJ2Jvb2xlYW4nXG59XG5cbmNvbnN0IEV2ZW50ID0ge1xuICBISURFICAgICAgICAgICAgICA6IGBoaWRlJHtFVkVOVF9LRVl9YCxcbiAgSElEREVOICAgICAgICAgICAgOiBgaGlkZGVuJHtFVkVOVF9LRVl9YCxcbiAgU0hPVyAgICAgICAgICAgICAgOiBgc2hvdyR7RVZFTlRfS0VZfWAsXG4gIFNIT1dOICAgICAgICAgICAgIDogYHNob3duJHtFVkVOVF9LRVl9YCxcbiAgRk9DVVNJTiAgICAgICAgICAgOiBgZm9jdXNpbiR7RVZFTlRfS0VZfWAsXG4gIFJFU0laRSAgICAgICAgICAgIDogYHJlc2l6ZSR7RVZFTlRfS0VZfWAsXG4gIENMSUNLX0RJU01JU1MgICAgIDogYGNsaWNrLmRpc21pc3Mke0VWRU5UX0tFWX1gLFxuICBLRVlET1dOX0RJU01JU1MgICA6IGBrZXlkb3duLmRpc21pc3Mke0VWRU5UX0tFWX1gLFxuICBNT1VTRVVQX0RJU01JU1MgICA6IGBtb3VzZXVwLmRpc21pc3Mke0VWRU5UX0tFWX1gLFxuICBNT1VTRURPV05fRElTTUlTUyA6IGBtb3VzZWRvd24uZGlzbWlzcyR7RVZFTlRfS0VZfWAsXG4gIENMSUNLX0RBVEFfQVBJICAgIDogYGNsaWNrJHtFVkVOVF9LRVl9JHtEQVRBX0FQSV9LRVl9YFxufVxuXG5jb25zdCBDbGFzc05hbWUgPSB7XG4gIFNDUk9MTEFCTEUgICAgICAgICA6ICdtb2RhbC1kaWFsb2ctc2Nyb2xsYWJsZScsXG4gIFNDUk9MTEJBUl9NRUFTVVJFUiA6ICdtb2RhbC1zY3JvbGxiYXItbWVhc3VyZScsXG4gIEJBQ0tEUk9QICAgICAgICAgICA6ICdtb2RhbC1iYWNrZHJvcCcsXG4gIE9QRU4gICAgICAgICAgICAgICA6ICdtb2RhbC1vcGVuJyxcbiAgRkFERSAgICAgICAgICAgICAgIDogJ2ZhZGUnLFxuICBTSE9XICAgICAgICAgICAgICAgOiAnc2hvdydcbn1cblxuY29uc3QgU2VsZWN0b3IgPSB7XG4gIERJQUxPRyAgICAgICAgIDogJy5tb2RhbC1kaWFsb2cnLFxuICBNT0RBTF9CT0RZICAgICA6ICcubW9kYWwtYm9keScsXG4gIERBVEFfVE9HR0xFICAgIDogJ1tkYXRhLXRvZ2dsZT1cIm1vZGFsXCJdJyxcbiAgREFUQV9ESVNNSVNTICAgOiAnW2RhdGEtZGlzbWlzcz1cIm1vZGFsXCJdJyxcbiAgRklYRURfQ09OVEVOVCAgOiAnLmZpeGVkLXRvcCwgLmZpeGVkLWJvdHRvbSwgLmlzLWZpeGVkLCAuc3RpY2t5LXRvcCcsXG4gIFNUSUNLWV9DT05URU5UIDogJy5zdGlja3ktdG9wJ1xufVxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2xhc3MgRGVmaW5pdGlvblxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY2xhc3MgTW9kYWwge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb25maWcpIHtcbiAgICB0aGlzLl9jb25maWcgICAgICAgICAgICAgID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZylcbiAgICB0aGlzLl9lbGVtZW50ICAgICAgICAgICAgID0gZWxlbWVudFxuICAgIHRoaXMuX2RpYWxvZyAgICAgICAgICAgICAgPSBlbGVtZW50LnF1ZXJ5U2VsZWN0b3IoU2VsZWN0b3IuRElBTE9HKVxuICAgIHRoaXMuX2JhY2tkcm9wICAgICAgICAgICAgPSBudWxsXG4gICAgdGhpcy5faXNTaG93biAgICAgICAgICAgICA9IGZhbHNlXG4gICAgdGhpcy5faXNCb2R5T3ZlcmZsb3dpbmcgICA9IGZhbHNlXG4gICAgdGhpcy5faWdub3JlQmFja2Ryb3BDbGljayA9IGZhbHNlXG4gICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nICAgICA9IGZhbHNlXG4gICAgdGhpcy5fc2Nyb2xsYmFyV2lkdGggICAgICA9IDBcbiAgfVxuXG4gIC8vIEdldHRlcnNcblxuICBzdGF0aWMgZ2V0IFZFUlNJT04oKSB7XG4gICAgcmV0dXJuIFZFUlNJT05cbiAgfVxuXG4gIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFxuICB9XG5cbiAgLy8gUHVibGljXG5cbiAgdG9nZ2xlKHJlbGF0ZWRUYXJnZXQpIHtcbiAgICByZXR1cm4gdGhpcy5faXNTaG93biA/IHRoaXMuaGlkZSgpIDogdGhpcy5zaG93KHJlbGF0ZWRUYXJnZXQpXG4gIH1cblxuICBzaG93KHJlbGF0ZWRUYXJnZXQpIHtcbiAgICBpZiAodGhpcy5faXNTaG93biB8fCB0aGlzLl9pc1RyYW5zaXRpb25pbmcpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICgkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKSkge1xuICAgICAgdGhpcy5faXNUcmFuc2l0aW9uaW5nID0gdHJ1ZVxuICAgIH1cblxuICAgIGNvbnN0IHNob3dFdmVudCA9ICQuRXZlbnQoRXZlbnQuU0hPVywge1xuICAgICAgcmVsYXRlZFRhcmdldFxuICAgIH0pXG5cbiAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc2hvd0V2ZW50KVxuXG4gICAgaWYgKHRoaXMuX2lzU2hvd24gfHwgc2hvd0V2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLl9pc1Nob3duID0gdHJ1ZVxuXG4gICAgdGhpcy5fY2hlY2tTY3JvbGxiYXIoKVxuICAgIHRoaXMuX3NldFNjcm9sbGJhcigpXG5cbiAgICB0aGlzLl9hZGp1c3REaWFsb2coKVxuXG4gICAgdGhpcy5fc2V0RXNjYXBlRXZlbnQoKVxuICAgIHRoaXMuX3NldFJlc2l6ZUV2ZW50KClcblxuICAgICQodGhpcy5fZWxlbWVudCkub24oXG4gICAgICBFdmVudC5DTElDS19ESVNNSVNTLFxuICAgICAgU2VsZWN0b3IuREFUQV9ESVNNSVNTLFxuICAgICAgKGV2ZW50KSA9PiB0aGlzLmhpZGUoZXZlbnQpXG4gICAgKVxuXG4gICAgJCh0aGlzLl9kaWFsb2cpLm9uKEV2ZW50Lk1PVVNFRE9XTl9ESVNNSVNTLCAoKSA9PiB7XG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLm9uZShFdmVudC5NT1VTRVVQX0RJU01JU1MsIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmlzKHRoaXMuX2VsZW1lbnQpKSB7XG4gICAgICAgICAgdGhpcy5faWdub3JlQmFja2Ryb3BDbGljayA9IHRydWVcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9KVxuXG4gICAgdGhpcy5fc2hvd0JhY2tkcm9wKCgpID0+IHRoaXMuX3Nob3dFbGVtZW50KHJlbGF0ZWRUYXJnZXQpKVxuICB9XG5cbiAgaGlkZShldmVudCkge1xuICAgIGlmIChldmVudCkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cblxuICAgIGlmICghdGhpcy5faXNTaG93biB8fCB0aGlzLl9pc1RyYW5zaXRpb25pbmcpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IGhpZGVFdmVudCA9ICQuRXZlbnQoRXZlbnQuSElERSlcblxuICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihoaWRlRXZlbnQpXG5cbiAgICBpZiAoIXRoaXMuX2lzU2hvd24gfHwgaGlkZUV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICB0aGlzLl9pc1Nob3duID0gZmFsc2VcbiAgICBjb25zdCB0cmFuc2l0aW9uID0gJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSlcblxuICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICB0aGlzLl9pc1RyYW5zaXRpb25pbmcgPSB0cnVlXG4gICAgfVxuXG4gICAgdGhpcy5fc2V0RXNjYXBlRXZlbnQoKVxuICAgIHRoaXMuX3NldFJlc2l6ZUV2ZW50KClcblxuICAgICQoZG9jdW1lbnQpLm9mZihFdmVudC5GT0NVU0lOKVxuXG4gICAgJCh0aGlzLl9lbGVtZW50KS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuU0hPVylcblxuICAgICQodGhpcy5fZWxlbWVudCkub2ZmKEV2ZW50LkNMSUNLX0RJU01JU1MpXG4gICAgJCh0aGlzLl9kaWFsb2cpLm9mZihFdmVudC5NT1VTRURPV05fRElTTUlTUylcblxuXG4gICAgaWYgKHRyYW5zaXRpb24pIHtcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25EdXJhdGlvbiAgPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KHRoaXMuX2VsZW1lbnQpXG5cbiAgICAgICQodGhpcy5fZWxlbWVudClcbiAgICAgICAgLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCAoZXZlbnQpID0+IHRoaXMuX2hpZGVNb2RhbChldmVudCkpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRHVyYXRpb24pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2hpZGVNb2RhbCgpXG4gICAgfVxuICB9XG5cbiAgZGlzcG9zZSgpIHtcbiAgICBbd2luZG93LCB0aGlzLl9lbGVtZW50LCB0aGlzLl9kaWFsb2ddXG4gICAgICAuZm9yRWFjaCgoaHRtbEVsZW1lbnQpID0+ICQoaHRtbEVsZW1lbnQpLm9mZihFVkVOVF9LRVkpKVxuXG4gICAgLyoqXG4gICAgICogYGRvY3VtZW50YCBoYXMgMiBldmVudHMgYEV2ZW50LkZPQ1VTSU5gIGFuZCBgRXZlbnQuQ0xJQ0tfREFUQV9BUElgXG4gICAgICogRG8gbm90IG1vdmUgYGRvY3VtZW50YCBpbiBgaHRtbEVsZW1lbnRzYCBhcnJheVxuICAgICAqIEl0IHdpbGwgcmVtb3ZlIGBFdmVudC5DTElDS19EQVRBX0FQSWAgZXZlbnQgdGhhdCBzaG91bGQgcmVtYWluXG4gICAgICovXG4gICAgJChkb2N1bWVudCkub2ZmKEV2ZW50LkZPQ1VTSU4pXG5cbiAgICAkLnJlbW92ZURhdGEodGhpcy5fZWxlbWVudCwgREFUQV9LRVkpXG5cbiAgICB0aGlzLl9jb25maWcgICAgICAgICAgICAgID0gbnVsbFxuICAgIHRoaXMuX2VsZW1lbnQgICAgICAgICAgICAgPSBudWxsXG4gICAgdGhpcy5fZGlhbG9nICAgICAgICAgICAgICA9IG51bGxcbiAgICB0aGlzLl9iYWNrZHJvcCAgICAgICAgICAgID0gbnVsbFxuICAgIHRoaXMuX2lzU2hvd24gICAgICAgICAgICAgPSBudWxsXG4gICAgdGhpcy5faXNCb2R5T3ZlcmZsb3dpbmcgICA9IG51bGxcbiAgICB0aGlzLl9pZ25vcmVCYWNrZHJvcENsaWNrID0gbnVsbFxuICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyAgICAgPSBudWxsXG4gICAgdGhpcy5fc2Nyb2xsYmFyV2lkdGggICAgICA9IG51bGxcbiAgfVxuXG4gIGhhbmRsZVVwZGF0ZSgpIHtcbiAgICB0aGlzLl9hZGp1c3REaWFsb2coKVxuICB9XG5cbiAgLy8gUHJpdmF0ZVxuXG4gIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgLi4uRGVmYXVsdCxcbiAgICAgIC4uLmNvbmZpZ1xuICAgIH1cbiAgICBVdGlsLnR5cGVDaGVja0NvbmZpZyhOQU1FLCBjb25maWcsIERlZmF1bHRUeXBlKVxuICAgIHJldHVybiBjb25maWdcbiAgfVxuXG4gIF9zaG93RWxlbWVudChyZWxhdGVkVGFyZ2V0KSB7XG4gICAgY29uc3QgdHJhbnNpdGlvbiA9ICQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZBREUpXG5cbiAgICBpZiAoIXRoaXMuX2VsZW1lbnQucGFyZW50Tm9kZSB8fFxuICAgICAgICB0aGlzLl9lbGVtZW50LnBhcmVudE5vZGUubm9kZVR5cGUgIT09IE5vZGUuRUxFTUVOVF9OT0RFKSB7XG4gICAgICAvLyBEb24ndCBtb3ZlIG1vZGFsJ3MgRE9NIHBvc2l0aW9uXG4gICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuX2VsZW1lbnQpXG4gICAgfVxuXG4gICAgdGhpcy5fZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpXG4gICAgdGhpcy5fZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbW9kYWwnLCB0cnVlKVxuXG4gICAgaWYgKCQodGhpcy5fZGlhbG9nKS5oYXNDbGFzcyhDbGFzc05hbWUuU0NST0xMQUJMRSkpIHtcbiAgICAgIHRoaXMuX2RpYWxvZy5xdWVyeVNlbGVjdG9yKFNlbGVjdG9yLk1PREFMX0JPRFkpLnNjcm9sbFRvcCA9IDBcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZWxlbWVudC5zY3JvbGxUb3AgPSAwXG4gICAgfVxuXG4gICAgaWYgKHRyYW5zaXRpb24pIHtcbiAgICAgIFV0aWwucmVmbG93KHRoaXMuX2VsZW1lbnQpXG4gICAgfVxuXG4gICAgJCh0aGlzLl9lbGVtZW50KS5hZGRDbGFzcyhDbGFzc05hbWUuU0hPVylcblxuICAgIGlmICh0aGlzLl9jb25maWcuZm9jdXMpIHtcbiAgICAgIHRoaXMuX2VuZm9yY2VGb2N1cygpXG4gICAgfVxuXG4gICAgY29uc3Qgc2hvd25FdmVudCA9ICQuRXZlbnQoRXZlbnQuU0hPV04sIHtcbiAgICAgIHJlbGF0ZWRUYXJnZXRcbiAgICB9KVxuXG4gICAgY29uc3QgdHJhbnNpdGlvbkNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5mb2N1cykge1xuICAgICAgICB0aGlzLl9lbGVtZW50LmZvY3VzKClcbiAgICAgIH1cbiAgICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IGZhbHNlXG4gICAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc2hvd25FdmVudClcbiAgICB9XG5cbiAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgY29uc3QgdHJhbnNpdGlvbkR1cmF0aW9uICA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGhpcy5fZGlhbG9nKVxuXG4gICAgICAkKHRoaXMuX2RpYWxvZylcbiAgICAgICAgLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCB0cmFuc2l0aW9uQ29tcGxldGUpXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRHVyYXRpb24pXG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zaXRpb25Db21wbGV0ZSgpXG4gICAgfVxuICB9XG5cbiAgX2VuZm9yY2VGb2N1cygpIHtcbiAgICAkKGRvY3VtZW50KVxuICAgICAgLm9mZihFdmVudC5GT0NVU0lOKSAvLyBHdWFyZCBhZ2FpbnN0IGluZmluaXRlIGZvY3VzIGxvb3BcbiAgICAgIC5vbihFdmVudC5GT0NVU0lOLCAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGRvY3VtZW50ICE9PSBldmVudC50YXJnZXQgJiZcbiAgICAgICAgICAgIHRoaXMuX2VsZW1lbnQgIT09IGV2ZW50LnRhcmdldCAmJlxuICAgICAgICAgICAgJCh0aGlzLl9lbGVtZW50KS5oYXMoZXZlbnQudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50LmZvY3VzKClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgfVxuXG4gIF9zZXRFc2NhcGVFdmVudCgpIHtcbiAgICBpZiAodGhpcy5faXNTaG93biAmJiB0aGlzLl9jb25maWcua2V5Ym9hcmQpIHtcbiAgICAgICQodGhpcy5fZWxlbWVudCkub24oRXZlbnQuS0VZRE9XTl9ESVNNSVNTLCAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSBFU0NBUEVfS0VZQ09ERSkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICB0aGlzLmhpZGUoKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH0gZWxzZSBpZiAoIXRoaXMuX2lzU2hvd24pIHtcbiAgICAgICQodGhpcy5fZWxlbWVudCkub2ZmKEV2ZW50LktFWURPV05fRElTTUlTUylcbiAgICB9XG4gIH1cblxuICBfc2V0UmVzaXplRXZlbnQoKSB7XG4gICAgaWYgKHRoaXMuX2lzU2hvd24pIHtcbiAgICAgICQod2luZG93KS5vbihFdmVudC5SRVNJWkUsIChldmVudCkgPT4gdGhpcy5oYW5kbGVVcGRhdGUoZXZlbnQpKVxuICAgIH0gZWxzZSB7XG4gICAgICAkKHdpbmRvdykub2ZmKEV2ZW50LlJFU0laRSlcbiAgICB9XG4gIH1cblxuICBfaGlkZU1vZGFsKCkge1xuICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIHRoaXMuX2VsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpXG4gICAgdGhpcy5fZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtbW9kYWwnKVxuICAgIHRoaXMuX2lzVHJhbnNpdGlvbmluZyA9IGZhbHNlXG4gICAgdGhpcy5fc2hvd0JhY2tkcm9wKCgpID0+IHtcbiAgICAgICQoZG9jdW1lbnQuYm9keSkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLk9QRU4pXG4gICAgICB0aGlzLl9yZXNldEFkanVzdG1lbnRzKClcbiAgICAgIHRoaXMuX3Jlc2V0U2Nyb2xsYmFyKClcbiAgICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihFdmVudC5ISURERU4pXG4gICAgfSlcbiAgfVxuXG4gIF9yZW1vdmVCYWNrZHJvcCgpIHtcbiAgICBpZiAodGhpcy5fYmFja2Ryb3ApIHtcbiAgICAgICQodGhpcy5fYmFja2Ryb3ApLnJlbW92ZSgpXG4gICAgICB0aGlzLl9iYWNrZHJvcCA9IG51bGxcbiAgICB9XG4gIH1cblxuICBfc2hvd0JhY2tkcm9wKGNhbGxiYWNrKSB7XG4gICAgY29uc3QgYW5pbWF0ZSA9ICQodGhpcy5fZWxlbWVudCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZBREUpXG4gICAgICA/IENsYXNzTmFtZS5GQURFIDogJydcblxuICAgIGlmICh0aGlzLl9pc1Nob3duICYmIHRoaXMuX2NvbmZpZy5iYWNrZHJvcCkge1xuICAgICAgdGhpcy5fYmFja2Ryb3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgdGhpcy5fYmFja2Ryb3AuY2xhc3NOYW1lID0gQ2xhc3NOYW1lLkJBQ0tEUk9QXG5cbiAgICAgIGlmIChhbmltYXRlKSB7XG4gICAgICAgIHRoaXMuX2JhY2tkcm9wLmNsYXNzTGlzdC5hZGQoYW5pbWF0ZSlcbiAgICAgIH1cblxuICAgICAgJCh0aGlzLl9iYWNrZHJvcCkuYXBwZW5kVG8oZG9jdW1lbnQuYm9keSlcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KS5vbihFdmVudC5DTElDS19ESVNNSVNTLCAoZXZlbnQpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuX2lnbm9yZUJhY2tkcm9wQ2xpY2spIHtcbiAgICAgICAgICB0aGlzLl9pZ25vcmVCYWNrZHJvcENsaWNrID0gZmFsc2VcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0ICE9PSBldmVudC5jdXJyZW50VGFyZ2V0KSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NvbmZpZy5iYWNrZHJvcCA9PT0gJ3N0YXRpYycpIHtcbiAgICAgICAgICB0aGlzLl9lbGVtZW50LmZvY3VzKClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLmhpZGUoKVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgICBpZiAoYW5pbWF0ZSkge1xuICAgICAgICBVdGlsLnJlZmxvdyh0aGlzLl9iYWNrZHJvcClcbiAgICAgIH1cblxuICAgICAgJCh0aGlzLl9iYWNrZHJvcCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmICghYW5pbWF0ZSkge1xuICAgICAgICBjYWxsYmFjaygpXG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICBjb25zdCBiYWNrZHJvcFRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGhpcy5fYmFja2Ryb3ApXG5cbiAgICAgICQodGhpcy5fYmFja2Ryb3ApXG4gICAgICAgIC5vbmUoVXRpbC5UUkFOU0lUSU9OX0VORCwgY2FsbGJhY2spXG4gICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChiYWNrZHJvcFRyYW5zaXRpb25EdXJhdGlvbilcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9pc1Nob3duICYmIHRoaXMuX2JhY2tkcm9wKSB7XG4gICAgICAkKHRoaXMuX2JhY2tkcm9wKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuU0hPVylcblxuICAgICAgY29uc3QgY2FsbGJhY2tSZW1vdmUgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUJhY2tkcm9wKClcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgY2FsbGJhY2soKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICgkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKSkge1xuICAgICAgICBjb25zdCBiYWNrZHJvcFRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGhpcy5fYmFja2Ryb3ApXG5cbiAgICAgICAgJCh0aGlzLl9iYWNrZHJvcClcbiAgICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNhbGxiYWNrUmVtb3ZlKVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZChiYWNrZHJvcFRyYW5zaXRpb25EdXJhdGlvbilcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxiYWNrUmVtb3ZlKClcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGNhbGxiYWNrKSB7XG4gICAgICBjYWxsYmFjaygpXG4gICAgfVxuICB9XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAvLyB0aGUgZm9sbG93aW5nIG1ldGhvZHMgYXJlIHVzZWQgdG8gaGFuZGxlIG92ZXJmbG93aW5nIG1vZGFsc1xuICAvLyB0b2RvIChmYXQpOiB0aGVzZSBzaG91bGQgcHJvYmFibHkgYmUgcmVmYWN0b3JlZCBvdXQgb2YgbW9kYWwuanNcbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gIF9hZGp1c3REaWFsb2coKSB7XG4gICAgY29uc3QgaXNNb2RhbE92ZXJmbG93aW5nID1cbiAgICAgIHRoaXMuX2VsZW1lbnQuc2Nyb2xsSGVpZ2h0ID4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodFxuXG4gICAgaWYgKCF0aGlzLl9pc0JvZHlPdmVyZmxvd2luZyAmJiBpc01vZGFsT3ZlcmZsb3dpbmcpIHtcbiAgICAgIHRoaXMuX2VsZW1lbnQuc3R5bGUucGFkZGluZ0xlZnQgPSBgJHt0aGlzLl9zY3JvbGxiYXJXaWR0aH1weGBcbiAgICB9XG5cbiAgICBpZiAodGhpcy5faXNCb2R5T3ZlcmZsb3dpbmcgJiYgIWlzTW9kYWxPdmVyZmxvd2luZykge1xuICAgICAgdGhpcy5fZWxlbWVudC5zdHlsZS5wYWRkaW5nUmlnaHQgPSBgJHt0aGlzLl9zY3JvbGxiYXJXaWR0aH1weGBcbiAgICB9XG4gIH1cblxuICBfcmVzZXRBZGp1c3RtZW50cygpIHtcbiAgICB0aGlzLl9lbGVtZW50LnN0eWxlLnBhZGRpbmdMZWZ0ID0gJydcbiAgICB0aGlzLl9lbGVtZW50LnN0eWxlLnBhZGRpbmdSaWdodCA9ICcnXG4gIH1cblxuICBfY2hlY2tTY3JvbGxiYXIoKSB7XG4gICAgY29uc3QgcmVjdCA9IGRvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICB0aGlzLl9pc0JvZHlPdmVyZmxvd2luZyA9IHJlY3QubGVmdCArIHJlY3QucmlnaHQgPCB3aW5kb3cuaW5uZXJXaWR0aFxuICAgIHRoaXMuX3Njcm9sbGJhcldpZHRoID0gdGhpcy5fZ2V0U2Nyb2xsYmFyV2lkdGgoKVxuICB9XG5cbiAgX3NldFNjcm9sbGJhcigpIHtcbiAgICBpZiAodGhpcy5faXNCb2R5T3ZlcmZsb3dpbmcpIHtcbiAgICAgIC8vIE5vdGU6IERPTU5vZGUuc3R5bGUucGFkZGluZ1JpZ2h0IHJldHVybnMgdGhlIGFjdHVhbCB2YWx1ZSBvciAnJyBpZiBub3Qgc2V0XG4gICAgICAvLyAgIHdoaWxlICQoRE9NTm9kZSkuY3NzKCdwYWRkaW5nLXJpZ2h0JykgcmV0dXJucyB0aGUgY2FsY3VsYXRlZCB2YWx1ZSBvciAwIGlmIG5vdCBzZXRcbiAgICAgIGNvbnN0IGZpeGVkQ29udGVudCA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChTZWxlY3Rvci5GSVhFRF9DT05URU5UKSlcbiAgICAgIGNvbnN0IHN0aWNreUNvbnRlbnQgPSBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuU1RJQ0tZX0NPTlRFTlQpKVxuXG4gICAgICAvLyBBZGp1c3QgZml4ZWQgY29udGVudCBwYWRkaW5nXG4gICAgICAkKGZpeGVkQ29udGVudCkuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgYWN0dWFsUGFkZGluZyA9IGVsZW1lbnQuc3R5bGUucGFkZGluZ1JpZ2h0XG4gICAgICAgIGNvbnN0IGNhbGN1bGF0ZWRQYWRkaW5nID0gJChlbGVtZW50KS5jc3MoJ3BhZGRpbmctcmlnaHQnKVxuICAgICAgICAkKGVsZW1lbnQpXG4gICAgICAgICAgLmRhdGEoJ3BhZGRpbmctcmlnaHQnLCBhY3R1YWxQYWRkaW5nKVxuICAgICAgICAgIC5jc3MoJ3BhZGRpbmctcmlnaHQnLCBgJHtwYXJzZUZsb2F0KGNhbGN1bGF0ZWRQYWRkaW5nKSArIHRoaXMuX3Njcm9sbGJhcldpZHRofXB4YClcbiAgICAgIH0pXG5cbiAgICAgIC8vIEFkanVzdCBzdGlja3kgY29udGVudCBtYXJnaW5cbiAgICAgICQoc3RpY2t5Q29udGVudCkuZWFjaCgoaW5kZXgsIGVsZW1lbnQpID0+IHtcbiAgICAgICAgY29uc3QgYWN0dWFsTWFyZ2luID0gZWxlbWVudC5zdHlsZS5tYXJnaW5SaWdodFxuICAgICAgICBjb25zdCBjYWxjdWxhdGVkTWFyZ2luID0gJChlbGVtZW50KS5jc3MoJ21hcmdpbi1yaWdodCcpXG4gICAgICAgICQoZWxlbWVudClcbiAgICAgICAgICAuZGF0YSgnbWFyZ2luLXJpZ2h0JywgYWN0dWFsTWFyZ2luKVxuICAgICAgICAgIC5jc3MoJ21hcmdpbi1yaWdodCcsIGAke3BhcnNlRmxvYXQoY2FsY3VsYXRlZE1hcmdpbikgLSB0aGlzLl9zY3JvbGxiYXJXaWR0aH1weGApXG4gICAgICB9KVxuXG4gICAgICAvLyBBZGp1c3QgYm9keSBwYWRkaW5nXG4gICAgICBjb25zdCBhY3R1YWxQYWRkaW5nID0gZG9jdW1lbnQuYm9keS5zdHlsZS5wYWRkaW5nUmlnaHRcbiAgICAgIGNvbnN0IGNhbGN1bGF0ZWRQYWRkaW5nID0gJChkb2N1bWVudC5ib2R5KS5jc3MoJ3BhZGRpbmctcmlnaHQnKVxuICAgICAgJChkb2N1bWVudC5ib2R5KVxuICAgICAgICAuZGF0YSgncGFkZGluZy1yaWdodCcsIGFjdHVhbFBhZGRpbmcpXG4gICAgICAgIC5jc3MoJ3BhZGRpbmctcmlnaHQnLCBgJHtwYXJzZUZsb2F0KGNhbGN1bGF0ZWRQYWRkaW5nKSArIHRoaXMuX3Njcm9sbGJhcldpZHRofXB4YClcbiAgICB9XG5cbiAgICAkKGRvY3VtZW50LmJvZHkpLmFkZENsYXNzKENsYXNzTmFtZS5PUEVOKVxuICB9XG5cbiAgX3Jlc2V0U2Nyb2xsYmFyKCkge1xuICAgIC8vIFJlc3RvcmUgZml4ZWQgY29udGVudCBwYWRkaW5nXG4gICAgY29uc3QgZml4ZWRDb250ZW50ID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLkZJWEVEX0NPTlRFTlQpKVxuICAgICQoZml4ZWRDb250ZW50KS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgY29uc3QgcGFkZGluZyA9ICQoZWxlbWVudCkuZGF0YSgncGFkZGluZy1yaWdodCcpXG4gICAgICAkKGVsZW1lbnQpLnJlbW92ZURhdGEoJ3BhZGRpbmctcmlnaHQnKVxuICAgICAgZWxlbWVudC5zdHlsZS5wYWRkaW5nUmlnaHQgPSBwYWRkaW5nID8gcGFkZGluZyA6ICcnXG4gICAgfSlcblxuICAgIC8vIFJlc3RvcmUgc3RpY2t5IGNvbnRlbnRcbiAgICBjb25zdCBlbGVtZW50cyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgJHtTZWxlY3Rvci5TVElDS1lfQ09OVEVOVH1gKSlcbiAgICAkKGVsZW1lbnRzKS5lYWNoKChpbmRleCwgZWxlbWVudCkgPT4ge1xuICAgICAgY29uc3QgbWFyZ2luID0gJChlbGVtZW50KS5kYXRhKCdtYXJnaW4tcmlnaHQnKVxuICAgICAgaWYgKHR5cGVvZiBtYXJnaW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICQoZWxlbWVudCkuY3NzKCdtYXJnaW4tcmlnaHQnLCBtYXJnaW4pLnJlbW92ZURhdGEoJ21hcmdpbi1yaWdodCcpXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIFJlc3RvcmUgYm9keSBwYWRkaW5nXG4gICAgY29uc3QgcGFkZGluZyA9ICQoZG9jdW1lbnQuYm9keSkuZGF0YSgncGFkZGluZy1yaWdodCcpXG4gICAgJChkb2N1bWVudC5ib2R5KS5yZW1vdmVEYXRhKCdwYWRkaW5nLXJpZ2h0JylcbiAgICBkb2N1bWVudC5ib2R5LnN0eWxlLnBhZGRpbmdSaWdodCA9IHBhZGRpbmcgPyBwYWRkaW5nIDogJydcbiAgfVxuXG4gIF9nZXRTY3JvbGxiYXJXaWR0aCgpIHsgLy8gdGh4IGQud2Fsc2hcbiAgICBjb25zdCBzY3JvbGxEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIHNjcm9sbERpdi5jbGFzc05hbWUgPSBDbGFzc05hbWUuU0NST0xMQkFSX01FQVNVUkVSXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JvbGxEaXYpXG4gICAgY29uc3Qgc2Nyb2xsYmFyV2lkdGggPSBzY3JvbGxEaXYuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGggLSBzY3JvbGxEaXYuY2xpZW50V2lkdGhcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHNjcm9sbERpdilcbiAgICByZXR1cm4gc2Nyb2xsYmFyV2lkdGhcbiAgfVxuXG4gIC8vIFN0YXRpY1xuXG4gIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZywgcmVsYXRlZFRhcmdldCkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGRhdGEgPSAkKHRoaXMpLmRhdGEoREFUQV9LRVkpXG4gICAgICBjb25zdCBfY29uZmlnID0ge1xuICAgICAgICAuLi5EZWZhdWx0LFxuICAgICAgICAuLi4kKHRoaXMpLmRhdGEoKSxcbiAgICAgICAgLi4udHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgJiYgY29uZmlnID8gY29uZmlnIDoge31cbiAgICAgIH1cblxuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBuZXcgTW9kYWwodGhpcywgX2NvbmZpZylcbiAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2NvbmZpZ10gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKVxuICAgICAgICB9XG4gICAgICAgIGRhdGFbY29uZmlnXShyZWxhdGVkVGFyZ2V0KVxuICAgICAgfSBlbHNlIGlmIChfY29uZmlnLnNob3cpIHtcbiAgICAgICAgZGF0YS5zaG93KHJlbGF0ZWRUYXJnZXQpXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbiQoZG9jdW1lbnQpLm9uKEV2ZW50LkNMSUNLX0RBVEFfQVBJLCBTZWxlY3Rvci5EQVRBX1RPR0dMRSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gIGxldCB0YXJnZXRcbiAgY29uc3Qgc2VsZWN0b3IgPSBVdGlsLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQodGhpcylcblxuICBpZiAoc2VsZWN0b3IpIHtcbiAgICB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuICB9XG5cbiAgY29uc3QgY29uZmlnID0gJCh0YXJnZXQpLmRhdGEoREFUQV9LRVkpXG4gICAgPyAndG9nZ2xlJyA6IHtcbiAgICAgIC4uLiQodGFyZ2V0KS5kYXRhKCksXG4gICAgICAuLi4kKHRoaXMpLmRhdGEoKVxuICAgIH1cblxuICBpZiAodGhpcy50YWdOYW1lID09PSAnQScgfHwgdGhpcy50YWdOYW1lID09PSAnQVJFQScpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gIH1cblxuICBjb25zdCAkdGFyZ2V0ID0gJCh0YXJnZXQpLm9uZShFdmVudC5TSE9XLCAoc2hvd0V2ZW50KSA9PiB7XG4gICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgLy8gT25seSByZWdpc3RlciBmb2N1cyByZXN0b3JlciBpZiBtb2RhbCB3aWxsIGFjdHVhbGx5IGdldCBzaG93blxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgJHRhcmdldC5vbmUoRXZlbnQuSElEREVOLCAoKSA9PiB7XG4gICAgICBpZiAoJCh0aGlzKS5pcygnOnZpc2libGUnKSkge1xuICAgICAgICB0aGlzLmZvY3VzKClcbiAgICAgIH1cbiAgICB9KVxuICB9KVxuXG4gIE1vZGFsLl9qUXVlcnlJbnRlcmZhY2UuY2FsbCgkKHRhcmdldCksIGNvbmZpZywgdGhpcylcbn0pXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBqUXVlcnlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbiQuZm5bTkFNRV0gPSBNb2RhbC5falF1ZXJ5SW50ZXJmYWNlXG4kLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gTW9kYWxcbiQuZm5bTkFNRV0ubm9Db25mbGljdCA9ICgpID0+IHtcbiAgJC5mbltOQU1FXSA9IEpRVUVSWV9OT19DT05GTElDVFxuICByZXR1cm4gTW9kYWwuX2pRdWVyeUludGVyZmFjZVxufVxuXG5leHBvcnQgZGVmYXVsdCBNb2RhbFxuIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4zLjEpOiB0b29scy9zYW5pdGl6ZXIuanNcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVCAoaHR0cHM6Ly9naXRodWIuY29tL3R3YnMvYm9vdHN0cmFwL2Jsb2IvbWFzdGVyL0xJQ0VOU0UpXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IHVyaUF0dHJzID0gW1xuICAnYmFja2dyb3VuZCcsXG4gICdjaXRlJyxcbiAgJ2hyZWYnLFxuICAnaXRlbXR5cGUnLFxuICAnbG9uZ2Rlc2MnLFxuICAncG9zdGVyJyxcbiAgJ3NyYycsXG4gICd4bGluazpocmVmJ1xuXVxuXG5jb25zdCBBUklBX0FUVFJJQlVURV9QQVRURVJOID0gL15hcmlhLVtcXHctXSokL2lcblxuZXhwb3J0IGNvbnN0IERlZmF1bHRXaGl0ZWxpc3QgPSB7XG4gIC8vIEdsb2JhbCBhdHRyaWJ1dGVzIGFsbG93ZWQgb24gYW55IHN1cHBsaWVkIGVsZW1lbnQgYmVsb3cuXG4gICcqJzogWydjbGFzcycsICdkaXInLCAnaWQnLCAnbGFuZycsICdyb2xlJywgQVJJQV9BVFRSSUJVVEVfUEFUVEVSTl0sXG4gIGE6IFsndGFyZ2V0JywgJ2hyZWYnLCAndGl0bGUnLCAncmVsJ10sXG4gIGFyZWE6IFtdLFxuICBiOiBbXSxcbiAgYnI6IFtdLFxuICBjb2w6IFtdLFxuICBjb2RlOiBbXSxcbiAgZGl2OiBbXSxcbiAgZW06IFtdLFxuICBocjogW10sXG4gIGgxOiBbXSxcbiAgaDI6IFtdLFxuICBoMzogW10sXG4gIGg0OiBbXSxcbiAgaDU6IFtdLFxuICBoNjogW10sXG4gIGk6IFtdLFxuICBpbWc6IFsnc3JjJywgJ2FsdCcsICd0aXRsZScsICd3aWR0aCcsICdoZWlnaHQnXSxcbiAgbGk6IFtdLFxuICBvbDogW10sXG4gIHA6IFtdLFxuICBwcmU6IFtdLFxuICBzOiBbXSxcbiAgc21hbGw6IFtdLFxuICBzcGFuOiBbXSxcbiAgc3ViOiBbXSxcbiAgc3VwOiBbXSxcbiAgc3Ryb25nOiBbXSxcbiAgdTogW10sXG4gIHVsOiBbXVxufVxuXG4vKipcbiAqIEEgcGF0dGVybiB0aGF0IHJlY29nbml6ZXMgYSBjb21tb25seSB1c2VmdWwgc3Vic2V0IG9mIFVSTHMgdGhhdCBhcmUgc2FmZS5cbiAqXG4gKiBTaG91dG91dCB0byBBbmd1bGFyIDcgaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9ibG9iLzcuMi40L3BhY2thZ2VzL2NvcmUvc3JjL3Nhbml0aXphdGlvbi91cmxfc2FuaXRpemVyLnRzXG4gKi9cbmNvbnN0IFNBRkVfVVJMX1BBVFRFUk4gPSAvXig/Oig/Omh0dHBzP3xtYWlsdG98ZnRwfHRlbHxmaWxlKTp8W14mOi8/I10qKD86Wy8/I118JCkpL2dpXG5cbi8qKlxuICogQSBwYXR0ZXJuIHRoYXQgbWF0Y2hlcyBzYWZlIGRhdGEgVVJMcy4gT25seSBtYXRjaGVzIGltYWdlLCB2aWRlbyBhbmQgYXVkaW8gdHlwZXMuXG4gKlxuICogU2hvdXRvdXQgdG8gQW5ndWxhciA3IGh0dHBzOi8vZ2l0aHViLmNvbS9hbmd1bGFyL2FuZ3VsYXIvYmxvYi83LjIuNC9wYWNrYWdlcy9jb3JlL3NyYy9zYW5pdGl6YXRpb24vdXJsX3Nhbml0aXplci50c1xuICovXG5jb25zdCBEQVRBX1VSTF9QQVRURVJOID0gL15kYXRhOig/OmltYWdlXFwvKD86Ym1wfGdpZnxqcGVnfGpwZ3xwbmd8dGlmZnx3ZWJwKXx2aWRlb1xcLyg/Om1wZWd8bXA0fG9nZ3x3ZWJtKXxhdWRpb1xcLyg/Om1wM3xvZ2F8b2dnfG9wdXMpKTtiYXNlNjQsW2EtejAtOSsvXSs9KiQvaVxuXG5mdW5jdGlvbiBhbGxvd2VkQXR0cmlidXRlKGF0dHIsIGFsbG93ZWRBdHRyaWJ1dGVMaXN0KSB7XG4gIGNvbnN0IGF0dHJOYW1lID0gYXR0ci5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpXG5cbiAgaWYgKGFsbG93ZWRBdHRyaWJ1dGVMaXN0LmluZGV4T2YoYXR0ck5hbWUpICE9PSAtMSkge1xuICAgIGlmICh1cmlBdHRycy5pbmRleE9mKGF0dHJOYW1lKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiBCb29sZWFuKGF0dHIubm9kZVZhbHVlLm1hdGNoKFNBRkVfVVJMX1BBVFRFUk4pIHx8IGF0dHIubm9kZVZhbHVlLm1hdGNoKERBVEFfVVJMX1BBVFRFUk4pKVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICBjb25zdCByZWdFeHAgPSBhbGxvd2VkQXR0cmlidXRlTGlzdC5maWx0ZXIoKGF0dHJSZWdleCkgPT4gYXR0clJlZ2V4IGluc3RhbmNlb2YgUmVnRXhwKVxuXG4gIC8vIENoZWNrIGlmIGEgcmVndWxhciBleHByZXNzaW9uIHZhbGlkYXRlcyB0aGUgYXR0cmlidXRlLlxuICBmb3IgKGxldCBpID0gMCwgbCA9IHJlZ0V4cC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICBpZiAoYXR0ck5hbWUubWF0Y2gocmVnRXhwW2ldKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNhbml0aXplSHRtbCh1bnNhZmVIdG1sLCB3aGl0ZUxpc3QsIHNhbml0aXplRm4pIHtcbiAgaWYgKHVuc2FmZUh0bWwubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHVuc2FmZUh0bWxcbiAgfVxuXG4gIGlmIChzYW5pdGl6ZUZuICYmIHR5cGVvZiBzYW5pdGl6ZUZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHNhbml0aXplRm4odW5zYWZlSHRtbClcbiAgfVxuXG4gIGNvbnN0IGRvbVBhcnNlciA9IG5ldyB3aW5kb3cuRE9NUGFyc2VyKClcbiAgY29uc3QgY3JlYXRlZERvY3VtZW50ID0gZG9tUGFyc2VyLnBhcnNlRnJvbVN0cmluZyh1bnNhZmVIdG1sLCAndGV4dC9odG1sJylcbiAgY29uc3Qgd2hpdGVsaXN0S2V5cyA9IE9iamVjdC5rZXlzKHdoaXRlTGlzdClcbiAgY29uc3QgZWxlbWVudHMgPSBbXS5zbGljZS5jYWxsKGNyZWF0ZWREb2N1bWVudC5ib2R5LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKSlcblxuICBmb3IgKGxldCBpID0gMCwgbGVuID0gZWxlbWVudHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBlbCA9IGVsZW1lbnRzW2ldXG4gICAgY29uc3QgZWxOYW1lID0gZWwubm9kZU5hbWUudG9Mb3dlckNhc2UoKVxuXG4gICAgaWYgKHdoaXRlbGlzdEtleXMuaW5kZXhPZihlbC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpKSA9PT0gLTEpIHtcbiAgICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpXG5cbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuXG4gICAgY29uc3QgYXR0cmlidXRlTGlzdCA9IFtdLnNsaWNlLmNhbGwoZWwuYXR0cmlidXRlcylcbiAgICBjb25zdCB3aGl0ZWxpc3RlZEF0dHJpYnV0ZXMgPSBbXS5jb25jYXQod2hpdGVMaXN0WycqJ10gfHwgW10sIHdoaXRlTGlzdFtlbE5hbWVdIHx8IFtdKVxuXG4gICAgYXR0cmlidXRlTGlzdC5mb3JFYWNoKChhdHRyKSA9PiB7XG4gICAgICBpZiAoIWFsbG93ZWRBdHRyaWJ1dGUoYXR0ciwgd2hpdGVsaXN0ZWRBdHRyaWJ1dGVzKSkge1xuICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoYXR0ci5ub2RlTmFtZSlcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgcmV0dXJuIGNyZWF0ZWREb2N1bWVudC5ib2R5LmlubmVySFRNTFxufVxuIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4zLjEpOiB0b29sdGlwLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQge1xuICBEZWZhdWx0V2hpdGVsaXN0LFxuICBzYW5pdGl6ZUh0bWxcbn0gZnJvbSAnLi90b29scy9zYW5pdGl6ZXInXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgUG9wcGVyIGZyb20gJ3BvcHBlci5qcydcbmltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCdcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENvbnN0YW50c1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY29uc3QgTkFNRSAgICAgICAgICAgICAgICAgID0gJ3Rvb2x0aXAnXG5jb25zdCBWRVJTSU9OICAgICAgICAgICAgICAgPSAnNC4zLjEnXG5jb25zdCBEQVRBX0tFWSAgICAgICAgICAgICAgPSAnYnMudG9vbHRpcCdcbmNvbnN0IEVWRU5UX0tFWSAgICAgICAgICAgICA9IGAuJHtEQVRBX0tFWX1gXG5jb25zdCBKUVVFUllfTk9fQ09ORkxJQ1QgICAgPSAkLmZuW05BTUVdXG5jb25zdCBDTEFTU19QUkVGSVggICAgICAgICAgPSAnYnMtdG9vbHRpcCdcbmNvbnN0IEJTQ0xTX1BSRUZJWF9SRUdFWCAgICA9IG5ldyBSZWdFeHAoYChefFxcXFxzKSR7Q0xBU1NfUFJFRklYfVxcXFxTK2AsICdnJylcbmNvbnN0IERJU0FMTE9XRURfQVRUUklCVVRFUyA9IFsnc2FuaXRpemUnLCAnd2hpdGVMaXN0JywgJ3Nhbml0aXplRm4nXVxuXG5jb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgYW5pbWF0aW9uICAgICAgICAgOiAnYm9vbGVhbicsXG4gIHRlbXBsYXRlICAgICAgICAgIDogJ3N0cmluZycsXG4gIHRpdGxlICAgICAgICAgICAgIDogJyhzdHJpbmd8ZWxlbWVudHxmdW5jdGlvbiknLFxuICB0cmlnZ2VyICAgICAgICAgICA6ICdzdHJpbmcnLFxuICBkZWxheSAgICAgICAgICAgICA6ICcobnVtYmVyfG9iamVjdCknLFxuICBodG1sICAgICAgICAgICAgICA6ICdib29sZWFuJyxcbiAgc2VsZWN0b3IgICAgICAgICAgOiAnKHN0cmluZ3xib29sZWFuKScsXG4gIHBsYWNlbWVudCAgICAgICAgIDogJyhzdHJpbmd8ZnVuY3Rpb24pJyxcbiAgb2Zmc2V0ICAgICAgICAgICAgOiAnKG51bWJlcnxzdHJpbmd8ZnVuY3Rpb24pJyxcbiAgY29udGFpbmVyICAgICAgICAgOiAnKHN0cmluZ3xlbGVtZW50fGJvb2xlYW4pJyxcbiAgZmFsbGJhY2tQbGFjZW1lbnQgOiAnKHN0cmluZ3xhcnJheSknLFxuICBib3VuZGFyeSAgICAgICAgICA6ICcoc3RyaW5nfGVsZW1lbnQpJyxcbiAgc2FuaXRpemUgICAgICAgICAgOiAnYm9vbGVhbicsXG4gIHNhbml0aXplRm4gICAgICAgIDogJyhudWxsfGZ1bmN0aW9uKScsXG4gIHdoaXRlTGlzdCAgICAgICAgIDogJ29iamVjdCdcbn1cblxuY29uc3QgQXR0YWNobWVudE1hcCA9IHtcbiAgQVVUTyAgIDogJ2F1dG8nLFxuICBUT1AgICAgOiAndG9wJyxcbiAgUklHSFQgIDogJ3JpZ2h0JyxcbiAgQk9UVE9NIDogJ2JvdHRvbScsXG4gIExFRlQgICA6ICdsZWZ0J1xufVxuXG5jb25zdCBEZWZhdWx0ID0ge1xuICBhbmltYXRpb24gICAgICAgICA6IHRydWUsXG4gIHRlbXBsYXRlICAgICAgICAgIDogJzxkaXYgY2xhc3M9XCJ0b29sdGlwXCIgcm9sZT1cInRvb2x0aXBcIj4nICtcbiAgICAgICAgICAgICAgICAgICAgJzxkaXYgY2xhc3M9XCJhcnJvd1wiPjwvZGl2PicgK1xuICAgICAgICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cInRvb2x0aXAtaW5uZXJcIj48L2Rpdj48L2Rpdj4nLFxuICB0cmlnZ2VyICAgICAgICAgICA6ICdob3ZlciBmb2N1cycsXG4gIHRpdGxlICAgICAgICAgICAgIDogJycsXG4gIGRlbGF5ICAgICAgICAgICAgIDogMCxcbiAgaHRtbCAgICAgICAgICAgICAgOiBmYWxzZSxcbiAgc2VsZWN0b3IgICAgICAgICAgOiBmYWxzZSxcbiAgcGxhY2VtZW50ICAgICAgICAgOiAndG9wJyxcbiAgb2Zmc2V0ICAgICAgICAgICAgOiAwLFxuICBjb250YWluZXIgICAgICAgICA6IGZhbHNlLFxuICBmYWxsYmFja1BsYWNlbWVudCA6ICdmbGlwJyxcbiAgYm91bmRhcnkgICAgICAgICAgOiAnc2Nyb2xsUGFyZW50JyxcbiAgc2FuaXRpemUgICAgICAgICAgOiB0cnVlLFxuICBzYW5pdGl6ZUZuICAgICAgICA6IG51bGwsXG4gIHdoaXRlTGlzdCAgICAgICAgIDogRGVmYXVsdFdoaXRlbGlzdFxufVxuXG5jb25zdCBIb3ZlclN0YXRlID0ge1xuICBTSE9XIDogJ3Nob3cnLFxuICBPVVQgIDogJ291dCdcbn1cblxuY29uc3QgRXZlbnQgPSB7XG4gIEhJREUgICAgICAgOiBgaGlkZSR7RVZFTlRfS0VZfWAsXG4gIEhJRERFTiAgICAgOiBgaGlkZGVuJHtFVkVOVF9LRVl9YCxcbiAgU0hPVyAgICAgICA6IGBzaG93JHtFVkVOVF9LRVl9YCxcbiAgU0hPV04gICAgICA6IGBzaG93biR7RVZFTlRfS0VZfWAsXG4gIElOU0VSVEVEICAgOiBgaW5zZXJ0ZWQke0VWRU5UX0tFWX1gLFxuICBDTElDSyAgICAgIDogYGNsaWNrJHtFVkVOVF9LRVl9YCxcbiAgRk9DVVNJTiAgICA6IGBmb2N1c2luJHtFVkVOVF9LRVl9YCxcbiAgRk9DVVNPVVQgICA6IGBmb2N1c291dCR7RVZFTlRfS0VZfWAsXG4gIE1PVVNFRU5URVIgOiBgbW91c2VlbnRlciR7RVZFTlRfS0VZfWAsXG4gIE1PVVNFTEVBVkUgOiBgbW91c2VsZWF2ZSR7RVZFTlRfS0VZfWBcbn1cblxuY29uc3QgQ2xhc3NOYW1lID0ge1xuICBGQURFIDogJ2ZhZGUnLFxuICBTSE9XIDogJ3Nob3cnXG59XG5cbmNvbnN0IFNlbGVjdG9yID0ge1xuICBUT09MVElQICAgICAgIDogJy50b29sdGlwJyxcbiAgVE9PTFRJUF9JTk5FUiA6ICcudG9vbHRpcC1pbm5lcicsXG4gIEFSUk9XICAgICAgICAgOiAnLmFycm93J1xufVxuXG5jb25zdCBUcmlnZ2VyID0ge1xuICBIT1ZFUiAgOiAnaG92ZXInLFxuICBGT0NVUyAgOiAnZm9jdXMnLFxuICBDTElDSyAgOiAnY2xpY2snLFxuICBNQU5VQUwgOiAnbWFudWFsJ1xufVxuXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDbGFzcyBEZWZpbml0aW9uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jbGFzcyBUb29sdGlwIHtcbiAgY29uc3RydWN0b3IoZWxlbWVudCwgY29uZmlnKSB7XG4gICAgLyoqXG4gICAgICogQ2hlY2sgZm9yIFBvcHBlciBkZXBlbmRlbmN5XG4gICAgICogUG9wcGVyIC0gaHR0cHM6Ly9wb3BwZXIuanMub3JnXG4gICAgICovXG4gICAgaWYgKHR5cGVvZiBQb3BwZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb290c3RyYXBcXCdzIHRvb2x0aXBzIHJlcXVpcmUgUG9wcGVyLmpzIChodHRwczovL3BvcHBlci5qcy5vcmcvKScpXG4gICAgfVxuXG4gICAgLy8gcHJpdmF0ZVxuICAgIHRoaXMuX2lzRW5hYmxlZCAgICAgPSB0cnVlXG4gICAgdGhpcy5fdGltZW91dCAgICAgICA9IDBcbiAgICB0aGlzLl9ob3ZlclN0YXRlICAgID0gJydcbiAgICB0aGlzLl9hY3RpdmVUcmlnZ2VyID0ge31cbiAgICB0aGlzLl9wb3BwZXIgICAgICAgID0gbnVsbFxuXG4gICAgLy8gUHJvdGVjdGVkXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudFxuICAgIHRoaXMuY29uZmlnICA9IHRoaXMuX2dldENvbmZpZyhjb25maWcpXG4gICAgdGhpcy50aXAgICAgID0gbnVsbFxuXG4gICAgdGhpcy5fc2V0TGlzdGVuZXJzKClcbiAgfVxuXG4gIC8vIEdldHRlcnNcblxuICBzdGF0aWMgZ2V0IFZFUlNJT04oKSB7XG4gICAgcmV0dXJuIFZFUlNJT05cbiAgfVxuXG4gIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFxuICB9XG5cbiAgc3RhdGljIGdldCBOQU1FKCkge1xuICAgIHJldHVybiBOQU1FXG4gIH1cblxuICBzdGF0aWMgZ2V0IERBVEFfS0VZKCkge1xuICAgIHJldHVybiBEQVRBX0tFWVxuICB9XG5cbiAgc3RhdGljIGdldCBFdmVudCgpIHtcbiAgICByZXR1cm4gRXZlbnRcbiAgfVxuXG4gIHN0YXRpYyBnZXQgRVZFTlRfS0VZKCkge1xuICAgIHJldHVybiBFVkVOVF9LRVlcbiAgfVxuXG4gIHN0YXRpYyBnZXQgRGVmYXVsdFR5cGUoKSB7XG4gICAgcmV0dXJuIERlZmF1bHRUeXBlXG4gIH1cblxuICAvLyBQdWJsaWNcblxuICBlbmFibGUoKSB7XG4gICAgdGhpcy5faXNFbmFibGVkID0gdHJ1ZVxuICB9XG5cbiAgZGlzYWJsZSgpIHtcbiAgICB0aGlzLl9pc0VuYWJsZWQgPSBmYWxzZVxuICB9XG5cbiAgdG9nZ2xlRW5hYmxlZCgpIHtcbiAgICB0aGlzLl9pc0VuYWJsZWQgPSAhdGhpcy5faXNFbmFibGVkXG4gIH1cblxuICB0b2dnbGUoZXZlbnQpIHtcbiAgICBpZiAoIXRoaXMuX2lzRW5hYmxlZCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBjb25zdCBkYXRhS2V5ID0gdGhpcy5jb25zdHJ1Y3Rvci5EQVRBX0tFWVxuICAgICAgbGV0IGNvbnRleHQgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSlcblxuICAgICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgIGNvbnRleHQgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihcbiAgICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LFxuICAgICAgICAgIHRoaXMuX2dldERlbGVnYXRlQ29uZmlnKClcbiAgICAgICAgKVxuICAgICAgICAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmRhdGEoZGF0YUtleSwgY29udGV4dClcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5fYWN0aXZlVHJpZ2dlci5jbGljayA9ICFjb250ZXh0Ll9hY3RpdmVUcmlnZ2VyLmNsaWNrXG5cbiAgICAgIGlmIChjb250ZXh0Ll9pc1dpdGhBY3RpdmVUcmlnZ2VyKCkpIHtcbiAgICAgICAgY29udGV4dC5fZW50ZXIobnVsbCwgY29udGV4dClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRleHQuX2xlYXZlKG51bGwsIGNvbnRleHQpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICgkKHRoaXMuZ2V0VGlwRWxlbWVudCgpKS5oYXNDbGFzcyhDbGFzc05hbWUuU0hPVykpIHtcbiAgICAgICAgdGhpcy5fbGVhdmUobnVsbCwgdGhpcylcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2VudGVyKG51bGwsIHRoaXMpXG4gICAgfVxuICB9XG5cbiAgZGlzcG9zZSgpIHtcbiAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZW91dClcblxuICAgICQucmVtb3ZlRGF0YSh0aGlzLmVsZW1lbnQsIHRoaXMuY29uc3RydWN0b3IuREFUQV9LRVkpXG5cbiAgICAkKHRoaXMuZWxlbWVudCkub2ZmKHRoaXMuY29uc3RydWN0b3IuRVZFTlRfS0VZKVxuICAgICQodGhpcy5lbGVtZW50KS5jbG9zZXN0KCcubW9kYWwnKS5vZmYoJ2hpZGUuYnMubW9kYWwnKVxuXG4gICAgaWYgKHRoaXMudGlwKSB7XG4gICAgICAkKHRoaXMudGlwKS5yZW1vdmUoKVxuICAgIH1cblxuICAgIHRoaXMuX2lzRW5hYmxlZCAgICAgPSBudWxsXG4gICAgdGhpcy5fdGltZW91dCAgICAgICA9IG51bGxcbiAgICB0aGlzLl9ob3ZlclN0YXRlICAgID0gbnVsbFxuICAgIHRoaXMuX2FjdGl2ZVRyaWdnZXIgPSBudWxsXG4gICAgaWYgKHRoaXMuX3BvcHBlciAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5fcG9wcGVyLmRlc3Ryb3koKVxuICAgIH1cblxuICAgIHRoaXMuX3BvcHBlciA9IG51bGxcbiAgICB0aGlzLmVsZW1lbnQgPSBudWxsXG4gICAgdGhpcy5jb25maWcgID0gbnVsbFxuICAgIHRoaXMudGlwICAgICA9IG51bGxcbiAgfVxuXG4gIHNob3coKSB7XG4gICAgaWYgKCQodGhpcy5lbGVtZW50KS5jc3MoJ2Rpc3BsYXknKSA9PT0gJ25vbmUnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1BsZWFzZSB1c2Ugc2hvdyBvbiB2aXNpYmxlIGVsZW1lbnRzJylcbiAgICB9XG5cbiAgICBjb25zdCBzaG93RXZlbnQgPSAkLkV2ZW50KHRoaXMuY29uc3RydWN0b3IuRXZlbnQuU0hPVylcbiAgICBpZiAodGhpcy5pc1dpdGhDb250ZW50KCkgJiYgdGhpcy5faXNFbmFibGVkKSB7XG4gICAgICAkKHRoaXMuZWxlbWVudCkudHJpZ2dlcihzaG93RXZlbnQpXG5cbiAgICAgIGNvbnN0IHNoYWRvd1Jvb3QgPSBVdGlsLmZpbmRTaGFkb3dSb290KHRoaXMuZWxlbWVudClcbiAgICAgIGNvbnN0IGlzSW5UaGVEb20gPSAkLmNvbnRhaW5zKFxuICAgICAgICBzaGFkb3dSb290ICE9PSBudWxsID8gc2hhZG93Um9vdCA6IHRoaXMuZWxlbWVudC5vd25lckRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcbiAgICAgICAgdGhpcy5lbGVtZW50XG4gICAgICApXG5cbiAgICAgIGlmIChzaG93RXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkgfHwgIWlzSW5UaGVEb20pIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHRpcCAgID0gdGhpcy5nZXRUaXBFbGVtZW50KClcbiAgICAgIGNvbnN0IHRpcElkID0gVXRpbC5nZXRVSUQodGhpcy5jb25zdHJ1Y3Rvci5OQU1FKVxuXG4gICAgICB0aXAuc2V0QXR0cmlidXRlKCdpZCcsIHRpcElkKVxuICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1kZXNjcmliZWRieScsIHRpcElkKVxuXG4gICAgICB0aGlzLnNldENvbnRlbnQoKVxuXG4gICAgICBpZiAodGhpcy5jb25maWcuYW5pbWF0aW9uKSB7XG4gICAgICAgICQodGlwKS5hZGRDbGFzcyhDbGFzc05hbWUuRkFERSlcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGxhY2VtZW50ICA9IHR5cGVvZiB0aGlzLmNvbmZpZy5wbGFjZW1lbnQgPT09ICdmdW5jdGlvbidcbiAgICAgICAgPyB0aGlzLmNvbmZpZy5wbGFjZW1lbnQuY2FsbCh0aGlzLCB0aXAsIHRoaXMuZWxlbWVudClcbiAgICAgICAgOiB0aGlzLmNvbmZpZy5wbGFjZW1lbnRcblxuICAgICAgY29uc3QgYXR0YWNobWVudCA9IHRoaXMuX2dldEF0dGFjaG1lbnQocGxhY2VtZW50KVxuICAgICAgdGhpcy5hZGRBdHRhY2htZW50Q2xhc3MoYXR0YWNobWVudClcblxuICAgICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5fZ2V0Q29udGFpbmVyKClcbiAgICAgICQodGlwKS5kYXRhKHRoaXMuY29uc3RydWN0b3IuREFUQV9LRVksIHRoaXMpXG5cbiAgICAgIGlmICghJC5jb250YWlucyh0aGlzLmVsZW1lbnQub3duZXJEb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIHRoaXMudGlwKSkge1xuICAgICAgICAkKHRpcCkuYXBwZW5kVG8oY29udGFpbmVyKVxuICAgICAgfVxuXG4gICAgICAkKHRoaXMuZWxlbWVudCkudHJpZ2dlcih0aGlzLmNvbnN0cnVjdG9yLkV2ZW50LklOU0VSVEVEKVxuXG4gICAgICB0aGlzLl9wb3BwZXIgPSBuZXcgUG9wcGVyKHRoaXMuZWxlbWVudCwgdGlwLCB7XG4gICAgICAgIHBsYWNlbWVudDogYXR0YWNobWVudCxcbiAgICAgICAgbW9kaWZpZXJzOiB7XG4gICAgICAgICAgb2Zmc2V0OiB0aGlzLl9nZXRPZmZzZXQoKSxcbiAgICAgICAgICBmbGlwOiB7XG4gICAgICAgICAgICBiZWhhdmlvcjogdGhpcy5jb25maWcuZmFsbGJhY2tQbGFjZW1lbnRcbiAgICAgICAgICB9LFxuICAgICAgICAgIGFycm93OiB7XG4gICAgICAgICAgICBlbGVtZW50OiBTZWxlY3Rvci5BUlJPV1xuICAgICAgICAgIH0sXG4gICAgICAgICAgcHJldmVudE92ZXJmbG93OiB7XG4gICAgICAgICAgICBib3VuZGFyaWVzRWxlbWVudDogdGhpcy5jb25maWcuYm91bmRhcnlcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG9uQ3JlYXRlOiAoZGF0YSkgPT4ge1xuICAgICAgICAgIGlmIChkYXRhLm9yaWdpbmFsUGxhY2VtZW50ICE9PSBkYXRhLnBsYWNlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5faGFuZGxlUG9wcGVyUGxhY2VtZW50Q2hhbmdlKGRhdGEpXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBvblVwZGF0ZTogKGRhdGEpID0+IHRoaXMuX2hhbmRsZVBvcHBlclBsYWNlbWVudENoYW5nZShkYXRhKVxuICAgICAgfSlcblxuICAgICAgJCh0aXApLmFkZENsYXNzKENsYXNzTmFtZS5TSE9XKVxuXG4gICAgICAvLyBJZiB0aGlzIGlzIGEgdG91Y2gtZW5hYmxlZCBkZXZpY2Ugd2UgYWRkIGV4dHJhXG4gICAgICAvLyBlbXB0eSBtb3VzZW92ZXIgbGlzdGVuZXJzIHRvIHRoZSBib2R5J3MgaW1tZWRpYXRlIGNoaWxkcmVuO1xuICAgICAgLy8gb25seSBuZWVkZWQgYmVjYXVzZSBvZiBicm9rZW4gZXZlbnQgZGVsZWdhdGlvbiBvbiBpT1NcbiAgICAgIC8vIGh0dHBzOi8vd3d3LnF1aXJrc21vZGUub3JnL2Jsb2cvYXJjaGl2ZXMvMjAxNC8wMi9tb3VzZV9ldmVudF9idWIuaHRtbFxuICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICAkKGRvY3VtZW50LmJvZHkpLmNoaWxkcmVuKCkub24oJ21vdXNlb3ZlcicsIG51bGwsICQubm9vcClcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmNvbmZpZy5hbmltYXRpb24pIHtcbiAgICAgICAgICB0aGlzLl9maXhUcmFuc2l0aW9uKClcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBwcmV2SG92ZXJTdGF0ZSA9IHRoaXMuX2hvdmVyU3RhdGVcbiAgICAgICAgdGhpcy5faG92ZXJTdGF0ZSAgICAgPSBudWxsXG5cbiAgICAgICAgJCh0aGlzLmVsZW1lbnQpLnRyaWdnZXIodGhpcy5jb25zdHJ1Y3Rvci5FdmVudC5TSE9XTilcblxuICAgICAgICBpZiAocHJldkhvdmVyU3RhdGUgPT09IEhvdmVyU3RhdGUuT1VUKSB7XG4gICAgICAgICAgdGhpcy5fbGVhdmUobnVsbCwgdGhpcylcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoJCh0aGlzLnRpcCkuaGFzQ2xhc3MoQ2xhc3NOYW1lLkZBREUpKSB7XG4gICAgICAgIGNvbnN0IHRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGhpcy50aXApXG5cbiAgICAgICAgJCh0aGlzLnRpcClcbiAgICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNvbXBsZXRlKVxuICAgICAgICAgIC5lbXVsYXRlVHJhbnNpdGlvbkVuZCh0cmFuc2l0aW9uRHVyYXRpb24pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb21wbGV0ZSgpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGlkZShjYWxsYmFjaykge1xuICAgIGNvbnN0IHRpcCAgICAgICA9IHRoaXMuZ2V0VGlwRWxlbWVudCgpXG4gICAgY29uc3QgaGlkZUV2ZW50ID0gJC5FdmVudCh0aGlzLmNvbnN0cnVjdG9yLkV2ZW50LkhJREUpXG4gICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5faG92ZXJTdGF0ZSAhPT0gSG92ZXJTdGF0ZS5TSE9XICYmIHRpcC5wYXJlbnROb2RlKSB7XG4gICAgICAgIHRpcC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRpcClcbiAgICAgIH1cblxuICAgICAgdGhpcy5fY2xlYW5UaXBDbGFzcygpXG4gICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWRlc2NyaWJlZGJ5JylcbiAgICAgICQodGhpcy5lbGVtZW50KS50cmlnZ2VyKHRoaXMuY29uc3RydWN0b3IuRXZlbnQuSElEREVOKVxuICAgICAgaWYgKHRoaXMuX3BvcHBlciAhPT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9wb3BwZXIuZGVzdHJveSgpXG4gICAgICB9XG5cbiAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICBjYWxsYmFjaygpXG4gICAgICB9XG4gICAgfVxuXG4gICAgJCh0aGlzLmVsZW1lbnQpLnRyaWdnZXIoaGlkZUV2ZW50KVxuXG4gICAgaWYgKGhpZGVFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgJCh0aXApLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5TSE9XKVxuXG4gICAgLy8gSWYgdGhpcyBpcyBhIHRvdWNoLWVuYWJsZWQgZGV2aWNlIHdlIHJlbW92ZSB0aGUgZXh0cmFcbiAgICAvLyBlbXB0eSBtb3VzZW92ZXIgbGlzdGVuZXJzIHdlIGFkZGVkIGZvciBpT1Mgc3VwcG9ydFxuICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICQoZG9jdW1lbnQuYm9keSkuY2hpbGRyZW4oKS5vZmYoJ21vdXNlb3ZlcicsIG51bGwsICQubm9vcClcbiAgICB9XG5cbiAgICB0aGlzLl9hY3RpdmVUcmlnZ2VyW1RyaWdnZXIuQ0xJQ0tdID0gZmFsc2VcbiAgICB0aGlzLl9hY3RpdmVUcmlnZ2VyW1RyaWdnZXIuRk9DVVNdID0gZmFsc2VcbiAgICB0aGlzLl9hY3RpdmVUcmlnZ2VyW1RyaWdnZXIuSE9WRVJdID0gZmFsc2VcblxuICAgIGlmICgkKHRoaXMudGlwKS5oYXNDbGFzcyhDbGFzc05hbWUuRkFERSkpIHtcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGlwKVxuXG4gICAgICAkKHRpcClcbiAgICAgICAgLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjb21wbGV0ZSlcbiAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKHRyYW5zaXRpb25EdXJhdGlvbilcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcGxldGUoKVxuICAgIH1cblxuICAgIHRoaXMuX2hvdmVyU3RhdGUgPSAnJ1xuICB9XG5cbiAgdXBkYXRlKCkge1xuICAgIGlmICh0aGlzLl9wb3BwZXIgIT09IG51bGwpIHtcbiAgICAgIHRoaXMuX3BvcHBlci5zY2hlZHVsZVVwZGF0ZSgpXG4gICAgfVxuICB9XG5cbiAgLy8gUHJvdGVjdGVkXG5cbiAgaXNXaXRoQ29udGVudCgpIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLmdldFRpdGxlKCkpXG4gIH1cblxuICBhZGRBdHRhY2htZW50Q2xhc3MoYXR0YWNobWVudCkge1xuICAgICQodGhpcy5nZXRUaXBFbGVtZW50KCkpLmFkZENsYXNzKGAke0NMQVNTX1BSRUZJWH0tJHthdHRhY2htZW50fWApXG4gIH1cblxuICBnZXRUaXBFbGVtZW50KCkge1xuICAgIHRoaXMudGlwID0gdGhpcy50aXAgfHwgJCh0aGlzLmNvbmZpZy50ZW1wbGF0ZSlbMF1cbiAgICByZXR1cm4gdGhpcy50aXBcbiAgfVxuXG4gIHNldENvbnRlbnQoKSB7XG4gICAgY29uc3QgdGlwID0gdGhpcy5nZXRUaXBFbGVtZW50KClcbiAgICB0aGlzLnNldEVsZW1lbnRDb250ZW50KCQodGlwLnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuVE9PTFRJUF9JTk5FUikpLCB0aGlzLmdldFRpdGxlKCkpXG4gICAgJCh0aXApLnJlbW92ZUNsYXNzKGAke0NsYXNzTmFtZS5GQURFfSAke0NsYXNzTmFtZS5TSE9XfWApXG4gIH1cblxuICBzZXRFbGVtZW50Q29udGVudCgkZWxlbWVudCwgY29udGVudCkge1xuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ29iamVjdCcgJiYgKGNvbnRlbnQubm9kZVR5cGUgfHwgY29udGVudC5qcXVlcnkpKSB7XG4gICAgICAvLyBDb250ZW50IGlzIGEgRE9NIG5vZGUgb3IgYSBqUXVlcnlcbiAgICAgIGlmICh0aGlzLmNvbmZpZy5odG1sKSB7XG4gICAgICAgIGlmICghJChjb250ZW50KS5wYXJlbnQoKS5pcygkZWxlbWVudCkpIHtcbiAgICAgICAgICAkZWxlbWVudC5lbXB0eSgpLmFwcGVuZChjb250ZW50KVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkZWxlbWVudC50ZXh0KCQoY29udGVudCkudGV4dCgpKVxuICAgICAgfVxuXG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAodGhpcy5jb25maWcuaHRtbCkge1xuICAgICAgaWYgKHRoaXMuY29uZmlnLnNhbml0aXplKSB7XG4gICAgICAgIGNvbnRlbnQgPSBzYW5pdGl6ZUh0bWwoY29udGVudCwgdGhpcy5jb25maWcud2hpdGVMaXN0LCB0aGlzLmNvbmZpZy5zYW5pdGl6ZUZuKVxuICAgICAgfVxuXG4gICAgICAkZWxlbWVudC5odG1sKGNvbnRlbnQpXG4gICAgfSBlbHNlIHtcbiAgICAgICRlbGVtZW50LnRleHQoY29udGVudClcbiAgICB9XG4gIH1cblxuICBnZXRUaXRsZSgpIHtcbiAgICBsZXQgdGl0bGUgPSB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLW9yaWdpbmFsLXRpdGxlJylcblxuICAgIGlmICghdGl0bGUpIHtcbiAgICAgIHRpdGxlID0gdHlwZW9mIHRoaXMuY29uZmlnLnRpdGxlID09PSAnZnVuY3Rpb24nXG4gICAgICAgID8gdGhpcy5jb25maWcudGl0bGUuY2FsbCh0aGlzLmVsZW1lbnQpXG4gICAgICAgIDogdGhpcy5jb25maWcudGl0bGVcbiAgICB9XG5cbiAgICByZXR1cm4gdGl0bGVcbiAgfVxuXG4gIC8vIFByaXZhdGVcblxuICBfZ2V0T2Zmc2V0KCkge1xuICAgIGNvbnN0IG9mZnNldCA9IHt9XG5cbiAgICBpZiAodHlwZW9mIHRoaXMuY29uZmlnLm9mZnNldCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgb2Zmc2V0LmZuID0gKGRhdGEpID0+IHtcbiAgICAgICAgZGF0YS5vZmZzZXRzID0ge1xuICAgICAgICAgIC4uLmRhdGEub2Zmc2V0cyxcbiAgICAgICAgICAuLi50aGlzLmNvbmZpZy5vZmZzZXQoZGF0YS5vZmZzZXRzLCB0aGlzLmVsZW1lbnQpIHx8IHt9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBvZmZzZXQub2Zmc2V0ID0gdGhpcy5jb25maWcub2Zmc2V0XG4gICAgfVxuXG4gICAgcmV0dXJuIG9mZnNldFxuICB9XG5cbiAgX2dldENvbnRhaW5lcigpIHtcbiAgICBpZiAodGhpcy5jb25maWcuY29udGFpbmVyID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIGRvY3VtZW50LmJvZHlcbiAgICB9XG5cbiAgICBpZiAoVXRpbC5pc0VsZW1lbnQodGhpcy5jb25maWcuY29udGFpbmVyKSkge1xuICAgICAgcmV0dXJuICQodGhpcy5jb25maWcuY29udGFpbmVyKVxuICAgIH1cblxuICAgIHJldHVybiAkKGRvY3VtZW50KS5maW5kKHRoaXMuY29uZmlnLmNvbnRhaW5lcilcbiAgfVxuXG4gIF9nZXRBdHRhY2htZW50KHBsYWNlbWVudCkge1xuICAgIHJldHVybiBBdHRhY2htZW50TWFwW3BsYWNlbWVudC50b1VwcGVyQ2FzZSgpXVxuICB9XG5cbiAgX3NldExpc3RlbmVycygpIHtcbiAgICBjb25zdCB0cmlnZ2VycyA9IHRoaXMuY29uZmlnLnRyaWdnZXIuc3BsaXQoJyAnKVxuXG4gICAgdHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlcikgPT4ge1xuICAgICAgaWYgKHRyaWdnZXIgPT09ICdjbGljaycpIHtcbiAgICAgICAgJCh0aGlzLmVsZW1lbnQpLm9uKFxuICAgICAgICAgIHRoaXMuY29uc3RydWN0b3IuRXZlbnQuQ0xJQ0ssXG4gICAgICAgICAgdGhpcy5jb25maWcuc2VsZWN0b3IsXG4gICAgICAgICAgKGV2ZW50KSA9PiB0aGlzLnRvZ2dsZShldmVudClcbiAgICAgICAgKVxuICAgICAgfSBlbHNlIGlmICh0cmlnZ2VyICE9PSBUcmlnZ2VyLk1BTlVBTCkge1xuICAgICAgICBjb25zdCBldmVudEluID0gdHJpZ2dlciA9PT0gVHJpZ2dlci5IT1ZFUlxuICAgICAgICAgID8gdGhpcy5jb25zdHJ1Y3Rvci5FdmVudC5NT1VTRUVOVEVSXG4gICAgICAgICAgOiB0aGlzLmNvbnN0cnVjdG9yLkV2ZW50LkZPQ1VTSU5cbiAgICAgICAgY29uc3QgZXZlbnRPdXQgPSB0cmlnZ2VyID09PSBUcmlnZ2VyLkhPVkVSXG4gICAgICAgICAgPyB0aGlzLmNvbnN0cnVjdG9yLkV2ZW50Lk1PVVNFTEVBVkVcbiAgICAgICAgICA6IHRoaXMuY29uc3RydWN0b3IuRXZlbnQuRk9DVVNPVVRcblxuICAgICAgICAkKHRoaXMuZWxlbWVudClcbiAgICAgICAgICAub24oXG4gICAgICAgICAgICBldmVudEluLFxuICAgICAgICAgICAgdGhpcy5jb25maWcuc2VsZWN0b3IsXG4gICAgICAgICAgICAoZXZlbnQpID0+IHRoaXMuX2VudGVyKGV2ZW50KVxuICAgICAgICAgIClcbiAgICAgICAgICAub24oXG4gICAgICAgICAgICBldmVudE91dCxcbiAgICAgICAgICAgIHRoaXMuY29uZmlnLnNlbGVjdG9yLFxuICAgICAgICAgICAgKGV2ZW50KSA9PiB0aGlzLl9sZWF2ZShldmVudClcbiAgICAgICAgICApXG4gICAgICB9XG4gICAgfSlcblxuICAgICQodGhpcy5lbGVtZW50KS5jbG9zZXN0KCcubW9kYWwnKS5vbihcbiAgICAgICdoaWRlLmJzLm1vZGFsJyxcbiAgICAgICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuZWxlbWVudCkge1xuICAgICAgICAgIHRoaXMuaGlkZSgpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApXG5cbiAgICBpZiAodGhpcy5jb25maWcuc2VsZWN0b3IpIHtcbiAgICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgICAuLi50aGlzLmNvbmZpZyxcbiAgICAgICAgdHJpZ2dlcjogJ21hbnVhbCcsXG4gICAgICAgIHNlbGVjdG9yOiAnJ1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9maXhUaXRsZSgpXG4gICAgfVxuICB9XG5cbiAgX2ZpeFRpdGxlKCkge1xuICAgIGNvbnN0IHRpdGxlVHlwZSA9IHR5cGVvZiB0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLW9yaWdpbmFsLXRpdGxlJylcblxuICAgIGlmICh0aGlzLmVsZW1lbnQuZ2V0QXR0cmlidXRlKCd0aXRsZScpIHx8IHRpdGxlVHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoXG4gICAgICAgICdkYXRhLW9yaWdpbmFsLXRpdGxlJyxcbiAgICAgICAgdGhpcy5lbGVtZW50LmdldEF0dHJpYnV0ZSgndGl0bGUnKSB8fCAnJ1xuICAgICAgKVxuXG4gICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCd0aXRsZScsICcnKVxuICAgIH1cbiAgfVxuXG4gIF9lbnRlcihldmVudCwgY29udGV4dCkge1xuICAgIGNvbnN0IGRhdGFLZXkgPSB0aGlzLmNvbnN0cnVjdG9yLkRBVEFfS0VZXG4gICAgY29udGV4dCA9IGNvbnRleHQgfHwgJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKGRhdGFLZXkpXG5cbiAgICBpZiAoIWNvbnRleHQpIHtcbiAgICAgIGNvbnRleHQgPSBuZXcgdGhpcy5jb25zdHJ1Y3RvcihcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldCxcbiAgICAgICAgdGhpcy5fZ2V0RGVsZWdhdGVDb25maWcoKVxuICAgICAgKVxuICAgICAgJChldmVudC5jdXJyZW50VGFyZ2V0KS5kYXRhKGRhdGFLZXksIGNvbnRleHQpXG4gICAgfVxuXG4gICAgaWYgKGV2ZW50KSB7XG4gICAgICBjb250ZXh0Ll9hY3RpdmVUcmlnZ2VyW1xuICAgICAgICBldmVudC50eXBlID09PSAnZm9jdXNpbicgPyBUcmlnZ2VyLkZPQ1VTIDogVHJpZ2dlci5IT1ZFUlxuICAgICAgXSA9IHRydWVcbiAgICB9XG5cbiAgICBpZiAoJChjb250ZXh0LmdldFRpcEVsZW1lbnQoKSkuaGFzQ2xhc3MoQ2xhc3NOYW1lLlNIT1cpIHx8IGNvbnRleHQuX2hvdmVyU3RhdGUgPT09IEhvdmVyU3RhdGUuU0hPVykge1xuICAgICAgY29udGV4dC5faG92ZXJTdGF0ZSA9IEhvdmVyU3RhdGUuU0hPV1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY2xlYXJUaW1lb3V0KGNvbnRleHQuX3RpbWVvdXQpXG5cbiAgICBjb250ZXh0Ll9ob3ZlclN0YXRlID0gSG92ZXJTdGF0ZS5TSE9XXG5cbiAgICBpZiAoIWNvbnRleHQuY29uZmlnLmRlbGF5IHx8ICFjb250ZXh0LmNvbmZpZy5kZWxheS5zaG93KSB7XG4gICAgICBjb250ZXh0LnNob3coKVxuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgY29udGV4dC5fdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKGNvbnRleHQuX2hvdmVyU3RhdGUgPT09IEhvdmVyU3RhdGUuU0hPVykge1xuICAgICAgICBjb250ZXh0LnNob3coKVxuICAgICAgfVxuICAgIH0sIGNvbnRleHQuY29uZmlnLmRlbGF5LnNob3cpXG4gIH1cblxuICBfbGVhdmUoZXZlbnQsIGNvbnRleHQpIHtcbiAgICBjb25zdCBkYXRhS2V5ID0gdGhpcy5jb25zdHJ1Y3Rvci5EQVRBX0tFWVxuICAgIGNvbnRleHQgPSBjb250ZXh0IHx8ICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YShkYXRhS2V5KVxuXG4gICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICBjb250ZXh0ID0gbmV3IHRoaXMuY29uc3RydWN0b3IoXG4gICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQsXG4gICAgICAgIHRoaXMuX2dldERlbGVnYXRlQ29uZmlnKClcbiAgICAgIClcbiAgICAgICQoZXZlbnQuY3VycmVudFRhcmdldCkuZGF0YShkYXRhS2V5LCBjb250ZXh0KVxuICAgIH1cblxuICAgIGlmIChldmVudCkge1xuICAgICAgY29udGV4dC5fYWN0aXZlVHJpZ2dlcltcbiAgICAgICAgZXZlbnQudHlwZSA9PT0gJ2ZvY3Vzb3V0JyA/IFRyaWdnZXIuRk9DVVMgOiBUcmlnZ2VyLkhPVkVSXG4gICAgICBdID0gZmFsc2VcbiAgICB9XG5cbiAgICBpZiAoY29udGV4dC5faXNXaXRoQWN0aXZlVHJpZ2dlcigpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjbGVhclRpbWVvdXQoY29udGV4dC5fdGltZW91dClcblxuICAgIGNvbnRleHQuX2hvdmVyU3RhdGUgPSBIb3ZlclN0YXRlLk9VVFxuXG4gICAgaWYgKCFjb250ZXh0LmNvbmZpZy5kZWxheSB8fCAhY29udGV4dC5jb25maWcuZGVsYXkuaGlkZSkge1xuICAgICAgY29udGV4dC5oaWRlKClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnRleHQuX3RpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmIChjb250ZXh0Ll9ob3ZlclN0YXRlID09PSBIb3ZlclN0YXRlLk9VVCkge1xuICAgICAgICBjb250ZXh0LmhpZGUoKVxuICAgICAgfVxuICAgIH0sIGNvbnRleHQuY29uZmlnLmRlbGF5LmhpZGUpXG4gIH1cblxuICBfaXNXaXRoQWN0aXZlVHJpZ2dlcigpIHtcbiAgICBmb3IgKGNvbnN0IHRyaWdnZXIgaW4gdGhpcy5fYWN0aXZlVHJpZ2dlcikge1xuICAgICAgaWYgKHRoaXMuX2FjdGl2ZVRyaWdnZXJbdHJpZ2dlcl0pIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIF9nZXRDb25maWcoY29uZmlnKSB7XG4gICAgY29uc3QgZGF0YUF0dHJpYnV0ZXMgPSAkKHRoaXMuZWxlbWVudCkuZGF0YSgpXG5cbiAgICBPYmplY3Qua2V5cyhkYXRhQXR0cmlidXRlcylcbiAgICAgIC5mb3JFYWNoKChkYXRhQXR0cikgPT4ge1xuICAgICAgICBpZiAoRElTQUxMT1dFRF9BVFRSSUJVVEVTLmluZGV4T2YoZGF0YUF0dHIpICE9PSAtMSkge1xuICAgICAgICAgIGRlbGV0ZSBkYXRhQXR0cmlidXRlc1tkYXRhQXR0cl1cbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgIGNvbmZpZyA9IHtcbiAgICAgIC4uLnRoaXMuY29uc3RydWN0b3IuRGVmYXVsdCxcbiAgICAgIC4uLmRhdGFBdHRyaWJ1dGVzLFxuICAgICAgLi4udHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgJiYgY29uZmlnID8gY29uZmlnIDoge31cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGNvbmZpZy5kZWxheSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGNvbmZpZy5kZWxheSA9IHtcbiAgICAgICAgc2hvdzogY29uZmlnLmRlbGF5LFxuICAgICAgICBoaWRlOiBjb25maWcuZGVsYXlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGNvbmZpZy50aXRsZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGNvbmZpZy50aXRsZSA9IGNvbmZpZy50aXRsZS50b1N0cmluZygpXG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBjb25maWcuY29udGVudCA9PT0gJ251bWJlcicpIHtcbiAgICAgIGNvbmZpZy5jb250ZW50ID0gY29uZmlnLmNvbnRlbnQudG9TdHJpbmcoKVxuICAgIH1cblxuICAgIFV0aWwudHlwZUNoZWNrQ29uZmlnKFxuICAgICAgTkFNRSxcbiAgICAgIGNvbmZpZyxcbiAgICAgIHRoaXMuY29uc3RydWN0b3IuRGVmYXVsdFR5cGVcbiAgICApXG5cbiAgICBpZiAoY29uZmlnLnNhbml0aXplKSB7XG4gICAgICBjb25maWcudGVtcGxhdGUgPSBzYW5pdGl6ZUh0bWwoY29uZmlnLnRlbXBsYXRlLCBjb25maWcud2hpdGVMaXN0LCBjb25maWcuc2FuaXRpemVGbilcbiAgICB9XG5cbiAgICByZXR1cm4gY29uZmlnXG4gIH1cblxuICBfZ2V0RGVsZWdhdGVDb25maWcoKSB7XG4gICAgY29uc3QgY29uZmlnID0ge31cblxuICAgIGlmICh0aGlzLmNvbmZpZykge1xuICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5jb25maWcpIHtcbiAgICAgICAgaWYgKHRoaXMuY29uc3RydWN0b3IuRGVmYXVsdFtrZXldICE9PSB0aGlzLmNvbmZpZ1trZXldKSB7XG4gICAgICAgICAgY29uZmlnW2tleV0gPSB0aGlzLmNvbmZpZ1trZXldXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY29uZmlnXG4gIH1cblxuICBfY2xlYW5UaXBDbGFzcygpIHtcbiAgICBjb25zdCAkdGlwID0gJCh0aGlzLmdldFRpcEVsZW1lbnQoKSlcbiAgICBjb25zdCB0YWJDbGFzcyA9ICR0aXAuYXR0cignY2xhc3MnKS5tYXRjaChCU0NMU19QUkVGSVhfUkVHRVgpXG4gICAgaWYgKHRhYkNsYXNzICE9PSBudWxsICYmIHRhYkNsYXNzLmxlbmd0aCkge1xuICAgICAgJHRpcC5yZW1vdmVDbGFzcyh0YWJDbGFzcy5qb2luKCcnKSlcbiAgICB9XG4gIH1cblxuICBfaGFuZGxlUG9wcGVyUGxhY2VtZW50Q2hhbmdlKHBvcHBlckRhdGEpIHtcbiAgICBjb25zdCBwb3BwZXJJbnN0YW5jZSA9IHBvcHBlckRhdGEuaW5zdGFuY2VcbiAgICB0aGlzLnRpcCA9IHBvcHBlckluc3RhbmNlLnBvcHBlclxuICAgIHRoaXMuX2NsZWFuVGlwQ2xhc3MoKVxuICAgIHRoaXMuYWRkQXR0YWNobWVudENsYXNzKHRoaXMuX2dldEF0dGFjaG1lbnQocG9wcGVyRGF0YS5wbGFjZW1lbnQpKVxuICB9XG5cbiAgX2ZpeFRyYW5zaXRpb24oKSB7XG4gICAgY29uc3QgdGlwID0gdGhpcy5nZXRUaXBFbGVtZW50KClcbiAgICBjb25zdCBpbml0Q29uZmlnQW5pbWF0aW9uID0gdGhpcy5jb25maWcuYW5pbWF0aW9uXG5cbiAgICBpZiAodGlwLmdldEF0dHJpYnV0ZSgneC1wbGFjZW1lbnQnKSAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgJCh0aXApLnJlbW92ZUNsYXNzKENsYXNzTmFtZS5GQURFKVxuICAgIHRoaXMuY29uZmlnLmFuaW1hdGlvbiA9IGZhbHNlXG4gICAgdGhpcy5oaWRlKClcbiAgICB0aGlzLnNob3coKVxuICAgIHRoaXMuY29uZmlnLmFuaW1hdGlvbiA9IGluaXRDb25maWdBbmltYXRpb25cbiAgfVxuXG4gIC8vIFN0YXRpY1xuXG4gIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgbGV0IGRhdGEgPSAkKHRoaXMpLmRhdGEoREFUQV9LRVkpXG4gICAgICBjb25zdCBfY29uZmlnID0gdHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgJiYgY29uZmlnXG5cbiAgICAgIGlmICghZGF0YSAmJiAvZGlzcG9zZXxoaWRlLy50ZXN0KGNvbmZpZykpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICBkYXRhID0gbmV3IFRvb2x0aXAodGhpcywgX2NvbmZpZylcbiAgICAgICAgJCh0aGlzKS5kYXRhKERBVEFfS0VZLCBkYXRhKVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2NvbmZpZ10gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKVxuICAgICAgICB9XG4gICAgICAgIGRhdGFbY29uZmlnXSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogalF1ZXJ5XG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4kLmZuW05BTUVdID0gVG9vbHRpcC5falF1ZXJ5SW50ZXJmYWNlXG4kLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gVG9vbHRpcFxuJC5mbltOQU1FXS5ub0NvbmZsaWN0ID0gKCkgPT4ge1xuICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUXG4gIHJldHVybiBUb29sdGlwLl9qUXVlcnlJbnRlcmZhY2Vcbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9vbHRpcFxuIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4zLjEpOiBwb3BvdmVyLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgVG9vbHRpcCBmcm9tICcuL3Rvb2x0aXAnXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb25zdGFudHNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IE5BTUUgICAgICAgICAgICAgICAgPSAncG9wb3ZlcidcbmNvbnN0IFZFUlNJT04gICAgICAgICAgICAgPSAnNC4zLjEnXG5jb25zdCBEQVRBX0tFWSAgICAgICAgICAgID0gJ2JzLnBvcG92ZXInXG5jb25zdCBFVkVOVF9LRVkgICAgICAgICAgID0gYC4ke0RBVEFfS0VZfWBcbmNvbnN0IEpRVUVSWV9OT19DT05GTElDVCAgPSAkLmZuW05BTUVdXG5jb25zdCBDTEFTU19QUkVGSVggICAgICAgID0gJ2JzLXBvcG92ZXInXG5jb25zdCBCU0NMU19QUkVGSVhfUkVHRVggID0gbmV3IFJlZ0V4cChgKF58XFxcXHMpJHtDTEFTU19QUkVGSVh9XFxcXFMrYCwgJ2cnKVxuXG5jb25zdCBEZWZhdWx0ID0ge1xuICAuLi5Ub29sdGlwLkRlZmF1bHQsXG4gIHBsYWNlbWVudCA6ICdyaWdodCcsXG4gIHRyaWdnZXIgICA6ICdjbGljaycsXG4gIGNvbnRlbnQgICA6ICcnLFxuICB0ZW1wbGF0ZSAgOiAnPGRpdiBjbGFzcz1cInBvcG92ZXJcIiByb2xlPVwidG9vbHRpcFwiPicgK1xuICAgICAgICAgICAgICAnPGRpdiBjbGFzcz1cImFycm93XCI+PC9kaXY+JyArXG4gICAgICAgICAgICAgICc8aDMgY2xhc3M9XCJwb3BvdmVyLWhlYWRlclwiPjwvaDM+JyArXG4gICAgICAgICAgICAgICc8ZGl2IGNsYXNzPVwicG9wb3Zlci1ib2R5XCI+PC9kaXY+PC9kaXY+J1xufVxuXG5jb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgLi4uVG9vbHRpcC5EZWZhdWx0VHlwZSxcbiAgY29udGVudCA6ICcoc3RyaW5nfGVsZW1lbnR8ZnVuY3Rpb24pJ1xufVxuXG5jb25zdCBDbGFzc05hbWUgPSB7XG4gIEZBREUgOiAnZmFkZScsXG4gIFNIT1cgOiAnc2hvdydcbn1cblxuY29uc3QgU2VsZWN0b3IgPSB7XG4gIFRJVExFICAgOiAnLnBvcG92ZXItaGVhZGVyJyxcbiAgQ09OVEVOVCA6ICcucG9wb3Zlci1ib2R5J1xufVxuXG5jb25zdCBFdmVudCA9IHtcbiAgSElERSAgICAgICA6IGBoaWRlJHtFVkVOVF9LRVl9YCxcbiAgSElEREVOICAgICA6IGBoaWRkZW4ke0VWRU5UX0tFWX1gLFxuICBTSE9XICAgICAgIDogYHNob3cke0VWRU5UX0tFWX1gLFxuICBTSE9XTiAgICAgIDogYHNob3duJHtFVkVOVF9LRVl9YCxcbiAgSU5TRVJURUQgICA6IGBpbnNlcnRlZCR7RVZFTlRfS0VZfWAsXG4gIENMSUNLICAgICAgOiBgY2xpY2ske0VWRU5UX0tFWX1gLFxuICBGT0NVU0lOICAgIDogYGZvY3VzaW4ke0VWRU5UX0tFWX1gLFxuICBGT0NVU09VVCAgIDogYGZvY3Vzb3V0JHtFVkVOVF9LRVl9YCxcbiAgTU9VU0VFTlRFUiA6IGBtb3VzZWVudGVyJHtFVkVOVF9LRVl9YCxcbiAgTU9VU0VMRUFWRSA6IGBtb3VzZWxlYXZlJHtFVkVOVF9LRVl9YFxufVxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ2xhc3MgRGVmaW5pdGlvblxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuY2xhc3MgUG9wb3ZlciBleHRlbmRzIFRvb2x0aXAge1xuICAvLyBHZXR0ZXJzXG5cbiAgc3RhdGljIGdldCBWRVJTSU9OKCkge1xuICAgIHJldHVybiBWRVJTSU9OXG4gIH1cblxuICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgcmV0dXJuIERlZmF1bHRcbiAgfVxuXG4gIHN0YXRpYyBnZXQgTkFNRSgpIHtcbiAgICByZXR1cm4gTkFNRVxuICB9XG5cbiAgc3RhdGljIGdldCBEQVRBX0tFWSgpIHtcbiAgICByZXR1cm4gREFUQV9LRVlcbiAgfVxuXG4gIHN0YXRpYyBnZXQgRXZlbnQoKSB7XG4gICAgcmV0dXJuIEV2ZW50XG4gIH1cblxuICBzdGF0aWMgZ2V0IEVWRU5UX0tFWSgpIHtcbiAgICByZXR1cm4gRVZFTlRfS0VZXG4gIH1cblxuICBzdGF0aWMgZ2V0IERlZmF1bHRUeXBlKCkge1xuICAgIHJldHVybiBEZWZhdWx0VHlwZVxuICB9XG5cbiAgLy8gT3ZlcnJpZGVzXG5cbiAgaXNXaXRoQ29udGVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRUaXRsZSgpIHx8IHRoaXMuX2dldENvbnRlbnQoKVxuICB9XG5cbiAgYWRkQXR0YWNobWVudENsYXNzKGF0dGFjaG1lbnQpIHtcbiAgICAkKHRoaXMuZ2V0VGlwRWxlbWVudCgpKS5hZGRDbGFzcyhgJHtDTEFTU19QUkVGSVh9LSR7YXR0YWNobWVudH1gKVxuICB9XG5cbiAgZ2V0VGlwRWxlbWVudCgpIHtcbiAgICB0aGlzLnRpcCA9IHRoaXMudGlwIHx8ICQodGhpcy5jb25maWcudGVtcGxhdGUpWzBdXG4gICAgcmV0dXJuIHRoaXMudGlwXG4gIH1cblxuICBzZXRDb250ZW50KCkge1xuICAgIGNvbnN0ICR0aXAgPSAkKHRoaXMuZ2V0VGlwRWxlbWVudCgpKVxuXG4gICAgLy8gV2UgdXNlIGFwcGVuZCBmb3IgaHRtbCBvYmplY3RzIHRvIG1haW50YWluIGpzIGV2ZW50c1xuICAgIHRoaXMuc2V0RWxlbWVudENvbnRlbnQoJHRpcC5maW5kKFNlbGVjdG9yLlRJVExFKSwgdGhpcy5nZXRUaXRsZSgpKVxuICAgIGxldCBjb250ZW50ID0gdGhpcy5fZ2V0Q29udGVudCgpXG4gICAgaWYgKHR5cGVvZiBjb250ZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBjb250ZW50ID0gY29udGVudC5jYWxsKHRoaXMuZWxlbWVudClcbiAgICB9XG4gICAgdGhpcy5zZXRFbGVtZW50Q29udGVudCgkdGlwLmZpbmQoU2VsZWN0b3IuQ09OVEVOVCksIGNvbnRlbnQpXG5cbiAgICAkdGlwLnJlbW92ZUNsYXNzKGAke0NsYXNzTmFtZS5GQURFfSAke0NsYXNzTmFtZS5TSE9XfWApXG4gIH1cblxuICAvLyBQcml2YXRlXG5cbiAgX2dldENvbnRlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtY29udGVudCcpIHx8XG4gICAgICB0aGlzLmNvbmZpZy5jb250ZW50XG4gIH1cblxuICBfY2xlYW5UaXBDbGFzcygpIHtcbiAgICBjb25zdCAkdGlwID0gJCh0aGlzLmdldFRpcEVsZW1lbnQoKSlcbiAgICBjb25zdCB0YWJDbGFzcyA9ICR0aXAuYXR0cignY2xhc3MnKS5tYXRjaChCU0NMU19QUkVGSVhfUkVHRVgpXG4gICAgaWYgKHRhYkNsYXNzICE9PSBudWxsICYmIHRhYkNsYXNzLmxlbmd0aCA+IDApIHtcbiAgICAgICR0aXAucmVtb3ZlQ2xhc3ModGFiQ2xhc3Muam9pbignJykpXG4gICAgfVxuICB9XG5cbiAgLy8gU3RhdGljXG5cbiAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgZGF0YSA9ICQodGhpcykuZGF0YShEQVRBX0tFWSlcbiAgICAgIGNvbnN0IF9jb25maWcgPSB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyA/IGNvbmZpZyA6IG51bGxcblxuICAgICAgaWYgKCFkYXRhICYmIC9kaXNwb3NlfGhpZGUvLnRlc3QoY29uZmlnKSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBuZXcgUG9wb3Zlcih0aGlzLCBfY29uZmlnKVxuICAgICAgICAkKHRoaXMpLmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApXG4gICAgICAgIH1cbiAgICAgICAgZGF0YVtjb25maWddKClcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBqUXVlcnlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbiQuZm5bTkFNRV0gPSBQb3BvdmVyLl9qUXVlcnlJbnRlcmZhY2VcbiQuZm5bTkFNRV0uQ29uc3RydWN0b3IgPSBQb3BvdmVyXG4kLmZuW05BTUVdLm5vQ29uZmxpY3QgPSAoKSA9PiB7XG4gICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgcmV0dXJuIFBvcG92ZXIuX2pRdWVyeUludGVyZmFjZVxufVxuXG5leHBvcnQgZGVmYXVsdCBQb3BvdmVyXG4iLCIvKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBCb290c3RyYXAgKHY0LjMuMSk6IHNjcm9sbHNweS5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IFV0aWwgZnJvbSAnLi91dGlsJ1xuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29uc3RhbnRzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jb25zdCBOQU1FICAgICAgICAgICAgICAgPSAnc2Nyb2xsc3B5J1xuY29uc3QgVkVSU0lPTiAgICAgICAgICAgID0gJzQuMy4xJ1xuY29uc3QgREFUQV9LRVkgICAgICAgICAgID0gJ2JzLnNjcm9sbHNweSdcbmNvbnN0IEVWRU5UX0tFWSAgICAgICAgICA9IGAuJHtEQVRBX0tFWX1gXG5jb25zdCBEQVRBX0FQSV9LRVkgICAgICAgPSAnLmRhdGEtYXBpJ1xuY29uc3QgSlFVRVJZX05PX0NPTkZMSUNUID0gJC5mbltOQU1FXVxuXG5jb25zdCBEZWZhdWx0ID0ge1xuICBvZmZzZXQgOiAxMCxcbiAgbWV0aG9kIDogJ2F1dG8nLFxuICB0YXJnZXQgOiAnJ1xufVxuXG5jb25zdCBEZWZhdWx0VHlwZSA9IHtcbiAgb2Zmc2V0IDogJ251bWJlcicsXG4gIG1ldGhvZCA6ICdzdHJpbmcnLFxuICB0YXJnZXQgOiAnKHN0cmluZ3xlbGVtZW50KSdcbn1cblxuY29uc3QgRXZlbnQgPSB7XG4gIEFDVElWQVRFICAgICAgOiBgYWN0aXZhdGUke0VWRU5UX0tFWX1gLFxuICBTQ1JPTEwgICAgICAgIDogYHNjcm9sbCR7RVZFTlRfS0VZfWAsXG4gIExPQURfREFUQV9BUEkgOiBgbG9hZCR7RVZFTlRfS0VZfSR7REFUQV9BUElfS0VZfWBcbn1cblxuY29uc3QgQ2xhc3NOYW1lID0ge1xuICBEUk9QRE9XTl9JVEVNIDogJ2Ryb3Bkb3duLWl0ZW0nLFxuICBEUk9QRE9XTl9NRU5VIDogJ2Ryb3Bkb3duLW1lbnUnLFxuICBBQ1RJVkUgICAgICAgIDogJ2FjdGl2ZSdcbn1cblxuY29uc3QgU2VsZWN0b3IgPSB7XG4gIERBVEFfU1BZICAgICAgICA6ICdbZGF0YS1zcHk9XCJzY3JvbGxcIl0nLFxuICBBQ1RJVkUgICAgICAgICAgOiAnLmFjdGl2ZScsXG4gIE5BVl9MSVNUX0dST1VQICA6ICcubmF2LCAubGlzdC1ncm91cCcsXG4gIE5BVl9MSU5LUyAgICAgICA6ICcubmF2LWxpbmsnLFxuICBOQVZfSVRFTVMgICAgICAgOiAnLm5hdi1pdGVtJyxcbiAgTElTVF9JVEVNUyAgICAgIDogJy5saXN0LWdyb3VwLWl0ZW0nLFxuICBEUk9QRE9XTiAgICAgICAgOiAnLmRyb3Bkb3duJyxcbiAgRFJPUERPV05fSVRFTVMgIDogJy5kcm9wZG93bi1pdGVtJyxcbiAgRFJPUERPV05fVE9HR0xFIDogJy5kcm9wZG93bi10b2dnbGUnXG59XG5cbmNvbnN0IE9mZnNldE1ldGhvZCA9IHtcbiAgT0ZGU0VUICAgOiAnb2Zmc2V0JyxcbiAgUE9TSVRJT04gOiAncG9zaXRpb24nXG59XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDbGFzcyBEZWZpbml0aW9uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jbGFzcyBTY3JvbGxTcHkge1xuICBjb25zdHJ1Y3RvcihlbGVtZW50LCBjb25maWcpIHtcbiAgICB0aGlzLl9lbGVtZW50ICAgICAgID0gZWxlbWVudFxuICAgIHRoaXMuX3Njcm9sbEVsZW1lbnQgPSBlbGVtZW50LnRhZ05hbWUgPT09ICdCT0RZJyA/IHdpbmRvdyA6IGVsZW1lbnRcbiAgICB0aGlzLl9jb25maWcgICAgICAgID0gdGhpcy5fZ2V0Q29uZmlnKGNvbmZpZylcbiAgICB0aGlzLl9zZWxlY3RvciAgICAgID0gYCR7dGhpcy5fY29uZmlnLnRhcmdldH0gJHtTZWxlY3Rvci5OQVZfTElOS1N9LGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBgJHt0aGlzLl9jb25maWcudGFyZ2V0fSAke1NlbGVjdG9yLkxJU1RfSVRFTVN9LGAgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICBgJHt0aGlzLl9jb25maWcudGFyZ2V0fSAke1NlbGVjdG9yLkRST1BET1dOX0lURU1TfWBcbiAgICB0aGlzLl9vZmZzZXRzICAgICAgID0gW11cbiAgICB0aGlzLl90YXJnZXRzICAgICAgID0gW11cbiAgICB0aGlzLl9hY3RpdmVUYXJnZXQgID0gbnVsbFxuICAgIHRoaXMuX3Njcm9sbEhlaWdodCAgPSAwXG5cbiAgICAkKHRoaXMuX3Njcm9sbEVsZW1lbnQpLm9uKEV2ZW50LlNDUk9MTCwgKGV2ZW50KSA9PiB0aGlzLl9wcm9jZXNzKGV2ZW50KSlcblxuICAgIHRoaXMucmVmcmVzaCgpXG4gICAgdGhpcy5fcHJvY2VzcygpXG4gIH1cblxuICAvLyBHZXR0ZXJzXG5cbiAgc3RhdGljIGdldCBWRVJTSU9OKCkge1xuICAgIHJldHVybiBWRVJTSU9OXG4gIH1cblxuICBzdGF0aWMgZ2V0IERlZmF1bHQoKSB7XG4gICAgcmV0dXJuIERlZmF1bHRcbiAgfVxuXG4gIC8vIFB1YmxpY1xuXG4gIHJlZnJlc2goKSB7XG4gICAgY29uc3QgYXV0b01ldGhvZCA9IHRoaXMuX3Njcm9sbEVsZW1lbnQgPT09IHRoaXMuX3Njcm9sbEVsZW1lbnQud2luZG93XG4gICAgICA/IE9mZnNldE1ldGhvZC5PRkZTRVQgOiBPZmZzZXRNZXRob2QuUE9TSVRJT05cblxuICAgIGNvbnN0IG9mZnNldE1ldGhvZCA9IHRoaXMuX2NvbmZpZy5tZXRob2QgPT09ICdhdXRvJ1xuICAgICAgPyBhdXRvTWV0aG9kIDogdGhpcy5fY29uZmlnLm1ldGhvZFxuXG4gICAgY29uc3Qgb2Zmc2V0QmFzZSA9IG9mZnNldE1ldGhvZCA9PT0gT2Zmc2V0TWV0aG9kLlBPU0lUSU9OXG4gICAgICA/IHRoaXMuX2dldFNjcm9sbFRvcCgpIDogMFxuXG4gICAgdGhpcy5fb2Zmc2V0cyA9IFtdXG4gICAgdGhpcy5fdGFyZ2V0cyA9IFtdXG5cbiAgICB0aGlzLl9zY3JvbGxIZWlnaHQgPSB0aGlzLl9nZXRTY3JvbGxIZWlnaHQoKVxuXG4gICAgY29uc3QgdGFyZ2V0cyA9IFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9zZWxlY3RvcikpXG5cbiAgICB0YXJnZXRzXG4gICAgICAubWFwKChlbGVtZW50KSA9PiB7XG4gICAgICAgIGxldCB0YXJnZXRcbiAgICAgICAgY29uc3QgdGFyZ2V0U2VsZWN0b3IgPSBVdGlsLmdldFNlbGVjdG9yRnJvbUVsZW1lbnQoZWxlbWVudClcblxuICAgICAgICBpZiAodGFyZ2V0U2VsZWN0b3IpIHtcbiAgICAgICAgICB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldFNlbGVjdG9yKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgIGNvbnN0IHRhcmdldEJDUiA9IHRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgIGlmICh0YXJnZXRCQ1Iud2lkdGggfHwgdGFyZ2V0QkNSLmhlaWdodCkge1xuICAgICAgICAgICAgLy8gVE9ETyAoZmF0KTogcmVtb3ZlIHNrZXRjaCByZWxpYW5jZSBvbiBqUXVlcnkgcG9zaXRpb24vb2Zmc2V0XG4gICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAkKHRhcmdldClbb2Zmc2V0TWV0aG9kXSgpLnRvcCArIG9mZnNldEJhc2UsXG4gICAgICAgICAgICAgIHRhcmdldFNlbGVjdG9yXG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgICB9KVxuICAgICAgLmZpbHRlcigoaXRlbSkgPT4gaXRlbSlcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBhWzBdIC0gYlswXSlcbiAgICAgIC5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgIHRoaXMuX29mZnNldHMucHVzaChpdGVtWzBdKVxuICAgICAgICB0aGlzLl90YXJnZXRzLnB1c2goaXRlbVsxXSlcbiAgICAgIH0pXG4gIH1cblxuICBkaXNwb3NlKCkge1xuICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSlcbiAgICAkKHRoaXMuX3Njcm9sbEVsZW1lbnQpLm9mZihFVkVOVF9LRVkpXG5cbiAgICB0aGlzLl9lbGVtZW50ICAgICAgID0gbnVsbFxuICAgIHRoaXMuX3Njcm9sbEVsZW1lbnQgPSBudWxsXG4gICAgdGhpcy5fY29uZmlnICAgICAgICA9IG51bGxcbiAgICB0aGlzLl9zZWxlY3RvciAgICAgID0gbnVsbFxuICAgIHRoaXMuX29mZnNldHMgICAgICAgPSBudWxsXG4gICAgdGhpcy5fdGFyZ2V0cyAgICAgICA9IG51bGxcbiAgICB0aGlzLl9hY3RpdmVUYXJnZXQgID0gbnVsbFxuICAgIHRoaXMuX3Njcm9sbEhlaWdodCAgPSBudWxsXG4gIH1cblxuICAvLyBQcml2YXRlXG5cbiAgX2dldENvbmZpZyhjb25maWcpIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAuLi5EZWZhdWx0LFxuICAgICAgLi4udHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgJiYgY29uZmlnID8gY29uZmlnIDoge31cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGNvbmZpZy50YXJnZXQgIT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgaWQgPSAkKGNvbmZpZy50YXJnZXQpLmF0dHIoJ2lkJylcbiAgICAgIGlmICghaWQpIHtcbiAgICAgICAgaWQgPSBVdGlsLmdldFVJRChOQU1FKVxuICAgICAgICAkKGNvbmZpZy50YXJnZXQpLmF0dHIoJ2lkJywgaWQpXG4gICAgICB9XG4gICAgICBjb25maWcudGFyZ2V0ID0gYCMke2lkfWBcbiAgICB9XG5cbiAgICBVdGlsLnR5cGVDaGVja0NvbmZpZyhOQU1FLCBjb25maWcsIERlZmF1bHRUeXBlKVxuXG4gICAgcmV0dXJuIGNvbmZpZ1xuICB9XG5cbiAgX2dldFNjcm9sbFRvcCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2Nyb2xsRWxlbWVudCA9PT0gd2luZG93XG4gICAgICA/IHRoaXMuX3Njcm9sbEVsZW1lbnQucGFnZVlPZmZzZXQgOiB0aGlzLl9zY3JvbGxFbGVtZW50LnNjcm9sbFRvcFxuICB9XG5cbiAgX2dldFNjcm9sbEhlaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc2Nyb2xsRWxlbWVudC5zY3JvbGxIZWlnaHQgfHwgTWF0aC5tYXgoXG4gICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCxcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHRcbiAgICApXG4gIH1cblxuICBfZ2V0T2Zmc2V0SGVpZ2h0KCkge1xuICAgIHJldHVybiB0aGlzLl9zY3JvbGxFbGVtZW50ID09PSB3aW5kb3dcbiAgICAgID8gd2luZG93LmlubmVySGVpZ2h0IDogdGhpcy5fc2Nyb2xsRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHRcbiAgfVxuXG4gIF9wcm9jZXNzKCkge1xuICAgIGNvbnN0IHNjcm9sbFRvcCAgICA9IHRoaXMuX2dldFNjcm9sbFRvcCgpICsgdGhpcy5fY29uZmlnLm9mZnNldFxuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IHRoaXMuX2dldFNjcm9sbEhlaWdodCgpXG4gICAgY29uc3QgbWF4U2Nyb2xsICAgID0gdGhpcy5fY29uZmlnLm9mZnNldCArXG4gICAgICBzY3JvbGxIZWlnaHQgLVxuICAgICAgdGhpcy5fZ2V0T2Zmc2V0SGVpZ2h0KClcblxuICAgIGlmICh0aGlzLl9zY3JvbGxIZWlnaHQgIT09IHNjcm9sbEhlaWdodCkge1xuICAgICAgdGhpcy5yZWZyZXNoKClcbiAgICB9XG5cbiAgICBpZiAoc2Nyb2xsVG9wID49IG1heFNjcm9sbCkge1xuICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5fdGFyZ2V0c1t0aGlzLl90YXJnZXRzLmxlbmd0aCAtIDFdXG5cbiAgICAgIGlmICh0aGlzLl9hY3RpdmVUYXJnZXQgIT09IHRhcmdldCkge1xuICAgICAgICB0aGlzLl9hY3RpdmF0ZSh0YXJnZXQpXG4gICAgICB9XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBpZiAodGhpcy5fYWN0aXZlVGFyZ2V0ICYmIHNjcm9sbFRvcCA8IHRoaXMuX29mZnNldHNbMF0gJiYgdGhpcy5fb2Zmc2V0c1swXSA+IDApIHtcbiAgICAgIHRoaXMuX2FjdGl2ZVRhcmdldCA9IG51bGxcbiAgICAgIHRoaXMuX2NsZWFyKClcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IG9mZnNldExlbmd0aCA9IHRoaXMuX29mZnNldHMubGVuZ3RoXG4gICAgZm9yIChsZXQgaSA9IG9mZnNldExlbmd0aDsgaS0tOykge1xuICAgICAgY29uc3QgaXNBY3RpdmVUYXJnZXQgPSB0aGlzLl9hY3RpdmVUYXJnZXQgIT09IHRoaXMuX3RhcmdldHNbaV0gJiZcbiAgICAgICAgICBzY3JvbGxUb3AgPj0gdGhpcy5fb2Zmc2V0c1tpXSAmJlxuICAgICAgICAgICh0eXBlb2YgdGhpcy5fb2Zmc2V0c1tpICsgMV0gPT09ICd1bmRlZmluZWQnIHx8XG4gICAgICAgICAgICAgIHNjcm9sbFRvcCA8IHRoaXMuX29mZnNldHNbaSArIDFdKVxuXG4gICAgICBpZiAoaXNBY3RpdmVUYXJnZXQpIHtcbiAgICAgICAgdGhpcy5fYWN0aXZhdGUodGhpcy5fdGFyZ2V0c1tpXSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBfYWN0aXZhdGUodGFyZ2V0KSB7XG4gICAgdGhpcy5fYWN0aXZlVGFyZ2V0ID0gdGFyZ2V0XG5cbiAgICB0aGlzLl9jbGVhcigpXG5cbiAgICBjb25zdCBxdWVyaWVzID0gdGhpcy5fc2VsZWN0b3JcbiAgICAgIC5zcGxpdCgnLCcpXG4gICAgICAubWFwKChzZWxlY3RvcikgPT4gYCR7c2VsZWN0b3J9W2RhdGEtdGFyZ2V0PVwiJHt0YXJnZXR9XCJdLCR7c2VsZWN0b3J9W2hyZWY9XCIke3RhcmdldH1cIl1gKVxuXG4gICAgY29uc3QgJGxpbmsgPSAkKFtdLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChxdWVyaWVzLmpvaW4oJywnKSkpKVxuXG4gICAgaWYgKCRsaW5rLmhhc0NsYXNzKENsYXNzTmFtZS5EUk9QRE9XTl9JVEVNKSkge1xuICAgICAgJGxpbmsuY2xvc2VzdChTZWxlY3Rvci5EUk9QRE9XTikuZmluZChTZWxlY3Rvci5EUk9QRE9XTl9UT0dHTEUpLmFkZENsYXNzKENsYXNzTmFtZS5BQ1RJVkUpXG4gICAgICAkbGluay5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTZXQgdHJpZ2dlcmVkIGxpbmsgYXMgYWN0aXZlXG4gICAgICAkbGluay5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKVxuICAgICAgLy8gU2V0IHRyaWdnZXJlZCBsaW5rcyBwYXJlbnRzIGFzIGFjdGl2ZVxuICAgICAgLy8gV2l0aCBib3RoIDx1bD4gYW5kIDxuYXY+IG1hcmt1cCBhIHBhcmVudCBpcyB0aGUgcHJldmlvdXMgc2libGluZyBvZiBhbnkgbmF2IGFuY2VzdG9yXG4gICAgICAkbGluay5wYXJlbnRzKFNlbGVjdG9yLk5BVl9MSVNUX0dST1VQKS5wcmV2KGAke1NlbGVjdG9yLk5BVl9MSU5LU30sICR7U2VsZWN0b3IuTElTVF9JVEVNU31gKS5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKVxuICAgICAgLy8gSGFuZGxlIHNwZWNpYWwgY2FzZSB3aGVuIC5uYXYtbGluayBpcyBpbnNpZGUgLm5hdi1pdGVtXG4gICAgICAkbGluay5wYXJlbnRzKFNlbGVjdG9yLk5BVl9MSVNUX0dST1VQKS5wcmV2KFNlbGVjdG9yLk5BVl9JVEVNUykuY2hpbGRyZW4oU2VsZWN0b3IuTkFWX0xJTktTKS5hZGRDbGFzcyhDbGFzc05hbWUuQUNUSVZFKVxuICAgIH1cblxuICAgICQodGhpcy5fc2Nyb2xsRWxlbWVudCkudHJpZ2dlcihFdmVudC5BQ1RJVkFURSwge1xuICAgICAgcmVsYXRlZFRhcmdldDogdGFyZ2V0XG4gICAgfSlcbiAgfVxuXG4gIF9jbGVhcigpIHtcbiAgICBbXS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwodGhpcy5fc2VsZWN0b3IpKVxuICAgICAgLmZpbHRlcigobm9kZSkgPT4gbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoQ2xhc3NOYW1lLkFDVElWRSkpXG4gICAgICAuZm9yRWFjaCgobm9kZSkgPT4gbm9kZS5jbGFzc0xpc3QucmVtb3ZlKENsYXNzTmFtZS5BQ1RJVkUpKVxuICB9XG5cbiAgLy8gU3RhdGljXG5cbiAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgZGF0YSA9ICQodGhpcykuZGF0YShEQVRBX0tFWSlcbiAgICAgIGNvbnN0IF9jb25maWcgPSB0eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWdcblxuICAgICAgaWYgKCFkYXRhKSB7XG4gICAgICAgIGRhdGEgPSBuZXcgU2Nyb2xsU3B5KHRoaXMsIF9jb25maWcpXG4gICAgICAgICQodGhpcykuZGF0YShEQVRBX0tFWSwgZGF0YSlcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBjb25maWcgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgZGF0YVtjb25maWddID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYE5vIG1ldGhvZCBuYW1lZCBcIiR7Y29uZmlnfVwiYClcbiAgICAgICAgfVxuICAgICAgICBkYXRhW2NvbmZpZ10oKVxuICAgICAgfVxuICAgIH0pXG4gIH1cbn1cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIERhdGEgQXBpIGltcGxlbWVudGF0aW9uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG4kKHdpbmRvdykub24oRXZlbnQuTE9BRF9EQVRBX0FQSSwgKCkgPT4ge1xuICBjb25zdCBzY3JvbGxTcHlzID0gW10uc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFNlbGVjdG9yLkRBVEFfU1BZKSlcbiAgY29uc3Qgc2Nyb2xsU3B5c0xlbmd0aCA9IHNjcm9sbFNweXMubGVuZ3RoXG5cbiAgZm9yIChsZXQgaSA9IHNjcm9sbFNweXNMZW5ndGg7IGktLTspIHtcbiAgICBjb25zdCAkc3B5ID0gJChzY3JvbGxTcHlzW2ldKVxuICAgIFNjcm9sbFNweS5falF1ZXJ5SW50ZXJmYWNlLmNhbGwoJHNweSwgJHNweS5kYXRhKCkpXG4gIH1cbn0pXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBqUXVlcnlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbiQuZm5bTkFNRV0gPSBTY3JvbGxTcHkuX2pRdWVyeUludGVyZmFjZVxuJC5mbltOQU1FXS5Db25zdHJ1Y3RvciA9IFNjcm9sbFNweVxuJC5mbltOQU1FXS5ub0NvbmZsaWN0ID0gKCkgPT4ge1xuICAkLmZuW05BTUVdID0gSlFVRVJZX05PX0NPTkZMSUNUXG4gIHJldHVybiBTY3JvbGxTcHkuX2pRdWVyeUludGVyZmFjZVxufVxuXG5leHBvcnQgZGVmYXVsdCBTY3JvbGxTcHlcbiIsIi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIEJvb3RzdHJhcCAodjQuMy4xKTogdGFiLmpzXG4gKiBMaWNlbnNlZCB1bmRlciBNSVQgKGh0dHBzOi8vZ2l0aHViLmNvbS90d2JzL2Jvb3RzdHJhcC9ibG9iL21hc3Rlci9MSUNFTlNFKVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5pbXBvcnQgJCBmcm9tICdqcXVlcnknXG5pbXBvcnQgVXRpbCBmcm9tICcuL3V0aWwnXG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDb25zdGFudHNcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNvbnN0IE5BTUUgICAgICAgICAgICAgICA9ICd0YWInXG5jb25zdCBWRVJTSU9OICAgICAgICAgICAgPSAnNC4zLjEnXG5jb25zdCBEQVRBX0tFWSAgICAgICAgICAgPSAnYnMudGFiJ1xuY29uc3QgRVZFTlRfS0VZICAgICAgICAgID0gYC4ke0RBVEFfS0VZfWBcbmNvbnN0IERBVEFfQVBJX0tFWSAgICAgICA9ICcuZGF0YS1hcGknXG5jb25zdCBKUVVFUllfTk9fQ09ORkxJQ1QgPSAkLmZuW05BTUVdXG5cbmNvbnN0IEV2ZW50ID0ge1xuICBISURFICAgICAgICAgICA6IGBoaWRlJHtFVkVOVF9LRVl9YCxcbiAgSElEREVOICAgICAgICAgOiBgaGlkZGVuJHtFVkVOVF9LRVl9YCxcbiAgU0hPVyAgICAgICAgICAgOiBgc2hvdyR7RVZFTlRfS0VZfWAsXG4gIFNIT1dOICAgICAgICAgIDogYHNob3duJHtFVkVOVF9LRVl9YCxcbiAgQ0xJQ0tfREFUQV9BUEkgOiBgY2xpY2ske0VWRU5UX0tFWX0ke0RBVEFfQVBJX0tFWX1gXG59XG5cbmNvbnN0IENsYXNzTmFtZSA9IHtcbiAgRFJPUERPV05fTUVOVSA6ICdkcm9wZG93bi1tZW51JyxcbiAgQUNUSVZFICAgICAgICA6ICdhY3RpdmUnLFxuICBESVNBQkxFRCAgICAgIDogJ2Rpc2FibGVkJyxcbiAgRkFERSAgICAgICAgICA6ICdmYWRlJyxcbiAgU0hPVyAgICAgICAgICA6ICdzaG93J1xufVxuXG5jb25zdCBTZWxlY3RvciA9IHtcbiAgRFJPUERPV04gICAgICAgICAgICAgIDogJy5kcm9wZG93bicsXG4gIE5BVl9MSVNUX0dST1VQICAgICAgICA6ICcubmF2LCAubGlzdC1ncm91cCcsXG4gIEFDVElWRSAgICAgICAgICAgICAgICA6ICcuYWN0aXZlJyxcbiAgQUNUSVZFX1VMICAgICAgICAgICAgIDogJz4gbGkgPiAuYWN0aXZlJyxcbiAgREFUQV9UT0dHTEUgICAgICAgICAgIDogJ1tkYXRhLXRvZ2dsZT1cInRhYlwiXSwgW2RhdGEtdG9nZ2xlPVwicGlsbFwiXSwgW2RhdGEtdG9nZ2xlPVwibGlzdFwiXScsXG4gIERST1BET1dOX1RPR0dMRSAgICAgICA6ICcuZHJvcGRvd24tdG9nZ2xlJyxcbiAgRFJPUERPV05fQUNUSVZFX0NISUxEIDogJz4gLmRyb3Bkb3duLW1lbnUgLmFjdGl2ZSdcbn1cblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIENsYXNzIERlZmluaXRpb25cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbmNsYXNzIFRhYiB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICB0aGlzLl9lbGVtZW50ID0gZWxlbWVudFxuICB9XG5cbiAgLy8gR2V0dGVyc1xuXG4gIHN0YXRpYyBnZXQgVkVSU0lPTigpIHtcbiAgICByZXR1cm4gVkVSU0lPTlxuICB9XG5cbiAgLy8gUHVibGljXG5cbiAgc2hvdygpIHtcbiAgICBpZiAodGhpcy5fZWxlbWVudC5wYXJlbnROb2RlICYmXG4gICAgICAgIHRoaXMuX2VsZW1lbnQucGFyZW50Tm9kZS5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUgJiZcbiAgICAgICAgJCh0aGlzLl9lbGVtZW50KS5oYXNDbGFzcyhDbGFzc05hbWUuQUNUSVZFKSB8fFxuICAgICAgICAkKHRoaXMuX2VsZW1lbnQpLmhhc0NsYXNzKENsYXNzTmFtZS5ESVNBQkxFRCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGxldCB0YXJnZXRcbiAgICBsZXQgcHJldmlvdXNcbiAgICBjb25zdCBsaXN0RWxlbWVudCA9ICQodGhpcy5fZWxlbWVudCkuY2xvc2VzdChTZWxlY3Rvci5OQVZfTElTVF9HUk9VUClbMF1cbiAgICBjb25zdCBzZWxlY3RvciA9IFV0aWwuZ2V0U2VsZWN0b3JGcm9tRWxlbWVudCh0aGlzLl9lbGVtZW50KVxuXG4gICAgaWYgKGxpc3RFbGVtZW50KSB7XG4gICAgICBjb25zdCBpdGVtU2VsZWN0b3IgPSBsaXN0RWxlbWVudC5ub2RlTmFtZSA9PT0gJ1VMJyB8fCBsaXN0RWxlbWVudC5ub2RlTmFtZSA9PT0gJ09MJyA/IFNlbGVjdG9yLkFDVElWRV9VTCA6IFNlbGVjdG9yLkFDVElWRVxuICAgICAgcHJldmlvdXMgPSAkLm1ha2VBcnJheSgkKGxpc3RFbGVtZW50KS5maW5kKGl0ZW1TZWxlY3RvcikpXG4gICAgICBwcmV2aW91cyA9IHByZXZpb3VzW3ByZXZpb3VzLmxlbmd0aCAtIDFdXG4gICAgfVxuXG4gICAgY29uc3QgaGlkZUV2ZW50ID0gJC5FdmVudChFdmVudC5ISURFLCB7XG4gICAgICByZWxhdGVkVGFyZ2V0OiB0aGlzLl9lbGVtZW50XG4gICAgfSlcblxuICAgIGNvbnN0IHNob3dFdmVudCA9ICQuRXZlbnQoRXZlbnQuU0hPVywge1xuICAgICAgcmVsYXRlZFRhcmdldDogcHJldmlvdXNcbiAgICB9KVxuXG4gICAgaWYgKHByZXZpb3VzKSB7XG4gICAgICAkKHByZXZpb3VzKS50cmlnZ2VyKGhpZGVFdmVudClcbiAgICB9XG5cbiAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoc2hvd0V2ZW50KVxuXG4gICAgaWYgKHNob3dFdmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSB8fFxuICAgICAgICBoaWRlRXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcbiAgICB9XG5cbiAgICB0aGlzLl9hY3RpdmF0ZShcbiAgICAgIHRoaXMuX2VsZW1lbnQsXG4gICAgICBsaXN0RWxlbWVudFxuICAgIClcblxuICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgY29uc3QgaGlkZGVuRXZlbnQgPSAkLkV2ZW50KEV2ZW50LkhJRERFTiwge1xuICAgICAgICByZWxhdGVkVGFyZ2V0OiB0aGlzLl9lbGVtZW50XG4gICAgICB9KVxuXG4gICAgICBjb25zdCBzaG93bkV2ZW50ID0gJC5FdmVudChFdmVudC5TSE9XTiwge1xuICAgICAgICByZWxhdGVkVGFyZ2V0OiBwcmV2aW91c1xuICAgICAgfSlcblxuICAgICAgJChwcmV2aW91cykudHJpZ2dlcihoaWRkZW5FdmVudClcbiAgICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihzaG93bkV2ZW50KVxuICAgIH1cblxuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgIHRoaXMuX2FjdGl2YXRlKHRhcmdldCwgdGFyZ2V0LnBhcmVudE5vZGUsIGNvbXBsZXRlKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb21wbGV0ZSgpXG4gICAgfVxuICB9XG5cbiAgZGlzcG9zZSgpIHtcbiAgICAkLnJlbW92ZURhdGEodGhpcy5fZWxlbWVudCwgREFUQV9LRVkpXG4gICAgdGhpcy5fZWxlbWVudCA9IG51bGxcbiAgfVxuXG4gIC8vIFByaXZhdGVcblxuICBfYWN0aXZhdGUoZWxlbWVudCwgY29udGFpbmVyLCBjYWxsYmFjaykge1xuICAgIGNvbnN0IGFjdGl2ZUVsZW1lbnRzID0gY29udGFpbmVyICYmIChjb250YWluZXIubm9kZU5hbWUgPT09ICdVTCcgfHwgY29udGFpbmVyLm5vZGVOYW1lID09PSAnT0wnKVxuICAgICAgPyAkKGNvbnRhaW5lcikuZmluZChTZWxlY3Rvci5BQ1RJVkVfVUwpXG4gICAgICA6ICQoY29udGFpbmVyKS5jaGlsZHJlbihTZWxlY3Rvci5BQ1RJVkUpXG5cbiAgICBjb25zdCBhY3RpdmUgPSBhY3RpdmVFbGVtZW50c1swXVxuICAgIGNvbnN0IGlzVHJhbnNpdGlvbmluZyA9IGNhbGxiYWNrICYmIChhY3RpdmUgJiYgJChhY3RpdmUpLmhhc0NsYXNzKENsYXNzTmFtZS5GQURFKSlcbiAgICBjb25zdCBjb21wbGV0ZSA9ICgpID0+IHRoaXMuX3RyYW5zaXRpb25Db21wbGV0ZShcbiAgICAgIGVsZW1lbnQsXG4gICAgICBhY3RpdmUsXG4gICAgICBjYWxsYmFja1xuICAgIClcblxuICAgIGlmIChhY3RpdmUgJiYgaXNUcmFuc2l0aW9uaW5nKSB7XG4gICAgICBjb25zdCB0cmFuc2l0aW9uRHVyYXRpb24gPSBVdGlsLmdldFRyYW5zaXRpb25EdXJhdGlvbkZyb21FbGVtZW50KGFjdGl2ZSlcblxuICAgICAgJChhY3RpdmUpXG4gICAgICAgIC5yZW1vdmVDbGFzcyhDbGFzc05hbWUuU0hPVylcbiAgICAgICAgLm9uZShVdGlsLlRSQU5TSVRJT05fRU5ELCBjb21wbGV0ZSlcbiAgICAgICAgLmVtdWxhdGVUcmFuc2l0aW9uRW5kKHRyYW5zaXRpb25EdXJhdGlvbilcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcGxldGUoKVxuICAgIH1cbiAgfVxuXG4gIF90cmFuc2l0aW9uQ29tcGxldGUoZWxlbWVudCwgYWN0aXZlLCBjYWxsYmFjaykge1xuICAgIGlmIChhY3RpdmUpIHtcbiAgICAgICQoYWN0aXZlKS5yZW1vdmVDbGFzcyhDbGFzc05hbWUuQUNUSVZFKVxuXG4gICAgICBjb25zdCBkcm9wZG93bkNoaWxkID0gJChhY3RpdmUucGFyZW50Tm9kZSkuZmluZChcbiAgICAgICAgU2VsZWN0b3IuRFJPUERPV05fQUNUSVZFX0NISUxEXG4gICAgICApWzBdXG5cbiAgICAgIGlmIChkcm9wZG93bkNoaWxkKSB7XG4gICAgICAgICQoZHJvcGRvd25DaGlsZCkucmVtb3ZlQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcbiAgICAgIH1cblxuICAgICAgaWYgKGFjdGl2ZS5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSA9PT0gJ3RhYicpIHtcbiAgICAgICAgYWN0aXZlLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIGZhbHNlKVxuICAgICAgfVxuICAgIH1cblxuICAgICQoZWxlbWVudCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcbiAgICBpZiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSA9PT0gJ3RhYicpIHtcbiAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgdHJ1ZSlcbiAgICB9XG5cbiAgICBVdGlsLnJlZmxvdyhlbGVtZW50KVxuXG4gICAgaWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKENsYXNzTmFtZS5GQURFKSkge1xuICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKENsYXNzTmFtZS5TSE9XKVxuICAgIH1cblxuICAgIGlmIChlbGVtZW50LnBhcmVudE5vZGUgJiYgJChlbGVtZW50LnBhcmVudE5vZGUpLmhhc0NsYXNzKENsYXNzTmFtZS5EUk9QRE9XTl9NRU5VKSkge1xuICAgICAgY29uc3QgZHJvcGRvd25FbGVtZW50ID0gJChlbGVtZW50KS5jbG9zZXN0KFNlbGVjdG9yLkRST1BET1dOKVswXVxuXG4gICAgICBpZiAoZHJvcGRvd25FbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGRyb3Bkb3duVG9nZ2xlTGlzdCA9IFtdLnNsaWNlLmNhbGwoZHJvcGRvd25FbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoU2VsZWN0b3IuRFJPUERPV05fVE9HR0xFKSlcblxuICAgICAgICAkKGRyb3Bkb3duVG9nZ2xlTGlzdCkuYWRkQ2xhc3MoQ2xhc3NOYW1lLkFDVElWRSlcbiAgICAgIH1cblxuICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKVxuICAgIH1cblxuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgY2FsbGJhY2soKVxuICAgIH1cbiAgfVxuXG4gIC8vIFN0YXRpY1xuXG4gIHN0YXRpYyBfalF1ZXJ5SW50ZXJmYWNlKGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgY29uc3QgJHRoaXMgPSAkKHRoaXMpXG4gICAgICBsZXQgZGF0YSA9ICR0aGlzLmRhdGEoREFUQV9LRVkpXG5cbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICBkYXRhID0gbmV3IFRhYih0aGlzKVxuICAgICAgICAkdGhpcy5kYXRhKERBVEFfS0VZLCBkYXRhKVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBkYXRhW2NvbmZpZ10gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgTm8gbWV0aG9kIG5hbWVkIFwiJHtjb25maWd9XCJgKVxuICAgICAgICB9XG4gICAgICAgIGRhdGFbY29uZmlnXSgpXG4gICAgICB9XG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRGF0YSBBcGkgaW1wbGVtZW50YXRpb25cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbiQoZG9jdW1lbnQpXG4gIC5vbihFdmVudC5DTElDS19EQVRBX0FQSSwgU2VsZWN0b3IuREFUQV9UT0dHTEUsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICBUYWIuX2pRdWVyeUludGVyZmFjZS5jYWxsKCQodGhpcyksICdzaG93JylcbiAgfSlcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIGpRdWVyeVxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuJC5mbltOQU1FXSA9IFRhYi5falF1ZXJ5SW50ZXJmYWNlXG4kLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gVGFiXG4kLmZuW05BTUVdLm5vQ29uZmxpY3QgPSAoKSA9PiB7XG4gICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgcmV0dXJuIFRhYi5falF1ZXJ5SW50ZXJmYWNlXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRhYlxuIiwiLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4zLjEpOiB0b2FzdC5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5J1xuaW1wb3J0IFV0aWwgZnJvbSAnLi91dGlsJ1xuXG4vKipcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQ29uc3RhbnRzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jb25zdCBOQU1FICAgICAgICAgICAgICAgPSAndG9hc3QnXG5jb25zdCBWRVJTSU9OICAgICAgICAgICAgPSAnNC4zLjEnXG5jb25zdCBEQVRBX0tFWSAgICAgICAgICAgPSAnYnMudG9hc3QnXG5jb25zdCBFVkVOVF9LRVkgICAgICAgICAgPSBgLiR7REFUQV9LRVl9YFxuY29uc3QgSlFVRVJZX05PX0NPTkZMSUNUID0gJC5mbltOQU1FXVxuXG5jb25zdCBFdmVudCA9IHtcbiAgQ0xJQ0tfRElTTUlTUyA6IGBjbGljay5kaXNtaXNzJHtFVkVOVF9LRVl9YCxcbiAgSElERSAgICAgICAgICA6IGBoaWRlJHtFVkVOVF9LRVl9YCxcbiAgSElEREVOICAgICAgICA6IGBoaWRkZW4ke0VWRU5UX0tFWX1gLFxuICBTSE9XICAgICAgICAgIDogYHNob3cke0VWRU5UX0tFWX1gLFxuICBTSE9XTiAgICAgICAgIDogYHNob3duJHtFVkVOVF9LRVl9YFxufVxuXG5jb25zdCBDbGFzc05hbWUgPSB7XG4gIEZBREUgICAgOiAnZmFkZScsXG4gIEhJREUgICAgOiAnaGlkZScsXG4gIFNIT1cgICAgOiAnc2hvdycsXG4gIFNIT1dJTkcgOiAnc2hvd2luZydcbn1cblxuY29uc3QgRGVmYXVsdFR5cGUgPSB7XG4gIGFuaW1hdGlvbiA6ICdib29sZWFuJyxcbiAgYXV0b2hpZGUgIDogJ2Jvb2xlYW4nLFxuICBkZWxheSAgICAgOiAnbnVtYmVyJ1xufVxuXG5jb25zdCBEZWZhdWx0ID0ge1xuICBhbmltYXRpb24gOiB0cnVlLFxuICBhdXRvaGlkZSAgOiB0cnVlLFxuICBkZWxheSAgICAgOiA1MDBcbn1cblxuY29uc3QgU2VsZWN0b3IgPSB7XG4gIERBVEFfRElTTUlTUyA6ICdbZGF0YS1kaXNtaXNzPVwidG9hc3RcIl0nXG59XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBDbGFzcyBEZWZpbml0aW9uXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqL1xuXG5jbGFzcyBUb2FzdCB7XG4gIGNvbnN0cnVjdG9yKGVsZW1lbnQsIGNvbmZpZykge1xuICAgIHRoaXMuX2VsZW1lbnQgPSBlbGVtZW50XG4gICAgdGhpcy5fY29uZmlnICA9IHRoaXMuX2dldENvbmZpZyhjb25maWcpXG4gICAgdGhpcy5fdGltZW91dCA9IG51bGxcbiAgICB0aGlzLl9zZXRMaXN0ZW5lcnMoKVxuICB9XG5cbiAgLy8gR2V0dGVyc1xuXG4gIHN0YXRpYyBnZXQgVkVSU0lPTigpIHtcbiAgICByZXR1cm4gVkVSU0lPTlxuICB9XG5cbiAgc3RhdGljIGdldCBEZWZhdWx0VHlwZSgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFR5cGVcbiAgfVxuXG4gIHN0YXRpYyBnZXQgRGVmYXVsdCgpIHtcbiAgICByZXR1cm4gRGVmYXVsdFxuICB9XG5cbiAgLy8gUHVibGljXG5cbiAgc2hvdygpIHtcbiAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoRXZlbnQuU0hPVylcblxuICAgIGlmICh0aGlzLl9jb25maWcuYW5pbWF0aW9uKSB7XG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ2xhc3NOYW1lLkZBREUpXG4gICAgfVxuXG4gICAgY29uc3QgY29tcGxldGUgPSAoKSA9PiB7XG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ2xhc3NOYW1lLlNIT1dJTkcpXG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ2xhc3NOYW1lLlNIT1cpXG5cbiAgICAgICQodGhpcy5fZWxlbWVudCkudHJpZ2dlcihFdmVudC5TSE9XTilcblxuICAgICAgaWYgKHRoaXMuX2NvbmZpZy5hdXRvaGlkZSkge1xuICAgICAgICB0aGlzLmhpZGUoKVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuX2VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShDbGFzc05hbWUuSElERSlcbiAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5hZGQoQ2xhc3NOYW1lLlNIT1dJTkcpXG4gICAgaWYgKHRoaXMuX2NvbmZpZy5hbmltYXRpb24pIHtcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGhpcy5fZWxlbWVudClcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KVxuICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNvbXBsZXRlKVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQodHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb21wbGV0ZSgpXG4gICAgfVxuICB9XG5cbiAgaGlkZSh3aXRob3V0VGltZW91dCkge1xuICAgIGlmICghdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAkKHRoaXMuX2VsZW1lbnQpLnRyaWdnZXIoRXZlbnQuSElERSlcblxuICAgIGlmICh3aXRob3V0VGltZW91dCkge1xuICAgICAgdGhpcy5fY2xvc2UoKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl90aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuX2Nsb3NlKClcbiAgICAgIH0sIHRoaXMuX2NvbmZpZy5kZWxheSlcbiAgICB9XG4gIH1cblxuICBkaXNwb3NlKCkge1xuICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lb3V0KVxuICAgIHRoaXMuX3RpbWVvdXQgPSBudWxsXG5cbiAgICBpZiAodGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoQ2xhc3NOYW1lLlNIT1cpKSB7XG4gICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ2xhc3NOYW1lLlNIT1cpXG4gICAgfVxuXG4gICAgJCh0aGlzLl9lbGVtZW50KS5vZmYoRXZlbnQuQ0xJQ0tfRElTTUlTUylcblxuICAgICQucmVtb3ZlRGF0YSh0aGlzLl9lbGVtZW50LCBEQVRBX0tFWSlcbiAgICB0aGlzLl9lbGVtZW50ID0gbnVsbFxuICAgIHRoaXMuX2NvbmZpZyAgPSBudWxsXG4gIH1cblxuICAvLyBQcml2YXRlXG5cbiAgX2dldENvbmZpZyhjb25maWcpIHtcbiAgICBjb25maWcgPSB7XG4gICAgICAuLi5EZWZhdWx0LFxuICAgICAgLi4uJCh0aGlzLl9lbGVtZW50KS5kYXRhKCksXG4gICAgICAuLi50eXBlb2YgY29uZmlnID09PSAnb2JqZWN0JyAmJiBjb25maWcgPyBjb25maWcgOiB7fVxuICAgIH1cblxuICAgIFV0aWwudHlwZUNoZWNrQ29uZmlnKFxuICAgICAgTkFNRSxcbiAgICAgIGNvbmZpZyxcbiAgICAgIHRoaXMuY29uc3RydWN0b3IuRGVmYXVsdFR5cGVcbiAgICApXG5cbiAgICByZXR1cm4gY29uZmlnXG4gIH1cblxuICBfc2V0TGlzdGVuZXJzKCkge1xuICAgICQodGhpcy5fZWxlbWVudCkub24oXG4gICAgICBFdmVudC5DTElDS19ESVNNSVNTLFxuICAgICAgU2VsZWN0b3IuREFUQV9ESVNNSVNTLFxuICAgICAgKCkgPT4gdGhpcy5oaWRlKHRydWUpXG4gICAgKVxuICB9XG5cbiAgX2Nsb3NlKCkge1xuICAgIGNvbnN0IGNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgdGhpcy5fZWxlbWVudC5jbGFzc0xpc3QuYWRkKENsYXNzTmFtZS5ISURFKVxuICAgICAgJCh0aGlzLl9lbGVtZW50KS50cmlnZ2VyKEV2ZW50LkhJRERFTilcbiAgICB9XG5cbiAgICB0aGlzLl9lbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoQ2xhc3NOYW1lLlNIT1cpXG4gICAgaWYgKHRoaXMuX2NvbmZpZy5hbmltYXRpb24pIHtcbiAgICAgIGNvbnN0IHRyYW5zaXRpb25EdXJhdGlvbiA9IFV0aWwuZ2V0VHJhbnNpdGlvbkR1cmF0aW9uRnJvbUVsZW1lbnQodGhpcy5fZWxlbWVudClcblxuICAgICAgJCh0aGlzLl9lbGVtZW50KVxuICAgICAgICAub25lKFV0aWwuVFJBTlNJVElPTl9FTkQsIGNvbXBsZXRlKVxuICAgICAgICAuZW11bGF0ZVRyYW5zaXRpb25FbmQodHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgIH0gZWxzZSB7XG4gICAgICBjb21wbGV0ZSgpXG4gICAgfVxuICB9XG5cbiAgLy8gU3RhdGljXG5cbiAgc3RhdGljIF9qUXVlcnlJbnRlcmZhY2UoY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zdCAkZWxlbWVudCA9ICQodGhpcylcbiAgICAgIGxldCBkYXRhICAgICAgID0gJGVsZW1lbnQuZGF0YShEQVRBX0tFWSlcbiAgICAgIGNvbnN0IF9jb25maWcgID0gdHlwZW9mIGNvbmZpZyA9PT0gJ29iamVjdCcgJiYgY29uZmlnXG5cbiAgICAgIGlmICghZGF0YSkge1xuICAgICAgICBkYXRhID0gbmV3IFRvYXN0KHRoaXMsIF9jb25maWcpXG4gICAgICAgICRlbGVtZW50LmRhdGEoREFUQV9LRVksIGRhdGEpXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgY29uZmlnID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodHlwZW9mIGRhdGFbY29uZmlnXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBObyBtZXRob2QgbmFtZWQgXCIke2NvbmZpZ31cImApXG4gICAgICAgIH1cblxuICAgICAgICBkYXRhW2NvbmZpZ10odGhpcylcbiAgICAgIH1cbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBqUXVlcnlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICovXG5cbiQuZm5bTkFNRV0gICAgICAgICAgICAgPSBUb2FzdC5falF1ZXJ5SW50ZXJmYWNlXG4kLmZuW05BTUVdLkNvbnN0cnVjdG9yID0gVG9hc3RcbiQuZm5bTkFNRV0ubm9Db25mbGljdCAgPSAoKSA9PiB7XG4gICQuZm5bTkFNRV0gPSBKUVVFUllfTk9fQ09ORkxJQ1RcbiAgcmV0dXJuIFRvYXN0Ll9qUXVlcnlJbnRlcmZhY2Vcbn1cblxuZXhwb3J0IGRlZmF1bHQgVG9hc3RcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSdcbmltcG9ydCBBbGVydCBmcm9tICcuL2FsZXJ0J1xuaW1wb3J0IEJ1dHRvbiBmcm9tICcuL2J1dHRvbidcbmltcG9ydCBDYXJvdXNlbCBmcm9tICcuL2Nhcm91c2VsJ1xuaW1wb3J0IENvbGxhcHNlIGZyb20gJy4vY29sbGFwc2UnXG5pbXBvcnQgRHJvcGRvd24gZnJvbSAnLi9kcm9wZG93bidcbmltcG9ydCBNb2RhbCBmcm9tICcuL21vZGFsJ1xuaW1wb3J0IFBvcG92ZXIgZnJvbSAnLi9wb3BvdmVyJ1xuaW1wb3J0IFNjcm9sbHNweSBmcm9tICcuL3Njcm9sbHNweSdcbmltcG9ydCBUYWIgZnJvbSAnLi90YWInXG5pbXBvcnQgVG9hc3QgZnJvbSAnLi90b2FzdCdcbmltcG9ydCBUb29sdGlwIGZyb20gJy4vdG9vbHRpcCdcbmltcG9ydCBVdGlsIGZyb20gJy4vdXRpbCdcblxuLyoqXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogQm9vdHN0cmFwICh2NC4zLjEpOiBpbmRleC5qc1xuICogTGljZW5zZWQgdW5kZXIgTUlUIChodHRwczovL2dpdGh1Yi5jb20vdHdicy9ib290c3RyYXAvYmxvYi9tYXN0ZXIvTElDRU5TRSlcbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKi9cblxuKCgpID0+IHtcbiAgaWYgKHR5cGVvZiAkID09PSAndW5kZWZpbmVkJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0Jvb3RzdHJhcFxcJ3MgSmF2YVNjcmlwdCByZXF1aXJlcyBqUXVlcnkuIGpRdWVyeSBtdXN0IGJlIGluY2x1ZGVkIGJlZm9yZSBCb290c3RyYXBcXCdzIEphdmFTY3JpcHQuJylcbiAgfVxuXG4gIGNvbnN0IHZlcnNpb24gPSAkLmZuLmpxdWVyeS5zcGxpdCgnICcpWzBdLnNwbGl0KCcuJylcbiAgY29uc3QgbWluTWFqb3IgPSAxXG4gIGNvbnN0IGx0TWFqb3IgPSAyXG4gIGNvbnN0IG1pbk1pbm9yID0gOVxuICBjb25zdCBtaW5QYXRjaCA9IDFcbiAgY29uc3QgbWF4TWFqb3IgPSA0XG5cbiAgaWYgKHZlcnNpb25bMF0gPCBsdE1ham9yICYmIHZlcnNpb25bMV0gPCBtaW5NaW5vciB8fCB2ZXJzaW9uWzBdID09PSBtaW5NYWpvciAmJiB2ZXJzaW9uWzFdID09PSBtaW5NaW5vciAmJiB2ZXJzaW9uWzJdIDwgbWluUGF0Y2ggfHwgdmVyc2lvblswXSA+PSBtYXhNYWpvcikge1xuICAgIHRocm93IG5ldyBFcnJvcignQm9vdHN0cmFwXFwncyBKYXZhU2NyaXB0IHJlcXVpcmVzIGF0IGxlYXN0IGpRdWVyeSB2MS45LjEgYnV0IGxlc3MgdGhhbiB2NC4wLjAnKVxuICB9XG59KSgpXG5cbmV4cG9ydCB7XG4gIFV0aWwsXG4gIEFsZXJ0LFxuICBCdXR0b24sXG4gIENhcm91c2VsLFxuICBDb2xsYXBzZSxcbiAgRHJvcGRvd24sXG4gIE1vZGFsLFxuICBQb3BvdmVyLFxuICBTY3JvbGxzcHksXG4gIFRhYixcbiAgVG9hc3QsXG4gIFRvb2x0aXBcbn1cbiIsInZhciBzZXRfc29jaWFsID0gZnVuY3Rpb24oKXtcblxuICAgIHZhciBkYXRhID0ge1xuICAgICAgICAnYWN0aW9uJzogJ2doc19zZXRfc29jaWFsJyxcbiAgICAgICAgJ3Bvc3RfdHlwZSc6ICdQT1NUJyxcbiAgICAgICAgJ2ZhY2Vib29rJzogalF1ZXJ5KCcuZ2hzLXNldC1zb2NpYWwtZmFjZWJvb2snKS52YWwoKSxcbiAgICAgICAgJ3R3aXR0ZXInOiBqUXVlcnkoJy5naHMtc2V0LXNvY2lhbC10d2l0dGVyJykudmFsKCksXG4gICAgICAgICd0dW1ibHInOiBqUXVlcnkoJy5naHMtc2V0LXNvY2lhbC10dW1ibHInKS52YWwoKSxcbiAgICAgICAgJ2luc3RhZ3JhbSc6IGpRdWVyeSgnLmdocy1zZXQtc29jaWFsLWluc3RhZ3JhbScpLnZhbCgpLFxuICAgICAgICAneW91dHViZSc6IGpRdWVyeSgnLmdocy1zZXQtc29jaWFsLXlvdXR1YmUnKS52YWwoKSxcbiAgICAgICAgJ3NuYXBjaGF0JzogalF1ZXJ5KCcuZ2hzLXNldC1zb2NpYWwtc25hcGNoYXQnKS52YWwoKSxcbiAgICB9O1xuXG4gICAgalF1ZXJ5LnBvc3QoYWpheHVybCwgZGF0YSwgZnVuY3Rpb24gKHJlc3BvbnNlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgaWYocmVzcG9uc2Uuc3VjY2Vzcyl7XG4gICAgICAgICAgICBqUXVlcnkoJy5naHNfYWRtaW5fYWxlcnQnKS5jc3MoJ2Rpc3BsYXknLCdibG9jaycpLmFkZENsYXNzKCdnaHNfc3VjY2VzcycpO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGpRdWVyeSgnLmdoc19hZG1pbl9hbGVydCcpLmNzcygnZGlzcGxheScsJ2Jsb2NrJykuYWRkQ2xhc3MoJ2doc19lcnJvcicpO1xuICAgICAgICB9XG4gICAgfSwgJ2pzb24nKTtcblxufTtcblxudmFyIGdldF9zb2NpYWwgPSBmdW5jdGlvbigpe1xuXG4gICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICdhY3Rpb24nOiAnZ2hzX2dldF9zb2NpYWwnLFxuICAgICAgICAncG9zdF90eXBlJzogJ1BPU1QnLFxuICAgICAgICAnbmFtZSc6ICcnXG4gICAgfTtcblxuICAgIGpRdWVyeS5wb3N0KGFqYXh1cmwsIGRhdGEsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgIGlmKHJlc3BvbnNlLnN1Y2Nlc3Mpe1xuICAgICAgICAgICAgalF1ZXJ5KCcuZ2hzLXNldC1zb2NpYWwtZmFjZWJvb2snKS52YWwocmVzcG9uc2Uuc29jaWFsWzBdLkZhY2VCb29rTmFtZSk7XG4gICAgICAgIH1cbiAgICB9LCAnanNvbicpO1xuXG59O1xuXG52YXIgc2V0X2hlcm9fc2V0dGluZ3MgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgaGJpLFxuICAgICAgICBmaWxlID0galF1ZXJ5KCcuZ2hzLWhlcm8tYmFubmVyLWltZycpWzBdLmZpbGVzWzBdO1xuXG4gICAgaWYoZmlsZSl7XG4gICAgICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGhiaSA9IGUudGFyZ2V0LnJlc3VsdDtcblxuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgICAgJ2FjdGlvbic6ICdnaHNfc2V0X2hlcm9fc2V0dGluZ3MnLFxuICAgICAgICAgICAgICAgICdwb3N0X3R5cGUnOiAnUE9TVCcsXG4gICAgICAgICAgICAgICAgJ2hlcm8tYmFubmVyLWltZyc6IGhiaSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGpRdWVyeS5wb3N0KGFqYXh1cmwsIGRhdGEsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgICAgICAgICAgaWYocmVzcG9uc2Uuc3VjY2Vzcyl7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnLmdoc19hZG1pbl9hbGVydCcpLmNzcygnZGlzcGxheScsJ2Jsb2NrJykuYWRkQ2xhc3MoJ2doc19zdWNjZXNzJyk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnLmdoc19hZG1pbl9hbGVydCcpLmNzcygnZGlzcGxheScsJ2Jsb2NrJykuYWRkQ2xhc3MoJ2doc19lcnJvcicpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sICdqc29uJyk7XG4gICAgICAgIH07XG4gICAgfVxuXG59O1xuXG52YXIgZ2V0X2hlcm9fc2V0dGluZ3MgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgJ2FjdGlvbic6ICdnaHNfZ2V0X2hlcm9fc2V0dGluZ3MnLFxuICAgICAgICAncG9zdF90eXBlJzogJ1BPU1QnLFxuICAgICAgICAnbmFtZSc6ICcnXG4gICAgfTtcblxuICAgIGpRdWVyeS5wb3N0KGFqYXh1cmwsIGRhdGEsIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuXG4gICAgICAgIGlmKHJlc3BvbnNlLnN1Y2Nlc3Mpe1xuICAgICAgICAgICAgaWYoalF1ZXJ5KCcuZ2hzX2hlcm9fcHJldmlldycpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBqUXVlcnkoJy5naHNfaGVyb19wcmV2aWV3JykuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgXCJkaXNwbGF5XCIgOiBcImJsb2NrXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZC1pbWFnZVwiIDogXCJ1cmwoJ1wiK3Jlc3BvbnNlLmhlcm9fYmFubmVyX2ltZytcIicpXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZC1zaXplXCIgOiBcIjEwMCVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCIgOiBcImNlbnRlclwiXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGpRdWVyeSgnLmdoc19oZXJvX2Jhbm5lcicpLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgICAgIGpRdWVyeSgnLmdoc19oZXJvX2Jhbm5lcicpLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgIFwiZGlzcGxheVwiIDogXCJibG9ja1wiLFxuICAgICAgICAgICAgICAgICAgICBcImJhY2tncm91bmQtaW1hZ2VcIiA6IFwidXJsKCdcIityZXNwb25zZS5oZXJvX2Jhbm5lcl9pbWcrXCInKVwiLFxuICAgICAgICAgICAgICAgICAgICBcImJhY2tncm91bmQtc2l6ZVwiIDogXCIxMDAlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiYmFja2dyb3VuZC1wb3NpdGlvblwiIDogXCJjZW50ZXJcIlxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSwgJ2pzb24nKTtcblxufTtcblxuaWYoZG9jdW1lbnQuVVJMLmluZGV4T2YoXCJwYWdlPWdocy10aGVtZS1zZXR0aW5nc1wiKSAhPT0gLTEpIHtcbiAgICAvL2ZvdW5kXG4gICAgZ2V0X3NvY2lhbCgpO1xufVxuXG5pZihkb2N1bWVudC5VUkwuaW5kZXhPZihcInBhZ2U9Z2hzX3RoZW1lX3NldHRpbmdzX2hwc1wiKSAhPT0gLTEpIHtcbiAgICAvL2ZvdW5kXG4gICAgZ2V0X2hlcm9fc2V0dGluZ3MoKTtcbn1cblxuXG5cblxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKCl7XG5cbiAgICAgICAgaWYoalF1ZXJ5KCcjd3BhZG1pbmJhcicpLmxlbmd0aCA+IDApe1xuICAgICAgICAgICAgdmFyIHdwYWRtaW5IZWlnaHQgPSBqUXVlcnkoJyN3cGFkbWluYmFyJykub3V0ZXJIZWlnaHQodHJ1ZSk7XG4gICAgICAgICAgICBqUXVlcnkoJ25hdicpLmNzcygnbWFyZ2luLXRvcCcsIHdwYWRtaW5IZWlnaHQpO1xuICAgICAgICAgICAgalF1ZXJ5KCcuZ2hzLWNvbnRlbnQnKS5jc3MoJ21hcmdpbi10b3AnLCBqUXVlcnkoJ25hdicpLm91dGVySGVpZ2h0KHRydWUpLTE4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGpRdWVyeSgnLmdocy1jb250ZW50JykuY3NzKCdtYXJnaW4tdG9wJywgalF1ZXJ5KCduYXYnKS5vdXRlckhlaWdodCh0cnVlKSsxOCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihqUXVlcnkoJy5naHNfaGVyb19iYW5uZXInKS5sZW5ndGggPiAwKXtcbiAgICAgICAgICAgIGdldF9oZXJvX3NldHRpbmdzKCk7XG4gICAgICAgIH1cblxuICAgIH07XG5cbiAgICBpbml0KCk7XG59KTsiXX0=