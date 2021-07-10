import React, { FC, MouseEventHandler, ReactElement, useRef, useState } from "react";
import {
    ListItem,
    ListItemAvatar,
    ListItemAvatarProps as ListItemAvatarPropsTypes,
    ListItemIcon,
    ListItemIconProps as ListItemIconPropsTypes,
    ListItemProps as ListItemPropsTypes,
    ListItemSecondaryAction,
    ListItemSecondaryActionProps as ListItemSecondaryActionPropsTypes,
    ListItemText,
    ListItemTextProps as ListItemTextPropsTypes,
    makeStyles,
} from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
    backgroundClass: {
        position: `absolute`,
        width: `100%`,
        height: `100%`,
        zIndex: -1,
        display: `flex`,
        flexDirection: `row`,
        justifyContent: `space-between`,
        alignItems: `center`,
        paddingRight: 16,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
        boxSizing: `border-box`,
    },
    listItemClass: {
        backgroundColor: theme.palette.background.default,
        transition: `transform 0.3s ease-out`,
        // height: `40px`
    },
    wrapperClass: {
        position: `relative`,
        transition: `max-height 0.5s ease`,
        transformOrigin: `top`,
        overflow: `hidden`,
        width: `100%`,
    },
    classeZoeira: {
        border: `1px solid`,
        borderColor: `red`,
    },
}));

interface SwipeableListItemProps {
    avatar?: ReactElement;
    background: {
        actionIconLeft: ReactElement;
        actionIconRight: ReactElement;
        backgroundColorLeft: string;
        backgroundColorRight: string;
    };
    disableDeleteAnimation?: boolean;
    itemIcon?: ReactElement;
    ListItemAvatarProps?: ListItemAvatarPropsTypes;
    ListItemIconProps?: ListItemIconPropsTypes;
    ListItemProps?: ListItemPropsTypes;
    ListItemSecondaryActionProps?: ListItemSecondaryActionPropsTypes;
    ListItemTextProps?: ListItemTextPropsTypes;
    onSwipedLeft: (event: React.TransitionEvent) => void;
    onSwipedRight: (event: React.TransitionEvent) => void;
    primaryText: string | ReactElement;
    secondaryAction?: ReactElement;
    secondaryText?: string | ReactElement;
    threshold?: number;
    onClickEventHandler?: MouseEventHandler;
    disabled?: boolean;
}

const SwipeableListItem: FC<SwipeableListItemProps> = ({
    avatar,
    background,
    disableDeleteAnimation = false,
    itemIcon,
    ListItemAvatarProps = {},
    ListItemIconProps = {},
    ListItemProps = {},
    ListItemSecondaryActionProps = {},
    ListItemTextProps = {},
    onSwipedLeft,
    onSwipedRight,
    primaryText,
    secondaryAction,
    secondaryText,
    threshold = 0.3,
    onClickEventHandler,
    disabled,
}) => {
    const classes = useStyles();
    const { backgroundClass, listItemClass, wrapperClass } = classes;
    const listElementEl = useRef<HTMLLIElement>(document.createElement(`li`));
    const [state, setState] = useState({
        wrapperMaxHeight: 1000,
        diff: 0,
        dragged: false,
        dragStartX: 0,
        isAnimating: false,
        side: `left`,
        startTime: 0,
    });

    const { className, ...restOfListItemProps } = ListItemProps;

    const { diff, dragged, dragStartX, isAnimating, side, wrapperMaxHeight } = state;

    function onDragStartTouch(event: React.TouchEvent): void {
        if (disabled) return;
        const touch = event.touches[0];
        const { clientX } = touch;
        setState((prevState) => ({
            ...prevState,
            dragged: true,
            dragStartX: clientX,
            isAnimating: true,
            startTime: Date.now(),
        }));
    }

    function onDragEndTouch(): void {
        if (disabled) return;
        if (dragged) {
            setState((prevState) => ({
                ...prevState,
                dragged: false,
            }));
            if (diff < listElementEl.current.offsetWidth * threshold * -1) {
                setState((prevState) => ({
                    ...prevState,
                    diff: -listElementEl.current.offsetWidth * 2,
                    wrapperMaxHeight: 0,
                }));
            } else if (diff > listElementEl.current.offsetWidth * threshold) {
                setState((prevState) => ({
                    ...prevState,
                    diff: listElementEl.current.offsetWidth * 2,
                }));
            } else {
                setState((prevState) => ({ ...prevState, diff: 0 }));
            }
        }
    }

    function onTouchMove(event: React.TouchEvent): void {
        if (disabled) return;
        const touch = event.touches[0];
        const newDiff = touch.clientX - dragStartX;
        if (newDiff < 0) {
            setState((prevState) => ({
                ...prevState,
                diff: newDiff,
                side: `left`,
            }));
        } else if (newDiff > 0) {
            setState((prevState) => ({
                ...prevState,
                diff: newDiff,
                side: `right`,
            }));
        }
    }

    function onTransitionEnd(event: React.TransitionEvent): void {
        if (disabled) return;
        event.persist();
        const { propertyName } = event;
        const propertyCheck = disableDeleteAnimation || propertyName === `max-height`;
        if (side === `left` && propertyCheck && !dragged && diff < listElementEl.current.offsetWidth * threshold * -1) {
            onSwipedLeft(event);
            if (disableDeleteAnimation)
                setState((prevState) => ({
                    ...prevState,
                    diff: 0,
                    isAnimating: false,
                }));
        } else if (side === `right` && !dragged && diff > listElementEl.current.offsetWidth * threshold) {
            onSwipedRight(event);
            setState((prevState) => ({
                ...prevState,
                diff: 0,
                isAnimating: false,
            }));
        } else {
            setState((prevState) => ({
                ...prevState,
                isAnimating: false,
            }));
        }
    }

    const { actionIconLeft, actionIconRight, backgroundColorLeft, backgroundColorRight } = background;

    const getOpacity = (): number => {
        const opacity = parseFloat((Math.abs(diff) / 100).toFixed(2));
        if (opacity < 1) {
            return opacity;
        }
        return 1;
    };

    return (
        <div>
            <div
                className={wrapperClass}
                data-testid="wrapper-list-item"
                onTransitionEnd={onTransitionEnd}
                style={{
                    maxHeight: !disableDeleteAnimation ? wrapperMaxHeight : undefined,
                }}
                onClick={onClickEventHandler}
            >
                <ListItem
                    className={backgroundClass}
                    data-testid="action-list-item"
                    style={{
                        backgroundColor: side === `left` ? backgroundColorLeft : backgroundColorRight,
                        justifyContent: side === `left` ? `flex-end` : `flex-start`,
                        opacity: getOpacity(),
                    }}
                >
                    {side === `left` ? actionIconLeft : actionIconRight}
                </ListItem>
                <ListItem
                    {...restOfListItemProps} // eslint-disable-line react/jsx-props-no-spreading
                    className={[listItemClass, className].join(` `)}
                    data-testid="draggable-list-item"
                    onTouchStart={onDragStartTouch}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onDragEndTouch}
                    // @ts-ignore
                    ref={listElementEl}
                    style={{
                        transform: `translateX(${diff}px)`,
                    }}
                >
                    {itemIcon && (
                        <ListItemIcon
                            data-testid="list-item-icon"
                            {...ListItemIconProps} // eslint-disable-line react/jsx-props-no-spreading
                        >
                            {itemIcon}
                        </ListItemIcon>
                    )}
                    {avatar && (
                        <ListItemAvatar
                            data-testid="list-item-avatar"
                            {...ListItemAvatarProps} // eslint-disable-line react/jsx-props-no-spreading
                        >
                            {avatar}
                        </ListItemAvatar>
                    )}
                    <ListItemText
                        {...ListItemTextProps} // eslint-disable-line react/jsx-props-no-spreading
                        primary={primaryText}
                        secondary={secondaryText}
                    />
                    {secondaryAction && (
                        <ListItemSecondaryAction
                            data-testid="list-secondary-action"
                            {...ListItemSecondaryActionProps} // eslint-disable-line react/jsx-props-no-spreading
                            style={{
                                transition: dragged || isAnimating ? undefined : `visibility 0.3s ease-out 0.3s`,
                                visibility: dragged || isAnimating ? `hidden` : `visible`,
                            }}
                        >
                            {secondaryAction}
                        </ListItemSecondaryAction>
                    )}
                </ListItem>
            </div>
        </div>
    );
};

export default SwipeableListItem;
