import { A } from "@solidjs/router";

export default function About() {
	return (
		<main class="max-w-4xl mx-auto p-6">
			<div class="text-center mb-8">
				<h1 class="text-4xl font-bold text-gray-800 mb-4">
					About Task Tracker
				</h1>
				<p class="text-gray-600 mb-8">
					A simple and effective way to manage your recurring tasks
				</p>
			</div>

			<div class="bg-white rounded-lg shadow-md p-6 mb-6">
				<h2 class="text-2xl font-semibold text-gray-800 mb-4">How it works</h2>
				<div class="space-y-4 text-gray-700">
					<div class="flex items-start">
						<div class="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
							1
						</div>
						<div>
							<h3 class="font-semibold">Add Tasks</h3>
							<p>
								Create tasks with a name and frequency (in hours). For example,
								"Water plants" every 48 hours.
							</p>
						</div>
					</div>
					<div class="flex items-start">
						<div class="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
							2
						</div>
						<div>
							<h3 class="font-semibold">Track Progress</h3>
							<p>
								Each task shows how long it's been since it was last completed.
								The timer updates in real-time.
							</p>
						</div>
					</div>
					<div class="flex items-start">
						<div class="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
							3
						</div>
						<div>
							<h3 class="font-semibold">Stay on Schedule</h3>
							<p>
								When a task goes overdue (past its frequency), it turns red to
								alert you.
							</p>
						</div>
					</div>
					<div class="flex items-start">
						<div class="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
							4
						</div>
						<div>
							<h3 class="font-semibold">Mark Complete</h3>
							<p>
								Click "Complete" to reset the timer and track your next cycle.
							</p>
						</div>
					</div>
				</div>
			</div>

			<div class="bg-white rounded-lg shadow-md p-6">
				<h2 class="text-2xl font-semibold text-gray-800 mb-4">Features</h2>
				<ul class="space-y-2 text-gray-700">
					<li class="flex items-center">
						<span class="text-green-500 mr-2">✓</span>
						Real-time timers that update every second
					</li>
					<li class="flex items-center">
						<span class="text-green-500 mr-2">✓</span>
						Visual indicators for overdue tasks
					</li>
					<li class="flex items-center">
						<span class="text-green-500 mr-2">✓</span>
						Persistent storage using browser localStorage
					</li>
					<li class="flex items-center">
						<span class="text-green-500 mr-2">✓</span>
						Clean, responsive design
					</li>
					<li class="flex items-center">
						<span class="text-green-500 mr-2">✓</span>
						Built with SolidJS for optimal performance
					</li>
				</ul>
			</div>

			<div class="text-center mt-8">
				<A href="/" class="text-blue-600 hover:underline font-medium">
					← Back to Tasks
				</A>
			</div>
		</main>
	);
}
