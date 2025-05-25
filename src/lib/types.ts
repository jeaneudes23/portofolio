export type ServerActionError = string | number | undefined | string[]

export interface ServerActionResponse {
  ok?: boolean,
  errors?: Record<string, ServerActionError>,
  prevs?: Record<string, string>,
  message?: string,
}