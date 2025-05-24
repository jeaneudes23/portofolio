"use client"

import { ServerActionResponse } from "@/lib/types"
import { useEffect } from "react"
import toast from "react-hot-toast"

interface Props {
  state: ServerActionResponse
  callback?: () => void
}
export const useServerActionToast = ({ state, callback }: Props) => {

  useEffect(() => {
    if (state.message) {
      if (state.ok) {
        toast.success(state.message)
        callback && callback()
      } else {
        toast.error(state.message)
      }
    }
  }, [state])
}