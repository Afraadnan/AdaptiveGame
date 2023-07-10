import { NextApiRequest, NextApiResponse } from 'next';
import * as mysql from 'mysql2/promise';
interface Resource {
    name: string;
    url: string;
    rating: number;
    id: string;
    idx: number;
}

// create a connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Limbic-AI',
    database: 'segp-grp-j',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// fetch all data from the 'resources' table
async function fetchData(): Promise<Resource[]> {
    const connection = await pool.getConnection();
    try {
        const [rows] = await connection.query<Resource[]>('SELECT resourceName as name, resourcesLink as url, rating, resourceLinkID as id, resourceIndex as idx FROM resources');
        return rows.map((row: Resource) => {
            return {
                name: row.name,
                url: row.url,
                rating: row.rating,
                id: row.id,
                idx: row.idx
            };
        });
    } catch (error) {
        console.error(error);
        return [];
    } finally {
        connection.release();
    }
}

// start API
export default async function handleRequest(req: NextApiRequest, res: NextApiResponse<Resource[]>) {
    const resources = await fetchData();

    // GET /api/resource
    // Returns all resources
    if (req.method === 'GET') {
        res.status(200).json(resources);
        return;
    }

    // POST /api/resource
    // Increases the rating of a resource
    if (req.method === 'POST') {
        const index = req.body.index;
        if (typeof index === 'number' && index >= 0 && index < resources.length) {
            resources[index].rating = resources[index].rating + 1;
            res.status(200).json(resources);
            return;
        }
        res.status(400).end();
        return;
    }

    res.status(404).end();
}
