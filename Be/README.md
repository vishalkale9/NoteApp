# Backend API Endpoints

### Auth Routes
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get JWT token

### Note Routes (Protected - Requires Bearer Token)
- `GET /api/notes` - Get all notes for the logged-in user
- `POST /api/notes` - Create a new note
- `PUT /api/notes/:id` - Update an existing note
- `DELETE /api/notes/:id` - Delete a note
