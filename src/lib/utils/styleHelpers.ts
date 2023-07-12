type CustomizableCSSKeys = readonly [
  "display",
  "top",
  "bottom",
  "insetInlineStart",
  "insetInlineEnd",
  "position",
  "margin",
  "marginInline",
  "marginBlock",
  "marginRight",
  "marginLeft",
  "marginTop",
  "marginBottom",
  "padding",
  "paddingInline",
  "paddingBlock",
  "paddingRight",
  "paddingLeft",
  "paddingTop",
  "paddingBottom",
  "width",
  "maxWidth",
  "minWidth",
  "height",
  "maxHeight",
  "minHeight",
  "zIndex",
  "flex",
  "alignItems",
  "justifyContent",
  "flexDirection",
  "flexWrap",
  "gap"
];

export interface ExtendableCSSProps {
  display?: React.CSSProperties["display"];

  /** CSS `flex` property */
  flex?: React.CSSProperties["flex"];

  /** CSS `margin` property */
  m?: number | string;

  /** CSS `margin-top` property */
  mt?: number | string;

  /** CSS `margin-right` property */
  mr?: number | string;

  /** CSS `margin-bottom` property */
  mb?: number | string;

  /** CSS `margin-left` property */
  ml?: number | string;

  /** CSS `margin-left` and `margin-right` property */
  mx?: number | string;

  /** CSS `margin-top` and `margin-bottom` property */
  my?: number | string;

  /** CSS `padding` property */
  p?: number | string;

  /** CSS `padding-top` property */
  pt?: number | string;

  /** CSS `padding-right` property */
  pr?: number | string;

  /** CSS `padding-bottom` property */
  pb?: number | string;

  /** CSS `padding-left` property */
  pl?: number | string;

  /** CSS `padding-left` and `padding-right` property */
  px?: number | string;

  /** CSS `padding-top` and `padding-bottom` property */
  py?: number | string;

  /**
   * CSS `width` property.
   * If its value is less than 1, is considered as a fraction of 100%.
   * If its value is more than 1, is considered as value in px, if it is a string, is passed as is.
   */
  w?: number | string;

  /**
   * CSS `min-width` property.
   * If its value is less than 1, is considered as a fraction of 100%.
   * If its value is more than 1, is considered as value in px, if it is a string, is passed as is.
   */
  wMin?: number | string;

  /**
   * CSS `max-width` property.
   * If its value is less than 1, is considered as a fraction of 100%.
   * If its value is more than 1, is considered as value in px, if it is a string, is passed as is.
   */
  wMax?: number | string;

  /**
   * CSS `height` property.
   * If its value is less than 1, is considered as a fraction of 100%.
   * If its value is more than 1, is considered as value in px, if it is a string, is passed as is.
   */
  h?: number | string;

  /**
   * CSS `min-height` property.
   * If its value is less than 1, is considered as a fraction of 100%.
   * If its value is more than 1, is considered as value in px, if it is a string, is passed as is.
   */
  hMin?: number | string;

  /**
   * CSS `max-height` property.
   * If its value is less than 1, is considered as a fraction of 100%.
   * If its value is more than 1, is considered as value in px, if it is a string, is passed as is.
   */
  hMax?: number | string;
  /** CSS `position` property */
  position?: React.CSSProperties["position"];
  /** CSS `top` property */
  top?: number | string;
  /** CSS `left` property */
  left?: number | string;
  /** CSS `bottom` property */
  bottom?: number | string;
  /** CSS `right` property */
  right?: number | string;
  zIndex?: number;
}
export function removeUndefinedKeys<T extends {}>(obj: T) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== undefined && value !== "") {
      // @ts-ignore
      acc[key] = value;
    }
    return acc;
  }, {});
}
export function removeKeysAndUndefinedValues<T extends { [key: string]: any }>(
  obj: T,
  keysToRemove: Array<keyof T>
) {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (!keysToRemove.includes(key) && value !== undefined && value !== "") {
      // @ts-ignore
      acc[key] = value;
    }
    return acc;
  }, {}) as Omit<T, keyof typeof keysToRemove>;
}
export const getAutoOrScaleIndent = (
  value: number | string | undefined,
  scaleDenominator: number = 4
) => {
  const scaleIndex = 4;
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number" && value > -1 && value < 1) {
    return `${100 * value}px`;
  }
  if (typeof value === "number" && (value >= 1 || value <= -1)) {
    return `${value * scaleDenominator}px`;
  }
  return value;
};

/**
 * Here we are excluding the keys that don't need to go through the function `getAutoOrScaleIndent()`
 * assuming they provided value is logically corrent, for example `{"display":"flex"}` doesn't need to go through that function.
 */
export function calculateIndentStyles(
  props: Partial<{
    [Key in CustomizableCSSKeys[number]]: string | number;
  }>
) {
  // defining the keys to exclude
  const keysToExclude = [
    "display",
    "zIndex",
    "flex",
    "position",
    "alignItems",
    "justifyContent",
    "flexDirection",
    "flexWrap",
  ] as Array<keyof typeof props>;

  // this array is free from the excluded keys
  const propsWithoutExcludedKeys = removeKeysAndUndefinedValues(
    props,
    keysToExclude
  );

  const excludedKeysValues = getRemovedObjectProperties(props, keysToExclude);

  const values = {} as { [key: string]: any };
  // we're creating a new object from the array with excluded values with the mapped computed values
  Object.entries(propsWithoutExcludedKeys).forEach(([key, value]) => {
    values[key] = getAutoOrScaleIndent(value);
  });

  return Object.assign({}, propsWithoutExcludedKeys, {
    ...values,
    ...excludedKeysValues,
  });
}

const findCommonStrings = (arr1: string[], arr2: string[]) => {
  const set = new Set(arr1);

  return arr2.filter((item) => set.has(item));
};

const getRemovedObjectProperties = <T extends { [key: string]: any }>(
  obj: T,
  arr: Array<string>
) => {
  const properties: { [key: (typeof arr)[number]]: any } = {};
  Object.entries(obj).forEach(([key, value]) => {
    if (arr.includes(key)) {
      properties[key as (typeof arr)[number]] = value;
    }
  });
  return properties;
};
