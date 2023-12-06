# Twitter Clone

## Technologies Used

This project was developed using the following technologies:

- [Next.js 13](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Query](https://react-query.tanstack.com/)
- [NextAuth (GitHub)](https://next-auth.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [Supabase](https://supabase.io/)

## Key Features

- **User Registration and Authentication:** Users can securely create accounts and log in using their GitHub accounts.

- **Create and Delete Posts:** Users can create and delete their own posts.

- **Like and Comment on Posts:** Users can like and comment on posts from other users.

- **Like and Delete Comments:** Users can like and delete comments on posts.

## Setup

To run this project locally, follow these steps:

1. Clone the repository to your development environment: `git clone https://github.com/peVelosa/twitter-clone.git`
2. Navigate to the project folder: `cd twitter-clone`
3. Install project dependencies:`npm install`
4. Configure the necessary environment variables for authentication, database, and other settings.
5. Start the development server:`npm run dev`
6. Access the application in your browser at [http://localhost:3000](http://localhost:3000).
7. Create a `.env` file
8. Add the node variable
```env
DATABASE_URL=<your-database-url>
GITHUB_ID=<your-github-ID>
GITHUB_SECRET=<your-github-secret>
NEXTAUTH_SECRET=<your-nextauth-secret>
NEXTAUTH_URL=<your-nextauth-url>
NEXT_PUBLIC_BASE_URL=<your-nextpublic-baseulr>
```
You can get your github ID and github Secret by going on `setting > Developer setting > OAuth Apps > New OAuth App`.  
Then the field `Homepage URL` you add your website url like `http://localhost:3000`, and on `Authorization callback URL` you add something like `http://localhost:3000/api/auth/callback/github`.  
If you want to use it on both prod. and dev. environment you need to configurate tow OAuth apps.
9. Consider change the prisma provider if you want.
10. If you want to create a database on supabase consider follow the docs [supabase](https://supabase.com/docs/guides/getting-started)

## Contribution

This is an ongoing project, and contributions are welcome. Feel free to open issues and submit pull requests with improvements.

## Author

- Pedro Velosa

## Acknowledgments

- Special acknowledgement to [Code With Antonio](https://www.youtube.com/@codewithantonio) who has a amazing video that i took some inspiration like the models and design

---

Enjoy exploring and contributing to the Twitter Clone! For more information and access to the repository files, visit [https://github.com/peVelosa/twitter-clone](https://github.com/peVelosa/twitter-clone). If you have any questions or suggestions, please don't hesitate to reach out.


