// @flow
// @inheritedComponent ButtonBase

import React from 'react';
import type { Node } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';
import ButtonBase from '../ButtonBase';
import ArrowDownwardIcon from '../svg-icons/ArrowDownward';

export const styles = (theme: Object) => ({
  root: {
    cursor: 'pointer',
    display: 'inline-flex',
    justifyContent: 'flex-start',
    flexDirection: 'inherit',
    alignItems: 'center',
    '&:hover': {
      color: theme.palette.text.primary,
    },
    '&:focus': {
      color: theme.palette.text.primary,
    },
  },
  active: {
    color: theme.palette.text.primary,
    '& $icon': {
      opacity: 1,
    },
  },
  icon: {
    height: 16,
    marginRight: 4,
    marginLeft: 4,
    opacity: 0,
    transition: theme.transitions.create(['opacity', 'transform'], {
      duration: theme.transitions.duration.shorter,
    }),
    userSelect: 'none',
    width: 16,
  },
  desc: {
    transform: 'rotate(0deg)',
  },
  asc: {
    transform: 'rotate(180deg)',
  },
});

export type Direction = 'asc' | 'desc';

type ProvidedProps = {
  classes: Object,
  theme?: Object,
};

type DefaultProps = {
  active?: boolean,
  direction?: Direction,
};

export type Props = {
  /**
   * If `true`, the label will have the active styling (should be true for the sorted column).
   */
  active?: boolean,
  /**
   * Label contents, the arrow will be appended automatically.
   */
  children?: Node,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * The current sort direction.
   */
  direction?: Direction,
};

/**
 * A button based label for placing inside `TableCell` for column sorting.
 */
class TableSortLabel extends React.Component<ProvidedProps & Props> {
  static defaultProps: DefaultProps = {
    active: false,
    direction: 'desc',
  };

  render() {
    const { active, classes, className: classNameProp, children, direction, ...other } = this.props;
    const className = classNames(
      classes.root,
      {
        [classes.active]: active,
      },
      classNameProp,
    );

    const iconClassName = classNames(classes.icon, {
      [classes[direction]]: !!direction,
    });

    return (
      <ButtonBase className={className} component="span" disableRipple {...other}>
        {children}
        <ArrowDownwardIcon className={iconClassName} />
      </ButtonBase>
    );
  }
}

export default withStyles(styles, { name: 'MuiTableSortLabel' })(TableSortLabel);
