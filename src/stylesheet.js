import { merge as _Merge, clone as _Clone } from 'lodash';
import Pod_Vars from 'vars.js';

const pod_debug = false; // if true, will add a debug object to the inline style produced

// actual Styling
class Style {
  constructor(style) {
    this.style = this.transform(style);
  }

  addUnit(val) {
    if (val === 0 || val === '0') {
      return '0px';
    }
    return val;
  }

  transformKeys(styles, key, splitStyle, keyAppend) {
    for (let i = 0, len = keyAppend.length; i < len; i++) {
      let appendKey = keyAppend[i];
      if (typeof(appendKey) === 'object') {
        appendKey = appendKey[0];
      } else {
        appendKey = key + appendKey;
      }
      styles[appendKey] = splitStyle[i];
    }
    delete styles[key];
    return styles;
  }

  spreadToFour(splitStyle) {
    const splitStyleLen = splitStyle.length;

    if (splitStyleLen === 1) {
      splitStyle.push(splitStyle[0]);
      splitStyle.push(splitStyle[0]);
      splitStyle.push(splitStyle[0]);
    } else if (splitStyleLen === 2) {
      splitStyle.push(splitStyle[0]);
      splitStyle.push(splitStyle[1]);
    } else if (splitStyleLen === 3) {
      splitStyle.push(splitStyle[1]);
    }
    return splitStyle;
  }

  splitStyle(style) {
    let splitStyle = style.trim().split(/ +/);
    const splitStyleLen = splitStyle.length;

    for (let splitIndex = 0; splitIndex < splitStyleLen; splitIndex++) {
      splitStyle[splitIndex] = this.addUnit(splitStyle[splitIndex]);
    }

    return splitStyle;
  }

  transform(styles, depth = 0) {
    let newStyles = styles;

    if (typeof(styles) === 'object' && styles !== undefined && styles !== null) {
      const keys = Object.keys(styles);
      for (let keyIndex = 0, keyLen = keys.length; keyIndex < keyLen; keyIndex++) {
        const key = keys[keyIndex];
        const style = newStyles[key];
        const styleType = typeof(style);

        if (styleType === 'string') {
          if (['padding', 'margin'].indexOf(key) > -1) {
            let splitStyle = this.splitStyle(newStyles[key]);
            splitStyle = this.spreadToFour(splitStyle);

            newStyles = this.transformKeys(newStyles, key, splitStyle, ['Top', 'Right', 'Bottom', 'Left']);
          } else if (['borderWidth', 'borderColor', 'borderStyle'].indexOf(key) > -1) {
            let splitStyle = this.splitStyle(newStyles[key]);
            splitStyle = this.spreadToFour(splitStyle);
            if (key === 'borderWidth') {
              newStyles = this.transformKeys(newStyles, key, splitStyle, [['borderTopWidth'], ['borderRightWidth'], ['borderBottomWidth'], ['borderLeftWidth']]);
            } else if (key === 'borderColor') {
              newStyles = this.transformKeys(newStyles, key, splitStyle, [['borderTopColor'], ['borderRightColor'], ['borderBottomColor'], ['borderLeftColor']]);
            } else if (key === 'borderStyle') {
              newStyles = this.transformKeys(newStyles, key, splitStyle, [['borderTopStyle'], ['borderRightStyle'], ['borderBottomStyle'], ['borderLeftStyle']]);
            }
          } else if (['border', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft'].indexOf(key) > -1) {
            const splitStyle = this.splitStyle(newStyles[key]);
            const splitStyleLen = splitStyle.length;

            if (splitStyleLen === 1) {
              splitStyle.unshift(Pod_Vars.get('border.width'));
              splitStyle.push(Pod_Vars.get('border.color'));
            } else if (splitStyleLen === 2) {
              splitStyle.push(Pod_Vars.get('border.color'));
            }

            newStyles = this.transformKeys(newStyles, key, splitStyle, ['Width', 'Style', 'Color']);
          } else if (key === 'borderRadius') {
            let splitStyle = this.splitStyle(newStyles[key]);
            splitStyle = this.spreadToFour(splitStyle);

            newStyles = this.transformKeys(newStyles, key, splitStyle, [['borderTopLeftRadius'], ['borderTopRightRadius'], ['borderBottomRightRadius'], ['borderBottomLeftRadius']]);
          } else if (key === 'font') {
            const splitStyle = this.splitStyle(newStyles[key]);

            newStyles = this.transformKeys(newStyles, key, splitStyle, ['Style', 'Weight', 'Size', ['lineHeight'], 'Family']);
          } else if (key === 'background') {
            const splitStyle = this.splitStyle(newStyles[key]);
            const splitStyleLen = splitStyle.length;

            if (splitStyleLen === 1) {
              newStyles.backgroundColor = splitStyle[0];
              delete newStyles.background;
            } else {
              newStyles = this.transformKeys(newStyles, key, splitStyle, ['Color', 'Image', 'Repeat', 'Attachment', 'Position']);
            }
          } else if (key === 'flex') {
            const splitStyle = this.splitStyle(newStyles[key]);

            newStyles = this.transformKeys(newStyles, key, splitStyle, ['Grow', 'Shrink', 'Basis']);
          } else if (key === 'transition') {
            const splitStyle = this.splitStyle(newStyles[key]);
            const splitStyleLen = splitStyle.length;

            if (splitStyleLen === 1) {
              newStyles.transitionDuration = splitStyle[0];
              delete newStyles.transition;
            } else {
              newStyles = this.transformKeys(newStyles, key, splitStyle, ['Property', 'Duration', 'TimingFunction', 'Delay']);
            }
          } else if (key === 'listStyle') {
            const splitStyle = this.splitStyle(newStyles[key]);

            newStyles = this.transformKeys(newStyles, key, splitStyle, ['Type', 'Position', 'Image']);
          } else {
            newStyles[key] = this.addUnit(style);
          }
        } else if (styleType === 'object') {
          newStyles[key] = this.transform(style, depth + 1);
        }
      }
    }

    return newStyles;
  }

  getStyle(instance) {
    if (instance !== undefined && instance.componentName === 'Grid_Cell') {
      let style = _Clone(this.style);

      if (typeof(style) === 'object') {
        const keys = Object.keys(style);
        for (let keyIndex = 0, keyLen = keys.length; keyIndex < keyLen; keyIndex++) {
          const key = keys[keyIndex];
          if (key.indexOf('@media') === 0) {
            const keySize = key.split(' ').join('').replace('@media(', '')
              .replace('px)', '')
              .split(':');
            if (keySize.length === 2) {
              const paneWidth = instance.context._podPaneWidth;
              const queryType = keySize[0];
              const queryValue = keySize[1];
              if (typeof(paneWidth) === 'number') {
                if (queryType === 'minWidth') {
                  if (paneWidth >= queryValue) {
                    style = _Merge({}, style, style[key]);
                  }
                  delete style[key];
                } else if (queryType === 'maxWidth') {
                  if (paneWidth < queryValue) {
                    style = _Merge({}, style, style[key]);
                  }
                  delete style[key];
                } else {
                  console.warn(`Unsupported value for media query: ${style[key]}`); // eslint-disable-line no-console
                }
              }
            } else {
              throw new Error(`Invalid media query: ${style[key]}`);
            }
          }
        }
      }

      return style;
    }
    return this.style;
  }
}

// A selector (condition and style)
class Selector {
  constructor(selector) {
    const condition = selector.condition;
    const conditionType = typeof(condition);
    const keys = Object.keys(selector);
    if (conditionType === 'undefined') {
      this.condition = null;
    } else if (conditionType === 'string') {
      this.condition = [condition];
    } else {
      this.condition = condition;
    }

    this.scenes = {};

    for (let i = 0, len = keys.length; i < len; i++) {
      const scene = keys[i];

      if (scene !== 'condition') {
        this.scenes[scene] = new Style(selector[scene]);
      }
    }
  }

  getCondition() {
    return this.condition;
  }

  // check if all conditions for selector are true for component instance
  checkConditions(instance, conditions) {
    if (this.condition !== null) {
      for (let i = 0, len = this.condition.length; i < len; i++) {
        const condition = this.checkCondition(instance, this.condition[i], conditions);
        if (!condition) return false;
      }
    }
    return true;
  }

  // check if a single condition is true
  checkCondition(instance, conditionName, conditions) {
    let condition = null;
    if (conditionName.indexOf('!') > -1) {
      condition = conditions[conditionName.replace('!', '')];
    } else {
      condition = conditions[conditionName];
    }

    if (typeof(condition) === 'undefined') {
      console.warn(`No definition for condition:  ${conditionName}`); // eslint-disable-line no-console
    }

    return condition.isTrue(instance);
  }

  // Gets the styling for a specified scene merged with the common scene
  getStyling(instance, scene) {
    if (typeof(this.scenes.common) !== 'undefined') {
      if (typeof(this.scenes[scene]) !== 'undefined') {
        return _Merge({}, this.scenes.common.getStyle(instance), this.scenes[scene].getStyle(instance));
      }
      return this.scenes.common.getStyle(instance);
    }
    if (typeof(this.scenes[scene]) !== 'undefined') {
      return this.scenes[scene].getStyle(instance);
    }
    return null;
  }

  getSelector(instance, scene) {
    return this.getStyling(instance, scene);
  }
}

// Parts of a component
class Part {
  constructor(name) {
    this.selectors = [];
    this.name = name;
  }

  addSelector(selector, wipeExisting = false) {
    if (wipeExisting) {
      this.selectors = [];
    }
    this.selectors.push(new Selector(selector));
    return this;
  }

  getSelectors() {
    return this.selectors;
  }

  getDebug(instance, scene, conditions) {
    const debugApplied = [];
    const debugAll = [];

    for (let i = 0, len = this.selectors.length; i < len; i++) {
      const selector = this.selectors[i];
      const debugStyling = selector.getStyling(scene);
      const selectorConditions = selector.checkConditions(instance, conditions);
      const selectorCondition = selector.getCondition();
      const selectorValid = [];

      if (selectorCondition !== null) {
        for (let conditionIndex = 0, conditionLen = selectorCondition.length; conditionIndex < conditionLen; conditionIndex++) {
          let conditionName = conditionIndex[conditionIndex];
          const condition = conditions[conditionName];
          const conditionValid = selector.checkCondition(condition);
          selectorValid.push({
            name: conditionName,
            condition,
            valid: conditionValid,
            instance: {
              styler: instance.styler || 'Error: Styler not Set',
              state: instance.state || 'Error: state not set',
              props: instance.props || 'Error: props not set',
              context: instance.context || 'Error: context not set',
            },
          });
        }
      }

      const info = {
        selectorPart: this.name,
        selectorScene: scene,
        selectorIndex: i,
        selectorCondition: selector.getCondition(),
        selectorValid,
        selectorApplied: selectorConditions,
        selectorStyling: debugStyling,
      };

      if (selectorConditions) {
        debugApplied.push(info);
      }
      debugAll.push(info);
    }

    return {
      all: debugAll,
      applied: debugApplied,
    };
  }

  getPartStyling(instance, scene, conditions) {
    let styling = null;

    for (let i = 0, len = this.selectors.length; i < len; i++) {
      const selector = this.selectors[i];
      if (selector.checkConditions(instance, conditions)) {
        const selectorStyling = selector.getSelector(instance, scene);
        if (styling == null) {
          styling = selectorStyling;
        } else if (selectorStyling !== null) {
          styling = _Merge({}, styling, selectorStyling);
        }
      }
    }

    if (pod_debug) {
      const debug = this.getDebug(instance, scene, conditions);

      styling.debug = {
        all: debug.all,
        appliedOnly: debug.applied,
        result: styling,
      };
    }
    return styling;
  }
}

// Root part of a component
class Main extends Part {
  constructor() {
    super('main');
  }
}

// A condition to apply styling
class Condition {
  constructor() {
    this.styler = null;
    this.state = null;
    this.props = null;
    this.contest = null;
    this.func = null;
  }

  addStyler(obj) {
    this.styler = obj;
    return this;
  }

  addState(obj) {
    this.state = obj;
    return this;
  }

  addProp(obj) {
    this.props = obj;
    return this;
  }

  addContext(obj) {
    this.context = obj;
    return this;
  }

  addFunction(obj) {
    this.func = obj;
    return this;
  }

  // check if a specific type of condition is satisfied
  checkType(type, instance) {
    let instanceVal;
    let conditionVal;
    if (type === 'styler') {
      instanceVal = instance.styler;
      conditionVal = this.styler;
    } else if (type === 'state') {
      instanceVal = instance.state;
      conditionVal = this.state;
    } else if (type === 'props') {
      instanceVal = instance.props;
      conditionVal = this.props;
    } else if (type === 'context') {
      instanceVal = instance.context;
      conditionVal = this.context;
    } else {
      throw new Error(`Unable to check condition of type: ${type}`);
    }

    if (conditionVal == null) {
      return true; // no condition of type specified
    } else if (typeof(instanceVal) === 'undefined') {
      return false; // no value in instance for condition of type specified
    }
    return this.validateCondition(conditionVal, instanceVal);
  }

  // see if condition and instance are equal
  validateCondition(conditionVal, instanceVal) {
    const keys = Object.keys(conditionVal);
    for (let i = 0, len = keys.length; i < len; i++) {
      let key = keys[i];
      const objVal = instanceVal[key];
      const selVal = conditionVal[key];

      if (typeof(selVal) === 'object' && selVal !== null) {
        if (selVal.length === 2) {
          if (!this.compareValArray(selVal[0], objVal, selVal[1])) return false;
        } else {
          return false;
        }
      } else if (objVal !== selVal) {
        return false;
      }
    }
    return true;
  }

  // check advanced comparison
  compareValArray(comparison, val, comparisonVal) {
    if (comparison === '==') {
      if (!(val === comparisonVal)) return false;
    } else if (comparison === '!=') {
      if (!(val !== comparisonVal)) return false;
    } else if (comparison === '>') {
      if (!(val > comparisonVal)) return false;
    } else if (comparison === '>=') {
      if (!(val >= comparisonVal)) return false;
    } else if (comparison === '<') {
      if (!(val < comparisonVal)) return false;
    } else if (comparison === '<=') {
      if (!(val <= comparisonVal)) return false;
    }
    return true;
  }

  // check if the condition is satisfied
  isTrue(instance) {
    const validStyler = this.checkType('styler', instance);
    const validState = this.checkType('state', instance);
    const validProps = this.checkType('props', instance);
    const validContext = this.checkType('context', instance);
    let validFunction = true;

    if (this.func !== null) {
      validFunction = this.func(instance);
    }

    return validStyler && validState & validProps && validContext && validFunction;
  }
}

// A sheet of parts with their selectors, conditions, and values for variables
class Sheet {
  constructor(name) {
    this.values = {};
    this.parts = {};
    this.conditions = {};
    this.doc = '';
    this.docDefault = null;
    if (name === 'undefined') {
      console.error('Sheet created without a name specified.'); // eslint-disable-line no-console
    }
    this.name = name;
  }

  setValues(values = {}, scene = 'common', custom = false) {
    let variables = {
      [scene]: {
        [this.name]: values,
      },
    };

    if (custom) {
      variables = values;
    }

    this.values = variables;
    Pod_Vars.register(variables);

    return this;
  }

  addMain() {
    const main = new Main();
    this.parts.main = main;
    return main;
  }
  addPart(name) {
    const part = new Part(name);
    this.parts[name] = part;
    return part;
  }

  getName() {
    return this.name;
  }
  getValues() {
    return this.values;
  }
  getParts() {
    return this.parts;
  }
  getConditions() {
    return this.conditions;
  }

  addCondition(name) {
    const condition = new Condition();
    this.conditions[name] = condition;
    return condition;
  }

  addDoc(data) {
    this.doc = data;
  }

  addDocDefault(data) {
    this.docDefault = data;
  }

  getStyling(instance, part, scene = 'normal', conditions) {
    const partObj = this.parts[part];
    if (typeof(partObj) === 'undefined') {
      throw new Error(`Could not find Part named ${part}.`);
    }
    return partObj.getPartStyling(instance, scene, conditions);
  }

  getAllStyling(instance, scene = 'normal', conditions) {
    let result = {};
    const partKeys = Object.keys(this.parts);

    for (let i = 0, len = partKeys.length; i < len; i++) {
      const partName = partKeys[i];
      result[partName] = this.parts[partName].getPartStyling(instance, scene, conditions);
    }

    return result;
  }

  getDoc() {
    return this.doc;
  }

  getDocDefault() {
    return this.docDefault;
  }
}

module.exports = {
  Sheet,
  Style,
};
