import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * Container Component - R6 Digital Inspired
 * 
 * A responsive container component that centres content and provides
 * consistent max-width and padding across different screen sizes.
 * Based on R6 Digital's layout system (max-width: 1370px).
 * 
 * @example
 * <Container size="full" padding="lg">
 *   <h1>Page Title</h1>
 *   <p>Content goes here...</p>
 * </Container>
 */
const Container = forwardRef(({
  children,
  className,
  size = 'full',
  padding = 'responsive',
  as: Component = 'div',
  ...props
}, ref) => {
  
  const baseClasses = 'container';
  
  const sizeClasses = {
    xs: 'container-xs',
    sm: 'container-sm',
    md: 'container-md',
    lg: 'container-lg',
    xl: 'container-xl',
    '2xl': 'container-2xl',
    '3xl': 'container-3xl',
    '4xl': 'container-4xl',
    '5xl': 'container-5xl',
    '6xl': 'container-6xl',
    '7xl': 'container-7xl',
    full: '', // Uses default container max-width (1370px)
  };
  
  const paddingClasses = {
    none: 'px-0',
    sm: 'px-4',
    base: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-6 sm:px-8 lg:px-12',
    xl: 'px-8 sm:px-12 lg:px-16',
    responsive: '', // Uses default responsive padding
  };
  
  const classes = clsx(
    baseClasses,
    sizeClasses[size],
    paddingClasses[padding],
    className
  );
  
  return (
    <Component ref={ref} className={classes} {...props}>
      {children}
    </Component>
  );
});

Container.displayName = 'Container';

Container.propTypes = {
  /** Container content */
  children: PropTypes.node.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Container max-width size */
  size: PropTypes.oneOf([
    'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 
    '4xl', '5xl', '6xl', '7xl', 'full'
  ]),
  /** Container padding */
  padding: PropTypes.oneOf(['none', 'sm', 'base', 'lg', 'xl', 'responsive']),
  /** Component to render as */
  as: PropTypes.elementType };

export default Container;