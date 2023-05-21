export default interface TodoI{
    id?:number,
    done: boolean
    task: string,
    due: Date|null
}