import React, {
  useState,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import { Group, Alert, Text } from "@mantine/core";
import {
  IconCheck,
  IconX,
  IconInfoCircle,
  IconAlertTriangle,
} from "@tabler/icons-react";

type ToastProps = {
  message: string;
  severity: "success" | "error" | "info" | "warning";
};

type ToastManagerProps = {};

type ToastManagerRef = {
  showToast: (toast: ToastProps) => void;
};

const ToastManager = forwardRef<ToastManagerRef, ToastManagerProps>(
  (props, ref) => {
    const [toast, setToast] = useState<ToastProps & { open: boolean }>({
      open: false,
      message: "",
      severity: "info",
    });

    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const showToast = ({ message, severity }: ToastProps) => {
      setToast({ open: true, message, severity });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setToast((prev) => ({ ...prev, open: false }));
      }, 3000);
    };

    useImperativeHandle(ref, () => ({
      showToast,
    }));

    const handleClose = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setToast((prev) => ({ ...prev, open: false }));
    };

    const getIcon = () => {
      switch (toast.severity) {
        case "success":
          return <IconCheck size={40} />;
        case "error":
          return <IconX size={40} />;
        case "warning":
          return <IconAlertTriangle size={40} />;
        case "info":
        default:
          return <IconInfoCircle size={40} />;
      }
    };

    const toastColor = () => {
      switch (toast.severity) {
        case "success":
          return "green";
        case "error":
          return "red";
        case "warning":
          return "yellow";
        case "info":
        default:
          return "blue";
      }
    };

    if (!toast.open) return null;

    return (
      <Group
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 1000,
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Alert
          variant="filled"
          color={toastColor()}
          icon={getIcon()}
          withCloseButton
          onClose={handleClose}
          className="toast-width"
          style={{ width: "400px" }}
        >
          <Text className="text-white">{toast.message}</Text>
        </Alert>
      </Group>
    );
  }
);

let globalShowToast: (toast: ToastProps) => void;

export const toast = {
  success(message: string) {
    globalShowToast({ message, severity: "success" });
  },
  error(message: string) {
    globalShowToast({ message, severity: "error" });
  },
  info(message: string) {
    globalShowToast({ message, severity: "info" });
  },
  warning(message: string) {
    globalShowToast({ message, severity: "warning" });
  },
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const toastManagerRef = React.useRef<ToastManagerRef>(null);

  React.useEffect(() => {
    if (toastManagerRef.current) {
      globalShowToast = (toast: ToastProps) => {
        toastManagerRef.current?.showToast(toast);
      };
    }
  }, []);

  return (
    <>
      {children}
      <ToastManager ref={toastManagerRef} />
    </>
  );
};
