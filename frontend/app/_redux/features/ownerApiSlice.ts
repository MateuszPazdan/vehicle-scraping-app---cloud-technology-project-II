import { apiSlice } from '../services/apiSlice';

export interface OwnerFilters {
	name?: string;
	surname?: string;
	pesel?: string;
	address?: string;
	id_number?: string;
}

export interface Owner {
	id: number;
	name: string;
	surname: string;
	pesel: string;
	address: string;
	id_number: string;
}

export interface OwnerBody {
	name: string;
	surname: string;
	pesel: string;
	address: string;
	id_number: string;
}

const ownerApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createOwner: builder.mutation<Owner, OwnerBody>({
			query: (owner) => ({
				url: '/owners',
				method: 'POST',
				body: owner,
			}),
		}),
		retrieveOwners: builder.query<Owner[], OwnerFilters>({
			query: (filters) => ({
				url: '/owners',
				method: 'GET',
				params: filters,
			}),
		}),
	}),
});

export const { useCreateOwnerMutation, useRetrieveOwnersQuery } = ownerApiSlice;
