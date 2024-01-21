## Features

- Authentication using Supabase Auth
- File Uploads using Supabase Storage
- Database access with Drizzle ORM
- Full Row Level Security (RLS) support
- Dark Mode with Theme Provider
- Form state management using the new `useFormState` and `useFormStatus` hooks
- Fully responsive design using Tailwind CSS

## Set up database user that respects RLS and grant access to all tables

```sql
create role app_user with login password 'app_user';
grant select, insert, update, delete on all tables in schema public to app_user;
alter default privileges in schema public grant select, insert, update, delete on tables to app_user;
```

## Manually enable RLS policies after creating tables

Use the dashboard to enable RLS policies for each table.

# Set up Storage

- Create a new storage bucket and set the `STORAGE_BUCKET` environment variable to the bucket name.
- Create the following storage policies for the bucket:

## Access own files

- Name: `Access own files`
- Allowed operation: `SELECT`
- Target roles: (default)
- Policy definition:

```sql
bucket_id = 'Files' and owner_id = auth.uid()::text and (storage.foldername(name))[1] = auth.uid()::text
```

## Allow upload

- Name: `Allow upload`
- Allowed operation: `INSERT`
- Target roles: (default)
- Policy definition:

```sql
bucket_id = 'Files' and (storage.foldername(name))[1] = auth.uid()::text
```

## Delete own files

- Name: `Delete own files`
- Allowed operation: `SELECT`, `DELETE`
- Target roles: (default)
- Policy definition:

```sql
bucket_id = 'Files' and owner_id = auth.uid()::text and (storage.foldername(name))[1] = auth.uid()::text
```
