export interface QueuePayload<T = any> {
  jobType: string; // Type of job
  data: T; // Payload for the job
}
