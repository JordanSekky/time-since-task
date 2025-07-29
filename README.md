# Time Since Task

A simple and effective way to manage your recurring tasks.

## Product Description

Time Since Task helps you keep track of recurring tasks with real-time timers and visual indicators. Add tasks with a name and frequency, see how long it's been since each was last completed, and get alerted when something is overdue. Mark tasks as complete to reset their timers and stay on schedule.

### How it works
1. **Add Tasks**: Create tasks with a name and frequency (in hours). For example, "Water plants" every 48 hours.
2. **Track Progress**: Each task shows how long it's been since it was last completed. The timer updates in real-time.
3. **Stay on Schedule**: When a task goes overdue (past its frequency), it turns red to alert you.
4. **Mark Complete**: Click "Complete" to reset the timer and track your next cycle.

### Features
- ✓ Real-time timers that update every second
- ✓ Visual indicators for overdue tasks
- ✓ Persistent storage using SQLite (via Drizzle ORM)
- ✓ Clean, responsive design
- ✓ Built with SolidJS for optimal performance
- ✓ Tailscale Serve integration for user identity (shows who last completed a task)

---

## Getting Started

### Prerequisites
- [Bun](https://bun.sh/) (for running and installing dependencies)
- [Drizzle Kit](https://orm.drizzle.team/docs/overview) (for DB migrations)

### Install dependencies
```bash
bun install
```

### Database: Generate & Migrate
Generate the SQL migration files (if you change the schema):
```bash
bun run db:generate
```

Run the migrations to update your SQLite database:
```bash
bun run db:migrate
```

### Running the App
Start the development server:
```bash
bun run dev
```

### Running with Tailscale Serve
To serve the app with Tailscale identity headers:
1. Build the app:
   ```bash
   bun run build
   ```
2. Start the server:
   ```bash
   bun run start
   ```
3. Use `tailscale serve` to expose your local server to your tailnet. The app will automatically use Tailscale identity headers to show who last completed each task.

## License

MIT