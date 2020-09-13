import { useSnackbar } from 'notistack';
import React, { createContext, useCallback, useContext, useMemo } from 'react';

import Notification from '../components/notification/Notification';

export const NOTIFICATION_TYPE = {
    success: 'SUCCESS',
    error: 'ERROR',
    warning: 'WARNING',
    info: 'INFO',
};

const NotificationsContext = createContext();
export const NotificationsProvider = ({ children }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const showSuccess = useCallback(
        (title, message) => {
            enqueueSnackbar(message, {
                content: (key) => (
                    <Notification
                        id={key}
                        message={message}
                        type={NOTIFICATION_TYPE.success}
                        title={title}
                        onClose={closeSnackbar}
                        isModal={true}
                    />
                ),
            });
        },
        [closeSnackbar, enqueueSnackbar]
    );

    const showError = useCallback(
        (title, message, code) => {
            enqueueSnackbar(message, {
                content: (key) => (
                    <Notification
                        id={key}
                        message={message}
                        type={NOTIFICATION_TYPE.error}
                        title={title}
                        code={code}
                        onClose={closeSnackbar}
                        isModal={true}
                    />
                ),
            });
        },
        [closeSnackbar, enqueueSnackbar]
    );

    const showWarning = useCallback(
        (title, message, code) => {
            enqueueSnackbar(message, {
                content: (key) => (
                    <Notification
                        id={key}
                        message={message}
                        type={NOTIFICATION_TYPE.warning}
                        title={title}
                        code={code}
                        onClose={closeSnackbar}
                        isModal={true}
                    />
                ),
            });
        },
        [closeSnackbar, enqueueSnackbar]
    );

    const showInfo = useCallback(
        (title, message) => {
            enqueueSnackbar(message, {
                content: (key) => (
                    <Notification
                        id={key}
                        message={message}
                        type={NOTIFICATION_TYPE.info}
                        title={title}
                        onClose={closeSnackbar}
                        isModal={true}
                    />
                ),
            });
        },
        [closeSnackbar, enqueueSnackbar]
    );

    const notificationsValue = useMemo(() => {
        return {
            showSuccess,
            showError,
            showWarning,
            showInfo,
        };
    }, [showError, showInfo, showSuccess, showWarning]);

    return (
        <NotificationsContext.Provider value={notificationsValue}>
            {children}
        </NotificationsContext.Provider>
    );
};

export const useNotificationsContext = () => {
    return useContext(NotificationsContext);
};
