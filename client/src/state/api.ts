import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project {
    id: number;
    name: string;
    description?: string;
    startDate?: string;
    endDate?: string;
}

export enum Status {
    ToDo = "To Do",
    WorkInProgress = "Work In Progress",
    UnderReview = "Under Review",
    Completed = "Completed"
}

export enum Priority {
    Urgent = "Urgent",
    High = "High",
    Medium = "Medium",
    Low = "Low",
    Backlog = "Backlog"
}

export interface User {
    userId?: number;
    username: string;
    email: string;
    profilePictureUrl?: string;
    cognitoId?: string;
    teamId?: number;
}

export interface Comment {
    id: number;
}

export interface Attachment {
    id: number;
    fileUrl: string;
    fileName: string;
    taskId: number;
    uploadedById: number;
}
export interface Task {
    id: number;
    title: string;
    description?: string;
    status?: Status;
    priority?: Priority;
    tags?: string;
    startDate?: string;
    dueDate?: string;
    points?: number;
    projectId: number;
    authorUserId?: number;
    assignedUserId?: number;

    author?: User;
    assignee?: User;
    comments?: Comment[];
    attachments?: Attachment[];
}

 // Redux toolkit query api setup
export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["Projects", "Tasks"],
    endpoints: (build) => ({
        // build.query -> used for get request
        getProjects: build.query<Project[], void>({ // Redux toolkit api call
            query: () => "projects", // projects is the endpoint
            providesTags: ["Projects"] // used to renew the value of projects when createProject runs
        }),
        // build.mutation -> used for post request
        // <Project -> type received
        // Partial<Project> -> type partially sent
        createProject: build.mutation<Project, Partial<Project>>({
            query: (project) => ({ // body = project, it will be in the fn where the call is made
                url: "projects",
                method: "POST",
                body: project
            }),
            // whenever a new project gets created redux toolkit identifies by the tags that getProjects need to run again
            // by using invalidateTags there's no need to include logic to re-fetch projects automatically after a new one is created
            invalidatesTags: ["Projects"]
        }),
        getTasks: build.query<Task[], { projectId: number }>({
            query: ({ projectId }) => `tasks?projectId=${projectId}`,
            providesTags: (result) => result
                ? result.map(({ id }) => ({ type: "Tasks" as const, id }))
                : [{ type: "Tasks" as const }]
        }),
        createTask: build.mutation<Task, Partial<Task>>({
            query: (task) => ({
                url: "tasks",
                method: "POST",
                body: task
            }),
            invalidatesTags: ["Tasks"]
        }),
        updateTaskStatus: build.mutation<Task, { taskId: number; status: string; }>({
            query: ({ taskId, status }) => ({
                url: `tasks/${taskId}/status`,
                method: "PATCH",
                body: {status}
            }),
            invalidatesTags: (result, error, { taskId }) => [ // will update a specific task, not the entire list
                { type: "Tasks", id: taskId}
            ]
        }),
    }),
});

export const { useGetProjectsQuery, useCreateProjectMutation, useGetTasksQuery, useCreateTaskMutation } = api;
