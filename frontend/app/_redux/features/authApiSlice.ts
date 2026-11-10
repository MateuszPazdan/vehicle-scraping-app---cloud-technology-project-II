import { apiSlice } from '../services/apiSlice';

export interface User {
	id: string;
	email: string;
	is_admin: boolean;
	created_at: string;
	updated_at: string;
}

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		retrieveUser: builder.query<User, void>({
			query: () => ({ url: '/users/me', method: 'GET' }),
		}),
		verifyToken: builder.mutation({
			query: () => ({
				url: '/auth/verify',
				method: 'POST',
			}),
		}),
		login: builder.mutation({
			query: ({ email, password }) => ({
				url: '/auth/login',
				method: 'POST',
				body: { email, password },
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
			}),
		}),
	}),
});

export const {
	useRetrieveUserQuery,
	useVerifyTokenMutation,
	useLoginMutation,
	useLogoutMutation,
} = authApiSlice;
