import { apiSlice } from '../services/apiSlice';

export interface Waste {
	id: number;
	name: string;
	pricePerKg: number;
}

export interface WasteBody {
	name: string;
	pricePerKg: number;
}

export interface WasteEntry {
	id: number;
	weight: number;
	wasteType: {
		id: number;
		name: string;
	};
	storageLocation: {
		id: number;
		locationNr: number;
	};
	createdAt: string;
}

export interface WasteEntryBody {
	vehicleId: number;
	wasteTypeId: number;
	weight: number;
}

const wasteApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		createWaste: builder.mutation<Waste, WasteBody>({
			query: (waste) => ({
				url: '/wastes/type',
				method: 'POST',
				body: {
					name: waste.name,
					pricePerKg: Number(waste.pricePerKg),
				},
			}),
		}),
		retrieveWastes: builder.query<Waste[], void>({
			query: () => ({
				url: '/wastes/type',
				method: 'GET',
			}),
		}),
		createWasteEntry: builder.mutation<void, WasteEntryBody>({
			query: (wasteEntry) => ({
				url: '/wastes/entry',
				method: 'POST',
				body: {
					vehicleId: wasteEntry.vehicleId,
					wasteTypeId: wasteEntry.wasteTypeId,
					weight: Number(wasteEntry.weight),
				},
			}),
		}),

		retrieveWasteEntriesByVehicleId: builder.query<WasteEntry[], number>({
			query: (id) => ({
				url: `/wastes/entry/${id}`,
				method: 'GET',
			}),
		}),
		deleteWaste: builder.mutation<void, number>({
			query: (id) => ({
				url: `/wastes/type/${id}`,
				method: 'DELETE',
			}),
		}),
		editWaste: builder.mutation<Waste, WasteBody & { id: number }>({
			query: ({ id, ...waste }) => ({
				url: `/wastes/type/${id}`,
				method: 'PATCH',
				body: {
					name: waste.name,
					pricePerKg: Number(waste.pricePerKg),
				},
			}),
		}),
	}),
});

export const {
	useCreateWasteMutation,
	useRetrieveWastesQuery,
	useCreateWasteEntryMutation,
	useRetrieveWasteEntriesByVehicleIdQuery,
	useDeleteWasteMutation,
	useEditWasteMutation,
} = wasteApiSlice;
