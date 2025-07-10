// ensure vite raw support doesn't error
declare module "*?raw" {
    const content: string;
    export default content;
}
