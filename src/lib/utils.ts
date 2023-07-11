import { type ClassValue, clsx } from "clsx"
import { format } from "date-fns"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function toPusherKey(key: string) {
  return key.replace(/:/g, '__')
}

export function chatHrefConstructor(id1: string, id2: string) {
  const sortedIds = [id1, id2].sort()
  return `${sortedIds[0]}--${sortedIds[1]}`
}

export function chatDateFormat(timestamp:number) {
  return format(timestamp,format(timestamp, "dd/MM/yyyy"))
}