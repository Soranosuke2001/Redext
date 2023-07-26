'use client'

import { FC } from "react";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";

interface SubscribeLeaveToggleProps {}

const SubscribeLeaveToggle: FC<SubscribeLeaveToggleProps> = ({}) => {
  const isSubscribed = false;

  return isSubscribed ? (
    <Button className="w-full mt-1 mb-4">Leave Community</Button>
  ) : (
    <Button className="w-full mt-1 mb-4">Join Community</Button>
  );
};

export default SubscribeLeaveToggle;
