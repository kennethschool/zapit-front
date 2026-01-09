
import { PrismaClient } from '@prisma/client';
import type { Route } from './+types/signup';

const prisma = new PrismaClient();

export async function loader(_: Route.LoaderArgs) {
 

  return Response.json({});
}
