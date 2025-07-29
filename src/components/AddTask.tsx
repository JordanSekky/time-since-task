import { taskService } from "~/db/taskService";

interface AddTaskProps {
	onTaskAdded: () => void;
}

export default function AddTask(props: AddTaskProps) {
	let nameInput: HTMLInputElement | undefined;
	let frequencyInput: HTMLInputElement | undefined;
	let unitSelect: HTMLSelectElement | undefined;

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		const name = nameInput?.value.trim();
		const frequencyValue = Number(frequencyInput?.value || 1);
		const unit = unitSelect?.value || "days";

		// Convert to hours for storage
		let frequencyInHours: number;
		switch (unit) {
			case "hours":
				frequencyInHours = frequencyValue;
				break;
			case "days":
				frequencyInHours = frequencyValue * 24;
				break;
			case "weeks":
				frequencyInHours = frequencyValue * 24 * 7;
				break;
			default:
				frequencyInHours = frequencyValue * 24; // default to days
		}

		if (name) {
			await taskService.create({
				name,
				frequency: frequencyInHours,
				lastCompleted: null,
				createdAt: new Date(),
			});
			if (nameInput) nameInput.value = "";
			if (frequencyInput) frequencyInput.value = "1";
			if (unitSelect) unitSelect.value = "days";
			props.onTaskAdded();
		}
	};

	return (
		<div class="bg-white p-6 rounded-lg shadow-md my-6">
			<h2 class="text-xl font-semibold mb-4 text-gray-800">Add New Task</h2>
			<form onSubmit={handleSubmit} class="space-y-4">
				<div>
					<label
						for="task-name"
						class="block text-sm font-medium text-gray-700 mb-1"
					>
						Task Name
					</label>
					<input
						id="task-name"
						type="text"
						ref={nameInput}
						placeholder="Enter task name..."
						class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
						required
					/>
				</div>

				<div>
					<label
						for="task-frequency"
						class="block text-sm font-medium text-gray-700 mb-1"
					>
						Frequency
					</label>
					<div class="flex gap-2">
						<input
							id="task-frequency"
							type="number"
							min="1"
							ref={frequencyInput}
							value="1"
							class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
							required
						/>
						<select
							ref={unitSelect}
							class="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
						>
							<option value="hours">Hours</option>
							<option value="days" selected>
								Days
							</option>
							<option value="weeks">Weeks</option>
						</select>
					</div>
				</div>

				<button
					type="submit"
					class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
				>
					Add Task
				</button>
			</form>
		</div>
	);
}
