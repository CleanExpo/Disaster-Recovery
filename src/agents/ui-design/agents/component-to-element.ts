/**
 * Internal utility for converting UIComponent -> UIElement for agent
 * analysis. Centralises the type-narrowing previously expressed via
 * `as any` across each agent in this directory.
 *
 * The shape of UIComponent.styles (ComponentStyles with .base: string)
 * does not align with UIElement.styles (CSSStyleDeclaration |
 * Record<string, any>). The downstream `analyse*` consumers in this
 * directory treat element.styles as either an object OR a string and
 * stringify via JSON.stringify when needed — historical agent code
 * passed the .base string through directly. We preserve that behaviour
 * by wrapping the base CSS string under a `base` key so it satisfies
 * the Record<string, unknown> branch of UIElement.styles without
 * losing any information.
 */

import type { UIComponent, UIElement, AccessibilityAttributes } from '../types/interfaces';

type UIElementAccessibility = UIElement['accessibility'];

const emptyMetrics: UIElement['metrics'] = {
  renderTime: 0,
  size: { width: 0, height: 0 },
  position: { x: 0, y: 0 },
};

export function mapAccessibility(
  attrs: AccessibilityAttributes | undefined,
): UIElementAccessibility {
  const tabindex = attrs?.tabindex;
  return {
    role: attrs?.role,
    ariaLabel: attrs?.['aria-label'],
    tabIndex: tabindex,
    focusable: tabindex === undefined || tabindex !== -1,
  };
}

/**
 * Wrap a UIComponent.styles into a value satisfying UIElement.styles.
 * UIElement.styles permits Record<string, any>, so { base } qualifies.
 */
export function mapComponentStyles(styles: UIComponent['styles']): Record<string, unknown> {
  return { ...styles };
}

/**
 * Build a UIElement from a UIComponent for agent analysis.
 * Children are mapped one level deep (matches prior agent behaviour
 * which passed an empty children list or a single-level map).
 */
export function componentToUIElement(component: UIComponent): UIElement {
  return {
    type: component.type,
    props: component.props,
    styles: mapComponentStyles(component.styles),
    children: (component.children || []).map(componentToUIElement),
    accessibility: mapAccessibility(component.accessibility),
    metrics: emptyMetrics,
  };
}
