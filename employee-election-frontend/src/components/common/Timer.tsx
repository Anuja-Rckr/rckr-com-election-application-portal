import { useEffect, useState } from "react";
import { Group, Stack, Text } from "@mantine/core";
import { RED } from "../../common/constants";
import { TimerProps } from "../../interfaces/election.interface";

const Timer = ({
  endTime,
  onExpire,
  isValidDate,
  type,
}: TimerProps & { onExpire: () => void }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const calculateTimeLeft = () => {
    const utcDate = new Date(endTime);

    const currentTime = new Date();

    const difference = utcDate.getTime() - currentTime.getTime();

    if (difference <= 0) {
      onExpire();
      if (intervalId) {
        clearInterval(intervalId);
      }
      return "00 : 00 : 00 : 00";
    }

    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24))
      .toString()
      .padStart(2, "0");
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");

    return `${days} : ${hours} : ${minutes} : ${seconds}`;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    setIntervalId(interval);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <Group justify="center" mb="md">
      {type === "voting" && (
        <Text color={RED}>
          {isValidDate ? "Voting ends in" : "Voting starts in"}
        </Text>
      )}
      {type === "nomination" && (
        <Text color={RED}>
          {isValidDate
            ? "Nomination process ends in"
            : "Nomination process starts in"}
        </Text>
      )}
      <Stack className="timer" p="sm">
        <Text>Days : Hours : Mins : Seconds</Text>
        <Text className="timer-font">{timeLeft}</Text>
      </Stack>
    </Group>
  );
};

export default Timer;
