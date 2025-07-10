/* Example Typescript File to prove it builds
   TODO: remove this once typescript is actually used */

interface VeryImportantArgument {
    TheMessage: string;
}

export default function(hello: VeryImportantArgument): string {
    return hello.TheMessage + "world";
}
