# Create T3 App

    TODO:
    1. Add optimistic updates
    2. Add rollback on ctrl-z
    3. no-misused-promises

## Reproduction Steps

1. Clone the repository:

   `git clone https://github.com/DeadBoyPiotrek/t3-smoothies.git`

2. Install dependencies:

   `cd your-repo`

   `npm install`

3. Create a `.env` file in the root directory of the project and add the following line:

   `DATABASE_URL=postgresql://user:password@localhost:5432/database_name`

   Replace `user`, `password`, and `database_name` with your Postgres credentials. Or copy the connection string from your cloud hosted database if you're using one.

4. Generate Prisma Client:

   `npx prisma generate`

5. Start your Postgres database docker container, or use one like Supabase.

6. Start the application:

   `npm run dev`

   You should now be able to access the application at http://localhost:3000/.
