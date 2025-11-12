export interface Project {
  id: number | string
  title: string
  description?: string
  created_at?: string
  updated_at?: string
}

// Provide a minimal `process.env` typing for the frontend so client code
// that reads NEXT_PUBLIC_* env variables doesn't error when @types/node
// isn't installed in the frontend build.
declare global {
  // we only declare the bits we actually use
  const process: {
    env: {
      NEXT_PUBLIC_API_BASE?: string
      [key: string]: string | undefined
    }
  }
}

export {}
