"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
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

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const loadNotifications = async () => {
    try {
      setIsLoading(true);

      const response = await notificationService.getNotifications();
      setNotifications(response.notifications);
    } catch {
      toast.error("Failed to load notifications.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async () => {
    setIsOpen((prev) => !prev);

    if (!isOpen) {
      await loadNotifications();
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );

      toast.success("Notifications marked as read.");
    } catch {
      toast.error("Failed to update notifications.");
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      try {
        await notificationService.markAsRead(getNotificationId(notification));

        setNotifications((prevNotifications) =>
          prevNotifications.map((item) =>
            getNotificationId(item) === getNotificationId(notification)
              ? { ...item, isRead: true }
              : item
          )
        );
      } catch {
        toast.error("Failed to mark notification as read.");
      }
    }

    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleToggle}
        className="relative rounded-xl border border-slate-700 bg-slate-900 p-2 text-slate-200 transition hover:border-blue-500 hover:text-white"
        aria-label="Notifications"
      >
        <Bell size={20} />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-12 z-[120] w-80 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl shadow-black/40">
          <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
            <div>
              <p className="font-semibold text-white">Notifications</p>
              <p className="text-xs text-slate-500">
                {unreadCount} unread
              </p>
            </div>

            {notifications.length > 0 && (
              <button
                type="button"
                onClick={handleMarkAllAsRead}
                className="text-xs font-semibold text-blue-400 transition hover:text-blue-300"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <p className="px-4 py-5 text-sm text-slate-400">
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
                            alt={notification.sender.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          notification.sender?.name?.charAt(0).toUpperCase() ||
                          "N"
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm text-slate-200">
                          {notification.message}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {new Date(notification.createdAt).toLocaleString(
                            "en-US",
                            {
                              day: "2-digit",
                              month: "short",
                              hour: "numeric",
                              minute: "2-digit",
                            }
                          )}
                        </p>
                      </div>

                      {!notification.isRead && (
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-400" />
                      )}
                    </div>
                  </div>
                );

                if (eventId) {
                  return (
                    <Link
                      key={getNotificationId(notification)}
                      href={`/events/${eventId}`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      {content}
                    </Link>
                  );
                }

                return (
                  <button
                    key={getNotificationId(notification)}
                    type="button"
                    onClick={() => handleNotificationClick(notification)}
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