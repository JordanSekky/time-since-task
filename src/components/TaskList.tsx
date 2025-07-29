import { createEffect, createSignal } from "solid-js";
import type { TaskWithDates as Task } from "~/db/taskService";
import { taskService } from "~/db/taskService";
import TaskItem from "./TaskItem";

interface TaskListProps {
	onTaskUpdated: () => void;
	refreshKey: number;
}

export default function TaskList(props: TaskListProps) {
	const [tasks, setTasks] = createSignal<Task[]>([]);
	const [isLoaded, setIsLoaded] = createSignal(false);

	const loadTasks = async () => {
		try {
			const loadedTasks = await taskService.getAll();
			setTasks(loadedTasks);
			setIsLoaded(true);
			console.log("tasks", tasks());
		} catch (error) {
			console.error("Failed to load tasks:", error);
		}
	};

	createEffect(async () => {
		if (!isLoaded()) {
			loadTasks();
		}
	});

	createEffect(() => {
		props.refreshKey;
		loadTasks();
	});

	return (
		<div class="space-y-4">
			{!isLoaded() ? (
				<div class="text-center py-12">
					<div class="text-gray-400 text-6xl mb-4">⏳</div>
					<h3 class="text-xl font-medium text-gray-600 mb-2">Loading...</h3>
					<p class="text-gray-500">Loading your tasks...</p>
				</div>
			) : tasks().length === 0 ? (
				<div class="text-center py-12">
					<div class="text-gray-400 text-6xl mb-4">📝</div>
					<h3 class="text-xl font-medium text-gray-600 mb-2">No tasks yet</h3>
					<p class="text-gray-500">Add your first task above to get started!</p>
				</div>
			) : (
				<div class="space-y-4">
					{tasks().map((task) => (
						<TaskItem
							task={task}
							onTaskUpdated={() => {
								loadTasks();
								props.onTaskUpdated();
							}}
						/>
					))}
				</div>
			)}
		</div>
	);
}
