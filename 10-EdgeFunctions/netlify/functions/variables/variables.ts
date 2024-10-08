import type { Context } from "@netlify/functions";

export default async (req: Request, context: Context) => {

    const secret = process.env.SECRET_TOKEN;

    console.log('Hola mundo!!');

    return new Response( 
        JSON.stringify({
            secret,
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        },
    )
};
