import React from 'react';

type TimerProps = {
	deadlineTimestamp: number;
	onTimerEnd: () => void;
}

const Timer: React.FC<TimerProps> = ({
	deadlineTimestamp,
	onTimerEnd,
}) => {
	const [currentTime, setCurrentTime] = React.useState(Date.now());
	const remainingTime = new Date(deadlineTimestamp - currentTime);

	const convertToString = (time: number) => {
		return time.toString().padStart(2, '0');
	};
	const hours = convertToString(remainingTime.getUTCHours());
	const minutes = convertToString(remainingTime.getUTCMinutes());
	const seconds = convertToString(remainingTime.getUTCSeconds());

	const timerClassname = React.useMemo(() => {
		let className = 'fixed border-black top-0 left-4 z-50';
		if (remainingTime.getUTCHours() === 0) {
			if (remainingTime.getUTCMinutes() < 15 && remainingTime.getUTCMinutes() > 5) {
				className += ' text-red-400 font-semibold';
			} else if (remainingTime.getUTCMinutes() < 5) {
				className += ' text-red-700 font-bold';
			}
		}
		return className;
	}, [remainingTime]);

	React.useEffect(() => {
		const interval = setInterval(() => {
			if (currentTime >= deadlineTimestamp) {
				onTimerEnd();
				return;
			}
			setCurrentTime(Date.now());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className={timerClassname}>
			{hours}:{minutes}:{seconds}
		</div>
	);
};

export default Timer;
