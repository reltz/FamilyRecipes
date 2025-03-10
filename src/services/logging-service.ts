const debugMode = false;

export function Log(message: string, level: "info" | "log" | "error" = "log"){
    if(debugMode){
        if(level === "info") console.info(message);
        if(level === "log") console.log(message);
        if(level === "error") console.error(message);
    }
}
