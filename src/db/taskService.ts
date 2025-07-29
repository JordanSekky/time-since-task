import { eq } from "drizzle-orm";
import { getCurrentUserIdentity } from "../userIdentity";
import { db } from "./index";
import { type NewTask, type Task, tasks } from "./schema";

export interface TaskWithDates {
    id: string;
    name: string;
    frequency: number;
    lastCompleted: Date | null;
    createdAt: Date;
    lastCompletedByLogin?: string | null;
    lastCompletedByName?: string | null;
    lastCompletedByProfilePic?: string | null;
}

// Convert database task to TaskWithDates
const mapTaskFromDb = (task: Task): TaskWithDates => ({
    id: task.id,
    name: task.name,
    frequency: task.frequency,
    lastCompleted: task.lastCompleted ? new Date(task.lastCompleted) : null,
    createdAt: new Date(task.createdAt),
    lastCompletedByLogin: task.lastCompletedByLogin ?? null,
    lastCompletedByName: task.lastCompletedByName ?? null,
    lastCompletedByProfilePic: task.lastCompletedByProfilePic ?? null,
});

// Convert TaskWithDates to database task
const mapTaskToDb = (task: TaskWithDates): NewTask => ({
    id: task.id,
    name: task.name,
    frequency: task.frequency,
    lastCompleted: task.lastCompleted ? task.lastCompleted.getTime() : null,
    createdAt: task.createdAt.getTime(),
    lastCompletedByLogin: task.lastCompletedByLogin ?? null,
    lastCompletedByName: task.lastCompletedByName ?? null,
    lastCompletedByProfilePic: task.lastCompletedByProfilePic ?? null,
});

export const taskService = {
    // Get all tasks
    getAll: async (): Promise<TaskWithDates[]> => {
        "use server";
        const dbTasks = db.select().from(tasks).all();
        return Promise.resolve(dbTasks.map(mapTaskFromDb));
    },

    // Get task by ID
    getById: async (id: string): Promise<TaskWithDates | undefined> => {
        "use server";
        const task = db.select().from(tasks).where(eq(tasks.id, id)).get();
        return Promise.resolve(task ? mapTaskFromDb(task) : undefined);
    },

    // Create new task
    create: async (task: Omit<TaskWithDates, "id">): Promise<TaskWithDates> => {
        "use server";
        const newTask: TaskWithDates = {
            ...task,
            id: crypto.randomUUID(),
        };

        db.insert(tasks).values(mapTaskToDb(newTask)).run();
        return Promise.resolve(newTask);
    },

    // Update task
    update: async (
        id: string,
        updates: Partial<TaskWithDates>,
    ): Promise<TaskWithDates | undefined> => {
        "use server";
        const existingTask = await taskService.getById(id);
        if (!existingTask) return undefined;

        const updatedTask: TaskWithDates = { ...existingTask, ...updates };

        db.update(tasks)
            .set(mapTaskToDb(updatedTask))
            .where(eq(tasks.id, id))
            .run();

        return Promise.resolve(updatedTask);
    },

    // Delete task
    delete: async (id: string): Promise<boolean> => {
        "use server";
        const result = db.delete(tasks).where(eq(tasks.id, id)).run();
        return Promise.resolve(result.changes > 0);
    },

    // Update last completed time
    setLastCompleted: async (
        id: string,
        date: Date | null,
    ): Promise<TaskWithDates | undefined> => {
        "use server";
        const user = await getCurrentUserIdentity();
        return taskService.update(id, {
            lastCompleted: date,
            lastCompletedByLogin: user?.login ?? null,
            lastCompletedByName: user?.name ?? null,
            lastCompletedByProfilePic: user?.profilePic ?? null,
        });
    },
};
