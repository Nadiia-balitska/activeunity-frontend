"use client";

import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

import toast from "react-hot-toast";

import { commentService } from "@/api/commentService";
import { useAuthStore } from "@/store/authStore";
import type { EventComment } from "@/types/comment";

interface CommentsSectionProps {
    eventId: string;
    organizerId: string;
}

function getAuthorId(comment: EventComment) {
    return comment.author.id || comment.author._id || "";
}

export function CommentsSection({ eventId, organizerId }: CommentsSectionProps) {
    const user = useAuthStore((state) => state.user);

    const [comments, setComments] = useState<EventComment[]>([]);
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const loadComments = async () => {
            try {
                const response = await commentService.getEventComments(eventId);
                setComments(response.comments);
            } catch {
                toast.error("Failed to load comments.");
            } finally {
                setIsLoading(false);
            }
        };

        if (eventId) {
            loadComments();
        }
    }, [eventId]);

    const handleCreateComment = async (
        event: React.FormEvent<HTMLFormElement>,
    ) => {
        event.preventDefault();

        if (!text.trim()) {
            toast.error("Comment cannot be empty.");
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await commentService.createComment(eventId, text.trim());

            setComments((prevComments) => [response.comment, ...prevComments]);
            setText("");

            toast.success("Comment added.");
        } catch {
            toast.error("Failed to add comment.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteComment = async (commentId: string) => {
        try {
            await commentService.deleteComment(commentId);

            setComments((prevComments) =>
                prevComments.filter((comment) => comment._id !== commentId),
            );

            toast.success("Comment deleted.");
        } catch {
            toast.error("Failed to delete comment.");
        }
    };

    return (
        <section className="mt-10 rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">Comments</h2>
                <p className="mt-2 text-sm text-slate-400">
                    Discuss this event with the community.
                </p>
            </div>

            {user ? (
                <form onSubmit={handleCreateComment} className="mb-6">
                    <textarea
                        value={text}
                        onChange={(event) => setText(event.target.value)}
                        disabled={isSubmitting}
                        rows={3}
                        maxLength={500}
                        className="w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                        placeholder="Write a comment..."
                    />

                    <div className="mt-3 flex items-center justify-between gap-3">
                        <p className="text-xs text-slate-500">{text.length}/500</p>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Posting..." : "Post comment"}
                        </button>
                    </div>
                </form>
            ) : (
                <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-950 p-5 text-sm text-slate-300">
                    Please log in to write a comment.
                </div>
            )}

            {isLoading ? (
                <p className="text-sm text-slate-400">Loading comments...</p>
            ) : comments.length > 0 ? (
                <div className="space-y-4">
                    {comments.map((comment) => {

                        const isOrganizer =
                            getAuthorId(comment) === organizerId;

                        const authorId = getAuthorId(comment);

                        const isOwnComment = user?.id === getAuthorId(comment);

                        return (
                            <article
                                key={comment._id}
                                className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
                            >
                                <div className="flex gap-4">

                                    <Link
                                        href={`/users/${authorId}`}
                                        className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-500/10 text-sm font-bold text-blue-300 transition hover:ring-2 hover:ring-blue-500/40"
                                    >
                                        {comment.author.avatar ? (
                                            <img
                                                src={comment.author.avatar}
                                                alt={comment.author.name}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            comment.author.name.charAt(0).toUpperCase()
                                        )}
                                    </Link>

                                    <div className="min-w-0 flex-1">
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/users/${authorId}`}
                                                        className="font-semibold text-white transition hover:text-blue-400"
                                                    >
                                                        {comment.author.name}
                                                    </Link>

                                                    {isOrganizer && (
                                                        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-blue-300">
                                                            Organizer
                                                        </span>
                                                    )}
                                                </div>

                                                <p className="text-xs text-slate-500">
                                                    {new Date(comment.createdAt).toLocaleString("en-US", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric",
                                                        hour: "numeric",
                                                        minute: "2-digit",
                                                    })}
                                                </p>
                                            </div>

                                            {isOwnComment && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteComment(comment._id)}
                                                    className="rounded-xl border border-red-500/30 bg-red-500/10 p-2 text-red-300 transition hover:bg-red-500/20"
                                                    aria-label="Delete comment"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>

                                        <p className="mt-3 whitespace-pre-line text-sm leading-6 text-slate-300">
                                            {comment.text}
                                        </p>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            ) : (
                <div className="rounded-2xl border border-slate-800 bg-slate-950 p-8 text-center text-slate-400">
                    No comments yet. Be the first to start the discussion.
                </div>
            )}
        </section>
    );
}