import { useEffect, useState } from "react";
import { Group, Stack, Text } from "@mantine/core";
import { RED } from "../../common/constants";
import { TimerProps } from "../../interfaces/election.interface";

const Timer = ({
  votingEndTime,
  onExpire,
}: TimerProps & { onExpire: () => void }) => {
  const [timeLeft, setTimeLeft] = useState("");

  const calculateTimeLeft = () => {
    const utcDate = new Date(votingEndTime);
    const istEndTime = new Date(utcDate.getTime() + (5 * 60 + 30) * 60000);

    const currentTime = new Date();

    const difference = istEndTime.getTime() - currentTime.getTime();

    if (difference <= 0) {
      onExpire();
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

    return () => clearInterval(interval);
  }, [votingEndTime]);

  return (
    <Group justify="center" mb="md">
      <Text color={RED}>Voting ends in</Text>
      <Stack className="timer" p="sm">
        <Text>Days : Hours : Mins : Seconds</Text>
        <Text className="timer-font">{timeLeft}</Text>
      </Stack>
    </Group>
  );
};

export default Timer;
