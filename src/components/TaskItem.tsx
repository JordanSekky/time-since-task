import { createSignal, onCleanup, Show } from "solid-js";
import type { TaskWithDates as Task } from "~/db/taskService";
import { taskService } from "~/db/taskService";
import EditCompletionTime from "./EditCompletionTime";

interface TaskItemProps {
	task: Task;
	onTaskUpdated: () => void;
}

export default function TaskItem(props: TaskItemProps) {
	const [currentTime, setCurrentTime] = createSignal(new Date());
	const [showEditModal, setShowEditModal] = createSignal(false);

	// Update time every second
	const interval = setInterval(() => {
		setCurrentTime(new Date());
	}, 1000);

	onCleanup(() => clearInterval(interval));

	const timeSinceCompletion = () => {
		if (!props.task.lastCompleted) return Infinity;
		const diffMs = currentTime().getTime() - props.task.lastCompleted.getTime();
		return diffMs / (1000 * 60 * 60); // Convert to hours
	};

	const isOverdue = () => {
		const timeSince = timeSinceCompletion();
		return timeSince > props.task.frequency;
	};

	const formatTime = (hours: number): string => {
		if (hours === Infinity) return "Never completed";

		if (hours < 1) {
			const minutes = Math.floor(hours * 60);
			return `${minutes} minute${minutes !== 1 ? "s" : ""}`;
		}

		if (hours < 24) {
			const wholeHours = Math.floor(hours);
			const minutes = Math.floor((hours - wholeHours) * 60);
			return `${wholeHours}h ${minutes}m`;
		}

		const days = Math.floor(hours / 24);
		const remainingHours = Math.floor(hours % 24);
		return `${days}d ${remainingHours}h`;
	};

	const formatFrequency = (hours: number): string => {
		if (hours < 24) {
			return `Every ${hours} hour${hours !== 1 ? "s" : ""}`;
		}

		if (hours % (24 * 7) === 0) {
			const weeks = hours / (24 * 7);
			return `Every ${weeks} week${weeks !== 1 ? "s" : ""}`;
		}

		if (hours % 24 === 0) {
			const days = hours / 24;
			return `Every ${days} day${days !== 1 ? "s" : ""}`;
		}

		// Fallback for mixed units
		const days = Math.floor(hours / 24);
		const remainingHours = hours % 24;
		if (days > 0 && remainingHours > 0) {
			return `Every ${days} day${days !== 1 ? "s" : ""} ${remainingHours} hour${remainingHours !== 1 ? "s" : ""}`;
		}

		return `Every ${hours} hour${hours !== 1 ? "s" : ""}`;
	};

	const handleComplete = async () => {
		await taskService.setLastCompleted(props.task.id, new Date());
		props.onTaskUpdated();
	};

	const handleDelete = async () => {
		if (confirm(`Are you sure you want to delete "${props.task.name}"?`)) {
			await taskService.delete(props.task.id);
			props.onTaskUpdated();
		}
	};

	const handleEditTime = () => {
		setShowEditModal(true);
	};

	const renderProfilePic = () => {
		if (props.task.lastCompletedByProfilePic) {
			return (
				<img
					src={props.task.lastCompletedByProfilePic}
					alt={props.task.lastCompletedByName || "Profile picture"}
					class="w-8 h-8 rounded-full border border-gray-300"
				/>
			);
		} else {
			// Question mark SVG
			return (
				<svg
					class="w-8 h-8 text-gray-400"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					aria-label="Unknown user"
					role="img"
				>
					<title>Unknown user</title>
					<circle cx="12" cy="12" r="10" stroke-width="2" />
					<g transform="translate(0,2.0)">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 16h.01M12 12a4 4 0 10-4-4"
						/>
					</g>
				</svg>
			);
		}
	};

	return (
		<div
			class={`p-6 rounded-lg border-2 transition-colors ${
				isOverdue() ? "border-red-500 bg-red-50" : "border-gray-200 bg-white"
			}`}
		>
			<div class="flex items-start justify-between">
				<div class="flex-1">
					<h3
						class={`text-xl font-bold mb-2 ${
							isOverdue() ? "text-red-800" : "text-gray-800"
						}`}
					>
						{props.task.name}
					</h3>

					<div class="mb-3">
						<div
							class={`text-3xl font-mono font-bold ${
								isOverdue() ? "text-red-600" : "text-blue-600"
							}`}
						>
							{formatTime(timeSinceCompletion())}
						</div>
						<div
							class={`text-sm ${
								isOverdue() ? "text-red-500" : "text-gray-500"
							}`}
						>
							since last completion
						</div>
						<div class="flex items-center gap-2 mt-2">
							{renderProfilePic()}
							<span class="text-xs text-gray-500">
								Last completed by{" "}
								{props.task.lastCompletedByName || "Anonymous"}
							</span>
						</div>
					</div>

					<p
						class={`text-sm ${isOverdue() ? "text-red-600" : "text-gray-600"}`}
					>
						{formatFrequency(props.task.frequency)}
					</p>
				</div>

				<div class="flex flex-col gap-2 ml-6">
					<button
						type="button"
						onClick={handleComplete}
						class="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors font-medium"
					>
						✓ Complete
					</button>
					<button
						type="button"
						onClick={handleEditTime}
						class="px-6 py-2 bg-blue-200 text-blue-700 rounded-lg hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors text-sm"
					>
						Edit Time
					</button>
					<button
						type="button"
						onClick={handleDelete}
						class="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors text-sm"
					>
						Delete
					</button>
				</div>
			</div>

			<Show when={showEditModal()}>
				<EditCompletionTime
					task={props.task}
					onClose={() => setShowEditModal(false)}
					onTaskUpdated={props.onTaskUpdated}
				/>
			</Show>
		</div>
	);
}
