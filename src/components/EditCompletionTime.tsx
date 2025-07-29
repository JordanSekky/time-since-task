import { createSignal } from "solid-js";
import type { TaskWithDates as Task } from "~/db/taskService";
import { taskService } from "~/db/taskService";
import { getCurrentUserIdentity } from "../userIdentity";

interface EditCompletionTimeProps {
	task: Task;
	onClose: () => void;
	onTaskUpdated: () => void;
}

export default function EditCompletionTime(props: EditCompletionTimeProps) {
	const [dateTime, setDateTime] = createSignal(
		props.task.lastCompleted
			? new Date(
					props.task.lastCompleted.getTime() -
						props.task.lastCompleted.getTimezoneOffset() * 60000,
				)
					.toISOString()
					.slice(0, 16)
			: new Date().toISOString().slice(0, 16),
	);

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		const newDate = new Date(dateTime());
		await taskService.setLastCompleted(props.task.id, newDate);
		props.onClose();
		props.onTaskUpdated();
	};

	const handleClear = async () => {
		await taskService.setLastCompleted(props.task.id, null);
		props.onClose();
		props.onTaskUpdated();
	};

	return (
		<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
				<h3 class="text-lg font-semibold text-gray-800 mb-4">
					Edit Last Completion Time
				</h3>

				<p class="text-sm text-gray-600 mb-4">
					Task: <span class="font-medium">{props.task.name}</span>
				</p>

				<form onSubmit={handleSubmit} class="space-y-4">
					<div>
						<label
							for="completion-time"
							class="block text-sm font-medium text-gray-700 mb-1"
						>
							Last Completed
						</label>
						<input
							id="completion-time"
							type="datetime-local"
							value={dateTime()}
							onInput={(e) => setDateTime(e.target.value)}
							class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
							required
						/>
					</div>

					<div class="flex gap-3">
						<button
							type="submit"
							class="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
						>
							Update
						</button>
						<button
							type="button"
							onClick={handleClear}
							class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
						>
							Clear
						</button>
						<button
							type="button"
							onClick={props.onClose}
							class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
						>
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
