import jsonata from "jsonata";
import { useEffect, useState } from "react";

interface UseExprResult<T> {
    isLoading: boolean;
    error: Error | undefined;
    result?: T;
}

export function useExpr<T>(expr: string, data: any): UseExprResult<T> {
    const [result, setResult] = useState<T>();
    // never loading when there's nothing to evaluate
    const [isLoading, setIsLoading] = useState(!!expr && !!data);
    const [error, setError] = useState();

    useEffect(() => {
        if (!expr || !data) {
            setResult(undefined);
            return;
        }

        setIsLoading(true);

        const evaluateExpression = async () => {
            try {
                const expression = jsonata(expr);
                const evaluationResult = await expression.evaluate(data);
                setResult(evaluationResult);
            } catch (err) {
                console.error("JSONata evaluation error:", err);
                setError(err);
            } finally {
                setIsLoading(false);
            }
        };

        evaluateExpression();
    }, [expr, data]);

    return {
        isLoading,
        result,
        error,
    };
}
