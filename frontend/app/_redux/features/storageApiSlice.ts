import { apiSlice } from '../services/apiSlice';

export interface Storage {
	id: number;
	locationNr: string;
	currentMass: number;
	wasteType: {
		id: number;
		name: string;
	};
}

export interface StorageBody {
	locationNr: string;
	wasteTypeId: number;
}

export interface StorageEditBody {
	locationNr: string;
}

const storagesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createStorage: builder.mutation<Storage, StorageBody>({
			query: (storage) => ({
				url: '/storages',
				method: 'POST',
				body: storage,
			}),
		}),
		retrieveStorages: builder.query<Storage[], void>({
			query: () => ({
				url: '/storages',
				method: 'GET',
			}),
		}),
		editStorage: builder.mutation<Storage, { id: number; locationNr: string }>({
			query: ({ id, ...storage }) => ({
				url: `/storages/${id}`,
				method: 'PATCH',
				body: storage,
			}),
		}),
	}),
});

export const {
	useCreateStorageMutation,
	useRetrieveStoragesQuery,
	useEditStorageMutation,
} = storagesApiSlice;
