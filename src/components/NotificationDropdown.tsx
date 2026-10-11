
"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { notificationService } from "@/api/notificationService";
import type { Notification } from "@/types/notification";

function getNotificationId(notification: Notification) {
  return notification._id;
}

function getEventId(notification: Notification) {
  return notification.event?.id || notification.event?._id || "";
}

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMarkingAll, setIsMarkingAll] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const requestIdRef = useRef(0);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const closeDropdown = useCallback(() => {
    requestIdRef.current += 1;
    setIsOpen(false);
    setIsLoading(false);
  }, []);

  const loadNotifications = useCallback(async () => {
    const requestId = ++requestIdRef.current;

    try {
      setIsLoading(true);

      const response = await notificationService.getNotifications();

      if (requestId !== requestIdRef.current) return;

      setNotifications(response.notifications ?? []);
    } catch {
      if (requestId === requestIdRef.current) {
        toast.error("Failed to load notifications.");
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  const handleToggle = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      setIsOpen(true);
      void loadNotifications();
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: PointerEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDropdown();
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeDropdown]);

  const handleMarkAllAsRead = async () => {
    if (isMarkingAll || unreadCount === 0) return;

    try {
      setIsMarkingAll(true);

      await notificationService.markAllAsRead();

      setNotifications((previous) =>
        previous.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );

      toast.success("Notifications marked as read.");
    } catch {
      toast.error("Failed to update notifications.");
    } finally {
      setIsMarkingAll(false);
    }
  };

  const handleNotificationClick = async (
    notification: Notification
  ) => {
    closeDropdown();

    if (notification.isRead) return;

    try {
      await notificationService.markAsRead(
        getNotificationId(notification)
      );

      setNotifications((previous) =>
        previous.map((item) =>
          getNotificationId(item) === getNotificationId(notification)
            ? { ...item, isRead: true }
            : item
        )
      );
    } catch {
      toast.error("Failed to mark notification as read.");
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        ref={toggleRef}
        type="button"
        onClick={handleToggle}
        className="relative rounded-xl border border-slate-700 bg-slate-900 p-2 text-slate-200 transition hover:border-blue-500 hover:text-white"
        aria-label={
          unreadCount > 0
            ? `Notifications, ${unreadCount} unread`
            : "Notifications"
        }
        aria-expanded={isOpen}
        aria-controls="notification-dropdown"
        aria-haspopup="true"
      >
        <Bell size={20} aria-hidden="true" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          id="notification-dropdown"
          className="absolute right-0 top-12 z-[120] w-80 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-black/40"
        >
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
            <div>
              <p className="font-semibold text-white">
                Notifications
              </p>

              <p className="text-xs text-slate-500">
                {unreadCount} unread
              </p>
            </div>

            {unreadCount > 0 && !isLoading && (
              <button
                type="button"
                onClick={handleMarkAllAsRead}
                disabled={isMarkingAll}
                aria-busy={isMarkingAll}
                className="text-xs font-semibold text-blue-400 transition hover:text-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isMarkingAll ? "Updating..." : "Mark all read"}
              </button>
            )}
          </div>

          <div
            className="max-h-96 overflow-y-auto"
            aria-busy={isLoading}
          >
            {isLoading ? (
              <p
                className="px-4 py-5 text-sm text-slate-400"
                role="status"
              >
                Loading notifications...
              </p>
            ) : notifications.length === 0 ? (
              <p className="px-4 py-5 text-sm text-slate-400">
                No notifications yet.
              </p>
            ) : (
              notifications.map((notification) => {
                const eventId = getEventId(notification);

                const content = (
                  <div
                    className={`border-b border-slate-800 px-4 py-4 transition hover:bg-slate-900 ${
                      !notification.isRead ? "bg-blue-500/5" : ""
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-500/10 text-sm font-bold text-blue-300">
                        {notification.sender?.avatar ? (
                          <img
                            src={notification.sender.avatar}
                            alt={notification.sender.name || "Sender"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          notification.sender?.name
                            ?.charAt(0)
                            .toUpperCase() || "N"
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-slate-200">
                          {notification.message}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {new Date(
                            notification.createdAt
                          ).toLocaleString("en-US", {
                            day: "2-digit",
                            month: "short",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>

                      {!notification.isRead && (
                        <span
                          className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-400"
                          aria-label="Unread"
                        />
                      )}
                    </div>
                  </div>
                );

                if (eventId) {
                  return (
                    <Link
                      key={getNotificationId(notification)}
                      href={`/events/${encodeURIComponent(eventId)}`}
                      onClick={() => {
                        void handleNotificationClick(notification);
                      }}
                      className="block"
                    >
                      {content}
                    </Link>
                  );
                }

                return (
                  <button
                    key={getNotificationId(notification)}
                    type="button"
                    onClick={() => {
                      void handleNotificationClick(notification);
                    }}
                    className="block w-full text-left"
                  >
                    {content}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
