import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * Card Component - R6 Digital Inspired
 * 
 * A flexible card component with hover effects and various layouts.
 * Perfect for content sections, feature highlights, and service displays.
 * 
 * @example
 * <Card hover={true}>
 *   <Card.Header>
 *     <Card.Title>Service Title</Card.Title>
 *     <Card.Subtitle>Category</Card.Subtitle>
 *   </Card.Header>
 *   <Card.Body>
 *     <p>Service description content.</p>
 *   </Card.Body>
 *   <Card.Footer>
 *     <Button>Learn More</Button>
 *   </Card.Footer>
 * </Card>
 */
const Card = forwardRef(({
  children,
  className,
  hover = true,
  variant = 'default',
  padding = 'default',
  ...props
}, ref) => {
  
  const baseClasses = 'card';
  
  const variantClasses = {
    default: '',
    elevated: 'shadow-md',
    bordered: 'border-2',
    ghost: 'border-0 shadow-none bg-transparent',
  };
  
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
    xl: 'p-10',
  };
  
  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    {
      'hover-lift transition-transform transition-shadow': hover,
    },
    className
  );
  
  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';

/**
 * Card Header Component
 */
const CardHeader = forwardRef(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('card-header', className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardHeader.displayName = 'Card.Header';

/**
 * Card Title Component
 */
const CardTitle = forwardRef(({
  children,
  className,
  as: Component = 'h3',
  ...props
}, ref) => {
  return (
    <Component
      ref={ref}
      className={clsx('card-title', className)}
      {...props}
    >
      {children}
    </Component>
  );
});

CardTitle.displayName = 'Card.Title';

/**
 * Card Subtitle Component
 */
const CardSubtitle = forwardRef(({
  children,
  className,
  as: Component = 'p',
  ...props
}, ref) => {
  return (
    <Component
      ref={ref}
      className={clsx('card-subtitle', className)}
      {...props}
    >
      {children}
    </Component>
  );
});

CardSubtitle.displayName = 'Card.Subtitle';

/**
 * Card Body Component
 */
const CardBody = forwardRef(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('card-body', className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardBody.displayName = 'Card.Body';

/**
 * Card Footer Component
 */
const CardFooter = forwardRef(({
  children,
  className,
  ...props
}, ref) => {
  return (
    <div
      ref={ref}
      className={clsx('card-footer', className)}
      {...props}
    >
      {children}
    </div>
  );
});

CardFooter.displayName = 'Card.Footer';

/**
 * Card Image Component
 */
const CardImage = forwardRef(({
  src,
  alt,
  className,
  aspectRatio = '16/9',
  ...props
}, ref) => {
  const aspectClasses = {
    '1/1': 'aspect-square',
    '16/9': 'aspect-video',
    '4/3': 'aspect-4/3',
    '3/2': 'aspect-3/2',
  };
  
  return (
    <div
      className={clsx(
        'relative overflow-hidden rounded-t-lg',
        aspectClasses[aspectRatio] || 'aspect-video',
        className
      )}
    >
      <img
        ref={ref}
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        {...props}
      />
    </div>
  );
});

CardImage.displayName = 'Card.Image';

// Attach sub-components to main Card component
Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Subtitle = CardSubtitle;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Image = CardImage;

Card.propTypes = {
  /** Card content */
  children: PropTypes.node.isRequired,
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Enable hover effects */
  hover: PropTypes.bool,
  /** Card variant */
  variant: PropTypes.oneOf(['default', 'elevated', 'bordered', 'ghost']),
  /** Card padding */
  padding: PropTypes.oneOf(['none', 'sm', 'default', 'lg', 'xl']),
};

CardHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardTitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.elementType,
};

CardSubtitle.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  as: PropTypes.elementType,
};

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardFooter.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

CardImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  aspectRatio: PropTypes.oneOf(['1/1', '16/9', '4/3', '3/2']),
};

export default Card;