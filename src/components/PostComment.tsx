"use client";

import { FC, useRef, useState } from "react";
import UserAvatar from "./UserAvatar";
import { Comment, CommentVote, User } from "@prisma/client";
import { formatTimeToNow } from "@/lib/utils";
import CommentVotes from "./CommentVotes";
import { Button } from "./ui/Button";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Label } from "./ui/Label";
import { Textarea } from "./ui/Textarea";
import { useMutation } from "@tanstack/react-query";
import { CommentRequest } from "@/lib/validators/comment";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

type ExtendedComment = Comment & {
  votes: CommentVote[];
  author: User;
};

interface PostCommentProps {
  comment: ExtendedComment;
  votesAmt: number;
  currentVote: CommentVote | undefined;
  postId: string;
}

const PostComment: FC<PostCommentProps> = ({
  comment,
  votesAmt,
  currentVote,
  postId,
}) => {
  const commentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { data: session } = useSession();
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");

  const { mutate: postComment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = {
        postId,
        text,
        replyToId,
      };

      const { data } = await axios.patch(
        `/api/subreddit/post/comment`,
        payload
      );
      return data;
    },
    onError: (err) => {
      return toast({
        title: "An Error Occurred",
        description: "Could not post your comment. Please try again later.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      router.refresh();
      setIsReplying(false);
      setUserInput("");
    },
  });

  return (
    <div ref={commentRef} className="flex flex-col">
      <div className="flex items-center">
        {/* User Avatar */}
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
          className="h-6 w-6"
        />

        {/* Comment Details */}
        <div className="ml-2 flex items-center gap-x-2">
          <p className="text-sm font-medium text-gray-900 dark:text-neutral-300">
            u/{comment.author.username}
          </p>
          <p className="max-h-40 truncate text-xs text-zinc-500 dark:text-zinc-400">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>

      {/* Comment Content */}
      <p className="text-sm text-zinc-900 dark:text-white mt-2">{comment.text}</p>

      <div className="flex gap-2 items-center flex-wrap">
        <CommentVotes
          commentId={comment.id}
          initialVotesAmt={votesAmt}
          initialVote={currentVote}
        />

        <Button
          onClick={() => {
            if (!session) return router.push("/sign-in");

            setIsReplying(true);
          }}
          variant="ghost"
          size="xs"
          aria-label="Reply"
        >
          <MessageSquare className="h-4 w-4 mr-1.5" />
          Reply
        </Button>

        {isReplying && (
          <div className="grid w-full gap-1.5">
            <Label htmlFor="comment">Your Comment</Label>
            <div className="mt-2">
              <Textarea
                id="comment"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                rows={1}
                placeholder="Enter your comment"
                className="dark:border-white dark:placeholder:text-neutral-400"
              />

              <div className="mt-2 flex justify-end gap-2">
                <Button
                  tabIndex={-1}
                  variant="subtle"
                  onClick={() => {
                    setIsReplying(false);
                    setUserInput("");
                  }}
                >
                  Cancel
                </Button>
                <Button
                  isLoading={isLoading}
                  disabled={userInput.length === 0}
                  onClick={() => {
                    if (!userInput) return;

                    postComment({
                      postId,
                      text: userInput,
                      replyToId: comment.replyToId ?? comment.id,
                    });
                  }}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostComment;
