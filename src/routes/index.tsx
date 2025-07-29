import { createSignal } from "solid-js";
import AddTask from "~/components/AddTask";
import TaskList from "~/components/TaskList";

export default function Home() {
	const [refreshKey, setRefreshKey] = createSignal(0);

	const handleTaskUpdated = () => {
		setRefreshKey((prev) => prev + 1);
	};

	return (
		<main class="max-w-4xl mx-auto p-6">
			<div class="text-center mb-8">
				<h1 class="text-4xl font-bold text-gray-800 mb-2">Task Tracker</h1>
				<p class="text-gray-600">
					Track your recurring tasks and never miss a deadline
				</p>
			</div>

			<TaskList refreshKey={refreshKey()} onTaskUpdated={handleTaskUpdated} />
			<AddTask onTaskAdded={handleTaskUpdated} />
		</main>
	);
}
