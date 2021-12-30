export interface IPostParams {
  _page: number
  _limit: number
  id?: number | null
  title?: string
  author?: string
}

export interface IPost {
  id: number
  title: string
  author: string
}
