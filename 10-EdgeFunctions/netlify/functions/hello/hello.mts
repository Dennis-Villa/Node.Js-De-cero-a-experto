import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {

    return new Response( 
        JSON.stringify({
            message: "Hola Mundo",
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        },
    )
};
